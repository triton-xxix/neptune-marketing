# Neptune Marketing — Text-Based Logo Pack

*Simple, professional logos using typography only*

---

## 🎨 DESIGN SPECIFICATIONS

### Primary Logo
**Text:** Neptune Marketing  
**Font:** Sora (Google Font) — matches website  
**Weight:** Semi-Bold (600) or Bold (700)  
**Style:** Clean, modern, professional

### Color Variants

#### 1. Navy Background (Primary)
```
Background: #0B0F1C (Navy)
Text: #F4F7FB (Off-white)
Accent: #2EC3E5 (Cyan) on "Marketing" or underline
```

#### 2. Light Background
```
Background: #F4F7FB (Off-white)
Text: #0B0F1C (Navy)
Accent: #2EC3E5 (Cyan) on "Marketing"
```

#### 3. Transparent (For overlays)
```
Background: Transparent
Text: #0B0F1C (Navy) or #F4F7FB (Off-white)
```

---

## 📐 SIZES & FORMATS

### LinkedIn Company Logo
- **Size:** 300 x 300 pixels (square)
- **Format:** PNG
- **Background:** Navy (#0B0F1C)
- **Text:** "NM" monogram or full "Neptune Marketing"

### LinkedIn Banner
- **Size:** 1128 x 191 pixels
- **Format:** PNG or JPG
- **Design:** Navy gradient + text + subtle underwater effect

### Website Favicon
- **Size:** 32 x 32, 64 x 64, 180 x 180 (Apple touch)
- **Format:** PNG, ICO
- **Design:** "N" or trident icon

### Email Signature
- **Size:** 200 x 50 pixels
- **Format:** PNG
- **Background:** Transparent

---

## 🖼️ SVG CODE (Copy & Paste)

### Logo Variant 1: Full Name (Navy Background)
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#0B0F1C"/>
  <text x="150" y="135" font-family="Sora, sans-serif" font-size="32" font-weight="600" fill="#F4F7FB" text-anchor="middle">Neptune</text>
  <text x="150" y="175" font-family="Sora, sans-serif" font-size="32" font-weight="600" fill="#2EC3E5" text-anchor="middle">Marketing</text>
</svg>
```

### Logo Variant 2: Monogram "NM"
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#0B0F1C"/>
  <text x="150" y="185" font-family="Sora, sans-serif" font-size="120" font-weight="700" fill="#F4F7FB" text-anchor="middle">N</text>
  <text x="210" y="185" font-family="Sora, sans-serif" font-size="80" font-weight="600" fill="#2EC3E5" text-anchor="middle">M</text>
</svg>
```

### Logo Variant 3: With Tagline
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#0B0F1C"/>
  <text x="150" y="120" font-family="Sora, sans-serif" font-size="28" font-weight="600" fill="#F4F7FB" text-anchor="middle">Neptune</text>
  <text x="150" y="155" font-family="Sora, sans-serif" font-size="28" font-weight="600" fill="#2EC3E5" text-anchor="middle">Marketing</text>
  <text x="150" y="200" font-family="Sora, sans-serif" font-size="11" font-weight="400" fill="#A9B3C5" text-anchor="middle">The leads you forgot about?</text>
  <text x="150" y="218" font-family="Sora, sans-serif" font-size="11" font-weight="400" fill="#A9B3C5" text-anchor="middle">We turn them into revenue.</text>
</svg>
```

---

## 🎯 LINKEDIN BANNER SVG

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <!-- Background -->
  <rect width="1128" height="191" fill="#0B0F1C"/>
  
  <!-- Gradient overlay -->
  <defs>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2EC3E5;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#0B0F1C;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="1128" height="191" fill="url(#glow)"/>
  
  <!-- Company Name -->
  <text x="60" y="85" font-family="Sora, sans-serif" font-size="36" font-weight="700" fill="#F4F7FB">Neptune</text>
  <text x="235" y="85" font-family="Sora, sans-serif" font-size="36" font-weight="700" fill="#2EC3E5">Marketing</text>
  
  <!-- Tagline -->
  <text x="60" y="120" font-family="Sora, sans-serif" font-size="16" font-weight="400" fill="#A9B3C5">We turn dormant leads into revenue.</text>
  
  <!-- Value prop -->
  <text x="60" y="150" font-family="Sora, sans-serif" font-size="14" font-weight="500" fill="#2EC3E5">No upfront fees. We only get paid when you do. →</text>
</svg>
```

---

## 🛠️ HOW TO USE

### Option 1: Use Online SVG Editor
1. Go to vectr.com or svgviewer.dev
2. Paste the SVG code
3. Export as PNG at desired size
4. Upload to LinkedIn

### Option 2: Code-Based (Recommended)
1. Save SVG code as `.svg` file
2. Use ImageMagick or online converter
3. Convert to PNG: `convert -background none logo.svg logo.png`

### Option 3: Canva/Figma
1. Create new design (300x300 for logo, 1128x191 for banner)
2. Set background color: #0B0F1C
3. Add text: "Neptune Marketing" in Sora font
4. Download as PNG

---

## 📦 FILE NAMING

```
logo-pack/
├── linkedin-logo-300x300.png
├── linkedin-banner-1128x191.png
├── favicon-32x32.png
├── favicon-64x64.png
├── apple-touch-180x180.png
├── email-signature.png
├── logo-source.svg
└── banner-source.svg
```

---

## ✅ CHECKLIST

- [ ] Create logo in SVG
- [ ] Export LinkedIn logo (300x300 PNG)
- [ ] Export LinkedIn banner (1128x191 PNG)
- [ ] Create favicon variants
- [ ] Test on dark backgrounds
- [ ] Test on light backgrounds
- [ ] Upload to LinkedIn company page

---

*Created: 2026-02-08*
