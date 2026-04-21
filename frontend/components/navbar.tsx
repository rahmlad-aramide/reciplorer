"use client";
import Link from "next/link";
import logo from "@/assets/placeholder.png";
import Image from "next/image";
import {
  ShoppingBasket,
  UserRound,
  ShoppingCart,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const isLandingPage = pathname === "/";

  if (!isLandingPage && user) {
    // We'll handle Dashboard Navbar in its layout
    return null;
  }

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 h-20 flex items-center">
      <nav className="lg:container w-full mx-auto px-4 sm:px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-bold text-2xl text-primary flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg" />
              Reciplorer
            </Link>
          </div>
          {isLandingPage ? (
            <div className="hidden md:flex items-center text-sm font-medium gap-8">
              <Link href="#features" className="text-slate-600 hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-primary transition-colors">
                How it Works
              </Link>
              <Link href="/recipes" className="text-slate-600 hover:text-primary transition-colors">
                Recipes
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center text-sm font-medium gap-8">
               <Link href="/" className="text-slate-600 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/recipes" className="text-slate-600 hover:text-primary transition-colors">
                Recipes
              </Link>
            </div>
          )}
          <div className="flex items-center gap-4">
            <Link
              href={user ? "/dashboard" : "/login"}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all"
            >
              {user ? "Dashboard" : "Sign In"}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
