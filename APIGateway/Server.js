const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

router(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
 })

