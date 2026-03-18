import React from "react";

export default function tabs() {
  return (
    <div className="border-b border-gray-800 flex">
      {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map(
        (tab, i) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-sm font-medium ${
              i === 0
                ? "border-b-2 border-blue-500 text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ),
      )}
    </div>
  );
}
