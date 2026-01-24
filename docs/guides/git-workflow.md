# Git Workflow

Git workflow and branching strategy for Digital Revolution Web.

---

## 🌳 Branching Strategy

We follow a simplified **GitHub Flow** model for clean, manageable collaboration.

### Main Branches

```
main (production)
  └── Protected branch
  └── Requires PR approval
  └── Always deployable
```

### Feature Branches

All development happens in feature branches:

```
feat/feature-name
fix/bug-description
docs/documentation-update
refactor/component-name
style/visual-improvements
```

---

## 📋 Branch Naming Convention

### Format

```
<type>/<short-description>
```

### Types

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | New feature | `feat/user-authentication` |
| `fix` | Bug fix | `fix/gallery-loading` |
| `docs` | Documentation | `docs/api-reference` |
| `refactor` | Code refactoring | `refactor/header-component` |
| `style` | Visual/CSS changes | `style/responsive-cards` |
| `perf` | Performance improvement | `perf/image-optimization` |
| `test` | Adding tests | `test/component-tests` |
| `chore` | Maintenance | `chore/update-dependencies` |

### Rules

- Use **lowercase**
- Separate words with **hyphens** (`-`)
- Be **descriptive** but **concise**
- No special characters or spaces
- Maximum **40 characters**

### Examples

```bash
✅ Good
feat/talent-search
fix/mobile-menu-overlay
docs/component-guidelines
refactor/gallery-slider

❌ Bad
Feature/TalentSearch           # Wrong case
fix_mobile_menu               # Use hyphens, not underscores
documentation                 # Missing type prefix
feat/add-new-search-feature-with-filters  # Too long
```

---

## 💻 Workflow Steps

### 1. Create Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/your-feature-name
```

### 2. Develop & Commit

```bash
# Make changes to files
# ...

# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat(components): add SearchBar component with autocomplete"
```

See [Commit Message Guidelines](#commit-messages) below.

### 3. Push to Remote

```bash
# Push branch to GitHub
git push origin feat/your-feature-name

# If branch doesn't exist remotely yet
git push -u origin feat/your-feature-name
```

### 4. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch as the source
4. Fill out PR template:
   - **Title**: Clear, descriptive summary
   - **Description**: What changed and why
   - **Screenshots**: For UI changes
   - **Related Issues**: Link to issues (e.g., `Closes #123`)

### 5. Code Review

- Wait for review from maintainers
- Address feedback with new commits
- Push updates to same branch (PR updates automatically)

### 6. Merge

Once approved:
- **Squash and merge** (preferred for clean history)
- Delete branch after merge

---

## 📝 Commit Messages

### Conventional Commits Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

### Scopes (Optional)

- `components`: UI components
- `pages`: Page components
- `api`: API/data layer
- `styles`: CSS/Tailwind
- `config`: Configuration files
- `docs`: Documentation

### Examples

```bash
# New feature
feat(components): add SearchBar component with autocomplete

# Bug fix
fix(gallery): resolve image loading race condition

# Documentation
docs(api): update data models reference

# Refactoring
refactor(talents): optimize search algorithm for better performance

# Style changes
style(ui): improve button hover states and transitions

# Performance
perf(images): implement lazy loading for gallery images

# Breaking change
feat(auth)!: migrate to new authentication system

BREAKING CHANGE: Old auth tokens are no longer valid.
Users must re-authenticate after this update.
```

### Rules

1. **Use lowercase** for type and scope
2. **No period** at end of subject
3. **Imperative mood**: "add" not "added" or "adds"
4. **Max 72 characters** for subject line
5. **Blank line** before body
6. **Body**: Explain what and why, not how
7. **Footer**: Reference issues (`Closes #123`)

### Good Commit Messages

```bash
✅ feat(search): add debouncing to search input
✅ fix(mobile): correct navbar z-index on small screens
✅ docs(readme): update installation instructions
✅ refactor(utils): extract date formatting to utility function
```

### Bad Commit Messages

