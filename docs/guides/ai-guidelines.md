# AI Development Guidelines

Guidelines for AI assistants (GitHub Copilot, Claude, ChatGPT, etc.) when working on Digital Revolution Web.

---

## 🎯 Purpose

This document helps AI assistants understand the project context, architecture decisions, and code generation patterns to produce high-quality, consistent code.

---

## 🏗️ Architecture Context

### Framework: Astro 5 + React 19 Islands

**Key Principle**: Static-first with selective hydration.

```
┌─────────────────────────────────┐
│   Static HTML (Astro)           │  ← Default
│   ├─ Header                     │
│   ├─ Hero                       │
│   ├─ Content Sections           │
│   └─ Footer                     │
│                                 │
│   Interactive Islands (React)   │  ← Only when needed
│   ├─ SearchBar (client:visible) │
│   ├─ Form (client:idle)         │
│   └─ Gallery (client:load)      │
└─────────────────────────────────┘
```

**Decision Rules for AI**:

1. **Is the component static (no user interaction)?**
   - YES → Generate `.astro` component
   - NO → Continue to #2

2. **Does it need client-side state or events?**
   - YES → Generate React component with appropriate hydration directive
   - NO → Generate `.astro` component

3. **When in doubt**: Choose `.astro` first, refactor to React only if proven necessary

---

## 📋 Code Generation Rules

### Rule 1: Always Define TypeScript Interfaces

```typescript
// ✅ ALWAYS do this
interface Props {
  title: string;
  description?: string;
  items: Array<{ id: number; name: string }>;
}

// ❌ NEVER do this
const { title, description, items } = Astro.props; // No types!
```

### Rule 2: Strict Type Safety

```typescript
// ❌ Avoid 'any'
function process(data: any) { }

// ✅ Use proper types
interface DataItem {
  id: number;
  value: string;
}

function process(data: DataItem[]) { }

// ⚠️ If 'any' is unavoidable, document why
// TODO: Replace with proper types when available (Issue #123)
const legacyAPI = externalLib() as any;
```

### Rule 3: Accessibility by Default

```astro
<!-- ✅ Always include accessibility attributes -->
<img src="/hero.jpg" alt="Team celebrating at Digital Revolution hackathon" />

<button aria-label="Close dialog" onclick="closeDialog()">
  <X size={24} />
</button>

<!-- ❌ Never omit accessibility -->
<img src="/hero.jpg" />
<button onclick="closeDialog()"><X /></button>
```

### Rule 4: Hydration Strategy

```astro
---
import InteractiveForm from '../components/InteractiveForm';
---

<!-- 
  Decision tree for hydration:
  1. Critical for initial render? → client:load
  2. Below the fold? → client:visible
  3. Non-critical? → client:idle
  4. Responsive? → client:media="(max-width: 768px)"
-->

<!-- ✅ Appropriate hydration -->
<InteractiveForm client:visible />

<!-- ❌ Over-hydration -->
<InteractiveForm client:load />  <!-- Only if truly critical! -->
```

### Rule 5: Mobile-First Responsive Design

```astro
<!-- ✅ Mobile-first with Tailwind -->
<div class="
  w-full
  p-4
  grid grid-cols-1
  gap-4
  md:grid-cols-2
  md:gap-6
  lg:grid-cols-3
  lg:gap-8
">
  {/* Content */}
</div>

<!-- ❌ Desktop-first (avoid) -->
<div class="grid-cols-3 lg:grid-cols-1">
```

---

## 🧩 Component Generation Patterns

### Pattern 1: Static Astro Component

**When to generate**: No client-side interactivity needed

```astro
---
/**
 * {{ComponentName}} Component
 * 
 * {{Brief description}}
 * 
 * @component
 */

interface Props {
  {{propName}}: {{propType}};
  {{optionalProp}}?: {{type}};
}

const { {{propName}}, {{optionalProp}} = {{default}} } = Astro.props;
---

<{{semanticElement}} class="{{tailwindClasses}}">
  <h2>{{{propName}}}</h2>
  {{{optionalProp}} && <p>{{{optionalProp}}}</p>}
  
  <slot />
</{{semanticElement}}>

<style>
  /* Component-specific styles if needed */
</style>
```

