import Header from "@/components/profile/header";
import Profile from "@/components/profile/profile";
import Tabs from "@/components/profile/tabs";
import Userfeed from "@/components/profile/userfeed";
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
    <div className="flex flex-col gap-4 relative">
      <Header displayName={user.display_name || "Anonymous"} postCount={post} />
      <Profile user={user} follows={follows} />
      <Tabs />
      <div className="overflow-y-auto">
        <Userfeed posts={samplePosts} />
      </div>
    </div>
  );
}
