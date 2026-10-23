"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ডেমো ক্রেডেনশিয়াল অটো-ফিল করার হ্যান্ডলার (টেস্টিং সহজ করার জন্য)
  const handleQuickFill = (role: "student" | "mentor") => {
    if (role === "student") {
      setEmail("student@reviewhub.com");
      setPassword("student123");
    } else {
      setEmail("mentor@reviewhub.com");
      setPassword("mentor123");
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার (পরবর্তীতে এখানে Better Auth এর signIn কল হবে)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Signing in as: ${email}`);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-2 sm:pt-4 pb-8 flex flex-col justify-center">
      
      {/* লগইন কার্ড */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        
        {/* হেডার */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md mb-3">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Sign In to <span className="text-gradient-brand">ReviewHub</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Enter your credentials to access your portal.
          </p>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* ইমেইল ফিল্ড */}
          <div>
            <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div>
            <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition"
              />
            </div>
          </div>

          {/* সাইন ইন বাটন */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* ডেমো কুইক লগইন অপশন (টেস্টিংয়ের সময় টাইপ করার ঝামেলা এড়াতে) */}
        <div className="mt-6 pt-5 border-t border-border">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-center mb-2.5">
            ⚡ 1-Click Demo Fill
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill("student")}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-muted/30 text-xs font-medium text-foreground hover:bg-muted transition"
            >
              <GraduationCap className="h-3.5 w-3.5 text-brand-primary" />
              <span>Student Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("mentor")}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-muted/30 text-xs font-medium text-foreground hover:bg-muted transition"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Mentor Demo</span>
            </button>
          </div>
        </div>

        {/* রেজিস্ট্রেশন লিংক */}
        <div className="text-center mt-5 text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-brand-primary hover:underline">
            Register as Student
          </Link>
        </div>

      </div>

    </div>
  );
}
