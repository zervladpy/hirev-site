// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind()],
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: "server", access: "secret"}),
      SUPABASE_ANON_KEY: envField.string({ context: "server", access: "secret"}),
    }
  },

  adapter: vercel()
});
