
const dotenv = require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error while running server");
        return;
    }
    console.log(`Server rinning on port ${PORT}`);
});