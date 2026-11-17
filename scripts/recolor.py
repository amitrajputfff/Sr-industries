"""Make other finishes of a series from one clean stand-in photo.
The stand-in (for example scripts/replacements/Hob-Series/HobSeries-Grey.png)
keeps its shape and shading; its colour is replaced with a gradient sampled
from SR's own photo of each finish (dark, mid and light tones), so the colour
stays true to the real part. Writes scripts/replacements/<folder>/<finish>.png,
which scripts/cutouts.py then picks up. Run: python3 scripts/recolor.py
"""
import cv2, numpy as np
from scipy import ndimage

import shutil
R = 'scripts/replacements'
# (folder, clean stand-in, finishes to make from it, recolour only the coloured
# metal and keep a dark inlay as it is)
JOBS = [
    ('Hob-Series', 'HobSeries-Grey', ['HobSeries-Golden', 'HobSeries-Natural', 'HobSeries-Copper'], False),
    ('Metal-Series', 'MetalSeries-Model-2-Copper', ['MetalSeries-Model-2-Golden', 'MetalSeries-Model-2-Black'], True),
]

def chroma(lab):
    return np.hypot(lab[..., 1] - 128, lab[..., 2] - 128)
# finishes that look the same as their stand-in: (folder, stand-in, finish)
SAME = []

def part_mask(img):
    fg = img.min(axis=2) < 228
    fg = ndimage.binary_opening(fg, iterations=2)
    lab, n = ndimage.label(fg)
    if n > 1:
        sizes = ndimage.sum(fg, lab, range(1, n + 1))
        fg = lab == (int(np.argmax(sizes)) + 1)
    return ndimage.binary_fill_holes(fg)

def tones(path, body_only=False):
    """Five LAB colours along the lightness range of the real part."""
    img = cv2.imread(path)
    m = part_mask(img)
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB).astype(np.float32)[m]
    if body_only:
        # sample the coloured metal, not the dark inlay, unless the finish itself is neutral
        col = lab[chroma(lab) > 14]
        if len(col) > len(lab) * 0.2:
            lab = col
    order = np.argsort(lab[:, 0])
    out = []
    # skip the darkest 12%: the captured mouse pointer and edge shadow
    for lo, hi in [(0.12, 0.20), (0.25, 0.40), (0.48, 0.62), (0.72, 0.86), (0.93, 0.995)]:
        sl = lab[order[int(len(order) * lo):int(len(order) * hi)]]
        out.append(np.median(sl, axis=0))
    return np.array(out)

def recolor(folder, base, finishes, body_only):
    src = cv2.imread(f'{R}/{folder}/{base}.png')
    part = ndimage.binary_erosion(part_mask(src), iterations=1)  # drop the pale rim pixels
    mask = part
    if body_only:
        slab = cv2.cvtColor(src, cv2.COLOR_BGR2LAB).astype(np.float32)
        mask = part & ((chroma(slab) > 12) | (slab[..., 0] > 200))
        mask = ndimage.binary_closing(mask, iterations=2) & part
    # smooth the grain a little first so the tone stretch does not exaggerate it
    L = cv2.cvtColor(cv2.bilateralFilter(src, 7, 18, 5), cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32)
    # each pixel's rank in the grey photo's tones, so the result takes on the real
    # part's whole tone spread (a light finish comes out light, not just tinted)
    vals = np.sort(L[mask])
    rank = np.searchsorted(vals, L) / len(vals)
    lin = np.clip((L - vals[int(len(vals) * 0.01)]) / max(vals[int(len(vals) * 0.995)] - vals[int(len(vals) * 0.01)], 1), 0, 1)
    t = 0.5 * rank + 0.5 * lin
    stops = np.array([0.0, 0.25, 0.5, 0.75, 1.0])

    for name in finishes:
        tn = tones(f'public/{folder}/{name}.png', body_only)
        out = np.zeros(src.shape, np.float32)
        for c in range(3):
            out[..., c] = np.interp(t, stops, tn[:, c])
        if body_only and tn[:, 0].mean() > 80:
            # polished metal: keep most of the photo's own highlights so it still shines
            sL = cv2.cvtColor(src, cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32)
            out[..., 0] = sL * 0.65 + out[..., 0] * 0.35
        rgb = cv2.cvtColor(out.clip(0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
        a = cv2.GaussianBlur(mask.astype(np.float32), (3, 3), 0)[..., None]
        keep = src if body_only else np.full_like(src, 255)
        res = rgb * a + keep * (1 - a)
        if body_only:
            res[~part] = 255
        cv2.imwrite(f'{R}/{folder}/{name}.png', res.clip(0, 255).astype(np.uint8))
        print('wrote', name)


for job in JOBS:
    recolor(*job)
for folder, base, name in SAME:
    shutil.copy(f'{R}/{folder}/{base}.png', f'{R}/{folder}/{name}.png')
    print('copied', name)
