import Header from "@/components/profile/header";
import Profile from "@/components/profile/profile";
import Tabs from "@/components/profile/tabs";

export default function page() {
  return (
    <div className="flex flex-col gap-4 relative">
      <Header displayName="aziel randel rabano" postCount={1000} />
      <Profile />
      <Tabs />
      {/* reuse feed but for own post only */}
      <p>no post yet</p>
    </div>
  );
}
