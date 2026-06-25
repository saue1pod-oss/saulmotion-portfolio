import type {Metadata} from 'next'
import localFont from 'next/font/local'
import Providers from '@/components/Providers'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'SaulMotion — Motion Design Portfolio',
  description: 'Motion design portfolio by Saul — showreels, logo animations, and brand identity.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  )
}
