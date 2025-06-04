import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { toast } from "sonner"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cover Letter Generator',
  keywords: ['cover letter', 'generator', 'AI', 'resume', 'job application'],
  description: 'Generate professional cover letters with ease using our AI-powered tool. Perfect for job seekers looking to enhance their applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Toaster />
    </html>
  )
}
