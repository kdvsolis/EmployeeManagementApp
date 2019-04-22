var mongoose = require('mongoose');

var TimeInOutSchema = new mongoose.Schema({
  userID: String,
  date: { type: Date, default: Date.now },
  time_in: String ,
  time_out : String 
});

module.exports = mongoose.model('TimeInOut', TimeInOutSchema);