```bash
❌ update files                # Vague
❌ Fix bug                     # Not descriptive
❌ Added new feature for users  # Past tense, too vague
❌ WIP                         # Not informative
❌ Fixes                       # Missing context
```

---

## 🔀 Pull Request Guidelines

### PR Title

Use conventional commit format:

```
feat(components): add responsive image component
fix(gallery): resolve slider navigation bug
docs(guides): add TypeScript guidelines
```

### PR Description Template

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Changes Made
- Added SearchBar component with autocomplete
- Implemented debouncing for search input
- Added unit tests for search logic

## Screenshots (if UI changes)
![Before](url)
![After](url)

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] Unit tests pass
- [ ] Build succeeds

## Related Issues
Closes #123
Relates to #456

## Checklist
- [ ] Code follows project coding standards
- [ ] Self-reviewed the code
- [ ] Added/updated documentation
- [ ] No console.log statements
- [ ] TypeScript types are correct
- [ ] Accessibility attributes added (alt, aria-label)
```

---

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.2.3
│ │ │
│ │ └─ Patch: Bug fixes
│ └─── Minor: New features (backwards compatible)
└───── Major: Breaking changes
```

### Creating a Release

1. **Update CHANGELOG.md**:
   ```markdown
   ## [1.2.0] - 2026-01-23
   ### Added
   - New search functionality
   ### Fixed
   - Gallery loading bug
   ```

2. **Update package.json version**:
   ```json
   {
     "version": "1.2.0"
   }
   ```

3. **Create Git tag**:
   ```bash
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push origin v1.2.0
   ```

4. **Create GitHub Release**:
   - Go to GitHub > Releases > New Release
   - Select tag `v1.2.0`
   - Copy relevant CHANGELOG section
   - Publish release

---

## 🔧 Common Git Commands

### Daily Workflow

```bash
# Update your local main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/new-feature

# Check status
git status

# Stage changes
git add .                    # All files
git add src/components/      # Specific folder
git add Header.astro         # Specific file

# Commit
git commit -m "feat(components): add header component"

# Push
git push origin feat/new-feature

# Update branch with latest main
git checkout main
git pull
git checkout feat/new-feature
git merge main               # or git rebase main
```

### Fixing Mistakes

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard uncommitted changes
git checkout -- <file>
git restore <file>           # Modern Git

# Amend last commit message
git commit --amend -m "New message"

# Amend last commit (add forgotten files)
git add forgotten-file.ts
git commit --amend --no-edit
```

### Branch Management

```bash
# List all branches
git branch -a

# Delete local branch
git branch -d feat/old-feature

# Delete remote branch
git push origin --delete feat/old-feature

# Rename current branch
git branch -m new-branch-name
```

---

## 🚫 Common Mistakes to Avoid

### 1. Committing to main directly

```bash
# ❌ Don't do this
git checkout main
git commit -m "changes"

# ✅ Use feature branches
git checkout -b feat/my-changes
git commit -m "feat: my changes"
```

### 2. Vague commit messages

```bash
# ❌ Bad
git commit -m "update"
git commit -m "fix"
git commit -m "changes"

# ✅ Good
git commit -m "feat(search): add autocomplete to search bar"
git commit -m "fix(gallery): resolve image loading bug"
```

### 3. Committing sensitive data

```bash
# ❌ Never commit
- API keys
- .env files with secrets
- node_modules/
- dist/ or build output

# ✅ Add to .gitignore
.env
.env.local
node_modules/
dist/
```

### 4. Large commits

```bash
# ❌ Don't commit everything at once
git add .
git commit -m "massive update"

# ✅ Make atomic commits
git add src/components/Header.astro
git commit -m "feat(components): add header component"

git add src/components/Footer.astro
git commit -m "feat(components): add footer component"
```

---

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

## 🔗 Related Documentation

- [Contributing Guidelines](../CONTRIBUTING.md)
- [Coding Standards](./coding-standards.md)
- [Pull Request Template](../.github/pull_request_template.md)

---

**Last Updated**: January 2026
