"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar, { SidebarTab } from "@/components/Sidebar";
import UploadCard from "@/components/UploadCard";
import ContentTabs from "@/components/ContentTabs";
import ContentCard from "@/components/ContentCard";
import HookCard from "@/components/HookCard";
import CalendarCard from "@/components/CalendarCard";
import { Zap, HelpCircle, Key, Database, RefreshCw, Trash2, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");
  const [results, setResults] = useState<any>(null);
  const [activeResultTab, setActiveResultTab] = useState<string>("transcript");

  // Handle generation completion from UploadCard
  const handleGenerationComplete = (data: any) => {
    setResults(data);
    setActiveResultTab("transcript");
  };

  const handleClearResults = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Layout Workspace */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dashboard Main Workspace Area */}
        <main className="flex-1 min-w-0 space-y-6 pb-12">
          
          {/* Active view: Dashboard or Upload */}
          {(activeTab === "dashboard" || activeTab === "upload") && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 shadow-xl">
                <div>
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">Creator Space</h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Upload audio/video clip drafts to transcribe and format for LinkedIn, X Thread, Instagram, and Newsletters.
                  </p>
                </div>
                {results && (
                  <button
                    onClick={handleClearResults}
                    className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 text-rose-400 hover:bg-slate-700/50 hover:text-rose-300 transition-all shadow-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear Workspace</span>
                  </button>
                )}
              </div>

              {/* Upload Interface */}
              {!results && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Side: Upload Zone */}
                  <div className="lg:col-span-2">
                    <UploadCard onGenerationComplete={handleGenerationComplete} />
                  </div>

                  {/* Right Side: Quick Tips & Info */}
                  <div className="space-y-6">
                    <div className="glass-panel border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                          <HelpCircle className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="font-bold text-slate-200 text-sm">How it works</h3>
                      </div>
                      <ol className="space-y-3 font-medium text-xs text-slate-400 list-decimal pl-4 leading-normal">
                        <li>Upload your MP4 video or MP3/WAV audio recordings.</li>
                        <li>The system calls our FastAPI microservice to process the file and transcription.</li>
                        <li>Select different channels from the tabs below to copy tailored output.</li>
                      </ol>
                    </div>

                    <div className="glass-panel border border-slate-800 rounded-2xl p-5 space-y-4">
                      <h3 className="font-bold text-slate-200 text-sm">Pipeline Settings</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                          <span className="text-slate-400">Whisper Mode</span>
                          <span className="font-semibold text-indigo-400">Base Model (Fast)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                          <span className="text-slate-400">Repurpose Agent</span>
                          <span className="font-semibold text-violet-400">GPT-4o Omnichannel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Tabs View */}
              {results && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-bold text-white flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-indigo-400 animate-pulse" />
                      Generated Social Outputs
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">Job completed in 3.5s</span>
                  </div>

                  <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                    {/* Channel Selector Tabs */}
                    <ContentTabs activeTab={activeResultTab} setActiveTab={setActiveResultTab} />

                    {/* Display active tab outputs */}
                    {activeResultTab === "transcript" && (
                      <ContentCard type="transcript" content={results.transcript} />
                    )}
                    {activeResultTab === "linkedin" && (
                      <ContentCard type="linkedin" content={results.linkedin} />
                    )}
                    {activeResultTab === "twitter" && (
                      <ContentCard type="twitter" content={results.twitter_thread} />
                    )}
                    {activeResultTab === "instagram" && (
                      <ContentCard type="instagram" content={results.instagram} videoUrl={results.video_url} />
                    )}
                    {activeResultTab === "newsletter" && (
                      <ContentCard type="newsletter" content={results.newsletter} />
                    )}
                    {activeResultTab === "hooks" && (
                      <HookCard hooks={results.hooks} />
                    )}
                    {activeResultTab === "calendar" && (
                      <CalendarCard calendar={results.calendar} />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Placeholder for History View */}
          {activeTab === "history" && (
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Content Database History</h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Connect your Supabase instance under Settings to activate content history tracking, tags filtering, and user logs.
              </p>
              <button
                onClick={() => setActiveTab("settings")}
                className="inline-flex items-center space-x-2 rounded-xl bg-slate-850 border border-slate-750 px-4 py-2 text-xs font-semibold text-indigo-400 hover:bg-slate-800 transition-all"
              >
                <span>Navigate to Integration Settings</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Placeholder for Settings View */}
          {activeTab === "settings" && (
            <div className="glass-panel border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-white">Integration Settings</h2>
                <p className="text-xs text-slate-400 mt-1">Configure external API keys and cloud configurations</p>
              </div>

              {/* Settings Section: Keys */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Engines</h3>
                
                <div className="space-y-4 p-4 rounded-xl border border-slate-850 bg-slate-900/40">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">OpenAI API Key</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="sk-proj-..."
                        disabled
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                      />
                      <Key className="absolute right-3 top-2.5 h-4 w-4 text-slate-600" />
                    </div>
                    <span className="text-[10px] text-slate-500">Unlocks raw audio translation (Whisper) and platform drafts.</span>
                  </div>
                </div>
              </div>

              {/* Settings Section: Supabase */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider">Database</h3>
                
                <div className="space-y-4 p-4 rounded-xl border border-slate-850 bg-slate-900/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Supabase URL</label>
                      <input
                        type="text"
                        placeholder="https://your-project.supabase.co"
                        disabled
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Supabase Anon Key</label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOi..."
                        disabled
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Required for archiving content threads, history dashboard, and metrics.</span>
                </div>
              </div>

              {/* Integration Status Summary Banner */}
              <div className="rounded-xl border border-dashed border-slate-800 p-4 text-center">
                <p className="text-[11px] text-slate-400 leading-normal">
                  ⚠️ This prototype dashboard is operating in **Hackathon Mock Mode**. All integration settings are currently inactive.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
