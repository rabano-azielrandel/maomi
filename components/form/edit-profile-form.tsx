"use client";

import { User } from "@/types/profile/user";
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
import Link from "next/link";

export default function EditProfileForm({
  username,
  display_name,
  avatar_url,
  banner_url,
  bio,
}: User) {
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Event object:", e); // Logs the full synthetic event
    console.log("Form data:", new FormData(e.currentTarget)); // Logs form values
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-6">
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

              <div className="grid gap-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  type="text"
                  value={display_name ?? ""}
                  onChange={(e) => console.log("display_name", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="avatar_url">Avatar</Label>
                <Input
                  id="avatar_url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("avatar file:", file);
                    }
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="banner_url">Banner</Label>
                <Input
                  id="banner_url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("banner file:", file);
                    }
                  }}
                />
              </div>

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
