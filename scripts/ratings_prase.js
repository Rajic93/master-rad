var csv = require('csv-parser')
var fs = require('fs')
var data = []

const parseStr = (str) => {
    if (!str) {
        return null;
    }
    let key = str;
    if (['\'', '\"'].includes(key[0])) {
        key = key.slice(1);
    }
    if (['\'', '\"'].includes(key[key.length - 1])) {
        key = key.slice(0, key.length - 1);
    }
    if (key.toLowerCase() === 'null') {
        return null;
    }
    if (key.toLowerCase() === 'undefined') {
        return null;
    }
    return key;
}

const parsed = fs.createWriteStream('./parsed_ratings.sql');
const cleaned = fs.createWriteStream('./cleaned_ratings.sql');

fs.createReadStream('./BX-Book-Ratings.csv')
  .pipe(csv())
  .on('data', function (raw) {
    const keys = Object.keys(raw)[0].split(';');
    const values = Object.values(raw)[0].split(';');
    const row = keys.reduce((acc, curr, index) => {
        acc[parseStr(curr)] = parseStr(values[index]);
        return acc;
    }, {})
    const formatted = {
        id: row['User-ID'] ? Number.parseInt(row['User-ID']) : null,
        isbn: row.ISBN,
        rating: row['Book-Rating'] ? Number.parseInt(row['Book-Rating']) : null,
    };
    data.push(formatted)
    parsed.write(`insert into ratings (user_id, isbn, rating) values (${formatted.id}, '${formatted.isbn}', ${formatted.rating});\n`)
  })
  .on('end', function () {
    // cleanData(data);
  });
