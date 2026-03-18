import Header from "@/components/profile/header";

const page = () => {
  return (
    <div className="flex flex-col gap-4 relative">
      <Header displayName="aziel randel rabano" postCount={1000} />

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-black/80 backdrop-blur border-b border-gray-800">
          <div className="flex items-center gap-4 px-4 py-3">
            <button className="text-xl">←</button>
            <div>
              <h2 className="font-bold text-lg">randel rabano</h2>
              <p className="text-sm text-gray-400">1 post</p>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="h-40 bg-gray-700 relative" />

        {/* Profile Info */}
        <div className="px-4 pb-4 relative bg-fuchsia-400">
          {/* Avatar */}
          <div className="absolute -top-12">
            <div className="w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center text-4xl font-bold border-4 border-black">
              r
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mt-2">
            <button className="border border-gray-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-900">
              Edit profile
            </button>
          </div>

          {/* Text Info */}
          <div className="mt-12">
            <h2 className="text-xl font-bold">randel rabano</h2>
            <p className="text-gray-400">@RabanoRand47514</p>

            <p className="text-gray-400 text-sm mt-2">Joined February 2024</p>

            {/* Stats */}
            <div className="flex gap-4 mt-2 text-sm">
              <span>
                <span className="font-bold text-white">1</span>{" "}
                <span className="text-gray-400">Following</span>
              </span>
              <span>
                <span className="font-bold text-white">1</span>{" "}
                <span className="text-gray-400">Follower</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 flex">
          {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-sm font-medium ${
                  i === 0
                    ? "border-b-2 border-blue-500 text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* Post */}
        <div className="border-b border-gray-800 px-4 py-4 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold">
            r
          </div>

          <div>
            <div className="flex gap-2 text-sm">
              <span className="font-bold">randel rabano</span>
              <span className="text-gray-400">@RabanoRand47514</span>
              <span className="text-gray-400">· Mar 16</span>
            </div>

            <p className="mt-1">PDC DONE?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
