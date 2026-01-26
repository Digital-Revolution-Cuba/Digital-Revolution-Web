import { useMemo } from 'react';

// SVG Icons inline
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
  <svg
    width="20"
    height="20"
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

export function InputSearchGallery({
  images,
  searchAuthor,
  setSearchAuthor,
  filteredImages,
  handleClearSearch,
}: {
  images: Array<any>;
  searchAuthor: string;
  setSearchAuthor: (author: string) => void;
  filteredImages: Array<any>;
  handleClearSearch: () => void;
}) {
  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(images.map((img) => img.author)));
  }, [images]);

  return (
    <>
      <div className="mb-16 text-center">
        <h1 className="font-impact section-title mb-6 text-5xl font-black italic md:text-6xl lg:text-7xl">
          <span className="text-white">Descubre </span>
          <span className="text-cyan-400">Trabajos</span>
        </h1>
      </div>

      <div className="mb-12 flex flex-col items-center px-4 transition-all duration-500 ease-out">
        <div className="relative mb-8 w-full max-w-3xl">
          <div className="relative">
            <div className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 transform text-gray-500">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar imagenes por autor..."
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              className="w-full rounded-2xl border-2 border-transparent bg-[#223439] py-4 pr-4 pl-14 text-base text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 focus:outline-none"
            />
            {searchAuthor && (
              <button
                onClick={handleClearSearch}
                className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-500 transition-colors duration-200 hover:text-orange-500"
              >
                <XIcon />
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-4xl overflow-hidden">
          {!searchAuthor && uniqueAuthors.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {uniqueAuthors.slice(0, 8).map((author, index) => (
                <button
                  key={author}
                  onClick={() => setSearchAuthor(author)}
                  className="border-opacity-50 hover:border-opacity-100 cursor-pointer rounded-full border-2 border-orange-500 bg-transparent px-5 py-2.5 font-medium text-orange-500 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/20 hover:text-orange-100"
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
          className={`mt-8 overflow-hidden transition-all duration-500 ease-out ${searchAuthor ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="animate-fade-in flex flex-col justify-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
            <span className="text-base text-gray-300">
              Mostrando{' '}
              <span className="font-bold text-orange-500">
                {filteredImages.length}
              </span>{' '}
              de{' '}
              <span className="font-bold text-cyan-400">{images.length}</span>{' '}
              obras
            </span>
            <span className="bg-opacity-20 border-opacity-50 rounded-full border-2 border-orange-500 bg-orange-500 px-4 py-2 text-base font-medium text-orange-300">
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
