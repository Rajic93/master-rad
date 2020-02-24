
const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

class ServiceRegistry {
    constructor() {
        if (!ServiceRegistry.instance) {
            this.services = {};
            ServiceRegistry.instance = this;
        }

        return ServiceRegistry.instance;
    }

    registerService(
        serviceName,
        serviceModule,
        dependencies = [],
    ) {
        if (this.services[serviceName]) {
            throw new Error('Service already exists!');
        }
    
        this.services[serviceName] = {
            module: serviceModule,
            dependencies,
        };
    }

    getRegistry() {
        return this.services;
    }

    resolveDependencies(name) {
        if (!this.services[name]) {
            throw new Error('Non existing module!');
        }
        const dependencies = this.services[name].dependencies;
    
        return dependencies
        .reduce((acc, curr) => {
            if (!this.services[curr]) {
                throw new Error('Non existing dependency!');
            }
            acc.push({
                depName: curr,
                depModule: this.services[curr].module,
            });
            return acc;
        }, []);
    }

    bindDependencies(obj, name) {
        this.resolveDependencies(name)
            .map(({ depName, depModule: Module }) => { obj[`${depName}Service`] = new Module(); });
    }
    
    resolveServices() {
        return Object.keys(this.services).reduce((acc, curr) => {
            this.services[curr].module;
            acc[capitalize(curr)] = this.services[curr].module;
            return acc;
        }, {});
    };
}

const instance = new ServiceRegistry();
Object.freeze(instance)

module.exports = instance;

