/**
 * Gallery Modal Composable
 * Manages modal state and body scroll lock
 */

import { useEffect, useState } from 'react';

interface SelectedImage {
  download_url: string;
  author: string;
}

export function useGalleryModal() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (image: SelectedImage) => {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return {
    selectedImage,
    isModalVisible,
    openModal,
    closeModal,
  };
}
