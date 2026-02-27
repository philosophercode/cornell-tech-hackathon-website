import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cornell x Columbia AI Hackathon 2026",
  description:
    "120 top graduate builders from Cornell, Columbia, NYU, Yale, and Princeton. One weekend. Agentic AI. March 20–22 at Cornell Tech, Roosevelt Island.",
  metadataBase: new URL("https://cornell-tech-hackathon.vercel.app"),
  openGraph: {
    title: "Cornell x Columbia AI Hackathon 2026",
    description:
      "A highly selective AI hackathon for top graduate builders. March 20–22, 2026 at Cornell Tech.",
    type: "website",
    url: "https://cornell-tech-hackathon.vercel.app",
    images: [
      {
        url: "/banner_logo_ctais.png",
        width: 1600,
        height: 400,
        alt: "Cornell x Columbia AI Hackathon 2026",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Cornell x Columbia AI Hackathon 2026",
    description:
      "A highly selective AI hackathon for top graduate builders. March 20–22, 2026 at Cornell Tech.",
    images: ["/banner_logo_ctais.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
