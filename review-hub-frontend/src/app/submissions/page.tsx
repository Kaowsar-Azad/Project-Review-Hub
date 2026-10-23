"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, CheckCircle2, Clock, XCircle, MessageSquare, Inbox, Eye, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// স্টুডেন্ট সাবমিশন ডেটার টাইপ
interface IStudentSubmission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  submittedAt: string;
  reviewedAt?: string | null;
  feedback?: string;
}

export default function MySubmissionsPage() {
  // ডেমো সাবমিশন ডেটা (ডিজাইন দেখার জন্য)
  const mySubmissions: IStudentSubmission[] = [
    {
      id: "sub-1",
      projectName: "E-Commerce Storefront",
      repoUrl: "https://github.com/myusername/ecommerce",
      liveUrl: "https://my-ecommerce.vercel.app",
      description: "A full-featured e-commerce platform built with Next.js and PostgreSQL database.",
      status: "APPROVED",
      submittedAt: "2026-10-23",
      reviewedAt: "2026-10-24",
      feedback: "Great code organization and clean component structure! The database schema is well designed. For the next step, consider adding automated unit tests for payment webhook processing to make the deployment production-grade.",
    },
    {
      id: "sub-2",
      projectName: "Task Management App",
      repoUrl: "https://github.com/myusername/task-app",
      liveUrl: "https://my-task.vercel.app",
      description: "Task manager with drag-and-drop support and real-time status updates.",
      status: "PENDING",
      submittedAt: "2026-10-22",
      reviewedAt: null,
    },
  ];

  // মেন্টরের বিস্তারিত ফিডব্যাক পড়ার পপ-আপ স্টেট
  const [selectedFeedback, setSelectedFeedback] = useState<IStudentSubmission | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* পেজ হেডার ও নতুন প্রজেক্ট সাবমিট বাটন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My <span className="text-gradient-brand">Submissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Track review progress, submission timeline, and mentor feedback.
          </p>
        </div>
        
        {/* নতুন প্রজেক্ট সাবমিট বাটন */}
        <Link
          href="/student"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-brand text-xs sm:text-sm font-semibold text-white shadow-sm hover:opacity-95 transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Submit New Project</span>
        </Link>
      </div>

      {/* ১. খালি অবস্থার ডিজাইন (Empty State) */}
      {mySubmissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-3">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No submissions found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            You have not submitted any projects yet. Submit your project details to get reviewed by our mentors.
          </p>
          <Link
            href="/student"
            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-brand-primary text-xs font-semibold text-white shadow-sm hover:bg-brand-hover transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Submit Your First Project</span>
          </Link>
        </div>
      ) : (
        
        /* ২. সাবমিশন কার্ড তালিকা */
        <div className="space-y-4">
          {mySubmissions.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs hover:border-brand-primary/40 transition"
            >
              
              {/* কার্ডের শীর্ষভাগ: নাম, ২টি তারিখ ও স্ট্যাটাস ব্যাজ */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-3 mb-3.5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {project.projectName}
                  </h3>
                  
                  {/* ২টি তারিখ (Submitted Date ও Reviewed Date) */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                    <span>
                      Submitted on: <strong className="font-medium text-foreground">{project.submittedAt}</strong>
                    </span>
                    <span className="text-border hidden sm:inline">•</span>
                    <span>
                      Reviewed on:{" "}
                      <strong className="font-medium text-foreground">
                        {project.reviewedAt ? project.reviewedAt : "Pending Review"}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* স্ট্যাটাস ব্যাজ */}
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : project.status === "REJECTED"
                        ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                        : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                    }`}
                  >
                    {project.status === "APPROVED" && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {project.status === "REJECTED" && <XCircle className="h-3.5 w-3.5" />}
                    {project.status === "PENDING" && <Clock className="h-3.5 w-3.5" />}
                    <span>{project.status}</span>
                  </span>
                </div>
              </div>

              {/* প্রজেক্ট বিবরণ */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              {/* লিঙ্কসমূহ (গিটহাব ও লাইভ লিঙ্ক) */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/20 text-xs font-medium text-foreground hover:border-brand-primary transition"
                >
                  <FaGithub className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Repository Link</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground ml-0.5" />
                </a>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-primary/20 bg-brand-primary/5 text-xs font-medium text-brand-primary hover:bg-brand-primary/10 transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Preview</span>
                </a>
              </div>

              {/* ৩. মেন্টর ফিডব্যাক সেকশন (বড় মেসেজ ওপেন করার বাটন সহ) */}
              {project.status === "PENDING" ? (
                <div className="flex items-center gap-2 rounded-xl bg-amber-500/5 border border-amber-500/15 p-3 text-xs text-amber-700 dark:text-amber-400">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Your project is currently in the review queue. A mentor will review it shortly.</span>
                </div>
              ) : (
                <div className={`rounded-xl p-3.5 text-xs border ${
                  project.status === "APPROVED"
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                    : "bg-rose-500/5 border-rose-500/20 text-rose-800 dark:text-rose-300"
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Mentor Feedback Note:</span>
                    </div>

                    {/* সম্পূর্ণ ফিডব্যাক বড় করে পড়ার বাটন */}
                    {project.feedback && (
                      <button
                        onClick={() => setSelectedFeedback(project)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary hover:underline transition"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Open Full Message</span>
                      </button>
                    )}
                  </div>
                  
                  {/* সংক্ষেপ প্রিভিউ */}
                  <p className="leading-relaxed pl-5 line-clamp-2">
                    {project.feedback || "No specific comments provided."}
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Mentor Feedback Details
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Project: <span className="font-semibold text-foreground">{selectedFeedback.projectName}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-muted/30 border border-border p-2.5 text-xs text-muted-foreground mb-4">
              <div>Submitted: <span className="text-foreground font-medium">{selectedFeedback.submittedAt}</span></div>
              <div>Reviewed: <span className="text-foreground font-medium">{selectedFeedback.reviewedAt || "N/A"}</span></div>
              <div>
                Status:{" "}
                <span className={`font-semibold ${selectedFeedback.status === "APPROVED" ? "text-emerald-600" : "text-rose-600"}`}>
                  {selectedFeedback.status}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Full Feedback Message
              </label>
              <div className="rounded-xl border border-border bg-muted/20 p-4 text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                {selectedFeedback.feedback}
              </div>
            </div>

           
            <div className="flex justify-end border-t border-border pt-4 mt-4">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 rounded-lg bg-muted text-xs font-semibold text-foreground hover:bg-muted/80 transition"
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
