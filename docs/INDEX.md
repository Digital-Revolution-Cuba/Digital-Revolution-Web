    # Documentation Index

Quick reference index for Digital Revolution Web documentation.

---

## 📑 Documentation Structure

```
docs/
├── README.md                 # Main documentation hub
├── CHANGELOG.md              # Version history and changes
│
├── guides/                   # Developer guides
│   ├── quick-start.md       # Getting started in 5 minutes
│   ├── coding-standards.md  # Code quality standards
│   ├── git-workflow.md      # Git and branching strategy
│   ├── ai-guidelines.md     # AI assistant guidelines
│   └── troubleshooting.md   # Common issues and solutions
│
├── architecture/             # Architecture documentation
│   ├── overview.md          # High-level architecture
│   ├── project-structure.md # Folder structure explained
│   ├── islands.md           # Islands architecture details
│   ├── data-flow.md         # Data flow patterns
│   └── seo-strategy.md      # SEO implementation
│
├── components/               # Component documentation
│   ├── README.md            # Component guidelines
│   ├── astro-components.md  # Astro component patterns
│   ├── react-islands.md     # React island patterns
│   └── styling.md           # Styling best practices
│
└── api/                      # API reference
    ├── data-models.md       # TypeScript types and interfaces
    ├── utilities.md         # Utility functions
    └── configuration.md     # Configuration options
```

---

## 🚀 Quick Links by Role

### For New Developers

Start here:

1. [Quick Start Guide](./guides/quick-start.md) - Get running in 5 minutes
2. [Project Structure](./architecture/project-structure.md) - Understand the codebase
3. [Coding Standards](./guides/coding-standards.md) - Write consistent code

4. [Git Workflow](./guides/git-workflow.md) - Contribute correctly

### For AI Assistants (Copilot, Claude, etc.)

Essential context:

1. [AI Guidelines](./guides/ai-guidelines.md) - Code generation rules
2. [Architecture Overview](./architecture/overview.md) - System design

3. [Data Models](./api/data-models.md) - Type definitions
4. [Component Guidelines](./components/README.md) - Component patterns

### For Contributors

Before creating a PR:

1. [Coding Standards](./guides/coding-standards.md) - Code quality rules
2. [Git Workflow](./guides/git-workflow.md) - Branching and commits

3. [Component Guidelines](./components/README.md) - Component patterns
4. [Main Contributing Guide](../CONTRIBUTING.md) - Contribution process

### For Maintainers

Reference documentation:

1. [Architecture Overview](./architecture/overview.md) - System design decisions
2. [CHANGELOG](./CHANGELOG.md) - Version history
3. [Data Models](./api/data-models.md) - Type system
4. [Utilities Reference](./api/utilities.md) - Helper functions

---

## 📖 Documentation by Topic

### Architecture & Design

- [Architecture Overview](./architecture/overview.md)
- [Project Structure](./architecture/project-structure.md)
- [Islands Architecture](./architecture/islands.md)
- [Data Flow Patterns](./architecture/data-flow.md)
- [SEO Strategy](./architecture/seo-strategy.md)

### Components

- [Component Guidelines](./components/README.md)
- [Astro Components](./components/astro-components.md)
- [React Islands](./components/react-islands.md)
- [Styling Patterns](./components/styling.md)

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
