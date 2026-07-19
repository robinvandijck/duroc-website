import Jimp from 'jimp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, 'logo_duroc_de_kempen.png');

const img = await Jimp.read(logoPath);

// Find bounding box of non-white (non-transparent) pixels
const { width, height, bitmap } = img;
let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = bitmap.data[idx];
    const g = bitmap.data[idx + 1];
    const b = bitmap.data[idx + 2];
    const a = bitmap.data[idx + 3];
    // Consider a pixel non-background if it's not nearly white and not transparent
    if (a > 10 && !(r > 240 && g > 240 && b > 240)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 4; // small padding
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

console.log(`Original: ${width}x${height}`);
console.log(`Crop to: ${minX},${minY} -> ${cropW}x${cropH}`);

img.crop(minX, minY, cropW, cropH);
await img.writeAsync(logoPath);
console.log('Logo bijgesneden en opgeslagen.');
