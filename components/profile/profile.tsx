"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { ProfileProps } from "@/types/profile/user";

export default function profile({ user }: ProfileProps) {
  const formatted = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2">
      {/* banner */}
      <div className="relative h-40 bg-gray-600">
        <Image
          src={"/image/banner2.jpg"}
          alt="banner"
          fill
          className=" object-cover object-[50%_25%]"
        />
      </div>
      {/* profile section */}
      <div className="flex">
        <div className="relative w-[70%] px-4 ">
          {/* avatar */}
          <div className="w-24 h-24 -mt-10 flex centerXY rounded-full border-4 border-primary bg-gray-700 overflow-hidden">
            <Camera color="gray" />
          </div>

          {/* text info */}
          <div className="mt-10">
            <h2 className="text-xl font-bold">{user.display_name}</h2>
            <p className="text-gray-400">{user.username}</p>

            <p className="text-gray-400 text-sm mt-2">Joined {formatted}</p>

            {/* Stats */}
            <div className="flex gap-4 mt-2 text-sm">
              <span>
                <span className="font-bold text-primary">100</span>{" "}
                <span className="text-gray-400">Following</span>
              </span>
              <span>
                <span className="font-bold text-primary">1</span>{" "}
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
            onClick={() => console.log("call hook")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