### Pattern 2: React Island Component

**When to generate**: Client-side interactivity required

```tsx
/**
 * {{ComponentName}} Component
 * 
 * {{Brief description}}
 * 
 * @component
 */

import { useState, useEffect } from 'react';
import { {{IconName}} } from 'lucide-react';

interface {{ComponentName}}Props {
  {{propName}}: {{propType}};
  {{optionalProp}}?: {{type}};
  {{handlerProp}}?: ({{param}}: {{type}}) => void;
}

export default function {{ComponentName}}({
  {{propName}},
  {{optionalProp}} = {{default}},
  {{handlerProp}},
}: {{ComponentName}}Props) {
  const [{{stateName}}, set{{StateName}}] = useState<{{type}}>({{initial}});
  
  const handle{{Action}} = ({{param}}: {{type}}) => {
    // Logic here
    {{handlerProp}}?.({{param}});
  };
  
  return (
    <div className="{{tailwindClasses}}">
      {/* Component JSX */}
    </div>
  );
}
```

### Pattern 3: Page Component

```astro
---
/**
 * {{PageName}} Page
 * 
 * {{Description}}
 */

import Layout from '../layouts/Layout.astro';
import {{ComponentName}} from '../components/{{ComponentName}}.astro';

// Fetch data if needed
const {{dataName}} = await fetch{{DataName}}();
---

<Layout
  title="{{PageTitle}} — Digital Revolution Web"
  description="{{SEO description under 160 characters}}"
  image="/og-{{pagename}}.jpg"
>
  <main>
    <{{ComponentName}} />
    {/* More components */}
  </main>
</Layout>
```

---

## 🎨 Styling Patterns

### Tailwind Utility Classes

```astro
<!-- ✅ Use Tailwind utilities -->
<button class="
  px-6 py-3
  bg-cyan-500 hover:bg-cyan-600
  text-white font-semibold
  rounded-lg
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-cyan-500
">
  {{Label}}
</button>

<!-- ❌ Avoid inline styles -->
<button style="background: #34dfde; padding: 1rem 1.5rem;">
  {{Label}}
</button>
```

### Brand Colors

When generating styles, use these CSS variables:

```css
/* Primary Brand Colors */
--color-brand-dark: #011822;
--color-brand-navy: #002b38;
--color-brand-background-global: #011822;

/* Accent Colors */
--color-accent-cyan: #34dfde;
--color-accent-orange: #f49624;

/* Tailwind classes */
.bg-brand-dark
.bg-brand-navy
.text-accent-cyan
.text-accent-orange
```

---

## 📊 Data Pattern

### Static Data with Types

```typescript
// Step 1: Define types (src/data/types.ts)
export interface {{EntityName}} {
  id: number;
  {{property}}: {{type}};
  {{optionalProperty}}?: {{type}};
}

// Step 2: Create data (src/data/{{entityName}}.ts)
import type { {{EntityName}} } from './types';

export const {{entityNamePlural}}: {{EntityName}}[] = [
  {
    id: 1,
    {{property}}: '{{value}}',
  },
  // More items...
];

// Step 3: Use in component
---
import { {{entityNamePlural}} } from '../data/{{entityName}}';
---

<div>
  {{{entityNamePlural}}.map(({{item}}) => (
    <{{Component}} key={{{item}}.id} {...{{item}}} />
  ))}
</div>
```

---

## 🔍 SEO Pattern

### Page-Level SEO

```astro
---
// Every page should define SEO metadata
---

<Layout
  title="{{Descriptive Page Title}} — Digital Revolution Web"
  description="{{SEO-optimized description, 120-160 characters}}"
  image="/og-{{page-slug}}.jpg"
>
  <!-- Page content -->
</Layout>
```

