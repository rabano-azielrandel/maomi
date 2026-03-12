"use client";

import { useState } from "react";

export function usePostCardTool () {
    const [showComment, setShowComment] = useState(false);
    const [isRepost, setIsRepost] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);

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


    return {
        showComment,
        isRepost,
        isLike,
        isBookmark,

        toggleComment,
        toggleRepost,
        toggleLike,
        toggleBookmark
    }
}