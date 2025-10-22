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
