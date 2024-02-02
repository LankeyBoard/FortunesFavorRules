import type { Metadata } from 'next'
import './globals.css'
import RulesNav from "./components/blocks/RulesNav"

export const metadata: Metadata = {
  title: "Fortune's Favor",
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return(
      <html lang='en'>
        <head>
        </head>
        <body>
          <div className='container mx-auto max-w-screen-xxl bg-gray-900'>
            {children}
          </div>
        </body>
      </html>
    )
}