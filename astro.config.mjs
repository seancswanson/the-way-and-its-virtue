import { defineConfig } from "astro/config";
import markdownIntegration from "@astropub/md";

import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), markdownIntegration()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // syntaxHighlight: 'shiki'
    // syntaxHighlight: 'prism'
  },
  experimental: {
    contentCollectionCache: true,
  },
});
