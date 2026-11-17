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
# (folder, clean stand-in, finishes to make from it)
JOBS = [
    ('Hob-Series', 'HobSeries-Grey', ['HobSeries-Golden', 'HobSeries-Natural', 'HobSeries-Copper']),
    ('Sleek-Series', 'Sleekseries-Black', ['Sleekseries-Copper', 'Sleekseries-Pink']),
]
# finishes that look the same as the stand-in (Painted is black too)
SAME = [('Sleek-Series', 'Sleekseries-Black', 'Sleekseries-Painted')]

def part_mask(img):
    fg = img.min(axis=2) < 228
    fg = ndimage.binary_opening(fg, iterations=2)
    lab, n = ndimage.label(fg)
    if n > 1:
        sizes = ndimage.sum(fg, lab, range(1, n + 1))
        fg = lab == (int(np.argmax(sizes)) + 1)
    return ndimage.binary_fill_holes(fg)

def tones(path):
    """Five LAB colours along the lightness range of the real part."""
    img = cv2.imread(path)
    m = part_mask(img)
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB).astype(np.float32)[m]
    order = np.argsort(lab[:, 0])
    out = []
    # skip the darkest 12%: the captured mouse pointer and edge shadow
    for lo, hi in [(0.12, 0.20), (0.25, 0.40), (0.48, 0.62), (0.72, 0.86), (0.93, 0.995)]:
        sl = lab[order[int(len(order) * lo):int(len(order) * hi)]]
        out.append(np.median(sl, axis=0))
    return np.array(out)

def recolor(folder, base, finishes):
    src = cv2.imread(f'{R}/{folder}/{base}.png')
    mask = ndimage.binary_erosion(part_mask(src), iterations=1)  # drop the pale rim pixels
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
        tn = tones(f'public/{folder}/{name}.png')
        out = np.zeros(src.shape, np.float32)
        for c in range(3):
            out[..., c] = np.interp(t, stops, tn[:, c])
        rgb = cv2.cvtColor(out.clip(0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
        a = cv2.GaussianBlur(mask.astype(np.float32), (3, 3), 0)[..., None]
        res = rgb * a + 255 * (1 - a)
        cv2.imwrite(f'{R}/{folder}/{name}.png', res.clip(0, 255).astype(np.uint8))
        print('wrote', name)


for job in JOBS:
    recolor(*job)
for folder, base, name in SAME:
    shutil.copy(f'{R}/{folder}/{base}.png', f'{R}/{folder}/{name}.png')
    print('copied', name)
