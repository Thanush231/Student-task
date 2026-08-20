"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUserName(savedUser?.name || "User");
  }, []);

  return (
    <div className="min-h-[70vh]">
      <section className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 px-8 py-16 text-white shadow-xl md:px-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-3 text-lg text-blue-100">Welcome back</p>

          <h1 className="text-4xl font-bold md:text-6xl">
            Hello, {userName}! 👋
          </h1>

          <p className="mt-5 text-lg text-blue-100">
            Stay organized, manage your tasks, and accomplish your goals
            one step at a time.
          </p>
        </div>

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 right-20 h-96 w-96 rounded-full bg-white/10" />

        <div className="absolute bottom-8 right-10 hidden text-[150px] opacity-90 lg:block">
          ✅
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="text-3xl">📝</div>
          <h2 className="mt-3 text-xl font-semibold">Organize Tasks</h2>
          <p className="mt-2 text-gray-600">
            Keep all your important tasks in one place.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="text-3xl">🎯</div>
          <h2 className="mt-3 text-xl font-semibold">Stay Focused</h2>
          <p className="mt-2 text-gray-600">
            Prioritize your work and focus on what matters.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="text-3xl">🚀</div>
          <h2 className="mt-3 text-xl font-semibold">Reach Your Goals</h2>
          <p className="mt-2 text-gray-600">
            Complete your tasks and make progress every day.
          </p>
        </div>
      </div>
    </div>
  );
}