import { MessageCircle, Repeat2, Heart, Bookmark, Share } from "lucide-react";

import { PostActionPlugin } from "@/types/feed/post-type";

export const getPostCardActions = (post?: any): PostActionPlugin[] => [
  {
    name: "comment",
    icon: MessageCircle,
    count: 1,
    action: () => console.log('post.displayComment'),
  },
  {
    name: "repost",
    icon: Repeat2,
    count: 4,
    action: () => console.log('post.repost'),
  },
  {
    name: "like",
    icon: Heart,
    count: 6,
    action: () => console.log('post.toggleLike'),
  },
  {
    name: "bookmark",
    icon: Bookmark,
    action: () => console.log('post.toggleBookmark'),
  },
  {
    name: "share",
    icon: Share,
    action: () => console.log('post.share'),
  },
];