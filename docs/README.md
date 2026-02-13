# 📚 Digital Revolution Web — Documentation Hub

> **Complete technical documentation following the Diátaxis framework**

[![Astro](https://img.shields.io/badge/Astro-5.16-FF5D01?logo=astro)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 Quick Navigation by Need

### 🎓 I want to learn the basics
→ **[Tutorials](./tutorials/)** — Step-by-step lessons

### 🔧 I need to accomplish a specific task
→ **[How-To Guides](./how-to/)** — Practical solutions

### 📖 I need to look up technical details
→ **[Reference](./reference/)** — API documentation

### 💡 I want to understand concepts
→ **[Explanation](./explanation/)** — Architecture & design decisions

---

## 📐 Documentation Structure (Diátaxis Framework)

This documentation follows the **Diátaxis** framework, organizing content into 4 distinct types:

```
docs/
├── tutorials/          # 🎓 Learning-oriented (study + action)
│   ├── getting-started.md
│   ├── your-first-component.md
│   └── building-a-gallery.md
│
├── how-to/             # 🔧 Task-oriented (work + action)
│   ├── add-new-page.md
│   ├── optimize-images.md
│   ├── git-workflow.md
│   └── deploy-to-vercel.md
│
├── reference/          # 📖 Information-oriented (work + cognition)
│   ├── api/
│   ├── components/
│   ├── configuration.md
│   └── coding-standards.md
│
└── explanation/        # 💡 Understanding-oriented (study + cognition)
    ├── architecture.md
    ├── why-astro.md
    ├── performance-strategy.md
    └── data-flow.md
```

---

## 🚀 Quick Start for Different Audiences

### 👨‍💻 New Developer

1. Read [Getting Started Tutorial](./tutorials/getting-started.md) (10 min)
2. Complete [Your First Component](./tutorials/your-first-component.md) (20 min)
3. Check [Coding Standards Reference](./reference/coding-standards.md)
4. Read [Architecture Explanation](./explanation/architecture.md)

### 🤖 AI Assistant (GitHub Copilot, etc.)

1. Read [AI Guidelines](./reference/ai-guidelines.md)
2. Check [Component Patterns Reference](./reference/components/)
3. Review [Data Models Reference](./reference/api/data-models.md)
4. Understand [Islands Architecture](./explanation/islands-architecture.md)

### 👥 Contributor

1. Read [Contributing How-To](./how-to/contributing.md)
2. Check [Git Workflow How-To](./how-to/git-workflow.md)
3. Review [Coding Standards Reference](./reference/coding-standards.md)
4. Test changes using [Testing How-To](./how-to/testing.md)

### 🏗️ Maintainer

1. Review [Architecture Explanation](./explanation/architecture.md)
2. Check [Performance Strategy](./explanation/performance-strategy.md)
3. Read [Deployment How-To](./how-to/deploy.md)
4. Monitor [CHANGELOG](./CHANGELOG.md)

---

## 🛠️ Tech Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Astro 5.16+ | SSG with Islands Architecture |
| **UI Components** | React 19 | Interactive islands only |
| **Styling** | Tailwind CSS 4.1 | Utility-first CSS |
| **Language** | TypeScript (strict) | Type-safe development |
| **Content** | Content Collections | Type-safe content management |
| **Images** | Astro Assets + Sharp | Optimized image processing |
| **Package Manager** | pnpm 10+ | Fast, efficient installs |

---

## 📊 Project Status

- **Version**: 0.3.0
- **Status**: 🟢 Active Development
- **Last Updated**: February 2026
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)

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
