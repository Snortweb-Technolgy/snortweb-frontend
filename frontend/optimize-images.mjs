import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'public';
const outputDir = 'public';

async function optimize() {
  console.log('Optimizing logo-icon.png...');
  await sharp(path.join(inputDir, 'logo-icon.png'))
    .resize(128, 128, { fit: 'inside' })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(outputDir, 'logo-icon.webp'));
  
  console.log('Optimizing logo.png...');
  await sharp(path.join(inputDir, 'logo.png'))
    .resize(800, 800, { fit: 'inside' })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(outputDir, 'logo.webp'));
    
  console.log('Done!');
}

optimize().catch(console.error);
