/**
 * FilterButtons component for category and status filtering
 * Accessible button group with active states
 */

import React from 'react';
import type {
  ConcursoCategory,
  ConcursoStatus,
} from '../../types/concursos.types';

interface FilterButtonsProps {
  categories: Array<{ value: ConcursoCategory; label: string }>;
  statuses: Array<{ value: ConcursoStatus; label: string }>;
  selectedCategory: string | null;
  selectedStatus: string | null;
  onCategoryChange: (category: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onClearFilters: () => void;
}

export default function FilterButtons({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  onClearFilters,
}: FilterButtonsProps) {
  const hasActiveFilters = selectedCategory !== null || selectedStatus !== null;

  return (
    <div className="filter-buttons">
      {/* Category Filters */}
      <div
        className="filter-group"
        role="group"
        aria-label="Filtrar por categoría"
      >
        <h3 className="filter-group-title">Categoría</h3>
        <div className="filter-buttons-list">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() =>
                onCategoryChange(
                  selectedCategory === category.value ? null : category.value,
                )
              }
              className={`filter-button ${selectedCategory === category.value ? 'active' : ''}`}
              aria-pressed={selectedCategory === category.value}
              aria-label={`Filtrar por categoría ${category.label}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div
        className="filter-group"
        role="group"
        aria-label="Filtrar por estado"
      >
        <h3 className="filter-group-title">Estado</h3>
        <div className="filter-buttons-list">
          {statuses.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() =>
                onStatusChange(
                  selectedStatus === status.value ? null : status.value,
                )
              }
              className={`filter-button ${selectedStatus === status.value ? 'active' : ''}`}
              aria-pressed={selectedStatus === status.value}
              aria-label={`Filtrar por estado ${status.label}`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="clear-filters-button"
          aria-label="Limpiar todos los filtros"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
