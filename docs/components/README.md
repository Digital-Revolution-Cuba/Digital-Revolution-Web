# Component Guidelines

Guidelines for creating and maintaining components in Digital Revolution Web.

---

## 🎯 Component Philosophy

### Core Principles

1. **Static by Default**: Use `.astro` components unless interactivity is required
2. **Minimal JavaScript**: Only hydrate what's necessary
3. **Type Safety**: Always define TypeScript interfaces for props
4. **Composability**: Build small, reusable components
5. **Accessibility**: Follow WCAG 2.1 AA standards

---

## 📦 Component Types

### 1. Astro Components (`.astro`)

**When to use**:
- Static content (text, images, layout)
- No client-side interactivity needed
- Server-side rendering is sufficient

**Example**:

```astro
---
// src/components/Card.astro
interface Props {
  title: string;
  description: string;
  imageUrl?: string;
  href?: string;
}

const { title, description, imageUrl, href } = Astro.props;
---

<article class="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
  {imageUrl && (
    <img 
      src={imageUrl} 
      alt={title}
      class="w-full h-48 object-cover rounded-md mb-4"
    />
  )}
  
  <h3 class="text-xl font-bold mb-2">{title}</h3>
  <p class="text-gray-600 mb-4">{description}</p>
  
  {href && (
    <a 
      href={href} 
      class="text-cyan-500 hover:text-cyan-600 font-medium"
    >
      Learn More →
    </a>
  )}
</article>
```

### 2. React Islands (`.tsx`)

**When to use**:
- Client-side interactivity (clicks, form inputs, state)
- Real-time updates
- Complex user interactions

**Example**:

```tsx
// src/components/interactive/SearchBar.tsx
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = 'Search...', 
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
      />
    </form>
  );
}
```

**Usage in Astro**:

```astro
---
import SearchBar from '../components/interactive/SearchBar';
---

<div>
  <h2>Find Talents</h2>
  <!-- Hydrate only when visible -->
  <SearchBar client:visible placeholder="Search by name or skill..." />
</div>
```

---

## 🧩 Component Structure

### Recommended File Organization

```
src/components/
├── layout/              # Layout components
│   ├── Header.astro
│   ├── Footer.astro
│   └── Sidebar.astro
│
├── ui/                  # Reusable UI components
│   ├── Button.astro
│   ├── Card.astro
│   ├── Badge.astro
│   └── Modal.astro
│
├── sections/            # Page sections
│   ├── Hero.astro
│   ├── Features.astro
│   └── CallToAction.astro
│
├── interactive/         # React islands
│   ├── SearchBar.tsx
│   ├── Counter.tsx
│   └── Form.tsx
│
└── domain-specific/     # Feature-specific
    ├── gallery/
    ├── talents/
    └── concursos/
```

---

## 🎨 Styling Patterns

### 1. Tailwind Utilities (Preferred)

```astro
<button class="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
  Click Me
</button>
```

### 2. Scoped Styles

```astro
<div class="custom-card">
  <h3>Title</h3>
</div>

<style>
  .custom-card {
    background: linear-gradient(135deg, var(--color-brand-navy), var(--color-brand-dark));
    padding: 2rem;
    border-radius: 1rem;
  }
  
  .custom-card h3 {
    color: var(--color-accent-cyan);
    font-size: 1.5rem;
  }
</style>
```

### 3. Global Classes

For reusable patterns, define in `src/styles/global.css`:

```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold;
    @apply hover:bg-cyan-600 transition-colors;
  }
}
```

---

## 🔌 Hydration Directives

### Available Directives

| Directive | Behavior | Use Case |
|-----------|----------|----------|
| `client:load` | Hydrate immediately on page load | Critical interactive UI |
| `client:idle` | Hydrate after page becomes idle | Non-critical features |
| `client:visible` | Hydrate when scrolled into view | Below-the-fold content |
| `client:media` | Hydrate based on media query | Responsive components |
| `client:only` | Skip SSR, render only on client | CSR-only libraries |

### Decision Tree

```
Does the component need interactivity?
│
├─ NO  → Use .astro component
│
└─ YES → Use React component
         │
         ├─ Is it critical for initial render?
         │  └─ YES → client:load
         │
         ├─ Is it below the fold?
         │  └─ YES → client:visible
         │
         ├─ Is it for specific screen sizes?
         │  └─ YES → client:media
         │
         └─ Default → client:idle
```

### Example Usage

```astro
---
import SearchBar from './SearchBar';
import Newsletter from './Newsletter';
import MobileMenu from './MobileMenu';
---

<!-- Critical: Load immediately -->
<SearchBar client:load />

<!-- Non-critical: Load when idle -->
<Newsletter client:idle />

<!-- Mobile only: Load on small screens -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Below fold: Load when visible -->
<TalentGallery client:visible />
```

