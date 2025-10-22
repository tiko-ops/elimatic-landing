# Project: Elimatic — AI Verification for Automotive Design
# Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Nodemailer (SMTP)

# ─────────────────────────────────────────────────────────────────────────────
# 1) package.json
# ─────────────────────────────────────────────────────────────────────────────
{
  "name": "elimatic-landing",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^11.3.31",
    "lucide-react": "^0.468.0",
    "next": "14.2.5",
    "nodemailer": "^6.9.13",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "20.12.12",
    "@types/react": "18.2.79",
    "@types/react-dom": "18.2.25",
    "autoprefixer": "10.4.19",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "postcss": "8.4.39",
    "tailwindcss": "3.4.10",
    "typescript": "5.4.5"
  }
}

# ─────────────────────────────────────────────────────────────────────────────
# 2) next.config.ts
# ─────────────────────────────────────────────────────────────────────────────
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true
}

export default nextConfig

# ─────────────────────────────────────────────────────────────────────────────
# 3) tailwind.config.ts
# ─────────────────────────────────────────────────────────────────────────────
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',  // accent
          dark: '#0b7bb2'
        },
        ink: '#0b1220'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.08)'
      }
    }
  },
  plugins: []
}
export default config

# ─────────────────────────────────────────────────────────────────────────────
# 4) postcss.config.js
# ─────────────────────────────────────────────────────────────────────────────
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}

# ─────────────────────────────────────────────────────────────────────────────
# 5) tsconfig.json
# ─────────────────────────────────────────────────────────────────────────────
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "ES2020"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "strict": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js"],
  "exclude": ["node_modules"]
}

# ─────────────────────────────────────────────────────────────────────────────
# 6) app/globals.css
# ─────────────────────────────────────────────────────────────────────────────
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 16px;
}

html, body {
  height: 100%;
}

body {
  @apply bg-white text-slate-900 antialiased;
}

.container-bleed {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.card {
  @apply rounded-2xl shadow-soft bg-white border border-slate-100;
}

.btn {
  @apply inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition;
}
.btn-primary { @apply bg-brand text-white hover:bg-brand-dark; }
.btn-ghost { @apply bg-slate-50 text-slate-800 hover:bg-slate-100; }

.input {
  @apply w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-brand/20;
}

.label { @apply text-sm font-medium text-slate-600; }

# ─────────────────────────────────────────────────────────────────────────────
# 7) app/layout.tsx
# ─────────────────────────────────────────────────────────────────────────────
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elimatic — AI Verification for Automotive Design',
  description: 'Automate verification across CAD, compliance, and safety with AI-assisted reviews and instant reports.',
  metadataBase: new URL('https://www.elimatic.se')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

# ─────────────────────────────────────────────────────────────────────────────
# 8) components/Header.tsx
# ─────────────────────────────────────────────────────────────────────────────
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-100">
      <div className="container-bleed flex items-center justify-between h-16">
        <Link href="#" className="flex items-center gap-3">
          <Image src="/Elimatic_logo.svg" alt="Elimatic" width={36} height={36} />
          <span className="font-semibold tracking-tight">Elimatic</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-700">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#faq" className="hover:text-slate-900">FAQ</a>
          <a href="#contact" className="btn btn-primary">Contact</a>
        </nav>
        <button className="md:hidden btn btn-ghost" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-100">
          <div className="container-bleed py-3 flex flex-col gap-2">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
            <a href="#contact" className="btn btn-primary mt-2">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}

