#!/usr/bin/env node

/**
 * Manual Deployment Script for GitHub Pages
 * Run with: npm run deploy
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

console.log('🚀 Starting deployment to GitHub Pages...\n');

(async () => {
try {
  // Check if we're in a git repository
  console.log('📋 Checking git repository...');
  execSync('git status', { stdio: 'ignore' });
  console.log('✅ Git repository found\n');

  // Check if gh-pages is installed
  console.log('📦 Checking gh-pages dependency...');
  try {
    require.resolve('gh-pages');
    console.log('✅ gh-pages found\n');
  } catch (error) {
    console.log('📦 Installing gh-pages...');
    execSync('npm install --save-dev gh-pages', { stdio: 'inherit' });
    console.log('✅ gh-pages installed\n');
  }

  // Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  console.log('✅ Clean completed\n');

  // Build the application
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');

  // Verify build output
  console.log('🔍 Verifying build output...');
  if (!fs.existsSync('dist')) {
    throw new Error('Build output directory (dist) not found');
  }
  
  const files = fs.readdirSync('dist');
  if (files.length === 0) {
    throw new Error('Build output directory is empty');
  }
  console.log(`✅ Build verification passed (${files.length} files generated)\n`);

  // Deploy to GitHub Pages
  console.log('🌐 Deploying to GitHub Pages...');
  const ghPages = require('gh-pages');
  
  await new Promise((resolve, reject) => {
    ghPages.publish('dist', {
      branch: 'gh-pages',
      message: `Deploy KPI Tracker - ${new Date().toISOString()}`,
      user: {
        name: 'KPI Tracker Deploy Bot',
        email: 'deploy@kpi-tracker.local'
      }
    }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  console.log('✅ Deployment completed successfully!\n');
  
  // Get repository info for URL
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/);
    
    if (match) {
      const [, username, repo] = match;
      const url = `https://${username}.github.io/${repo}/`;
      console.log(`🌍 Your KPI Tracker is now live at: ${url}`);
      console.log('📝 Note: It may take a few minutes for changes to appear\n');
    }
  } catch (error) {
    console.log('🌍 Your KPI Tracker should be live at your GitHub Pages URL');
    console.log('📝 Check your repository settings for the exact URL\n');
  }

  console.log('🎉 Deployment successful! Your KPI Tracker is now online.');

} catch (error) {
  console.error('\n❌ Deployment failed:');
  console.error(error.message);
  console.error('\n💡 Troubleshooting tips:');
  console.error('  - Ensure you have committed your changes');
  console.error('  - Verify you have push access to the repository');
  console.error('  - Check that GitHub Pages is enabled in repository settings');
  console.error('  - Run "npm run build" to test the build locally');
  process.exit(1);
}
})(); 