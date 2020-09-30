
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan')
const dotenv = require('dotenv');

const config = require('./src/config');
const router = require('./src/routes');
const modes = require('./src/models');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(config.PORT, () => {
    console.log('App has started at port', config.PORT);
});
