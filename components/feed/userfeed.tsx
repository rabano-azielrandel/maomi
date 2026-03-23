import PostCard from "../feed/postcard";

export default function userfeed({ posts }: { posts: any[] }) {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
