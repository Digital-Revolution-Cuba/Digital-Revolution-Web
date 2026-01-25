import { defineCollection, z } from 'astro:content';

const talents = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    location: z.string().optional(), 
    image: z.string().optional(),
    communityRole: z.string().optional(),
    status: z.enum(['activo', 'core', 'colaborador']).optional(),
    rating: z.number().optional(), 
    followers: z.number().optional(),
    views: z.number().optional(),
    tags: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    focusArea: z.string().optional(),
    currentFocus: z.string().optional(),
    recentActivity: z.array(z.object({
      title: z.string(),
      link: z.string().optional()
    })).optional(),
    externalLink: z.string().url().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { talents };
