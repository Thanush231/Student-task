"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  useEffect(() => {
    async function loadTask() {
      try {
        const response = await fetch(`${API_URL}/api/tasks`, {
          headers: headers(),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load tasks");
        }

        const task = (data.tasks || []).find(
          (item) => String(item.id) === String(id)
        );

        if (!task) {
          throw new Error("Task not found");
        }

        setForm({
          title: task.title || "",
          description: task.description || "",
          priority: task.priority || "Medium",
          due_date: task.due_date
            ? String(task.due_date).slice(0, 10)
            : "",
          status: task.status || "Pending",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadTask();
    }
  }, [id]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      router.push("/dashboard/tasks");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading task...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Edit Task</h1>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-md"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full rounded border p-3"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full rounded border p-3"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded bg-blue-600 p-3 text-white"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}