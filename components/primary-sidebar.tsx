import { Suspense } from "react";
import { LogoutButton } from "./logout-button";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "lucide-react";
import {
  Home,
  Compass,
  Bell,
  UserPlus,
  MessageCircle,
  Bookmark,
  User,
} from "lucide-react";

const data = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Notification", icon: Bell },
  { label: "Follow", icon: UserPlus },
  { label: "Chat", icon: MessageCircle },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Profile", icon: User },
];

export default function PrimarySidebar() {
  return (
    <div className="flex-1 flex flex-col py-4 gap-10">
      <div>
        <Image
          src={"/image/dark_logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-14 h-14 object-contain"
        />
      </div>
      <ul>
        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <li
              key={index}
              className="flex items-center gap-3 h-12 text-primary text-xl font-medium rounded-2xl hover:bg-primary/10"
            >
              <Icon size={22} />
              {item.label}
            </li>
          );
        })}
      </ul>

      <Button
        asChild
        size="lg"
        variant={"outline"}
        className="h-10 rounded-2xl"
      >
        <Link href="#">POST</Link>
      </Button>

      <Suspense>
        <LogoutButton />
      </Suspense>
    </div>
  );
}
