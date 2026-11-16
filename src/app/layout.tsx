import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BackgroundGlow from "@/components/BackgroundGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pramathahd.vercel.app"),
  title: "Pramatha H D | Data Analytics, AI/ML & Application Development",
  description:
    "Engineering graduate exploring the intersection of data, artificial intelligence and application development. Specialized in Python, SQL, Power BI, Machine Learning, and Web Architecture.",
  keywords: [
    "Pramatha H D",
    "Data Analytics",
    "Machine Learning",
    "Power BI",
    "Python",
    "SQL",
    "Next.js",
    "Bengaluru",
    "NMIT",
  ],
  authors: [{ name: "Pramatha H D" }],
  creator: "Pramatha H D",
  openGraph: {
    title: "Pramatha H D | Portfolio",
    description:
      "Engineering graduate exploring the intersection of data, artificial intelligence and application development.",
    url: "https://pramathahd.vercel.app",
    siteName: "Pramatha H D Portfolio",
    images: [
      {
        url: "/images/profile-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Pramatha H D Portfolio Visual",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#060709] text-neutral-100 antialiased selection:bg-sky-500/30 selection:text-white">
        <SmoothScroll>
          <div className="cinematic-grain" />
          <CustomCursor />
          <BackgroundGlow />
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
