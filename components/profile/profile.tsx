"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { ProfileProps } from "@/types/profile/user";
import profileTool from "@/hooks/profileTools";
import EditProfileForm from "../form/edit-profile-form";

export default function profile({ user, follows }: ProfileProps) {
  const tool = profileTool();
  const formatted = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const mockUser = {
    username: "azi_dev",
    display_name: "Azi",
    avatar_url: "/image/azi.png",
    banner_url: "/image/banner2.jpg",
    bio: "I build stuff with Next.js and Supabase 🚀",
  };

  return (
    <div className="flex flex-col gap-2">
      {/* banner */}
      <div className="relative h-40 bg-gray-600">
        {user.banner_url && (
          <Image
            src={"/image/banner2.jpg"}
            alt="banner"
            fill
            className=" object-cover object-[50%_25%]"
          />
        )}
      </div>
      {/* profile section */}
      <div className="flex">
        <div className="relative w-[70%] px-4 ">
          {/* avatar */}
          <div className="w-24 h-24 -mt-10 flex centerXY rounded-full border-4 border-primary bg-gray-700 overflow-hidden cursor-pointer">
            {!user.avatar_url ? (
              <Camera color="gray" onClick={tool.changeEditProfileStatus} />
            ) : (
              <Image
                src={user.avatar_url}
                alt="avatar"
                width={100}
                height={100}
                className="w-30 h-30 object-contain"
              />
            )}
          </div>

          {/* text info */}
          <div className="mt-10">
            <h2 className="text-xl font-bold">{user.display_name}</h2>
            <p className="text-gray-400">{user.username}</p>

            <p className="text-gray-400 text-sm mt-2">Joined {formatted}</p>

            {/* Stats */}
            <div className="flex gap-4 mt-2 text-sm">
              <span>
                <span className="font-bold text-primary">
                  {follows.following}
                </span>{" "}
                <span className="text-gray-400">Following</span>
              </span>
              <span>
                <span className="font-bold text-primary">
                  {follows.follower}
                </span>{" "}
                <span className="text-gray-400">Follower</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex justify-start px-4">
          <Button
            variant={"outline"}
            size={"lg"}
            className="rounded-full border border-primary"
            onClick={tool.changeEditProfileStatus}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* FORM */}
      {tool.openEditProfileForm && (
        <div className="fixed inset-0 z-50 flex centerXY bg-red-400/5">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={tool.changeEditProfileStatus} // click outside to close
          />

          {/* MODAL CONTENT */}
          <div className="relative z-10 w-full max-w-2xl mr-24">
            <EditProfileForm {...mockUser} tool={tool} />
          </div>
        </div>
      )}
    </div>
  );
}
