"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePhoto");
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}