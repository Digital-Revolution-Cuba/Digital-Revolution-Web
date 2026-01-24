# Quick Start Guide

Get up and running with Digital Revolution Web in minutes.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.17 or higher
- **pnpm**: v9.0 or higher (recommended package manager)
- **Git**: Latest version
- **VS Code**: Recommended (with extensions listed in `.vscode/extensions.json`)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web.git
cd Digital-Revolution-Web
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required packages including:
- Astro 5.16+
- React 19
- Tailwind CSS 4
- TypeScript
- And all development dependencies

### 3. Start Development Server

```bash
pnpm dev
```

The development server will start at `http://localhost:4321`

---

## Project Structure Overview

```
Digital-Revolution-Web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── *.astro      # Static Astro components
│   │   └── talents/     # React islands for interactivity
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── data/            # Static data and type definitions
│   ├── styles/          # Global CSS and Tailwind config
│   └── utils/           # Helper functions
├── public/              # Static assets (robots.txt, sitemap.xml)
├── docs/                # This documentation
└── .github/             # GitHub configurations and AI instructions
```

---

## Your First Component

### Creating a Static Component (Astro)

```astro
---
// src/components/HelloWorld.astro
interface Props {
  name: string;
  greeting?: string;
}

const { name, greeting = 'Hello' } = Astro.props;
---

<div class="p-6 bg-white rounded-lg shadow-lg">
  <h2 class="text-2xl font-bold">{greeting}, {name}!</h2>
  <p class="text-gray-600 mt-2">Welcome to Digital Revolution Web</p>
</div>
```

### Using the Component

```astro
---
// src/pages/test.astro
import Layout from '../layouts/Layout.astro';
import HelloWorld from '../components/HelloWorld.astro';
---

<Layout title="Test Page">
  <HelloWorld name="Developer" />
</Layout>
```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Your Changes

- Edit files in `src/`
- Hot reload is enabled - changes appear instantly
- Check browser console for any errors

### 3. Format Your Code

```bash
pnpm format
```

### 4. Build and Test

```bash
pnpm build
pnpm preview
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format.

---

## Common Tasks

### Adding a New Page

1. Create a file in `src/pages/` (e.g., `about.astro`)
2. The route is automatically generated (`/about`)
3. Use the Layout component for consistent structure

### Adding Images

1. Place images in `src/assets/`
2. Import and use with Astro's Image component:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.jpg';
---

<Image src={myImage} alt="Description" />
```

### Adding a React Island

Only when you need **client-side interactivity**:

```tsx
// src/components/interactive/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Use it with hydration directive:

```astro
---
import Counter from '../components/interactive/Counter';
---

<Counter client:visible />
```

---

## Environment Variables

Create a `.env` file in the root (if needed):

```bash
PUBLIC_API_URL=https://api.example.com
```

Access in Astro:

```javascript
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

---

## VS Code Setup

### Recommended Extensions

The project includes `.vscode/extensions.json` with recommended extensions:

- Astro Language Server
- Prettier
- Tailwind CSS IntelliSense
- EditorConfig
- ESLint

VS Code will prompt you to install these when you open the project.

### Settings

The project includes `.vscode/settings.json` with optimized settings for:
- Auto-formatting on save
- Tailwind CSS autocomplete
- TypeScript strict mode

---

## Troubleshooting

### Port Already in Use

If port 4321 is occupied:

```bash
pnpm dev --port 3000
```

### Clear Build Cache

If you encounter build issues:

```bash
rm -rf .astro dist node_modules
pnpm install
pnpm dev
```

### TypeScript Errors

Run type checking:

```bash
pnpm astro check
```

---

## Next Steps

- Read the [Architecture Overview](../architecture/overview.md)
- Explore [Component Guidelines](../components/README.md)
- Check [Coding Standards](./coding-standards.md)
- Review [Contributing Guidelines](./contributing.md)

---

## Getting Help

- Check the [Troubleshooting Guide](./troubleshooting.md)
- Open an issue on GitHub
- Join our WhatsApp community (link in main README)

---

**Ready to contribute? Read the [Contributing Guidelines](./contributing.md) next!**
