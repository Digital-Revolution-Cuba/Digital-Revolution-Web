import { useMemo, useState } from 'react';
import { categories, talents as talentsMock } from '../../data/talents.ts';
import { logger } from '../../utils/logger.ts';

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

interface Props {
  initialTalents: CollectionEntry<'talents'>[];
  categories: string[];
}

export default function TalentSearch({ initialTalents, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredTalents = useMemo(() => {
    return initialTalents.filter((talent) => {
      const { name = '', role = '', skills = [] } = talent.data;
      
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === 'Todos' ||
        (talent.data.status && talent.data.status.toLowerCase() === activeCategory.toLowerCase()) ||
        role.toLowerCase().includes(activeCategory.toLowerCase()) ||
        skills.some((skill) => skill.toLowerCase().includes(activeCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  function LoadMoreTalents() {
    logger.log('Cargando talentos');
  }

  return (
    <>
      <div className="talents-search-bar">
        <button
          type="button"
          className="search-icon"
          aria-label="Buscar talentos"
          title="Buscar"
        >
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

        <button
          type="button"
          className="filter-btn"
          aria-label="Abrir filtros"
          title="Filtros"
        >
          <FilterIcon />
        </button>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${
              cat === activeCategory ? 'filter-pill-active' : 'filter-pill-inactive'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="talents-header">
        <p className="results-count">
          <span>{filteredTalents.length}</span> talentos encontrados
        </p>
        <div className="sort-dropdown">
          <span>Ordenar por:</span>
          <select>
            <option>Profesion</option>
            <option>Ciudad</option>
          </select>
        </div>
      </div>

      <div className="talents-grid">
        {filteredTalents.map((talent, index) => {
          const { data, id } = talent;
          return (
            <div
              key={id}
              className="talent-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="talent-card-image">
                <img src={data.image || '/placeholder.jpg'} alt={data.name} />
                <div className="talent-actions">
                  {data.rating && (
                    <div className="rating-badge">
                      <Star size={12} fill="currentColor" />
                      <span>{data.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="talent-location">
                <MapPinIcon size={16} />
                <span>{talent.location}</span>
              </div>
              <div className="talent-skills">
                {talent.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="talent-footer">
                {/* Stats o estadísticas del usuario */}
                <button className="button-cta" style={{ padding: '10px 15px' }}>
                  Ver Perfil
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="load-more">
        <button className="button-cta" onClick={() => console.log('Cargando...')}>
          Ver Más Talentos
        </button>
      </div>
    </>
  );
}
