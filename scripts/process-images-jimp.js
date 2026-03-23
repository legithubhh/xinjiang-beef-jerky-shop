import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const srcDir = path.resolve(cwd, 'src/assets/images');
const outDir = path.resolve(cwd, 'public/assets/images');

console.log('Image processing script starting');
console.log('srcDir=', srcDir);
console.log('outDir=', outDir);

if (!fs.existsSync(srcDir)) {
  console.error('Source directory does not exist:', srcDir);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log('Created outDir:', outDir);
}

const tasks = [
  { src: 'mala-beef.jpg', dest: 'mala-beef.jpg' },
  { src: 'spicy-beef.png', dest: 'spicy-beef.jpg' },
  { src: 'cumin-beef.png', dest: 'cumin-beef.jpg' }
];

async function run() {
  for (const t of tasks) {
    const inPath = path.join(srcDir, t.src);
    const outPath = path.join(outDir, t.dest);
    if (!fs.existsSync(inPath)) {
      console.warn('Source not found, skipping:', inPath);
      continue;
    }
    try {
      const image = await Jimp.read(inPath);
      // resize with cover behavior: scale and crop to fill 1200x800
      image.cover(1200, 800, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
      await image.quality(80).writeAsync(outPath);
      console.log('Processed ->', outPath);
    } catch (err) {
      console.error('Failed processing', inPath, err);
    }
  }
}

run();
