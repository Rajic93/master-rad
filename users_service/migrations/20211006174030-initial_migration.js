const modelsOld = require('../models').modelsOld

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await modelsOld.User.findAll();
    const toCreate = users.map((u) => ({
      id: u.id,
      email: u.email,
      password: u.password,
      age: u.age,
      city: u.city,
      country: u.country,
      state: u.state,
      street: u.street,
      lat: u.lat,
      lng: u.lng,
      raw_address: u.raw_address,
      cluster_label: u.cluster_label,
      cluster_id: u.cluster_id,
    }))
    
    console.log(toCreate)
    
    return queryInterface.bulkInsert('users', toCreate);
  },
};
