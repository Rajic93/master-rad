const Sequelize = require('sequelize');

const connect = () => {
    const instance = new Sequelize('postgres://yymcdtjs:Qph_VjNG4nv_bT-758_e3ZFzsoHXU5o0@balarama.db.elephantsql.com:5432/yymcdtjs', {
        define: { freezeTableName: true },
    });

    instance.authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(error => console.error('Unable to connect to the database:', error));

    return instance;
}

module.exports = { connect };
