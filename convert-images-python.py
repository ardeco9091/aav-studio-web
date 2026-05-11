#!/usr/bin/env python3
"""
Script para convertir PNG a WebP usando Pillow (PIL)
Instala: pip install Pillow
Ejecuta: python convert-images-python.py
"""

from PIL import Image
import os
import sys
from pathlib import Path

def convert_images():
    img_dir = Path('./assets/img')
    if not img_dir.exists():
        print("❌ Directorio ./assets/img no encontrado")
        return
    
    png_files = list(img_dir.glob('*.png'))
    if not png_files:
        print("❌ No hay archivos PNG para convertir")
        return
    
    print(f"\n📷 Convertiendo {len(png_files)} imágenes a WebP...\n")
    total_saved = 0
    
    for png_file in png_files:
        try:
            # Convertir original
            img = Image.open(png_file)
            webp_file = png_file.with_suffix('.webp')
            img.save(webp_file, 'WEBP', quality=80)
            
            png_size = png_file.stat().st_size
            webp_size = webp_file.stat().st_size
            savings = ((1 - webp_size / png_size) * 100)
            total_saved += png_size - webp_size
            
            print(f"✅ {png_file.name}")
            print(f"   {png_size/1024:.1f}KB → {webp_size/1024:.1f}KB ({savings:.1f}% menor)\n")
            
            # Versiones responsivas
            tablet = img.copy()
            tablet.thumbnail((768, 512))
            tablet_file = png_file.with_stem(png_file.stem + '-tablet')
            tablet.save(tablet_file, 'PNG', quality=85, optimize=True)
            tablet.save(tablet_file.with_suffix('.webp'), 'WEBP', quality=75)
            
            mobile = img.copy()
            mobile.thumbnail((480, 320))
            mobile_file = png_file.with_stem(png_file.stem + '-mobile')
            mobile.save(mobile_file, 'PNG', quality=85, optimize=True)
            mobile.save(mobile_file.with_suffix('.webp'), 'WEBP', quality=75)
            
        except Exception as e:
            print(f"❌ Error con {png_file.name}: {e}\n")
    
    print(f"\n✨ Conversión completada!")
    print(f"📊 Total ahorrado: {total_saved/1024/1024:.2f}MB\n")

if __name__ == '__main__':
    try:
        convert_images()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n📦 Instala Pillow primero:")
        print("pip install Pillow\n")
