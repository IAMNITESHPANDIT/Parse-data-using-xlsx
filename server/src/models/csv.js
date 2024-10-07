const mongoose = require('mongoose');

const DynamicDataSchema = new mongoose.Schema({}, { strict: false });

const DynamicData = mongoose.model('DynamicData', DynamicDataSchema);

module.exports = { DynamicData };
