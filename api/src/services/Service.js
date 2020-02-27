
const ServiceRegistry = require('./ServiceRegistry');

class Service {
    constructor(serviceName) {
        ServiceRegistry.bindDependencies(this, serviceName);
    }
}

module.exports = Service;
