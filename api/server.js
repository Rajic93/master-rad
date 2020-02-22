
const express = require('express');

const app = express();

const registerRoutes = require('./src/routes');

const port = 5000;

registerRoutes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
