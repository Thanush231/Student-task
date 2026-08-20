"use client";

import { useEffect, useState } from "react";
import TaskList from "../../components/task/TaskList";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState([]);
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

  return (
    <div>
      <h1 className="text-3xl font-bold">Completed Tasks</h1>

      <p className="mt-2 text-gray-600">
        View your completed tasks here.
      </p>

      {loading && <p className="mt-6">Loading completed tasks...</p>}

      {error && <p className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-6">
          <TaskList tasks={tasks} readOnly />
        </div>
      )}
    </div>
  );
}