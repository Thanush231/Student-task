"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem("token")));
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-4 shadow-sm dark:bg-slate-900/90 dark:border-b dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2"
        >
          <span>📋</span>
          <span>Task<span className="text-slate-900 dark:text-white">Manager</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              pathname === "/"
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
            }`}
          >
            Home
          </Link>

          {!loggedIn ? (
            <>
              <Link
                href="/login"
                className={`font-medium transition-colors ${
                  pathname === "/login"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700 transition active:scale-95"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700 transition active:scale-95 flex items-center gap-2"
            >
              <span>Go to Dashboard</span>
              <span>→</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3 pb-2 animate-fadeIn">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            🏠 Home
          </Link>

          {!loggedIn ? (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
              >
                🔐 Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow hover:bg-blue-700"
              >
                ✨ Register Account
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow hover:bg-blue-700"
            >
              🚀 Open Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}