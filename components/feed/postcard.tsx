import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  Share,
} from "lucide-react";

type Media = {
  type: "image" | "video" | "link";
  url?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  site?: string;
};

type Post = {
  id: string;
  content: string;
  created_at: string;
  profiles?: {
    username?: string;
    avatar_url?: string;
  };
  media?: Media | null;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border-b px-4 py-3 hover:bg-muted/30 transition cursor-pointer">
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={post.profiles?.avatar_url ?? "/avatar.png"}
          className="w-10 h-10 rounded-full"
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
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle size={18} />
              <span>1</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Repeat2 size={18} />
              <span>4</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Heart size={18} />
              <span>6</span>
            </div>

            <BarChart2 size={18} />
            <Bookmark size={18} />
            <Share size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
