
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')
const dotenv = require('dotenv');
const registerRoutes = require('./routes');

dotenv.config();

const app = express();

const PORT = 9000;

app.use(cors());
app.use(helmet());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// json
app.use(bodyParser.json());

registerRoutes(app);

app.listen(PORT, () => console.log(`:${PORT} => Hello from users service!`));

