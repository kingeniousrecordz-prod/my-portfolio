import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ClientThemeProvider from '@/components/ClientThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Portfolio - Web Developer & Beatmaker',
  description: 'Personal portfolio showcasing web development projects, graphic design work, and music production',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} theme-bg min-h-screen transition-colors duration-300`}>
        <ClientThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  )
}
