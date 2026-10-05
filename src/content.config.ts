import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories, type Category } from './data/categories';

const categoryKeys = Object.keys(categories) as [Category, ...Category[]];

// Case studies: one markdown file per system in src/content/work/.
// The diagram is data (nodes on a grid + edges), rendered as SVG.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()).min(1),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).min(2).max(4),
    diagram: z.object({
      nodes: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          sub: z.string().optional(),
          col: z.number().min(0),
          row: z.number().min(0),
          kind: z.enum(['source', 'core', 'guard', 'surface', 'target']).default('core'),
        }),
      ),
      edges: z.array(z.tuple([z.string(), z.string()])),
    }),
    order: z.number(),
  }),
});

// Smaller project cards ("More work").
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

// "Tools, with receipts": every skill carries the evidence of where it was used.
const toolbox = defineCollection({
  loader: file('src/data/toolbox.json'),
  schema: z.object({
    skill: z.string(),
    group: z.enum(['network', 'platform', 'data', 'ai']),
    where: z.string(),
    evidence: z.string(),
    order: z.number(),
  }),
});

const telemetry = defineCollection({
  loader: file('src/data/telemetry.json'),
  schema: z.object({
    group: z.enum(['systems', 'team']),
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

const principles = defineCollection({
  loader: file('src/data/principles.json'),
  schema: z.object({
    kind: z.enum(['technical', 'team']),
    title: z.string(),
    body: z.string(),
    proof: z.object({ value: z.string(), label: z.string() }),
    order: z.number(),
  }),
});

const incidents = defineCollection({
  loader: file('src/data/incidents.json'),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    severity: z.enum(['high', 'medium']),
    impact: z.string(),
    cause: z.string(),
    fix: z.string(),
    result: z.string(),
    order: z.number(),
  }),
});

const teamPhases = defineCollection({
  loader: file('src/data/team-phases.json'),
  schema: z.object({
    phase: z.string(),
    when: z.string(),
    title: z.string(),
    detail: z.string(),
    order: z.number(),
  }),
});

export const collections = { work, projects, experience, toolbox, telemetry, principles, incidents, teamPhases };
