/**
 * Gallery Service
 * Handles gallery data fetching and transformation
 */

export interface GalleryImage {
  download_url: string;
  author: string;
  id?: string;
}

/**
 * Fetch gallery images from API or static data
 * @param category Optional category filter
 */
export async function fetchGalleryImages(category?: string): Promise<GalleryImage[]> {
  // TODO: Replace with actual API call when backend is ready
  // For now, return mock data or integrate with existing data sources
  return [];
}

/**
 * Filter images by author name
 */
export function getImagesByAuthor(images: GalleryImage[], author: string): GalleryImage[] {
  if (!author.trim()) return images;
  return images.filter((img) => img.author.toLowerCase().includes(author.toLowerCase()));
}

/**
 * Get unique authors from image collection
 */
export function getUniqueAuthors(images: GalleryImage[]): string[] {
  return Array.from(new Set(images.map((img) => img.author))).sort();
}

/**
 * Paginate images for infinite scroll
 */
export function paginateImages(
  images: GalleryImage[],
  page: number,
  itemsPerPage: number
): GalleryImage[] {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  return images.slice(start, end);
}

/**
 * Check if more images are available
 */
export function hasMoreImages(
  totalImages: number,
  currentPage: number,
  itemsPerPage: number
): boolean {
  return (currentPage + 1) * itemsPerPage < totalImages;
}
