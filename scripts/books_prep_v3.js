var csv = require('csv-parser')
var fs = require('fs')
const _ = require('lodash');
const db = require('../artefacts_service/models/index');

const failed = fs.createWriteStream('./failed_rest.sql');

let parsed = [];


const readUsers = () => fs.createReadStream('./failed.sql', { encoding: 'utf-8' })
    .on('data', (raw) => {
        parsed = [
            ...parsed,
            ..._.split(raw, ';\n'),
        ];
    })
    .on('end', () => {
        parsed.forEach(raw => {
            try {
                db.sequelize.query(`${raw};`)
                    .catch(() => failed.write(`${raw};\n`));
            } catch (error) {
            }
        })
    });

readUsers();
