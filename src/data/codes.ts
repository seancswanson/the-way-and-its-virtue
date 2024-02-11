// Thanks @bdsqqq! Adapted from https://github.com/bdsqqq/psykip/blob/master/src/data/codes.ts
export default ["lao", "lge", "mai", "med", "ukl"] as const;

export const translatorNamesByCode = {
  lao: "Laozi",
  lge: "James Legge",
  mai: "Victor H. Mair",
  med: "C. Spurgeon Medhurst",
  ukl: "Ursula K. Le Guin",
} as const;
export type TranslationCode = keyof typeof translatorNamesByCode;
