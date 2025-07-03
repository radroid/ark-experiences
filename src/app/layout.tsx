import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARK Scavenger Hunt - Cluedo-Themed Team Building Experience",
  description: "Experience the ultimate team-building adventure with our Cluedo-themed scavenger hunt across Toronto. Solve mysteries, find clues, and build stronger teams through interactive challenges.",
  keywords: ["team building", "scavenger hunt", "Toronto", "Cluedo", "corporate events", "team activities"],
  authors: [{ name: "ARK Scavenger Hunt" }],
  openGraph: {
    title: "ARK Scavenger Hunt - Team Building Adventures",
    description: "Cluedo-themed scavenger hunts across Toronto for team building and corporate events",
    type: "website",
    siteName: "ARK Scavenger Hunt",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARK Scavenger Hunt - Team Building Adventures",
    description: "Cluedo-themed scavenger hunts across Toronto",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
