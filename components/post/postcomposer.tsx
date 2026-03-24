"use client";

import { HtmlHTMLAttributes, useRef } from "react";
import { Button } from "../ui/button";
import { getComposerAction } from "@/data/postcomposerData";
import { usePostComposer } from "@/hooks/userPostComposer";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import for emoji-picker-react (client only)
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

export default function PostComposer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composer = usePostComposer();
  const toolbarIcons = getComposerAction(composer);

  const handleSubmit = async () => {
    try {
      if (!composer.text && composer.images.length === 0) return;

      const formData = new FormData();

      formData.append("content", composer.text);

      composer.images.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/insert-post", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to post");

      composer.setText("");
      composer.setImages([]);
      composer.setShowEmoji(false);
    } catch (error: any) {
      console.log(error.message ?? "Post Failed");
    }
  };

  return (
    <div className="flex gap-3 p-4 rounded-xl text-white w-full">
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
          ref={composer.textareaRef}
          placeholder="What's happening?"
          value={composer.text}
          onChange={composer.handleTextChange}
          rows={1}
          spellCheck={false}
          className="w-full bg-transparent outline-none resize-none overflow-hidden text-lg text-primary placeholder-gray-500"
        />

        {/* file preview */}
        {composer.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {composer.images.map((file, index) => {
              const url = URL.createObjectURL(file);

              return (
                <div key={index} className="relative group">
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      composer.removeImage(index);
                    }}
                    className="absolute top-2 right-2 z-20 bg-black/70 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-black"
                  >
                    ✕
                  </button>

                  {/* Media container */}
                  <div className="overflow-hidden rounded-lg">
                    {file.type.startsWith("video") ? (
                      <video
                        src={url}
                        controls
                        className="w-full max-h-[300px] object-cover"
                      />
                    ) : (
                      <Image
                        src={url}
                        alt="preview"
                        width={500}
                        height={500}
                        className="w-full max-h-[300px] object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* poll */}
        {composer.showPoll && (
          <div className="mt-3 p-3 border rounded-lg text-primary">
            <input
              type="text"
              placeholder="Poll option 1"
              className="w-full mb-2 p-2 bg-transparent border rounded"
            />
            <input
              type="text"
              placeholder="Poll option 2"
              className="w-full mb-2 p-2 bg-transparent border rounded"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          {/* Icons */}
          <div className="flex items-center gap-4 text-blue-500 relative">
            {toolbarIcons.map(({ name, icon: Icon, action }) => (
              <Icon
                key={name}
                size={20}
                onClick={action}
                className="cursor-pointer hover:text-blue-400"
              />
            ))}

            {/* Emoji Picker */}
            {composer.showEmoji && (
              <div className="absolute -bottom-[460px] left-0 z-50">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    composer.addEmoji(emojiData.emoji);
                    composer.setShowEmoji(false);
                  }}
                />
              </div>
            )}

            {/* Hidden file input for image uploads */}
            <input
              ref={fileInputRef}
              type="file"
              id="fileUpload"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (!e.target.files) return;

                const files = Array.from(e.target.files);

                composer.setImages((prev) => [...prev, ...files]);

                e.target.value = "";
              }}
            />
          </div>

          {/* Post Button */}
          <Button
            onClick={handleSubmit}
            asChild
            size="sm"
            variant={"default"}
            className="h-9 rounded-3xl cursor-pointer"
          >
            <p>POST</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
