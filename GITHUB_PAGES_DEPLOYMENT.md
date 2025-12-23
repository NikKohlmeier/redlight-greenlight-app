# GitHub Pages Deployment Guide

This guide explains how to deploy the Red Light Green Light app to GitHub Pages.

## Prerequisites

- A GitHub repository
- Node.js and npm installed locally
- Git configured

## Quick Deploy (Manual)

1. **Build the web app:**
   ```bash
   npm run build:web
   ```
   This creates a `docs/` folder with the static web build.

2. **Commit and push:**
   ```bash
   git add docs/
   git commit -m "Deploy web app to GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **main** branch and **/docs** folder
   - Click **Save**

4. **Access your app:**
   - Your app will be available at: `https://[username].github.io/[repository-name]`
   - It may take a few minutes for the first deployment

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys on every push to `main`.

### Setup

1. **Enable GitHub Actions:**
   - Go to **Settings** → **Actions** → **General**
   - Ensure "Allow all actions and reusable workflows" is enabled
   - Save

2. **Push to main:**
   - The workflow will automatically trigger on push
   - Check the **Actions** tab to see deployment progress

3. **Configure GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will handle deployments automatically

## Build Scripts

- `npm run build:web` - Builds the web app to `docs/` folder
- `npm run deploy:web` - Builds and shows deployment instructions

## Troubleshooting

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (should be 18+)
- Review error messages in terminal

### Pages not updating
- Wait a few minutes for GitHub to process
- Check GitHub Actions workflow status
- Verify `docs/` folder exists and contains `index.html`

### Routing issues
- GitHub Pages serves static files, so client-side routing should work
- If using hash routing, ensure your navigation is configured correctly

## Notes

- The `.nojekyll` file prevents Jekyll from processing the site
- The build outputs to `docs/` folder (required for GitHub Pages)
- Web app uses `react-native-web` for web compatibility
- All app functionality should work in the browser

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `docs/` folder with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

