export interface Creator {
  name: string;
  username: string;
  avatar: string;
  profession: string;
  location: string;
  bio: string;
  followers: number;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  likes: number;
  views: number;
  creator: Creator;
  featured?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=600&width=400',
    alt: 'Retrato artístico',
    category: 'Fotografía',
    likes: 2340,
    views: 15420,
    featured: true,
    creator: {
      name: 'María González',
      username: '@mariagonzalez',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Fotógrafa de Retratos',
      location: 'Ciudad de México',
      bio: 'Capturando emociones a través del lente. Especialista en retratos que cuentan historias.',
      followers: 12500,
      instagram: 'mariagonzalez.foto',
      twitter: 'mariagfoto',
      website: 'mariagonzalez.com',
    },
  },
  {
    id: 2,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=400&width=600',
    alt: 'Paisaje urbano',
    category: 'Fotografía',
    likes: 1890,
    views: 9870,
    creator: {
      name: 'Carlos Ruiz',
      username: '@carlosruiz',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Fotógrafo Urbano',
      location: 'Buenos Aires',
      bio: 'Explorando la belleza oculta de las ciudades. Arquitectura y street photography.',
      followers: 8900,
      instagram: 'carlosruiz.urban',
      website: 'carlosruiz.art',
    },
  },
  {
    id: 3,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=500&width=400',
    alt: 'Ilustración digital',
    category: 'Ilustración',
    likes: 3120,
    views: 18340,
    featured: true,
    creator: {
      name: 'Ana Martínez',
      username: '@anamartinez',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Ilustradora Digital',
      location: 'Madrid',
      bio: 'Creando mundos fantásticos con pixels y color. Especialista en concept art y character design.',
      followers: 25600,
      instagram: 'ana.artworks',
      twitter: 'anamart_art',
    },
  },
  {
    id: 4,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=400&width=400',
    alt: 'Arte 3D',
    category: '3D',
    likes: 2780,
    views: 14560,
    creator: {
      name: 'Diego López',
      username: '@diegolopez3d',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Artista 3D',
      location: 'Bogotá',
      bio: 'Transformando ideas en realidades tridimensionales. Motion graphics y visualización.',
      followers: 18200,
      instagram: 'diego3d.art',
      website: 'diegolopez3d.com',
    },
  },
  {
    id: 5,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=600&width=500',
    alt: 'Fotografía de naturaleza',
    category: 'Fotografía',
    likes: 4560,
    views: 28900,
    featured: true,
    creator: {
      name: 'Laura Fernández',
      username: '@laurafernandez',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Fotógrafa de Naturaleza',
      location: 'Costa Rica',
      bio: 'Documentando la belleza del mundo natural. Wildlife y paisajes que inspiran.',
      followers: 34500,
      instagram: 'laura.wildlife',
      twitter: 'laurawild',
    },
  },
  {
    id: 6,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=400&width=600',
    alt: 'Diseño UI',
    category: 'UI/UX',
    likes: 1650,
    views: 8760,
    creator: {
      name: 'Roberto Sánchez',
      username: '@robertosanchez',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Diseñador UI/UX',
      location: 'Santiago',
      bio: 'Creando experiencias digitales intuitivas y hermosas. Product design y sistemas de diseño.',
      followers: 15800,
      instagram: 'roberto.ux',
      website: 'robertodesigns.io',
    },
  },
  {
    id: 7,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=500&width=400',
    alt: 'Retrato dramático',
    category: 'Fotografía',
    likes: 2100,
    views: 11200,
    creator: {
      name: 'Valentina Torres',
      username: '@valentinatorres',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Fotógrafa de Estudio',
      location: 'Lima',
      bio: 'Maestría en iluminación y composición. Retratos que revelan el alma.',
      followers: 9800,
      instagram: 'valentina.studio',
    },
  },
  {
    id: 8,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=400&width=500',
    alt: 'Diseño gráfico',
    category: 'Diseño',
    likes: 1980,
    views: 10540,
    creator: {
      name: 'Andrés Moreno',
      username: '@andresmoreno',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Diseñador Gráfico',
      location: 'Medellín',
      bio: 'Comunicación visual que impacta. Branding, tipografía experimental y diseño editorial.',
      followers: 12300,
      instagram: 'andres.design',
      twitter: 'andresdesign',
    },
  },
  {
    id: 9,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=450&width=450',
    alt: 'Arte abstracto',
    category: 'Ilustración',
    likes: 2890,
    views: 16780,
    creator: {
      name: 'Sofía Herrera',
      username: '@sofiaherrera',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Artista Digital',
      location: 'Barcelona',
      bio: 'Explorando la abstracción y el color. NFTs y arte generativo que desafía límites.',
      followers: 28900,
      instagram: 'sofia.abstract',
      website: 'sofiaherrera.art',
    },
  },
  {
    id: 10,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=500&width=600',
    alt: 'Fotografía arquitectónica',
    category: 'Fotografía',
    likes: 3450,
    views: 21300,
    creator: {
      name: 'Miguel Ángel Rojas',
      username: '@miguelrojas',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Fotógrafo de Arquitectura',
      location: 'Guadalajara',
      bio: 'Capturando la geometría y luz de espacios extraordinarios.',
      followers: 19700,
      instagram: 'miguel.archi',
      twitter: 'miguelarchi',
    },
  },
  {
    id: 11,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=350&width=400',
    alt: 'Producción musical',
    category: 'Video',
    likes: 1780,
    views: 9200,
    creator: {
      name: 'Elena Vásquez',
      username: '@elenavasquez',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Productora de Video',
      location: 'Monterrey',
      bio: 'Narrativas visuales que emocionan. Videoclips y contenido cinematográfico.',
      followers: 11400,
      instagram: 'elena.video',
    },
  },
  {
    id: 12,
    src: 'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=550&width=400',
    alt: 'Fotografía de moda',
    category: 'Fotografía',
    likes: 4120,
    views: 25600,
    featured: true,
    creator: {
      name: 'Camila Ortiz',
      username: '@camilaortiz',
      avatar:
        'https://detallesorballo.com/wp-content/uploads/2020/09/imagen-de-prueba-320x240-1.jpg?height=80&width=80',
      profession: 'Fotógrafa de Moda',
      location: 'São Paulo',
      bio: 'Capturando la esencia del estilo. Editorial y campañas de moda internacional.',
      followers: 42300,
      instagram: 'camila.fashion',
      twitter: 'camilafashion',
    },
  },
];

export const categories = [
  'Todos',
  'Fotografía',
  'Diseño',
  'Ilustración',
  '3D',
  'UI/UX',
  'Video',
];
