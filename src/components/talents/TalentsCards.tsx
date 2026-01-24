import { useState } from 'react';
import { MapPin, Search, Filter } from 'lucide-react';
import { categories, talents as talentsMock } from '../../data/talents.ts';
import { useMemo } from 'react';

export default function TalentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredTalents = useMemo(() => {
    return talentsMock.filter((talent) => {
      const matchesSearch =
        talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        activeCategory === 'Todos' ||
        talent.role.toLowerCase().includes(activeCategory.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(activeCategory.toLowerCase()),
        );

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  function LoadMoreTalents() {
    console.log('Cargando talentos');
  }

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
              cat === activeCategory
                ? 'filter-pill-active'
                : 'filter-pill-inactive'
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
        {filteredTalents.map((talent, index) => (
          <div
            key={talent.name + index}
            className="talent-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="talent-card-image">
              <img src={talent.image} alt={talent.name} />
              <div className="talent-actions">
                {/* Aquí van los botones de acciones */}
              </div>
            </div>
            <div className="talent-card-content">
              <div className="talent-card-header">
                <div>
                  <h3 className="talent-name">{talent.name}</h3>
                  <p className="talent-role">{talent.role}</p>
                </div>
              </div>
              <div className="talent-location">
                <MapPin size={16} />
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
          </div>
        ))}
      </div>

      <div className="load-more">
        <button className="button-cta" onClick={LoadMoreTalents}>
          Ver Más Talentos
        </button>
      </div>
    </>
  );
}
