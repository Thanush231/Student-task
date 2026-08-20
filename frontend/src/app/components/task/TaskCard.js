"use client";

import { useState } from "react";

function formatDueDate(dateValue) {
  if (!dateValue) return "No due date";

  const [year, month, day] = String(dateValue).slice(0, 10).split("-");
  return `${day}-${month}-${year}`;
}

export default function TaskCard({
  title,
  description,
  status,
  priority,
  due_date,
  onDelete,
  onComplete,
  onEdit,
  readOnly = false,
}) {
  const [showMessage, setShowMessage] = useState(false);

  function handleComplete() {
    onComplete?.();
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  return (
    <>
      <div className="rounded-xl border bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {status}
          </span>
        </div>

        <p className="mt-3 text-gray-600">
          {description || "No description"}
        </p>

        <p className="mt-4 text-gray-700">
          <strong>Priority:</strong> {priority}
        </p>

        <p className="mt-2 text-gray-700">
          <strong>Due date:</strong> {formatDueDate(due_date)}
        </p>

        {!readOnly && (
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={handleComplete}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              {status === "Completed" ? "Undo" : "Complete"}
            </button>

            <button
              type="button"
              onClick={onEdit}
              className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {showMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ Task completed!
        </div>
      )}
    </>
  );
}