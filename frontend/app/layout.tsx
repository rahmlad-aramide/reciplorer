import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
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

const aloeVeraBold = localFont({src: [
  {
    path: './../fonts/Aloevera-Bold.otf',
    weight: '700'
  },
],
preload: true,
variable: '--font-aloevera-bold'
})

export const metadata: Metadata = {
  title: "Reciplorer - Your favorite recipe explorer",
  description: "Discover thousands of recipes with our curated collection of the best recipes, you'll find the easiest ways to cook delicious meals every time.",
  keywords: "easy recipes, quick meals, healthy recipes, delicious recipes, dinner ideas, family meals, cooking tips, step-by-step recipes",
  authors: [{ name: "Abdrahman Oladimeji", url: 'https://abdrahman-oladimeji.web.app' }, {name: 'Rahmlad', url: 'https://linkedin.com/in/rahmlad'}, {name: 'Dev_Rahmlad', url: 'x.com/Dev_Rahmlad'}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aloeVeraBold.variable} antialiased`}
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
