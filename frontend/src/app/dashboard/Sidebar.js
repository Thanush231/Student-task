import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        Task Manager
      </h2>

      <nav className="space-y-3">

        <Link
          href="/dashboard"
          className="block px-3 py-2 rounded hover:bg-blue-800"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/tasks"
          className="block px-3 py-2 rounded hover:bg-blue-800"
        >
          Tasks
        </Link>

        <Link
          href="/dashboard/completed"
          className="block px-3 py-2 rounded hover:bg-blue-800"
        >
          Completed
        </Link>

        <Link
          href="/dashboard/profile"
          className="block px-3 py-2 rounded hover:bg-blue-800"
        >
          Profile
        </Link>

        <Link
          href="/dashboard/settings"
          className="block px-3 py-2 rounded hover:bg-blue-800"
        >
          Settings
        </Link>

      </nav>
    </aside>
  );
}