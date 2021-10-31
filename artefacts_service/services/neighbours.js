const axios = require('axios');

const USERS_SERVICE_BASE_URL = process.env.USERS_SERVICE_BASE_URL;

const getAllNeighbours = async (clusterLabel) => axios.get(
    `${USERS_SERVICE_BASE_URL}/users/cluster/${clusterLabel}`,
  ).then(({ data }) => data);

module.exports = { getAllNeighbours };
