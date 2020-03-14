
require('./books');
require('./emails');
require('./movies');
require('./users');
require('./auth');
require('./recommendation');

const serviceRegistry = require('./ServiceRegistry');

module.exports = serviceRegistry.resolveServices();
