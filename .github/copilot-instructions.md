---
description: 'Repository context for Copilot AI — tech stack, standards, rules'
---

# GitHub Copilot Instructions: Digital-Revolution-Web

**Location:** `.github/copilot-instructions.md`  
**Purpose:** Guide Copilot's code suggestions for a high-performance, high-conversion landing-page/portfolio built with Astro 5.0 + React 19 (Islands architecture). All suggestions must respect the performance, accessibility, and type-safety constraints below.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture & Patterns](#architecture-patterns)
4. [Coding Standards](#coding-standards)
5. [Do's and Don'ts](#dos-and-donts)
6. [Build & Validation Commands](#build-validation-commands)
7. [PR Acceptance Criteria](#pr-acceptance-criteria)
8. [Example Prompts for Copilot Chat](#example-prompts-for-copilot-chat)
9. [Code Examples](#code-examples)
10. [Additional Resources](#additional-resources)

---

## Project Overview

**Goal:** Build a landing page/portfolio with best-in-class performance and maintainability.

**Primary KPIs (non-negotiable):**

- Largest Contentful Paint (LCP) ≤ 2.5 s
- Accessibility score ≥ 90
- SEO score ≥ 90
- Hydrated JavaScript per island ≤ 100 KB

**Domain:** Static-first, content-driven marketing site. Interactive elements are minimal and isolated.

---

## Tech Stack

| Layer           | Technology               | Version / Details                            |
| --------------- | ------------------------ | -------------------------------------------- |
| Framework       | Astro                    | 5.0 (SSG + Islands)                          |
| UI Library      | React                    | 19 (via `@astrojs/react`, only for islands)  |
| Styling         | Tailwind CSS             | v4 (configured via `@theme` in `global.css`) |
| Language        | TypeScript               | strict mode enabled                          |
| Package Manager | pnpm                     |                                              |
| Icons           | lucide-react             | Import icons individually for tree-shaking   |
| Images          | `astro:assets` `<Image>` | Responsive AVIF/WebP/JPEG                    |
| Fonts           | Local or CDN             | `font-display: swap`, preload critical       |

---

## Architecture & Patterns

### Static-First

- Default to `.astro` for all UI that does not require interactivity.
- Never use React for static markup.

### Hydration Policy (Astro Islands)

- `client:visible` - default for interactive islands.
- `client:idle` - for background interactions.
- `client:media` - for mobile/desktop-specific hydration.
- `client:load` - only for critical UI that must be interactive immediately (e.g., navigation).
- Never hydrate entire pages.

### Image Optimization

- Use Astro's built-in `<Image />` component (`astro:assets`).
- LCP images: `loading="eager"` + explicit `width`/`height` + responsive `widths` (e.g., `[640, 1024, 1600]`).
- Non-LCP images: `loading="lazy"`.
- Deliver modern formats (AVIF/WebP) with JPEG fallback.
- Above-the-fold limit: No unoptimized image >100 KB without documented justification.

### Fonts

- Preconnect to font-origin domains.
- Preload critical font files.
- Always set `font-display: swap`.
- Use subset fonts when possible.

### Semantic Markup & Accessibility

- Use semantic elements (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).
- One `<h1>` per page.
- Provide descriptive `alt` text for images.
- Add ARIA attributes for interactive controls.
- Ensure color contrast meets WCAG AA.

### Third-Party Scripts

- Defer non-critical scripts (analytics, chat).
- Prefer Partytown to offload third-party execution from the main thread.

### Type Safety & CI

- `tsconfig.json` must have `strict: true`.
- CI fails on TypeScript errors.
- Avoid `any`; use explicit types.
- Document any necessary `any` usage.

### Tailwind Tokens

- Define design tokens (colors, spacing, fonts) inside `@theme` in `src/styles/global.css`.
- Avoid dynamic class names that Tailwind's purge cannot detect.

---

## Coding Standards

### Component Structure

- Astro components: Use TypeScript interfaces for props.
- React islands: Keep them small; import only necessary dependencies.

### Styling

- Use Tailwind utility classes; avoid inline `style={{}}` for layout/primary styling.
- Custom CSS should be in `.astro` `<style>` blocks or in `global.css`.

### Icons

Import icons individually from `lucide-react`:

```typescript
import { ArrowRight } from 'lucide-react';
```

### Layouts

- Wrap pages in Layouts to centralize `<head>`, meta tags, and preloads.

### Performance Monitoring

- Instrument Real User Monitoring (RUM) for field LCP/CLS/INP in staging/production.
- Run Lighthouse CI in PRs.

---

## Do's and Don'ts

### ✅ DO

- Use `.astro` for static UI (Hero, Footer, Card markup, text content).
- Hydrate React only when necessary: `<Component client:visible />`.
- Use `<Image />` or CDN-based responsive images with `srcset`/widths/formats.
- Preload critical fonts and use `font-display: swap`.
- Type props with strict interfaces: `interface Props { title: string }`.
- Import icons individually from `lucide-react` to enable tree-shaking.
- Wrap pages in Layouts to centralize `<head>`, meta, and preloads.
- Measure performance in CI (Lighthouse) and instrument Web Vitals in staging/production (RUM).

### ❌ DON'T

- Don't use React for simple static components.
- Don't hydrate globally or use `client:load` by default.
- Don't ship large, unoptimized images above the fold (>100 KB) without justification.
- Don't use inline styles (`style={{}}`) for primary layout/styling; prefer Tailwind utilities.
- Don't ignore TypeScript errors - fix them before merge.
- Don't let third-party scripts block main-thread rendering.

---

## Build & Validation Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Build the site
pnpm typecheck        # Run TypeScript type-checking
pnpm lint             # Run linter
pnpm test             # Run tests (Vitest recommended)
```

**Lighthouse CI example (lab audit):**

```bash
npx lhci autorun --collect --assert --upload
```

_(Configure LHCI project for your repository.)_

**Web Vitals (RUM):** Instrument a lightweight RUM to capture field LCP/CLS/INP for staging/production.

Include the above commands in PR descriptions when validating performance-related changes.

---

## PR Acceptance Criteria

- `pnpm build` passes with zero TypeScript errors.
- Lint and unit tests: no failing checks for modified code.
- Lighthouse lab for main page: Performance ≥ 90 OR LCP ≤ 2.5 s, Accessibility ≥ 90.
- JS hydrated per island ≤ 100 KB (target). If exceeded, include a mitigation plan in the PR.
- No unoptimized images >100 KB above-the-fold unless documented and justified.
- Semantic tags + `alt` attributes present for major content.

---

## Example Prompts for Copilot Chat

Use these exact prompts (or adapt them) to get consistent, compliant code.

### Refactor component into Astro + island

```
Refactor `src/components/Card.tsx` into:
1. A static `.astro` component for markup and styles.
2. A minimal React island for interactive bits (`client:visible`).
3. Use `<Image />` for images with responsive widths `[320, 640, 1024]`.
4. Strict TypeScript interfaces.

Return full file contents for both files.
```

### Optimize landing page for LCP

```
Optimize `src/pages/index.astro` for LCP ≤ 2.5 s:
1. Ensure hero image uses `<Image loading="eager" widths=[640,1024,1600]>`.
2. Preload critical fonts.
3. Convert non-interactive React components to `.astro`.

Return the updated file and a brief size diff (images and hydrated JS).
```

### Create a new interactive island

```
Create a React counter component (`client:visible`) under 5 KB. Include:
1. TypeScript interface for props.
2. No inline styles; use Tailwind utilities.
3. Individual icon import from `lucide-react`.

Return the full component code.
```

---

## Code Examples

### Astro component with typed props

```astro
---
interface Props {
  title: string;
  isActive?: boolean;
}
const { title, isActive = false } = Astro.props;
---

<section aria-hidden={!isActive}>
  <h2>{title}</h2>
  <slot />
</section>
```

### React island (minimal, hydrated on visibility)

```tsx
// src/components/interactive/Counter.tsx
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface CounterProps {
  initialCount?: number;
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
    >
      <Plus size={16} /> Count: {count}
    </button>
  );
}
```

### Usage in an Astro page

```astro
---
import Hero from '../components/Hero.astro';
import Counter from '../components/interactive/Counter';
---

<main>
  <Hero />
  <!-- Hydrated only when visible -->
  <Counter client:visible initialCount={0} />
</main>
```

---

## Additional Resources

- [GitHub Docs: Adding repository custom instructions for GitHub Copilot](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Awesome Copilot - Instruction examples](https://github.com/github/awesome-copilot/blob/main/docs/README.instructions.md)
- [Astro Documentation: Images](https://docs.astro.build/en/guides/images/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

---

**Notes:**

- Keep this file synced with repo practices and CI rules.
- Update examples to match framework versions if they change.
