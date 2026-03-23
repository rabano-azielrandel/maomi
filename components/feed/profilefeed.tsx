"use client";

import profileTool from "@/hooks/profileTools";
import PostCard from "../feed/postcard";

export default function ProfileFeed({ posts }: { posts: any[] }) {
  return (
    <div className="flex flex-col relative">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
