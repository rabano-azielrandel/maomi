export type Post = {
  id: string;
  user_id: string;
  content: string | null;
  like_count: number;
  reply_count: number;
  repost_count: number;
  created_at: string;
};

export type Media = {
  id: string;
  post_id: string;
  url: string;
  media_type: "image" | "video";
  width?: number;
  height?: number;
  created_at: string;
  user_id: string;
};

export type MediaItem = {
  type: "image" | "video" | "link";
  url: string;
};

export type PostCards = {
  id: string;
  content: string;
  created_at: string;

  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  media: MediaItem | null;

  like_count?: number;
  reply_count?: number;
  repost_count?: number;
};

export type CreatePostInput = {
  userId: string;
  content?: string;

  // server-side file object
  files?: {
    buffer: ArrayBuffer;
    name: string;
    type: string;
  }[];
};

export type PostActionName =
  | "comment"
  | "repost"
  | "like"
  | "bookmark"
  | "share";

export type PostActionPlugin = {
    name: PostActionName;
    icon: any;
    action: () => void;
    count?: number;
}