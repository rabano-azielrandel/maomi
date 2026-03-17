import Profile from "@/components/profile/profile";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>profile</div>
      <Profile
        user={{
          username: "asiyel",
          displayName: "Azi",
          bio: "Just a Maomi lover 🐾",
          avatar: "https://via.placeholder.com/100",
        }}
      />
    </div>
  );
};

export default page;
