import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories, type Category } from './data/categories';

const categoryKeys = Object.keys(categories) as [Category, ...Category[]];

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(categoryKeys),
    context: z.string().optional(),
    tags: z.array(z.string()).min(1),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(3).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    order: z.number(),
  }),
});

const experience = defineCollection({
  loader: file('src/data/experience.json'),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    // YYYY-MM; end is null for the current role
    start: z.string().regex(/^\d{4}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
    highlights: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
  }),
});

const skills = defineCollection({
  loader: file('src/data/skills.json'),
  schema: z.object({
    title: z.string(),
    icon: z.enum(['users', 'shield', 'network', 'workflow', 'brain']),
    items: z.array(z.string()).min(1),
    order: z.number(),
  }),
});

const telemetry = defineCollection({
  loader: file('src/data/telemetry.json'),
  schema: z.object({
    group: z.enum(['people', 'platform']),
    label: z.string(),
    detail: z.string().optional(),
    // Shown before an arrow, e.g. "5" in "5 → 24"
    from: z.string().optional(),
    // Final value; animated from 0 (or from `from`) when scrolled into view
    to: z.number(),
    prefix: z.string().default(''),
    suffix: z.string().default(''),
    decimals: z.number().int().min(0).max(3).default(0),
    order: z.number(),
  }),
});

const leadership = defineCollection({
  loader: file('src/data/leadership.json'),
  schema: z.object({
    title: z.string(),
    body: z.string(),
    proof: z.object({ value: z.string(), label: z.string() }),
    order: z.number(),
  }),
});

const orgGrowth = defineCollection({
  loader: file('src/data/org-growth.json'),
  schema: z.object({
    phase: z.string(),
    title: z.string(),
    detail: z.string(),
    headcount: z.number().int().min(1).max(24),
    order: z.number(),
  }),
});

export const collections = { projects, experience, skills, telemetry, leadership, orgGrowth };
