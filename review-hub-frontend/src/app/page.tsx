import Link from "next/link";
import { Send, LayoutDashboard, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight sm:leading-tight">
            Seamless Project Evaluation for{" "}
            <span className="text-gradient-brand">Modern Developers</span>
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A centralized dashboard where students submit their best coding work, 
            and mentors evaluate submissions with instant feedback and robust validation.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/student"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
              <Send className="h-4 w-4" />
              <span>Submit Your Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/mentor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted shadow-xs"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Mentor Review Portal</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-muted/30 border-t border-border/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs transition hover:shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-brand-primary mb-4">
                <Send className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-foreground">Effortless Submission</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Clean and structured form to submit GitHub repos, live deployments, and project details with real-time validation.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs transition hover:shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 mb-4">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-foreground">Anti-Spam & Unique</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Intelligent duplicate repo checking and server-side rate-limiting to keep reviews fair, clean, and organized.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs transition hover:shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 mb-4">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-foreground">Fast Mentor Reviews</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Paginated tables, server-side status filtering, and 1-click Approve/Reject actions with helpful feedback notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
