const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./Image');

const WarrantySchema = new Schema({
    name: { type: String, default: '' },
    brand: { type: String, default: '' },
    model: { type: String, default: '' },
    purchaseDate: Date,
    warrantyLength: { type: String, default: '' },
    warrantyPrice: Number,
    serialNumber: {type: String, default: ''},
    image: Image.schema,
    comments: { type: String, default: '' },
}, { retainKeyOrder: true});

module.exports = mongoose.model('Warranty', WarrantySchema);