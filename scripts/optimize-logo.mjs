#!/usr/bin/env node
import sharp from 'sharp';
import { join } from 'path';
import { existsSync } from 'fs';

const LOGO_INPUT_PATH = './public/ark-logo.png';
const LOGO_OUTPUT_PATH = './public/ark-logo.webp';

async function optimizeLogo() {
  console.log('🎨 Starting ARK logo optimization...\n');
  
  // Check if input file exists
  if (!existsSync(LOGO_INPUT_PATH)) {
    console.error(`✗ Logo file not found: ${LOGO_INPUT_PATH}`);
    process.exit(1);
  }
  
  try {
    // Get original file stats
    const originalStats = await sharp(LOGO_INPUT_PATH).metadata();
    console.log(`📊 Original logo info:`);
    console.log(`  Size: ${originalStats.width}x${originalStats.height}px`);
    console.log(`  Format: ${originalStats.format.toUpperCase()}`);
    console.log(`  File size: ${(originalStats.size / 1024).toFixed(2)} KB\n`);
    
    // Optimize to WebP with high quality for logo
    await sharp(LOGO_INPUT_PATH)
      .webp({ 
        quality: 95, // High quality for logo
        effort: 6,   // Maximum compression effort
        lossless: false // Allow lossy compression for smaller file size
      })
      .toFile(LOGO_OUTPUT_PATH);
    
    // Get optimized file stats
    const optimizedStats = await sharp(LOGO_OUTPUT_PATH).metadata();
    
    console.log(`✅ Logo optimization complete!`);
    console.log(`📊 Optimized logo info:`);
    console.log(`  Size: ${optimizedStats.width}x${optimizedStats.height}px`);
    console.log(`  Format: ${optimizedStats.format.toUpperCase()}`);
    console.log(`  File size: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Savings: ${((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1)}%\n`);
    
    console.log(`📁 Files:`);
    console.log(`  Original: ${LOGO_INPUT_PATH}`);
    console.log(`  Optimized: ${LOGO_OUTPUT_PATH}\n`);
    
    console.log(`📝 Next steps:`);
    console.log(`1. Review the optimized logo quality`);
    console.log(`2. Update your components to use 'ark-logo.webp' instead of 'ark-logo.png'`);
    console.log(`3. Consider keeping both versions for browser compatibility if needed`);
    
  } catch (error) {
    console.error(`✗ Error optimizing logo:`, error.message);
    process.exit(1);
  }
}

// Run the optimization
optimizeLogo().catch(console.error);
