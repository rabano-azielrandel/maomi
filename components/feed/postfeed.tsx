import PostCard from "./postcard";
import { PostCards } from "@/types/feed/post-type";

export default function PostFeed({ posts }: { posts: PostCards[] }) {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
