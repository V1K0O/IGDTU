"use client";

import React, { useState } from "react";
import { Copy, Check, TrendingUp, Sparkles } from "lucide-react";

interface HookCardProps {
  hooks: string[];
}

export default function HookCard({ hooks }: HookCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Mock scores for aesthetic purposes
  const mockScores = [98, 95, 93, 89, 87];
  const scoreColors = [
    "from-emerald-500 to-teal-400",
    "from-teal-500 to-indigo-400",
    "from-indigo-500 to-purple-400",
    "from-purple-500 to-pink-400",
    "from-pink-500 to-rose-400"
  ];

  return (
    <div className="glass-panel border border-slate-800/80 rounded-b-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-indigo-400 animate-pulse" />
            Viral Hooks Generator
          </h3>
          <p className="text-xs text-slate-400">High-converting hook drafts to open your videos or posts</p>
        </div>
        <div className="flex items-center text-xs text-emerald-400 font-semibold bg-emerald-500/10 rounded-full px-2.5 py-1 border border-emerald-500/20">
          <TrendingUp className="h-3.5 w-3.5 mr-1" />
          Average Hook Score: 92.4%
        </div>
      </div>

      <div className="space-y-4">
        {hooks.map((hook, index) => {
          const score = mockScores[index] || 85;
          const gradient = scoreColors[index] || "from-slate-500 to-slate-400";
          const isCopied = copiedIndex === index;

          return (
            <div
              key={index}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800/60 bg-slate-900/30 hover:bg-slate-900/60 hover:border-slate-700/50 transition-all duration-200"
            >
              <div className="flex items-start space-x-3 flex-1">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-slate-400 border border-slate-700/60">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-slate-200 leading-relaxed pt-0.5">
                  &ldquo;{hook}&rdquo;
                </p>
              </div>

              {/* Virality score and copy button */}
              <div className="flex items-center space-x-6 shrink-0 justify-end">
                {/* Virality Indicator */}
                <div className="flex items-center space-x-2.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Score:</span>
                  <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">{score}%</span>
                </div>

                {/* Copy action */}
                <button
                  onClick={() => handleCopy(hook, index)}
                  className={`inline-flex items-center justify-center p-2 rounded-lg border transition-all ${
                    isCopied
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-slate-800 text-slate-400 border-slate-700/50 hover:bg-slate-700 hover:text-white"
                  }`}
                  title="Copy Hook"
                >
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
