const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = process.env.BASE_URL_USERS || 'http://localhost:9000'
const baseURLClusterizationEngine = process.env.BASE_URL_CLUSTERIZATION || 'http://localhost:5000'
const http = axios.create({ baseURL })
const httpClusterizationEngine = axios.create({ baseURL: baseURLClusterizationEngine })

router.post(`/login`, async (req, res) => {
    try {

        console.log({ data: req.body })

        const response = await http.post('/auth/login', req.body);
        res.status(200).send(response.data)

    } catch (error) {
        res.send(error.toString())
    }
});

router.post(`/register`, async (req, res) => {
    try {

        const { data: { user } } = await http.post('/auth/register', req.body)

        if (user.lat && user.lng) {
            const { data: cluster } = await httpClusterizationEngine.post('/cluster', {
                id: user.id,
                lat: user.lat,
                lng: user.lng,
                age: user.age,
            });
            user.cluster_label = cluster
        }


        res.status(200).send(user)

    } catch (error) {
        if (error.response.status >= 400 && error.response.status < 500) {
            res.send(error.response.data)
        } else {
            res.send(error.toString())
        }
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