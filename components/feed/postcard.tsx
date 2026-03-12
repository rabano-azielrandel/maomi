"use client";

import { usePostCardTool } from "@/hooks/postCardTools";
import { getPostCardActions } from "@/data/postcardData";
import { Post, PostActionName } from "@/types/feed/post-type";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PostCard({ post }: { post: Post }) {
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

  return (
    <div className="border-b px-4 py-3 hover:bg-muted/30 transition cursor-pointer">
      <div className="flex gap-3">
        {/* Avatar */}
        <Image
          src={post.profiles?.avatar_url ?? "/avatar.png"}
          alt="avatar"
          width={100}
          height={100}
          className="w-10 h-10 rounded-full object-cover bg-purple-400"
        />

        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">
              {post.profiles?.username ?? "Unknown"}
            </span>

            <span className="text-muted-foreground">
              @{post.profiles?.username ?? "user"}
            </span>

            <span className="text-muted-foreground">·</span>

            <span className="text-muted-foreground text-xs">
              {new Date(post.created_at).toLocaleTimeString()}
            </span>
          </div>

          {/* Text */}
          <p className="text-sm mt-1 whitespace-pre-wrap">{post.content}</p>

          {/* MEDIA */}
          {post.media && (
            <div className="mt-3 rounded-xl overflow-hidden border">
              {post.media.type === "image" && (
                <img
                  src={post.media.url}
                  className="w-full object-cover max-h-[400px]"
                />
              )}

              {post.media.type === "video" && (
                <video
                  controls
                  src={post.media.url}
                  className="w-full max-h-[400px]"
                />
              )}

              {post.media.type === "link" && (
                <div className="flex">
                  <img
                    src={post.media.thumbnail}
                    className="w-[120px] object-cover"
                  />

                  <div className="p-3 text-sm">
                    <p className="text-muted-foreground text-xs">
                      {post.media.site}
                    </p>

                    <p className="font-semibold line-clamp-2">
                      {post.media.title}
                    </p>

                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {post.media.description}
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
        </div>
      </div>
    </div>
  );
}
