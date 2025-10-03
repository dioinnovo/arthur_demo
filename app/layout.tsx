import type { Metadata, Viewport } from 'next'
import { Lato, Roboto } from 'next/font/google'
import './globals.css'
import DisableGrammarly from '@/components/DisableGrammarly'
import { ThemeProvider } from '@/contexts/theme-provider'

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato'
})

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Arthur Health - CareNexus Platform',
  description: 'Empowering High-Value Coordinated Healthcare',
  keywords: 'healthcare, care coordination, value-based care, AI, patient management, clinical workflows',
  authors: [{ name: 'Arthur Health' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Arthur Health - CareNexus Platform',
    description: 'Transform care delivery with AI-driven insights and seamless coordination',
    type: 'website',
    locale: 'en_US',
    siteName: 'Arthur Health CareNexus',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable} ${roboto.variable}`}>
      <body className={`${lato.className} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <DisableGrammarly />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}