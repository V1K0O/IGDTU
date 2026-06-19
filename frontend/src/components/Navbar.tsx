"use client";

import React from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-lg shadow-primary-indigo/35 group-hover:scale-105 transition-transform duration-300">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Repurpose<span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="glow-btn border-gradient-glow flex items-center justify-center rounded-xl bg-card-dark px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-700/50"
            >
              Try Demo
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-secondary-violet/25 hover:shadow-secondary-violet/40 hover:opacity-95 transition-all"
            >
              Launch Dashboard
            </Link>

            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
  Sign In
</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-700/50 bg-bg-dark/95 py-4 px-4 space-y-3">
          <Link
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Pricing
          </Link>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white border border-slate-700 hover:bg-slate-700"
            >
              Try Demo
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary-violet/20"
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
