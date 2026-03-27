import { Post } from "@/types/feed/post-type";

export const samplePosts = [
  {
    id: "1",
    content: "Just finished building my maomi feed with Next.js 🚀",
    created_at: "2026-03-11T10:30:00Z",
    profiles: {
      username: "azi",
      avatar_url: "/image/azi.png",
    },
    media: null,
  },

  {
    id: "2",
    content: "Beautiful sunset today 🌅",
    created_at: "2026-03-11T09:10:00Z",
    profiles: {
      username: "traveler",
      avatar_url: "/image/azi.png",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b",
    },
  },

  {
    id: "3",
    content: "Working on a new React animation demo",
    created_at: "2026-03-11T08:00:00Z",
    profiles: {
      username: "frontenddev",
      avatar_url: "/user/aj.jpg",
    },
    media: {
      type: "video",
      url: "/video/entry.mp4",
    },
  },

  {
    id: "4",
    content:
      "IEA countries agree to the largest-ever release of oil reserves in an effort to curb rising prices caused by Middle East turmoil.",
    created_at: "2026-03-11T07:40:00Z",
    profiles: {
      username: "cnnbrk",
      avatar_url: "/image/azi.png",
    },
    media: {
      type: "link",
      thumbnail: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
      site: "cnn.com",
      title:
        "Historic release of crude reserves recommended to stabilize oil prices",
      description:
        "The International Energy Agency has advised member countries to release 400 million barrels of oil.",
    },
  },
  {
    id: "5",
    content: "Hoppers on Cinema, buy your tickets now!",
    created_at: "2026-03-11T07:40:00Z",
    profiles: {
      username: "pixar",
      avatar_url: "/image/pixar.jpg",
    },
    media: {
      type: "video",
      url: "/video/animal_party.mp4",
    },
  },
];