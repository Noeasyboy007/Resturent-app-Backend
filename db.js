const mongoose = require('mongoose');

const mongoUrl=process.env.MONGO_URL

mongoose.connect(mongoUrl)
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.error('Mongo Connection Error:', err));


const db = mongoose.connection;

module.exports = db;
 