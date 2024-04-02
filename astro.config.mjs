import { defineConfig } from "astro/config";
import markdownIntegration from "@astropub/md";
import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [tailwind(), markdownIntegration(), icon()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: []
    // syntaxHighlight: 'shiki'
    // syntaxHighlight: 'prism'
  },
  experimental: {
    contentCollectionCache: true
  }
});