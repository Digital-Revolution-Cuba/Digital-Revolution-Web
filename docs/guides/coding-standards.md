# Coding Standards

Code quality standards and best practices for Digital Revolution Web.

---

## 🎯 General Principles

1. **Readability over Cleverness**: Write code that's easy to understand
2. **Consistency**: Follow established patterns in the codebase
3. **Type Safety**: Leverage TypeScript's type system fully
4. **Performance**: Consider bundle size and runtime performance
5. **Accessibility**: Build for all users

---

## 📝 Code Style

### Formatting

We use **Prettier** for automatic code formatting:

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

Configuration (`.prettierrc`):

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

### Naming Conventions

```astro
---
// Example simplified Astro component structure
// Keep the component focused on markup, props and styles
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<article class="card">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
  <slot />
</article>
```

### Presentational Components & Client Initializers (Recommended)

Keep Astro components focused on markup and style. Move DOM wiring and event listeners
to `src/client/initializers/` and pure logic to `src/composables/`. This keeps components
small and testable.

Example:

1. `src/components/MyGallery.astro` — markup + styles only
1. `src/composables/useGallerySlider.ts` — slider logic
1. `src/client/initializers/gallery.ts` — finds DOM nodes and calls the composable

Include the initializer in the page or `Layout` via:

```astro
<script type="module" src="/src/client/initializers/gallery.ts"></script>
```

interface User {
id: number;
name: string;
}

interface CardProps {
title: string;
description: string;
}

interface TalentSearchProps {
placeholder?: string;
onSearch?: (query: string) => void;
}

// Type aliases: PascalCase
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

// Enums: PascalCase for name, UPPER_CASE for values
enum UserRole {
ADMIN = 'ADMIN',
EDITOR = 'EDITOR',
VIEWER = 'VIEWER',
}

````

#### CSS Classes

```css
/* Utility classes: kebab-case (Tailwind) */
.bg-brand-navy
.text-accent-cyan
.hover:bg-cyan-600

/* Custom classes: kebab-case */
.custom-card
.hero-section
.gallery-grid

/* BEM pattern (when needed) */
.card__title
.card__description
.card--featured
````

---

## 🔧 TypeScript Standards

### Strict Mode

Always use TypeScript strict mode (enabled in `tsconfig.json`):

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Avoid `any`

```typescript
// ❌ Bad: Using any
function processData(data: any) {
  return data.map((item: any) => item.name);
}

// ✅ Good: Proper types
interface DataItem {
  name: string;
  id: number;
### Naming Conventions

}

function processData(data: DataItem[]): string[] {
  return data.map((item) => item.name);
}

// ⚠️ Acceptable: External untyped library (document why)
// TODO: Add proper types when @types/legacy-lib becomes available
const externalTool = require('legacy-lib') as any;
```

### Props Interfaces

```typescript
// ✅ Always define Props interface for components
interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  variant?: 'default' | 'featured';
}

// Destructure with defaults
const { title, description, imageUrl, variant = 'default' } = Astro.props;
```

### Type Guards

```typescript
// Use type guards for narrowing
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Use in code
function processValue(value: unknown) {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript knows it's a string
  }
  return '';
}
```

---

## 🧩 Component Patterns

### Astro Component Structure

````astro
---
/**
 * Component documentation here
 */

// 1. Imports
import { Image } from 'astro:assets';
import Button from './Button.astro';

// 2. Type definitions
interface Props {
  title: string;
  description?: string;
}

// 3. Props destructuring
const { title, description } = Astro.props;

// 4. Logic and data processing
const processedTitle = title.toUpperCase();
const hasDescription = Boolean(description);

// 5. Helper functions (if needed)
function formatText(text: string): string {
  return text.trim();
}
---

<!-- 6. Template -->
<article class="card">
  <h2>{processedTitle}</h2>
  {hasDescription && <p>{description}</p>}

  <slot />
</article>

<!-- 7. Scoped styles (if needed) -->
<style>
  .card {
    /* Styles here */
  }
</style>

<!-- 8. Scripts (if needed) -->
<script>
  // Client-side JavaScript
</script>

### Presentational Components & Client Initializers (Recommended) Keep Astro
components focused on markup and style. Move DOM wiring and event listeners to
`src/client/initializers/` and pure logic to `src/composables/`. This keeps
components small and testable. Example: 1. `src/components/MyGallery.astro` —
markup + styles only 2. `src/composables/useGallerySlider.ts` — slider logic 3.
`src/client/initializers/gallery.ts` — finds DOM nodes and calls the composable
Include the initializer in the page or `Layout` via: ```astro
<script type="module" src="/src/client/initializers/gallery.ts"></script>
````

````

### React Component Structure

```tsx
// 1. Imports
import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';

// 2. Type definitions
interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
}

// 3. Component definition
export default function SearchBar({
  placeholder = 'Search...',
  initialValue = '',
  onSearch,
}: SearchBarProps) {
  // 4. State
  const [query, setQuery] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);

  // 5. Computed values
  const hasQuery = useMemo(() => query.length > 0, [query]);

  // 6. Effects
  useEffect(() => {
    if (hasQuery) {
      onSearch?.(query);
    }
  }, [query, hasQuery, onSearch]);

  // 7. Event handlers
  const handleClear = () => {
    setQuery('');
    setIsActive(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  // 8. Render
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border rounded-lg"
      />
      {hasQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </form>
  );
}
````

---

## 📦 Import Organization

### Import Order

```typescript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

