"use client";

import React from "react";
import { Calendar, Clock, ArrowRight, Mail, Video } from "lucide-react";
import { LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

interface CalendarItem {
  day: string;
  platform: string;
}

interface CalendarCardProps {
  calendar: CalendarItem[];
}

export default function CalendarCard({ calendar }: CalendarCardProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <LinkedInIcon className="h-5 w-5 text-indigo-400" />;
      case "instagram":
        return <InstagramIcon className="h-5 w-5 text-pink-400" />;
      case "x thread":
      case "twitter":
        return <TwitterIcon className="h-5 w-5 text-sky-400" />;
      case "reel":
        return <Video className="h-5 w-5 text-rose-400" />;
      case "newsletter":
        return <Mail className="h-5 w-5 text-violet-400" />;
      default:
        return <Calendar className="h-5 w-5 text-slate-400" />;
    }
  };

  const getPlatformStyle = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return "border-indigo-500/20 bg-indigo-500/5 text-indigo-300";
      case "instagram":
        return "border-pink-500/20 bg-pink-500/5 text-pink-300";
      case "x thread":
      case "twitter":
        return "border-sky-500/20 bg-sky-500/5 text-sky-300";
      case "reel":
        return "border-rose-500/20 bg-rose-500/5 text-rose-300";
      case "newsletter":
        return "border-violet-500/20 bg-violet-500/5 text-violet-300";
      default:
        return "border-slate-800 bg-slate-900/40 text-slate-300";
    }
  };

  const getDayLabel = (day: string) => {
    return day.substring(0, 3); // Mon, Tue, etc.
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-b-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
            Weekly Content Calendar
          </h3>
          <p className="text-xs text-slate-400">Your scheduled distribution plan for the week</p>
        </div>
        <div className="flex items-center text-xs text-slate-400 space-x-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>Optimal publishing times active</span>
        </div>
      </div>

      {/* Grid Content Board */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {calendar.map((item, index) => {
          const style = getPlatformStyle(item.platform);
          const icon = getPlatformIcon(item.platform);

          return (
            <div
              key={index}
              className={`rounded-xl border p-4 flex flex-col justify-between space-y-4 transition-transform hover:scale-[1.02] duration-200 ${style}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {getDayLabel(item.day)}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/60 font-semibold border border-slate-800 text-slate-300">
                  {item.day}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-slate-900/60 flex items-center justify-center border border-slate-800">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Platform</p>
                    <p className="text-sm font-bold text-white">{item.platform}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Auto-draft ready</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
