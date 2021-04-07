//CLUSTERING ENGINE port:5000
//api.add_resource(DBScanController, "/cluster") getAll/Post
const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseUrl = 'http://localhost:5000'

router.get(`/`, async (req, res) => {
    try {
        const {
            labels,
            labelIds,
            clusters,
        } = await axios(`${baseUrl}/`);

        res.send(labels)
    } catch (error) {
        res.send(error.toString())
    }
});

module.exports = router;
