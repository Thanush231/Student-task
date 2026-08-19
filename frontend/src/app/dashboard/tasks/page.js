import Link from "next/link";
import TaskList from "../../components/task/TaskList";

export default function TasksPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Tasks
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your tasks here.
          </p>
        </div>

        <Link
          href="/dashboard/tasks/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </Link>
      </div>

      <div className="mt-6">
        <TaskList tasks={[]} />
      </div>
    </div>
  );
}