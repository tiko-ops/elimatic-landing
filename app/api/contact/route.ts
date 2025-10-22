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

    const to = process.env.CONTACT_TO || 'contact@elimatic.se'

    const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || ''}\n\nMessage:\n${message || ''}`

   await transporter.sendMail({
  from: 'contact@elimatic.se',
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
