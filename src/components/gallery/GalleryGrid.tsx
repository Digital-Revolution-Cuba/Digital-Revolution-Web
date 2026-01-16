import { useState, useMemo } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Measure from 'react-measure';
import { InputSearchGallery } from './InputSearchGallery';
import { X } from 'lucide-react';

interface Gallery {
  images: {
    download_url: string;
    author: string;
  }[];
}

interface SelectedImage {
  download_url: string;
  author: string;
}

export function GalleryGrid({ images }: Gallery) {
  const [searchAuthor, setSearchAuthor] = useState('');
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get unique authors for filter suggestions

  // Filter images by author
  const filteredImages = useMemo(() => {
    if (!searchAuthor.trim()) return images;
    return images.filter((img) =>
      img.author.toLowerCase().includes(searchAuthor.toLowerCase()),
    );
  }, [images, searchAuthor]);

  const handleClearSearch = () => {
    setSearchAuthor('');
  };

  const openModal = (image: SelectedImage) => {
    setSelectedImage(image);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Prevent scroll when modal is open
  useMemo(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedImage]);

  return (
    <div className="w-full p-5">
      <InputSearchGallery
        images={images}
        searchAuthor={searchAuthor}
        setSearchAuthor={setSearchAuthor}
        filteredImages={filteredImages}
        handleClearSearch={handleClearSearch}
      />

      {/* Grid */}
      {filteredImages.length > 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 2,
            750: 3,
            1200: 5,
          }}
        >
          <Masonry gutter="10px">
            {filteredImages.map((img, index) => (
              <Measure key={index}>
                {({ measureRef }) => (
                  <div
                    ref={measureRef}
                    className="group w-full cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openModal(img)}
                  >
                    <div className="group relative overflow-hidden">
                      <img
                        src={img.download_url}
                        alt={img.author}
                        className="display-block h-auto w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-end justify-between rounded-lg bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-sm font-medium text-white">
                          {img.author}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Measure>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="mb-2 text-lg text-gray-400">No se encontraron obras</p>
          <p className="text-sm text-gray-500">
            Intenta con otro nombre de autor
          </p>
          <button
            onClick={handleClearSearch}
            className="border-brand-navy text-accent-orange hover:bg-accent-cyan bg-brand-navy hover:text-brand-dark z-10 mt-3 rounded-lg border px-8 py-3 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(52,223,222,0.4)]"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isModalVisible
              ? 'bg-black/80 opacity-100 backdrop-blur-sm'
              : 'bg-black/0 opacity-0 backdrop-blur-none'
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative h-[90vh] w-[90vw] max-w-5xl overflow-hidden rounded-xl bg-[var(--color-brand-background-global)] transition-all duration-300 ${
              isModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-[var(--color-brand-background-global)] px-6 py-4 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white">
                {selectedImage.author}
              </h2>
              <button
                onClick={closeModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors duration-200 hover:bg-white/20"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-brand-background-global)] px-4 pt-16 pb-4">
              <img
                src={selectedImage.download_url}
                alt={selectedImage.author}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
