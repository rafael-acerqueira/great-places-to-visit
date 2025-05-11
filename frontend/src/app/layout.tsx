import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/Header"
import { LocationProvider } from "@/contexts/LocationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Great Places to Visit",
  description: "Created by Rafael Aquino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col overflow-hidden h-dvh`}
      >
        <LocationProvider>
          <Header />
          <main className="flex flex-1 overflow-hidden">{children}</main>
        </LocationProvider>
      </body>
    </html>
  );
}
