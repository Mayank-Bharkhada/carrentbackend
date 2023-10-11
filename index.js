const express = require('express'); // import express
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db'); 
const cors = require("cors");
const port = process.env.PORT;

const app = express(); // initialize app
app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(cors());


app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Add other methods here
  res.send();
});

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))



app.get("/",async (req,res) => {
    res.status(200).send("Yo ! all is done");
});

app.use('/api/User',require('./routes/user/Signup'));
app.use('/api/User',require('./routes/user/Login'));
app.use('/api',require('./routes/GetCars'));
app.use('/api',require('./authentication/Authentication'));
// app.use('/api/User',require('./routes/Institute_portal'));
// app.use('/api/User',require('./routes/Admin'));


app.listen(3000,() => {
    console.log(`Server is running at ${port} or 3000 port : `);
}); 
