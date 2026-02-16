/**
 * ConcursosFiltersIsland - Interactive filtering component for contests
 * React Island for client-side filtering and search functionality
 */

import type { CollectionEntry } from 'astro:content';
import { useMemo, useState } from 'react';
import type {
  ConcursoCategory,
  ConcursoStatus,
} from '../../types/concursos.types';
import EmptyState from '../ui/EmptyState';
import FilterButtons from '../ui/FilterButtons';
import SearchBar from '../ui/SearchBar';

interface Props {
  concursos: CollectionEntry<'concursos'>[];
}

// Category options
const CATEGORIES: Array<{ value: ConcursoCategory; label: string }> = [
  { value: 'fotografia', label: 'Fotografía' },
  { value: 'musica', label: 'Música' },
  { value: 'arte-digital', label: 'Arte Digital' },
  { value: 'ilustracion', label: 'Ilustración' },
  { value: 'diseno-grafico', label: 'Diseño Gráfico' },
  { value: 'video', label: 'Video' },
  { value: 'escritura', label: 'Escritura' },
];

// Status options
const STATUSES: Array<{ value: ConcursoStatus; label: string }> = [
  { value: 'activo', label: 'Activo' },
  { value: 'proximo', label: 'Próximamente' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'cerrado', label: 'Cerrado' },
];

// Category label mapping
const categoryLabels: Record<ConcursoCategory, string> = {
  fotografia: 'Fotografía',
  musica: 'Música',
  'arte-digital': 'Arte Digital',
  ilustracion: 'Ilustración',
  'diseno-grafico': 'Diseño Gráfico',
  video: 'Video',
  escritura: 'Escritura',
};

// Status configuration
const statusConfig: Record<ConcursoStatus, { label: string; class: string }> = {
  activo: { label: 'Activo', class: 'status-active' },
  proximo: { label: 'Próximamente', class: 'status-upcoming' },
  finalizado: { label: 'Finalizado', class: 'status-finished' },
  cerrado: { label: 'Cerrado', class: 'status-closed' },
};

export default function ConcursosFiltersIsland({ concursos }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Filter contests based on search and filters
  const filteredConcursos = useMemo(() => {
    return concursos.filter((concurso) => {
      // Search match (title, description, tags)
      const matchesSearch =
        searchQuery === '' ||
        concurso.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concurso.data.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        concurso.data.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Category match
      const matchesCategory =
        selectedCategory === null ||
        concurso.data.category === selectedCategory;

      // Status match
      const matchesStatus =
        selectedStatus === null || concurso.data.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [concursos, searchQuery, selectedCategory, selectedStatus]);

  // Sort filtered contests
  const sortedConcursos = useMemo(() => {
    return [...filteredConcursos].sort((a, b) => {
      // Featured first
      if (a.data.featured && !b.data.featured) return -1;
      if (!a.data.featured && b.data.featured) return 1;

      // Then by status priority
      const statusPriority: Record<string, number> = {
        activo: 1,
        proximo: 2,
        finalizado: 3,
        cerrado: 4,
      };

      return statusPriority[a.data.status] - statusPriority[b.data.status];
    });
  }, [filteredConcursos]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedStatus(null);
  };

  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <section id="concursos-filters" className="concursos-filters-section">
      <div className="filters-container">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar concursos por título, descripción o tags..."
          aria-label="Buscar concursos por título, descripción o tags"
        />

        {/* Filter Buttons */}
        <FilterButtons
          categories={CATEGORIES}
          statuses={STATUSES}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
          onClearFilters={handleClearFilters}
        />

        {/* Results count */}
        <div
          className="results-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {sortedConcursos.length > 0 ? (
            <p>
              Mostrando <strong>{sortedConcursos.length}</strong>{' '}
              {sortedConcursos.length === 1 ? 'concurso' : 'concursos'}
            </p>
          ) : null}
        </div>

        {/* Contests Grid */}
        <div
          className="concursos-grid"
          role="region"
          aria-label="Resultados de concursos"
        >
          {sortedConcursos.length > 0 ? (
            sortedConcursos.map((concurso) => {
              const statusInfo = statusConfig[concurso.data.status];

              return (
                <article
                  key={concurso.data.id}
                  className={`concurso-card ${concurso.data.featured ? 'featured' : ''}`}
                >
                  <a
                    href={`/concursos/${concurso.data.slug}`}
                    className="card-link"
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={concurso.data.image}
                        alt={concurso.data.imageAlt}
                        className="card-image"
                        loading="lazy"
                      />
                      <div className="card-overlay"></div>
                      {concurso.data.featured && (
                        <span className="featured-badge">Destacado</span>
                      )}
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <div className="card-content">
                      <div className="card-category">
                        {categoryLabels[concurso.data.category]}
                      </div>

                      <h3 className="card-title">{concurso.data.title}</h3>

                      <p className="card-description">
                        {concurso.data.description}
                      </p>

                      <div className="card-footer">
                        <div className="card-date">
                          <svg
                            className="icon-calendar"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M12.667 2.667H3.333A.667.667 0 0 0 2.667 3.333v9.334a.667.667 0 0 0 .666.666h9.334a.667.667 0 0 0 .666-.666V3.333a.667.667 0 0 0-.666-.666ZM10.667 1.333v2.667M5.333 1.333v2.667M2.667 6.667h10.666"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>
                            Cierre: {formatDate(concurso.data.fechas.cierre)}
                          </span>
                        </div>

                        <span className="card-cta">
                          Ver detalles
                          <svg
                            className="icon-arrow"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M3.333 8h9.334M9.333 4.667 12.667 8l-3.334 3.333"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })
          ) : (
            <EmptyState query={searchQuery} />
          )}
        </div>
      </div>
    </section>
  );
}
