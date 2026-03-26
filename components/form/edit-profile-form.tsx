"use client";

import { useEffect } from "react";
import { EditUser } from "@/types/profile/user";
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

export default function EditProfileForm({
  username,
  display_name,
  avatar_url,
  banner_url,
  bio,
  tool,
}: EditUser) {
  // Initialize previews from existing URLs
  useEffect(() => {
    if (!tool.avatarPreview && avatar_url) {
      tool.initializeImages(avatar_url, banner_url);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // append files from hook
    if (tool.avatarFile) {
      formData.append("avatar", tool.avatarFile);
    }

    if (tool.bannerFile) {
      formData.append("banner", tool.bannerFile);
    }

    console.log("FINAL FORM DATA:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
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
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-6">
              {/* USERNAME */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username ?? ""}
                  onChange={(e) => console.log("username", e.target.value)}
                />
              </div>

              {/* DISPLAY NAME */}
              <div className="grid gap-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  type="text"
                  value={display_name ?? ""}
                  onChange={(e) => console.log("display_name", e.target.value)}
                />
              </div>

              {/* AVATAR */}
              <div className="grid gap-2">
                <Label htmlFor="avatar_url">Avatar</Label>

                <Input
                  id="avatar_url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      tool.updateImage("avatar", file);
                    }
                  }}
                />

                {/* PREVIEW */}
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
                <Label htmlFor="banner_url">Banner</Label>

                <Input
                  id="banner_url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      tool.updateImage("banner", file);
                    }
                  }}
                />

                {/* PREVIEW */}
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
                  className="min-h-[100px] rounded-md border p-2 text-sm"
                  value={bio ?? ""}
                  onChange={(e) => console.log("bio", e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
