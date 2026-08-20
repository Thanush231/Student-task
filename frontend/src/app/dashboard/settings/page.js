"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const enabled = savedTheme === "dark";

    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function changeTheme(enabled) {
    setDarkMode(enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
    document.documentElement.classList.toggle("dark", enabled);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold dark:text-white">Settings</h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Manage your application settings.
      </p>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold dark:text-white">
          Appearance
        </h2>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="font-medium dark:text-white">Dark mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Switch between light and dark themes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => changeTheme(!darkMode)}
            className={`rounded-lg px-4 py-2 text-white ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}