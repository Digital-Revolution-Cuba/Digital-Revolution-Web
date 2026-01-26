/**
 * Talents Store
 * Global state management for talents using Nanostores
 */

import type { CollectionEntry } from 'astro:content';
import { atom, map } from 'nanostores';

export type TalentEntry = CollectionEntry<'talents'>;
export type SortOption = 'profesion' | 'ciudad' | 'rating';

// Search and filter state
export const searchQuery = atom<string>('');
export const activeCategory = atom<string>('Todos');
export const sortBy = atom<SortOption>('profesion');

// Talents data
export const allTalents = atom<TalentEntry[]>([]);
export const filteredTalents = atom<TalentEntry[]>([]);

// UI state
export const isLoading = atom<boolean>(false);
export const currentPage = atom<number>(0);

// Complex state object
export const talentsState = map({
  searchQuery: '',
  activeCategory: 'Todos',
  sortBy: 'profesion' as SortOption,
  isLoading: false,
  currentPage: 0,
});
