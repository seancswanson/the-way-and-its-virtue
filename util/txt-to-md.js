import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("node:fs");

fs.readFile(
  "../source-text/reformatted/original-chinese-reformatted.txt",
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
title: 道德經 (Dàodéjīng) in Classical Chinese
year: ~400 BCE
translator: Laozi
code: lao
source: {
  label: Chinese Text Project,
  url: https://ctext.org/dao-de-jing?en=off
}
isbn: N/A
part: ${data.chapterNumber > 38 ? 2 : 1}
chapter: ${data.chapterNumber}
---\n`;
  console.log(frontmatter);
  fs.writeFile(
    `../src/content/translations/lao/${data.chapterNumber}.md`,
    `${frontmatter}${data.content}`,
    { flag: "w" },
    function (err) {
      if (err) return console.error(err);
      fs.readFileSync(
        "../src/content/translations/lao/${data.chapterNumber}.md",
        "utf-8",
        function (err, data) {
          if (err) return console.error(err);
          console.log(data);
        }
      );
    }
  );
}
