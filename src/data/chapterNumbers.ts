export const translationChapterNumbers = Array.from(Array(81).keys()).map(
  (x) => x++
);

// Thanks to @bdsqqq for including this reference, I learned something new! See below:
// @lukemorales https://twitter.com/lukemorales/status/1564424193877368832
type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | OneToNine;
type CompleteTensDigit = 1 | 2 | 3 | 4;

export type Chapter =
  | `${OneToNine}`
  | `${CompleteTensDigit}${ZeroToNine}`
  | `${8}${Extract<ZeroToNine, 1>}`;
