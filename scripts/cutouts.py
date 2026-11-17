"""Clean product photos for the light site.
Writes public/parts/<folder>/<name>.webp: the part on pure white (#fff), trimmed,
so the page can show it with mix-blend-mode: multiply on any light tile.
Also paints out the mouse-pointer arrow that was captured in some source photos.
Run: python3 scripts/cutouts.py
"""
import glob, os
import numpy as np, cv2
from scipy import ndimage

SKIP = ('Royal-series', 'Euro-series')
HOLED = ('DialPlate-Series', 'NozzleRing', 'Coupler')
# photos with a captured mouse pointer
CURSOR = ('HobSeries-Golden', 'HobSeries-Grey', 'HobSeries-Natural', 'MetalSeries-', 'Sleekseries-Copper',
          'Sleekseries-Painted', 'Sleekseries-Pink', 'Sleekseries-Sticker', 'UltaSeries', 'V-GuardSeries-Golden')

def _cursor_kernels():
    """The macOS pointer, measured from one source photo: black arrow, white rim."""
    g = cv2.cvtColor(cv2.imread('public/Metal-Series/MetalSeries-Model-1-Silver.png'), cv2.COLOR_BGR2GRAY)
    c = g[340:384, 168:200]
    n, lab, st, _ = cv2.connectedComponentsWithStats((c < 70).astype(np.uint8))
    arrow = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
    ys, xs = np.where(arrow)
    arrow = arrow[ys.min() - 3:ys.max() + 4, xs.min() - 3:xs.max() + 4]
    rim = cv2.dilate(arrow, np.ones((3, 3), np.uint8), iterations=1) - arrow
    inner = cv2.erode(arrow, np.ones((2, 2), np.uint8))
    return inner.astype(np.float32) / inner.sum(), rim.astype(np.float32) / rim.sum(), cv2.dilate(arrow, np.ones((3, 3), np.uint8), iterations=2)

K_IN, K_RIM, K_MASK = _cursor_kernels()

def remove_cursor(img, fg):
    g = cv2.cvtColor(img.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
    resp = cv2.filter2D(g, -1, K_RIM, anchor=(0, 0)) - cv2.filter2D(g, -1, K_IN, anchor=(0, 0))
    y, x = np.unravel_index(np.argmax(resp), resp.shape)
    if resp[y, x] < 110:
        return img, 0
    mask = np.zeros(g.shape, np.uint8)
    kh, kw = K_MASK.shape
    mask[y:y + kh, x:x + kw] = K_MASK[:mask.shape[0] - y, :mask.shape[1] - x] * 255
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=2)
    return cv2.inpaint(img.astype(np.uint8), mask, 6, cv2.INPAINT_TELEA).astype(np.float32), int(resp[y, x])


