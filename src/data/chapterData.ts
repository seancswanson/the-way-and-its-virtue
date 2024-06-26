import type { Chapter as ChapterType } from "./chapterNumbers";
import type { TranslationCode } from "./codes";

export type ChapterData = {
  render(): { Content: any } | PromiseLike<{ Content: any }>;
  data: {
    code: TranslationCode;
    chapter: ChapterType;
    body: string;
    chapterName: string;
  };
};