// 2. Astro imports
import { Image } from 'astro:assets';

// 3. Internal components
import Header from '../components/Header.astro';
import Button from '../components/ui/Button.astro';

// 4. Internal utilities
import { formatDate } from '../utils/dateFormatter';
import { API_URL } from '../config/constants';

// 5. Data and types
import { talents } from '../data/talents';
import type { Talent } from '../data/types';

// 6. Styles (if needed)
import '../styles/custom.css';

// 7. Assets
import heroImage from '../assets/hero.jpg';
```

### Named vs Default Exports

```typescript
// ✅ Prefer named exports for utilities
export function formatDate(date: Date): string {}
export function calculateTotal(items: number[]): number {}

// ✅ Use default exports for components
export default function SearchBar() {}

// ✅ Named exports for types
export interface User {}
export type Status = 'active' | 'inactive';
```

---

## 💬 Comments and Documentation

### When to Comment

```typescript
// ✅ Good: Explaining WHY, not WHAT
// Using setTimeout to avoid race condition with third-party library
setTimeout(() => initializePlayer(), 100);

// ❌ Bad: Stating the obvious
// Set the name to 'John'
const name = 'John';

// ✅ Good: Complex logic explanation
// Calculate discount based on user tier and total purchase amount
// Tier 1: 10%, Tier 2: 15%, Tier 3: 20%
// Applies only to purchases over $100
const discount = calculateDiscount(user.tier, totalAmount);
```

### TODO Comments

```typescript
// TODO: Implement caching layer (Issue #123)
// TODO: Add error handling for network failures
// TODO: Refactor to use Astro Content Collections (Sprint 5)
// TODO: Add unit tests (@john_dev)

// FIX: Memory leak in gallery slider (Issue #456)
// FIX: Race condition on rapid clicks
```

### Documentation Comments

````typescript
/**
 * Formats a date according to the specified locale and options.
 *
 * @param date - The date to format
 * @param locale - The locale to use (default: 'es-ES')
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * formatDate(new Date(), 'es-ES', { dateStyle: 'long' })
 * // Returns: "23 de enero de 2026"
 * ```
 */
export function formatDate(
  date: Date,
  locale: string = 'es-ES',
  options: Intl.DateTimeFormatOptions = {},
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
````

---

## 🎨 CSS/Tailwind Standards

### Utility-First Approach

```astro
<!-- ✅ Good: Tailwind utilities -->
<button
  class="rounded-lg bg-cyan-500 px-6 py-3 text-white transition-colors hover:bg-cyan-600"
>
  Click Me
</button>

<!-- ❌ Avoid: Inline styles -->
<button style="background: #34dfde; padding: 12px 24px;"> Click Me </button>
```

### Responsive Design

```astro
<!-- Mobile-first approach -->
<div
  class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
>
  <!-- Items -->
</div>
```

### Custom Classes

```css
/* Define reusable patterns in global.css */
@layer components {
  .btn-primary {
    @apply rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white;
    @apply transition-colors hover:bg-cyan-600 active:bg-cyan-700;
    @apply focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none;
  }

  .card-gradient {
    @apply from-brand-navy to-brand-dark bg-gradient-to-br;
    @apply rounded-xl p-6 shadow-xl;
  }
}
```

---

## 🔍 Code Review Checklist

### Before Submitting PR

- [ ] Code follows naming conventions
- [ ] TypeScript types are defined (no `any`)
- [ ] Components have proper Props interfaces
- [ ] Accessibility attributes are present (alt, aria-label)
- [ ] Code is formatted with Prettier
- [ ] No console.log statements (use proper logging)
- [ ] Imports are organized
- [ ] Comments explain WHY, not WHAT
- [ ] No unused variables or imports
- [ ] Performance considerations (bundle size, hydration)

### Reviewing Code

- [ ] Logic is clear and understandable
- [ ] Edge cases are handled
- [ ] Error handling is present
- [ ] No security vulnerabilities
- [ ] Follows project architecture
- [ ] Tests are included (if applicable)

---

## 🚫 Common Mistakes to Avoid

### 1. Not Using TypeScript Properly

```typescript
// ❌ Bad
function processUser(user: any) {
  return user.name;
}

// ✅ Good
interface User {
  name: string;
  id: number;
}

function processUser(user: User): string {
  return user.name;
}
```

### 2. Over-Hydrating Components

```astro
<!-- ❌ Bad: Unnecessary client:load -->
<StaticHeader client:load />

<!-- ✅ Good: Static by default -->
<StaticHeader />
```

### 3. Ignoring Accessibility

```astro
<!-- ❌ Bad: No alt text -->
<img src="/image.jpg" />
<button><X /></button>

<!-- ✅ Good: Proper accessibility -->
<img src="/image.jpg" alt="Description of image" />
<button aria-label="Close modal"><X /></button>
```

### 4. Not Handling Loading States

```tsx
// ❌ Bad: No loading state
function DataDisplay({ data }) {
  return (
    <div>
      {data.map((item) => (
        <Item {...item} />
      ))}
    </div>
  );
}

// ✅ Good: Handle loading and error states
function DataDisplay({ data, isLoading, error }) {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState />;

  return (
    <div>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
```

---

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Astro Documentation](https://docs.astro.build/)
- [React Best Practices](https://react.dev/learn)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Last Updated**: January 2026
