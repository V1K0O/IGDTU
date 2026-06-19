"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Mail, Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface ContentCardProps {
  type: "transcript" | "linkedin" | "twitter" | "instagram" | "newsletter";
  content: string;
  videoUrl?: string;
}

export default function ContentCard({ type, content, videoUrl }: ContentCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformHeader = () => {
    switch (type) {
      case "transcript":
        return { label: "Transcribed Text", subtitle: "Whisper AI Transcription" };
      case "linkedin":
        return { label: "LinkedIn Post", subtitle: "Optimized for professional engagement" };
      case "twitter":
        return { label: "X Thread Preview", subtitle: "Split into high-engagement tweets" };
      case "instagram":
        return { label: "Instagram Caption", subtitle: "Visual caption & hashtag stack" };
      case "newsletter":
        return { label: "Newsletter Draft", subtitle: "Email campaign template" };
    }
  };

  const info = getPlatformHeader();

  // Render Twitter Thread style
  const renderTwitterThread = () => {
    // Split content by double newlines to generate the thread tweets dynamically
    const tweets = content
      ? content.split(/\n\s*\n/).filter((t) => t.trim() !== "")
      : [];

    if (tweets.length === 0) {
      tweets.push(content || "No thread content generated.");
    }

    return (
      <div className="space-y-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="flex space-x-3 bg-slate-900/40 border border-slate-800 rounded-xl p-4 relative">
            {/* Thread line */}
            {index < tweets.length - 1 && (
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-800" />
            )}
            
            {/* Avatar Mock */}
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white text-xs shrink-0 select-none">
              RA
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-semibold text-white">RepurposeAI Creator</span>
                <span className="text-xs text-slate-500">@repurposeai_app · {index + 1}m</span>
              </div>
              <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{tweet}</p>
              
              {/* Interaction Bar */}
              <div className="flex justify-between items-center text-slate-500 max-w-xs pt-3 text-xs">
                <button className="hover:text-sky-400 flex items-center space-x-1.5 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>24</span>
                </button>
                <button className="hover:text-green-400 flex items-center space-x-1.5 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>12</span>
                </button>
                <button className="hover:text-rose-400 flex items-center space-x-1.5 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>84</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render Instagram Preview Mock
  const renderInstagram = () => {
    return (
      <div className="max-w-md mx-auto rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        {/* IG Header */}
        <div className="flex items-center space-x-3 p-3 border-b border-slate-900 bg-slate-900/20">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            RA
          </div>
          <div>
            <p className="text-xs font-bold text-white">repurposeai_creator</p>
            <p className="text-[10px] text-slate-500">Suggested post</p>
          </div>
        </div>

        {/* IG Mock Image/Video Thumbnail */}
        <div className="aspect-square bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/video-thumbnail-placeholder.png"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-center space-y-3 p-6">
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Featured Clip</p>
                <p className="text-lg font-bold text-white max-w-xs mx-auto">AI is changing education faster than ever.</p>
                <p className="text-xs text-slate-400">1:00 min video draft ready</p>
              </div>
            </>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center justify-between p-3 text-slate-200">
          <div className="flex items-center space-x-4">
            <Heart className="h-5.5 w-5.5 cursor-pointer hover:text-rose-500 transition-colors" />
            <MessageCircle className="h-5.5 w-5.5 cursor-pointer hover:text-white transition-colors" />
            <Send className="h-5.5 w-5.5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <Bookmark className="h-5.5 w-5.5 cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* Caption */}
        <div className="px-3 pb-4 space-y-1">
          <p className="text-xs font-bold text-white">1,248 likes</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white mr-1.5">repurposeai_creator</span>
            {content}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-2">2 hours ago</p>
        </div>
      </div>
    );
  };

  // Render Newsletter mockup
  const renderNewsletter = () => {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="border-b border-slate-900 bg-slate-900/40 p-4 space-y-2">
          <div className="flex items-center text-xs">
            <span className="w-16 text-slate-500 font-semibold">Subject:</span>
            <span className="text-slate-200 font-medium font-sans">Draft: AI in Education (Smarter Learning)</span>
          </div>
          <div className="flex items-center text-xs">
            <span className="w-16 text-slate-500 font-semibold">To:</span>
            <span className="text-slate-400">Subscribers Segment A</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="border-b border-slate-900 pb-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-indigo-400" />
              <span className="text-sm font-bold text-slate-200 font-sans">RepurposeAI Newsletter Digest</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Template v1.2</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
            {content}
            {"\n\n"}
            AI tools are transforming how students learn and work. In our latest segment, we breakdown the tools that can save you hours of work every single week.
            {"\n\n"}
            Read the full guide on our blog. Let us know what you think!
            {"\n\n"}
            Best,{"\n"}
            RepurposeAI Team
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-b-2xl p-6 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white">{info?.label}</h3>
          <p className="text-xs text-slate-400">{info?.subtitle}</p>
        </div>

        <button
          onClick={handleCopy}
          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            copied
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-slate-800/40 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Render Main Content */}
      <div className="mt-4">
        {type === "twitter" && renderTwitterThread()}
        {type === "instagram" && renderInstagram()}
        {type === "newsletter" && renderNewsletter()}
        
        {/* Default / Raw display */}
        {type !== "twitter" && type !== "instagram" && type !== "newsletter" && (
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
            <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
              {content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
