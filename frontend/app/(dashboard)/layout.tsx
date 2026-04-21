"use client";
import { Sidenav } from "@/components/dashboard/sidenav";
import { useUser } from "@/contexts/UserContext";
import { Bell, Search } from "lucide-react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidenav />
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Dashboard Topnav */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search recipes, collections..."
              className="w-full bg-slate-100/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user?.username || "User"}</p>
                <p className="text-xs text-slate-500">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                {user?.profilePicture ? (
                   <Image src={user.profilePicture} alt="Profile" width={40} height={40} />
                ) : (
                   <span className="text-primary font-bold">{user?.username?.[0]?.toUpperCase() || "U"}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
