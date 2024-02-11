// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import codes from "~/data/codes";
// 2. Define your collection(s)
const translationsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    year: z.number(),
    translator: z.string(),
    code: z.enum(codes),
    source: z.object({
      label: z.string(),
      url: z.string(),
    }),
    isbn: z.string(),
    part: z.number(),
    chapter: z.number().int().max(81),
    chapterName: z.string().optional(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  translations: translationsCollection,
};
