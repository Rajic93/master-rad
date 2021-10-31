const express = require('express')
const axios = require('axios')

const router = express.Router();
const baseURL = process.env.BASE_URL_USERS || 'http://localhost:9000'
const http = axios.create({ baseURL })

router.get(`/`, async (req, res) => {
    try {
        const response = await http.get('/users/');      
        res.status(200).send(response.data)
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const response = await http.get('/users/'+ id);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.delete(`/:id`, async (req, res) => {
    try {
        const response = await http.delete('/users/'+ req.params.id);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.get(`/:id/similar`, async (req, res) => {
    try {
        const { id } = req.params
        const response = await http.get('/users/'+ id + '/similar');
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

router.put(`/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const response = await http.put('/users/'+ id, req.body);
        res.status(200).send(response.data)
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Active';
        }
    } catch (error) {
        res.send(error.toString())
        res.send(error.toString())
        if (req && req.systemStatus && req.systemStatus.usersService) {
            req.systemStatus.usersService.status = 'Inactive';
        }
    }
});

module.exports = router;