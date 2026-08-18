import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { AppProviders } from "@/components/providers/AppProviders"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CompareBar } from "@/components/tools/CompareBar"
import { jsonLdSafe } from "@/lib/utils"
import { siteMetadata, websiteJsonLd } from "@/lib/seo"

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export const metadata: Metadata = siteMetadata()

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="noise flex min-h-dvh flex-col bg-bg text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdSafe(websiteJsonLd()) }}
        />
        <AppProviders>
          <a
            href="#main"
            className="sr-only z-[70] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CompareBar />
        </AppProviders>
      </body>
    </html>
  )
}