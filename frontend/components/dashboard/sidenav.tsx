"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Calendar,
  User,
  Settings,
  Heart,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: UtensilsCrossed, label: "Recipes", href: "/recipes" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: Calendar, label: "Meal Planner", href: "/meal-planner" },
  { icon: ShoppingCart, label: "Shopping List", href: "/shopping-list" },
  { icon: Package, label: "Pantry", href: "/pantry" },
  { icon: User, label: "Profile", href: "/profile" },
];

export const Sidenav = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200 z-40 hidden lg:flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg" />
          Reciplorer
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
              {item.label}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary transition-all"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          Settings
        </Link>
      </div>
    </aside>
  );
};
