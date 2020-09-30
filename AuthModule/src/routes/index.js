
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send('This is auth module');
})

router.post('/local', async (req, res) => {
    res.status(200).send(`Yes, ${req.body.identifier}`);
})

module.exports = router;
