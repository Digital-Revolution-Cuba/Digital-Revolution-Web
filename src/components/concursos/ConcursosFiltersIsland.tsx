/**
 * ConcursosFiltersIsland - Interactive filtering component for contests
 * React Island for client-side filtering and search functionality
 */

import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";
import { CATEGORIES, CATEGORY_LABELS, STATUS_CONFIG, STATUSES } from "../../config/concursosConfig";
import {
  filterByCategory,
  filterBySearch,
  filterByStatus,
  formatDate,
  sortConcursos,
} from "../../utils/concursosUtils";
import EmptyState from "../ui/EmptyState";
import FilterButtons from "../ui/FilterButtons";
import SearchBar from "../ui/SearchBar";

interface Props {
  concursos: CollectionEntry<"concursos">[];
}

export default function ConcursosFiltersIsland({ concursos }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Apply all filters and sorting
  const filteredAndSortedConcursos = useMemo(() => {
    let filtered = concursos;

    // Apply filters
    filtered = filterBySearch(filtered, searchQuery);
    filtered = filterByCategory(filtered, selectedCategory);
    filtered = filterByStatus(filtered, selectedStatus);

    // Sort results
    return sortConcursos(filtered);
  }, [concursos, searchQuery, selectedCategory, selectedStatus]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedStatus(null);
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
        <div className="results-count" role="status" aria-live="polite" aria-atomic="true">
          {filteredAndSortedConcursos.length > 0 ? (
            <p>
              Mostrando <strong>{filteredAndSortedConcursos.length}</strong>{" "}
              {filteredAndSortedConcursos.length === 1 ? "concurso" : "concursos"}
            </p>
          ) : null}
        </div>

        {/* Contests Grid */}
        <div className="concursos-grid" role="region" aria-label="Resultados de concursos">
          {filteredAndSortedConcursos.length > 0 ? (
            filteredAndSortedConcursos.map((concurso) => {
              const statusInfo = STATUS_CONFIG[concurso.data.status];

              return (
                <article
                  key={concurso.data.id}
                  className={`concurso-card ${concurso.data.featured ? "featured" : ""}`}
                >
                  <a href={`/concursos/${concurso.data.slug}`} className="card-link">
                    <div className="card-image-wrapper">
                      <img
                        src={concurso.data.image}
                        alt={concurso.data.imageAlt}
                        className="card-image"
                        loading="lazy"
                      />
                      <div className="card-overlay"></div>
                      {concurso.data.featured && <span className="featured-badge">Destacado</span>}
                      <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>
                    </div>

                    <div className="card-content">
                      <div className="card-category">{CATEGORY_LABELS[concurso.data.category]}</div>

                      <h3 className="card-title">{concurso.data.title}</h3>

                      <p className="card-description">{concurso.data.description}</p>

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
                          <span>Cierre: {formatDate(concurso.data.fechas.cierre)}</span>
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
