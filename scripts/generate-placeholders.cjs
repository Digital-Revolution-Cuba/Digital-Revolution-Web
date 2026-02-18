/**
 * Generate visual SVG placeholder images for all project sections.
 * Run: node scripts/generate-placeholders.cjs
 */
const fs = require("fs");
const path = require("path");

const PUBLIC = path.resolve(__dirname, "..", "public", "images");

/** Create an SVG placeholder with given dimensions, colors and label */
function svg(w, h, bg, accent, label, icon = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0.8"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <text x="50%" y="48%" font-family="system-ui,sans-serif" font-size="${Math.min(w, h) * 0.08}" font-weight="700" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${label}</text>
  <text x="50%" y="60%" font-family="system-ui,sans-serif" font-size="${Math.min(w, h) * 0.04}" fill="rgba(255,255,255,0.5)" text-anchor="middle" dominant-baseline="middle">${w}×${h}</text>
  ${icon}
</svg>`;
}

/** Create a circular avatar SVG */
function avatarSvg(size, bg, accent, initials) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:1"/>
    </linearGradient>
  </defs>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#g)"/>
  <text x="50%" y="52%" font-family="system-ui,sans-serif" font-size="${size * 0.35}" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ ${path.relative(PUBLIC, filePath)}`);
}

// ─── Gallery Page Placeholders (12 items) ────────────────────────────
console.log("\n📸 Gallery Page Images:");
const galleryPageDir = path.join(PUBLIC, "gallery", "page");
const galleryColors = [
  { bg: "#1a1a2e", accent: "#16213e", label: "Retrato Artístico" },
  { bg: "#0f3460", accent: "#533483", label: "Paisaje Urbano" },
  { bg: "#e94560", accent: "#0f3460", label: "Ilustración Digital" },
  { bg: "#533483", accent: "#e94560", label: "Arte 3D" },
  { bg: "#16213e", accent: "#1a1a2e", label: "Naturaleza" },
  { bg: "#0f3460", accent: "#16213e", label: "Diseño UI" },
  { bg: "#1a1a2e", accent: "#e94560", label: "Retrato Dramático" },
  { bg: "#533483", accent: "#16213e", label: "Diseño Gráfico" },
  { bg: "#e94560", accent: "#533483", label: "Arte Abstracto" },
  { bg: "#16213e", accent: "#0f3460", label: "Arquitectura" },
  { bg: "#0f3460", accent: "#e94560", label: "Producción Musical" },
  { bg: "#1a1a2e", accent: "#533483", label: "Fotografía Moda" },
];
const gallerySizes = [
  [400, 600],
  [600, 400],
  [400, 500],
  [400, 400],
  [500, 600],
  [600, 400],
  [400, 500],
  [500, 400],
  [450, 450],
  [600, 500],
  [400, 350],
  [400, 550],
];
for (let i = 0; i < 12; i++) {
  const c = galleryColors[i];
  const [w, h] = gallerySizes[i];
  write(
    path.join(galleryPageDir, `gallery-${i + 1}.svg`),
    svg(w, h, c.bg, c.accent, c.label),
  );
}

// ─── Gallery Page Avatars (12 creators) ──────────────────────────────
console.log("\n👤 Gallery Creator Avatars:");
const galleryAvatarsDir = path.join(PUBLIC, "gallery", "avatars");
const creatorInitials = [
  "MG",
  "CR",
  "AM",
  "DL",
  "LF",
  "RS",
  "VT",
  "AM",
  "SH",
  "MR",
  "EV",
  "CO",
];
const avatarColors = [
  ["#e94560", "#0f3460"],
  ["#0f3460", "#533483"],
  ["#533483", "#e94560"],
  ["#16213e", "#e94560"],
  ["#1a1a2e", "#0f3460"],
  ["#0f3460", "#16213e"],
  ["#e94560", "#1a1a2e"],
  ["#533483", "#0f3460"],
  ["#16213e", "#533483"],
  ["#0f3460", "#e94560"],
  ["#1a1a2e", "#533483"],
  ["#e94560", "#16213e"],
];
for (let i = 0; i < 12; i++) {
  write(
    path.join(galleryAvatarsDir, `creator-${i + 1}.svg`),
    avatarSvg(80, avatarColors[i][0], avatarColors[i][1], creatorInitials[i]),
  );
}

