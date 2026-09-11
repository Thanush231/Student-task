"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    setUser(savedUser);

    const userKey = savedUser?.id || savedUser?.email;

    if (userKey) {
      setPhoto(
        localStorage.getItem(`profilePhoto_${userKey}`) || ""
      );
    }
  }, []);

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    const userKey = user?.id || user?.email;

    if (!file || !userKey) return;

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;
      setPhoto(image);
      localStorage.setItem(
        `profilePhoto_${userKey}`,
        image
      );
    };

    reader.readAsDataURL(file);
  }

  function handleCopyEmail() {
    if (user?.email) {
      navigator.clipboard?.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          👤 Student Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal details and account preferences.
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-700">
          <div className="relative group">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover shadow-md border-4 border-white dark:border-slate-700 ring-2 ring-blue-500/30"
              />
            ) : (
              <div className="flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-4xl sm:text-5xl font-black text-white shadow-md border-4 border-white dark:border-slate-700">
                {user?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
            )}

            <label className="mt-4 inline-flex items-center gap-2 cursor-pointer rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/60 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition active:scale-95">
              <span>📷</span>
              <span>Change Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {user?.name || "Student User"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Student Account • Active
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Full Name
            </p>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {user?.name || "Not specified"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </p>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-1 break-all">
                {user?.email || "No email available"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-2 text-slate-400 hover:text-blue-600 transition"
              title="Copy Email"
            >
              {copied ? "✓" : "📋"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}