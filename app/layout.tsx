import './globals.css'
import { Playfair_Display, Inter, Bodoni_Moda } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// ✅ NEW FONT (for category titles + CONTACT)
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-bodoni',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${bodoni.variable} bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}