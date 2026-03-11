import PostCard from "./postcard";

export default function PostFeed({ posts }: { posts: any[] }) {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
