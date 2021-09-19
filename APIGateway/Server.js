const express = require('express')
const cors = require('cors');
const dotevn = require('dotenv');
const morgan = require('morgan')

dotevn.config();

const router = require('./routes')
const app = express()
const port = process.env.PORT || 9080

app.use(cors());
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

router(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
 })