# ─────────────────────────────────────────────────────────────────────────────
# 9) app/page.tsx (Landing content)
# ─────────────────────────────────────────────────────────────────────────────
import Header from '@/components/Header'
import { Check, Shield, Cpu, Gauge, FileCheck, Sparkles } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export default function Page() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="container-bleed grid lg:grid-cols-2 gap-12 py-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            AI Verification for <span className="text-brand">Automotive Design</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Catch geometry, compliance, and safety issues early. Elimatic automates checks across CAD and standards, producing instant, auditable reports.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">Request a demo</a>
            <a href="#features" className="btn btn-ghost">Explore features</a>
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <li className="flex items-center gap-2"><Check size={18} className="text-brand"/> ISO & OEM rule libraries</li>
            <li className="flex items-center gap-2"><Check size={18} className="text-brand"/> CAD plug-ins & APIs</li>
            <li className="flex items-center gap-2"><Check size={18} className="text-brand"/> Instant PDF reports</li>
            <li className="flex items-center gap-2"><Check size={18} className="text-brand"/> Secure, on-prem or cloud</li>
          </ul>
        </div>
        <div className="relative">
          <div className="card p-6 h-full flex items-center justify-center">
            <div className="aspect-[16/10] w-full rounded-xl border border-dashed border-slate-300 grid place-items-center text-slate-500">
              <span className="text-sm">(Hero image or product mockup)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / social proof */}
      <section className="py-6">
        <div className="container-bleed flex flex-wrap items-center justify-center gap-8 opacity-70">
          <span className="text-xs">Trusted by engineering teams</span>
          <div className="h-6 w-24 bg-slate-100 rounded"/>
          <div className="h-6 w-24 bg-slate-100 rounded"/>
          <div className="h-6 w-24 bg-slate-100 rounded"/>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container-bleed py-16 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Key features</h2>
          <p className="mt-3 text-slate-600">Automate checks, accelerate reviews, and ship compliant designs faster.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature icon={<Shield/>} title="Rule-based verification" desc="Built-in libraries for ISO, UNECE, and OEM-specific constraints. Create custom rules with a simple DSL."/>
          <Feature icon={<Cpu/>} title="AI-assisted reviews" desc="Summaries, risk flags, and suggestions based on your CAD and documents."/>
          <Feature icon={<Gauge/>} title="CAD integration" desc="Check models directly from your CAD toolchain via plugin or API."/>
          <Feature icon={<FileCheck/>} title="Audit-ready reports" desc="Generate tamper-evident PDFs with traceability for every check."/>
          <Feature icon={<Sparkles/>} title="Automation" desc="Batch jobs on CI, nightly sweeps, and gates for release readiness."/>
          <Feature icon={<Shield/>} title="Security-first" desc="Run in your VPC or on-prem. SSO and least-privilege by default."/>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 py-16 lg:py-24">
        <div className="container-bleed">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <Step n={1} title="Connect" desc="Link your CAD and document sources."/>
            <Step n={2} title="Verify" desc="Run checks against relevant standards and your custom rules."/>
            <Step n={3} title="Report" desc="Share results, assign actions, and archive audit trails."/>
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="container-bleed py-16 lg:py-24">
        <div className="card p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-semibold">Ready to accelerate verification?</h3>
          <p className="mt-3 text-slate-600">Book a demo and see how Elimatic adapts to your workflow in days, not months.</p>
          <a href="#contact" className="btn btn-primary mt-6">Request a demo</a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-bleed py-16 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <QA q="Can we run it on‑prem?" a="Yes. We support on-prem or private cloud deployments."/>
          <QA q="Which CAD tools are supported?" a="We integrate via plugins and export formats; let us know your stack."/>
          <QA q="Do you provide custom rule sets?" a="We can adapt rules to OEM or supplier requirements."/>
          <QA q="How is data secured?" a="SSO, encryption in transit/at rest, and role-based permissions."/>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-50 py-16 lg:py-24">
        <div className="container-bleed grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Contact us</h2>
            <p className="mt-3 text-slate-600">Tell us about your workflows and standards. We’ll follow up by email.</p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li className="flex gap-2"><Check className="text-brand" size={18}/> Response within 1 business day</li>
              <li className="flex gap-2"><Check className="text-brand" size={18}/> No spam, no sharing</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="container-bleed py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 bg-slate-100 rounded-xl" />
            <span>© {new Date().getFullYear()} Elimatic AB. All rights reserved.</span>
          </div>
          <nav className="flex items-center gap-6 text-slate-600">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="card p-6">
      <div className="h-10 w-10 rounded-xl bg-slate-50 grid place-items-center mb-4">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm">{desc}</p>
    </div>
  )
}

