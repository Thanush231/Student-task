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

  // Priority color styling
  const priorityColors = {
    High: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  };

  const isCompleted = status === "Completed";

  return (
    <>
      <div className={`rounded-2xl border bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all ${
        isCompleted
          ? "border-green-200 dark:border-green-900/50 bg-green-50/20 dark:bg-slate-800/80"
          : "border-slate-200 dark:border-slate-700"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h2 className={`text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white ${
            isCompleted ? "line-through text-slate-500 dark:text-slate-400" : ""
          }`}>
            {title}
          </h2>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                priorityColors[priority] || priorityColors.Medium
              }`}
            >
              ⚡ {priority || "Medium"}
            </span>

            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                isCompleted
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800"
              }`}
            >
              {isCompleted ? "✓ Done" : "⏳ Pending"}
            </span>
          </div>
        </div>

        {description && (
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed break-words">
            {description}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span>📅</span>
            <span>Due: {formatDueDate(due_date)}</span>
          </div>

          {!readOnly && (
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                type="button"
                onClick={handleComplete}
                className={`flex-1 sm:flex-initial rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition active:scale-95 flex items-center justify-center gap-1.5 ${
                  isCompleted
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                }`}
              >
                <span>{isCompleted ? "↩️ Undo" : "✅ Complete"}</span>
              </button>

              <button
                type="button"
                onClick={onEdit}
                className="flex-1 sm:flex-initial rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 px-3.5 py-2 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>✏️ Edit</span>
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="flex-1 sm:flex-initial rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 px-3.5 py-2 text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>🗑️ Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showMessage && (
        <div className="fixed bottom-20 right-4 sm:top-6 sm:right-6 sm:bottom-auto z-50 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-xl flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>Task updated!</span>
        </div>
      )}
    </>
  );
}