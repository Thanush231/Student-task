"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const enabled = savedTheme === "dark";

    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function changeTheme(enabled) {
    setDarkMode(enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
    document.documentElement.classList.toggle("dark", enabled);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          ⚙️ Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Personalize your application display and preferences.
        </p>
      </div>

      {/* Appearance Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎨</span>
          <span>Appearance & Theme</span>
        </h2>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Easier on your eyes during late-night study sessions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => changeTheme(!darkMode)}
            className={`w-full sm:w-auto rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition active:scale-95 flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-amber-500 text-white hover:bg-amber-600 shadow"
                : "bg-slate-900 text-white hover:bg-slate-800 shadow"
            }`}
          >
            <span>{darkMode ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}</span>
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>ℹ️</span>
          <span>System & Deployment Info</span>
        </h2>

        <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <span className="font-medium text-slate-500 dark:text-slate-400">Environment</span>
            <span className="font-semibold text-green-600 dark:text-green-400">Production (Cloud)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <span className="font-medium text-slate-500 dark:text-slate-400">Database Engine</span>
            <span className="font-semibold">Supabase PostgreSQL</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <span className="font-medium text-slate-500 dark:text-slate-400">Platform</span>
            <span className="font-semibold">Vercel Edge & Serverless</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-slate-500 dark:text-slate-400">Mobile Optimization</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">Enabled (Responsive UI)</span>
          </div>
        </div>
      </div>
    </div>
  );
}