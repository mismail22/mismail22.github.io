# Mohanad Ismail · Portfolio

A personal portfolio site built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). It's a fully static site with no client-side framework. The interactive parts (active nav, project filter, contact form) are about 3 KB of inline vanilla TypeScript, and the site can be hosted for free on GitHub Pages, Vercel, or Cloudflare Pages.

## Editing content

All content lives in `src/data/`. You don't need to touch any components.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, headline, status badge, hero status bar, MBA section, education, optional email/resume, social links, Formspree ID, SEO text |
| `projects.json` | Project cards. Order, category, metrics, tags, and optional repo/demo links |
| `experience.json` | Experience timeline entries |
| `skills.json` | Capability matrix under Platforms |
| `telemetry.json` | Impact metric tiles (people first, then platform) |
| `leadership.json` | "How I lead" principles and their proof points |
| `org-growth.json` | Team-building story milestones and headcount |
| `categories.ts` | Project filter categories and their labels |

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

If you use a repo name other than `mismail22.github.io`, update `site.repo` and the portfolio entry's `repo`/`demo` links in `projects.json`.

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
├─ components/           # Navbar, Hero, Telemetry, Leadership, OrgGrowth, Projects, Business, Journey, Contact, Footer
│  └─ ui/                # Section, Panel, Button, Tag, BrandIcon
├─ scripts/              # motion, topology (hero graph), org-growth, nav, project-filter, contact-form
├─ styles/global.css     # Tailwind import + design tokens (@theme)
└─ pages/                # index.astro, 404.astro
```
