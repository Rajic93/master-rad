const axios = require('axios');
const { Sequelize } = require('sequelize');
const _ = require('lodash');

const sequelize = new Sequelize('masterdb', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5003,
});

const memory = {};

const readUsers = async () => {
    try {
    const [users] = await sequelize.query('select * from users where lng is null or lat is null;');

    let index = 0;
    const throttledUpdate = () => setTimeout(() => {
        try {
            console.log({ index, usersLen: users.length, cached: Object.keys(memory).length })
            if (index >= users.length) {
                return;
            }
            const user = users[index];
            const params = {
                access_key: 'bf047cd1391320397c1c53c10874a485',
                query: user.raw_address,
            }
            console.log('executed with', params);
        
            if (memory[user.raw_address]) {
                const query = constructQuery(memory[user.raw_address], user.id);
                updateUser(query);
            } else {
                axios.get('http://api.positionstack.com/v1/forward', { params })
                    .then(response => response.data)
                    .then(addresses => addresses.data)
                    .then(async (addresses) => {
                        if (!addresses[0]) {
                            return;
                        }
                        const address = addresses[0];
                        memory[user.raw_address] = address;
                        const query = constructQuery(address, user.id);
                        updateUser(query);
                    }).catch(error => {
                        console.log({error});
                    });
            }
                   
        } catch (error) {
                
        }
        index = index + 1;
        throttledUpdate()
    }, 2 * 1000);

    throttledUpdate();

    } catch (error) {
        console.log('readUsers error', error.toString())
    }
};

const constructQuery = (address, id) => {
    const city = address.locality ? `'${address.locality}'` : null;
    const country = address.country ? `'${address.country}'` : null;
    const state = address.region ? `'${address.region}'` : null;
    const lat = address.latitude ? `${address.latitude}` : null;
    const lng = address.longitude ? `${address.longitude}` : null;

    return `update users set city = ${city}, country = ${country}, state = ${state}, lng = ${lng}, lat = ${lat} where id = ${id};`;
}

const updateUser = async (query) => {
    try {
        await sequelize.query(query);
    } catch(error) {
        console.log(error.toString());
    }
}

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');


        readUsers()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


testConnection();