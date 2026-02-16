/**
 * EmptyState component for when no results are found
 * Provides friendly feedback and suggestions
 */

import { Search } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
}

export default function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state-icon">
        <Search size={64} aria-hidden="true" />
      </div>

      <h3 className="empty-state-title">
        {query ? 'No se encontraron concursos' : 'No hay concursos disponibles'}
      </h3>

      <p className="empty-state-description">
        {query ? (
          <>
            No encontramos concursos que coincidan con "<strong>{query}</strong>
            ". Intenta con otros términos de búsqueda o ajusta los filtros.
          </>
        ) : (
          'Actualmente no hay concursos disponibles. Vuelve pronto para ver nuevas convocatorias.'
        )}
      </p>
    </div>
  );
}
