const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.MONGODB_URI;

mongoose.connect(DB_URL, {
    useNewURLParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

module.exports = {
    User: require('./User'),
    Warranty: require('./Warranty'),
    Additional: require('./Additional')
}