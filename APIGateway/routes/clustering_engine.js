//CLUSTERING ENGINE port:5000

const express = require('express')

const router = express.Router();
const axios = require('axios')

const baseURL = process.env.BASE_URL_CLUSTERIZATION || 'http://localhost:5000'
const http = axios.create({ baseURL })

router.get(`/`, async (req, res) => {
    try {
        const {
            labels,
            labelIds,
            clusters,
        } = await http.get('/cluster');

        res.send(clusters)
    } catch (error) {
        res.send(error.toString())
    }
});

module.exports = router;
