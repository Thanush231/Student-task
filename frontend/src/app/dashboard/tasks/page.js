"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TaskList from "../../components/task/TaskList";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function authHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  async function loadTasks() {
    const response = await fetch(`${API_URL}/api/tasks`, {
      headers: authHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load tasks");
    }

    setTasks(data.tasks || []);
  }

  useEffect(() => {
    loadTasks()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
    window.location.href = `/dashboard/tasks/edit/${task.id}`;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="mt-2 text-gray-600">
            Manage your tasks here.
          </p>
        </div>

        <Link
          href="/dashboard/tasks/add"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Task
        </Link>
      </div>

      {loading && <p className="mt-6">Loading tasks...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-6">
          <TaskList
            tasks={tasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      )}
    </div>
  );
}