### SEO Checklist for AI

When generating a new page, ensure:

- [ ] Unique `title` (50-60 characters)
- [ ] Unique `description` (120-160 characters)
- [ ] OG image path specified
- [ ] One `<h1>` per page
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] All images have `alt` text
- [ ] Links have descriptive text (not "click here")

---

## 🚨 Common AI Generation Mistakes to Avoid

### Mistake 1: Generating React When Astro Would Work

```tsx
// ❌ AI might generate this
export default function StaticCard({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// ✅ Should generate this instead
---
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

### Mistake 2: Using `client:load` by Default

```astro
<!-- ❌ Over-hydration -->
<SearchBar client:load />
<Gallery client:load />
<Form client:load />

<!-- ✅ Appropriate hydration -->
<SearchBar client:visible />  <!-- Load when scrolled to -->
<Gallery client:idle />       <!-- Load after page is idle -->
<Form client:load />          <!-- Only if truly critical -->
```

### Mistake 3: Missing Accessibility

```astro
<!-- ❌ AI might forget accessibility -->
<button onclick="close()">
  <X />
</button>

<!-- ✅ Always include -->
<button onclick="close()" aria-label="Close modal">
  <X />
</button>
```

### Mistake 4: Not Handling Edge Cases

```tsx
// ❌ No error handling
function UserProfile({ userId }) {
  const user = fetchUser(userId);
  return <div>{user.name}</div>;
}

// ✅ Handle all states
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound />;
  
  return <div>{user.name}</div>;
}
```

---

## 📝 Commit Message Pattern

When suggesting commits, use Conventional Commits format:

```bash
# Format
{{type}}({{scope}}): {{description}}

# Examples
feat(components): add SearchBar component with autocomplete
fix(gallery): resolve image loading race condition
docs(api): update data models documentation
refactor(talents): optimize search algorithm
style(ui): improve button hover states
perf(images): lazy load below-fold images
test(utils): add unit tests for date formatter
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## 🧪 Testing Pattern

When generating components, suggest tests:

```typescript
// Component: src/components/Card.astro
// Test: tests/components/Card.test.ts

import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Card from '../../src/components/Card.astro';

test('Card renders with title and description', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    props: {
      title: 'Test Title',
      description: 'Test Description',
    },
  });
  
  expect(result).toContain('Test Title');
  expect(result).toContain('Test Description');
});
```

---

## 🎓 Learning from Codebase

### Before Generating Code

1. **Search for similar components**:
   - Look for existing patterns in `src/components/`
   - Check `src/pages/` for page structure examples
   - Review `src/data/` for data modeling patterns

2. **Check existing implementations**:
   - How are forms handled?
   - What hydration directives are used?
   - How is data fetched and passed?

3. **Follow established patterns**:
   - If the project uses a specific pattern, continue using it
   - Don't introduce new patterns without reason

### Example: Learning from Existing Code

```astro
<!-- Found in src/components/talents/TalentsSearch.astro -->
<TalentSearch client:only="react" />

<!-- AI should learn: -->
<!-- - Complex search UIs use client:only -->
<!-- - React components are in src/components/talents/ -->
<!-- - Wrapper components are .astro, logic is .tsx -->
```

---

## 🔗 Quick Reference Links

- [Architecture Overview](../architecture/overview.md)
- [Component Guidelines](../components/README.md)
- [Coding Standards](./coding-standards.md)
- [TypeScript Patterns](./typescript.md)

---

## 💡 Tips for AI Assistants

1. **When unsure**: Ask clarifying questions rather than assuming
2. **Prefer simple**: Choose the simpler solution when multiple options exist
3. **Follow existing patterns**: Consistency is more important than "perfect" code
4. **Think about users**: Consider accessibility, performance, and UX in every suggestion
5. **Document decisions**: Explain why you chose a particular approach

---

**This guide is for AI assistants to generate high-quality, consistent code for Digital Revolution Web.**

**Last Updated**: January 2026
