const fs = require("fs");
const path = require("path");

// Directory containing all your books
const booksDir = path.join(__dirname, "../books");

// Output JSON file
const outputFile = path.join(__dirname, "../books.json");

console.log("Scanning books directory:", booksDir);
console.log("Writing books.json to:", outputFile);

// Read all folders in booksDir
const books = fs.readdirSync(booksDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(dir => {
    const bookPath = path.join(booksDir, dir.name);
    
    // Get all mp3 chapters, sorted naturally
    const chapters = fs.readdirSync(bookPath)
      .filter(f => f.endsWith(".mp3"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(f => `books/${dir.name}/${f}`);

    // Check for cover image
    const coverPath = path.join(bookPath, `${dir.name}.jpg`);
    const cover = fs.existsSync(coverPath) ? `books/${dir.name}/${dir.name}.jpg` : "";

    return {
      title: dir.name,
      cover,
      chapters
    };
  });

// Write JSON file
fs.writeFileSync(outputFile, JSON.stringify(books, null, 2));
console.log("books.json generated!");
