const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const carData = require('../carData');

const axios = require('axios');

router.post('/GetCars', async (req, res) => {
  try {
    
    const url = 'https://crowded-toad-hoodie.cyclic.app/api/authentication'; // Replace with your desired URL
    const data = {
      Token: req.body.Token,
    };
  
  
      const response = await axios.post(url, data);
      console.log('POST request successful. Response:', response.data);

    res.status(200).json({success: true, carData  });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
