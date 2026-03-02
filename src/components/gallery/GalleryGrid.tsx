import { useGalleryModal } from "../../composables/features/useGalleryModal";
import { useImageSearch } from "../../composables/features/useImageSearch";
import { useInfiniteScroll } from "../../composables/features/useInfiniteScroll";
import { INFINITE_SCROLL_CONFIG, MASONRY_CONFIG } from "../../config/galleryConfig";
import type { GalleryItem } from "../../data/gallery";
import { InputSearchGallery } from "./InputSearchGallery";

// SVG Icon inline
const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

interface Gallery {
  images: readonly GalleryItem[];
}

export function GalleryGrid({ images }: Gallery) {
  // Use custom hooks for business logic
  const { searchAuthor, setSearchAuthor, filteredImages, handleClearSearch } =
    useImageSearch(images);

  const { selectedImage, isModalVisible, openModal, closeModal } = useGalleryModal();

  const { visibleItems, hasMore, isLoading, observerTarget } = useInfiniteScroll(filteredImages, {
    initialItems: INFINITE_SCROLL_CONFIG.INITIAL_ITEMS,
    itemsPerPage: INFINITE_SCROLL_CONFIG.ITEMS_PER_PAGE,
    threshold: INFINITE_SCROLL_CONFIG.THRESHOLD,
    rootMargin: INFINITE_SCROLL_CONFIG.ROOT_MARGIN,
  });

  return (
    <div className="w-full px-3 py-4 sm:px-5 sm:py-5">
      <InputSearchGallery
        images={images}
        searchAuthor={searchAuthor}
        setSearchAuthor={setSearchAuthor}
        filteredImages={filteredImages}
        handleClearSearch={handleClearSearch}
      />

      {/* Responsive CSS Grid — uses CSS media queries instead of window.innerWidth */}
      {filteredImages.length > 0 ? (
        <>
          <div className="gallery-masonry-grid">
            {visibleItems.map((img) => (
              <div
                key={img.id}
                className="group w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openModal(img)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-auto w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/60 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-3">
                    <span className="text-xs font-medium text-white sm:text-sm">
                      {img.creator.name}
                    </span>
                    <span className="text-[10px] text-gray-300 sm:text-xs">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center py-6 sm:py-8">
              {isLoading && (
                <div className="animate-pulse text-sm text-cyan-400 sm:text-base">
                  Cargando más imágenes...
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-12 sm:py-16">
          <p className="mb-2 text-base text-gray-400 sm:text-lg">No se encontraron obras</p>
          <p className="text-xs text-gray-500 sm:text-sm">Intenta con otro nombre de autor</p>
          <button
            onClick={handleClearSearch}
            className="border-brand-navy text-accent-orange hover:bg-accent-cyan bg-brand-navy hover:text-brand-dark z-10 mt-3 rounded-lg border px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(52,223,222,0.4)] sm:px-8 sm:py-3 sm:text-base"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Modal - optimized for mobile */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 transition-all duration-300 sm:p-4 ${
            isModalVisible
              ? "bg-black/80 opacity-100 backdrop-blur-sm"
              : "bg-black/0 opacity-0 backdrop-blur-none"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-brand-background-global relative h-[85vh] w-full max-w-5xl overflow-hidden rounded-xl transition-all duration-300 sm:h-[90vh] sm:w-[90vw] ${
              isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-brand-background-global absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-4 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
              <h2 className="text-sm font-semibold text-white sm:text-lg">
                {selectedImage.creator.name}
              </h2>
              <button
                onClick={closeModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors duration-200 hover:bg-white/20 sm:h-10 sm:w-10"
              >
                <XIcon />
              </button>
            </div>

            {/* Image Container */}
            <div className="bg-brand-background-global flex h-full w-full items-center justify-center px-2 pt-14 pb-2 sm:px-4 sm:pt-16 sm:pb-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid Responsive Styles */}
      <style>{`
        .gallery-masonry-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: ${MASONRY_CONFIG.GUTTER};
          width: 100%;
        }
        
        @media (min-width: ${MASONRY_CONFIG.BREAKPOINTS.TABLET}px) {
          .gallery-masonry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: ${MASONRY_CONFIG.BREAKPOINTS.DESKTOP}px) {
          .gallery-masonry-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
