const { Jimp } = require('jimp');
const path = require('path');

const logoPath = path.join(__dirname, 'logo_duroc_de_kempen.png');

Jimp.read(logoPath).then(img => {
  const { width, height, bitmap } = img;

  // Maak witte/bijna-witte pixels transparant
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = bitmap.data[idx];
      const g = bitmap.data[idx + 1];
      const b = bitmap.data[idx + 2];
      // Witte pixels: alle kanalen > 230
      if (r > 230 && g > 230 && b > 230) {
        bitmap.data[idx + 3] = 0; // alpha = transparant
      }
    }
  }

  // Zoek bounding box van niet-transparante pixels
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = bitmap.data[(y * width + x) * 4 + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  console.log(`Bijgesneden naar: ${cropW}x${cropH}`);

  img.crop({ x: minX, y: minY, w: cropW, h: cropH });
  return img.write(logoPath);
}).then(() => {
  console.log('Logo transparant gemaakt en opgeslagen.');
}).catch(err => console.error(err));
