/**
 * Dynamic OG Image Generation
 * Route: /og/*.png
 *
 * Query params:
 *   title       - Page title (required)
 *   description - Page description (optional)
 *   type        - Page type: "default" | "concurso" | "colaboracion" | "perfil" | "galeria" | "concursos" | "talentos"
 *   tag         - Extra badge label (optional, e.g. category)
 *   image       - Hero/avatar image URL to embed (optional)
 *
 * Examples:
 *   /og/home.png?title=Inicio&type=default
 *   /og/concurso.png?title=Foto+Urbana&type=concurso&tag=Fotografía&description=...
 *   /og/perfil.png?title=María+García&type=perfil&tag=Artista&image=/images/talents/maria.jpg
 */

import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori from "satori";

// ─── Brand colours ──────────────────────────────────────────────────────────
const BRAND = {
  background: "#0a0a0f",
  backgroundCard: "#111118",
  border: "rgba(255,255,255,0.08)",
  cyan: "#00e5ff",
  purple: "#a855f7",
  yellow: "#facc15",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.55)",
  gradient: "linear-gradient(135deg, #0d0d1a 0%, #0a0a0f 100%)",
} as const;

const TYPE_ACCENT: Record<string, string> = {
  default: BRAND.cyan,
  concurso: BRAND.yellow,
  concursos: BRAND.yellow,
  colaboracion: BRAND.purple,
  colaboraciones: BRAND.purple,
  perfil: BRAND.cyan,
  talentos: BRAND.cyan,
  galeria: BRAND.purple,
};

// ─── Font loader (cached per cold start) ─────────────────────────────────────
let fontRegular: ArrayBuffer | null = null;
let fontBold: ArrayBuffer | null = null;

async function loadFonts(origin: string) {
  if (fontRegular && fontBold) return { fontRegular, fontBold };

  const [reg, bold] = await Promise.all([
    fetch(new URL("/fonts/roboto-regular.woff2", origin)).then((r) => r.arrayBuffer()),
    fetch(new URL("/fonts/roboto-bold.woff2", origin)).then((r) => r.arrayBuffer()),
  ]);

  fontRegular = reg;
  fontBold = bold;
  return { fontRegular, fontBold };
}

