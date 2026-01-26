# Developer Workflow Guide

## Quick Start

```powershell
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm type-check

# Format code
pnpm format

# Validate everything
pnpm validate
```

## Available Scripts

| Script              | Description                                         |
| ------------------- | --------------------------------------------------- |
| `pnpm dev`          | Start Astro dev server at http://localhost:4321     |
| `pnpm build`        | Build for production (output: `dist/`)              |
| `pnpm preview`      | Preview production build locally                    |
| `pnpm type-check`   | Run `astro sync` + `tsc --noEmit` for type checking |
| `pnpm check`        | Run `astro check` for Astro-specific diagnostics    |
| `pnpm validate`     | Run format check + type check + astro check         |
| `pnpm format`       | Auto-format code with Prettier                      |
| `pnpm format:check` | Check code formatting without modifying             |

## Content Collections Workflow

### Adding New Talent Profiles

1. **Create JSON file** in `src/content/talents/`:

```json
{
  "name": "Your Name",
  "role": "Developer",
  "location": "Havana, Cuba",
  "image": "https://example.com/photo.jpg",
  "communityRole": "Full Stack Developer",
  "status": "activo",
  "rating": 4.8,
  "followers": 1250,
  "views": 5420,
  "skills": ["TypeScript", "React", "Astro"],
  "currentFocus": "Building web experiences",
  "recentActivity": [
    "Published article on performance",
    "Contributed to open source"
  ],
  "externalLink": "https://github.com/yourname",
  "featured": false
}
```

2. **Regenerate types**:

```powershell
pnpm exec astro sync
```

3. **Restart TypeScript server** in VS Code:
   - Press `Ctrl+Shift+P`
   - Type "TypeScript: Restart TS Server"
   - Select and execute

4. **Verify**:

```powershell
pnpm type-check
pnpm build
```

### Schema Validation

The schema is defined in `src/content/config.ts`:

```typescript
export const collections = {
  talents: defineCollection({
    type: 'data',
    schema: z.object({
      name: z.string(),
      role: z.string(),
      image: z.string().url(),
      // ... more fields
    }),
  }),
};
```

All fields are validated automatically. Invalid data causes build errors.

### Fetching Content: Best Practices

**✅ Recommended Pattern (Dynamic Pages):**

```astro
---
// src/pages/perfiles/[slug].astro
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const talents = await getCollection('talents');
  return talents.map((entry) => ({
    params: { slug: entry.id },
    // No props - fetch per-page with getEntry()
  }));
}

const { slug } = Astro.params;
const entry = await getEntry('talents', slug);

if (!entry) {
  return Astro.redirect('/talentos');
}
---
```

**Benefits:**

- Stronger TypeScript typing
- No props serialization overhead
- Cleaner separation of concerns

**✅ Recommended Pattern (Listing Pages):**

```astro
---
// src/pages/talentos/index.astro
import { getCollection } from 'astro:content';

const allTalents = await getCollection('talents');
---
```

**❌ Avoid (Legacy Props Pattern):**

```astro
---
// Don't use props for passing entries
export async function getStaticPaths() {
  const talents = await getCollection('talents');
  return talents.map((entry) => ({
    params: { slug: entry.id },
    props: { entry }, // ❌ Serializes entire entry
  }));
}

const { entry } = Astro.props; // ❌ Weaker typing
---
```

## Type Safety

### TypeScript Configuration

The project uses strict TypeScript settings:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Generated Types

Astro automatically generates types in `.astro/types.d.ts` and `.astro/content.d.ts`.

**Important:** Ensure `src/env.d.ts` includes:

```typescript
/// <reference types="astro/client" />
import 'astro:content';
```

### Type Utilities

```typescript
import type { CollectionEntry } from 'astro:content';

// Type for a single entry
type Talent = CollectionEntry<'talents'>;

// Type for entry data
type TalentData = Talent['data'];
```

## Pre-commit Hooks

Husky runs automatic checks before each commit:

1. **Format Check** (`pnpm format:check`)
   - Fails if code is not formatted
   - Fix: Run `pnpm format`

2. **Astro Check** (`pnpm check`)
   - Fails if TypeScript/Astro errors exist
   - Fix: Address errors in terminal output

**Skip hooks (not recommended):**

```powershell
git commit --no-verify -m "message"
```

## Troubleshooting

### TypeScript Shows Errors but Build Succeeds

**Cause:** VS Code TypeScript server not using generated types.

**Solution:**

1. Regenerate types:

```powershell
pnpm exec astro sync
```

2. Restart TS server:
   - `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

3. Verify `src/env.d.ts`:

```typescript
/// <reference types="astro/client" />
import 'astro:content';
```

### Content Collection Changes Not Reflected

**Solution:**

```powershell
# Regenerate content types
pnpm exec astro sync

# Restart dev server
# Ctrl+C, then pnpm dev
```

### Husky Hook Fails

**Format errors:**

```powershell
pnpm format
git add .
git commit -m "message"
```

**Type errors:**

```powershell
pnpm check
# Fix reported issues
git commit -m "message"
```

### Build Fails Locally but CI Passes

**Cause:** Local cache or node_modules corruption.

**Solution:**

```powershell
# Clean install
Remove-Item -Recurse -Force node_modules, dist, .astro
pnpm install
pnpm build
```

## Performance Optimization

### Development

- Use `client:load`, `client:visible`, or `client:idle` for React islands
- Avoid `client:only` unless necessary
- Prefer static rendering when possible

### Production

```powershell
# Build with optimizations
pnpm build

# Preview production build
pnpm preview
```

Astro automatically optimizes:

- CSS/JS minification (terser)
- Image optimization (sharp)
- HTML compression (astro-compress)

## CI/CD Integration

Recommended pipeline:

```yaml
- name: Install
  run: pnpm install --frozen-lockfile

- name: Format Check
  run: pnpm format:check

- name: Type Check
  run: pnpm type-check

- name: Astro Check
  run: pnpm check

- name: Build
  run: pnpm build
```

## Resources

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [TypeScript in Astro](https://docs.astro.build/en/guides/typescript/)
- [Project Structure](../architecture/project-structure.md)
- [Coding Standards](../guides/coding-standards.md)
