
const ServiceRegistry = require('./ServiceRegistry');

const registerService = (
    serviceName,
    serviceModule,
    dependencies = [],
) => {
    const registry = getRegistry();
    if (registry[serviceName]) {
        throw new Error('Service already exists!');
    }

    registry[serviceName] = {
        module: serviceModule,
        dependencies,
    };
};

const getRegistry = () => {
    return ServiceRegistry.services;
}

const resolveDependencies = (name) => {
    const registry = getRegistry();
    if (!registry[name]) {
        throw new Error('Non existing module!');
    }
    const dependencies = registry[name].dependencies;

    return dependencies
    .reduce((acc, curr) => {
        const registry = getRegistry();
        if (!registry[curr]) {
            throw new Error('Non existing dependency!');
        }
        acc.push({
            depName: curr,
            depModule: registry[curr].module,
        });
        return acc;
    }, []);
}

const bindDependencies = (obj, name) => {
    resolveDependencies(name)
        .map(({ depName, depModule: Module }) => { obj[`${depName}Service`] = new Module(); });
}


module.exports = {
    registerService,
    bindDependencies,
    resolveDependencies,
};
