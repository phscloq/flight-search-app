import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Structure from './components/structure'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Search Flights',
  description: 'A web app for searching flights based on mock data',
  icons: {
    icon: '/icon',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
        <Structure>
          {children}
        </Structure>
      </body>
    </html>
  )
}
