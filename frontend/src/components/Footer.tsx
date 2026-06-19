import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedInIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-bg-dark/70 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Repurpose<span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Create once, publish everywhere. Turn podcasts, recordings, and videos into social media campaigns in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">Try Demo</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">API Status</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Hackathon MVP</h3>
            <div className="mt-4 rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                This is a prototype MVP built for hackathon validation. Backend functions are powered by mocked FastAPI endpoints, prepared for integration with OpenAI and Supabase.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} RepurposeAI. All rights reserved.</p>
          <p className="text-xs text-slate-400 mt-2 md:mt-0">Built with Next.js, React, Tailwind CSS, and FastAPI.</p>
        </div>
      </div>
    </footer>
  );
}
