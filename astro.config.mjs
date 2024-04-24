import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { sanityIntegration } from "@sanity/astro";
import react from "@astrojs/react";

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: true,
  integrations: [tailwind(), 
  sanityIntegration({
    projectId: "l9mtpnzh",
    dataset: "production",
    apiVersion: '2024-04-22',
    useCdn: false,
    // Access the Studio on your.url/admin
    studioBasePath: "/admin"
  }), react()],
  adapter: vercel(),
});