"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Check,
  X,
  Eye,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { MentorService } from "../mentor.service";
import { SubmissionFilter } from "../mentor.types";

export function MentorDashboardView() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<SubmissionFilter>("ALL");
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [feedbackNote, setFeedbackNote] = useState<string>("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, subRes] = await Promise.all([
        MentorService.getStats(),
        MentorService.getSubmissions(activeFilter),
      ]);
      if (statsRes?.stats) {
        setStats(statsRes.stats);
      }
      if (subRes?.submissions) {
        setSubmissions(subRes.submissions);
      }
    } catch (err: any) {
      console.error("Failed to load mentor dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [activeFilter]);

  const handleUpdateStatus = async (id: string, newStatus: "APPROVED" | "REJECTED") => {
    try {
      setActionLoading(true);
      await MentorService.updateReview(id, newStatus, feedbackNote);
      alert(`Submission ${newStatus.toLowerCase()} successfully!`);
      setSelectedSubmission(null);
      setFeedbackNote("");
      await loadDashboardData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update review status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenOverview = (item: any) => {
    setSelectedSubmission(item);
    setFeedbackNote(item.feedback || "");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Mentor <span className="text-gradient-brand">Dashboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review student project submissions, inspect code details, and submit feedback.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Projects</p>
            <p className="text-2xl font-bold text-foreground mt-0.5">{stats.total}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold text-amber-500 mt-0.5">{stats.pending}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-emerald-500 mt-0.5">{stats.approved}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Rejected</p>
            <p className="text-2xl font-bold text-rose-500 mt-0.5">{stats.rejected}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
            <XCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeFilter === filter
                ? "bg-brand-primary text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter === "ALL" ? "All Submissions" : filter}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-3 text-brand-primary" />
            <p className="text-sm">Loading submissions...</p>
          </div>
        ) : (
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
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground text-sm">
                      No submissions found.
                    </td>
                  </tr>
                ) : (
                  submissions.map((item) => {
                    const studentDisplayName =
                      item.student?.fullName || item.student?.name || "Student";
                    const studentDisplayId = item.student?.studentId
                      ? `#${item.student.studentId}`
                      : item.studentId
                      ? `#${item.studentId.slice(-4).toUpperCase()}`
                      : "#1001";

                    return (
                      <tr key={item.id} className="hover:bg-muted/20 transition">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-foreground">{item.projectName}</p>
                          <p className="text-xs text-muted-foreground">
                            {studentDisplayName} •{" "}
                            <span className="font-mono text-[11px] font-semibold text-brand-primary">
                              {studentDisplayId}
                            </span>
                          </p>
                        </td>

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

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenOverview(item)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/50 transition shadow-xs cursor-pointer"
                            >
                              <Eye className="h-3 w-3 text-muted-foreground" />
                              <span>Overview</span>
                            </button>

                            {item.status === "PENDING" && (
                              <>
                                <button
                                  disabled={actionLoading}
                                  onClick={() => handleUpdateStatus(item.id, "APPROVED")}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs cursor-pointer disabled:opacity-50"
                                >
                                  <Check className="h-3 w-3" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  disabled={actionLoading}
                                  onClick={() => handleUpdateStatus(item.id, "REJECTED")}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs cursor-pointer disabled:opacity-50"
                                >
                                  <X className="h-3 w-3" />
                                  <span>Reject</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {selectedSubmission.projectName}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Submitted by{" "}
                  <span className="font-semibold text-foreground">
                    {selectedSubmission.student?.fullName ||
                      selectedSubmission.student?.name ||
                      "Student"}
                  </span>{" "}
                  (
                  {selectedSubmission.student?.studentId
                    ? `#${selectedSubmission.student.studentId}`
                    : selectedSubmission.studentId
                    ? `#${selectedSubmission.studentId.slice(-4).toUpperCase()}`
                    : "#1001"}
                  )
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-2">
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

              <div>
                <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
                  Project Description
                </label>
                <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs text-foreground leading-relaxed">
                  {selectedSubmission.description}
                </div>
              </div>

              {selectedSubmission.status !== "PENDING" && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-700 dark:text-amber-400">
                  {selectedSubmission.status === "APPROVED"
                    ? "ℹ️ Currently Approved. To change decision to Reject, enter a reason below and click 'Change Decision to Reject'."
                    : "ℹ️ Currently Rejected. If student fixed issues, enter a reason below and click 'Change Decision to Approve'."}
                </div>
              )}

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
                  placeholder="Write constructive mentor feedback..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {selectedSubmission.status === "PENDING" && (
                  <>
                    <button
                      disabled={actionLoading}
                      onClick={() => handleUpdateStatus(selectedSubmission.id, "REJECTED")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      disabled={actionLoading}
                      onClick={() => handleUpdateStatus(selectedSubmission.id, "APPROVED")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Approve</span>
                    </button>
                  </>
                )}

                {selectedSubmission.status === "APPROVED" && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "REJECTED")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Change Decision to Reject</span>
                  </button>
                )}

                {selectedSubmission.status === "REJECTED" && (
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "APPROVED")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm cursor-pointer disabled:opacity-50"
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
