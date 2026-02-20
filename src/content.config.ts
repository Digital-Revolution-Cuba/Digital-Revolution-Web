import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/**
 * Talents Collection Schema
 * Defines the structure for talent profiles in the community
 */
const talents = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/talents" }),
  schema: z.object({
    // Core Identity (Required for valid profiles)
    name: z.string(),
    role: z.string(),
    image: z.string(),

    // Location & Community
    location: z.string().optional(),
    communityRole: z.string().optional(),
    status: z.enum(["activo", "core", "colaborador"]).default("colaborador"),

    // Stats & Metrics
    rating: z.number().min(0).max(5).optional(),
    followers: z.number().min(0).optional(),
    views: z.number().min(0).optional(),

    // Skills & Focus
    tags: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    focusArea: z.string().optional(),
    currentFocus: z.string().optional(),

    // Activity & Links
    recentActivity: z
      .array(
        z.object({
          title: z.string(),
          link: z.string().url().optional(),
        })
      )
      .default([]),
    externalLink: z.string().url().optional(),

    // Featured Flag
    featured: z.boolean().default(false),
  }),
});

/**
 * Concursos Collection Schema
 * Defines the structure for contest entries in the community
 */
const concursos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/concursos" }),
  schema: z.object({
    // Core Information
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),

    // Classification
    category: z.enum([
      "fotografia",
      "musica",
      "arte-digital",
      "ilustracion",
      "diseno-grafico",
      "video",
      "escritura",
    ]),
    status: z.enum(["activo", "proximo", "finalizado", "cerrado"]).default("activo"),

    // Visual
    image: z.string(),
    imageAlt: z.string(),

    // Dates
    fechas: z.object({
      inicio: z.coerce.date(),
      cierre: z.coerce.date(),
      resultados: z.coerce.date().optional(),
    }),

    // Contest Details
    premios: z.array(
      z.object({
        position: z.number(),
        prize: z.string(),
        value: z.string().optional(),
      })
    ),
    requisitos: z.array(
      z.object({
        id: z.string(),
        description: z.string(),
      })
    ),

    // Participation
    participationLink: z.string().url().optional(),
    maxParticipants: z.number().optional(),
    currentParticipants: z.number().default(0),

    // Additional metadata
    organizer: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

/**
 * Colaboraciones Collection Schema
 * Defines the structure for community collaborations with external partners
 */
const colaboraciones = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/colaboraciones" }),
  schema: z.object({
    // Core Information
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    descriptionLong: z.string().optional(),

    // Classification
    status: z.enum(["activa", "finalizada", "pausada", "planificada"]).default("activa"),
    areas: z.array(
      z.enum(["arte", "musica", "tecnologia", "educacion", "contenido", "eventos", "investigacion"])
    ),

    // Partner Information
    partner: z.object({
      name: z.string(),
      type: z.string(), // Empresa, ONG, Institución, Comunidad
      logo: z.string().optional(),
      website: z.string().url().optional(),
    }),

    // Visual
    image: z.string(),
    imageAlt: z.string(),

    // Dates
    fechas: z.object({
      inicio: z.coerce.date(),
      fin: z.coerce.date().optional(),
    }),

    // Collaboration Details
    participants: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          avatar: z.string().optional(),
        })
      )
      .default([]),
    impacto: z
      .array(
        z.object({
          metric: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    objetivos: z.array(z.string()).default([]),

    // Links
    externalLink: z.string().url().optional(),
    repositoryLink: z.string().url().optional(),
    caseStudyLink: z.string().url().optional(),

    // Additional metadata
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { talents, concursos, colaboraciones };
