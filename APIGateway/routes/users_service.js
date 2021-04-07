const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = 'http://localhost:9002'
const http = axios.create({ baseURL })

router.get(`/`, async (req, res) => {
    try {
        const response = await http.get('/users/');      
        res.status(200).send(response.data)
    } catch (error) {
        res.send(error.toString())
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const response = await http.get('/users/'+ id);
        res.status(200).send(response.data)
    } catch (error) {
        res.send(error.toString())
    }
});

router.delete(`/:id`, async (req, res) => {
    try {
        const response = await http.delete('/users/'+ req.params.id);
        res.status(200).send(response.data)
    } catch (error) {
        res.send(error.toString())
    }
});

router.get(`/:id/similar`, async (req, res) => {
    try {
        const { id } = req.params
        const response = await http.get('/users/'+ id + '/similar');
        res.status(200).send(response.data)
    } catch (error) {
        res.send(error.toString())
    }
});

router.put(`/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const response = await http.put('/users/'+ id, req.body);
        res.status(200).send(response.data)
    } catch (error) {
        res.send(error.toString())
    }
});

module.exports = router;