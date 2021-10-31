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
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.post(`/register`, async (req, res) => {
    try {
        console.log(req.body)
        const { data: { user } } = await http.post('/auth/register', req.body)

        // remove it from here, it is already called in the users service
        // if (user.lat && user.lng) {
        //     try {
        //         const { data: cluster } = await httpClusterizationEngine.post('/cluster', {
        //             id: user.id,
        //             lat: user.lat,
        //             lng: user.lng,
        //             age: user.age,
        //         });
        //         user.cluster_label = cluster
        //     } catch (error) {    
        //     }
        // }


        res.status(200).send(user)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        console.log({ error })
        if (error.response.status >= 400 && error.response.status < 500) {
            res.send(error.response.data)
        } else {
            res.send(error.toString())
        }
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.get(`/activate/:token`, async (req, res) => {
    try {
        const { token } = req.params
        const response = await http.get('/auth/activate/'+ token);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.get(`/deactivate`, async (req, res) => {
    try {

        const response = await http.get('/auth/deactivate', req.body);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

module.exports = router;