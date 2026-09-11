"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Student");
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUserName(savedUser?.name || "Student");

    async function fetchStats() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/tasks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const tasks = data.tasks || [];
          const completed = tasks.filter((t) => t.status === "Completed").length;
          setStats({
            total: tasks.length,
            pending: tasks.length - completed,
            completed: completed,
          });
        }
      } catch (e) {
        console.error("Could not fetch dashboard stats", e);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 p-6 sm:p-10 md:p-14 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-200">
            Student Dashboard
          </p>

          <h1 className="mt-1 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Hello, {userName}! 👋
          </h1>

          <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
            Stay organized, manage your deadlines, and accomplish your goals
            one task at a time.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/tasks/add"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-md hover:bg-blue-50 transition active:scale-95 flex items-center gap-2"
            >
              <span>➕</span>
              <span>Create Task</span>
            </Link>

            <Link
              href="/dashboard/tasks"
              className="rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/30 transition active:scale-95 flex items-center gap-2"
            >
              <span>📝</span>
              <span>View Tasks</span>
            </Link>
          </div>
        </div>

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* Real-time Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
            📋
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Tasks</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "..." : stats.total}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl">
            ⏳
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "..." : stats.pending}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center text-2xl">
            ✅
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loading ? "..." : stats.completed}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/tasks"
          className="group rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition active:scale-98"
        >
          <div className="text-3xl">📝</div>
          <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
            Manage Tasks
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            View, edit, prioritize and organize all your coursework and assignments.
          </p>
        </Link>

        <Link
          href="/dashboard/completed"
          className="group rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition active:scale-98"
        >
          <div className="text-3xl">🎯</div>
          <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
            Completed Archive
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Review your finished accomplishments and track your productivity streaks.
          </p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="group rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition active:scale-98"
        >
          <div className="text-3xl">👤</div>
          <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
            Student Profile
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Manage your account credentials, avatar picture, and settings.
          </p>
        </Link>
      </div>
    </div>
  );
}