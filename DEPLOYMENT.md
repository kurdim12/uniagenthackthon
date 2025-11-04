# Deployment Guide for UNI-Agent

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Best for Next.js)

**Why Vercel?**
- ✅ Optimized for Next.js
- ✅ Zero-config deployment
- ✅ Automatic HTTPS & CDN
- ✅ Free tier with generous limits
- ✅ Easy environment variable management

**Steps:**
1. Push code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import `kurdim12/vcoders-sub`
6. Add environment variables:
   - `AIO_MODE=demo` (or `cloud`/`offline`)
   - `OPENAI_API_KEY=sk-...` (optional)
   - Supabase keys if using cloud mode
7. Click "Deploy"
8. Done! Your app will be live at `your-project.vercel.app`

---

### Option 2: Railway

**Why Railway?**
- ✅ Simple deployment
- ✅ Built-in database options
- ✅ Good for full-stack apps
- ✅ $5/month starter plan

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `kurdim12/vcoders-sub`
6. Railway auto-detects Next.js
7. Add environment variables
8. Deploy!

---

### Option 3: Netlify

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Choose `kurdim12/vcoders-sub`
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variables
8. Deploy!

---

## 🔧 Environment Variables

### Demo Mode (Default)
```env
AIO_MODE=demo
```

### Cloud Mode
```env
AIO_MODE=cloud
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate-random-secret
```

