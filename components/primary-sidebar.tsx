import { Suspense } from "react";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
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
  { label: "Home", icon: Home, href: "/home" },
  { label: "Explore", icon: Compass, href: "/explore" },
  { label: "Notification", icon: Bell, href: "/notification" },
  { label: "Follow", icon: UserPlus, href: "/follow" },
  { label: "Chat", icon: MessageCircle, href: "/chat" },
  { label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
  { label: "Profile", icon: User, href: "/profile" },
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
      <ul className="flex flex-col gap-10">
        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index} className="h-12">
              <Link
                href={item.href}
                className="flex items-center gap-3 p-2 h-full text-primary text-xl font-medium rounded-2xl hover:bg-primary/10"
              >
                <Icon size={22} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div>
        <ThemeSwitcher />
      </div>

      <Suspense>
        <LogoutButton />
      </Suspense>
    </div>
  );
}
