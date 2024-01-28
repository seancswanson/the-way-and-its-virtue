import { createRequire } from "module";
const require = createRequire(import.meta.url);

const readline = require("readline");
const fs = require("fs");

// Function to convert Roman numeral to number
function romanToNumber(roman) {
  const romanNumerals = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let number = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanNumerals[roman[i]];
    const next = romanNumerals[roman[i + 1]];
    if (next && current < next) {
      number -= current;
    } else {
      number += current;
    }
  }
  return number;
}

// Create a writable stream to the output file
const outputStream = fs.createWriteStream("output.txt");

// Read input line by line
const rl = readline.createInterface({
  input: fs.createReadStream("../source-text/c-spurgeon-medhurst-modified.txt"),
  output: outputStream,
  terminal: false,
});

rl.on("line", (line) => {
  if (line.startsWith("# CHAPTER ")) {
    const romanNumeral = line.split(" ")[2].slice(0, -1);
    const number = romanToNumber(romanNumeral);
    if (isNaN(number)) {
      console.error(`Error converting Roman numeral: ${romanNumeral}`);
    } else {
      outputStream.write(`# CHAPTER ${number}\n`);
    }
  } else {
    outputStream.write(`${line}\n`);
  }
});

rl.on("close", () => {
  outputStream.end();
  console.log("Conversion complete. Output written to output.txt");
});
