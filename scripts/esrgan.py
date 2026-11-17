"""Real-ESRGAN x4 upscaler (RRDBNet), self-contained so it needs only torch.
Weights: RealESRGAN_x4plus.pth from github.com/xinntao/Real-ESRGAN releases,
looked for at $ESRGAN_WEIGHTS or ~/.cache/realesrgan/RealESRGAN_x4plus.pth.
Results are cached in scripts/.cache/ (by image hash) so reruns are quick.
"""
import hashlib, os
import numpy as np, cv2
import torch
from torch import nn
from torch.nn import functional as F


class RDB(nn.Module):
    def __init__(self, nf=64, gc=32):
        super().__init__()
        self.conv1 = nn.Conv2d(nf, gc, 3, 1, 1)
        self.conv2 = nn.Conv2d(nf + gc, gc, 3, 1, 1)
        self.conv3 = nn.Conv2d(nf + 2 * gc, gc, 3, 1, 1)
        self.conv4 = nn.Conv2d(nf + 3 * gc, gc, 3, 1, 1)
        self.conv5 = nn.Conv2d(nf + 4 * gc, nf, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(0.2, True)

    def forward(self, x):
        x1 = self.lrelu(self.conv1(x))
        x2 = self.lrelu(self.conv2(torch.cat((x, x1), 1)))
        x3 = self.lrelu(self.conv3(torch.cat((x, x1, x2), 1)))
        x4 = self.lrelu(self.conv4(torch.cat((x, x1, x2, x3), 1)))
        x5 = self.conv5(torch.cat((x, x1, x2, x3, x4), 1))
        return x5 * 0.2 + x


class RRDB(nn.Module):
    def __init__(self, nf, gc=32):
        super().__init__()
        self.rdb1, self.rdb2, self.rdb3 = RDB(nf, gc), RDB(nf, gc), RDB(nf, gc)

    def forward(self, x):
        return self.rdb3(self.rdb2(self.rdb1(x))) * 0.2 + x


class RRDBNet(nn.Module):
    def __init__(self, nf=64, nb=23, gc=32):
        super().__init__()
        self.conv_first = nn.Conv2d(3, nf, 3, 1, 1)
        self.body = nn.Sequential(*[RRDB(nf, gc) for _ in range(nb)])
        self.conv_body = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up1 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up2 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_hr = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_last = nn.Conv2d(nf, 3, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(0.2, True)

    def forward(self, x):
        feat = self.conv_first(x)
        feat = feat + self.conv_body(self.body(feat))
        feat = self.lrelu(self.conv_up1(F.interpolate(feat, scale_factor=2, mode='nearest')))
        feat = self.lrelu(self.conv_up2(F.interpolate(feat, scale_factor=2, mode='nearest')))
        return self.conv_last(self.lrelu(self.conv_hr(feat)))


_net = None
_dev = 'mps' if torch.backends.mps.is_available() else 'cpu'
WEIGHTS = os.environ.get('ESRGAN_WEIGHTS', os.path.expanduser('~/.cache/realesrgan/RealESRGAN_x4plus.pth'))
CACHE = 'scripts/.cache'


def available():
    return os.path.exists(WEIGHTS)


def _load():
    global _net
    if _net is None:
        sd = torch.load(WEIGHTS, map_location='cpu', weights_only=True)
        sd = sd.get('params_ema', sd.get('params', sd))
        _net = RRDBNet()
        _net.load_state_dict(sd, strict=True)
        _net.eval().to(_dev)
    return _net


def upscale4(img8, tile=256, pad=12):
    """BGR uint8 in, BGR uint8 out at 4x, tiled to keep memory low."""
    key = hashlib.sha1(img8.tobytes() + str(img8.shape).encode()).hexdigest()
    path = f'{CACHE}/{key}.png'
    if os.path.exists(path):
        return cv2.imread(path)
    net = _load()
    h, w = img8.shape[:2]
    x = torch.from_numpy(img8[..., ::-1].copy()).permute(2, 0, 1).float().div(255).unsqueeze(0)
    out = torch.zeros(1, 3, h * 4, w * 4)
    with torch.no_grad():
        for y0 in range(0, h, tile):
            for x0 in range(0, w, tile):
                y1, x1 = min(y0 + tile, h), min(x0 + tile, w)
                py0, px0, py1, px1 = max(y0 - pad, 0), max(x0 - pad, 0), min(y1 + pad, h), min(x1 + pad, w)
                o = net(x[:, :, py0:py1, px0:px1].to(_dev)).cpu()
                out[:, :, y0 * 4:y1 * 4, x0 * 4:x1 * 4] = o[:, :, (y0 - py0) * 4:(y0 - py0 + y1 - y0) * 4, (x0 - px0) * 4:(x0 - px0 + x1 - x0) * 4]
    res = (out.squeeze(0).permute(1, 2, 0).clamp(0, 1).numpy()[..., ::-1] * 255).round().astype(np.uint8)
    os.makedirs(CACHE, exist_ok=True)
    cv2.imwrite(path, res)
    return res
