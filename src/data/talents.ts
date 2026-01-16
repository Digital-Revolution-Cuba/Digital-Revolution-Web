interface Talent {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  rating: number;
  skills: string[];
  followers: number;
  views: number;
  featured: boolean;
}

export const talents: Talent[] = [
  {
    id: 1,
    name: 'María García',
    role: 'Fotógrafa de Retratos',
    location: 'Madrid, España',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    rating: 4.9,
    skills: ['Fotografía'],
    followers: 12500,
    views: 45000,
    featured: true,
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Director de Video',
    location: 'Barcelona, España',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    rating: 4.8,
    skills: ['Video'],
    followers: 8900,
    views: 32000,
    featured: true,
  },
  {
    id: 3,
    name: 'Ana Rodríguez',
    role: 'Diseñadora UI/UX',
    location: 'Valencia, España',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    rating: 4.7,
    skills: ['Diseño', 'UI/UX'],
    followers: 6700,
    views: 28000,
    featured: false,
  },
  {
    id: 4,
    name: 'Diego Torres',
    role: 'Ilustrador Digital',
    location: 'Sevilla, España',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    rating: 4.9,
    skills: ['Ilustración', 'Diseño'],
    followers: 15200,
    views: 52000,
    featured: true,
  },
  {
    id: 5,
    name: 'Laura Sánchez',
    role: 'Artista 3D',
    location: 'Bilbao, España',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    rating: 4.6,
    skills: ['3D', 'Diseño'],
    followers: 5400,
    views: 21000,
    featured: false,
  },
  {
    id: 6,
    name: 'Javier Moreno',
    role: 'Productor Musical',
    location: 'Málaga, España',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    rating: 4.8,
    skills: ['Música'],
    followers: 9800,
    views: 38000,
    featured: true,
  },
  {
    id: 7,
    name: 'Elena Martín',
    role: 'Fotógrafa de Naturaleza',
    location: 'Granada, España',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    rating: 4.7,
    skills: ['Fotografía'],
    followers: 11300,
    views: 41000,
    featured: false,
  },
  {
    id: 8,
    name: 'Pablo Fernández',
    role: 'Motion Designer',
    location: 'Zaragoza, España',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    rating: 4.9,
    skills: ['Diseño', 'Video'],
    followers: 7600,
    views: 29000,
    featured: true,
  },
];

export const categories = [
  'Todos',
  'Fotografía',
  'Diseño',
  'Música',
  'Video',
  'Ilustración',
  '3D',
  'UI/UX',
];
