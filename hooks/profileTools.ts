"use client";

import { useEffect, useState } from "react";

export default function profileTool() {
    const [activeTab, setActiveTab] = useState("Posts");
    const [openEditProfileForm, setOpenEditProfileForm] = useState(false);

    useEffect(() => {
        // const timer = setTimeout(() => {
            
        // }, 1000);

        
        // return () => clearTimeout(timer);

        console.log('useEffect: ', openEditProfileForm);
    }, [openEditProfileForm]);

    function changeTab(tab:string) {
        setActiveTab(tab);
    }

    function changeEditProfileStatus() {
        setOpenEditProfileForm ((prev) => !prev);
        console.log('change activated: ', openEditProfileForm);
    }

    return {
        activeTab,
        openEditProfileForm,

        changeEditProfileStatus,
        changeTab
    }
}