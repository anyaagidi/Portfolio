# Anya Agidi — Portfolio

A clean, minimal React portfolio built with Vite.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel (Step by Step)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New Project"**
3. Import your `portfolio` repository
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**

Your site will be live at `https://your-project-name.vercel.app` in ~60 seconds.

### 3. Custom Domain (Optional)
In Vercel dashboard → Settings → Domains → add `anyaagidi.com` or similar.

## Customization

- **Content**: Edit `src/App.jsx` — all content is in the `experience`, `projects`, and `skills` arrays at the top of the file
- **Colors**: Edit `src/index.css` — change `--accent` to any color you like
- **GitHub link**: Replace `https://github.com` in App.jsx with your real GitHub URL
- **Add project photos**: Drop images in `public/` and reference them in the project cards
