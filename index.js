
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");

const express = require('express');
const dbConnect = require('./config/dbConnect');

const app = express();

const PORT = process.env.PORT || 4000;

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', require('./routes/user'));

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error while running server");
        return;
    }
    console.log(`Server rinning on port ${PORT}`);
});

 