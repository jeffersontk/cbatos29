import defaultTheme from "tailwindcss/defaultTheme"
import withMT from "@material-tailwind/react/utils/withMT"

const tailwindConfig = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      primary: {
        light: "#BF396B",
        dark: "#7A2240",
      },
      bage: "#F2CEAE",
      secondary: {
        blue: "#202B40",
      },
      gray: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
    },
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

export default withMT(tailwindConfig)
