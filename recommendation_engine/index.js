
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const registerRoutes = require('./routes');
const initServices = require('./services');

dotenv.config();

const app = express();

const PORT = 10000;

app.use(cors());
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// json
app.use(bodyParser.json());

const services = initServices({
    models: {
        locations: {
            books: path.join(__dirname, 'models/group1-shard1of5.bin'),
        },
    },
})

registerRoutes(app, services);

app.listen(PORT, () => console.log(`:${PORT} => Hello from recommentation engine!`));

