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
