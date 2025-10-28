# 🚀 Deployment Guide

This guide will help you deploy your Todo PWA to production so you can access it from anywhere and install it on your iPhone.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Why Vercel?
- Free tier available
- Automatic HTTPS
- GitHub integration
- Zero configuration for Vite apps
- Perfect for PWAs

#### Steps:

1. **Sign Up for Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Your Code to Git (if not already)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Click "New Project" in Vercel dashboard
   - Import your Git repository
   - Vercel will auto-detect Vite settings
   - **Add Environment Variables:**
     - `VITE_SUPABASE_URL` → Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` → Your Supabase anon key
   - Click "Deploy"

4. **Configure Supabase**
   - In Supabase dashboard: Authentication → URL Configuration
   - Add your Vercel URL to "Site URL"
   - Add your Vercel URL to "Redirect URLs"

5. **Done!** Your app is live at `your-app.vercel.app`

### Option 2: Netlify

1. **Sign Up for Netlify**
   - Go to [https://www.netlify.com](https://www.netlify.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Deploy**
   - Click "New site from Git"
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables (same as Vercel)
   - Click "Deploy site"

3. **Configure Supabase** (same as above)

### Option 3: GitHub Pages (Free, but requires configuration)

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   Add base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Source: gh-pages branch
   - Save

### Option 4: Self-Hosted (VPS/Server)

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your server

3. **Configure web server** (nginx example):
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     
     location / {
       root /path/to/dist;
       try_files $uri $uri/ /index.html;
     }
   }
   ```

4. **Set up SSL** (use Let's Encrypt):
   ```bash
   certbot --nginx -d yourdomain.com
   ```

## Post-Deployment Checklist

### 1. Test the Deployment
- [ ] Visit your deployed URL
- [ ] Try signing in with magic link
- [ ] Add/edit/delete todos
- [ ] Check real-time updates (open in 2 tabs)
- [ ] Test offline mode (disconnect internet)

### 2. Configure Supabase for Production
- [ ] Add production URL to Supabase redirect URLs
- [ ] Set up proper SMTP for email (optional but recommended)
- [ ] Review Row Level Security policies

### 3. Test PWA Installation

#### On iPhone:
1. Open Safari (not Chrome!)
2. Navigate to your deployed URL
3. Tap the Share button (square with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Tap "Add"
6. Check that the icon appears on your home screen
7. Open the app - it should work standalone!

#### On Android:
1. Open Chrome
2. Navigate to your deployed URL
3. Tap the menu (three dots)
4. Tap "Add to Home screen" or "Install app"
5. Confirm

### 4. PWA Features to Verify
- [ ] App installs on home screen
- [ ] Splash screen appears on launch
- [ ] Status bar matches app theme
- [ ] Works in standalone mode (no browser UI)
- [ ] Offline functionality works
- [ ] Push notifications ready (if you add them later)

## Environment Variables for Production

Make sure these are set in your deployment platform:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

⚠️ **Never commit your `.env` file!** It's in `.gitignore` for security.

## Custom Domain (Optional)

### Vercel:
1. Domains → Add Domain
2. Follow DNS configuration steps
3. SSL is automatic!

### Netlify:
1. Domain settings → Add custom domain
2. Configure DNS
3. SSL is automatic!

## Monitoring & Analytics (Optional)

Consider adding:
- **Vercel Analytics** - Free performance monitoring
- **Google Analytics** - User behavior tracking
- **Sentry** - Error tracking
- **Supabase Analytics** - Database usage monitoring

## Updating Your App

After making changes:

### With Vercel/Netlify:
```bash
git add .
git commit -m "Your changes"
git push
```
Automatic deployment will trigger!

### Manual deployment:
```bash
npm run build
# Upload new dist folder
```

## Performance Tips

1. **Images**: Compress your PWA icons
2. **Bundle size**: Keep dependencies minimal
3. **Caching**: Service worker handles this automatically
4. **CDN**: Vercel/Netlify provide this automatically

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Environment variables not exposed in code
- [ ] Supabase RLS policies properly configured
- [ ] CORS configured correctly
- [ ] CSP headers set (optional, advanced)

## Troubleshooting

### Magic Link Emails Not Working
- Check Supabase email settings
- Configure custom SMTP in production
- Check spam folder
- Verify redirect URLs

### PWA Not Installing
- Must be served over HTTPS
- All icons must be present
- manifest.json must be valid
- Check browser console for errors

### Offline Mode Not Working
- Service worker must be registered
- Check browser console
- Try in Incognito mode first
- Clear cache and reload

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

---

Good luck with your deployment! 🚀

