import { Search, X } from "lucide-react";
import { useMemo } from "react";
import type { GalleryItem } from "../../data/gallery";

export function InputSearchGallery({
  images,
  searchAuthor,
  setSearchAuthor,
  filteredImages,
  handleClearSearch,
}: {
  images: readonly GalleryItem[];
  searchAuthor: string;
  setSearchAuthor: (author: string) => void;
  filteredImages: GalleryItem[];
  handleClearSearch: () => void;
}) {
  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(images.map((img) => img.creator.name)));
  }, [images]);

  return (
    <>
      <div className="mb-8 text-center sm:mb-16">
        <h1 className="font-impact section-title mb-4 text-3xl font-black italic sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-white">Descubre </span>
          <span className="text-cyan-400">Trabajos</span>
        </h1>
      </div>

      <div className="mb-8 flex flex-col items-center px-2 transition-all duration-500 ease-out sm:mb-12 sm:px-4">
        <div className="relative mb-6 w-full max-w-3xl sm:mb-8">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-gray-500 sm:left-5 sm:h-5 sm:w-5" />
            <input
              type="text"
              placeholder="Buscar imagenes por autor..."
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              className="w-full rounded-xl border-2 border-transparent bg-[#223439] py-3 pr-4 pl-11 text-sm text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 focus:outline-none sm:rounded-2xl sm:py-4 sm:pl-14 sm:text-base"
            />
            {searchAuthor && (
              <button
                onClick={handleClearSearch}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 transition-colors duration-200 hover:text-orange-500 sm:right-4"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-4xl overflow-hidden">
          {!searchAuthor && uniqueAuthors.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {uniqueAuthors.slice(0, 8).map((author, index) => (
                <button
                  key={author}
                  onClick={() => setSearchAuthor(author)}
                  className="border-opacity-50 hover:border-opacity-100 cursor-pointer rounded-full border-2 border-orange-500 bg-transparent px-3 py-1.5 text-xs font-medium text-orange-500 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/20 hover:text-orange-100 sm:px-5 sm:py-2.5 sm:text-base"
                  style={{
                    animation: `fadeInUp 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {author}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className={`mt-6 overflow-hidden transition-all duration-500 ease-out sm:mt-8 ${searchAuthor ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="animate-fade-in flex flex-col justify-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
            <span className="text-sm text-gray-300 sm:text-base">
              Mostrando <span className="font-bold text-orange-500">{filteredImages.length}</span>{" "}
              de <span className="font-bold text-cyan-400">{images.length}</span> obras
            </span>
            <span className="bg-opacity-20 border-opacity-50 rounded-full border-2 border-orange-500 bg-orange-500 px-3 py-1.5 text-sm font-medium text-orange-300 sm:px-4 sm:py-2 sm:text-base">
              {searchAuthor}
            </span>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .section-title {
          font-family: Impact, 'Arial Black', sans-serif;
          font-weight: 700;
          font-style: italic;
          }

        `}</style>
      </div>
    </>
  );
}
