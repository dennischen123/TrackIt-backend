const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdditionalSchema = new Schema({
    category: String,
    // fields: { type: Schema.Types.Mixed, default: {} },
    fields: Object,
    dataList: [{}]
}, { minimize: false });

module.exports = mongoose.model('Additional', AdditionalSchema);