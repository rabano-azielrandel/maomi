import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { HeaderProps } from "@/types/profile/user";

export default function header({ displayName, postCount }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <div className="flex items-center gap-4 px-4 py-3 text-primary">
        <Link href={"/home"}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="font-bold text-lg">{displayName}</h2>
          <p className="text-sm text-gray-400">{postCount} post</p>
        </div>
      </div>
    </div>
  );
}
