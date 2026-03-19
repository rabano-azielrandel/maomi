import Header from "@/components/profile/header";
import Profile from "@/components/profile/profile";
import Tabs from "@/components/profile/tabs";
import Userfeed from "@/components/profile/userfeed";
import { samplePosts } from "@/data/postfeedData";

export default function page() {
  return (
    <div className="flex flex-col gap-4 relative">
      <Header displayName="aziel randel rabano" postCount={1000} />
      <Profile />
      <Tabs />
      <div className="overflow-y-auto">
        <Userfeed posts={samplePosts} />
      </div>
    </div>
  );
}
