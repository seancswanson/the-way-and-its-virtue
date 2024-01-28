import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("node:fs");

fs.readFile(
  "../source-text/c-spurgeon-medhurst-modified.txt",
  "utf8",
  (err, data) => {
    if (err) throw err;

    const chapterContent = splitByChapter(data);
    console.log(chapterContent);
  }
);

function splitByChapter(data) {
  const chapterRegex = /# CHAPTER \d+/;

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
    console.log(`Chapter ${chapterNumber}:`, chapterContent.trim());

    writeToMdFile({
      chapterNumber: chapterNumber,
      content: chapterContent.trim(),
    });
  });
}

function writeToMdFile(data) {
  const frontmatter = `---
title: "Tao Te Ching"
translator: ""C Spurgeon Medhurst"
source: "#"
isbn: "978-1-64429-025-4"
part: ${data.chapterNumber > 38 ? 2 : 1}
chapter: ${data.chapterNumber}
---
    `;
  fs.writeFile(
    `../src/text-translations/medhurst/ch-${data.chapterNumber}.md`,
    `${frontmatter}\n\n${data.content}`,
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
}
