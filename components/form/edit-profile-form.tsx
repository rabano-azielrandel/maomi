"use client";

import { useEffect, useState } from "react";
import { EditUser, UpdateUser } from "@/types/profile/user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = EditUser;

export default function EditProfileForm({
  username,
  display_name,
  avatar_url,
  banner_url,
  bio,
  tool,
}: Props) {
  // ---- Form state (controlled inputs) ----
  const [formUsername, setFormUsername] = useState(username ?? "");
  const [formDisplayName, setFormDisplayName] = useState(display_name ?? "");
  const [formBio, setFormBio] = useState(bio ?? "");

  // ---- Previews from your hook ----
  useEffect(() => {
    if (!tool.avatarPreview && avatar_url) {
      tool.initializeImages(avatar_url, banner_url);
    }
  }, []);

  // ---- Handle form submission ----
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 1️ Prepare UpdateUser object
      const updateData: UpdateUser = {
        username: formUsername || undefined,
        display_name: formDisplayName || undefined,
        bio: formBio || undefined,
        avatar_file: tool?.avatarFile, // optional File
        banner_file: tool?.bannerFile, // optional File
      };

      // Remove empty fields to avoid overwriting DB with null/empty
      Object.keys(updateData).forEach((key) => {
        const k = key as keyof UpdateUser;
        if (updateData[k] === undefined) delete updateData[k];
      });

      if (Object.keys(updateData).length === 0) {
        alert("No fields to update");
        return;
      }

      // 2️ Convert to FormData for fetch
      const form = new FormData();
      Object.entries(updateData).forEach(([key, value]) => {
        if (value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, value as string);
        }
      });

      // 3️ Send request to your route
      const res = await fetch("/api/update-profile", {
        method: "PATCH",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result?.error || "Update failed");

      console.log("Profile updated:", result);

      // 4️ Update previews after successful update
      if (result.avatar_url) tool.setAvatarPreview(result.avatar_url);
      if (result.banner_url) tool.setBannerPreview(result.banner_url);

      // 5️ Close the edit form
      tool.changeEditProfileStatus();
    } catch (error: any) {
      console.error("Update failed:", error.message);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between">
            <p>Edit Profile</p>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-6 w-6 flex centerXY p-4 rounded-full border border-primary"
              onClick={tool.changeEditProfileStatus}
            >
              ✕
            </Button>
          </CardTitle>
          <CardDescription>Update your information</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdate} className="flex flex-col gap-6">
            {/* USERNAME */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formUsername}
                onChange={(e) => setFormUsername(e.target.value)}
              />
            </div>

            {/* DISPLAY NAME */}
            <div className="grid gap-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                name="display_name"
                type="text"
                value={formDisplayName}
                onChange={(e) => setFormDisplayName(e.target.value)}
              />
            </div>

            {/* AVATAR */}
            <div className="grid gap-2">
              <Label htmlFor="avatar_file">Avatar</Label>
              <Input
                id="avatar_file"
                name="avatar_file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) tool.updateImage("avatar", file);
                }}
              />
              {tool.avatarPreview && (
                <div className="relative w-24 h-24 mt-2">
                  <img
                    src={tool.avatarPreview}
                    alt="avatar preview"
                    className="w-full h-full object-cover rounded-full border"
                  />
                  <button
                    type="button"
                    onClick={() => tool.removeImage("avatar")}
                    className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* BANNER */}
            <div className="grid gap-2">
              <Label htmlFor="banner_file">Banner</Label>
              <Input
                id="banner_file"
                name="banner_file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) tool.updateImage("banner", file);
                }}
              />
              {tool.bannerPreview && (
                <div className="relative w-full h-32 mt-2">
                  <img
                    src={tool.bannerPreview}
                    alt="banner preview"
                    className="w-full h-full object-cover object-[50%_25%] rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => tool.removeImage("banner")}
                    className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* BIO */}
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                className="min-h-[100px] rounded-md border p-2 text-sm"
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
