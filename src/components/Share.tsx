// Shoutout to @bdsqqq for this great implementation of a solid-js Astro island 
// https://github.com/bdsqqq/psykip/blob/5243bac358ff7eb1d4c1d8eaf85d5722bb4e7a01/src/components/Share.tsx
import { createSignal, createEffect } from "solid-js";
import { translatorNamesByCode } from "../data/codes";
import type { TranslationCode } from "../data/codes";

const appUrl = "https://the-way-and-its-virtue-git-fixing-e50dae-seanthaswans-projects.vercel.app";

export default function Share({
  translationCode,
  chapterNumber,
  translationMode
}: {
  translationCode: TranslationCode;
  chapterNumber: number;
  translationMode: string;
}) {
  const [isSuccess, setIsSuccess] = createSignal("");
  createEffect(() => {
    //TODO: clear timeout when this runs so the checkmark timing keeps getting reset when people click a lot
    if (!isSuccess()) return;

    setTimeout(() => {
      setIsSuccess("");
    }, 2000);
  });

  createEffect(() => {
    // To make sure this button only appears when JS is enabled, let's start with it hidden and use JS to show it.

    const shareDiv = document.getElementById(
      `${translationCode}-${chapterNumber}-share`
    );
    shareDiv?.classList.remove("pointer-events-none");
    shareDiv?.classList.remove("opacity-0");
    shareDiv?.classList.add("opacity-40");
  });

  return (
    <div
      id={`${translationCode}-${chapterNumber}-share`}
      class="relative pointer-events-none hover:opacity-100 transition-opacity flex flex-col sm:flex-row items-center gap-1"
    >
      <button
        title="Share"
        class="outline-none focus-visible:ring-2 ring-zinc-500 ring-offset-zinc-100 dark:ring-offset-zinc-900 ring-offset-2"
        onClick={async () => {
const mode = translationMode === 'compare' ? 'compare' : 'read';
const url = `${appUrl}/${mode}/${mode === 'compare' ? chapterNumber : translationCode + '/' + chapterNumber}`;
          try {
            if (navigator.share !== undefined) {
              // Browser supports share API
              await navigator.share({
                title:
                  "The Way and its Virtue is a web-based comparitive reader for the Tao Te Ching by Sean Swanson.",
                text: `The Tao Te Ching, chapter ${chapterNumber} — translation by ${translatorNamesByCode[translationCode]}`,
                url: url,
              });
              setIsSuccess("share");
            } else {
              // Browser doesn't support share API so just copy the url to the clipboard (I'm looking at you firefox 👺).
              await navigator.clipboard.writeText(url);
              setIsSuccess("copy");
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {!(isSuccess() === "copy") ? <ShareSvg /> : <CheckmarkSvg />}
      </button>
      <span
        class={`absolute -m-2 top-4 sm:top-1 sm:left-8 transform-gpu transition-all pointer-events-none select-none ${
          isSuccess() === "copy"
            ? "translate-y-0 sm:-translate-x-0 opacity-100"
            : "-translate-y-2 sm:translate-y-0 sm:-translate-x-2 opacity-0"
        }`}
      >
        Copied!
      </span>
    </div>
  );
}

function ShareSvg() {
    return (
      <svg
        class="translate-y-[1px]"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 14v6h-12v-6"></path>
        <path d="M12 2v12"></path>
        <path d="M6 10l6-6 6 6"></path>
      </svg>
    );
  }
  
function CheckmarkSvg() {
  return (
    <svg
      class="translate-y-[1px]"
      width="22"
      height="22"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}