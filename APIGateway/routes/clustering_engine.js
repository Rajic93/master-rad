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

        res.send(clusters);
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.clusteringEngine) {
            req.systemStatus.clusteringEngine.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.clusteringEngine) {
            req.systemStatus.clusteringEngine.status = 'Inactive';
        }
    }
});

module.exports = router;
