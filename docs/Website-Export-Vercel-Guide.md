# Export Kimi Website to Vercel — Complete Guide

## Overview

**Goal:** Take your Kimi-built React website and host it on Vercel with the ability to edit it yourself.

**What You'll Need:**
- GitHub account (free)
- Vercel account (free)
- Your Kimi website files
- ~30 minutes

---

## Step 1: Export Your Kimi Website

### Option A: If Kimi Provides Download/Export
1. In Kimi, look for **"Export"** or **"Download"** button
2. Download as **ZIP file**
3. Extract ZIP to a folder on your computer

### Option B: Manual Copy-Paste
1. Open your Kimi project
2. Copy all files from the code panel
3. Create a new folder on your computer: `my-website/`
4. Paste files maintaining the structure:
   ```
   my-website/
   ├── index.html
   ├── package.json
   ├── src/
   │   ├── App.jsx
   │   ├── components/
   │   └── ...
   └── public/
       └── ...
   ```

### Option C: If You Only Have a Live URL
If Kimi only gave you a live preview URL (not source code):
1. **Ask Kimi:** "Export the full source code as a downloadable project"
2. Or use browser dev tools (advanced — ask Triton if needed)

---

## Step 2: Create a GitHub Repository

1. **Go to** github.com and sign in (or sign up)
2. **Click** the green "+" button → "New repository"
3. **Name it:** `neptune-marketing-website` (or any name)
4. **Make it:** Public (or Private if you prefer)
5. **Click:** "Create repository"

### Upload Your Files

**Option A: GitHub Web Upload (Easiest)**
1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop your website folder contents
3. Add commit message: "Initial commit"
4. Click **"Commit changes"**

**Option B: Command Line (If familiar with Git)**
```bash
cd my-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/neptune-marketing-website.git
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Create Vercel Account
1. **Go to** vercel.com
2. **Sign up** with your GitHub account (easiest)
3. Authorize Vercel to access your repos

### Import Your Project
1. Click **"Add New Project"**
2. Find your GitHub repo (`neptune-marketing-website`)
3. Click **"Import"**
4. Vercel auto-detects settings (React/Vite/Next.js)
5. Click **"Deploy"**

### Wait for Build
- Build takes 1-2 minutes
- You'll get a URL like: `https://neptune-marketing-website.vercel.app`

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `neptunemarketing.co.uk`
4. Follow DNS instructions from Vercel

---

## Step 4: Edit Your Website

### Option A: StackBlitz (Browser-Based — Easiest)

**Best for:** Quick edits, no software installation

1. **Go to** stackblitz.com
2. **Click** "Import from GitHub"
3. Paste your repo URL
4. Edit files directly in browser
5. Changes auto-save to GitHub
6. Vercel auto-redeploys

**Pros:** No setup, works on any computer, instant preview  
**Cons:** Requires internet, less powerful than VS Code

---

### Option B: GitHub Codespaces (Browser-Based IDE)

**Best for:** Full VS Code experience in browser

1. **Go to** your GitHub repo
2. **Click** green "<> Code" button
3. **Select** "Codespaces" tab
4. **Click** "Create codespace on main"
5. Full VS Code opens in browser
6. Edit → Save → Auto-deploys to Vercel

**Pros:** Full IDE, terminal access, extensions  
**Cons:** Free tier has limited hours

---

### Option C: VS Code Locally (Most Powerful)

**Best for:** Regular editing, maximum control

1. **Download** VS Code: code.visualstudio.com
2. **Install** these extensions:
   - ESLint
   - Prettier
   - GitLens
   - Auto Rename Tag

3. **Clone your repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/neptune-marketing-website.git
   cd neptune-marketing-website
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run locally:**
   ```bash
   npm run dev
   ```
   Site opens at `http://localhost:5173`

6. **Edit files** in VS Code
7. **Save** → Browser auto-refreshes
8. **Deploy:**
   ```bash
   git add .
   git commit -m "Updated text"
   git push
   ```
   Vercel auto-redeploys

---

## Step 5: Common Edits You'll Make

### Edit Text
- Open `src/App.jsx` (or `pages/index.js` if Next.js)
- Find the text you want to change
- Edit between quotes: `"Your new text"`
- Save → Auto-redeploy

### Change Colors
- Find `tailwind.config.js` or CSS files
- Look for color values like `#0a192f`
- Replace with your brand colors
- Save → Auto-redeploy

### Update Images
1. Add new image to `public/` folder
2. Reference in code: `/your-image.jpg`
3. Save → Auto-redeploy

### Add a Page
1. Create new file: `src/pages/About.jsx`
2. Add route in router config
3. Save → Auto-redeploy

---

## Troubleshooting

### Build Fails on Vercel
**Check:**
- `package.json` has correct scripts (`"build": "vite build"`)
- No missing dependencies
- File paths are correct (case-sensitive)

**Fix:**
1. Check Vercel logs (Dashboard → your project → "Deployments")
2. Install missing packages: `npm install package-name`
3. Fix file path case (MyFile vs myfile)

### Changes Not Showing
**Check:**
- Did you commit and push? `git push`
- Check Vercel deployment status
- Clear browser cache (Ctrl+Shift+R)

### Local Won't Start
**Check:**
- Node.js installed: `node --version` (need v18+)
- Dependencies installed: `npm install`
- Port not in use: try `npm run dev -- --port 3000`

---

## Workflow Summary

### For Quick Edits (StackBlitz)
```
StackBlitz → Edit → Save → Auto-deployed
```

### For Major Changes (VS Code)
```
VS Code → Edit → Save → git push → Vercel redeploys
```

### Typical Edit Cycle
1. Open editor (StackBlitz or VS Code)
2. Make changes
3. Save file
4. Test locally (if using VS Code)
5. Commit + push (or just save in StackBlitz)
6. Check live site in 1-2 minutes

---

## Advanced: Add a CMS (Optional)

If you want to edit content without touching code:

### Option 1: Decap CMS (Free, Git-Based)
- Adds an admin panel to your site
- Edit content like a Word document
- Changes saved to GitHub
- Best for: Blog posts, team members, case studies

### Option 2: Sanity.io (Free Tier)
- Separate content management interface
- More powerful than Decap
- Best for: Complex content structures

### Option 3: Notion + Super.so
- Edit in Notion
- Publishes as website
- Best for: Simple sites, quick setup

**Want me to add Decap CMS to your site?** It's ~1 hour setup.

---

## Checklist

- [ ] Exported Kimi website files
- [ ] Created GitHub repo
- [ ] Uploaded files to GitHub
- [ ] Created Vercel account
- [ ] Imported GitHub repo to Vercel
- [ ] Successfully deployed
- [ ] Tested editing in StackBlitz/VS Code
- [ ] Made first edit and redeployed
- [ ] (Optional) Connected custom domain

---

## Need Help?

**Stuck on a step?** Send me:
1. Screenshot of the error
2. What you were trying to do
3. What happened instead

**Want me to do it for you?** I can:
- Set up the GitHub repo
- Configure Vercel
- Add a CMS
- Train you on the workflow

**Questions? Ask Triton.** 🔱
