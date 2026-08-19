import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p>No Tasks Available</p>;
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
        />
      ))}
    </div>
  );
}