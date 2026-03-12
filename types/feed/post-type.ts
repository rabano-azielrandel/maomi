type Media = {
  type: "image" | "video" | "link";
  url?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  site?: string;
};

export type Post = {
  id: string;
  content: string;
  created_at: string;
  profiles?: {
    username?: string;
    avatar_url?: string;
  };
  media?: Media | null;
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