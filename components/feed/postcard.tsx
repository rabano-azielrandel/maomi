"use client";

import { usePostCardTool } from "@/hooks/postCardTools";
import { getPostCardActions } from "@/data/postcardData";
import { PostCards, PostActionName } from "@/types/feed/post-type";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import Image from "next/image";

// in the post pass the POST, and User Details such as username, email, and avatar
export default function PostCard({ post }: { post: PostCards }) {
  const card = usePostCardTool();
  const postcardIcons = getPostCardActions(card);

  const hoverColors = {
    comment: "group-hover:text-blue-400",
    repost: "group-hover:text-green-700",
    like: "group-hover:text-red-400",
    bookmark: "group-hover:text-blue-700",
    share: "group-hover:text-gray-700",
  };

  const activeColors: Partial<Record<PostActionName, string>> = {
    repost: card.isRepost ? "text-green-700" : "",
    like: card.isLike ? "text-red-400" : "",
    bookmark: card.isBookmark ? "text-blue-700" : "",
  };

  console.log("POST DATA", post);
  return (
    <div className="border-b px-4 py-3 hover:bg-muted/30 transition cursor-pointer">
      <div className="flex gap-3">
        {/* Avatar */}
        <Image
          src={post.avatar_url ?? "/image/avatar.jpg"}
          alt="avatar"
          width={100}
          height={100}
          className="w-10 h-10 rounded-full object-cover bg-purple-400"
        />

        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{post.username ?? "Unknown"}</span>

            <span className="text-muted-foreground">
              {post.display_name ?? "user"}
            </span>

            <span className="text-muted-foreground">·</span>

            <span className="text-muted-foreground text-xs">
              {new Date(post.created_at).toLocaleTimeString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>

          {/* Text */}
          <p className="text-sm mt-1 whitespace-pre-wrap">{post.content}</p>

          {/* MEDIA */}
          {post.media && (
            <div className="mt-3 rounded-xl overflow-hidden border">
              {/* IMAGE */}
              {post.media.type === "image" && (
                <img
                  src={post.media.url}
                  className="w-full object-cover max-h-[400px]"
                  alt="post media"
                />
              )}

              {/* VIDEO */}
              {post.media.type === "video" && (
                <video
                  controls
                  src={post.media.url}
                  className="w-full max-h-[400px]"
                />
              )}

              {/* LINK */}
              {post.media.type === "link" && (
                <div className="flex">
                  <img
                    src={post.media.url}
                    className="w-[120px] object-cover"
                    alt="link preview"
                  />

                  <div className="p-3 text-sm">
                    <p className="text-muted-foreground text-xs">
                      {post.content} {/* replace later */}
                    </p>

                    <p className="font-semibold line-clamp-2">{post.content}</p>

                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {post.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-between mt-3 text-muted-foreground max-w-md">
            {postcardIcons.map(({ name, icon: Icon, action, count }) => (
              <div key={name} className="flex centerXY gap-1 group">
                <Icon
                  size={18}
                  onClick={action}
                  className={cn(
                    "cursor-pointer transition",
                    hoverColors[name],
                    activeColors[name],
                  )}
                />

                <span
                  onClick={action}
                  className={cn(
                    "text-sm transition",
                    hoverColors[name],
                    activeColors[name],
                  )}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* COMMENT SECTION */}
          {card.showComment && (
            <div className="mt-3 border-t pt-3">
              <div className="flex gap-2 items-start">
                {/* Avatar */}
                <Image
                  src={"/image/azi.png"}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />

                {/* Input */}
                <div className="flex flex-1 items-center gap-2 border rounded-full px-3 py-1">
                  <input
                    value={card.comment}
                    onChange={(e) => card.setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />

                  {/* Send Icon */}
                  <Send
                    size={18}
                    onClick={() => card.sendComment()}
                    className={cn(
                      "cursor-pointer transition",
                      card.comment.trim()
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-muted-foreground cursor-not-allowed",
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
