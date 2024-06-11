import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import sanity from "@sanity/astro"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  output: "server",
  prefetch: true,
  adapter: vercel(),
  integrations: [
    tailwind(),
    sanity({
      projectId: "l9mtpnzh",
      dataset: "production",
      apiVersion: "2024-04-22",
      token:
        "sk7breXO8dwgBkC1ABK9YKrUU0J2u7hc3ujEKUzF5wuPHRoTjDt0TCr6e7EkbEp2U8AeEM7yAZsOZPlkJQyklKX72GrV8TZOeTAfryzgTcXVEZP6y6RF8KUar1vmJINuI1hMg6yVMxeh0bG3DXsopR0NRL67fF2k8PRfbosxPDfwvZz5N5gU",
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: "/admin",
    }),
    react(),
  ],
})
