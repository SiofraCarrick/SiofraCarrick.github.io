const fs = require("fs");
const path = require("path");

const booksDir = path.join(__dirname, "../books");
const outputFile = path.join(__dirname, "../books.json");

const books = fs.readdirSync(booksDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(dir => {
    const bookPath = path.join(booksDir, dir.name);
    const chapters = fs.readdirSync(bookPath)
      .filter(f => f.endsWith(".mp3"))
      .sort((a,b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(f => `books/${dir.name}/${f}`);
    const cover = fs.existsSync(path.join(bookPath, `${dir.name}.jpg`))
      ? `books/${dir.name}/${dir.name}.jpg`
      : "";
    return {
      title: dir.name,
      cover,
      chapters
    };
  });

fs.writeFileSync(outputFile, JSON.stringify(books, null, 2));
console.log("books.json generated!");