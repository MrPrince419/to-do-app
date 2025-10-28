# PWA Icons Setup Guide

This app requires the following icon files in the `public` folder for full PWA functionality:

## Required Icons

1. **pwa-192x192.png** (192 x 192 pixels)
   - Used for Android home screen
   - Standard PWA icon size

2. **pwa-512x512.png** (512 x 512 pixels)
   - Used for splash screens
   - Higher quality PWA icon

3. **apple-touch-icon.png** (180 x 180 pixels)
   - Used for iOS home screen
   - Required for "Add to Home Screen" on iPhone

4. **favicon.ico** (Optional)
   - Browser tab icon
   - 32 x 32 pixels (or multi-size ICO file)

## Quick Setup Options

### Option 1: Use an Online Generator (Recommended)

1. **PWA Image Generator**
   - Go to: https://www.pwabuilder.com/imageGenerator
   - Upload a square image (at least 512x512px)
   - Download the generated package
   - Extract and copy the images to the `public` folder

2. **Favicon.io**
   - Go to: https://favicon.io/
   - Use text, image, or emoji to create icons
   - Download and extract to `public` folder

### Option 2: Create Manually

Use any image editor (Photoshop, GIMP, Figma, Canva, etc.):

1. Create a square image with your logo/icon
2. Resize to each required dimension
3. Export as PNG files
4. Name them exactly as specified above
5. Place in the `public` folder

### Option 3: Use Simple Placeholder

For quick testing, you can create simple colored squares:

**Using ImageMagick (if installed):**
```bash
# 192x192
magick -size 192x192 xc:#319795 public/pwa-192x192.png

# 512x512
magick -size 512x512 xc:#319795 public/pwa-512x512.png

# Apple touch icon
magick -size 180x180 xc:#319795 public/apple-touch-icon.png
```

**Using Python (if installed):**
```python
from PIL import Image

# 192x192
img = Image.new('RGB', (192, 192), color='#319795')
img.save('public/pwa-192x192.png')

# 512x512
img = Image.new('RGB', (512, 512), color='#319795')
img.save('public/pwa-512x512.png')

# Apple touch icon
img = Image.new('RGB', (180, 180), color='#319795')
img.save('public/apple-touch-icon.png')
```

## Design Tips

- Use a simple, recognizable logo or icon
- Avoid text (too small to read at small sizes)
- Use high contrast colors
- Make sure the icon looks good on both light and dark backgrounds
- Test how it looks on your actual phone home screen

## Verification

After adding the icons:

1. Run `npm run build`
2. Check that all icons are in the `public` folder
3. Deploy or run `npm run preview`
4. Open in a browser and check the manifest
5. Try installing on your phone

## Current Status

❌ **Icons are missing!** 
The app will work, but you won't be able to install it on your home screen until you add the icon files.

Once you've added the icons, delete this file or check it off! ✅

