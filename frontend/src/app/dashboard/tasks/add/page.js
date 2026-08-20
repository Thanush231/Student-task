import TaskForm from "../../../components/task/TaskForm";

export default function AddTaskPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">
        Add New Task
      </h1>

      <p className="mt-2 text-gray-600">
        Create a new task.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <TaskForm />
      </div>
    </div>
  );
}