# SaaS Setup Guide

## Phase 2 Complete! 🎉

Your UNI-Agent platform is now a fully functional SaaS with:
- ✅ Email verification system
- ✅ Stripe payment integration
- ✅ Usage limits & tracking
- ✅ Subscription management
- ✅ Customer billing portal

## Quick Setup Steps

### 1. Configure Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```bash
# App Mode - IMPORTANT: Set to "cloud" for production
AIO_MODE="cloud"
NEXT_PUBLIC_APP_URL="http://localhost:3010"

# Database
DATABASE_URL="your-postgresql-url"

# Authentication
AUTH_JWT_SECRET="your-super-secret-key-min-32-chars"

# OpenAI
OPENAI_API_KEY="sk-your-key-here"

# Stripe (Get from https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Price IDs (Create products in Stripe Dashboard)
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# Email (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="UNI-Agent <noreply@uniagent.com>"
```

### 2. Setup Stripe Products

1. Go to https://dashboard.stripe.com/test/products
2. Create two products:
   - **Pro Plan**: $9.99/month (or $7.99/month annual)
   - **Enterprise Plan**: $49.99/month (or $39.99/month annual)
3. Copy the Price IDs to your `.env.local`
4. Enable Customer Portal: https://dashboard.stripe.com/test/settings/billing/portal
5. Setup webhook endpoint:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`

### 3. Setup Email (Gmail Example)

1. Enable 2FA on your Gmail account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add credentials to `.env.local`

### 4. Setup Database

Run Prisma migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Test Locally

```bash
npm run dev
```

Visit:
- **Pricing**: http://localhost:3010/pricing
- **Signup**: http://localhost:3010/auth/signup
- **Account**: http://localhost:3010/account

## Testing Payment Flow

### Test Mode (Stripe Test Keys)

Use these test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date, any CVC

### Email Verification

In development, verification links are logged to console. Check terminal output after signup.

## Features Overview

### User Journey

1. **Landing Page** → View pricing
2. **Signup** → Create account (with plan selection)
3. **Email Verification** → Click link in email
4. **Dashboard** → Auto-login after verification
5. **Upgrade** → Stripe Checkout for paid plans
6. **Manage Billing** → Customer Portal (cancel, update card, view invoices)

### Usage Limits

**Free Plan:**
- 3 courses max
- 50 AI requests/month
- 100MB storage

**Pro Plan:**
- Unlimited courses
- 1,000 AI requests/month
- 5GB storage
- 7-day free trial

**Enterprise Plan:**
- Everything unlimited
- 50 team members
- 50GB storage
- API access

### Enforcement

Usage limits are checked:
- Before each AI request (`/api/ai`)
- Before file uploads (when implemented)
- Displayed in account dashboard

When limit reached:
- 429 status code
- Clear upgrade message
- Link to pricing page

## Production Deployment

### Checklist

- [ ] Switch `AIO_MODE` to `"cloud"`
- [ ] Use production Stripe keys
- [ ] Setup real SMTP service (SendGrid, AWS SES, etc.)
- [ ] Configure production database (Supabase, Railway, etc.)
- [ ] Setup custom domain
- [ ] Update Stripe webhook URL
- [ ] Test payment flow end-to-end
- [ ] Enable Stripe live mode

### Recommended Services

- **Hosting**: Vercel, Railway, or AWS
- **Database**: Supabase (PostgreSQL + pgvector)
- **Email**: SendGrid, Postmark, or AWS SES
- **Payments**: Stripe (already integrated)
- **Monitoring**: Sentry, LogRocket

## Next Steps

1. Customize email templates (add your branding)
2. Add more payment options (PayPal, etc.)
3. Implement team features for Enterprise plan
4. Add analytics dashboard
5. Setup monitoring and error tracking

## Support

For issues, check:
- Stripe Dashboard → Logs
- Terminal console output
- Browser DevTools → Network tab

Happy selling! 🚀
