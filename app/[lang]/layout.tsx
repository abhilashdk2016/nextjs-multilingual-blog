import Navigation from '@/components/navigation/navigation'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/navigation/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode, params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className='pt-10'>
          {children}
        </div>
        <Footer locale={lang} />
      </body>
    </html>
  )
}
