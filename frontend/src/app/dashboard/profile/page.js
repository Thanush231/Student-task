"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");

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

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile</h1>

      <p className="mt-2 text-gray-600">
        View your account details.
      </p>

      <div className="mt-6 max-w-xl rounded-xl bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-600">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <label className="mt-4 cursor-pointer rounded bg-blue-600 px-4 py-2 text-white">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <p className="mt-6 text-gray-500">Name</p>
        <p className="text-xl font-semibold">
          {user?.name || "User"}
        </p>

        <p className="mt-5 text-gray-500">Email</p>
        <p className="text-xl font-semibold">
          {user?.email || "No email available"}
        </p>
      </div>
    </div>
  );
}