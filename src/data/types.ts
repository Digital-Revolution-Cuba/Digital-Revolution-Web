/**
 * Type definitions for gallery items
 */

export interface BaseGalleryItem {
  type: string;
  image: string;
  title: string;
}

export interface ArteGalleryItem extends BaseGalleryItem {
  type: 'arte';
  artistName: string;
  artistRole: string;
}

export interface MusicGalleryItem extends BaseGalleryItem {
  type: 'musica';
  artist: string;
  duration: string;
}

export interface FotografiaGalleryItem extends BaseGalleryItem {
  type: 'fotografia';
  photographer?: string;
  date?: string;
}

export type GalleryItem =
  | ArteGalleryItem
  | MusicGalleryItem
  | FotografiaGalleryItem;

export type CategoryType = 'arte' | 'musica' | 'fotografia';

export interface CategoryConfig {
  id: CategoryType;
  label: string;
  items: GalleryItem[];
}
