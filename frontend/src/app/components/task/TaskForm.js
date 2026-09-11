"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TaskForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      router.push("/dashboard/tasks");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          📝 Task Title *
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Study for Physics Midterm"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          📄 Description (Optional)
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter details, requirements, or reference links..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            ⚡ Priority
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            📅 Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3 text-xs sm:text-sm text-red-600 dark:text-red-400">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:flex-1 rounded-xl bg-blue-600 p-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving Task...</span>
            </>
          ) : (
            <span>➕ Create Task</span>
          )}
        </button>

        <Link
          href="/dashboard/tasks"
          className="w-full sm:w-auto text-center rounded-xl bg-slate-100 dark:bg-slate-700/60 p-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}