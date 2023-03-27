
const dotenv = require('dotenv').config();

const express = require('express');
const dbConnect = require('./config/dbConnect');

const app = express();

const PORT = process.env.PORT || 4000;

dbConnect();

app.use('/', (req, res) => {
    console.log("Hello from server side");
});


app.listen(PORT, (err) => {
    if(err) {
        console.log("Error while running server");
        return;
    }
    console.log(`Server rinning on port ${PORT}`);
});