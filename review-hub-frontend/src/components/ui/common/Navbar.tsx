"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Code2, LayoutDashboard, Send, LogIn, Menu, X, FolderGit2, LogOut, UserCircle2 } from "lucide-react";

interface IUser {
  id: string;
  name: string;
  email: string;
  role?: "STUDENT" | "MENTOR";
  image?: string | null;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const getNumericId = (id?: string) => {
    if (!id) return "7801";
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) % 9000;
    }
    return 1000 + Math.abs(hash);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, [pathname]);

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    router.push("/login");
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isMentor = currentUser?.role === "MENTOR" || currentUser?.email?.includes("mentor") || currentUser?.email === "kaowsar148@gmail.com";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* লোগো */}
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {(!currentUser || !isMentor) && (
            <>
              <Link
                href="/student"
                className={`flex items-center gap-2 transition hover:text-foreground ${
                  pathname === "/student" ? "text-brand-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                <Send className="h-4 w-4" />
                <span>Submit Project</span>
              </Link>

              <Link
                href="/submissions"
                className={`flex items-center gap-2 transition hover:text-foreground ${
                  pathname === "/submissions" ? "text-brand-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                <FolderGit2 className="h-4 w-4" />
                <span>My Submissions</span>
              </Link>
            </>
          )}

          {(!currentUser || isMentor) && (
            <Link
              href="/mentor"
              className={`flex items-center gap-2 transition hover:text-foreground ${
                pathname === "/mentor" ? "text-brand-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Mentor Dashboard</span>
            </Link>
          )}
        </nav>

        {/* ডেক্সটপ অথ বাটন / ইউজার প্রোফাইল */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-2xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase">
                  {currentUser.name ? currentUser.name.charAt(0) : "U"}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground leading-tight">
                    {currentUser.name || "Student"}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-none font-medium mt-0.5">
                    {isMentor? "Mentor" : `Student • ID: #${getNumericId(currentUser.id)}`}
                  </span>
                </div>

              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition cursor-pointer"
                title="Log Out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* মোবাইল মেনু বাটন */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-3 pb-5 space-y-3">
          {currentUser && (
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm uppercase">
                {currentUser.name ? currentUser.name.charAt(0) : "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground">{currentUser.email}</span>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-2">
            {(!currentUser || !isMentor) && (
              <>
                <Link
                  href="/student"
                  onClick={handleCloseMobileMenu}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Project</span>
                </Link>
                <Link
                  href="/submissions"
                  onClick={handleCloseMobileMenu}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FolderGit2 className="h-4 w-4" />
                  <span>My Submissions</span>
                </Link>
              </>
            )}

            {(!currentUser || isMentor) && (
              <Link
                href="/mentor"
                onClick={handleCloseMobileMenu}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Mentor Dashboard</span>
              </Link>
            )}
          </nav>

          <div className="pt-2 border-t border-border">
            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  handleCloseMobileMenu();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/20"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={handleCloseMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={handleCloseMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-medium text-white shadow-md hover:opacity-95"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
