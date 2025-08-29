// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { FloatingChat } from "@/components/chat/floating-chat"
import { ProgressProvider } from "@/contexts/progress-context"
import { TimeTrackingProvider } from "@/contexts/time-tracking-context"
import { DataProvider } from "@/contexts/data-context"
import { AccessControlProvider } from "@/contexts/access-control-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"   // ✅
import { ActivityProvider } from "@/contexts/activity-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "AIverse Hub - AI/ML Learning Platform",
  description:
    "Master AI and Machine Learning with interactive courses, tools, and hands-on projects. Your gateway to the future of technology.",
  keywords: ["AI", "Machine Learning", "Education", "Courses", "Tools", "Cybersecurity", "Career"],
  authors: [{ name: "AIverse Hub Team" }],
  generator: "Next.js",
  openGraph: {
    title: "AIverse Hub - AI/ML Learning Platform",
    description: "Master AI and Machine Learning with interactive courses, tools, and hands-on projects",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider> {/* ✅ Wrap all providers */}
            <TimeTrackingProvider>
              <DataProvider>
                <ProgressProvider>
                  <WishlistProvider>
                    <AccessControlProvider>
                      <ActivityProvider>
                      <Navigation />
                      <main>{children}</main>
                      <FloatingChat />
                      </ActivityProvider>
                    </AccessControlProvider>
                  </WishlistProvider>
                </ProgressProvider>
              </DataProvider>
            </TimeTrackingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
