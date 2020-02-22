
const { bindDependencies } = require('./registry');

class Service {
    constructor(serviceName) {
        bindDependencies(this, serviceName);
    }
}

module.exports = Service;
