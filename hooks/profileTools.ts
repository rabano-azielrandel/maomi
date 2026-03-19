"use client";

import { useState } from "react";

export default function profileTool() {
    const [activeTab, setActiveTab] = useState("Posts");

    function changeTab(tab:string) {
        setActiveTab(tab);
    }

    return {
        activeTab,

        changeTab
    }
}