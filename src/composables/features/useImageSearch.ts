/**
 * Image Search Composable
 * Handles image filtering by author
 */

import { useMemo, useState } from 'react';

interface ImageItem {
  download_url: string;
  author: string;
}

export function useImageSearch(images: ImageItem[]) {
  const [searchAuthor, setSearchAuthor] = useState('');

  const filteredImages = useMemo(() => {
    if (!searchAuthor.trim()) return images;
    return images.filter((img) =>
      img.author.toLowerCase().includes(searchAuthor.toLowerCase()),
    );
  }, [images, searchAuthor]);

  const handleClearSearch = () => {
    setSearchAuthor('');
  };

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(images.map((img) => img.author))).sort();
  }, [images]);

  return {
    searchAuthor,
    setSearchAuthor,
    filteredImages,
    handleClearSearch,
    uniqueAuthors,
  };
}
