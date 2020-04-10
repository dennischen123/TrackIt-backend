const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarrantySchema = new Schema({
    brand: String,
    model: String,
    purchaseDate: Date,
    warrantyLength: String,
    warrantyPrice: Number,
    serialNumber: String,
    image: String,
    comments: String,
});

module.exports = mongoose.model('Warranty', WarrantySchema);