// ─── Talent Profile Images (5 talents) ───────────────────────────────
console.log("\n🎭 Talent Profile Images:");
const talentsProfileDir = path.join(PUBLIC, "talents", "profiles");
const talents = [
  {
    file: "sofia-chen.svg",
    initials: "SC",
    bg: "#e94560",
    accent: "#533483",
    label: "Sofia Chen",
  },
  {
    file: "maria-garcia.svg",
    initials: "MG",
    bg: "#0f3460",
    accent: "#e94560",
    label: "María García",
  },
  {
    file: "marcus-thorne.svg",
    initials: "MT",
    bg: "#16213e",
    accent: "#0f3460",
    label: "Marcus Thorne",
  },
  {
    file: "julian-velez.svg",
    initials: "JV",
    bg: "#533483",
    accent: "#16213e",
    label: "Julian Velez",
  },
  {
    file: "elena-kovac.svg",
    initials: "EK",
    bg: "#1a1a2e",
    accent: "#e94560",
    label: "Elena Kovac",
  },
];
for (const t of talents) {
  write(
    path.join(talentsProfileDir, t.file),
    svg(500, 700, t.bg, t.accent, t.label),
  );
}

// ─── Concursos Content Images ────────────────────────────────────────
console.log("\n🏆 Concursos Content Images:");
const concursosContentDir = path.join(PUBLIC, "concursos", "activos");
const concursos = [
  {
    file: "arte-digital-futurista.svg",
    bg: "#e94560",
    accent: "#533483",
    label: "Arte Digital Futurista",
  },
  {
    file: "musica-electronica-2026.svg",
    bg: "#0f3460",
    accent: "#16213e",
    label: "Música Electrónica",
  },
  {
    file: "fotografia-urbana-2026.svg",
    bg: "#1a1a2e",
    accent: "#0f3460",
    label: "Fotografía Urbana",
  },
];
for (const c of concursos) {
  write(
    path.join(concursosContentDir, c.file),
    svg(800, 600, c.bg, c.accent, c.label),
  );
}

// ─── Colaboraciones Content Images ───────────────────────────────────
console.log("\n🤝 Colaboraciones Content Images:");
const colabContentDir = path.join(PUBLIC, "colaboraciones");
const colabs = [
  {
    file: "podcast-voces-creativas.svg",
    bg: "#533483",
    accent: "#e94560",
    label: "Voces Creativas",
  },
  {
    file: "hackathon-innovacion-social.svg",
    bg: "#16213e",
    accent: "#0f3460",
    label: "Hackathon Innovación",
  },
  {
    file: "galeria-virtual-arte.svg",
    bg: "#e94560",
    accent: "#1a1a2e",
    label: "Galería Virtual",
  },
  {
    file: "proyecto-sonoro-2025.svg",
    bg: "#0f3460",
    accent: "#533483",
    label: "Proyecto Sonoro",
  },
];
for (const c of colabs) {
  write(
    path.join(colabContentDir, c.file),
    svg(800, 600, c.bg, c.accent, c.label),
  );
}

// ─── GalleryHero Images ──────────────────────────────────────────────
console.log("\n🖼️ Gallery Hero Images:");
const heroDir = path.join(PUBLIC, "gallery", "hero");
write(
  path.join(heroDir, "hero-main.svg"),
  svg(320, 400, "#e94560", "#533483", "Fotografía"),
);
write(
  path.join(heroDir, "hero-secondary.svg"),
  svg(180, 200, "#533483", "#0f3460", "Ilustración"),
);
write(
  path.join(heroDir, "hero-tertiary.svg"),
  svg(160, 180, "#0f3460", "#16213e", "Música"),
);

// ─── JoinOurCommunity Avatars ────────────────────────────────────────
console.log("\n👥 Community Avatars:");
const communityDir = path.join(PUBLIC, "community");
const communityColors = [
  ["#e94560", "#533483"],
  ["#0f3460", "#e94560"],
  ["#533483", "#16213e"],
  ["#16213e", "#0f3460"],
];
for (let i = 0; i < 4; i++) {
  write(
    path.join(communityDir, `user-${i + 1}.svg`),
    avatarSvg(100, communityColors[i][0], communityColors[i][1], `U${i + 1}`),
  );
}

console.log("\n✅ All placeholder images generated successfully!\n");
