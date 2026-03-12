import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import PostComposer from "@/components/post/postcomposer";
import PostFeed from "@/components/feed/postfeed";

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
];

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 h-[85px] flex items-center shadow-sm bg-background">
        <div className="flex-1 h-full flex items-center justify-center hover:bg-primary/10">
          <p>For you</p>
        </div>

        <div className="flex-1 h-full flex items-center justify-center hover:bg-primary/10">
          <p>Following</p>
        </div>
      </nav>
      <PostComposer />
      <div className="w-full px-2">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      {/* feed */}
      <div className="overflow-y-auto">
        <PostFeed posts={samplePosts} />
      </div>
    </div>
  );
}
