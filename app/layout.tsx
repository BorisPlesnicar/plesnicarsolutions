import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Plesnicar Solutions - IT & Bau",
  description: "Österreichisches Kleinunternehmen für IT-Beratung, digitale Lösungen, Grafikdesign, Bau/Hausbetreuung und Handel. Schnell, zuverlässig, modern.",
  keywords: "IT Beratung, Grafikdesign, Hausbetreuung, digitale Lösungen, Österreich, Boris Plesnicar",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
