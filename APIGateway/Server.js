const express = require('express')
const cors = require('cors');

const router = require('./routes')
const app = express()
const port = 9080

app.use(cors());
app.use(express.json())
router(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
 })

