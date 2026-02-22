/**
 * Image Search Composable
 * Handles image filtering by creator name
 */

import { useMemo, useState } from "react";
import type { GalleryItem } from "../../data/gallery";

export function useImageSearch(images: readonly GalleryItem[]) {
  const [searchAuthor, setSearchAuthor] = useState("");

  const filteredImages = useMemo(() => {
    if (!searchAuthor.trim()) return [...images];
    return images.filter((img) =>
      img.creator.name.toLowerCase().includes(searchAuthor.toLowerCase())
    );
  }, [images, searchAuthor]);

  const handleClearSearch = () => {
    setSearchAuthor("");
  };

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(images.map((img) => img.creator.name))).sort();
  }, [images]);

  return {
    searchAuthor,
    setSearchAuthor,
    filteredImages,
    handleClearSearch,
    uniqueAuthors,
  };
}
