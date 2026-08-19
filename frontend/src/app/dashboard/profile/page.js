"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handlePhotoChange(event) {
    const file = event.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      name,
      email,
      photo,
    });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">
        Profile
      </h1>

      <p className="mt-2 text-gray-600">
        Manage your profile information.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {photo ? (
                <img
                  src={photo}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">
                  No Photo
                </span>
              )}
            </div>

            <label className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Choose Photo

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}