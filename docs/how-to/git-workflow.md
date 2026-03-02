# 🔧 Git Workflow & Branching Strategy

> **How-To Guide — Task-oriented**  
> **Audience**: All contributors  
> **Prerequisites**: Git installed, basic Git knowledge

This guide explains how to contribute code using Git, including branching strategy, commit conventions, and pull request guidelines.

---

## Quick Reference

```bash
# 1. Create feature branch
git checkout -b feat/your-feature-name

# 2. Make changes and commit
git add .
git commit -m "feat: add new gallery component"

# 3. Push to GitHub
git push origin feat/your-feature-name

# 4. Open Pull Request on GitHub
```

---

## Branching Strategy

We follow **Git Flow** with simplified conventions:

```
main                    # Production-ready code
├── develop             # Integration branch
│   ├── feat/*         # New features
│   ├── fix/*          # Bug fixes
│   ├── docs/*         # Documentation updates
│   ├── refactor/*     # Code improvements
│   └── chore/*        # Maintenance tasks
```

### Branch Naming Convention

Format: `<type>/<short-description>`

| Type        | Purpose          | Example                      |
| ----------- | ---------------- | ---------------------------- |
| `feat/`     | New feature      | `feat/talents-search`        |
| `fix/`      | Bug fix          | `fix/header-mobile-menu`     |
| `docs/`     | Documentation    | `docs/update-readme`         |
| `refactor/` | Code refactoring | `refactor/gallery-component` |
| `chore/`    | Maintenance      | `chore/update-dependencies`  |
| `test/`     | Tests            | `test/add-gallery-tests`     |
| `style/`    | Styling only     | `style/button-hover-effects` |

---

## Step-by-Step Workflow

### 1. Start a New Feature

```bash
# Update your local repository
git checkout main
git pull origin main

# Create and switch to feature branch
git checkout -b feat/your-feature-name
```

**Example:**

```bash
git checkout -b feat/add-music-player
```

---

### 2. Make Your Changes

Write your code, test it locally:

```bash
# Test your changes
pnpm dev

# Format code
pnpm format

# Check types
pnpm astro check
```

---

### 3. Commit Your Changes

#### Commit Message Convention

We follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**

```bash
# Simple commit
git commit -m "feat: add music player component"

# With scope
git commit -m "feat(gallery): add filter by category"

# With body
git commit -m "fix(header): resolve mobile menu z-index issue

The mobile menu was appearing behind other content.
This fix ensures proper layering with z-index: 100.

Closes #42"
```

#### Commit Checklist

Before committing:

- [ ] Code runs without errors (`pnpm dev`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Types are correct (`pnpm astro check`)
- [ ] Commit message follows convention
- [ ] No sensitive data (API keys, passwords)
- [ ] No console.logs or debugging code

---

### 4. Push to GitHub

```bash
git push origin feat/your-feature-name
```

**First time pushing this branch?**
Git will show:

```bash
git push --set-upstream origin feat/your-feature-name
```

Copy and run that command.

---

### 5. Create a Pull Request

1. Go to [GitHub repository](https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web)
2. Click **"Compare & pull request"**
3. Fill in the PR template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Checklist

- [ ] Code follows coding standards
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] No new warnings
- [ ] Tests pass
```

4. Request reviewers
5. Wait for approval

---

## Common Scenarios

### Scenario 1: Update Your Branch with Latest Changes

```bash
# Get latest from main
git checkout main
git pull origin main

# Switch back to your branch
git checkout feat/your-feature

# Merge main into your branch
git merge main

# Or rebase (cleaner history)
git rebase main
```

### Scenario 2: Fix Merge Conflicts

```bash
# After git merge or git rebase
# VS Code will show conflicts

# 1. Open conflicted files
# 2. Choose which changes to keep
# 3. Remove conflict markers (<<<<, ====, >>>>)
# 4. Stage resolved files
git add .

# 5. Complete the merge
git commit -m "merge: resolve conflicts with main"
```

### Scenario 3: Amend Last Commit

```bash
# Made a mistake in last commit?
git add .
git commit --amend

# Or change just the message
git commit --amend -m "feat: correct commit message"
```

### Scenario 4: Undo Uncommitted Changes

```bash
# Discard all changes
git reset --hard HEAD

# Discard changes in specific file
git checkout -- src/components/Header.astro
```

### Scenario 5: Revert a Commit

```bash
# Create new commit that undoes previous commit
git revert <commit-hash>

# Example:
git revert abc123f
```

---

## Best Practices

### ✅ DO

- ✅ Keep commits focused (one feature/fix per commit)
- ✅ Write descriptive commit messages
- ✅ Pull latest changes before starting work
- ✅ Test your code before committing
- ✅ Use meaningful branch names
- ✅ Request reviews from relevant team members
- ✅ Respond to review comments promptly

### ❌ DON'T

- ❌ Commit directly to `main`
- ❌ Force push to shared branches (`git push -f`)
- ❌ Commit sensitive data (API keys, passwords)
- ❌ Make giant commits (100s of files changed)
- ❌ Use vague messages ("fix stuff", "update")
- ❌ Leave commented-out code
- ❌ Ignore merge conflicts

---

## Pull Request Review Process

### As a Contributor

1. **Self-review** your changes before requesting review
2. **Respond to comments** constructively
3. **Make requested changes** promptly
4. **Re-request review** after changes

### As a Reviewer

1. **Be respectful** and constructive
2. **Check for**:
   - Code quality and style
   - Potential bugs
   - Performance implications
   - Accessibility concerns
3. **Approve** or **Request changes**
4. **Provide specific feedback**

---

## Emergency Procedures

### Hotfix for Production

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b fix/critical-bug

# Make fix
# ... edit files ...

# Commit and push
git add .
git commit -m "fix: resolve critical payment bug"
git push origin fix/critical-bug

# Create PR with "urgent" label
# After merge, deploy immediately
```

### Rollback a Deployment

```bash
# Revert to previous commit on main
git checkout main
git revert HEAD
git push origin main

# Vercel will auto-deploy the reverted version
```

---

## Git Configuration

### Set Your Identity

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Useful Aliases

```bash
# Add to ~/.gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  pl = pull
  ps = push
  lg = log --oneline --graph --decorate
```

---

## Troubleshooting

### Problem: Accidentally committed to wrong branch

```bash
# Create new branch from current state
git branch feat/correct-branch

# Reset current branch
git reset --hard HEAD~1

# Switch to correct branch
git checkout feat/correct-branch
```

### Problem: Need to undo git add

```bash
# Unstage all files
git reset

# Unstage specific file
git reset src/components/Header.astro
```

### Problem: Merge conflicts are overwhelming

```bash
# Abort the merge
git merge --abort

# Or abort rebase
git rebase --abort

# Start over more carefully
```

---

## Related Documentation

- [Contributing Guidelines](./contributing.md)
- [Coding Standards](../reference/coding-standards.md)
- [Code Review Guidelines](./code-review.md)

---

## External Resources

- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
