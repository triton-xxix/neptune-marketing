# Neptune Marketing Website - Section Guide

## 📄 Section Files Reference

| Section | File | Content to Edit |
|---------|------|-----------------|
| **Hero** | `HeroSection.tsx` | Headline, subheadline, CTA button, background image |
| **Services** | `ServicesSection.tsx` | Service cards, icons, descriptions |
| **What We Do** | `WhatWeDoSection.tsx` | Process/features highlight |
| **How It Works** | `HowItWorksSection.tsx` | Step-by-step process |
| **Who It's For** | `WhoItsForSection.tsx` | Target audience cards |
| **Why Neptune** | `WhyNeptuneSection.tsx` | Value propositions |
| **Proof** | `ProofSection.tsx` | Testimonials, results |
| **Pricing** | `PricingSection.tsx` | Pricing tiers, features |
| **Contact** | `ContactSection.tsx` | Contact form, info, CTA |
| **Navigation** | `components/Navigation.tsx` | Menu items, logo |
| **Footer** | `components/Footer.tsx` | Links, copyright |

---

## 🎨 Quick Edits Reference

### Change Hero Text
File: `src/sections/HeroSection.tsx`

Look for:
```tsx
<span ref={labelRef} className="...">
  REVENUE RECOVERY SPECIALISTS  ← Change this label
</span>

<h1 ref={headlineRef} className="...">
  <span className="word">Recover</span>  ← Change these words
  <span className="word">Lost</span>
  <span className="word">Revenue</span>
</h1>

<p ref={subheadlineRef} className="...">
  We help businesses recover...  ← Change subheadline
</p>
```

### Change Background Image
File: `src/sections/HeroSection.tsx`

Look for:
```tsx
<div
  ref={bgRef}
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}  ← Change path
/>
```

Add new image to: `public/images/your-image.jpg`

### Change Primary Color
File: `tailwind.config.js`

Look for:
```javascript
colors: {
  primary: {
    DEFAULT: '#0f172a',  ← Change this hex code
    foreground: '#ffffff',
  },
}
```

### Add/Change Service
File: `src/sections/ServicesSection.tsx`

Look for the `services` array:
```tsx
const services = [
  {
    title: 'Lead Reactivation',  ← Change title
    description: '...',           ← Change description
    icon: Phone,                  ← Change icon (from lucide-react)
  },
  // Add more services here
];
```

### Change Pricing
File: `src/sections/PricingSection.tsx`

Look for the pricing cards:
```tsx
<div className="pricing-card">
  <h3 className="text-xl font-bold">Starter</h3>  ← Plan name
  <div className="text-4xl font-bold">£2,500</div>  ← Price
  {/* Features list */}
</div>
```

---

## 📁 Component Locations

### UI Components (shadcn/ui)
Location: `src/components/ui/`

Available components:
- `button.tsx` - Buttons
- `card.tsx` - Cards
- `dialog.tsx` - Modal dialogs
- `form.tsx` - Form elements
- `input.tsx` - Text inputs
- `textarea.tsx` - Text areas
- `select.tsx` - Dropdowns
- And many more...

### Custom Components
Location: `src/components/`

- `Navigation.tsx` - Top navigation bar
- `Footer.tsx` - Page footer

---

## 🖼️ Image Handling

### Adding New Images

1. Copy image to: `public/images/`
2. Reference in code: `/images/your-image.jpg`

**Example:**
```tsx
<img src="/images/my-photo.jpg" alt="Description" />
```

### Current Images

| File | Usage |
|------|-------|
| `hero-bg.jpg` | Hero section background |
| `depth-bg.jpg` | Deep section backgrounds |
| `cavern-bg.jpg` | Secondary backgrounds |
| `split-bg.jpg` | Split section backgrounds |

---

## 🔤 Icons

All icons from **Lucide React**:

```tsx
import { Phone, Mail, ArrowRight, Check } from 'lucide-react';

<Phone className="w-6 h-6" />
<Mail className="w-6 h-6" />
```

Browse icons: https://lucide.dev/icons/

---

## 🎯 Animation Notes

The site uses **GSAP** for animations:

- Animations trigger on scroll
- Defined in `useEffect` hooks
- Modify timing in the gsap.timeline() config

**To disable animations for testing:**
Comment out the `useEffect` hooks in section files.

---

## 🧪 Testing Changes

### Local Development
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build Preview
```bash
npm run build
npm run preview
```

---

## 📞 Support

Stuck? Contact Triton:
- Telegram: @Tritonxxbot
- Email: triton.xxix@neptunemarketing.co.uk
