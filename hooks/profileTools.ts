"use client";

import { useState } from "react";

export default function profileTool() {
    const [activeTab, setActiveTab] = useState("Posts");
    const [openEditProfileForm, setOpenEditProfileForm] = useState(false);

    function changeTab(tab:string) {
        setActiveTab(tab);
    }

    function changeEditProfileStatus() {
        setOpenEditProfileForm ((prev) => !prev);
    }

    return {
        activeTab,
        openEditProfileForm,

        changeEditProfileStatus,
        changeTab
    }
}