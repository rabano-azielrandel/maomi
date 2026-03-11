import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import PostComposer from "@/components/ui/postcomposer";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";

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
    <div className="flex-1 w-full min-h-screen flex flex-col overflow-y-auto scrollbar-hide">
      <nav className="h-[85px] flex items-center shadow-sm">
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
    </div>
  );
}
