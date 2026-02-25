import type { CollectionEntry } from "astro:content";
import { useInfiniteScroll } from "../../composables/features/useInfiniteScroll";
import { useTalentsFilter } from "../../composables/features/useTalentsFilter";
import { useTalentsSort, type SortOption } from "../../composables/features/useTalentsSort";
import { INFINITE_SCROLL_CONFIG } from "../../config/galleryConfig";

// SVG Icons inline (reemplazo de lucide-react para reducir bundle)
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

const FilterIcon = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const MapPinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const StarIcon = ({ size = 12, fill = "currentColor" }: { size?: number; fill?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

interface Props {
  initialTalents: CollectionEntry<"talents">[];
  categories: string[];
}

export default function TalentSearch({ initialTalents, categories }: Props) {
  // Use custom hooks for business logic
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, filteredTalents } =
    useTalentsFilter(initialTalents);

  const { sortBy, setSortBy, sortedTalents } = useTalentsSort(filteredTalents);

  const { visibleItems, hasMore, isLoading, observerTarget } = useInfiniteScroll(sortedTalents, {
    initialItems: INFINITE_SCROLL_CONFIG.INITIAL_ITEMS,
    itemsPerPage: INFINITE_SCROLL_CONFIG.ITEMS_PER_PAGE,
    threshold: INFINITE_SCROLL_CONFIG.THRESHOLD,
    rootMargin: INFINITE_SCROLL_CONFIG.ROOT_MARGIN,
  });

  return (
    <>
      <div className="talents-search-bar">
        <button type="button" className="search-icon" aria-label="Buscar talentos" title="Buscar">
          <SearchIcon />
        </button>

        <input
          type="text"
          placeholder="Buscar talentos, habilidades o roles..."
          className="talents-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Buscar talentos, habilidades o roles"
        />

        <button type="button" className="filter-btn" aria-label="Abrir filtros" title="Filtros">
          <FilterIcon />
        </button>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${
              cat === activeCategory ? "filter-pill-active" : "filter-pill-inactive"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="talents-header">
        <p className="results-count">
          <span>{sortedTalents.length}</span> talentos encontrados
        </p>
        <div className="sort-dropdown">
          <span>Ordenar por:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
            <option value="profesion">Profesión</option>
            <option value="ciudad">Ciudad</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="talents-grid">
        {visibleItems.map((talent, index) => {
          const { data, id } = talent;
          const {
            name = "",
            image = "/placeholder.jpg",
            rating,
            location = "",
            skills = [],
          } = data;

          return (
            <div key={id} className="talent-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="talent-card-image">
                <img src={image} alt={name} />
              </div>

              <div className="talent-card-content">
                <h3 className="talent-name">{name}</h3>

                <div className="talent-location">
                  <MapPinIcon size={16} />
                  <span>{location}</span>
                </div>
                <div className="talent-skills">
                  {skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                {rating && (
                  <div className="talent-rating">
                    <StarIcon size={14} fill="currentColor" />
                    <span>{rating.toFixed(1)}</span>
                    <span className="rating-label">Calificación</span>
                  </div>
                )}
              </div>

              <div className="talent-footer">
                <a
                  href={`/perfiles/${id}`}
                  className="cta-profile-btn"
                  aria-label={`Ver perfil completo de ${name}`}
                >
                  <span>Ver Perfil Completo</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div ref={observerTarget} className="load-more">
          {isLoading ? (
            <div className="animate-pulse text-cyan-400">Cargando más talentos...</div>
          ) : (
            <button className="btn-primary">Ver Más Talentos</button>
          )}
        </div>
      )}
    </>
  );
}
