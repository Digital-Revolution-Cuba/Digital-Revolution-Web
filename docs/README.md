# Digital Revolution Web - Documentation

> **Complete technical documentation for developers and AI assistants**

[![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 📚 Table of Contents

### Getting Started
- [Quick Start Guide](./guides/quick-start.md)
- [Development Environment Setup](./guides/development-setup.md)
- [Project Structure](./architecture/project-structure.md)

### Architecture
- [Architecture Overview](./architecture/overview.md)
- [Islands Architecture](./architecture/islands.md)
- [Data Flow](./architecture/data-flow.md)
- [SEO Strategy](./architecture/seo-strategy.md)
- [Performance Optimization](./architecture/performance.md)

### Component Documentation
- [Component Guidelines](./components/README.md)
- [Astro Components](./components/astro-components.md)
- [React Islands](./components/react-islands.md)
- [Styling Patterns](./components/styling.md)

### API Reference
- [Data Models](./api/data-models.md)
- [Utility Functions](./api/utilities.md)
- [Configuration](./api/configuration.md)

### Developer Guides
- [Contributing Guidelines](./guides/contributing.md)
- [Coding Standards](./guides/coding-standards.md)
- [Git Workflow](./guides/git-workflow.md)
- [Testing Guide](./guides/testing.md)
- [Deployment](./guides/deployment.md)
- [Troubleshooting](./guides/troubleshooting.md)

### AI Assistant Context
- [AI Development Guidelines](./guides/ai-guidelines.md)
- [Prompt Templates](./guides/prompt-templates.md)

---

## 🎯 Purpose of This Documentation

This documentation serves multiple purposes:

1. **For Developers**: Comprehensive technical reference for contributing to the project
2. **For AI Assistants**: Structured context to generate consistent, high-quality code
3. **For Maintainers**: Architecture decisions and patterns documentation
4. **For Onboarding**: Quick ramp-up for new team members

---

## 🏗️ Project Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Astro | 5.16+ | Static Site Generation with Islands |
| **UI Library** | React | 19.2+ | Interactive components (islands only) |
| **Styling** | Tailwind CSS | 4.1+ | Utility-first CSS framework |
| **Language** | TypeScript | 5.x | Type-safe development (strict mode) |
| **Icons** | Lucide React | Latest | Tree-shakeable icon components |
| **Images** | Astro Assets + Sharp | Built-in | Optimized image processing |
| **Package Manager** | pnpm | 9.x+ | Fast, disk space efficient |

---

## 🚀 Quick Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:4321)
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting

# Type Checking
pnpm astro check      # Run Astro diagnostics
```

---

## 📖 Documentation Principles

### 1. **Clarity Over Brevity**
Every concept is explained thoroughly with examples.

### 2. **AI-Friendly Structure**
Documentation is structured to be easily parsed by AI assistants with clear headings, code examples, and decision rationales.

### 3. **Living Documentation**
This documentation evolves with the codebase. When making architectural changes, update the corresponding docs.

### 4. **Example-Driven**
Every pattern includes a complete, working code example.

### 5. **Decision Records**
Major architectural decisions are documented with rationale and alternatives considered.

---

## 🤝 Contributing to Documentation

Found an error or want to improve the docs?

1. Documentation follows the same [Git workflow](./guides/git-workflow.md) as code
2. Use clear, concise language
3. Include code examples for technical concepts
4. Update the Table of Contents when adding new pages
5. Follow the [Documentation Style Guide](./guides/documentation-style.md)

---

## 📧 Contact & Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support
- **WhatsApp Community**: [Link in main README]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Last Updated**: January 2026  
**Astro Version**: 5.16.6  
**Maintainers**: Digital Revolution Cuba Team
