import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-300-latin.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-300-italic-latin.woff2", weight: "300", style: "italic" },
    { path: "../fonts/cormorant-garamond-400-italic-latin.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-garamond-500-italic-latin.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-200-latin.woff2", weight: "200", style: "normal" },
    { path: "../fonts/montserrat-300-latin.woff2", weight: "300", style: "normal" },
    { path: "../fonts/montserrat-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-600-latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://yum-sushi.example";
const MAPS_URL =
  "https://www.google.com/maps/place/Yum+Sushi/@-23.6631096,-46.6620661,17z/data=!4m6!3m5!1s0x94ce5b72ac8242eb:0xc170cc843acceea9!8m2!3d-23.6631096!4d-46.6620661!16s%2Fg%2F11wwg75p30";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yum Sushi — Rodízio Japonês na Av. Cupecê | São Paulo",
    template: "%s | Yum Sushi — Rodízio Japonês",
  },
  description:
    "O rodízio japonês que virou tradição no Jardim Prudência: sushi, sashimis, temakis, hot rolls e quentes à vontade, com sobremesa inclusa. Rodízio a partir de R$ 98,90. Av. Cupecê, 2346 — São Paulo.",
  keywords: [
    "yum sushi",
    "rodízio japonês",
    "rodízio sushi são paulo",
    "sushi cupecê",
    "jardim prudência",
    "restaurante japonês sp",
    "delivery sushi",
  ],
  authors: [{ name: "Yum Sushi" }],
  creator: "Yum Sushi",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Yum Sushi — Rodízio Japonês na Av. Cupecê",
    description:
      "Sushi à vontade, feito com arte. Rodízio japonês com sobremesa inclusa, a partir de R$ 98,90. Av. Cupecê, 2346 — Jardim Prudência, São Paulo.",
    url: SITE_URL,
    siteName: "Yum Sushi",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Peças de sushi do Yum Sushi sobre prato escuro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yum Sushi — Rodízio Japonês na Av. Cupecê",
    description:
      "Sushi à vontade, feito com arte. Rodízio japonês com sobremesa inclusa, a partir de R$ 98,90.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090C0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
