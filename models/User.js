const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Warranty = require('./Warranty');
const Additional = require('./Additional');

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    warranties: [Warranty.schema],
    additionals: [Additional.schema],
    joinDate: { type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);