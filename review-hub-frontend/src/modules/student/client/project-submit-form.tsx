"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, ExternalLink, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { StudentService } from "../student.service";

export function ProjectSubmitForm() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userStr) {
      alert("Please log in first to submit your project!");
      router.push("/login");
      return;
    }

    let user: any = null;
    try {
      user = JSON.parse(userStr);
    } catch {
      alert("Invalid session. Please log in again.");
      router.push("/login");
      return;
    }

    if (!user?.id) {
      alert("Please log in first to submit your project!");
      router.push("/login");
      return;
    }

    if (!projectName.trim() || !repoUrl.trim() || !liveUrl.trim() || !description.trim()) {
      alert("Please fill in all required fields!");
      return;
    }

    if (!repoUrl.includes("github.com")) {
      alert("Please provide a valid GitHub repository URL!");
      return;
    }

    try {
      setLoading(true);
      await StudentService.submitProject({
        projectName: projectName.trim(),
        repoUrl: repoUrl.trim(),
        liveUrl: liveUrl.trim(),
        description: description.trim(),
        studentId: user.id,
      });

      alert("Project submitted successfully!");
      router.push("/submissions");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to submit project. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-1 sm:pt-2 pb-4 flex flex-col justify-center">
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Submit Your <span className="text-gradient-brand">Project</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fill in your project details below for mentor review.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
              Project Name *
            </label>
            <input
              type="text"
              placeholder="e.g. E-Commerce Platform"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
              GitHub Repository URL *
            </label>
            <div className="relative">
              <FaGithub className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
              Live Deployment URL *
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://myproject.vercel.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1">
              Project Description *
            </label>
            <textarea
              rows={3}
              placeholder="Briefly describe your project features and technical stack..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-primary outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 mt-1 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span>{loading ? "Submitting..." : "Submit Project"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
