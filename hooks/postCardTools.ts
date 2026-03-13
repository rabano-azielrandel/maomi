"use client";

import { useState } from "react";

export function usePostCardTool () {
    const [showComment, setShowComment] = useState(false);
    const [isRepost, setIsRepost] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [comment, setComment] = useState("");

    function toggleComment () {
        setShowComment((prev) => !prev);
    }

    function toggleRepost () {
        setIsRepost((prev) => !prev);
    }

    function toggleLike() {
        setIsLike((prev) => !prev);
    }

    function toggleBookmark () {
        setIsBookmark((prev) => !prev);
    }

    function resetComment() {
        setComment("");
    }

    function sendComment() {
        if (!comment.trim()) return;

        console.log("comment:", comment);

        setComment("");
    }

    return {
        showComment,
        comment,
        isRepost,
        isLike,
        isBookmark,

        toggleComment,
        setComment,
        resetComment,
        sendComment,
        toggleRepost,
        toggleLike,
        toggleBookmark
    }
}