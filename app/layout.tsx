import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ConditionalHeader } from "@/components/ConditionalHeader"
import { ConditionalFooter } from "@/components/ConditionalFooter"
import { Toaster } from "sonner"
import "./globals.css"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agilecoder.in"),
  title: {
    default: "AgileCoder - Innovate. Build. Deliver.",
    template: "%s | AgileCoder",
  },
  description:
    "From cutting-edge dev tools and plugins to full-fledged websites - we craft and ship modern digital experiences at speed.",
  keywords: ["Software Development", "Web Development", "AgileCoder", "Tech Blog", "Creative Coding", "Books", "Developer Tools"],
  authors: [{ name: "AgileCoder Team" }],
  creator: "AgileCoder",
  publisher: "AgileCoder",
  icons: {
    icon: "/agilecoder-dark.png",
    shortcut: "/agilecoder-dark.png",
    apple: "/agilecoder-dark.png",
  },
  openGraph: {
    title: "AgileCoder - Innovate. Build. Deliver.",
    description:
      "From cutting-edge dev tools and plugins to full-fledged websites - we craft and ship modern digital experiences at speed.",
    url: "https://www.agilecoder.in",
    siteName: "AgileCoder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgileCoder - Innovate. Build. Deliver.",
    description:
      "From cutting-edge dev tools and plugins to full-fledged websites - we craft and ship modern digital experiences at speed.",
    creator: "@agilecoder_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div id="top" />
        <ConditionalHeader />
        {children}
        <ConditionalFooter />
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  )
}
