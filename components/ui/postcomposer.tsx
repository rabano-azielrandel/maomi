"use client";

import {
  Image as ImageIcon,
  Smile,
  Calendar,
  MapPin,
  BarChart2,
} from "lucide-react";

import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

const toolbarIcons = [
  {
    name: "image",
    icon: ImageIcon,
    action: () => document.getElementById("imageUpload")?.click(),
  },
  {
    name: "poll",
    icon: BarChart2,
    action: () => console.log("Open poll creator"),
  },
  {
    name: "emoji",
    icon: Smile,
    action: () => console.log("Open emoji picker"),
  },
  {
    name: "schedule",
    icon: Calendar,
    action: () => console.log("Open scheduler"),
  },
  {
    name: "location",
    icon: MapPin,
    action: () => console.log("Add location"),
  },
];

export default function PostComposer() {
  return (
    <div className="flex gap-3 p-4 rounded-xl  text-white w-full ">
      {/* Avatar */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 font-bold">
        <Image
          src={"/image/logo.png"}
          alt="user"
          width={100}
          height={100}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* Textarea */}
        <textarea
          placeholder="What's happening?"
          className="w-full bg-transparent outline-none resize-none text-lg placeholder-gray-500"
          rows={2}
        />

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          {/* Icons */}
          <div className="flex items-center gap-4 text-blue-500">
            {toolbarIcons.map(({ name, icon: Icon, action }) => (
              <Icon
                key={name}
                size={20}
                onClick={action}
                className="cursor-pointer hover:text-blue-400"
              />
            ))}

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
            />
          </div>

          {/* Post Button */}
          <Button
            asChild
            size="sm"
            variant={"default"}
            className="h-9 rounded-3xl"
          >
            <Link href="#">POST</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
