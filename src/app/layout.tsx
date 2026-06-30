import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "Void — Developer & Builder",
    template: "%s | Void",
  },
  description:
    "Hasan — Backend Developer, API Architect & System Builder. Building robust systems with Python, Django, and modern tools.",
  keywords: ["developer", "portfolio", "backend", "python", "django", "API", "Hasan"],
  authors: [{ name: "Hasan" }],
  creator: "Hasan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://void.dev",
    siteName: "Void",
    title: "Void — Developer & Builder",
    description: "Backend Developer, API Architect & System Builder",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Void — Developer & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Void — Developer & Builder",
    description: "Backend Developer, API Architect & System Builder",
    images: ["/og.png"],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
