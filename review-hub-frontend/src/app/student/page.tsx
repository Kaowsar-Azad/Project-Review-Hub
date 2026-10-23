"use client";

import { useState } from "react";
import { Send, ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

 interface IProjectSubmission {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
 }
export default function StudentPage() {
  // ফর্ম ইনপুট স্টেটসমূহ
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [description, setDescription] = useState("");

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() ||!repoUrl.trim() || !liveUrl.trim() || !description.trim()){
         alert("Please fill in all required fields!");
         return;
    }
    if(!repoUrl.includes("github.com")){
        alert("Please provide a valid GitHub repository URL!");
      return;
    }
    const fromData:IProjectSubmission ={
      projectName,
      repoUrl,
      liveUrl,
      description,
    }
    console.log("Submitted Data:", fromData);
    alert("Project submitted successfully!");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-1 sm:pt-2 pb-4 flex flex-col justify-center">
      
      {/* পেজ হেডার - কম্প্যাক্ট স্পেসিং */}
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Submit Your <span className="text-gradient-brand">Project</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fill in your project details below for mentor review.
        </p>
      </div>

      {/* সাবমিশন ফর্ম কার্ড - নো-স্ক্রোল ভিউপোর্ট ফিট */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* প্রজেক্টের নাম */}
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

          {/* গিটহাব রিপোজিটরি লিঙ্ক */}
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

          {/* প্রজেক্ট বিবরণ */}
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

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 mt-1"
          >
            <Send className="h-4 w-4" />
            <span>Submit Project</span>
          </button>

        </form>
      </div>

    </div>
  );
}
