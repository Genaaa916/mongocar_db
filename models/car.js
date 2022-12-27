var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema(
  {
    merkki: {type: String, required: true},
    malli: {type: String, required: true},
    väri: {type: String, required: true},
    vuosi: {type: Number, required: true},
  }
);

module.exports = mongoose.model('Car', CarSchema);