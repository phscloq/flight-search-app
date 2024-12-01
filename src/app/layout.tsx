import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Structure from './components/structure'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Search Flights',
  description: 'A web app for searching flights based on mock data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Structure>{children}
          <Link className='absolute right-8 top-6 underline font-bold  hover:text-blue-700' 
          href='https://github.com/phscloq'>GitHub</Link>
        </Structure>
      </body>
    </html>
  )
}
