const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = 'http://localhost:9000'
const http = axios.create({ baseURL })

router.post(`/login`, async (req, res) => {
    try {

        const response = await http.post('/auth/login', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.post(`/register`, async (req, res) => {
    try {

        const response = await http.post('/auth/register', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.get(`/activate/:token`, async (req, res) => {
    try {
        const { token } = req.params
        const response = await http.get('/auth/activate/'+ token);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.get(`/deactivate`, async (req, res) => {
    try {

        const response = await http.get('/auth/deactivate', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

module.exports = router;