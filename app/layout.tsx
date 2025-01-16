import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reciplorer",
  description: "Discover thousands of recipes with our curated collection of the best recipes, you'll find the easiest ways to cook delicious meals every time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecipeProvider>  
          <Navbar />
          <>{children}</>
          <Toaster />
        </RecipeProvider>
      </body>
    </html>
  );
}
