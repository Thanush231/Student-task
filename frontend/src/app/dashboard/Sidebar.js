"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen = false, onClose }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/tasks", label: "My Tasks", icon: "📝" },
    { href: "/dashboard/tasks/add", label: "Add Task", icon: "➕" },
    { href: "/dashboard/completed", label: "Completed", icon: "✅" },
    { href: "/dashboard/profile", label: "Profile", icon: "👤" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-800 to-indigo-900 text-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="text-2xl font-black tracking-tight flex items-center gap-2 hover:opacity-90 transition"
          >
            <span>📋</span>
            <span>Task Manager</span>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition active:scale-98 ${
                  isActive
                    ? "bg-white/20 text-white shadow-inner font-semibold"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info in Sidebar */}
      <div className="pt-6 border-t border-white/10 text-xs text-blue-200">
        <p className="font-medium">Student Task Manager</p>
        <p className="text-blue-300/70 mt-0.5">v1.0 • Connected to Cloud</p>
      </div>
    </aside>
  );
}