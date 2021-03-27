var csv = require('csv-parser')
var fs = require('fs')
const _ = require('lodash');
const db = require('../artefacts_service/models/index');

const parsed = fs.createWriteStream('./parsed_books.sql');
const failed = fs.createWriteStream('./failed.sql');

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

const data = [];

const readUsers = () => fs.createReadStream('./BX-Books.csv')
  .pipe(csv())
  .on('data', (raw) => {
    const keys = Object.keys(raw)[0].split(';');
    const values = Object.values(raw)[0].split(';');
    const row = keys.reduce((acc, curr, index) => {
        acc[parseStr(curr)] = parseStr(values[index]);
        return acc;
    }, {})
    const formatted = {
        isbn: row['ISBN'],
        title: row['Book-Title'],
        authors: row['Book-Author'],
        year: Number.parseInt(row['Year-Of-Publication']),
        publisher: row['Publisher'],
        image_url_s: row['Image-URL-S'],
        image_url_m: row['Image-URL-M'],
        image_url_l: row['Image-URL-L'],
    };
    data.push({formatted, raw});
    // console.log({ keys, formatted, row })
    // parsed.write(`insert into books (isbn, title, authors, publlisher, year, image_url_s, image_url_m, image_url_l) values ("${formatted.isbn}", "${formatted.title}", "${formatted.authors}", "${formatted.publisher}", "${formatted.year}", "${formatted.image_url_s}", "${formatted.image_url_m}", "${formatted.image_url_l}");\n`)
  })
  .on('end', () => {
    console.log('users done starting cleanup')
    console.log(data.length)
    insertDataToDb(data.length)
  });

const insertDataToDb = (total) => {
    _.chunk(data, 100).forEach((chunk, index) => {
        const transaction = db.sequelize.transaction(async (t) => {
            _.chunk(chunk, 10).forEach(async (c) => {
                const raw = [];
                try {
                    const promises = []
                    // chunk.forEach((entry) => {
                    //     promises.push(db.Book.create(entry.formatted, { transaction: t }));
                    //     raw.push(entry.raw);
                    // });
                    // await Promise.all(promises);
                    raw.push(c.map(entry => entry.formatted));
                    promises.push(db.Book.bulkCreate(c.map(entry => entry.formatted, { transaction: t })));
                    await Promise.all(promises);
                } catch(e) {
                    console.log(e)
                    raw.forEach(f => {
                        console.log({ f })
                        // if (_.isArray()) {
                            _.forEach(f, (formatted) => {
                                failed.write(`insert into books (isbn, title, authors, publlisher, year, image_url_s, image_url_m, image_url_l) values ("${formatted.isbn}", "${formatted.title}", "${formatted.authors}", "${formatted.publisher}", "${formatted.year}", "${formatted.image_url_s}", "${formatted.image_url_m}", "${formatted.image_url_l}");\n`)
                            })
                        // } else {
                            // failed.write(`insert into books (isbn, title, authors, publlisher, year, image_url_s, image_url_m, image_url_l) values ("${f.isbn}", "${f.title}", "${f.authors}", "${f.publisher}", "${f.year}", "${f.image_url_s}", "${f.image_url_m}", "${f.image_url_l}");\n`)
                        // }
                    })
                }
            })
        });
    })
}

setTimeout(() => { readUsers() }, 2000)
//   readUsers();