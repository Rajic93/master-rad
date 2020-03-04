
const Sequelize = require('sequelize');

const sequelize = new Sequelize('masterdb', 'root', 'root', {
  host: 'postgres_db',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // logging: process.env.NODE_ENV === 'development',
  define: {
    underscored: false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log('DB connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:\n', error.toString()));

const EmailTemplates = require('./email_templates');

const models = {
  EmailTemplates: EmailTemplates.init(sequelize, Sequelize),
};

Object.values(models)
  .filter((model) => {
    // model.sync({ alter: true });
    return typeof model.associate === 'function';
  })
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;

