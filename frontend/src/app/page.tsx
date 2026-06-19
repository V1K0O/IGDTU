import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Share2, Sparkles, Calendar, ArrowRight, Zap, Play, Shield, Database } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "AI Transcription",
      description: "Convert video or audio files to readable text in seconds. Built on OpenAI's Whisper model architecture.",
      icon: FileText,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Social Media Repurposing",
      description: "Tailor the core message of your file for LinkedIn, X, Instagram, and more with customized platform-specific formatting.",
      icon: Share2,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Viral Hook Generator",
      description: "Generate 5 high-converting hook drafts to stop the scroll. Rated with an engagement percentage score.",
      icon: Sparkles,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    },
    {
      title: "Content Calendar Generator",
      description: "Schedule your posts into a weekly structured distribution grid mapping Mondays to Fridays.",
      icon: Calendar,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 lg:pb-36">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary-indigo/25 blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -z-10 h-72 w-72 rounded-full bg-secondary-violet/20 blur-3xl opacity-40 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 rounded-full bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700/50 shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>RepurposeAI Hackathon Prototype MVP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Create Once, <br className="sm:hidden" />
            <span className="text-gradient">Publish Everywhere</span>
          </h1>

          <p className="text-md sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Turn videos, podcasts, and recordings into platform-ready content using AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-xl bg-gradient-primary px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-secondary-violet/20 hover:shadow-secondary-violet/35 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>Try Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard?tab=upload"
              className="w-full sm:w-auto glow-btn border-gradient-glow rounded-xl bg-card-dark px-8 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>Upload Content</span>
            </Link>
          </div>

          {/* Premium UI Mockup */}
          <div className="pt-16 max-w-5xl mx-auto">
            <div className="glass-panel border-gradient-glow rounded-2xl p-2.5 shadow-2xl relative">
              <div className="absolute top-4 left-6 flex space-x-1.5 z-20">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[16/9] flex items-center justify-center relative group cursor-pointer">
                {/* Mock screenshot overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-between p-8 text-left">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">RepurposeAI Dashboard Workspace</span>
                    <span className="text-xs text-emerald-400 flex items-center">
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" />
                      Mock API Active
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6 py-6 flex-1 items-center">
                    <div className="col-span-1 border border-slate-800 bg-slate-950/50 rounded-xl p-4 flex flex-col justify-between h-40">
                      <div>
                        <p className="text-xs font-bold text-white mb-1">Step 1: Upload Media</p>
                        <p className="text-[10px] text-slate-500">Video / audio recordings</p>
                      </div>
                      <div className="border border-dashed border-slate-800 rounded-lg p-2.5 text-center text-[10px] text-slate-400">
                        Drag file here
                      </div>
                    </div>
                    <div className="col-span-2 border border-slate-800 bg-slate-950/50 rounded-xl p-4 flex flex-col justify-between h-40">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-white">Step 2: Generated Results</p>
                        <div className="flex space-x-1">
                          <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-white font-bold">X Thread</span>
                          <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">LinkedIn</span>
                          <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Calendar</span>
                        </div>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 line-clamp-3 leading-relaxed border-l-2 border-primary-indigo pl-2">
                        🧵 5 AI tools every student should know:
                        {"\n"}ChatGPT
                        {"\n"}Perplexity
                        {"\n"}Notion AI
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-white shadow-xl shadow-primary-indigo/35 scale-90 group-hover:scale-100 transition-transform">
                    <Play className="h-6 w-6 ml-1 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-slate-900 bg-slate-950/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Packed with features for <span className="text-gradient">modern creators</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Say goodbye to hours of editing and formatting. RepurposeAI generates ready-to-publish drafts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel border border-slate-800 rounded-2xl p-6 md:p-8 flex gap-5 hover:border-slate-700/50 hover:bg-slate-800/40 transition-all duration-200 group"
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center border shrink-0 ${feature.color} group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-indigo transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Roadmap Section */}
      <section className="py-20 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Integration Ecosystem (Roadmap)
            </h2>
            <p className="text-slate-400 text-sm">
              We are preparing integrations with core toolsets. Here is how our architecture scales for enterprise-level use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="border border-slate-800/80 bg-slate-900/40 rounded-xl p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Play className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">OpenAI Whisper &amp; GPT-4</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your OpenAI keys to automatically parse files through premium models, unlocking multi-speaker tracking.
              </p>
            </div>

            <div className="border border-slate-800/80 bg-slate-900/40 rounded-xl p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">Supabase Database</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Store file history, past transcripts, metadata tags, and content outputs for teams. Search and share in seconds.
              </p>
            </div>

            <div className="border border-slate-800/80 bg-slate-900/40 rounded-xl p-5 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-200 text-sm">User Authentication</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add Auth layers to prevent abuse, track usage tiers, and protect confidential podcast transcripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
