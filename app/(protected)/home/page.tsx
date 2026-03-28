import PostComposer from "@/components/post/postcomposer";
import PostFeedWrapper from "./feedwrapper";
import { Suspense } from "react";
import { InfoIcon } from "lucide-react";

export default async function ProtectedPage() {
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
        <Suspense fallback={<div>Loading feed...</div>}>
          <PostFeedWrapper />
        </Suspense>
      </div>
    </div>
  );
}