---

## ♿ Accessibility Guidelines

### Semantic HTML

```astro
<!-- ❌ Bad: Using divs for everything -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- ✅ Good: Semantic elements -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
```

### ARIA Attributes

```astro
<!-- Icon button: Add aria-label -->
<button aria-label="Close modal" class="p-2">
  <X size={24} />
</button>

<!-- Decorative images: Use alt="" -->
<img src="/decoration.svg" alt="" role="presentation" />

<!-- Meaningful images: Descriptive alt -->
<img src="/team.jpg" alt="Digital Revolution team at hackathon 2025" />
```

### Keyboard Navigation

```tsx
// Ensure interactive elements are focusable
<button 
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Action
</button>
```

### Color Contrast

Ensure text meets WCAG AA standards (4.5:1 for normal text):

```css
/* ✅ Good: High contrast */
.text-primary {
  color: #ffffff; /* White */
  background: #002b38; /* Navy */
  /* Contrast ratio: 14.7:1 */
}

/* ❌ Bad: Low contrast */
.text-bad {
  color: #888888; /* Gray */
  background: #999999; /* Light gray */
  /* Contrast ratio: 1.4:1 - FAILS */
}
```

---

## 📐 Props Interface Pattern

### Required vs Optional Props

```typescript
interface ComponentProps {
  // Required props (no default)
  title: string;
  id: number;
  
  // Optional props (with ?)
  description?: string;
  imageUrl?: string;
  
  // Optional with default value
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const { 
  title, 
  id,
  description,
  imageUrl,
  variant = 'primary',
  size = 'md'
} = Astro.props;
```

### Complex Props

```typescript
interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  onItemClick?: (item: GalleryItem) => void;
}
```

---

## 🧪 Component Testing

### Testing Astro Components

```typescript
// tests/components/Card.test.ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Card from '../../src/components/Card.astro';

test('Card renders title and description', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    props: {
      title: 'Test Title',
      description: 'Test Description'
    }
  });
  
  expect(result).toContain('Test Title');
  expect(result).toContain('Test Description');
});
```

### Testing React Components

```typescript
// tests/components/SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SearchBar from '../../src/components/interactive/SearchBar';

test('SearchBar calls onSearch when submitted', () => {
  const handleSearch = vi.fn();
  render(<SearchBar onSearch={handleSearch} />);
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test query' } });
  fireEvent.submit(input.closest('form')!);
  
  expect(handleSearch).toHaveBeenCalledWith('test query');
});
```

---

## 📝 Documentation Comments

### Component Header Documentation

```astro
---
/**
 * Card Component
 * 
 * A reusable card component for displaying content with optional image, title, and description.
 * 
 * @component
 * @example
 * ```astro
 * <Card 
 *   title="My Card" 
 *   description="Card description"
 *   imageUrl="/image.jpg"
 *   href="/learn-more"
 * />
 * ```
 */

interface Props {
  /** Card title (required) */
  title: string;
  /** Card description text */
  description: string;
  /** Optional image URL */
  imageUrl?: string;
  /** Optional link destination */
  href?: string;
}

const { title, description, imageUrl, href } = Astro.props;
---
```

---

## 🚫 Anti-Patterns to Avoid

### 1. Using React for Static Content

```tsx
// ❌ Bad: Unnecessary React component
export default function StaticCard({ title, description }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

```astro
---
// ✅ Good: Astro component
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---

<div>
  <h3>{title}</h3>
  <p>{description}</p>
</div>
```

### 2. Over-Hydration

```astro
<!-- ❌ Bad: Hydrating everything -->
<Header client:load />
<Hero client:load />
<Features client:load />

<!-- ✅ Good: Minimal hydration -->
<Header />  <!-- Static -->
<Hero />    <!-- Static -->
<InteractiveForm client:visible />  <!-- Only this needs JS -->
```

### 3. Inline Styles

```astro
<!-- ❌ Bad: Inline styles -->
<div style="background: #002b38; padding: 20px; border-radius: 8px;">
  Content
</div>

<!-- ✅ Good: Utility classes -->
<div class="bg-brand-navy p-5 rounded-lg">
  Content
</div>
```

---

## 📚 Component Examples

See the following for complete component examples:

- [Astro Components](./astro-components.md)
- [React Islands](./react-islands.md)
- [Styling Patterns](./styling.md)

---

## 🔗 Related Documentation

- [Architecture Overview](../architecture/overview.md)
- [Coding Standards](../guides/coding-standards.md)
- [TypeScript Guidelines](../guides/typescript.md)

---

**Last Updated**: January 2026
