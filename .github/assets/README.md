# Visual Assets

Place your preview images here:

| File | Dimensions | Purpose |
|------|------------|---------|
| `preview-light.png` | 1280 × 720 | Light theme hero screenshot |
| `preview-dark.png` | 1280 × 720 | Dark theme hero screenshot |
| `og-image.png` | 1200 × 630 | GitHub social preview (shared on Twitter/LinkedIn) |
| `demo.gif` | 1280 × 720 | 15-30s interaction walkthrough |

## Creating the OG Image

The source SVG is at `public/og-image.svg`. Convert to PNG (1200×630) using:

```bash
# Using ImageMagick
magick public/og-image.svg -resize 1200x630 .github/assets/og-image.png

# Or using rsvg-convert (Linux/macOS)
rsvg-convert -w 1200 -h 630 public/og-image.svg -o .github/assets/og-image.png

# Or online: https://svg2png.com / https://cloudconvert.com/svg-to-png
```

## Screenshots

For consistent branding:
1. Open the dev server (`npm run dev`)
2. Toggle dark/light mode
3. Capture full-page screenshots at 1280×720
4. Save as `preview-light.png` and `preview-dark.png`

## Demo GIF

Record a 15-30 second walkthrough:
- Tools: Kap (macOS), ShareX (Windows), Peek (Linux), or Loom
- Show: theme toggle, scroll animations, project filtering, resume modal
- Export as GIF (optimize: 15fps, reduce colors)
- Save as `demo.gif`