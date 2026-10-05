// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// SITE and BASE let the same code deploy to a custom domain, a user site
// (https://<user>.github.io) or a project site (https://<user>.github.io/<repo>).
// The GitHub Pages workflow sets both automatically.
const site = process.env.SITE || 'https://mismail22.github.io';
const base = process.env.BASE || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
