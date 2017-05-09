var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle')

var app = express();

//configure the app for body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set up a port for the server to listen on
var port = process.env.PORT || 3000;

//connect to DB
mongoose.connect('mongodb://localhost:27017/hellojs');

//API Routes
var router = express.Router();

//all the routes will be prefixed with /api/
app.use('/api',router);

//middleware

router.use(function(req, res, next){
  console.log('FYI.. There is some process currently going on');
  next();
});

router.get('/', function(req, res){
    res.json({message: 'Welcome to our API'});
  }
);


router.route('/vehicles')

  .post(function(req, res){
    var vehicle = new Vehicle();
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err){
      if(err) {
        res.send(err);
      }
      res.json({message: 'Vehicle was successfully manufactured'});
    });
  })

  .get(function(req, res) {
      Vehicle.find(function(err, vehicle) {
        if(err){
          res.send(err);
        }
        res.json(vehicle);
      });
  });

  router.route('/vehicle/:vehicle_id')

    .get(function(req, res) {
      Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
        if(err) {
          res.send(err);
        }
        res.json(vehicle);
      })
    });

  router.route('/vehicle/make/:make')

    .get(function(req,res) {
      Vehicle.find({make: req.params.make}, function(err, vehicle) {
        if(err) {
          res.send(err);
        }


        res.json(vehicle);
      })
    });

  router.route('/vehicle/color/:color')

    .get(function(req,res) {
      Vehicle.find({color: req.params.color}, function(err, vehicle) {
        if(err) {
          res.send(err);
        }
        res.json(vehicle);
      })
    })



app.listen(port);
//print friendly message to the console

console.log('Server listening to port ' + port);
