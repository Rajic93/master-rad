
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

const PORT = 9000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// json
app.use(bodyParser.json());
app.use(router(app));

app.listen(PORT, () => console.log('Hello from users service!'));

