import Header from "@/components/profile/header";
import Profile from "@/components/profile/profile";
import Tabs from "@/components/profile/tabs";
import ProfileFeed from "@/components/feed/profilefeed";
import { samplePosts } from "@/data/postfeedData";
import {
  getUserData,
  getUserPostCount,
  getUserFollow,
} from "@/lib/services/profileService";

export default async function ProfileContent({ userID }: { userID: string }) {
  const user = await getUserData();
  const post = await getUserPostCount();
  const follows = await getUserFollow(userID);

  return (
    <div className="flex flex-col relative">
      <Header displayName={user.display_name || "Anonymous"} postCount={post} />
      <Profile user={user} follows={follows} />
      <Tabs />
      <div className="overflow-y-auto">
        <ProfileFeed posts={samplePosts} />
      </div>
    </div>
  );
}
