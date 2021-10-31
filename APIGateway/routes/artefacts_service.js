const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = process.env.BASE_URL_ARTEFACTS || 'http://localhost:9002'
const http = axios.create({ baseURL })

router.get(`/`, async (req, res) => {
    try {
        const response = await http.get('/books', { params: req.query })
        res.status(200).send(response.data);
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Active';
        }
    } 
    catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Inactive';
        }
    }
});

router.get(`/samples`, async (req, res) => {
    try {

        const response = await http.get('/books/samples');
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Inactive';
        }
    }
});

router.post(`/`, async (req, res) => {
    try {

        const response = await http.post('/books', req.body);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Inactive';
        }
    }
});

router.post(`/bulk-rate`, async (req, res) => {
    try {

        const response = await http.post('/books/bulk-rate', req.body);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Inactive';
        }
    }
});

router.post(`/rate`, async (req, res) => {
    try {

        const response = await http.post('/books/rate', req.body);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.artefactsService) {
            req.systemStatus.artefactsService.status = 'Inactive';
        }
    }
});

module.exports = router;