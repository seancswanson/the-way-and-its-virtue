// Thanks @bdsqqq! Adapted from https://github.com/bdsqqq/psykip/blob/master/src/data/codes.ts
export default ["lao", "lge", "mai", "med", "ukl"] as const;

export const translatorNamesByCode = {
  lao: "Laozi",
  lge: "James Legge",
  med: "C. Spurgeon Medhurst",
  mai: "Victor H. Mair",
  ukl: "Ursula K. Le Guin",
} as const;
export type TranslationCode = keyof typeof translatorNamesByCode;

export const translationYearsByCode = {
  lao: -400,
  lge: 1890,
  mai: 1990,
  med: 1905,
  ukl: 1997,
} as const;
