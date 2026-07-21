# Elimatic — website

Static site. Structure matches the existing repo:

```
index.html      – markup (links styles.css + script.js)
styles.css      – all styles
script.js       – sticky header, smooth scroll, demo mailto, scroll reveal
assets/
  logo-mark.svg – wordmark's cable mark (copper)
  favicon.svg   – SVG favicon (copper mark on graphite tile)
  favicon.png   – 256×256 PNG fallback (regenerated; the old one was empty)
  og-image.png  – 1200×630 social card (dark / on-brand)
```

Deploy: drop these into the repo root (replacing the old files) and push. Works on GitHub Pages as-is.

## Notes
- The logo mark was recolored from the original purple→red gradient to **copper** to match the new palette. To restore the original brand gradient, change the two `stop-color` values in `assets/logo-mark.svg` (and the inline `<svg class="mark">` in `index.html`, header + footer) back to `#7F57FF` and `#FF5F5F`.
- Demo form composes an email to `contact@elimatic.se` via the visitor's mail client (no backend). Swap for a form service (Formspree, etc.) when you want captured submissions.
- Fonts load from Google Fonts (Archivo / Archivo Expanded / IBM Plex Mono).
