const fs = require('fs');
const readline = require('readline');
const { v4: uuid } = require('uuid');

const readInterface = readline.createInterface({
    input: fs.createReadStream('C:\\Users\\Aleksandar\\Documents\\BX-Books.csv'),
    // input: fs.createReadStream('C:\\Users\\Aleksandar\\Documents\\sample_books.csv'),
    console: false
});

readInterface.on('line', (line) => {
    const [isbn, title, author, year] = line.split(';').slice(0, 4);
    const processedAuthor = author.toLowerCase().slice(1, author.length - 1)
    if (!authors.has(processedAuthor)) {
        authors.set(processedAuthor, uuid());
    }
    const processedTitle = title.replace(/"/g, '');
    books.push({
        title: processedTitle,
        year: Number.parseInt(year),
        author: authors.get(processedAuthor),
        isbn,
    });
    // console.log({ authors })
});


readInterface.on('close', () => {
    const uniqueAuthors = Array.from(authors).map(([name, signature]) => ({ name, signature }));
    fs.writeFile('./authors.json', JSON.stringify(uniqueAuthors, null, 2), () => console.log('Authors written to file!'));
    fs.writeFile('./books.json', JSON.stringify(books, null, 2), () => console.log('Books written to file!'));
})
const authors = new Map();
const books = [];

