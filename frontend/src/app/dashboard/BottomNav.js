"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: "📊" },
    { href: "/dashboard/tasks", label: "Tasks", icon: "📝" },
    { href: "/dashboard/tasks/add", label: "Add", icon: "➕" },
    { href: "/dashboard/completed", label: "Done", icon: "✅" },
    { href: "/dashboard/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 dark:bg-slate-900/95 dark:border-slate-800 md:hidden transition-colors">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-colors active:scale-90 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[11px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
