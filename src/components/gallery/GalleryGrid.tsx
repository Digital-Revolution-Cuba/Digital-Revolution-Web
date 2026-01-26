import { useGalleryModal } from '../../composables/features/useGalleryModal';
import { useImageSearch } from '../../composables/features/useImageSearch';
import { useInfiniteScroll } from '../../composables/features/useInfiniteScroll';
import {
  INFINITE_SCROLL_CONFIG,
  MASONRY_CONFIG,
} from '../../config/galleryConfig';
import { InputSearchGallery } from './InputSearchGallery';

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
  images: {
    download_url: string;
    author: string;
  }[];
}

export function GalleryGrid({ images }: Gallery) {
  // Use custom hooks for business logic
  const { searchAuthor, setSearchAuthor, filteredImages, handleClearSearch } =
    useImageSearch(images);

  const { selectedImage, isModalVisible, openModal, closeModal } =
    useGalleryModal();

  const { visibleItems, hasMore, isLoading, observerTarget } =
    useInfiniteScroll(filteredImages, {
      initialItems: INFINITE_SCROLL_CONFIG.INITIAL_ITEMS,
      itemsPerPage: INFINITE_SCROLL_CONFIG.ITEMS_PER_PAGE,
      threshold: INFINITE_SCROLL_CONFIG.THRESHOLD,
      rootMargin: INFINITE_SCROLL_CONFIG.ROOT_MARGIN,
    });

  return (
    <div className="w-full p-5">
      <InputSearchGallery
        images={images}
        searchAuthor={searchAuthor}
        setSearchAuthor={setSearchAuthor}
        filteredImages={filteredImages}
        handleClearSearch={handleClearSearch}
      />

      {/* Native CSS Grid (replaces Masonry) */}
      {filteredImages.length > 0 ? (
        <>
          <div
            className="gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${
                window.innerWidth < MASONRY_CONFIG.BREAKPOINTS.TABLET
                  ? '150px'
                  : window.innerWidth < MASONRY_CONFIG.BREAKPOINTS.DESKTOP
                    ? '200px'
                    : '250px'
              }, 1fr))`,
              gap: MASONRY_CONFIG.GUTTER,
              width: '100%',
            }}
          >
            {visibleItems.map((img, index) => (
              <div
                key={`${img.author}-${index}`}
                className="group w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openModal(img)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.download_url}
                    alt={img.author}
                    className="h-auto w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end justify-between rounded-lg bg-linear-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">
                      {img.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center py-8">
              {isLoading && (
                <div className="animate-pulse text-cyan-400">
                  Cargando más imágenes...
                </div>
              )}
            </div>
          )}
        </>
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
            className={`bg-brand-background-global relative h-[90vh] w-[90vw] max-w-5xl overflow-hidden rounded-xl transition-all duration-300 ${
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
                <XIcon />
              </button>
            </div>

            {/* Image Container */}
            <div className="bg-brand-background-global flex h-full w-full items-center justify-center px-4 pt-16 pb-4">
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
