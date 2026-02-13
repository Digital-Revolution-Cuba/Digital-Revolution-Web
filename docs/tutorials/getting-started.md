# 🎓 Getting Started with Digital Revolution Web

> **Tutorial — Learning-oriented**  
> **Time**: ~15 minutes  
> **Level**: Beginner  
> **Prerequisites**: Basic knowledge of terminal/command line

This tutorial will guide you through setting up your development environment and running the project locally for the first time.

---

## What You'll Learn

By the end of this tutorial, you will:

✅ Have Node.js and pnpm installed  
✅ Clone the repository  
✅ Install project dependencies  
✅ Run the development server  
✅ Make your first code change  
✅ Understand the project structure basics

---

## Step 1: Install Prerequisites

### Install Node.js

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (v20.x or higher)
3. Run the installer
4. Verify installation:

```bash
node -v
# Should output: v20.x.x or higher
```

### Install pnpm

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm -v
# Should output: 10.x.x or higher
```

---

## Step 2: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web.git

# Navigate into the project
cd Digital-Revolution-Web
```

---

## Step 3: Install Dependencies

```bash
pnpm install
```

**What's happening?**  
pnpm reads `package.json` and installs all required dependencies into `node_modules/`. This may take 1-2 minutes depending on your internet connection.

**Expected output:**
```
Progress: resolved 569, reused 479, downloaded 0, added 0, done
```

---

## Step 4: Start the Development Server

```bash
pnpm dev
```

**Expected output:**
```
astro  v5.16.6 ready in 1444 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose

watching for file changes...
```

---

## Step 5: Open the Project in Your Browser

1. Open your browser
2. Navigate to `http://localhost:4321/`
3. You should see the Digital Revolution homepage! 🎉

---

## Step 6: Make Your First Change

Let's make a small change to verify everything works:

1. Open your code editor (VS Code recommended)
2. Navigate to `src/pages/index.astro`
3. Find the hero title (around line 30)
4. Change the text to add "¡Hola!"

**Before:**
```astro
<h1 class="hero__title">
  DIGITAL REVOLUTION
</h1>
```

**After:**
```astro
<h1 class="hero__title">
  ¡HOLA! DIGITAL REVOLUTION
</h1>
```

5. Save the file
6. Return to your browser
7. The page should automatically reload with your change!

**🎉 Congratulations!** You've made your first change to the project.

---

## Step 7: Explore the Project Structure

Now that you have the project running, let's understand the basic structure:

```
Digital-Revolution-Web/
├── src/                    # Source code
│   ├── pages/             # Routes (index.astro = homepage)
│   ├── components/        # Reusable UI components
│   ├── styles/            # Global CSS
│   └── layouts/           # Page layouts
├── public/                # Static assets (images, fonts)
├── docs/                  # Documentation (you are here!)
└── package.json           # Project dependencies
```

**Try exploring:**
- Open `src/components/Header.astro` — This is the site header
- Open `src/styles/global.css` — Global styles
- Open `public/images/` — Image assets

---

## Common Issues & Solutions

### Port 4321 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::4321
```

**Solution:**
```bash
# Kill the process using port 4321
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 4321).OwningProcess | Stop-Process

# Then restart:
pnpm dev
```

### Module Not Found Errors

**Error:**
```
Error: Cannot find module 'astro'
```

**Solution:**
```bash
# Re-install dependencies
rm -rf node_modules
pnpm install
```

### Build Fails

**Error:**
```
[ERROR] Build failed
```

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .astro node_modules
pnpm install
pnpm build
```

---

## Next Steps

Now that you have the project running:

1. **Learn Component Basics**: [Your First Component Tutorial](./your-first-component.md)
2. **Understand Architecture**: [Architecture Explanation](../explanation/architecture.md)
3. **Read Coding Standards**: [Coding Standards Reference](../reference/coding-standards.md)
4. **Make Your First PR**: [Contributing How-To](../how-to/contributing.md)

---

## Summary

In this tutorial, you:

✅ Installed Node.js and pnpm  
✅ Cloned the repository  
✅ Installed dependencies  
✅ Ran the development server  
✅ Made your first code change  
✅ Learned basic project structure  

**You're now ready to start developing!** 🚀

---

## Need Help?

- 📖 [Documentation Hub](../README.md)
- 💬 [GitHub Discussions](https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/discussions)
- 🐛 [Report an Issue](https://github.com/Digital-Revolution-Cuba/Digital-Revolution-Web/issues)
