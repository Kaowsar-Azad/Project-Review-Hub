"use client";

import { useState } from "react";
import { Layers, Clock, CheckCircle2, XCircle, ExternalLink, Check, X, Eye, MessageSquare } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// সাবমিশন ডেটার টাইপ (স্টুডেন্ট আইডি ও ডেসক্রিপশন সহ)
interface ISubmissionItem {
  id: string;
  projectName: string;
  studentName: string;
  studentId: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  feedback?: string;
}

// প্রাথমিক সাবমিশন তালিকা (টেস্ট করার জন্য)
const initialSubmissions: ISubmissionItem[] = [
  {
    id: "sub-1",
    projectName: "E-Commerce Storefront",
    studentName: "Rahim Ahmed",
    studentId: "STU-2026-001",
    repoUrl: "https://github.com/rahim/ecommerce",
    liveUrl: "https://rahim-ecommerce.vercel.app",
    description: "A full-featured e-commerce platform built with Next.js, Stripe payment, and PostgreSQL database.",
    status: "PENDING",
    submittedAt: "2026-10-23",
  },
  {
    id: "sub-2",
    projectName: "AI Chat Assistant",
    studentName: "Fatima Khan",
    studentId: "STU-2026-002",
    repoUrl: "https://github.com/fatima/ai-chat",
    liveUrl: "https://fatima-chat.vercel.app",
    description: "An AI-powered conversational chatbot integrating OpenAI API with streaming responses and chat history.",
    status: "APPROVED",
    submittedAt: "2026-10-22",
    feedback: "Excellent architecture and clean code structure!",
  },
];

