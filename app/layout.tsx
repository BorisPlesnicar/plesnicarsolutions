import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Plesnicar Solutions - IT, Grafikdesign & BAU/Hausbetreuung",
  description: "Österreichisches Ein-Personen-Unternehmen für IT-Beratung, digitale Lösungen, Grafikdesign, BAU/Hausbetreuung und Handel. Schnell, zuverlässig, modern.",
  keywords: "IT Beratung, Grafikdesign, Hausbetreuung, digitale Lösungen, Österreich, Boris Plesnicar",
  icons: {
    icon: "/logos/bp.jpg",
    shortcut: "/logos/bp.jpg",
    apple: "/logos/bp.jpg",
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
