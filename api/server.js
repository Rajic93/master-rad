
const express = require('express');

const server = express();

const bodyParser = require('body-parser');
const cors = require('cors');

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

require('./src/services');
require('./src/models');

const registerRoutes = require('./src/routes');

const port = 5000;

registerRoutes(server);


server.listen(port, () => console.log(`API is up and running at port ${port}!!!`))