export default function MentorDashboardPage() {
  const [submissions, setSubmissions] = useState<ISubmissionItem[]>(initialSubmissions);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  
  // ওভারভিউ মোডাল ও ফিডব্যাকের স্টেট
  const [selectedSubmission, setSelectedSubmission] = useState<ISubmissionItem | null>(null);
  const [feedbackNote, setFeedbackNote] = useState<string>("");

  // কার্ডের সংখ্যা হিসাব (ডায়নামিক কাউন্ট - কোনো ফেইক নম্বর নয়)
  const totalCount = submissions.length;
  const pendingCount = submissions.filter((s) => s.status === "PENDING").length;
  const approvedCount = submissions.filter((s) => s.status === "APPROVED").length;
  const rejectedCount = submissions.filter((s) => s.status === "REJECTED").length;

  // স্ট্যাটাস ও ফিডব্যাক আপডেট হ্যান্ডলার
  const handleUpdateStatus = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, feedback: feedbackNote || item.feedback } : item
      )
    );
    setSelectedSubmission(null);
    setFeedbackNote("");
  };

  // ওভারভিউ মোডাল ওপেন করার হ্যান্ডলার
  const handleOpenOverview = (item: ISubmissionItem) => {
    setSelectedSubmission(item);
    setFeedbackNote(item.feedback || "");
  };

  // ফিল্টার অনুযায়ী তালিকা
  const filteredSubmissions = submissions.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.status === activeFilter;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* পেজ হেডার */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Mentor <span className="text-gradient-brand">Dashboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review student project submissions, inspect code details, and submit feedback.
        </p>
      </div>

      {/* ৪টি স্ট্যাটাস ওভারভিউ কার্ড (ডায়নামিক কাউন্ট) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* মোট প্রজেক্ট */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Projects</p>
            <p className="text-2xl font-bold text-foreground mt-0.5">{totalCount}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        {/* পেন্ডিং রিভিউ */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold text-amber-500 mt-0.5">{pendingCount}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        {/* অনুমোদিত */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-emerald-500 mt-0.5">{approvedCount}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        {/* বাতিল */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Rejected</p>
            <p className="text-2xl font-bold text-rose-500 mt-0.5">{rejectedCount}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
            <XCircle className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* ফিল্টার বাটনসমূহ */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === filter
                ? "bg-brand-primary text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter === "ALL" ? "All Submissions" : filter}
          </button>
        ))}
      </div>

      {/* প্রজেক্ট টেবিল */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Project & Student</th>
                <th className="px-5 py-3 font-semibold">Links</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground text-sm">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition">
                    
                    {/* প্রজেক্ট ও স্টুডেন্ট নাম + আইডি */}
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-foreground">{item.projectName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.studentName} • <span className="font-mono text-[11px]">{item.studentId}</span>
                      </p>
                    </td>

                    {/* গিটহাব ও লাইভ লিঙ্ক */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition underline-offset-4 hover:underline"
                        >
                          <FaGithub className="h-3.5 w-3.5" /> Code
                        </a>
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-brand-primary hover:underline transition"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live
                        </a>
                      </div>
                    </td>

                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          item.status === "APPROVED"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : item.status === "REJECTED"
                            ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* অ্যাকশন বাটনসমূহ (Overview + Quick Actions) */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* ওভারভিউ বাটন */}
                        <button
                          onClick={() => handleOpenOverview(item)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/50 transition shadow-xs"
                        >
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span>Overview</span>
                        </button>

                        {/* পেন্ডিং থাকলে সরাসরি অ্যাকশন বাটন */}
                        {item.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "APPROVED")}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs"
                            >
                              <Check className="h-3 w-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "REJECTED")}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs"
                            >
                              <X className="h-3 w-3" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* বিস্তারিত ওভারভিউ ও ফিডব্যাক মোডাল (Project Details Modal) */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            
            {/* মোডাল হেডার */}
            <div className="flex items-start justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {selectedSubmission.projectName}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Submitted by <span className="font-semibold text-foreground">{selectedSubmission.studentName}</span> ({selectedSubmission.studentId})
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* মোডাল বডি - লিংক ও পূর্ণাঙ্গ ডেসক্রিপশন */}
            <div className="space-y-3.5">
              
                           {/* লিঙ্কসমূহ - আসল URL সরাসরি প্রদর্শন */}
              <div className="space-y-2">
                
                {/* গিটহাব রিপোজিটরি লিঙ্ক ও URL */}
                <div>
                  <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    GitHub Repository URL
                  </span>
                  <a
                    href={selectedSubmission.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-foreground hover:border-brand-primary transition group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FaGithub className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
                      <span className="truncate text-brand-primary group-hover:underline">
                        {selectedSubmission.repoUrl}
                      </span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-brand-primary" />
                  </a>
                </div>

                {/* লাইভ ডেপ্লয়মেন্ট লিঙ্ক ও URL */}
                <div>
                  <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    Live Deployment URL
                  </span>
                  <a
                    href={selectedSubmission.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-foreground hover:border-brand-primary transition group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <ExternalLink className="h-4 w-4 shrink-0 text-brand-primary" />
                      <span className="truncate text-brand-primary group-hover:underline">
                        {selectedSubmission.liveUrl}
                      </span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-brand-primary" />
                  </a>
                </div>

              </div>


              {/* স্টুডেন্টের দেওয়া ডেসক্রিপশন */}
              <div>
                <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
                  Project Description
                </label>
                <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs text-foreground leading-relaxed">
                  {selectedSubmission.description}
                </div>
              </div>

                            {/* স্ট্যাটাস পরিবর্তনের নির্দেশনামূলক নোট */}
              {selectedSubmission.status !== "PENDING" && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-700 dark:text-amber-400">
                  {selectedSubmission.status === "APPROVED" 
                    ? "ℹ️ প্রজেক্টটি বর্তমানে Approved। আপনি সিদ্ধান্ত বদলে Reject করতে চাইলে নিচে কারণ লিখে 'Change Decision to Reject' বাটনে ক্লিক করুন।"
                    : "ℹ️ প্রজেক্টটি বর্তমানে Rejected। স্টুডেন্ট সমস্যা সমাধান করে থাকলে নিচে নোট লিখে 'Change Decision to Approve' বাটনে ক্লিক করুন।"}
                </div>
              )}

              {/* মেন্টর ফিডব্যাক ইনপুট বক্স */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
                  <MessageSquare className="h-3.5 w-3.5 text-brand-primary" />
                  <span>
                    {selectedSubmission.status === "PENDING" 
                      ? "Mentor Feedback Note" 
                      : "Reason for Decision Change / Re-review Note"}
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="সিদ্ধান্ত পরিবর্তনের কারণ বা গঠনমূলক ফিডব্যাক লিখুন..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition resize-none"
                />
              </div>

            </div>

            {/* মোডাল ফুটার বাটনসমূহ */}
            <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                Close
              </button>
              
              <div className="flex items-center gap-2">
                {/* পেন্ডিং থাকলে এক্সেপ্ট ও রিজেক্ট বাটন */}
                {selectedSubmission.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(selectedSubmission.id, "REJECTED")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedSubmission.id, "APPROVED")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Approve</span>
                    </button>
                  </>
                )}

                {/* পূর্বে Approved থাকলে: স্পষ্টভাবে Reject-এ পরিবর্তনের বাটন */}
                {selectedSubmission.status === "APPROVED" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "REJECTED")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Change Decision to Reject</span>
                  </button>
                )}

                {/* পূর্বে Rejected থাকলে: স্পষ্টভাবে Approve-এ পরিবর্তনের বাটন */}
                {selectedSubmission.status === "REJECTED" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "APPROVED")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Change Decision to Approve</span>
                  </button>
                )}
              </div>
            </div>


          </div>
        </div>
      )}

    </div>
  );
}
