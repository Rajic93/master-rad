
class ServiceRegistry {
    constructor() {
        if (!ServiceRegistry.instance) {
            this.services = {};
            ServiceRegistry.instance = this;
        }

        return ServiceRegistry.instance;
    }
}

const instance = new ServiceRegistry();
Object.freeze(instance)

module.exports = instance;

