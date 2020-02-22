
require('./auth');
require('./books');
require('./movies');
require('./users');


const ServiceRegistry = require('./ServiceRegistry');

const resolveServices = () => {
    const registry = ServiceRegistry.services;
    return Object.keys(registry).reduce((acc, curr) => {
        registry[curr].module;
        acc[capitalize(curr)] = registry[curr].module;
        return acc;
    }, {});
};

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

module.exports = resolveServices();
