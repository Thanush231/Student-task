"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header({ onToggleSidebar }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (savedUser?.name) {
      setUserName(savedUser.name);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePhoto");
    router.push("/login");
  }

  // Get current section name
  function getSectionTitle() {
    if (pathname.includes("/dashboard/tasks/add")) return "Add New Task";
    if (pathname.includes("/dashboard/tasks/edit")) return "Edit Task";
    if (pathname.includes("/dashboard/tasks")) return "Task Management";
    if (pathname.includes("/dashboard/completed")) return "Completed Tasks";
    if (pathname.includes("/dashboard/profile")) return "Student Profile";
    if (pathname.includes("/dashboard/settings")) return "Settings";
    return "Dashboard";
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-sm border-b border-slate-100 dark:bg-slate-900/95 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {getSectionTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* User Pill */}
        <Link
          href="/dashboard/profile"
          className="hidden sm:flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 hover:opacity-80 transition"
        >
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </span>
          <span className="max-w-[120px] truncate">{userName}</span>
        </Link>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition active:scale-95 flex items-center gap-1.5"
        >
          <span>🚪</span>
          <span className="hidden xs:inline sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}