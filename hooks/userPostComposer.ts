"use client";

import { useState } from "react";

export function usePostComposer() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);

  function addEmoji(emoji: string) {
    setText((prev) => prev + emoji);
  }

  return {
    text,
    setText,
    images,
    setImages,
    showEmoji,
    setShowEmoji,
    addEmoji,
  };
}