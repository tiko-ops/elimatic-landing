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
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setMessage("Thanks! We'll be in touch shortly.")
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
      <p className="text-xs text-slate-500">This form emails <strong>contact@elimatic.se</strong>.</p>
    </form>
  )
}
