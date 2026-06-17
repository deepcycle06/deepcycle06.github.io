import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  // Interim gratis host tijdens validatie (GitHub Pages user-site → root-pad).
  // Wissel naar 'https://seizoensplanner.be' zodra het echte domein live staat
  // (zelfde waarde als SITE.url in src/config/site.ts).
  site: 'https://deepcycle06.github.io',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/docs/'),
    }),
    icon(),
  ],
});
