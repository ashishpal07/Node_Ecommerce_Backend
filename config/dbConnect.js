
const mongoose = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect("mongodb://localhost:27017/digitic");
        console.log("Connectd with mongoDB server successfully");
    } catch(err) {
        console.log("Error while connecting to mongoDB server");
    }
}

module.exports = dbConnect;