import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Plesnicar Solutions - IT & Bau",
  description: "Österreichisches Kleinunternehmen für IT-Beratung, digitale Lösungen, Grafikdesign, Bau/Hausbetreuung und Handel. Schnell, zuverlässig, modern.",
  keywords: "IT Beratung, Grafikdesign, Hausbetreuung, digitale Lösungen, Österreich, Boris Plesnicar",
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
