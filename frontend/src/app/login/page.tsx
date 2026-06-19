"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, User, Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);

  // Fields State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("http://127.0.0.1:8000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, niche }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Registration failed");

        localStorage.setItem("repurpose_user", JSON.stringify(data.user));
      } else {
        const res = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Invalid credentials");

        localStorage.setItem("repurpose_user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">

        {/* Logo */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">
              Repurpose<span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {mode === "signup" ? "Create your creator account" : "Welcome back"}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="w-full p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-2xl space-y-6">

          {/* Toggle Mode */}
          <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "signup" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "signin" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">

            {/* Username — signup only */}
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="yourname"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-10 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Niche — signup only */}
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Content Niche
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                  >
                    <option value="" disabled>Select your content niche</option>
                    <option value="tech">Tech & Coding</option>
                    <option value="business">Business & Marketing</option>
                    <option value="lifestyle">Lifestyle & Fitness</option>
                    <option value="education">Education</option>
                    <option value="finance">Finance & Investing</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed rounded-xl text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <span>{mode === "signup" ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch mode text */}
          <p className="text-center text-xs text-slate-500">
            {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              {mode === "signup" ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <p className="text-center text-[10px] text-slate-600">
          Creator Dashboard · RepurposeAI v2.0
        </p>
      </div>
    </div>
  );
}