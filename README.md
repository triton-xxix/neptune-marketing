# Neptune Marketing Website

> A high-converting landing page for Neptune Marketing - Revenue Recovery & Sales Acceleration specialists.

---

## 🚀 Quick Links

| Service | URL |
|---------|-----|
| **GitHub Repository** | *To be created - see setup below* |
| **StackBlitz Editor** | https://stackblitz.com/github/YOUR_USERNAME/neptune-marketing |
| **Live Website** | *To be deployed on Vercel* |

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Animation:** GSAP
- **Icons:** Lucide React

---

## 📁 Project Structure

```
app/
├── src/
│   ├── sections/          # Page sections (Hero, Services, Pricing, etc.)
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── ... (other sections)
│   ├── components/        # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main app component
│   └── index.css          # Global styles + Tailwind
├── public/images/         # Static images
├── dist/                  # Built files (auto-generated)
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── vite.config.ts         # Vite configuration
```

---

## 📝 How to Edit in StackBlitz

### Option 1: Direct GitHub Import (Recommended)

1. **Ensure code is on GitHub** (see GitHub Setup below)
2. Go to: `https://stackblitz.com/github/YOUR_USERNAME/neptune-marketing`
3. StackBlitz will automatically load the project
4. Edit files directly in your browser
5. Changes auto-save and sync to GitHub

### Option 2: Manual Upload

1. Go to [stackblitz.com](https://stackblitz.com)
2. Click **"Create new project"**
3. Select **React + Vite** template
4. Upload the files from this folder

### StackBlitz Tips

- **Preview:** Changes appear instantly in the right panel
- **File Explorer:** Left sidebar - click files to edit
- **Terminal:** Bottom panel - run `npm run build` to test production build
- **Save:** Auto-saves to GitHub if connected

---

## 🚀 How to Deploy Updates

### Automatic Deployment (Recommended)

Once connected to Vercel, deployments are automatic:

1. **Edit** in StackBlitz or locally
2. **Commit** changes to GitHub (`git commit` and `git push`)
3. **Vercel auto-deploys** within 1-2 minutes
4. **Check** your live site

### Manual Vercel Deploy

1. Go to [vercel.com](https://vercel.com)
2. Select your Neptune Marketing project
3. Click **"Redeploy"** if needed

---

## 🎨 Common Edits

### Editing Text

Most text is in the `src/sections/` folder:

| Section | File | What to Edit |
|---------|------|--------------|
| Hero headline | `HeroSection.tsx` | Look for `<h1>` tags |
| Services | `ServicesSection.tsx` | Card titles and descriptions |
| Pricing | `PricingSection.tsx` | Plan names, prices, features |
| Contact | `ContactSection.tsx` | Contact info, form text |
| Navigation | `Navigation.tsx` | Menu items |
| Footer | `Footer.tsx` | Links, copyright |

**Example:** Changing the hero headline:
```tsx
// In HeroSection.tsx
<h1 className="text-4xl md:text-6xl font-bold">
  YOUR NEW HEADLINE HERE
</h1>
```

### Changing Colors

Colors are defined in `tailwind.config.js`:

```javascript
colors: {
  // Brand colors
  primary: {
    DEFAULT: '#0f172a',  // Deep blue - change this
    foreground: '#ffffff',
  },
  // ... other colors
}
```

Common Tailwind color classes used:
- Background: `bg-slate-900`, `bg-slate-800`
- Text: `text-white`, `text-slate-300`, `text-cyan-400`
- Accents: `text-cyan-400`, `bg-cyan-500`

### Changing Images

Images are stored in:
- `public/images/` - for static images
- `src/sections/` - referenced in components

**To change the hero background:**
1. Add your new image to `public/images/`
2. Edit `HeroSection.tsx`:
```tsx
<div 
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/YOUR-IMAGE.jpg)' }}
/>
```

**Recommended image sizes:**
- Hero background: 1920x1080px
- Section backgrounds: 1920x1080px
- Icons/Logos: SVG or 200x200px PNG

### Adding a New Section

1. Create a new file in `src/sections/` (e.g., `NewSection.tsx`)
2. Add it to `App.tsx`:
```tsx
import { NewSection } from './sections/NewSection';

function App() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <NewSection />  {/* Add here */}
      <ServicesSection />
      {/* ... */}
    </>
  );
}
```

---

## 🐛 Troubleshooting

### Build fails on Vercel
- Check that `dist` folder is in `.gitignore` (it should be)
- Verify `package.json` has the correct build script

### Changes not showing
- Clear browser cache (Ctrl+Shift+R)
- Check Vercel deployment logs
- Ensure changes were pushed to GitHub

### Images not loading
- Check image is in `public/images/` folder
- Verify path starts with `/images/` (not `images/`)
- Check file extension matches exactly

---

## 📞 Need Help?

Contact **Triton** for assistance:

- **Telegram:** @Tritonxxbot
- **Email:** triton.xxix@neptunemarketing.co.uk

**Common requests Triton can help with:**
- Complex layout changes
- Adding new animations
- Setting up forms or integrations
- Performance optimization
- Custom components

---

## 🏗️ GitHub Setup Instructions

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `neptune-marketing`
3. Set to **Public** or **Private**
4. **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**

### Step 2: Push Local Code

Run these commands in the project folder:

```bash
# Add the GitHub remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/neptune-marketing.git

# Push the code
git push -u origin main
```

### Step 3: Verify

- Refresh your GitHub repository page
- You should see all files uploaded

---

## 🌐 Vercel Setup Instructions

### Step 1: Connect to GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Select the `neptune-marketing` repository

### Step 2: Configure Build

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (1-2 minutes)
3. Your site is live! 🎉

### Step 4: Custom Domain (Optional)

1. In Vercel project settings, go to **"Domains"**
2. Add your domain (e.g., `neptunemarketing.co.uk`)
3. Follow DNS configuration instructions

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🔒 Environment Variables

Create `.env.local` for local development (not committed to Git):

```env
# Example API keys or configuration
VITE_API_KEY=your_key_here
```

**Note:** For Vercel, add environment variables in Project Settings → Environment Variables.

---

## 📄 License

Private - Neptune Marketing

---

*Built with ❤️ for Neptune Marketing*
