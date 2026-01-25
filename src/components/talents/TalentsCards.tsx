import { useState, useMemo } from 'react';
import { MapPin, Search, Filter, Star } from 'lucide-react';
import type { CollectionEntry } from 'astro:content';

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
  }, [searchQuery, activeCategory, initialTalents]);

  return (
    <>
      <div className="talents-search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Buscar talentos, habilidades o roles..."
          className="talents-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="filter-btn" />
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

              <div className="talent-card-content">
                <div className="talent-card-header">
                  <div>
                    <h3 className="talent-name">{data.name}</h3>
                    <p className="talent-role">{data.role}</p>
                  </div>
                </div>

                <div className="talent-location">
                  <MapPin size={16} />
                  <span>{data.location || 'Remoto'}</span>
                </div>

                <div className="talent-skills">
                  {data.skills?.slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="talent-footer">
                  <a 
                    href={`/perfiles/${id}`} 
                    className="button-cta"
                  >
                    Ver Perfil
                  </a>
                </div>
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
