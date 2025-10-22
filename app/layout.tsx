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
