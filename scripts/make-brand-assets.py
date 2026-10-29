"""Derive web assets from the supplied FocusTrigger Automation logo without
altering the artwork: crop, background removal (outside + letter counters
only, icon untouched), favicon/app icons from the icon mark on the logo's own
background colour. Prints verification metrics.

Dev-only tool (requires Python 3 with Pillow and NumPy). Coordinates below are
specific to the supplied 1024×1024 artwork; re-check them for a new source.

Usage (from the repository root):
  python3 scripts/make-brand-assets.py <source.png> public/brand src/app assets/brand <preview-dir>
"""
import sys
from PIL import Image
import numpy as np

SRC, OUT_PUBLIC, OUT_APP, OUT_SOURCE, PREVIEW = sys.argv[1:6]
src_img = Image.open(SRC).convert("RGB")
rgb = np.asarray(src_img).astype(float)
BG = np.array([249.0, 234.0, 216.0])  # measured median of the artwork's background

# 1. Crop to content (bbox x192–834, y427–596) with 8px breathing room.
x0, x1, y0, y1 = 184, 843, 419, 605
crop = rgb[y0:y1, x0:x1]
H, W, _ = crop.shape
icon_right = 376 - x0  # first empty column after the icon mark

# 2. Exterior background = bg-like pixels connected to the crop border.
bglike = np.abs(crop - BG).max(axis=2) <= 30
ext = np.zeros_like(bglike)
ext[0], ext[-1], ext[:, 0], ext[:, -1] = bglike[0], bglike[-1], bglike[:, 0], bglike[:, -1]
while True:
    n = ext.copy()
    n[1:] |= ext[:-1]; n[:-1] |= ext[1:]; n[:, 1:] |= ext[:, :-1]; n[:, :-1] |= ext[:, 1:]
    n &= bglike
    if (n == ext).all():
        break
    ext = n
# Letter counters in the lettering are background, not design.
text_cols = np.zeros((H, W), bool); text_cols[:, icon_right:] = True
remove = ext | (bglike & text_cols)

# 3. Pixels to un-blend: removed background plus a 3px band around it
#    (anti-aliased edges of the black outline/lettering). Everything else in
#    the icon — green, cream fills, black — is left byte-for-byte unchanged.
band = remove.copy()
for _ in range(3):
    b = band.copy()
    b[1:] |= band[:-1]; b[:-1] |= band[1:]; b[:, 1:] |= band[:, :-1]; b[:, :-1] |= band[:, 1:]
    band = b
band |= text_cols & ~(np.abs(crop - BG).max(axis=2) > 200)  # all lettering pixels are black-on-cream blends
# Lettering and outline are black: composite c = a*0 + (1-a)*BG  =>  a = 1 - c/BG
alpha_est = np.clip(1 - (crop / BG).mean(axis=2), 0, 1)
alpha_est[alpha_est < 0.06] = 0
out = np.dstack([crop, np.full((H, W), 255.0)])
out[band, 0:3] = 0
out[band, 3] = np.round(alpha_est[band] * 255)
logo = Image.fromarray(out.astype(np.uint8), "RGBA")
logo.save(f"{OUT_PUBLIC}/focustrigger-automation-logo.png", optimize=True)

# Verification: recomposite over the original background and compare.
a = out[..., 3:4] / 255.0
recon = out[..., :3] * a + BG * (1 - a)
err = np.abs(recon - crop)
untouched = ~band
print(f"logo: {W}x{H}px, transparent px {int((out[...,3]==0).sum())}, partial {int(((out[...,3]>0)&(out[...,3]<255)).sum())}")
print(f"recomposite vs original: mean abs err {err.mean():.2f}, 99th pct {np.percentile(err,99):.1f}, max {err.max():.0f} (0–255)")
print(f"icon/design pixels left unchanged: {int(untouched.sum())} (identical: {bool((out[untouched,:3]==crop[untouched]).all())})")

# 4. Untouched cropped original (with its own background) kept as the source of truth.
Image.fromarray(crop.astype(np.uint8), "RGB").save(f"{OUT_SOURCE}/focustrigger-automation-logo-cropped-original.png", optimize=True)

# 5. Icon mark → square app icons on the logo's own background colour.
mark = crop[:, :icon_right]
ys, xs = np.where(np.abs(mark - BG).max(axis=2) > 30)
mark = mark[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
mh, mw, _ = mark.shape
def square(size, pad_ratio):
    side = int(round(max(mh, mw) * (1 + 2 * pad_ratio)))
    canvas = np.tile(BG, (side, side, 1))
    oy, ox = (side - mh) // 2, (side - mw) // 2
    canvas[oy:oy + mh, ox:ox + mw] = mark
    return Image.fromarray(canvas.astype(np.uint8), "RGB").resize((size, size), Image.LANCZOS)
square(512, 0.12).save(f"{OUT_APP}/icon.png", optimize=True)
square(180, 0.16).save(f"{OUT_APP}/apple-icon.png", optimize=True)
square(256, 0.08).convert("RGBA").save(f"{OUT_APP}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"icon mark: {mw}x{mh}px source → icon.png 512, apple-icon.png 180, favicon.ico 16/32/48")

# 6. Previews on white (header) and navy (footer) for visual inspection.
for name, colour in (("white", (255, 255, 255)), ("navy", (15, 23, 42))):
    bgimg = Image.new("RGBA", logo.size, colour + (255,))
    Image.alpha_composite(bgimg, logo).resize((W * 2, H * 2), Image.NEAREST).save(f"{PREVIEW}/preview-on-{name}.png")
