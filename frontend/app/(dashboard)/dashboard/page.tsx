"use client";
import { useUser } from "@/contexts/UserContext";
import {
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  Plus,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {user?.username || "Chef"}!</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your culinary journey today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Cooking Streak", value: "5 Days", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Recipes Cooked", value: "24", icon: Award, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Planned Meals", value: "8", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Badges Earned", value: "12", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">This Month</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
            <Link href="/recipes" className="text-primary text-sm font-medium flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Mock recipe cards */}
             {[1, 2].map((id) => (
               <div key={id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                  <div className="aspect-video bg-slate-100" />
                  <div className="p-4">
                     <div className="flex gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-xs font-medium">Healthy</span>
                        <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 text-xs font-medium">15 min</span>
                     </div>
                     <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Mediterranean Quinoa Bowl</h3>
                     <p className="text-sm text-slate-500 mt-1">A fresh and nutritious bowl packed with veggies.</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Quick Actions / Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          <div className="space-y-3">
             <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-all">
                   <Plus className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                </div>
                <div className="text-left">
                   <p className="font-bold text-slate-900 text-sm">Add New Recipe</p>
                   <p className="text-xs text-slate-500">Share your creation with us</p>
                </div>
             </button>
             <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                   <p className="font-bold text-sm">Plan Next Meal</p>
                   <p className="text-xs text-slate-300">Stay on track with your diet</p>
                </div>
             </button>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
             <h3 className="font-bold text-primary mb-2">Pro Tip</h3>
             <p className="text-sm text-slate-700 leading-relaxed">
               Adding "Dietary Tags" to your profile helps us suggest recipes that match your lifestyle perfectly!
             </p>
             <Link href="/profile" className="inline-block mt-4 text-sm font-bold text-primary hover:underline">
               Update Profile
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
