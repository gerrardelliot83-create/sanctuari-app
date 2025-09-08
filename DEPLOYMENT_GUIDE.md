# Sanctuari Deployment Guide

Follow these steps to deploy Sanctuari to GitHub and Vercel.

## Prerequisites
Before starting, ensure you have accounts for:
- GitHub
- Vercel
- Supabase
- Razorpay (optional for now)
- UploadThing (optional for now)

## Step 1: Set up Supabase

### 1.1 Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Choose a region close to India (Singapore recommended)
3. Set a strong database password and save it

### 1.2 Configure Database
1. Once project is created, go to **SQL Editor** in Supabase dashboard
2. Copy the entire content from `supabase-setup.sql` file
3. Paste and run it in the SQL Editor
4. This will create all tables and seed initial data

### 1.3 Enable Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Under Email Settings:
   - Enable "Confirm email" (recommended)
   - Set Site URL to: `https://your-app-name.vercel.app`
   - Add Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `https://your-app-name.vercel.app/auth/callback`

### 1.4 Get API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public` key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - `service_role` key → SUPABASE_SERVICE_ROLE_KEY (keep secret!)

## Step 2: Push to GitHub

### 2.1 Initialize Git Repository
```bash
cd sanctuari-app
git init
git add .
git commit -m "Initial commit: Sanctuari insurance platform"
```

### 2.2 Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `sanctuari-app`
3. Keep it private if you prefer
4. Don't initialize with README (we already have one)

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/sanctuari-app.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project
1. Go to [Vercel](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository `sanctuari-app`
4. Vercel will auto-detect Next.js

### 3.2 Configure Environment Variables
In Vercel's project settings, add these environment variables:

```env
# Required for basic functionality
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application settings
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_SITE_NAME=Sanctuari

# Optional - Add later when you have accounts
UPLOADTHING_TOKEN=skip_for_now
ANTHROPIC_API_KEY=skip_for_now
LLAMA_PARSE_API_KEY=skip_for_now
NEXT_PUBLIC_RAZORPAY_KEY_ID=skip_for_now
RAZORPAY_KEY_SECRET=skip_for_now
```

### 3.3 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-app-name.vercel.app`

## Step 4: Post-Deployment Setup

### 4.1 Update Supabase URLs
1. Go back to Supabase → **Authentication** → **URL Configuration**
2. Update Site URL to your Vercel URL: `https://your-app-name.vercel.app`
3. Add your Vercel URL to Redirect URLs

### 4.2 Test the Application
1. Visit your deployed app
2. Try signing up with your email
3. Check your email for the magic link
4. Complete the onboarding flow
5. Create a test RFQ

## Step 5: Optional Services Setup

### 5.1 Razorpay (for payments)
1. Create account at [Razorpay](https://razorpay.com)
2. Get Test API keys from Dashboard
3. Update environment variables in Vercel

### 5.2 UploadThing (for file uploads)
1. Create account at [UploadThing](https://uploadthing.com)
2. Create a new app
3. Get API keys and update in Vercel

### 5.3 Anthropic API (for AI features)
1. Get API key from [Anthropic](https://console.anthropic.com)
2. Update in Vercel environment variables

## Troubleshooting

### Common Issues:

1. **Magic link not working:**
   - Check Supabase email settings
   - Verify redirect URLs include your domain
   - Check spam folder

2. **Database errors:**
   - Ensure all SQL commands ran successfully
   - Check Supabase logs for errors
   - Verify environment variables are correct

3. **Build failures on Vercel:**
   - Check build logs for specific errors
   - Ensure all dependencies are in package.json
   - Try building locally first: `npm run build`

## GitHub Commands Summary

```bash
# Initial setup
cd sanctuari-app
git init
git add .
git commit -m "Initial commit: Sanctuari insurance platform"
git remote add origin https://github.com/YOUR_USERNAME/sanctuari-app.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "Your commit message"
git push
```

## Monitoring

### Vercel Dashboard
- Check deployment status
- View function logs
- Monitor performance

### Supabase Dashboard
- Monitor database usage
- Check authentication logs
- View real-time subscriptions

## Security Notes

1. **Never commit `.env.local` file** - it's already in .gitignore
2. Keep `SUPABASE_SERVICE_ROLE_KEY` secret
3. Use Vercel's environment variables for production
4. Enable RLS (Row Level Security) in Supabase (already done in SQL)
5. Regularly rotate API keys

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure email templates in Supabase
3. Set up monitoring and analytics
4. Complete Razorpay integration for payments
5. Add team members to Vercel project

---

For support, check:
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)