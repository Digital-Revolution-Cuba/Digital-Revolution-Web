/**
 * Gallery Modal Composable
 * Manages modal state and body scroll lock
 */

import { useEffect, useState } from "react";
import type { GalleryItem } from "../../data/gallery";

export function useGalleryModal() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (image: GalleryItem) => {
    setSelectedImage(image);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Manage body scroll lock when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return {
    selectedImage,
    isModalVisible,
    openModal,
    closeModal,
  };
}
