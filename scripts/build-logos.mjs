// Turns the original logos in assets/logos/ into single-tone PNGs in public/logos/.
// Darker parts of a logo become more opaque, white parts become transparent,
// so every logo ends up in the same flat ink colour regardless of its brand colours.
// Run with: npm run logos
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/logos";
const OUT = "public/logos";
const HEIGHT = 160; // px; displayed at roughly 24–40px, so this stays sharp on retina screens
const INK = [33, 32, 28]; // #21201c, the site's ink colour

await mkdir(OUT, { recursive: true });

for (const file of await readdir(SRC)) {
  if (!/\.(svg|png|jpe?g)$/i.test(file)) continue;
  const name = path.parse(file).name;

  const { data, info } = await sharp(path.join(SRC, file), { density: 600 })
    .resize({ height: HEIGHT })
    .trim()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    out[i] = INK[0];
    out[i + 1] = INK[1];
    out[i + 2] = INK[2];
    out[i + 3] = Math.round(a * (1 - lum));
  }

  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ palette: true, quality: 95, compressionLevel: 9 })
    .toFile(path.join(OUT, `${name}.png`));

  console.log(`${name}.png  ${info.width}x${info.height}  ratio ${(info.width / info.height).toFixed(2)}`);
}
