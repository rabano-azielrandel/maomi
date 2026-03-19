"use client";

import profileTool from "@/hooks/profileTools";
import { getTabData } from "@/data/profileTabData";

export default function tabs() {
  const { activeTab, changeTab } = profileTool();

  return (
    <div className="border-b border-gray-800 flex">
      {getTabData.map((item, index) => (
        <button
          key={index}
          onClick={() => changeTab(item.name)}
          className={`flex-1 py-3 text-sm font-medium ${
            item.name == activeTab
              ? "border-b-2 border-blue-500 text-primary"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
