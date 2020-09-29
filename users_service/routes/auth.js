const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    res.status(200).send('success')
})

router.post('/register', (req, res) => {
    res.status(200).send('success')
})

router.get('/activate', (req,res) => {
    res.status(200).send('success')
})

router.post('/forgot-password', (req, res) => {
    res.status(200).send('success')
})

router.post('/set-password', (req,res) => {
    res.status(200).send('success')
})

module.exports = router;