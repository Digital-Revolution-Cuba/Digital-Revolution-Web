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
    image: "/images/gallery/musica/music-1.svg",
    title: "Don't stop me",
    artist: "Frank y su tropa",
    duration: "3:04",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-2.svg",
    title: "Summer Vibes",
    artist: "Los Tropicales",
    duration: "4:21",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-3.svg",
    title: "Electric Dreams",
    artist: "Synth Wave",
    duration: "3:45",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-4.svg",
    title: "Midnight Jazz",
    artist: "Blue Notes",
    duration: "5:12",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-5.svg",
    title: "Rock Anthem",
    artist: "The Legends",
    duration: "4:03",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-6.svg",
    title: "Acoustic Soul",
    artist: "Marina del Rey",
    duration: "3:28",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-7.svg",
    title: "Urban Beats",
    artist: "DJ Fusion",
    duration: "3:56",
  },
  {
    type: "musica",
    image: "/images/gallery/musica/music-8.svg",
    title: "Classical Mix",
    artist: "Orchestra Plus",
    duration: "6:30",
  },
] as const;
