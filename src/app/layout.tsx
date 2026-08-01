import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACRES Rescue Logger",
  description: "Wildlife rescue call-logging system",
  icons: {
    icon: "/icon-512.png",
    shortcut: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ACRES Rescue Logger",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark style-[color-scheme:dark]">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased overflow-hidden flex flex-col h-[100dvh]`}>
        <Header />
        <div className="flex-1 overflow-y-auto pb-20 scroll-smooth bg-zinc-950">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
