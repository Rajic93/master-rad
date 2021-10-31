const axios = require('axios')

const http = axios.create({ baseURL: 'http://localhost:5001' })

const express = require('express');
const router = express.Router();


router.get('/recommend', async (req, res) => {
  try {

    const response = await http.get('/recommend', { params: req.query });
    console.log({ response: response.data })
    res.status(200).send(response.data)
  } catch (error) {
    console.log({ error })
    res.status(500).send(error.toString());
  }
});


module.exports = router;
