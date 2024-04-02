import type { Chapter as ChapterType } from "./chapterNumbers";
import type { TranslationCode } from "./codes";

export type ChapterData = {
  data: {
    code: TranslationCode;
    chapter: ChapterType;
    body: string;
    chapterName: string;
  };
};
