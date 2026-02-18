/**
 * Type definitions for gallery items.
 *
 * Follows TypeScript best practices:
 * - Readonly properties for immutable data
 * - Strict literal types for category discrimination
 * - Descriptive property names
 */

export interface BaseGalleryItem {
  readonly type: string;
  /** Path to the image (relative to public/) */
  readonly image: string;
  readonly title: string;
}

export interface ArteGalleryItem extends BaseGalleryItem {
  readonly type: "arte";
  readonly artistName: string;
  readonly artistRole: string;
}

export interface MusicGalleryItem extends BaseGalleryItem {
  readonly type: "musica";
  readonly artist: string;
  readonly duration: string;
}

export interface FotografiaGalleryItem extends BaseGalleryItem {
  readonly type: "fotografia";
  readonly photographer?: string;
  readonly date?: string;
}

export type GalleryItem =
  | ArteGalleryItem
  | MusicGalleryItem
  | FotografiaGalleryItem;

export type CategoryType = "arte" | "musica" | "fotografia";

export interface CategoryConfig {
  readonly id: CategoryType;
  readonly label: string;
  readonly items: readonly GalleryItem[];
}
