#!/usr/bin/env node
/**
 * Script único para convertir imágenes PNG a WebP
 * Coloca este archivo en la raíz y ejecuta: node convert-images.js
 * O agregalo a package.json como "convert-images": "node convert-images.js"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = './assets/img';

console.log('\n🖼️  Iniciando conversión de imágenes a WebP...\n');

// Verificar si ImageMagick está disponible
try {
  execSync('convert --version', { stdio: 'ignore' });
  console.log('✅ ImageMagick detectado. Usando convert...\n');
  
  const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png') && !f.includes('-'));
  
  for (const file of files) {
    const baseName = file.replace('.png', '');
    const inputPath = path.join(imgDir, file);
    
    // Convertir a WebP
    execSync(`convert "${inputPath}" -quality 80 -define webp:method=6 "${path.join(imgDir, baseName + '.webp')}"`);
    
    // Versiones responsivas
    execSync(`convert "${inputPath}" -resize 768x512\\> "${path.join(imgDir, baseName + '-tablet.png')}"`);
    execSync(`convert "${path.join(imgDir, baseName + '-tablet.png')}" -quality 80 -define webp:method=6 "${path.join(imgDir, baseName + '-tablet.webp')}"`);
    
    execSync(`convert "${inputPath}" -resize 480x320\\> "${path.join(imgDir, baseName + '-mobile.png')}"`);
    execSync(`convert "${path.join(imgDir, baseName + '-mobile.png')}" -quality 80 -define webp:method=6 "${path.join(imgDir, baseName + '-mobile.webp')}"`);
    
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(path.join(imgDir, baseName + '.webp')).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${file} → ${(originalSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB (${savings}% menor)`);
  }
  
  console.log('\n✨ Conversión completada!\n');
  
} catch {
  console.log('⚠️  ImageMagick no encontrado.\n');
  console.log('📝 INSTALACIÓN REQUERIDA:\n');
  console.log('Windows (con Chocolatey):');
  console.log('  choco install imagemagick\n');
  console.log('Mac (con Homebrew):');
  console.log('  brew install imagemagick\n');
  console.log('Linux (Debian/Ubuntu):');
  console.log('  sudo apt-get install imagemagick\n');
  console.log('Luego ejecuta: node convert-images.js\n');
}
