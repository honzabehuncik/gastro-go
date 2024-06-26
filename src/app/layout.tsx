import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";
import Nav from "@/components/nav/Nav";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GastroGO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <ShoppingCartProvider>
        <html lang="en">
          <body className={inter.className}>
            <Nav/>
            {children}
          </body>
        </html>
      </ShoppingCartProvider>
    </SessionWrapper>
    
  );
}
