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
    tldr: z.array(z.string()).length(3),
    // Decision records; `alternative` only where one was actually considered
    decisions: z
      .array(
        z.object({
          title: z.string(),
          alternative: z.string().optional(),
          why: z.string(),
          tradeoff: z.string().optional(),
        }),
      )
      .min(2),
    pullQuote: z.string(),
    // Full 'What I'd do differently' text; pullQuote is its headline
    lesson: z.string(),
    diagram: z.object({
      nodes: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          sub: z.string().optional(),
          col: z.number().min(0),
          row: z.number().min(0),
          kind: z.enum(['source', 'core', 'guard', 'surface', 'target']).default('core'),
          // Links this node to decisions[callout - 1]
          callout: z.number().int().min(1).optional(),
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

// Skills matrix: every skill carries a proficiency tier and evidence.
const skills = defineCollection({
  loader: file('src/data/skills.json'),
  schema: z.object({
    category: z.enum(['languages', 'networking', 'platforms', 'data', 'ai', 'reliability', 'leadership']),
    skill: z.string(),
    tier: z.enum(['expert', 'proficient', 'working']),
    evidence: z.string(),
    // Earlier-career skills render in a separate sub-row
    earlier: z.boolean().default(false),
    order: z.number(),
  }),
});

// Impact ledger rows (numbers that aren't already in the hero bar)
const telemetry = defineCollection({
  loader: file('src/data/telemetry.json'),
  schema: z.object({
    value: z.string(),
    label: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

const principles = defineCollection({
  loader: file('src/data/principles.json'),
  schema: z.object({
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

export const collections = { work, projects, experience, skills, telemetry, principles, incidents, teamPhases };
