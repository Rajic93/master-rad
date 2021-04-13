var csv = require('csv-parser')
var fs = require('fs')
const _ = require('lodash');
var data = []
const cities = {};
const citiesAscii = {};
const countries = {};
const states = {};


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

const parsed = fs.createWriteStream('./parsed_2.sql');
const cleaned = fs.createWriteStream('./cleaned.sql');

const readUsers = () => fs.createReadStream('./BX-Users.csv')
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
        location: row.Location,
        age: row.Age ? Number.parseInt(row.Age) : null,
    };
    data.push(formatted)
    parsed.write(`insert into bx_users values (${formatted.id}, '${formatted.location}', ${formatted.age});\n`)
  })
  .on('end', function () {
    console.log('users done starting cleanup')
    cleanData(data);
  });

const identifyAddress = (parts) => {
    const address = {};
    for (let index = 0; index < parts.length; index++) {
        const part = _.lowerCase(parts[index]);
        if (!address.country && (countries[part])) {
            address.country = part;
        }
        if (!address.state && states[part]) {
            address.state = part;
        }
        if (!address.city && (cities[part] || citiesAscii[part])) {
            const city = cities[part] || citiesAscii[part];
            address.city = _.capitalize(part);
            address.lat = city.lat;
            address.lng = city.lng;
            address.country = _.capitalize(city.country);
            address.state = (city.country === city.state) ? null : _.capitalize(city.state);
        }
    };
    address.raw = parts.join(',');
    // console.log({ address })
    return address;
}

const cleanData = (rawData) => {
    rawData.map((row) => {
        if (!row.location) {
            return {
                ...row,
                location: []
            };
        }
        const parts = row.location.split(', ');

        return {
            ...row,
            location: parts.filter(e => e !== 'n/a' && e.length > 1),
        };
    })
        .map(({ location, ...row }) => {
            const age = isNaN(row.age) ? null : row.age;
            const address = identifyAddress(location);
            const street = address.street ? `'${address.street}'` : null;
            const city = address.city ? `'${address.city}'` : null;
            const state = address.state ? `'${address.state}'` : null;
            const country = address.country ? `'${address.country}'` : null;
            const lat = address.lat ? `${address.lat}` : null;
            const lng = address.lng ? `${address.lng}` : null;
            cleaned.write(`insert into users (id, street, city, state, country, raw_address, lat, lng, age) values (${row.id}, ${street}, ${city}, ${state}, ${country}, '${address.raw}', ${lat}, ${lng}, ${age});\n`)
            return {
                ...row,
                address,
            };
        })
        // .filter((r) => r.location.length < 5 && r.location.length > 1)
        // .forEach((row) => {
        //     const age = isNaN(row.age) ? null : row.age;
        //     cleaned.write(`insert into users (id, street, city, state, country, raw_address, lat, lng, age) values (${row.id}, '${row.address.street}', '${row.address.city}', '${row.address.state}', '${row.address.country}', '${row.address.raw}', '${row.address.lat}', '${row.address.lng}', ${age});\n`)
        // });
};


const addToCollection = (collection, obj, isAscii = false) => {
    const name = _.lowerCase(isAscii ? obj.city_ascii : obj.city);
    const pairName = _.lowerCase(!isAscii ? obj.city_ascii : obj.city);
    if (!collection[name]) {
        collection[name] = {
            lat: obj.lat,
            lng: obj.lng,
            country: _.capitalize(obj.country),
            name: _.capitalize(pairName),
            state: _.capitalize(obj.admin_name),
        }
    }
}

const addToCountry = (collection, obj) => {
    const country = _.lowerCase(obj.country);
    const iso3 = _.lowerCase(obj.iso3);
    const city = _.lowerCase(obj.city);
    const cityAscii = _.lowerCase(obj.city_ascii);
    if (!collection[country]) {
        collection[country] = {};
    }
    if (!collection[iso3]) {
        collection[iso3] = {};
    }
    if (!collection[country][city]) {
        collection[country][city] = {
            lat: obj.lat,
            lng: obj.lng,
            name: _.capitalize(cityAscii),
            state: _.capitalize(obj.admin_name),
        }
    }
    if (!collection[country][cityAscii]) {
        collection[country][cityAscii] = {
            lat: obj.lat,
            lng: obj.lng,
            name: _.capitalize(city),
            state: _.capitalize(obj.admin_name),
        }
    }
    if (!collection[iso3][city]) {
        collection[iso3][city] = {
            lat: obj.lat,
            lng: obj.lng,
            name: _.capitalize(cityAscii),
            state: _.capitalize(obj.admin_name),
        }
    }
    if (!collection[iso3][cityAscii]) {
        collection[iso3][cityAscii] = {
            lat: obj.lat,
            lng: obj.lng,
            name: _.capitalize(city),
            state: _.capitalize(obj.admin_name),
        }
    }
}

const addToState = (collection, obj) => {
    const state = _.lowerCase(obj.adminName);
    const city = _.lowerCase(obj.city);
    const cityAscii = _.lowerCase(obj.city_ascii);
    if (!collection[state]) {
        collection[state] = {};
    }
    if (!collection[state][city]) {
        collection[state][city] = {
            lat: obj.lat,
            lng: obj.lng,
            name: _.capitalize(cityAscii),
            country: obj.country,
            state: _.capitalize(obj.admin_name),
        }
    }
    if (!collection[state][cityAscii]) {
        collection[state][cityAscii] = {
            lat: obj.lat,
            lng: obj.lng,
            name: _.capitalize(city),
            country: obj.country,
            state: _.capitalize(obj.admin_name),
        }
    }
}

const initGeocoords = () => fs.createReadStream('./worldcities.csv')
  .pipe(csv())
  .on('data', function (raw) {
    const keys = Object.keys(raw);
    const values = Object.values(raw);
    const row = keys.reduce((acc, curr, index) => {
        acc[parseStr(curr)] = parseStr(values[index]);
        return acc;
    }, {})
    addToCollection(cities, row);
    addToCollection(citiesAscii, row, true);
    addToCountry(countries, row);
    addToState(states, row);
    // console.log(Object.keys(countries))
  })
  .on('end', function () {
    console.log('geocords done starting users')
    readUsers();
  });

  initGeocoords();

