
const Sequelize = require('sequelize');

const User = require('./users');
const EmailTemplate = require('./email_template');
const Application = require('./application');
const Cluster = require('./clusters');

// const instanceOld = new Sequelize('deq0ftt8uapr2p', 'fnkgdhsztkvzsj', '61ae98db23550c112620cfca8e02fc721471c412e44aa729a9eb6e1b15d203c1', {
//     host: 'ec2-54-74-156-137.eu-west-1.compute.amazonaws.com',
//     port: 5432,
//     dialect: 'postgres',
//     define: { freezeTableName: true },
//     native: true
// });
const instance = new Sequelize('inq2jqnflzalihf0', 'vyltnw06cmz2x0il', 'ymk0suf158frp3ei', {
    host: 'r6ze0q02l4me77k3.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql',
    define: { freezeTableName: true },
    native: true
});

const models = {
    User: User.init(instance, Sequelize.DataTypes),
    Application: Application.init(instance, Sequelize.DataTypes),
    Cluster: Cluster.init(instance, Sequelize.DataTypes),
    // EmailTemplate: EmailTemplate.init(db, Sequelize.DataTypes),
};
// const modelsOld = {
//     User: User.init(instanceOld, Sequelize.DataTypes),
//     Application: Application.init(instanceOld, Sequelize.DataTypes),
//     Cluster: Cluster.init(instanceOld, Sequelize.DataTypes),
//     // EmailTemplate: EmailTemplate.init(db, Sequelize.DataTypes),
// };


instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

module.exports = {
    ...models,
    db: models,
    // modelsOld,
};
