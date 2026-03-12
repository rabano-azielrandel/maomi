import { MessageCircle, Repeat2, Heart, Bookmark, Share } from "lucide-react";

import { PostActionPlugin } from "@/types/feed/post-type";

export const getPostCardActions = (card: any): PostActionPlugin[] => [
  {
    name: "comment",
    icon: MessageCircle,
    count: 1,
    action: () => card.toggleComment(),
  },
  {
    name: "repost",
    icon: Repeat2,
    count: 4,
    action: () => card.toggleRepost(),
  },
  {
    name: "like",
    icon: Heart,
    count: 6,
    action: () => card.toggleLike(),
  },
  {
    name: "bookmark",
    icon: Bookmark,
    action: () => card.toggleBookmark(),
  },
  {
    name: "share",
    icon: Share,
    action: () => console.log('post.share'),
  },
];