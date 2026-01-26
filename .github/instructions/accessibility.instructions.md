---
applyTo: '**/*'
description: 'Reglas de accesibilidad WCAG 2.1 AA para todo el proyecto'
---

# Accessibility Instructions

This document provides project-level accessibility rules for components and pages.

## Goal

Achieve WCAG 2.1 AA compliance and a Lighthouse Accessibility score ≥ 90.

## Guidelines

- Use semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`.
- One `h1` per page. Maintain heading hierarchy.
- Images must include meaningful `alt` text; decorative images should use `alt=""`.
- Interactive controls must be keyboard-focusable and have visible focus styles.
- For icon-only buttons, add `aria-label` or `aria-labelledby`.
- Ensure color contrast ≥ 4.5:1 for body text.
- Use `role` attributes only when necessary; prefer native semantics.

## Testing

- Use axe or Lighthouse in CI to detect regressions.
- Manual keyboard navigation checks for all interactive views.

## Common Issues

- Avoid HTML comments (`<!-- ... -->`) embedded inside JS/JSX expressions or template expressions — they break parsers. Use JS comments (`//` or `/* */`) inside script sections or move comments outside of templating expressions.

## Quick Fix

If Prettier or the build fails with "Unexpected token" pointing to `<!--`, search and remove those HTML comments inside `{ ... }` or `{isTrue ? ( <!-- ... --> <div>...) : (...) }` patterns.
