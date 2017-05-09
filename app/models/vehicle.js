var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VechicleSchema = new Schema({
  make: String,
  model: String,
  color: String

});

module.exports = mongoose.model('Vehicles', VechicleSchema);
