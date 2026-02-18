import type { MusicGalleryItem } from "./types";

/**
 * Música gallery data.
 *
 * Each entry represents a music piece in the "Música" category.
 * Images are served from `public/` so paths start from the root.
 *
 * @example
 * // To change an album cover:
 * { image: '/images/gallery/musica/my-album.jpg', ... }
 */
export const musicaGallery: readonly MusicGalleryItem[] = [
  {
    type: "musica",
    image: "/images/gallery/musica/music-1.jpg",
    title: "Don't stop me",
    artist: "Frank y su tropa",
    duration: "3:04",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-2.jpg",
    title: "Summer Vibes",
    artist: "Los Tropicales",
    duration: "4:21",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-3.jpg",
    title: "Electric Dreams",
    artist: "Synth Wave",
    duration: "3:45",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-4.jpg",
    title: "Midnight Jazz",
    artist: "Blue Notes",
    duration: "5:12",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-5.jpg",
    title: "Rock Anthem",
    artist: "The Legends",
    duration: "4:03",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-6.jpg",
    title: "Acoustic Soul",
    artist: "Marina del Rey",
    duration: "3:28",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-7.jpg",
    title: "Urban Beats",
    artist: "DJ Fusion",
    duration: "3:56",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-8.jpg",
    title: "Classical Mix",
    artist: "Orchestra Plus",
    duration: "6:30",
  },
] as const;
