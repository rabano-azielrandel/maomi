"use client";

import { useState, useRef } from "react";

export function usePostComposer() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    resizeTextarea();
  }

  function addEmoji(emoji: string) {
    setText((prev) => {
      const newText = prev + emoji;

      // resize after state update
      setTimeout(resizeTextarea, 0);

      return newText;
    });
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function togglePoll() {
    setShowPoll((prev) => !prev);
  }

  return {
    text,
    images,
    showEmoji,
    showPoll,

    setImages,
    setShowEmoji,

    textareaRef,
    handleTextChange,
    addEmoji,
    removeImage,
    togglePoll,

  };
}