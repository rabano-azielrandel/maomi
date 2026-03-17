"use client";

import { useState } from "react";
import { ProfileProps } from "@/types/profile/user";

export default function Profile({ user, onUpdate }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || "",
    displayName: user.displayName || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img
          src={formData.avatar || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          {isEditing ? (
            <input
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="text-xl font-semibold border-b outline-none"
            />
          ) : (
            <h2 className="text-xl font-semibold">{formData.displayName}</h2>
          )}

          {isEditing ? (
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-sm text-gray-500 border-b outline-none"
            />
          ) : (
            <p className="text-sm text-gray-500">@{formData.username}</p>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 outline-none"
          />

          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            className="w-full border rounded-lg p-2 outline-none"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mt-4">
            <p className="text-gray-700">{formData.bio}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
}
