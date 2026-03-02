/**
 * Gallery Store
 * Global state management for gallery using Nanostores
 */

import { atom, map } from "nanostores";

export interface GalleryImage {
  download_url: string;
  author: string;
  id?: string;
}

// Search state
export const searchAuthor = atom<string>("");

// Gallery data
export const allImages = atom<GalleryImage[]>([]);
export const filteredImages = atom<GalleryImage[]>([]);

// Modal state
export const selectedImage = atom<GalleryImage | null>(null);
export const isModalVisible = atom<boolean>(false);

// Infinite scroll state
export const currentPage = atom<number>(0);
export const hasMore = atom<boolean>(true);

// Complex state object
export const galleryState = map({
  searchAuthor: "",
  selectedImage: null as GalleryImage | null,
  isModalVisible: false,
  currentPage: 0,
  hasMore: true,
});
