"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem("token")));
  }, [pathname]);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-5 shadow dark:bg-slate-900">
      <Link
        href="/"
        className="text-3xl font-bold text-blue-600"
      >
        Task<span className="text-slate-900 dark:text-white">Manager</span>
      </Link>

      {!loggedIn && (
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-slate-700 hover:text-blue-600 dark:text-slate-200"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="text-slate-700 hover:text-blue-600 dark:text-slate-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}