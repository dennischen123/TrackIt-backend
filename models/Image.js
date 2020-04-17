const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Warranty = require('./Warranty');
const Additional = require('./Additional');

const ImageSchema = new Schema({
    // img: { data: Buffer, contentType: String, path: String }
    uid: String,
    data: Buffer,
    contentType: String,
    path: String
});

module.exports = mongoose.model('Image', ImageSchema);