import Link from "next/link";
import { Send, LayoutDashboard, ShieldCheck, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      
      {/* ১. হিরো সেকশন */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* টপ ব্যাজ */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Smart Project Submission & Review Platform</span>
          </div>

          {/* মূল শিরোনাম */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight sm:leading-none">
            Seamless Project Evaluation for{" "}
            <span className="text-gradient-brand">Modern Developers</span>
          </h1>

          {/* সাব-টাইটেল */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A centralized dashboard where students submit their best coding work, 
            and mentors evaluate submissions with instant feedback and robust validation.
          </p>

          {/* প্রধান দুটি অ্যাকশন বাটন */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/student"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
            >
              <Send className="h-5 w-5" />
              <span>Submit Your Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/mentor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition hover:bg-muted shadow-sm"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Mentor Review Portal</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ২. মূল ফিচারসমূহের গ্রিড */}
      <section className="py-12 sm:py-16 bg-muted/40 border-t border-border/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* ফিচার ১: স্টুডেন্ট পোর্টাল */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-brand-primary mb-5">
                <Send className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Effortless Submission</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Clean and structured form to submit GitHub repos, live deployments, and project details with real-time Zod validation.
              </p>
            </div>

            {/* ফিচার ২: স্প্যাম ও ডুপ্লিকেট রোধ */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 mb-5">
                <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Anti-Spam & Unique</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Intelligent duplicate repo checking and server-side rate-limiting to keep reviews fair, clean, and organized.
              </p>
            </div>

            {/* ফিচার ৩: মেন্টর রিভিউ ও অ্যানালিটিক্স */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 mb-5">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Fast Mentor Reviews</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Paginated tables, server-side status filtering, and 1-click Approve/Reject actions with helpful feedback notes.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ৩. সাধারণ ফুটার */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>© 2026 ReviewHub. Built with Next.js, Tailwind CSS, TypeScript & PostgreSQL.</p>
      </footer>

    </div>
  );
}
