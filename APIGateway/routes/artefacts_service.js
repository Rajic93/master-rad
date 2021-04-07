const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = 'http://localhost:9002'
const http = axios.create({ baseURL })

router.get(`/`, async (req, res) => {
    try {
        const response = await http.get('/books', { params: req.query })
        res.status(200).send(response.data);
    } 
    catch (error) {
        res.send(error.toString())
    }
});

router.get(`/samples`, async (req, res) => {
    try {

        const response = await http.get('/books/samples');
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.post(`/`, async (req, res) => {
    try {

        const response = await http.post('/books', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.post(`/bulk-rate`, async (req, res) => {
    try {

        const response = await http.post('/books/bulk-rate', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.post(`/rate`, async (req, res) => {
    try {

        const response = await http.post('/books/rate', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

module.exports = router;