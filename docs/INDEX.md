# 📑 Documentation Index

**Quick reference for all documentation in Digital Revolution Web**

This index follows the [Diátaxis Framework](https://diataxis.fr/) to organize documentation by purpose.

---

## 📐 Documentation Structure

```
docs/
├── README.md                          # Documentation hub
├── INDEX.md                           # This file — Quick reference index
├── CHANGELOG.md                       # Version history
│
├── tutorials/                         # 🎓 Learning-oriented (step-by-step)
│   ├── getting-started.md
│   ├── your-first-component.md
│   └── building-a-gallery.md
│
├── how-to/                            # 🔧 Task-oriented (solve problems)
│   ├── add-new-page.md
│   ├── optimize-images.md
│   ├── git-workflow.md
│   ├── deploy-to-vercel.md
│   └── contributing.md
│
├── reference/                         # 📖 Information-oriented (look up details)
│   ├── project-structure.md
│   ├── coding-standards.md
│   ├── configuration.md
│   ├── cli-commands.md
│   ├── api/
│   │   ├── data-models.md
│   │   └── utilities.md
│   └── components/
│       ├── README.md
│       ├── astro-components.md
│       └── react-islands.md
│
└── explanation/                       # 💡 Understanding-oriented (concepts)
    ├── architecture.md
    ├── why-astro.md
    ├── islands-architecture.md
    ├── performance-strategy.md
    └── data-flow.md
```

---

## 🎯 Find Documentation by Purpose

### I want to learn → Tutorials

**Learning-oriented**: Step-by-step lessons that teach concepts through practice

| Document | Description | Time | Level |
|----------|-------------|------|-------|
| [Getting Started](./tutorials/getting-started.md) | Set up dev environment | 15 min | Beginner |

### I need to solve a problem → How-To Guides

**Task-oriented**: Practical steps to accomplish specific goals

| Document | Description |
|----------|-------------|
| [Git Workflow](./how-to/git-workflow.md) | Branching and commit conventions |

### I need to look something up → Reference

**Information-oriented**: Technical details, APIs, configurations

| Category | Documents |
|----------|-----------|
| **Project** | [Project Structure](./reference/project-structure.md) |
| **Code Quality** | [Coding Standards](./reference/coding-standards.md) |
| **API** | [Data Models](./reference/api/data-models.md) |

### I want to understand → Explanation

**Understanding-oriented**: Concepts, design decisions, architecture

| Document | Description |
|----------|-------------|
| [Architecture](./explanation/architecture.md) | System design and patterns |

---

## 👥 Find Documentation by Role

### New Developer

**Start here:**




1. [Getting Started Tutorial](./tutorials/getting-started.md)
2. [Architecture Explanation](./explanation/architecture.md)
3. [Project Structure Reference](./reference/project-structure.md)
4. [Coding Standards Reference](./reference/coding-standards.md)


### Contributor



**Making a PR:**


1. [Git Workflow How-To](./how-to/git-workflow.md)
2. [Coding Standards Reference](./reference/coding-standards.md)


### AI Assistant (Copilot/Claude/etc.)


**Context for code generation:**


1. [Data Models Reference](./reference/api/data-models.md)
2. [Architecture Explanation](./explanation/architecture.md)



---




## 📚 Documentation by Topic



### Setup & Configuration


- [Getting Started Tutorial](./tutorials/getting-started.md)



### Architecture & Design

- [Architecture Explanation](./explanation/architecture.md)


### Development

- [Git Workflow How-To](./how-to/git-workflow.md)
- [Data Models Reference](./reference/api/data-models.md)

### Images & Assets

- [Image Directory Structure](../public/images/README.md)

---

## 📝 Contributing to Documentation

Found an error or want to improve docs?

1. Follow [Diátaxis principles](https://diataxis.fr/):
   - **Tutorials**: Learning-oriented, step-by-step
   - **How-To**: Task-oriented, solve problems
   - **Reference**: Information-oriented, lookup
   - **Explanation**: Understanding-oriented, concepts
2. Update this index if adding new docs
3. Submit a PR

---

## 🔗 External Resources

- [Astro Docs](https://docs.astro.build/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Diátaxis Framework](https://diataxis.fr/)

---

**Last Updated**: February 2026  
**Documentation Version**: 1.0.0

### Development

- [Quick Start](./guides/quick-start.md)
- [Coding Standards](./guides/coding-standards.md)
- [TypeScript Guidelines](./guides/typescript.md)
- [Testing Guide](./guides/testing.md)
- [Troubleshooting](./guides/troubleshooting.md)

### Workflow

- [Git Workflow](./guides/git-workflow.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Pull Request Template](../.github/pull_request_template.md)

### API Reference

- [Data Models](./api/data-models.md)
- [Utility Functions](./api/utilities.md)
- [Configuration](./api/configuration.md)

---

## 🎯 Common Tasks

### Adding a New Component

1. Read [Component Guidelines](./components/README.md)
2. Check [Astro Components](./components/astro-components.md) or [React Islands](./components/react-islands.md)
3. Follow [Coding Standards](./guides/coding-standards.md)
4. Add types in [Data Models](./api/data-models.md) if needed

### Fixing a Bug

1. Create branch: `git checkout -b fix/bug-description`
2. Follow [Git Workflow](./guides/git-workflow.md)
3. Check [Troubleshooting](./guides/troubleshooting.md) for common issues
4. Submit PR following [Contributing Guide](../CONTRIBUTING.md)

### Adding a New Page

1. Create file in `src/pages/`
2. Use Layout component with SEO props (see [Architecture](./architecture/overview.md#seo-architecture))
3. Follow [Project Structure](./architecture/project-structure.md)
4. Update `sitemap.xml` if needed

### Working with Data

1. Define types in [Data Models](./api/data-models.md)
2. Create data file in `src/data/`
3. Follow [Data Flow](./architecture/data-flow.md) patterns
4. Import and use in components

---

## 🔍 Search by Keyword

| Looking for...           | See document...                                                          |
| ------------------------ | ------------------------------------------------------------------------ |
| **Setup, installation**  | [Quick Start](./guides/quick-start.md)                                   |
| **Folder structure**     | [Project Structure](./architecture/project-structure.md)                 |
| **Component patterns**   | [Component Guidelines](./components/README.md)                           |
| **TypeScript types**     | [Data Models](./api/data-models.md)                                      |
| **Astro vs React**       | [Architecture Overview](./architecture/overview.md#islands-architecture) |
| **Hydration directives** | [Islands Architecture](./architecture/islands.md)                        |
| **Tailwind, styling**    | [Styling Patterns](./components/styling.md)                              |
| **SEO, meta tags**       | [SEO Strategy](./architecture/seo-strategy.md)                           |
| **Git, branches**        | [Git Workflow](./guides/git-workflow.md)                                 |
| **Commit messages**      | [Git Workflow](./guides/git-workflow.md#commit-messages)                 |
| **Naming conventions**   | [Coding Standards](./guides/coding-standards.md#naming-conventions)      |
| **AI code generation**   | [AI Guidelines](./guides/ai-guidelines.md)                               |
| **Testing**              | [Testing Guide](./guides/testing.md)                                     |
| **Troubleshooting**      | [Troubleshooting](./guides/troubleshooting.md)                           |
| **Changelog, versions**  | [CHANGELOG](./CHANGELOG.md)                                              |

---

## 📝 Contributing to Docs

Found an error or want to improve the documentation?

1. Fork the repository
2. Create branch: `docs/your-improvement`
3. Edit markdown files in `docs/`
4. Commit: `docs(guides): improve quick start guide`
5. Submit pull request

Follow the same [Git Workflow](./guides/git-workflow.md) as code contributions.

---

## 💡 Documentation Principles

1. **Clarity**: Write for humans first, AI second
2. **Examples**: Every concept has a code example
3. **Completeness**: Cover edge cases and gotchas
4. **Maintenance**: Update docs when code changes
5. **Discoverability**: Cross-link related topics

---

## 🔗 External Resources

- [Astro Documentation](https://docs.astro.build/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Last Updated**: January 2026  
**Maintained by**: Digital Revolution Cuba Team
