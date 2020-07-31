const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Warranty = require('./Warranty');
const Additional = require('./Additional');


//   new schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    warranties: [Warranty.schema],
    additionals: [Additional.schema],
    joinDate: { type: Date, required: true, default: Date.now },
});

//    old schema
// const UserSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     warranties: [Warranty.schema],
//     additionals: [Additional.schema],
//     joinDate: { type: Date, required: true, default: Date.now },
// });

module.exports = mongoose.model('User', UserSchema);