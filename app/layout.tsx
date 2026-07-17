import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./knowledge.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Atlas — Interactive Knowledge Map",
  description: "A visual, topic-by-topic reference for understanding frontend engineering systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const saved=localStorage.getItem("frontend-atlas-theme");const theme=saved==="dark"||saved==="light"?saved:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.knowledgeTheme=theme}catch{document.documentElement.dataset.knowledgeTheme="light"}`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
