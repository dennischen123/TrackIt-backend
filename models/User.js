const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Warranty = require('./Warranty');
const Additional = require('./Additional');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    warranties: [Warranty.schema],
    additionals: [Additional.schema],
    joinDate: { type: Date, required: true, default: Date.now}
})

moodule.exports = mongoose.model('User', UserSchema);