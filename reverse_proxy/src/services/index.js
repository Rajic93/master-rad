
require('./auth');
require('./books');
require('./emails');
require('./movies');
require('./users');

const serviceRegistry = require('./ServiceRegistry');

module.exports = serviceRegistry.resolveServices();
