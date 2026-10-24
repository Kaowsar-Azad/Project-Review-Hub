"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, ExternalLink, CheckCircle2, Clock, XCircle, MessageSquare, Inbox, Eye, X, Loader2, LogIn } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { getMySubmissions } from "@/lib/submissionService";
import { IStudentSubmission } from "../student.types";

export function MySubmissionsView() {
  const [submissions, setSubmissions] = useState<IStudentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<IStudentSubmission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user?.id) {
            setIsLoggedIn(true);
            const data = await getMySubmissions(user.id);
            setSubmissions(data.submissions || []);
            return;
          }
        }

        setIsLoggedIn(false);
        setSubmissions([]);
      } catch (err) {
        console.error("Failed to load submissions", err);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My <span className="text-gradient-brand">Submissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Track review progress, submission timeline, and mentor feedback.
          </p>
        </div>

        {isLoggedIn && (
          <Link
            href="/student"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-brand text-xs sm:text-sm font-semibold text-white shadow-sm hover:opacity-95 transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Submit New Project</span>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-3 text-brand-primary" />
          <p className="text-sm">Loading your submissions...</p>
        </div>
      ) : !isLoggedIn ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-3">
            <LogIn className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Please Log In</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            You must be logged in as a student to view your project submissions and mentor reviews.
          </p>
          <div className="mt-5">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Go to Login</span>
            </Link>
          </div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-3">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No submissions found</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            You haven&apos;t submitted any projects yet. Fill in your project details to get review feedback from mentors.
          </p>
          <div className="mt-5">
            <Link
              href="/student"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Submit First Project</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => {
            const isApproved = sub.status === "APPROVED";
            const isRejected = sub.status === "REJECTED";
            const isPending = sub.status === "PENDING";

            return (
              <div
                key={sub.id}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs hover:border-brand-primary/40 transition flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{sub.projectName}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground mt-1">
                      <span>Submitted on: <strong className="text-foreground">{new Date(sub.submittedAt).toLocaleDateString()}</strong></span>
                      <span>•</span>
                      <span>
                        Reviewed on:{" "}
                        <strong className="text-foreground">
                          {sub.reviewedAt ? new Date(sub.reviewedAt).toLocaleDateString() : "Pending Review"}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    {isApproved && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>APPROVED</span>
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                        <Clock className="h-3.5 w-3.5" />
                        <span>PENDING</span>
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>REJECTED</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {sub.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border">
                  <a
                    href={sub.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                    <span>Repository Link</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground ml-0.5" />
                  </a>
                  <a
                    href={sub.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-brand-primary" />
                    <span>Live Preview</span>
                  </a>
                </div>

                {sub.feedback && (
                  <div className="mt-1 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Mentor Feedback Note:</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFeedback(sub)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary hover:underline cursor-pointer"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Open Full Message</span>
                      </button>
                    </div>
                    <p className="text-xs text-foreground line-clamp-2">
                      {sub.feedback}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-brand-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Mentor Feedback • {selectedFeedback.projectName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeedback(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedFeedback.feedback}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 rounded-lg bg-muted text-xs font-semibold text-foreground hover:bg-muted/80 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
