"use client";

import { useState } from "react";

export default function profileTool() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [openEditProfileForm, setOpenEditProfileForm] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  function changeTab(tab: string) {
    setActiveTab(tab);
  }

  function changeEditProfileStatus() {
    setOpenEditProfileForm((prev) => !prev);
  }

  // ✅ Set image from file input
  function updateImage(type: "avatar" | "banner", file: File) {
    const previewUrl = URL.createObjectURL(file);

    if (type === "avatar") {
      setAvatarFile(file);
      setAvatarPreview(previewUrl);
    } else {
      setBannerFile(file);
      setBannerPreview(previewUrl);
    }
  }

  function removeImage(type: "avatar" | "banner") {
    if (type === "avatar") {
      setAvatarFile(null);
      setAvatarPreview(null);
    } else {
      setBannerFile(null);
      setBannerPreview(null);
    }
  }

  function initializeImages(avatarUrl?: string | null, bannerUrl?: string | null) {
    if (avatarUrl) setAvatarPreview(avatarUrl);
    if (bannerUrl) setBannerPreview(bannerUrl);
  }

  return {
    activeTab,
    openEditProfileForm,

    avatarFile,
    bannerFile,
    avatarPreview,
    bannerPreview,

    changeTab,
    changeEditProfileStatus,

    updateImage,
    removeImage,
    initializeImages,
  };
}