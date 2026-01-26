/**
 * Talents Service
 * Handles talent data fetching and business logic
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type TalentEntry = CollectionEntry<'talents'>;
export type SortOption = 'profesion' | 'ciudad' | 'rating';

/**
 * Fetch all talents from content collection
 */
export async function getTalents(): Promise<TalentEntry[]> {
  return await getCollection('talents');
}

/**
 * Filter talents by search query and category
 */
export function filterTalents(
  talents: TalentEntry[],
  searchQuery: string,
  category: string,
): TalentEntry[] {
  return talents.filter((talent) => {
    const { name = '', role = '', skills = [] } = talent.data;

    const matchesSearch =
      !searchQuery ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      category === 'Todos' ||
      (talent.data.status &&
        talent.data.status.toLowerCase() === category.toLowerCase()) ||
      role.toLowerCase().includes(category.toLowerCase()) ||
      skills.some((skill) =>
        skill.toLowerCase().includes(category.toLowerCase()),
      );

    return matchesSearch && matchesCategory;
  });
}

/**
 * Sort talents by specified option
 */
export function sortTalents(
  talents: TalentEntry[],
  sortBy: SortOption,
): TalentEntry[] {
  const sorted = [...talents];

  switch (sortBy) {
    case 'profesion':
      return sorted.sort((a, b) =>
        (a.data.role || '').localeCompare(b.data.role || ''),
      );

    case 'ciudad':
      return sorted.sort((a, b) =>
        (a.data.location || '').localeCompare(b.data.location || ''),
      );

    case 'rating':
      return sorted.sort((a, b) => (b.data.rating || 0) - (a.data.rating || 0));

    default:
      return sorted;
  }
}

/**
 * Get featured talents
 */
export function getFeaturedTalents(talents: TalentEntry[]): TalentEntry[] {
  return talents.filter((talent) => talent.data.featured === true);
}

/**
 * Paginate talents for infinite scroll
 */
export function paginateTalents(
  talents: TalentEntry[],
  page: number,
  itemsPerPage: number,
): TalentEntry[] {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  return talents.slice(start, end);
}
