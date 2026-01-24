# Data Models and Types

Complete reference for data structures and TypeScript types used in Digital Revolution Web.

---

## 📋 Core Data Types

### Talent

Represents a community talent/member.

```typescript
interface Talent {
  /** Unique identifier */
  id: number;
  
  /** Full name */
  name: string;
  
  /** Primary role/profession */
  role: string;
  
  /** Location (city, country) */
  location: string;
  
  /** Profile/avatar image URL */
  image: string;
  
  /** Average rating (0-5) */
  rating: number;
  
  /** Array of skills/specializations */
  skills: string[];
  
  /** Number of followers */
  followers: number;
  
  /** Profile views count */
  views: number;
  
  /** Whether talent is featured */
  featured: boolean;
}
```

**Example**:

```typescript
const talent: Talent = {
  id: 1,
  name: 'María García',
  role: 'Fotógrafa de Retratos',
  location: 'Madrid, España',
  image: 'https://example.com/maria.jpg',
  rating: 4.9,
  skills: ['Fotografía', 'Retrato', 'Edición'],
  followers: 12500,
  views: 45000,
  featured: true,
};
```

---

### Gallery Item

Base interface for gallery items (art, music, photography).

```typescript
interface GalleryItem {
  /** Unique identifier */
  id: number;
  
  /** Item title */
  title: string;
  
  /** Creator/artist name */
  artist: string;
  
  /** Item description */
  description: string;
  
  /** Image/thumbnail URL */
  image: string;
  
  /** Category/type */
  category: 'arte' | 'musica' | 'fotografia';
}
```

#### MusicItem

Extends `GalleryItem` for music content.

```typescript
interface MusicItem extends GalleryItem {
  category: 'musica';
  
  /** Audio file URL */
  audioUrl: string;
  
  /** Track duration in seconds */
  duration: number;
  
  /** Music genre */
  genre: string;
}
```

**Example**:

```typescript
const musicItem: MusicItem = {
  id: 1,
  title: 'Melodía Nocturna',
  artist: 'Carlos Mendoza',
  description: 'Una composición tranquila para piano y cuerdas',
  image: '/covers/melodia-nocturna.jpg',
  category: 'musica',
  audioUrl: '/audio/melodia-nocturna.mp3',
  duration: 245, // 4:05
  genre: 'Clásica',
};
```

#### FotografiaItem

Extends `GalleryItem` for photography.

```typescript
interface FotografiaItem extends GalleryItem {
  category: 'fotografia';
  
  /** Photo location */
  location: string;
  
  /** Camera model used */
  camera?: string;
  
  /** Image dimensions */
  dimensions: {
    width: number;
    height: number;
  };
}
```

---

### Contest (Concurso)

Represents a contest/competition.

```typescript
interface Contest {
  /** Unique identifier */
  id: number;
  
  /** Contest title */
  title: string;
  
  /** Contest description */
  description: string;
  
  /** Background image URL */
  backgroundImage: string;
  
  /** Contest status */
  status: 'active' | 'upcoming' | 'ended';
  
  /** Submission deadline */
  deadline: Date;
  
  /** Contest category */
  category: 'arte' | 'musica' | 'fotografia' | 'escritura' | 'codigo';
  
  /** Prize information */
  prize?: string;
  
  /** Number of participants */
  participants?: number;
}
```

**Example**:

```typescript
const contest: Contest = {
  id: 1,
  title: 'Concurso de Fotografía Urbana',
  description: 'Captura la esencia de la ciudad',
  backgroundImage: '/contests/urban-photo-bg.jpg',
  status: 'active',
  deadline: new Date('2026-02-28'),
  category: 'fotografia',
  prize: 'Cámara profesional + exposición',
  participants: 156,
};
```

---

### Collaboration

Represents a collaboration or project.

```typescript
interface Collaboration {
  /** Unique identifier */
  id?: number;
  
  /** Organization/project name */
  name: string;
  
  /** Project description */
  description: string;
  
  /** Logo URL */
  logo: string;
  
  /** Project URL */
  url?: string;
  
  /** Collaboration status */
  status?: 'active' | 'completed' | 'upcoming';
  
  /** Project technologies/skills */
  technologies?: string[];
  
  /** Number of collaborators */
  collaborators?: number;
}
```

**Example**:

```typescript
const collaboration: Collaboration = {
  id: 1,
  name: 'Empresa Alpha',
  description: 'Plataforma web escalable para gestión empresarial.',
  logo: '/logos/alpha.svg',
  url: 'https://alpha.example.com',
  status: 'active',
  technologies: ['React', 'Node.js', 'PostgreSQL'],
  collaborators: 8,
};
```

---

## 🔧 Utility Types

### Common Patterns

```typescript
/** ID type for entities */
type EntityId = number;

/** Generic pagination params */
interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

/** Generic API response wrapper */
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/** Generic filter params */
interface FilterParams {
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

---

## 🎨 UI Component Props Types

### Common Component Props

```typescript
/** Base props for all components */
interface BaseProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
}

