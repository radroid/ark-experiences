# Gallery Media Optimization Guide

This guide explains how to optimize and add new media files to the ARK Scavenger Hunt gallery section.

## 📁 File Structure

All gallery media should be placed in:
```
public/gallery/
├── *.mp4              # Optimized video files
├── *-thumb.jpg        # Video thumbnails
└── *.jpg              # Optimized image files
```

## 🎬 Video Optimization

### Converting Videos to Web-Optimized MP4

**From MOV/other formats:**
```bash
# Navigate to gallery directory
cd public/gallery

# Convert video with web optimization
ffmpeg -i input-video.MOV \
  -vcodec libx264 \
  -acodec aac \
  -crf 23 \
  -movflags +faststart \
  output-video.mp4
```

**Parameters explained:**
- `libx264`: High-quality, widely supported video codec
- `aac`: Standard web audio codec
- `crf 23`: Constant rate factor (18-28 range, 23 is good quality/size balance)
- `+faststart`: Optimizes for web streaming (moves metadata to beginning)

### Creating Video Thumbnails

```bash
# Generate thumbnail from video at 2-second mark
ffmpeg -i video-file.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 2 \
  video-file-thumb.jpg
```

**Parameters:**
- `-ss 00:00:02`: Seek to 2 seconds (adjust as needed)
- `-vframes 1`: Extract only 1 frame
- `-q:v 2`: High quality JPEG output

## 🖼️ Image Optimization

### Converting HEIC to JPG

```bash
# Convert HEIC to web-compatible JPG
sips -s format jpeg input-image.HEIC --out output-image.jpg

# Alternative with quality control
sips -s format jpeg -s formatOptions 90 input-image.HEIC --out output-image.jpg
```

### Image Resizing (if needed)

```bash
# Resize large images to max 1920px width
sips -Z 1920 large-image.jpg
```

## 📝 File Naming Convention

Use lowercase with hyphens for consistency:
- ✅ `team1-solving-timelapse.mp4`
- ✅ `billiards-clue-example.jpg`
- ✅ `ar-clue-discovery-thumb.jpg`
- ❌ `Team 1 Solving Timelapse.mov`
- ❌ `IMG_1234.HEIC`

## 🔧 Adding to Gallery Component

### 1. Determine Media Properties

Check video/image dimensions:
```bash
# For videos
ffprobe -v quiet -show_entries stream=width,height -of csv=p=0 video.mp4

# For images  
sips -g pixelWidth -g pixelHeight image.jpg
```

### 2. Add to Gallery Array

Edit `src/components/sections/gallery-section.tsx`:

```typescript
{
  id: 13, // Next available ID
  type: 'video', // or 'image'
  src: '/gallery/your-video.mp4',
  alt: 'Descriptive alt text for accessibility',
  title: 'Display Title',
  description: 'Engaging description that tells the story',
  category: 'event', // 'event' | 'clue' | 'celebration'
  thumbnail: '/gallery/your-video-thumb.jpg', // For videos only
  width: 1920, // Actual width
  height: 1080, // Actual height
  aspectRatio: 'landscape' // 'landscape' | 'portrait' | 'square'
}
```

### 3. Aspect Ratio Guidelines

- **Landscape**: width > height (e.g., 1920x1080, 1024x768)
- **Portrait**: height > width (e.g., 720x1280, 886x1920)
- **Square**: width ≈ height (e.g., 1000x1000)

## 📊 Optimization Targets

### Video Specifications
- **Format**: MP4 (H.264/AAC)
- **Quality**: CRF 20-25 (balance of quality/size)
- **Max Resolution**: 1920x1080 for landscape, 1080x1920 for portrait
- **Target Size**: Under 15MB per video
- **Frame Rate**: Keep original (usually 30fps)

### Image Specifications  
- **Format**: JPG (for photos), PNG (for graphics with transparency)
- **Quality**: 85-95% JPEG quality
- **Max Width**: 1920px
- **Target Size**: Under 2MB per image

### Thumbnail Specifications
- **Format**: JPG
- **Quality**: High quality (q:v 2)
- **Dimensions**: Match video aspect ratio
- **Target Size**: Under 500KB

## 🚀 Performance Best Practices

### 1. Batch Processing
```bash
# Convert multiple videos at once
for file in *.MOV; do
  ffmpeg -i "$file" -vcodec libx264 -acodec aac -crf 23 -movflags +faststart "${file%.*}.mp4"
done

# Generate thumbnails for all videos
for file in *.mp4; do
  ffmpeg -i "$file" -ss 00:00:02 -vframes 1 -q:v 2 "${file%.*}-thumb.jpg"
done
```

### 2. File Size Monitoring
```bash
# Check file sizes
ls -lh *.mp4 *.jpg

# Find large files (>10MB)
find . -size +10M -name "*.mp4" -o -name "*.jpg"
```

### 3. Cleanup After Conversion
```bash
# Remove original files after successful conversion
rm *.MOV *.HEIC
```

## 🎯 Category Guidelines

### Event (👥)
- Team collaborations
- Location visits
- Problem-solving moments
- Group activities

### Clue (🔍)
- Mystery evidence
- Puzzle elements  
- AR discoveries
- Hidden objects

### Celebration (🎉)
- Victory moments
- Team achievements
- Completion ceremonies
- Happy reactions

## ⚡ Quick Checklist

Before adding new media:
- [ ] Convert to web formats (MP4/JPG)
- [ ] Generate video thumbnails
- [ ] Use consistent naming convention
- [ ] Check file sizes (<15MB videos, <2MB images)
- [ ] Determine correct aspect ratio
- [ ] Add proper alt text and descriptions
- [ ] Test in gallery component
- [ ] Remove original files

## 🔍 Troubleshooting

### Common Issues

**Large file sizes:**
```bash
# Increase compression (higher CRF = smaller file)
ffmpeg -i input.MOV -vcodec libx264 -crf 28 -movflags +faststart output.mp4
```

**Poor thumbnail quality:**
```bash
# Use different timestamp or add scale filter
ffmpeg -i video.mp4 -ss 00:00:05 -vf scale=1280:720 -vframes 1 -q:v 2 thumb.jpg
```

**Aspect ratio issues:**
- Check original dimensions with `ffprobe` or `sips`
- Ensure `aspectRatio` field matches actual dimensions
- Use `object-contain` in CSS to preserve ratios

---

*This guide ensures consistent, optimized media that loads quickly and displays beautifully across all devices.* 