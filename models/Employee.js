var mongoose = require('mongoose');
var userID = require('shortid');

var EmployeeSchema = new mongoose.Schema({
  userID: {type: String, unique: true, default: userID.generate},
  name: String,
  active:  Boolean
});

module.exports = mongoose.model('Employee', EmployeeSchema);