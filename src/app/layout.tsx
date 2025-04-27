import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Baca Al-Qur\'an',
  description: 'Aplikasi Web Baca Al-Qur\'an dengan Next.js dan TailwindCSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="p-4 shadow-md flex justify-between items-center">
              <h1 className="text-xl font-bold">Baca Al-Qur'an</h1>
              <div>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 p-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import ThemeToggle from '@/components/ThemeToggle'
