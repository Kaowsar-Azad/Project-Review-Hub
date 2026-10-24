import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 text-slate-600 mt-auto shrink-0 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white shadow-xs">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900">
                Review<span className="text-brand-primary">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Centralized platform for students to submit coding projects and mentors to review with real-time feedback.
            </p>
          </div>

          {/* Col 2: For Students (Plain Text, Non-Clickable) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Students
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Submit Project</li>
              <li>My Submissions</li>
              <li>Student Registration</li>
            </ul>
          </div>

          {/* Col 3: For Mentors (Plain Text, Non-Clickable) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Mentors
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Mentor Dashboard</li>
              <li>Review Queue</li>
              <li>Mentor Portal Access</li>
            </ul>
          </div>

          {/* Col 4: Platform & Support (Plain Text, Non-Clickable) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Home Overview</li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>System Operational</span>
              </li>
              <li className="text-slate-400">
                Version 1.0 (PostgreSQL)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 ReviewHub. All rights reserved.</p>
          <p className="text-slate-400">Project Review & Evaluation System</p>
        </div>
      </div>
    </footer>
  );
}
