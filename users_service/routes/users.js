const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('success')
})

router.get('/:id', (req, res) => {
    res.status(200).send('success')
})

router.delete('/:id', (req,res) => {
    res.status(200).send('success')
})

router.put('/:id', (req, res) => {
    res.status(200).send('success')
})

router.get('/cluster', (req,res) => {
    res.status(200).send('success')
})

router.get('/similar', (req,res) => {
    res.status(200).send('success')
})

router.put('/rate', (req,res) => {
    res.status(200).send('success')
})

module.exports = router;