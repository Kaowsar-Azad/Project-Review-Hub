"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserPlus, ArrowRight, Check } from "lucide-react";
import { api } from "@/lib/api";

export function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/sign-up/email", {
        name: fullName,
        email: email,
        password: password,
      });

      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Account created successfully!");
      router.push("/student");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to create account. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md mb-3">
          <UserPlus className="h-6 w-6" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Student Registration
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Create an account to submit your projects.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              required
              placeholder="e.g. Rahim Ahmed"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition"
            />
          </div>
        </div>

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
          <div
            className={`mt-1.5 flex items-center gap-1.5 text-xs transition-colors ${
              password.length >= 8
                ? "text-emerald-600 font-medium"
                : "text-muted-foreground"
            }`}
          >
            <Check
              className={`h-3.5 w-3.5 transition-colors ${
                password.length >= 8 ? "text-emerald-600" : "text-muted-foreground/40"
              }`}
            />
            <span>
              password must be 8 characters long {password.length > 0 && `(${password.length}/8)`}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? <span>Creating Account...</span> : <span>Sign Up</span>}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-primary hover:underline">
          Log In
        </Link>
      </div>
    </div>
  );
}
