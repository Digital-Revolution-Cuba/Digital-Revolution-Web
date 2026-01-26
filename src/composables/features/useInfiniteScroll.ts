/**
 * Infinite Scroll Hook
 * Implements lazy loading with IntersectionObserver
 */

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  initialItems: number;
  itemsPerPage: number;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll<T>(
  allItems: T[],
  options: UseInfiniteScrollOptions,
) {
  const {
    initialItems,
    itemsPerPage,
    threshold = 0.5,
    rootMargin = '100px',
  } = options;

  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Initialize visible items
  useEffect(() => {
    setVisibleItems(allItems.slice(0, initialItems));
    setPage(1);
    setHasMore(allItems.length > initialItems);
  }, [allItems, initialItems]);

  // Load more items
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate async loading (remove timeout for real implementation)
    setTimeout(() => {
      const start = page * itemsPerPage;
      const end = start + itemsPerPage;
      const nextItems = allItems.slice(start, end);

      if (nextItems.length > 0) {
        setVisibleItems((prev) => [...prev, ...nextItems]);
        setPage((prev) => prev + 1);
        setHasMore(end < allItems.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 300);
  }, [allItems, page, itemsPerPage, isLoading, hasMore]);

  // Setup IntersectionObserver
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadMore, threshold, rootMargin]);

  return {
    visibleItems,
    hasMore,
    isLoading,
    observerTarget,
  };
}