/** Props for card-like components */
interface CardProps extends BaseProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href?: string;
}

/** Props for button components */
interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/** Props for form input components */
interface InputProps extends BaseProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
```

---

## 📊 Data Collections

### Category Types

```typescript
/** Valid gallery categories */
type GalleryCategory = 'arte' | 'musica' | 'fotografia';

/** Valid contest categories */
type ContestCategory = 'arte' | 'musica' | 'fotografia' | 'escritura' | 'codigo';

/** Valid talent roles */
type TalentRole = 
  | 'Fotógrafo'
  | 'Músico'
  | 'Artista Digital'
  | 'Desarrollador'
  | 'Escritor'
  | 'Diseñador'
  | 'Game Developer';
```

### Category Configuration

```typescript
interface CategoryConfig {
  /** Category identifier */
  id: GalleryCategory;
  
  /** Display label */
  label: string;
  
  /** Category items */
  items: GalleryItem[];
}
```

**Example**:

```typescript
const categories: CategoryConfig[] = [
  {
    id: 'arte',
    label: 'Arte',
    items: arteGallery,
  },
  {
    id: 'musica',
    label: 'Música',
    items: musicaGallery,
  },
  {
    id: 'fotografia',
    label: 'Fotografía',
    items: fotografiaGallery,
  },
];
```

---

## 🔍 Search and Filter Types

### Search Context

```typescript
interface SearchContext {
  /** Search query string */
  query: string;
  
  /** Active filters */
  filters: {
    category?: string;
    skills?: string[];
    rating?: number;
    featured?: boolean;
  };
  
  /** Sort configuration */
  sort: {
    field: string;
    order: 'asc' | 'desc';
  };
  
  /** Pagination */
  pagination: PaginationParams;
}
```

### Filter Options

```typescript
interface FilterOption {
  /** Option value */
  value: string;
  
  /** Display label */
  label: string;
  
  /** Number of items matching this filter */
  count?: number;
  
  /** Whether option is active */
  active?: boolean;
}
```

---

## 🖼️ Image Types

### Responsive Image Props

```typescript
interface ResponsiveImageProps {
  /** Image source (URL or ImageMetadata) */
  src: string | ImageMetadata;
  
  /** Alt text (required for accessibility) */
  alt: string;
  
  /** Responsive widths array */
  widths?: number[];
  
  /** Sizes attribute for responsive images */
  sizes?: string;
  
  /** Aspect ratio (e.g., "16 / 9") */
  aspectRatio?: string;
  
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
  
  /** Decode strategy */
  decoding?: 'async' | 'sync' | 'auto';
  
  /** Fetch priority */
  fetchpriority?: 'high' | 'low' | 'auto';
  
  /** CSS class */
  class?: string;
  
  /** Object fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  
  /** Image quality (0-100) */
  quality?: number;
}
```

---

## 📝 Form Types

### Form Field

```typescript
interface FormField<T = string> {
  /** Field name/id */
  name: string;
  
  /** Field label */
  label: string;
  
  /** Field value */
  value: T;
  
  /** Field type */
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  
  /** Whether field is required */
  required?: boolean;
  
  /** Validation rules */
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: T) => boolean;
  };
  
  /** Error message */
  error?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Placeholder */
  placeholder?: string;
}
```

### Form State

```typescript
interface FormState<T = Record<string, any>> {
  /** Form data */
  data: T;
  
  /** Form errors */
  errors: Record<keyof T, string | undefined>;
  
  /** Whether form is submitting */
  isSubmitting: boolean;
  
  /** Whether form is valid */
  isValid: boolean;
  
  /** Whether form has been modified */
  isDirty: boolean;
}
```

---

## 🎯 Event Handler Types

### Common Event Handlers

```typescript
/** Generic event handler */
type EventHandler<T = void> = (event: Event) => T;

/** Click event handler */
type ClickHandler = (event: MouseEvent) => void;

/** Form submit handler */
type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

/** Input change handler */
type ChangeHandler<T = string> = (value: T) => void;

/** Search handler */
type SearchHandler = (query: string) => void;

/** Filter handler */
type FilterHandler = (filters: Record<string, any>) => void;
```

---

## 📦 Export Pattern

### Data File Structure

```typescript
// src/data/talents.ts

/** Import types */
import type { Talent } from './types';

/** Export data array */
export const talents: Talent[] = [
  // Data here
];

/** Export helper functions if needed */
export function getTalentById(id: number): Talent | undefined {
  return talents.find((talent) => talent.id === id);
}

export function getTalentsBySkill(skill: string): Talent[] {
  return talents.filter((talent) => talent.skills.includes(skill));
}

/** Export constants */
export const TALENT_CATEGORIES = [
  'Fotografía',
  'Diseño',
  'Música',
  'Video',
  'Ilustración',
  '3D',
  'UI/UX',
] as const;
```

---

## 🔗 Related Documentation

- [Architecture Overview](../architecture/overview.md)
- [Component Guidelines](../components/README.md)
- [TypeScript Guidelines](../guides/typescript.md)

---

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

---

**Last Updated**: January 2026
