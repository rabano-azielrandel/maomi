"use server";

import PostFeed from "@/components/feed/postfeed";
import { getPosts } from "@/lib/services/postService";

export default async function PostFeedWrapper() {
  const posts = await getPosts();

  return <PostFeed posts={posts} />;
}
