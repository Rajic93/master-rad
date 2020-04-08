
const fs = require('fs');

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

class ServiceRegistry {
    constructor() {
        if (!ServiceRegistry.instance) {
            this.services = {};
            ServiceRegistry.instance = this;
        }

        return ServiceRegistry.instance;
    }

    async discoverServices() {
        console.log('Discovering services...')
        const files = fs.readdirSync(__dirname);
        files.sort((a, b) => a.localeCompare(b))
        files.filter(file => fs.lstatSync(`${__dirname}/${file}`).isDirectory())
            .map((dir, index, services) => require(`./${dir}`));
        console.log('Services successfully registered.');
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
        console.log(`Hello from ${capitalize(serviceName)}Service!`);
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
        this.discoverServices();
        console.log('Services binding and dependencies resolution initialized...')
        const services = Object.keys(this.services).reduce((acc, curr) => {
            const ServiceModule = this.services[curr].module;
            acc[capitalize(curr)] = new ServiceModule();
            return acc;
        }, {});
        console.log('Services successfully bound.');
        return services;
    };
}

const instance = new ServiceRegistry();
Object.freeze(instance);

module.exports = instance;

