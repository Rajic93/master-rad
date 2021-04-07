//CLUSTERING ENGINE port:5000
//api.add_resource(DBScanController, "/cluster") getAll/Post
const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = 'http://localhost:5000'
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
