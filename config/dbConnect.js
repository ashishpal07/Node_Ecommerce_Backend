
const mongoose = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Connectd with mongoDB server successfully");
    } catch(err) {
        console.log("Error while connecting to mongoDB server");
    }
}

module.exports = dbConnect;