"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, LayoutDashboard, Send, LogIn, Menu, X, FolderGit2 } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // মোবাইল মেনু খোলা বা বন্ধ (টগল) করার হ্যান্ডলার
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // লিংকে ক্লিক করলে মোবাইল মেনু বন্ধ করার হ্যান্ডলার
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* লোগো ও ব্র্যান্ড নাম */}
        <Link 
          href="/" 
          onClick={handleCloseMobileMenu} 
          className="flex items-center gap-2 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Review<span className="text-gradient-brand">Hub</span>
          </span>
        </Link>

        {/* ডেক্সটপ মেনু লিংকসমূহ */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/student"
            className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
          >
            <Send className="h-4 w-4" />
            <span>Submit Project</span>
          </Link>
                    {/* My Submissions লিংক */}
          <Link
            href="/submissions"
            className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>My Submissions</span>
          </Link>

          <Link
            href="/mentor"
            className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Mentor Dashboard</span>
          </Link>
        </nav>

        {/* ডেক্সটপ অথ বাটনসমূহ */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <LogIn className="h-4 w-4" />
            <span>Log In</span>
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-medium text-white shadow-md transition hover:opacity-95"
          >
            <span>Sign Up</span>
          </Link>
        </div>

        {/* মোবাইল হ্যামবার্গার বাটন */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isMobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col space-y-3">
            <Link
              href="/student"
              onClick={handleCloseMobileMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Send className="h-4 w-4" />
              <span>Submit Project (Student)</span>
            </Link>
            <Link
              href="/mentor"
              onClick={handleCloseMobileMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Mentor Dashboard</span>
            </Link>

            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link
                href="/login"
                onClick={handleCloseMobileMenu}
                className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </Link>
              <Link
                href="/signup"
                onClick={handleCloseMobileMenu}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-medium text-white shadow-md"
              >
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
