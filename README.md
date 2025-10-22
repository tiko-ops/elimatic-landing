# Elimatic Landing

**Tech**: Next.js 14 + Tailwind. Form sends mail via SMTP (Nodemailer).

## Local dev
```bash
npm i   # or: pnpm i / yarn
cp .env.example .env.local  # fill in SMTP creds
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel
1. Create a GitHub repo and push this project.
2. In Vercel: **New Project → Import** the repo.
3. Set **Environment Variables** from `.env.example` (both **Production** and **Preview**):
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, MAIL_FROM_DOMAIN
4. Deploy.

## Connect your domain (one.com)
- Option A: point nameservers to Vercel (fastest).
- Option B (keep at one.com): add DNS records shown by Vercel (usually CNAME for `www` to `cname.vercel-dns.com` and an A/ALIAS for root).

## Customize
- Replace placeholder text, hero image, and add your **public/Elimatic_logo.svg**.
- Edit colors in `tailwind.config.ts`.
- Update copy in `app/page.tsx`.
