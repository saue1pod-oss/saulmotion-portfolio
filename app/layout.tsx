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
  description:
    'Motion designer based in Bogotá, Colombia. Specialized in brand animation: animated logos, motion systems, and rebranding narratives for legacy brands.',
  keywords: [
    'motion design',
    'brand animation',
    'motion designer Colombia',
    'animated logos',
    'motion graphics',
    'rebranding',
  ],
  authors: [{name: 'Saúl Hernández'}],
  creator: 'Saúl Hernández',
  metadataBase: new URL('https://saulmotion.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saulmotion.com',
    siteName: 'SaulMotion',
    title: 'SaulMotion — Motion Design Portfolio',
    description:
      'Motion designer based in Bogotá, Colombia. Specialized in brand animation: animated logos, motion systems, and rebranding narratives for legacy brands.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SaulMotion — Identity in motion.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaulMotion — Motion Design Portfolio',
    description:
      'Motion designer based in Bogotá, Colombia. Specialized in brand animation.',
    images: ['/images/og-image.png'],
  },
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
