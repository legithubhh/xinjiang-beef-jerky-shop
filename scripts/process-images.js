import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

const imagesDir = path.resolve('./src/assets/images');

const tasks = [
  'mala-beef.jpg',
  'spicy-beef.png',
  'cumin-beef.png'
];

async function processImages() {
  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory does not exist:', imagesDir);
    process.exit(1);
  }

  for (const name of tasks) {
    const srcPath = path.join(imagesDir, name);
    const destPath = srcPath; // overwrite the original so imports keep working

    if (!fs.existsSync(srcPath)) {
      console.warn('Source not found, skipping:', srcPath);
      continue;
    }

    try {
      const img = await Jimp.read(srcPath);
      // cover will resize and crop to exactly 1200x800 keeping center
      img.cover(1200, 800, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);

      const ext = path.extname(destPath).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg') {
        await img.quality(80).writeAsync(destPath);
      } else if (ext === '.png') {
        // for png just write; Jimp will keep png format
        await img.writeAsync(destPath);
      } else {
        // fallback to jpg
        const jpgPath = destPath + '.jpg';
        await img.quality(80).writeAsync(jpgPath);
        console.log('Wrote fallback jpg:', jpgPath);
      }

      console.log('Processed:', srcPath);
    } catch (err) {
      console.error('Failed processing', srcPath, err);
    }
  }
}

processImages();
