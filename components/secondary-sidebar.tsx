import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function SecondarySidebar() {
  return (
    <div className="flex-1 flex flex-col gap-10 overflow-auto scrollbar-hide">
      {/* search bar */}
      <div className="sticky top-0 z-10 bg-white -mt-4 py-4 px-4 shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />

          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 rounded-2xl border border-primary/20"
          />
        </div>
      </div>

      {/* advertisement */}
      <div className="h-48 flex flex-col p-4 gap-4 rounded-2xl border border-primary/20">
        <div className="flex gap-4">
          <p className="flex-3 text-primary text-xl font-medium leading-snug">
            Subscribe to Premium
          </p>
          <Badge variant={"success"} className="flex centerXY">
            <p className="text-secondary font-semibold tracking-tighter">
              50% off
            </p>
          </Badge>
        </div>

        <div className="flex gap-4">
          <p className="flex-3 text-primary text-sm font-light tracking-tight">
            Get rid of ads, see your analytics, boost your replies and unlock
            20+ features.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          variant={"outline"}
          className="w-28 h-10 rounded-3xl bg-purple-400"
        >
          <Link href="#">Subscribe</Link>
        </Button>
      </div>

      {/* news */}
      <div className="h-72 flex flex-col p-4 gap-4 rounded-2xl border border-primary/20">
        <div className="flex mb-2">
          <p className="flex-3 text-primary text-xl font-bold leading-snug">
            Today's News
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-sm font-medium tracking-tight">
            BINI Builds Hype for 'Unang Kilig' Dance Practice Video
          </p>
          <p className="text-primary text-xs font-light tracking-tight">
            1 day ago · Entertainment · 42.9K posts
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-sm font-medium tracking-tight">
            BINI Builds Hype for 'Unang Kilig' Dance Practice Video
          </p>
          <p className="text-primary text-xs font-light tracking-tight">
            1 day ago · Entertainment · 42.9K posts
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-sm font-medium tracking-tight">
            BINI Builds Hype for 'Unang Kilig' Dance Practice Video
          </p>
          <p className="text-primary text-xs font-light tracking-tight">
            1 day ago · Entertainment · 42.9K posts
          </p>
        </div>
      </div>

      {/* trends */}
      <div className="h-72 flex flex-col p-4 gap-4 rounded-2xl border border-primary/20">
        <div className="flex mb-2">
          <p className="flex-3 text-primary text-xl font-bold leading-snug">
            What's happening
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-xs font-light tracking-wide">
            Trending in Philippines
          </p>
          <p className="text-primary text-sm font-medium tracking-tight">
            MAOMI IS HERE!
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-xs font-light tracking-wide">
            Only on Maomi · Trending
          </p>
          <p className="text-primary text-sm font-medium tracking-tight">
            Free Premium for 1 month?
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-xs font-light tracking-wide">
            Music · Trending
          </p>
          <p className="text-primary text-sm font-medium tracking-tight">
            IVOS is back
          </p>
        </div>
      </div>

      {/* suggestion */}
      <div className="h-72 flex flex-col p-4 gap-4 rounded-2xl border border-primary/20">
        <div className="flex mb-2">
          <p className="flex-3 text-primary text-xl font-bold leading-snug">
            Who to follow
          </p>
        </div>

        <div className="flex gap-2">
          <div className="w-10 flex centerXY rounded-full">
            <Image
              src={"/image/logo.png"}
              alt="user"
              width={100}
              height={100}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-primary text-sm font-medium tracking-tight">
              Maomi
            </p>
            <p className="text-primary text-xs font-light tracking-wide">
              @maomi
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-10 flex centerXY rounded-full">
            <Image
              src={"/image/logo.png"}
              alt="user"
              width={100}
              height={100}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-primary text-sm font-medium tracking-tight">
              Maomi
            </p>
            <p className="text-primary text-xs font-light tracking-wide">
              @maomi
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-10 flex centerXY rounded-full">
            <Image
              src={"/image/logo.png"}
              alt="user"
              width={100}
              height={100}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-primary text-sm font-medium tracking-tight">
              Maomi
            </p>
            <p className="text-primary text-xs font-light tracking-wide">
              @maomi
            </p>
          </div>
        </div>

        <p className="text-purple-500">Show more</p>
      </div>
    </div>
  );
}
