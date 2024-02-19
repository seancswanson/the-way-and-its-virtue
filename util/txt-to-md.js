import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("node:fs");

fs.readFile(
  "../source-text/reformatted/leguin-translation-reformatted.txt",
  "utf8",
  (err, data) => {
    if (err) throw err;

    const chapterContent = splitByChapter(data);
    // console.log(chapterContent);
  }
);

function splitByChapter(data) {
  const chapterRegex = /# CHAPTER \d+/;
  const chapterNameRegex = /## (.+)/;

  // Split the text based on the chapter regex
  // The split operation will include the chapter headings in the resulting array
  const chapters = data.split(chapterRegex);

  // Process each chapter
  chapters.forEach((chapterContent, index) => {
    // Skip the first empty string if it exists
    if (index === 0 && chapterContent.trim() === "") {
      return;
    }

    const chapterNumber = index;
    const chapterNameMatch = chapterContent.match(chapterNameRegex);
    let chapterName = "";
    if (chapterNameMatch) {
      chapterName = chapterNameMatch[1].trim();
      // Remove the chapter name from the content
      chapterContent = chapterContent.replace(chapterNameRegex, "").trim();
    }
    writeToMdFile({
      chapterNumber: chapterNumber,
      chapterName: chapterName,
      content: chapterContent.trim(),
    });
  });
}

function writeToMdFile(data) {
  const frontmatter = `---
title: Lao Tzu's Tao Te Ching - An English Version by Ursula K. Le Guin
year: 1997
translator: Ursula K. Le Guin
code: ukl
source:
  { label: github.com, url: https://github.com/nrrb/tao-te-ching/tree/master }
isbn: 978-1-59030-744-1
part: ${data.chapterNumber > 38 ? 2 : 1}
chapter: ${data.chapterNumber}
chapterName: ${data.chapterName}
---\n`;
  console.log(frontmatter);
  fs.writeFile(
    `../src/content/translations/ukl/${data.chapterNumber}.md`,
    `${frontmatter}${data.content}`,
    { flag: "w" },
    function (err) {
      if (err) return console.error(err);
      fs.readFileSync(
        "../src/content/translations/ukl/${data.chapterNumber}.md",
        "utf-8",
        function (err, data) {
          if (err) return console.error(err);
          console.log(data);
        }
      );
    }
  );
}
