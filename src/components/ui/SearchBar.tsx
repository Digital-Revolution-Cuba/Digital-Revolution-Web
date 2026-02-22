/**
 * SearchBar component for filtering content
 * Accessible search input with clear functionality
 */

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label': string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...',
  'aria-label': ariaLabel,
}: SearchBarProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar" role="search">
      <label htmlFor="search-input" className="sr-only">
        {ariaLabel}
      </label>

      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} aria-hidden="true" />

        <input
          id="search-input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label={ariaLabel}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
