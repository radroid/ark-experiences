#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const FOUNDER_IMAGES_DIR = './public/founders';
const GALLERY_IMAGES_DIR = './public/gallery';
const OUTPUT_FOUNDER_DIR = './public/founders-optimized';
const OUTPUT_GALLERY_DIR = './public/gallery-optimized';

async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, quality = 85 } = options;
  
  try {
    let pipeline = sharp(inputPath);
    
    if (width) {
      pipeline = pipeline.resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    await pipeline
      .webp({ quality })
      .toFile(outputPath);
      
    const stats = await sharp(inputPath).metadata();
    const outputStats = await sharp(outputPath).metadata();
    
    console.log(`✓ Optimized: ${inputPath}`);
    console.log(`  Original: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`  Optimized: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Savings: ${((1 - outputStats.size / stats.size) * 100).toFixed(1)}%\n`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeDirectory(inputDir, outputDir, options = {}) {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  const files = await readdir(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  for (const file of imageFiles) {
    const inputPath = join(inputDir, file);
    const parsedFile = parse(file);
    const outputPath = join(outputDir, `${parsedFile.name}.webp`);
    
    await optimizeImage(inputPath, outputPath, options);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  // Optimize founder images (smaller size for profile pics)
  console.log('📸 Optimizing founder images...');
  await optimizeDirectory(FOUNDER_IMAGES_DIR, OUTPUT_FOUNDER_DIR, {
    width: 400, // Max width for profile pictures
    quality: 85
  });
  
  // Optimize gallery images
  console.log('🎨 Optimizing gallery images...');
  await optimizeDirectory(GALLERY_IMAGES_DIR, OUTPUT_GALLERY_DIR, {
    width: 1200, // Max width for gallery images
    quality: 82
  });
  
  console.log('✅ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review optimized images in /founders-optimized and /gallery-optimized');
  console.log('2. Replace original files if satisfied with quality');
  console.log('3. Update image references in your components to use .webp extension');
}

main().catch(console.error);

