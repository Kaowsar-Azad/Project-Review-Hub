"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { AuthService } from "../auth.service";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuickFill = (role: "student" | "mentor") => {
    if (role === "student") {
      setEmail("pranto@gmail.com");
      setPassword("12345678");
    } else {
      setEmail("kaowsar148@gmail.com");
      setPassword("kaowsar148");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await AuthService.signIn({
        email,
        password,
      });

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Welcome back! Logged in successfully.");

      if ((data?.user as any)?.role === "MENTOR" || email.includes("mentor") || email === "kaowsar148@gmail.com") {
        router.push("/mentor");
      } else {
        router.push("/student");
      }
    } catch (err: any) {
      const errorMsg =
        err.message || "Invalid email or password. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
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

      <form onSubmit={handleLoginSubmit} className="space-y-4">
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

        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Quick Demo Fill (1-Click)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill("student")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
            >
              <GraduationCap className="h-3.5 w-3.5 text-brand-primary" />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("mentor")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-brand-secondary" />
              <span>Mentor</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? <span>Signing In...</span> : <span>Sign In</span>}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-brand-primary hover:underline">
          Register as Student
        </Link>
      </div>
    </div>
  );
}
