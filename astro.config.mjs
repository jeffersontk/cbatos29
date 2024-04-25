import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sanity from "@sanity/astro";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: true,
  adapter: vercel(),
  integrations: [
    tailwind(), 
    sanity({
      projectId: "l9mtpnzh",
      dataset: "production",
      apiVersion: '2024-04-22',
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: "/admin"
    }), 
    react()],
});