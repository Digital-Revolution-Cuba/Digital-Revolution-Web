import { defineCollection, z } from 'astro:content';

/**
 * Talents Collection Schema
 * Defines the structure for talent profiles in the community
 */
const talents = defineCollection({
  type: 'data',
  schema: z.object({
    // Core Identity (Required for valid profiles)
    name: z.string(),
    role: z.string(),
    image: z.string().url(),

    // Location & Community
    location: z.string().optional(),
    communityRole: z.string().optional(),
    status: z.enum(['activo', 'core', 'colaborador']).default('colaborador'),

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
        }),
      )
      .default([]),
    externalLink: z.string().url().optional(),

    // Featured Flag
    featured: z.boolean().default(false),
  }),
});

export const collections = { talents };
