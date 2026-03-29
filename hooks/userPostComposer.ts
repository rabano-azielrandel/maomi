"use client";

import { useState, useRef, useEffect } from "react";

export function usePostComposer() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [linkThumbnailFile, setLinkThumbnailFile] = useState<File | null>(null);
  const [linkThumbnailPreview, setLinkThumbnailPreview] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkDesc, setLinkDesc] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      if (linkThumbnailPreview) {
        URL.revokeObjectURL(linkThumbnailPreview);
      }
    };
  }, [linkThumbnailPreview]);

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

  function toggleLink() {
  setShowLink((prev) => {
    const next = !prev;

    if (next) {
      setImages([]); // prevent mixing
      setShowPoll(false);
    }

    return next;
  });
}

  function setLinkThumbnail(file: File) {
    setLinkThumbnailFile(file);

    const previewUrl = URL.createObjectURL(file);
    setLinkThumbnailPreview(previewUrl);
  }

  function removeLinkThumbnail() {
    if (linkThumbnailPreview) {
      URL.revokeObjectURL(linkThumbnailPreview);
    }

    setLinkThumbnailFile(null);
    setLinkThumbnailPreview(null);
  }

  function resetLink() {
  setLinkUrl("");
  setLinkTitle("");
  setLinkDesc("");
  removeLinkThumbnail();
}

  return {
    text,
    images,
    showEmoji,
    showPoll,
    showLink,
    linkUrl,
    linkTitle,
    linkDesc,
    linkThumbnailFile,
    linkThumbnailPreview,
    textareaRef,

    setLinkUrl,
    setLinkTitle,
    setLinkDesc,
    setLinkThumbnail,
    removeLinkThumbnail,
    setText,
    setImages,
    setShowEmoji,
    handleTextChange,
    addEmoji,
    removeImage,
    togglePoll,
    toggleLink,
    resetLink
  };
}