// ─── SVG template ────────────────────────────────────────────────────────────
function buildTemplate(opts: {
  title: string;
  description: string;
  type: string;
  tag: string;
  accent: string;
  hasHeroImage: boolean;
  heroImageDataUrl?: string;
}) {
  const { title, description, type, tag, accent, hasHeroImage, heroImageDataUrl } = opts;

  // Truncate long strings to avoid overflow
  const safeTitle = title.length > 60 ? title.slice(0, 57) + "…" : title;
  const safeDesc = description.length > 120 ? description.slice(0, 117) + "…" : description;

  const isProfile = type === "perfil";

  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        background: BRAND.background,
        fontFamily: "Roboto",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        // ── Accent gradient glow top-left ──
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-80px",
              left: "-80px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: accent,
              opacity: "0.08",
              filter: "blur(80px)",
            },
          },
        },
        // ── Accent gradient glow bottom-right ──
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "-80px",
              right: hasHeroImage ? "420px" : "-80px",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background: BRAND.purple,
              opacity: "0.06",
              filter: "blur(80px)",
            },
          },
        },
        // ── Top border accent bar ──
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "3px",
              background: `linear-gradient(90deg, ${accent}, ${BRAND.purple}, transparent)`,
            },
          },
        },
        // ── Main content area ──
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "row",
              flex: "1",
              padding: "60px 64px",
              gap: "48px",
              alignItems: "center",
            },
            children: [
              // ── Left: text block ──
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    flex: "1",
                    gap: "20px",
                    justifyContent: "center",
                  },
                  children: [
                    // Brand logo row
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "4px",
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: {
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                background: `linear-gradient(135deg, ${accent}, ${BRAND.purple})`,
                              },
                            },
                          },
                          {
                            type: "span",
                            props: {
                              style: {
                                fontSize: "14px",
                                color: BRAND.muted,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                fontWeight: "400",
                              },
                              children: "Digital Revolution Web",
                            },
                          },
                        ],
                      },
                    },
                    // Tag badge (if present)
                    ...(tag
                      ? [
                          {
                            type: "div",
                            props: {
                              style: {
                                display: "flex",
                                alignItems: "center",
                              },
                              children: [
                                {
                                  type: "span",
                                  props: {
                                    style: {
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      letterSpacing: "0.15em",
                                      textTransform: "uppercase",
                                      color: accent,
                                      background: `${accent}18`,
                                      border: `1px solid ${accent}40`,
                                      borderRadius: "4px",
                                      padding: "4px 12px",
                                    },
                                    children: tag,
                                  },
                                },
                              ],
                            },
                          },
                        ]
                      : []),
                    // Title
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: safeTitle.length > 40 ? "42px" : "52px",
                          fontWeight: "700",
                          color: BRAND.white,
                          lineHeight: "1.15",
                          letterSpacing: "-0.02em",
                        },
                        children: safeTitle,
                      },
                    },
                    // Description
                    ...(safeDesc
                      ? [
                          {
                            type: "div",
                            props: {
                              style: {
                                fontSize: "18px",
                                fontWeight: "400",
                                color: BRAND.muted,
                                lineHeight: "1.55",
                              },
                              children: safeDesc,
                            },
                          },
                        ]
                      : []),
                    // Bottom accent line
                    {
                      type: "div",
                      props: {
                        style: {
                          width: "48px",
                          height: "3px",
                          borderRadius: "2px",
                          background: `linear-gradient(90deg, ${accent}, ${BRAND.purple})`,
                          marginTop: "8px",
                        },
                      },
                    },
                  ],
                },
              },
              // ── Right: hero image (optional) ──
              ...(hasHeroImage && heroImageDataUrl
                ? [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: "0",
                        },
                        children: [
                          {
                            type: "img",
                            props: {
                              src: heroImageDataUrl,
                              style: isProfile
                                ? {
                                    width: "240px",
                                    height: "240px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: `3px solid ${accent}60`,
                                    boxShadow: `0 0 40px ${accent}30`,
                                  }
                                : {
                                    width: "360px",
                                    height: "240px",
                                    borderRadius: "16px",
                                    objectFit: "cover",
                                    border: `1px solid ${BRAND.border}`,
                                    boxShadow: `0 0 60px ${accent}20`,
                                  },
                            },
                          },
                        ],
                      },
                    },
                  ]
                : []),
            ],
          },
        },
        // ── Bottom bar ──
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "1px",
              background: BRAND.border,
            },
          },
        },
        // ── Bottom URL watermark ──
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "22px",
              right: "64px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.05em",
            },
            children: "digital-revolution-web.vercel.app",
          },
        },
      ],
    },
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────
export const GET: APIRoute = async ({ url, request }) => {
  const params = url.searchParams;
  const title = params.get("title") || "Digital Revolution Web";
  const description = params.get("description") || "";
  const type = params.get("type") || "default";
  const tag = params.get("tag") || "";
  const imageParam = params.get("image") || "";
  const accent = TYPE_ACCENT[type] ?? BRAND.cyan;

  const origin = new URL(request.url).origin;

  // Load fonts
  const { fontRegular: reg, fontBold: bold } = await loadFonts(origin);

  // Optionally fetch hero image and convert to data URL
  let heroImageDataUrl: string | undefined;
  let hasHeroImage = false;

  if (imageParam) {
    try {
      const imageUrl = imageParam.startsWith("http")
        ? imageParam
        : new URL(imageParam, origin).toString();

      const imgRes = await fetch(imageUrl);
      if (imgRes.ok) {
        const imgBuffer = await imgRes.arrayBuffer();
        const contentType = imgRes.headers.get("content-type") || "image/jpeg";
        const base64 = Buffer.from(imgBuffer).toString("base64");
        heroImageDataUrl = `data:${contentType};base64,${base64}`;
        hasHeroImage = true;
      }
    } catch {
      // Image fetch failed — render without it
    }
  }

  const element = buildTemplate({
    title,
    description,
    type,
    tag,
    accent,
    hasHeroImage,
    heroImageDataUrl,
  });

  // Render SVG with satori
  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Roboto",
        data: reg!,
        weight: 400,
        style: "normal",
      },
      {
        name: "Roboto",
        data: bold!,
        weight: 700,
        style: "normal",
      },
    ],
  });

  // Convert SVG → PNG with resvg
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
};
