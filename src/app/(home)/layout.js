// app/layout.js (Global layout - applied to public routes)
'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import PublicHeader from "@/Component/Header";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-serif`}
      >
        <PublicHeader /> {/* This is your global header */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>

        {/* Render children for all public routes */}
      </body>
    </html>
  );
}
