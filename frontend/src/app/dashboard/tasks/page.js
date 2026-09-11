"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaskList from "../../components/task/TaskList";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function authHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  async function loadTasks() {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        headers: authHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load tasks");
      }

      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function completeTask(task) {
    try {
      const status =
        task.status === "Completed" ? "Pending" : "Completed";

      const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === task.id ? data.task : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function editTask(task) {
    router.push(`/dashboard/tasks/edit/${task.id}`);
  }

  // Filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "pending"
        ? task.status === "Pending"
        : task.status === "Completed";

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Organize and track your student assignments and deadlines.
          </p>
        </div>

        <Link
          href="/dashboard/tasks/add"
          className="w-full sm:w-auto text-center rounded-xl bg-blue-600 px-5 py-2.5 font-bold text-white shadow hover:bg-blue-700 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <span>➕</span>
          <span>Add Task</span>
        </Link>
      </div>

      {/* Mobile Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
              filter === "all"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            All ({tasks.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
              filter === "pending"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Pending
          </button>

          <button
            type="button"
            onClick={() => setFilter("completed")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
              filter === "completed"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Done
          </button>
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium">Loading your tasks...</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && filteredTasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8 sm:p-12 text-center">
          <div className="text-4xl mb-3">📝</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {search ? "No matching tasks found" : "No tasks in this list"}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {search
              ? "Try searching for a different keyword or clear your filter."
              : "Create a new task to keep track of your coursework."}
          </p>
          {!search && (
            <Link
              href="/dashboard/tasks/add"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition active:scale-95"
            >
              <span>➕ Add Your First Task</span>
            </Link>
          )}
        </div>
      )}

      {!loading && !error && filteredTasks.length > 0 && (
        <TaskList
          tasks={filteredTasks}
          onComplete={completeTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      )}
    </div>
  );
}