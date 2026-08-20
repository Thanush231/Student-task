"use client";

import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  onDelete,
  onComplete,
  onEdit,
  readOnly = false,
}) {
  if (!tasks.length) {
    return <p>No Completed Tasks</p>;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
          due_date={task.due_date}
          onDelete={() => onDelete?.(task.id)}
          onComplete={() => onComplete?.(task)}
          onEdit={() => onEdit?.(task)}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}