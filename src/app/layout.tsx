import type { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "@/styles/globals.css"
import { ThemeProvider } from 'next-themes';
import ClientLanguageWrapper from "@/components/ClientLanguageWrapper"

export const metadata = {
  title: "Atid Raziel Orchestra",
  description: "Official website of the Atid Raziel Orchestra",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen overflow-auto">
        <ThemeProvider attribute="class" defaultTheme="light">
          <ClientLanguageWrapper>
            <Navbar />
            <main className="p-4 max-w-6xl mx-auto">{children}</main>
            <Footer />
          </ClientLanguageWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

