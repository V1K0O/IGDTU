"use client";

import React from "react";
import { FileText, Mail, Link2, Calendar } from "lucide-react";
import { LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ContentTabs({ activeTab, setActiveTab }: ContentTabsProps) {
  const tabs = [
    { id: "transcript", name: "Transcript", icon: FileText },
    { id: "linkedin", name: "LinkedIn", icon: LinkedInIcon },
    { id: "twitter", name: "X Thread", icon: TwitterIcon },
    { id: "instagram", name: "Instagram", icon: InstagramIcon },
    { id: "newsletter", name: "Newsletter", icon: Mail },
    { id: "hooks", name: "Hooks", icon: Link2 },
    { id: "calendar", name: "Calendar", icon: Calendar },
  ];

  return (
    <div className="w-full border-b border-slate-800 bg-slate-900/40 p-2 rounded-t-2xl">
      <div className="flex space-x-1 overflow-x-auto no-scrollbar scroll-smooth py-1 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700/60"
                  : "text-slate-400 hover:bg-slate-800/20 hover:text-slate-200"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary-indigo" : "text-slate-400"}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
