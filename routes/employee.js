var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Employee = require('../models/Employee.js');
var TimeInOut = require('../models/TimeInOut.js');
const jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/time-tracking-app', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var USERS = [
    { 'id': 1, 'username': 'root' },
];

/* GET ALL EMPLOYEE */
router.get('/', function(req, res, next) {
  Employee.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});
/* GET FILTERED EMPLOYEE BY NAME */
router.post('/employee-search', function(req, res, next) {
  Employee.find({ $and: [{name :  {$regex : req.body.search}}, {active : req.body.active}]}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* GET SINGLE EMPLOYEE BY ID */
router.get('/:userID', function(req, res, next) {
  Employee.find({userID : req.params.userID}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* GET SINGLE EMPLOYEE TIME IN OUT BY ID */
router.get('/details-time-in-out/:userID', function(req, res, next) {
  TimeInOut.find({userID: req.params.userID}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* GET SINGLE EMPLOYEE TIME IN OUT BY ID FILTERED*/
router.get('/filtered-time-in-out/:_id', function(req, res, next) {
  TimeInOut.find({_id: req.params._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE EMPLOYEE */
router.post('/', function(req, res, next) {
  Employee.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE EMPLOYEE DATE TIME*/
router.post('/add-date-time', function(req, res, next) {
  TimeInOut.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* UPDATE EMPLOYEE */
router.put('/:userID', function(req, res, next) {
  Employee.updateOne({"userID" : req.params.userID}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* UPDATE EMPLOYEE DATE TIME*/
router.put('/edit-time/:_id', function(req, res, next) {
  TimeInOut.updateOne({"_id" : req.params._id}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* DELETE EMPLOYEE */
router.delete('/:userID', function(req, res, next) {
  Employee.findOneAndDelete({"userID" : req.params.userID}, function (err, post1) {
    if (err) return next(err);
	  TimeInOut.remove({"userID" : req.params.userID}, function (err, post2) {
		if (err) return next(err);
		res.json([post1, post2]);
	  });
  });
});
/* DELETE EMPLOYEE DATE TIME*/
router.delete('/delete-time/:_id', function(req, res, next) {
  TimeInOut.findOneAndDelete({"_id" : req.params._id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.post('/test', function(req, res, next) {
	console.log(req.body);
});

router.post('/auth', function(req, res) {
  const body = req.body;

  const user = USERS.find(user => user.username == body.username);
  if(!user || body.password != 'root') return res.sendStatus(401);
  
  var token = jwt.sign({userID: user.id}, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b2RvYXBpIiwibmJmIjoxNDk4MTE3NjQyLCJleHAiOjE0OTgxMjEyNDIsInVpZCI6MSwicm9sZSI6ImFkbWluIn0.ZDz_1vcIlnZz64nSM28yA1s-4c_iw3Z2ZtP-SgcYRPQ', {expiresIn: '2h'});
  res.send({token});
});
module.exports = router;