"use client";

import React from "react";
import { LayoutDashboard, UploadCloud, History, Settings, Zap } from "lucide-react";
import Link from "next/link";

export type SidebarTab = "dashboard" | "upload" | "history" | "settings";

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as SidebarTab, name: "Dashboard", icon: LayoutDashboard, disabled: false },
    { id: "upload" as SidebarTab, name: "Upload Content", icon: UploadCloud, disabled: false },
    { id: "history" as SidebarTab, name: "History", icon: History, disabled: true, tooltip: "Supabase DB integration coming soon" },
    { id: "settings" as SidebarTab, name: "Settings", icon: Settings, disabled: true, tooltip: "Coming soon" },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 bg-slate-900/60 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 justify-between py-6 px-4">
      <div className="space-y-6">
        <div className="px-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Navigation</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                  isActive
                    ? "bg-gradient-primary text-white shadow-md shadow-primary-indigo/15"
                    : item.disabled
                    ? "text-slate-500 cursor-not-allowed"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : item.disabled ? "text-slate-600" : "text-slate-400 group-hover:text-white"}`} />
                <span>{item.name}</span>
                {item.disabled && (
                  <span className="absolute right-2 px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase group-hover:block hidden">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Integration Sidebar Footer */}
      <div className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-secondary-violet animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">Integration Hub</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          Connect your API keys in Settings to unlock direct publishing and database features.
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="text-[9px] bg-slate-900/60 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">Whisper</span>
          <span className="text-[9px] bg-slate-900/60 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">GPT-4o</span>
          <span className="text-[9px] bg-slate-900/60 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">Supabase</span>
        </div>
      </div>
    </aside>
  );
}
