import { createSignal, createEffect } from "solid-js";

export default function CopyChapterContent({
  contentId,
  translationCode
}: {
  contentId: string;
  translationCode: string;
}) {
  const [isSuccess, setIsSuccess] = createSignal(false);
  createEffect(() => {
    //TODO: clear timeout when this runs so the checkmark timing keeps getting reset when people click a lot
    if (!isSuccess()) return;

    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  });

  createEffect(() => {
    // To make sure this button only appears when JS is enabled, let's start with it hidden and use JS to show it.

    const copyButton = document.getElementById(`${translationCode}-${contentId}-copy`);
    copyButton?.classList.remove("pointer-events-none");
    copyButton?.classList.remove("opacity-0");
    copyButton?.classList.add("opacity-100");
  });

  return (
    <div
      id={`${translationCode}-${contentId}-copy`}
      class="relative pointer-events-none opacity-0 transition-opacity flex flex-col sm:flex-row items-center gap-1"
    >
      <button
        title="Copy chapter content"
        class="-m-2 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-copy outline-none focus-visible:ring-2 ring-zinc-500 ring-offset-zinc-100 dark:ring-offset-zinc-900 ring-offset-2"
        onClick={async () => {
          try {
            const textContent = document.querySelector(`#${translationCode}-${contentId} .chapter-markdown-container`)?.textContent;
            console.log(textContent);

            await navigator.clipboard.writeText(textContent || "");
            setIsSuccess(true);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {!isSuccess() ? <ClipboardCopy /> : <CheckmarkSvg />}
      </button>
      <span
        class={`absolute -m-2 top-4 sm:top-1 sm:left-6 transform-gpu transition-all pointer-events-none select-none ${
          isSuccess()
            ? "translate-y-0 sm:-translate-x-0 opacity-100"
            : "-translate-y-2 sm:translate-y-0 sm:-translate-x-2 opacity-0"
        }`}
      >
        Copied!
      </span>
    </div>
  );
}

function ClipboardCopy() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256">
	<path fill="currentColor" d="M200 36h-38.08a44 44 0 0 0-67.84 0H56a12 12 0 0 0-12 12v168a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V48a12 12 0 0 0-12-12m-72-8a36 36 0 0 1 36 36v4H92v-4a36 36 0 0 1 36-36m76 188a4 4 0 0 1-4 4H56a4 4 0 0 1-4-4V48a4 4 0 0 1 4-4h32.83A43.71 43.71 0 0 0 84 64v8a4 4 0 0 0 4 4h80a4 4 0 0 0 4-4v-8a43.71 43.71 0 0 0-4.83-20H200a4 4 0 0 1 4 4Z" />
</svg>
  );
}

function CheckmarkSvg() {
  return (
    <svg
      class="translate-y-[1px]"
      width="15"
      height="15"
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