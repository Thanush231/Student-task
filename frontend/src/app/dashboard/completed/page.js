"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TaskList from "../../components/task/TaskList";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompletedTasks() {
      try {
        const response = await fetch(`${API_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load tasks");
        }

        setTasks(
          (data.tasks || []).filter(
            (task) => task.status === "Completed"
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCompletedTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ✅ Completed Archive
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and review your finished student accomplishments ({tasks.length}).
          </p>
        </div>

        <Link
          href="/dashboard/tasks"
          className="w-full sm:w-auto text-center rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
        >
          ← Back to Tasks
        </Link>
      </div>

      {tasks.length > 0 && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search completed tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium">Loading completed tasks...</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && filteredTasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8 sm:p-12 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {search ? "No matching completed tasks" : "No completed tasks yet"}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search
              ? "Try searching for a different keyword."
              : "When you mark tasks as done on your task list, they will appear here."}
          </p>
        </div>
      )}

      {!loading && !error && filteredTasks.length > 0 && (
        <TaskList tasks={filteredTasks} readOnly />
      )}
    </div>
  );
}