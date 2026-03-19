import Header from "@/components/profile/header";
import Profile from "@/components/profile/profile";
import Tabs from "@/components/profile/tabs";
import Userfeed from "@/components/profile/userfeed";
import { samplePosts } from "@/data/postfeedData";
import { getUserData, getUserPostCount } from "@/lib/services/profileService";

export default async function profilecontent() {
  const user = await getUserData();
  const post = await getUserPostCount();

  return (
    <div className="flex flex-col gap-4 relative">
      <Header displayName={user.display_name || "Anonymous"} postCount={post} />
      <Profile />
      <Tabs />
      <div className="overflow-y-auto">
        <Userfeed posts={samplePosts} />
      </div>
    </div>
  );
}
