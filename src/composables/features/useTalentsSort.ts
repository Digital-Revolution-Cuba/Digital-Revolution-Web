/**
 * Talents Sort Composable
 * Handles sorting of talent entries
 */

import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";

type TalentEntry = CollectionEntry<"talents">;

export type SortOption = "profesion" | "ciudad" | "rating";

export function useTalentsSort(talents: TalentEntry[]) {
  const [sortBy, setSortBy] = useState<SortOption>("profesion");

  const sortedTalents = useMemo(() => {
    const sorted = [...talents];

    switch (sortBy) {
      case "profesion":
        return sorted.sort((a, b) => (a.data.role || "").localeCompare(b.data.role || ""));

      case "ciudad":
        return sorted.sort((a, b) => (a.data.location || "").localeCompare(b.data.location || ""));

      case "rating":
        return sorted.sort((a, b) => (b.data.rating || 0) - (a.data.rating || 0));

      default:
        return sorted;
    }
  }, [talents, sortBy]);

  return {
    sortBy,
    setSortBy,
    sortedTalents,
  };
}
