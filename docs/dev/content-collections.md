# Content Collections Quick Reference

## Overview

Digital Revolution uses Astro Content Collections for type-safe content management.

## Collection Structure

```
src/content/
├── config.ts          # Schema definitions
└── talents/           # Talent profiles (JSON)
    ├── elena-kovac.json
    ├── julian-velez.json
    ├── marcus-thorne.json
    ├── sofia-chen.json
    └── maria-garcia.json
```

## Schema Definition

Located in `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

export const collections = {
  talents: defineCollection({
    type: 'data',
    schema: z.object({
      // Required fields
      name: z.string(),
      role: z.string(),
      image: z.string().url(),

      // Optional fields with defaults
      location: z.string().default(''),
      communityRole: z.string().optional(),
      status: z.enum(['core', 'activo', 'colaborador']).default('colaborador'),

      // Numeric fields
      rating: z.number().min(0).max(5).default(0),
      followers: z.number().int().nonnegative().default(0),
      views: z.number().int().nonnegative().default(0),

      // Arrays
      skills: z.array(z.string()).default([]),
      recentActivity: z.array(z.string()).default([]),

      // Optional fields
      currentFocus: z.string().optional(),
      externalLink: z.string().url().optional().or(z.literal('')),
      featured: z.boolean().default(false),
    }),
  }),
};
```

## Fetching Content

### List All Entries

```astro
---
import { getCollection } from 'astro:content';

// Get all talents
const allTalents = await getCollection('talents');

// Filter talents
const activeTalents = await getCollection('talents', ({ data }) => {
  return data.status === 'activo';
});

// Sort talents
const sortedTalents = allTalents.sort((a, b) => b.data.rating - a.data.rating);
---

<ul>
  {
    allTalents.map((talent) => (
      <li>
        <a href={`/perfiles/${talent.id}`}>{talent.data.name}</a>
      </li>
    ))
  }
</ul>
```

### Get Single Entry (Dynamic Pages)

```astro
---
// src/pages/perfiles/[slug].astro
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const talents = await getCollection('talents');
  return talents.map((entry) => ({
    params: { slug: entry.id },
  }));
}

const { slug } = Astro.params;
const entry = await getEntry('talents', slug);

if (!entry) {
  return Astro.redirect('/talentos');
}

const { name, role, image, skills } = entry.data;
---

<article>
  <h1>{name}</h1>
  <p>{role}</p>
  <img src={image} alt={name} />
  <ul>
    {skills.map((skill) => <li>{skill}</li>)}
  </ul>
</article>
```

## Type Safety

### Import Types

```typescript
import type { CollectionEntry } from 'astro:content';

// Type for entire entry
type Talent = CollectionEntry<'talents'>;

// Type for entry data only
type TalentData = CollectionEntry<'talents'>['data'];

// Type for entry ID
type TalentId = CollectionEntry<'talents'>['id'];
```

### Use in Components

```astro
---
// TalentCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  talent: CollectionEntry<'talents'>;
}

const { talent } = Astro.props;
const { name, role, image } = talent.data;
---

<div class="card">
  <img src={image} alt={name} />
  <h3>{name}</h3>
  <p>{role}</p>
</div>
```

### React Components

```tsx
// TalentsGrid.tsx
import type { CollectionEntry } from 'astro:content';

interface Props {
  talents: CollectionEntry<'talents'>[];
}

export function TalentsGrid({ talents }: Props) {
  return (
    <div className="grid">
      {talents.map((talent) => (
        <div key={talent.id}>
          <h3>{talent.data.name}</h3>
          <p>{talent.data.role}</p>
        </div>
      ))}
    </div>
  );
}
```

## Workflow

### 1. Add New Entry

Create `src/content/talents/new-talent.json`:

```json
{
  "name": "New Talent",
  "role": "Developer",
  "location": "Havana, Cuba",
  "image": "https://example.com/photo.jpg",
  "communityRole": "Software Engineer",
  "status": "activo",
  "rating": 4.5,
  "followers": 500,
  "views": 2000,
  "skills": ["JavaScript", "TypeScript", "Astro"],
  "currentFocus": "Building modern web apps",
  "recentActivity": ["Completed new project", "Published blog post"],
  "externalLink": "https://github.com/newtalent",
  "featured": false
}
```

### 2. Regenerate Types

```powershell
pnpm exec astro sync
```

### 3. Restart TypeScript Server

In VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### 4. Verify

```powershell
pnpm type-check
pnpm build
```

The new profile will be available at `/perfiles/new-talent/`.

## Schema Modification

### Update Schema

Edit `src/content/config.ts`:

```typescript
export const collections = {
  talents: defineCollection({
    type: 'data',
    schema: z.object({
      // Add new field
      bio: z.string().optional(),

      // Modify existing field
      rating: z.number().min(0).max(5).default(4.0),

      // Remove field (just delete the line)
    }),
  }),
};
```

### Update Existing Content

Update all JSON files to match new schema:

```json
{
  "name": "Talent Name",
  "bio": "New bio field",
  "rating": 4.8
}
```

### Regenerate & Test

```powershell
pnpm exec astro sync
pnpm type-check
pnpm build
```

## Validation Rules

| Type     | Validation                | Example                 |
| -------- | ------------------------- | ----------------------- |
| String   | `.string()`               | `"text"`                |
| URL      | `.string().url()`         | `"https://example.com"` |
| Number   | `.number()`               | `42`                    |
| Integer  | `.number().int()`         | `10`                    |
| Range    | `.number().min(0).max(5)` | `4.5`                   |
| Enum     | `.enum(['a', 'b'])`       | `"a"`                   |
| Array    | `.array(z.string())`      | `["item1", "item2"]`    |
| Boolean  | `.boolean()`              | `true`                  |
| Optional | `.optional()`             | `undefined` or value    |
| Default  | `.default(value)`         | Uses value if missing   |

## Common Patterns

### Filter by Status

```astro
---
const coreTeam = await getCollection(
  'talents',
  ({ data }) => data.status === 'core',
);
---
```

### Sort by Rating

```astro
---
const allTalents = await getCollection('talents');
const topRated = allTalents.sort((a, b) => b.data.rating - a.data.rating);
---
```

### Featured Talents

```astro
---
const featured = await getCollection(
  'talents',
  ({ data }) => data.featured === true,
);
---
```

### Search by Skill

```astro
---
const reactDevs = await getCollection('talents', ({ data }) =>
  data.skills.includes('React'),
);
---
```

## Error Handling

### Invalid Schema

```
Error: "talents" → "name" Expected string, received number
```

**Fix:** Ensure JSON matches schema types.

### Missing Required Field

```
Error: "talents" → "image" Required
```

**Fix:** Add missing field to JSON.

### Invalid URL

```
Error: "talents" → "image" Invalid url
```

**Fix:** Use valid URL format: `https://example.com/image.jpg`

## Performance Tips

1. **Use `getCollection()` for listings** - Fetches all entries efficiently
2. **Use `getEntry()` for dynamic pages** - Fetches single entry on-demand
3. **Filter in `getCollection()`** - Server-side filtering is faster
4. **Cache results** - Astro caches collection queries automatically

## Resources

- [Astro Content Collections Docs](https://docs.astro.build/en/guides/content-collections/)
- [Zod Validation](https://zod.dev/)
- [TypeScript Guide](https://docs.astro.build/en/guides/typescript/)
