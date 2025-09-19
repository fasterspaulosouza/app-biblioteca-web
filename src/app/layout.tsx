import type { Metadata } from "next";
import { Lexend_Deca, Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblioteca Web",
  description: "App Biblioteca Web FAEX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* <body className={`${lexendDeca.variable} ${inter.variable} antialiased`}> */}
      <body className={cn(lexendDeca.variable, inter.variable, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