def clean_surface(img8, fg):
    """Studio clean-up: paint out dust, specks and fine scratches, then smooth
    flat plastic and metal while keeping real edges (outlines, slots, print)."""
    g = cv2.cvtColor(img8, cv2.COLOR_BGR2GRAY).astype(np.int16)
    ph = max(1, int(fg.sum() ** 0.5))
    k = max(7, (ph // 18) | 1)
    med = cv2.medianBlur(img8, k)
    gm = cv2.cvtColor(med, cv2.COLOR_BGR2GRAY).astype(np.int16)
    diff = np.abs(g - gm)
    # specks: small spots that differ from their neighbourhood; white print (> 200) is kept
    cand = ((diff > 12) & fg & (g < 200)).astype(np.uint8)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(cand, 8)
    small = np.zeros_like(cand)
    lim = max(30, int(fg.sum() * 0.0025))
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] <= lim:
            small[lab == i] = 1
    small = cv2.dilate(small, np.ones((3, 3), np.uint8), iterations=1)
    out = cv2.inpaint(img8, small * 255, 4, cv2.INPAINT_TELEA)
    # edge-preserving smoothing of the surfaces
    sm = out
    for _ in range(2):
        sm = cv2.bilateralFilter(sm, 9, 28, 7)
    # keep real structure: strong edges of the median image stay from the unsmoothed photo
    e = cv2.Canny(cv2.GaussianBlur(med, (0, 0), 1.2), 40, 110)
    e = cv2.GaussianBlur(cv2.dilate(e, np.ones((3, 3), np.uint8)).astype(np.float32) / 255, (0, 0), 1.5)
    e = np.clip(e * 1.6, 0, 1)[..., None]
    return (sm * (1 - e) + out * e).clip(0, 255).astype(np.uint8), e[..., 0]

SIZE = 760  # sized near the source photos (about 450px parts) so they are barely upscaled

def retouch(img, a, fg, clean=True):
    """Phone photo to catalogue shot: denoise, levels, local contrast, colour,
    then the part centred on a white square with a soft studio shadow."""
    img8 = img.clip(0, 255).astype(np.uint8)
    if clean:
        img8 = cv2.fastNlMeansDenoisingColored(img8, None, 3, 3, 7, 21)
        img8, edges = clean_surface(img8, fg)
    else:
        edges = np.zeros(fg.shape, np.float32)
    if clean:  # supplied studio photos are already graded
        lab = cv2.cvtColor(img8, cv2.COLOR_BGR2LAB).astype(np.float32)
        L = lab[..., 0]
        vals = L[fg]
        lo, hi = np.percentile(vals, 0.8), np.percentile(vals, 99.6)
        stretched = (L - lo) / max(hi - lo, 1) * (242 - 8) + 8
        L = L * 0.4 + stretched * 0.6
        L8 = L.clip(0, 255).astype(np.uint8)
        L8 = cv2.createCLAHE(clipLimit=1.2, tileGridSize=(4, 4)).apply(L8)
        lab[..., 0] = L8
        lab[..., 1:] = (lab[..., 1:] - 128) * 1.1 + 128
        img8 = cv2.cvtColor(lab.clip(0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR).astype(np.float32)
    img8 = img8.astype(np.float32)
    ys, xs = np.where(a > 0.03)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    part = img8[y0:y1, x0:x1]
    pa = a[y0:y1, x0:x1]
    ph, pw = pa.shape
    # sharpen once at source resolution, only along real edges so surfaces stay clean
    pe = edges[y0:y1, x0:x1][..., None]
    part = part + (part - cv2.GaussianBlur(part, (0, 0), 0.8)) * 0.8 * pe
    # scale the part to fill 64% of the square on its long side, Lanczos
    sc = SIZE * 0.64 / max(ph, pw)
    nw, nh = max(1, round(pw * sc)), max(1, round(ph * sc))
    part = cv2.resize(part, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    pa = cv2.resize(pa, (nw, nh), interpolation=cv2.INTER_LINEAR).clip(0, 1)
    # two-radius unsharp mask: fine edges, then a little mid-tone clarity
    pe = cv2.resize(pe, (nw, nh), interpolation=cv2.INTER_LINEAR)[..., None]
    part = part + (part - cv2.GaussianBlur(part, (0, 0), 1.0)) * 0.45 * pe
    part = cv2.addWeighted(part, 1.18, cv2.GaussianBlur(part, (0, 0), 4.0), -0.18, 0)

    canvas = np.full((SIZE, SIZE, 3), 255, np.float32)
    ox, oy = (SIZE - nw) // 2, int((SIZE - nh) * 0.44)
    # soft floor shadow: a wide ellipse plus the part's own silhouette squashed under it
    sh = np.zeros((SIZE, SIZE), np.float32)
    cy = oy + nh
    cv2.ellipse(sh, (SIZE // 2, cy), (int(nw * 0.42), max(6, int(nh * 0.045))), 0, 0, 360, 1, -1)
    sh = cv2.GaussianBlur(sh, (0, 0), max(6, nw * 0.035)) * 0.32
    sil = np.zeros((SIZE, SIZE), np.float32)
    sil[oy:oy + nh, ox:ox + nw] = pa
    sil = cv2.warpAffine(sil, np.float32([[1, 0, 0], [0, 0.12, cy * 0.88 + 6]]), (SIZE, SIZE))
    sh = np.maximum(sh, cv2.GaussianBlur(sil, (0, 0), 10) * 0.28)
    canvas *= (1 - sh)[..., None]
    region = canvas[oy:oy + nh, ox:ox + nw]
    canvas[oy:oy + nh, ox:ox + nw] = part * pa[..., None] + region * (1 - pa[..., None])
    return canvas.clip(0, 255).astype(np.uint8)

for f in sorted(glob.glob('public/*/*.png')):
    if any(s in f for s in SKIP):
        # lifestyle photos: only a square thumbnail for the PDF price list
        im = cv2.imread(f)
        h, w = im.shape[:2]
        m = min(h, w)
        sq = im[(h - m) // 2:(h + m) // 2, (w - m) // 2:(w + m) // 2]
        folder, name = f.split('/')[-2], os.path.splitext(f.split('/')[-1])[0]
        os.makedirs(f'public/parts/thumbs/{folder}', exist_ok=True)
        cv2.imwrite(f'public/parts/thumbs/{folder}/{name}.jpg', cv2.resize(sq, (300, 300), interpolation=cv2.INTER_AREA), [cv2.IMWRITE_JPEG_QUALITY, 84])
        continue
    # a cleaner stand-in photo of a very similar part, when one was supplied
    rep = f.replace('public/', 'scripts/replacements/', 1)
    is_rep = os.path.exists(rep)
    img = cv2.imread(rep if is_rep else f, cv2.IMREAD_COLOR).astype(np.float32)
    h, w = img.shape[:2]
    mn = img.min(axis=2)
    sat = img.max(axis=2) - mn
    cand = (mn > 228) & (sat < 22)
    lab, n = ndimage.label(cand)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    if any(s in f for s in HOLED):
        # white holes through the part are background too
        for i, s in enumerate(ndimage.sum(cand, lab, range(1, n + 1)), start=1):
            if s > h * w * 0.004:
                bg |= lab == i
    fg = ~bg
    fg = ndimage.binary_opening(fg, iterations=1)
    if not any(s in f for s in HOLED):
        # close small notches where a pale edge matched the white backdrop
        k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17))
        fg = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_CLOSE, k).astype(bool)
        fg = ndimage.binary_fill_holes(fg)
    lab2, n2 = ndimage.label(fg)
    if n2 > 1:
        sizes = ndimage.sum(fg, lab2, range(1, n2 + 1))
        keep = [i + 1 for i, s in enumerate(sizes) if s > sizes.max() * 0.04]
        fg = np.isin(lab2, keep)
    if 'Hob-Series' in f:
        # these knobs are convex; repaint edge pixels the light blew out to white
        cnts, _ = cv2.findContours(fg.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        hull = np.zeros(fg.shape, np.uint8)
        cv2.fillPoly(hull, [cv2.convexHull(np.vstack(cnts))], 1)
        gap = (hull.astype(bool) & ~fg).astype(np.uint8) * 255
        img = cv2.inpaint(img.clip(0, 255).astype(np.uint8), cv2.dilate(gap, np.ones((3, 3), np.uint8)), 9, cv2.INPAINT_TELEA).astype(np.float32)
        fg = hull.astype(bool)
    fixed = 0
    if not is_rep and any(s in f for s in CURSOR):
        img, fixed = remove_cursor(img, fg)
    a = cv2.GaussianBlur(fg.astype(np.float32), (3, 3), 0)
    out = retouch(img, a, fg, clean=not is_rep)
    folder, name = f.split('/')[-2], os.path.splitext(f.split('/')[-1])[0]
    os.makedirs(f'public/parts/{folder}', exist_ok=True)
    cv2.imwrite(f'public/parts/{folder}/{name}.webp', out, [cv2.IMWRITE_WEBP_QUALITY, 86])
    os.makedirs(f'public/parts/thumbs/{folder}', exist_ok=True)
    cv2.imwrite(f'public/parts/thumbs/{folder}/{name}.jpg', cv2.resize(out, (300, 300), interpolation=cv2.INTER_AREA), [cv2.IMWRITE_JPEG_QUALITY, 84])
    if fixed: print('cursor', name, fixed)
