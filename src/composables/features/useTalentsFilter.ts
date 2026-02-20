/**
 * Talents Filter Composable
 * Handles talent search and category filtering
 */

import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";

type TalentEntry = CollectionEntry<"talents">;

export function useTalentsFilter(initialTalents: TalentEntry[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredTalents = useMemo(() => {
    return initialTalents.filter((talent) => {
      const { name = "", role = "", skills = [] } = talent.data;

      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === "Todos" ||
        (talent.data.status && talent.data.status.toLowerCase() === activeCategory.toLowerCase()) ||
        role.toLowerCase().includes(activeCategory.toLowerCase()) ||
        skills.some((skill) => skill.toLowerCase().includes(activeCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, initialTalents]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredTalents,
  };
}
