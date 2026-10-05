# Mohanad Ismail · Portfolio

A personal portfolio site built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). It's a fully static site with no client-side framework. The interactive parts (active nav, project filter, contact form) are about 3 KB of inline vanilla TypeScript, and the site can be hosted for free on GitHub Pages, Vercel, or Cloudflare Pages.

## Editing content

All content lives in `src/data/`. You don't need to touch any components.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, role, headline, status, track-record bar, stack strip, team section content, education, optional email/resume, social links, Formspree ID, SEO text |
| `../content/work/*.md` | **Case studies** (one markdown file each): front matter for title, metrics, stack and the architecture diagram; body for the write-up |
| `telemetry.json` | Impact ledger rows (keep them different from the hero bar) |
| `incidents.json` | Incident log entries (impact, root cause, fix, result) |
| `principles.json` | "How I build" engineering principles and their proof points |
| `team-phases.json` | Team-build timeline |
| `skills.json` | Skills matrix: category, tier (expert / proficient / working), years, evidence |
| `projects.json` | "More work" rows |
| `experience.json` | Release-log (journey) entries |

The JSON files are validated against schemas in `src/content.config.ts`. A typo, such as an unknown category or a missing field, fails the build with a clear error instead of shipping a broken page.

### Add a project

Append an object to `src/data/projects.json`:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "context": "Open source",
  "category": "tools",
  "summary": "One or two sentences on what it does and why it matters.",
  "metrics": [{ "value": "12k", "label": "monthly users" }],
  "tags": ["Go", "Docker"],
  "repo": "https://github.com/mismail22/my-new-project",
  "demo": "https://my-new-project.example.dev",
  "order": 8
}
```

- `id` must be unique.
- `metrics`, `repo`, `demo`, and `context` are optional. A card hides any button whose link is missing.
- To add a new filter tab, add its key to `src/data/categories.ts`. Tabs only appear for categories that have at least one project.

### Add a case study

Copy one of the files in `src/content/work/`, change the front matter and the write-up, and it gets its own page at `/work/<file-name>` plus a chapter on the home page. Front matter holds the TL;DR (3 bullets), metrics, decision records, the lesson and its pull quote, and the diagram. Diagram nodes sit on a grid (`col`, `row`); `kind` controls styling (`source`, `core`, `guard`, `surface`, `target`); `callout: n` links a node to decision n; `edges` are `[from, to]` pairs.

### Content audit

`npm run audit` (also run by the deploy workflow) fails if the built site contains `[CONFIRM]` markers, internal tool names or job titles, incident IDs, personal contact details, exact dollar figures, or skills without evidence. `npm run audit -- --numbers` also lists every numeric claim for a final fact check.

### Other updates

- **Resume:** add a PDF to `public/` (e.g. `public/resume.pdf`) and set `resume: 'resume.pdf'` in `site.ts`. The Resume buttons stay hidden until you do. Check the PDF first: anything in it, such as a phone number, becomes public.
- **Contact form:** create a free form at [formspree.io](https://formspree.io), then copy the ID from the form's endpoint (`https://formspree.io/f/<ID>`) into `formspreeId` in `site.ts`. Messages arrive in your inbox without your address appearing on the site. The form stays hidden until the ID is set.
- **Public email:** optional. Set `email` in `site.ts` to show an Email contact card.
- **Add X/Twitter:** uncomment the X entry in `site.socials`.
- **Social preview image:** after changing your name or headline, run `npm run og` to regenerate `public/og-image.png`.

## Local development

You need Node.js 22.12 or newer.

```bash
npm install        # install dependencies
npm run dev        # dev server with hot reload at http://localhost:4321
npm run check      # type-check .astro/.ts files
npm run build      # production build to ./dist
npm run preview    # serve ./dist locally to test the real build
```

To measure Web Vitals, run `npm run build && npm run preview`. Then open Chrome DevTools → Lighthouse, or run:

```bash
npx lighthouse http://localhost:4321 --view
```

## Deploy for $0

### Option A: GitHub Pages (workflow included)

1. Create a **public** repo on GitHub. Name it `mismail22.github.io` to serve the site at `https://mismail22.github.io`, or use any other name to serve it at `https://mismail22.github.io/<repo>`.
2. Push the code:
   ```bash
   cd ~/portfolio
   git init -b main
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/mismail22/mismail22.github.io.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` type-checks, builds, and deploys on every push to `main`. It sets the site URL and base path automatically, so both repo-name options work. Watch progress in the **Actions** tab.

If you use a repo name other than `mismail22.github.io`, update `site.repo` in `site.ts` (used by the footer's Source link).

### Option B: Vercel

1. Push the repo to GitHub (step 2 above).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and accept the detected **Astro** preset (build `npm run build`, output `dist`).
3. Under **Environment Variables**, add `SITE=https://<your-project>.vercel.app`, or your custom domain, so canonical URLs and the sitemap are correct.

### Option C: Cloudflare Pages

1. Push the repo to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. Set the framework preset to **Astro**, the build command to `npm run build`, and the output directory to `dist`. Add the environment variables `NODE_VERSION=22` and `SITE=https://<project>.pages.dev`.

## Project structure

```
src/
├─ content.config.ts     # Schemas for the JSON data
├─ data/                 # ← all editable content
├─ layouts/BaseLayout.astro
├─ content/work/         # case studies (markdown)
├─ components/           # Navbar, Hero, Telemetry (impact ledger), Systems, Skills, Incidents, Principles, TeamBuild, Journey, Contact, Footer
│  └─ ui/                # Section, Panel, ArchDiagram, Button, Tag, BrandIcon
├─ scripts/              # motion, topology (hero career map), nav, toc, contact-form
├─ styles/global.css     # Tailwind import + design tokens (@theme)
└─ pages/                # index.astro, work/[slug].astro, 404.astro
```