function Step({ n, title, desc }: { n: number, title: string, desc: string }) {
  return (
    <div className="card p-6">
      <div className="text-brand text-sm font-semibold">Step {n}</div>
      <h3 className="mt-1 font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm">{desc}</p>
    </div>
  )
}

function QA({ q, a }: { q: string, a: string }) {
  return (
    <details className="card p-5">
      <summary className="cursor-pointer font-medium">{q}</summary>
      <p className="mt-3 text-slate-600 text-sm">{a}</p>
    </details>
  )
}

# ─────────────────────────────────────────────────────────────────────────────
# 10) components/ContactForm.tsx
# ─────────────────────────────────────────────────────────────────────────────
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'sent'|'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setMessage('Thanks! We\'ll be in touch shortly.')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-4">
      <div>
        <label className="label" htmlFor="name">Name</label>
        <input className="input" id="name" name="name" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="email">Work email</label>
          <input className="input" id="email" name="email" type="email" required />
        </div>
        <div>
          <label className="label" htmlFor="company">Company</label>
          <input className="input" id="company" name="company" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="message">Message</label>
        <textarea className="input min-h-[120px]" id="message" name="message" placeholder="What would you like to achieve?" />
      </div>
      <button disabled={status==='loading'} className="btn btn-primary w-full sm:w-auto" type="submit">
        {status==='loading' ? 'Sending…' : 'Send message'}
      </button>
      {message && (
        <p className={`text-sm ${status==='error' ? 'text-red-600' : 'text-slate-600'}`}>{message}</p>
      )}
      <p className="text-xs text-slate-500">This form emails <strong>kontakt@elimatic.se</strong>.</p>
    </form>
  )
}

# ─────────────────────────────────────────────────────────────────────────────
# 11) app/api/contact/route.ts
# ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const to = process.env.CONTACT_TO || 'kontakt@elimatic.se'

    const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || ''}\n\nMessage:\n${message || ''}`

    await transporter.sendMail({
      from: `Elimatic Website <no-reply@${process.env.MAIL_FROM_DOMAIN || 'elimatic.se'}>`,
      to,
      subject: 'New inquiry from Elimatic website',
      text
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}

# ─────────────────────────────────────────────────────────────────────────────
# 12) public/ (assets)
# ─────────────────────────────────────────────────────────────────────────────
# Place your logo file here as: public/Elimatic_logo.svg
# (Upload the provided SVG into this path before deploying.)

# ─────────────────────────────────────────────────────────────────────────────
# 13) .env.example (copy to .env.local)
# ─────────────────────────────────────────────────────────────────────────────
# One.com SMTP example — replace with your real creds
SMTP_HOST=smtp.one.com
SMTP_PORT=587
SMTP_USER=kontakt@elimatic.se
SMTP_PASS=YOUR_ONECOM_MAILBOX_PASSWORD
CONTACT_TO=kontakt@elimatic.se
MAIL_FROM_DOMAIN=elimatic.se

# ─────────────────────────────────────────────────────────────────────────────
# 14) next-env.d.ts (auto-generated by Next.js on first dev run)
# ─────────────────────────────────────────────────────────────────────────────
// (Do not edit)

# ─────────────────────────────────────────────────────────────────────────────
# 15) README.md (quick start)
# ─────────────────────────────────────────────────────────────────────────────
# Elimatic Landing

**Tech**: Next.js 14 + Tailwind. Form sends mail via SMTP (Nodemailer).

## Local dev
```bash
pnpm i   # or npm i / yarn
cp .env.example .env.local  # fill in SMTP creds
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel
1. Create a GitHub repo and push this project.
2. In Vercel: **New Project → Import** the repo.
3. Set **Environment Variables** from `.env.example` (use **Production** and **Preview**):
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, MAIL_FROM_DOMAIN
4. Deploy.

## Connect your domain (one.com)
- Option A: point nameservers to Vercel (fastest). 
- Option B (keep at one.com): add DNS records shown by Vercel (usually CNAME for `www` to `cname.vercel-dns.com` and an A/ALIAS for root).

## Customize
- Replace placeholder text, hero image, and add your **public/Elimatic_logo.svg**.
- Edit colors in `tailwind.config.ts`.
- Update copy in `app/page.tsx`.
