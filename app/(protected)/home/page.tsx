import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
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
    <div className="flex-1 w-full min-h-screen flex flex-col gap-12 border-x border-primary overflow-y-auto scrollbar-hide">
      <div className="h-[85px] flex justify-between items-center px-32 shadow-sm">
        <p>For you</p>
        <p>Following</p>
      </div>
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
