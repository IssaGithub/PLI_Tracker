# 🚀 Deployment Guide

This guide covers different ways to deploy your KPI Tracker application.

## 📋 Table of Contents

- [GitHub Pages (Automatic)](#github-pages-automatic)
- [GitHub Pages (Manual)](#github-pages-manual)
- [Other Hosting Platforms](#other-hosting-platforms)
- [Troubleshooting](#troubleshooting)

## 🤖 GitHub Pages (Automatic)

The easiest way to deploy your KPI Tracker is using the included GitHub Actions workflow for automatic deployment.

### Setup Steps:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: KPI Tracker app"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Automatic Deployment**:
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically trigger
   - Your app will be deployed to: `https://[username].github.io/[repository-name]/`
   - Deployment takes 2-5 minutes on first run

### How it Works:

- **Trigger**: Automatic deployment on every push to `main` or `master` branch
- **Build Process**: Installs dependencies, builds the Astro app, and deploys
- **Output**: Static files served from GitHub Pages
- **URL**: Your app will be available at the GitHub Pages URL

### Manual Trigger:

You can also manually trigger deployment:
- Go to **Actions** tab in your GitHub repository
- Click on **Deploy to GitHub Pages** workflow
- Click **Run workflow** button

## 🛠️ GitHub Pages (Manual)

If you prefer manual deployment or need to troubleshoot:

### Prerequisites:
```bash
npm install -g gh-pages
```

### Manual Deployment Script:

Create a deployment script by running:

```bash
# Build the application
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
```

### One-time Setup:
```bash
# Add deployment script to package.json
npm pkg set scripts.deploy="npm run build && npx gh-pages -d dist"

# Then deploy with:
npm run deploy
```

## 🌐 Other Hosting Platforms

Your KPI Tracker is a static application and can be deployed anywhere that serves static files.

### Netlify

1. **Connect Repository**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20`

3. **Deploy**: Netlify will automatically deploy on every push

### Vercel

1. **Connect Repository**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository

2. **Build Settings**:
   - Vercel automatically detects Astro projects
   - No additional configuration needed

3. **Deploy**: Automatic deployment on every push

### Cloudflare Pages

1. **Connect Repository**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Connect your GitHub repository

2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `20`

### Traditional Web Hosting

For traditional web hosting (cPanel, shared hosting, etc.):

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload all files from the `dist/` folder
   - Upload to your web hosting's public folder (usually `public_html/`)

3. **Configure**:
   - Ensure your hosting supports single-page applications
   - Configure redirects if needed (most modern hosts handle this automatically)

## 🔧 Build Configuration

### Environment-Specific Builds

If you need different configurations for different environments:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### Custom Domain (GitHub Pages)

To use a custom domain with GitHub Pages:

1. **Add CNAME file**:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS**:
   - Add a CNAME record pointing to `[username].github.io`
   - Or A records pointing to GitHub Pages IPs

3. **Enable in Settings**:
   - Go to repository Settings > Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 🛡️ Security Considerations

### HTTPS
- All recommended hosting platforms provide free SSL/TLS certificates
- Always enable HTTPS for production deployments
- GitHub Pages automatically provides HTTPS

### Content Security Policy
If you need to add CSP headers, add to your hosting configuration:

```
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; font-src 'self'
```

## 📊 Performance Optimization

### Build Optimization
Your KPI Tracker is already optimized for production:

- **Static Generation**: No server-side rendering needed
- **Asset Optimization**: Astro automatically optimizes CSS and JavaScript
- **Image Optimization**: Consider adding image optimization if you add images
- **Caching**: Static hosting platforms provide excellent caching

### Monitoring
Consider adding performance monitoring:

- **Google Analytics**: For usage analytics
- **Web Vitals**: Monitor Core Web Vitals
- **Uptime Monitoring**: Services like UptimeRobot for availability monitoring

## 🐛 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npm run build
```

#### GitHub Actions Fails
- Check the Actions tab for detailed error logs
- Ensure repository has Pages enabled
- Verify Node.js version compatibility

#### 404 Errors on Deployment
- Check if base path is configured correctly
- Verify all assets are in the dist folder
- Ensure hosting platform serves SPA correctly

#### Local Storage Not Working
- Ensure the site is served over HTTPS in production
- Check browser compatibility
- Verify localStorage is enabled in user's browser

### Getting Help

If you encounter issues:

1. **Check Build Logs**: Review detailed error messages
2. **Verify Configuration**: Ensure all settings are correct
3. **Test Locally**: Always test the production build locally first:
   ```bash
   npm run build
   npm run preview
   ```
4. **Community Support**: Check Astro.js documentation and community forums

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Test the application locally with `npm run dev`
- [ ] Build and test production version with `npm run build && npm run preview`
- [ ] Verify all KPI functionality works (create, edit, delete, export)
- [ ] Test on mobile devices and different screen sizes
- [ ] Check that localStorage persists data correctly
- [ ] Verify CSV export functionality
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Ensure responsive design works on all devices
- [ ] Review browser console for any errors
- [ ] Test with sample KPI data

---

**Happy Deploying! 🚀📊** 