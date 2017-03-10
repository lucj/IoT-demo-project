'use strict';

// Load dependencies
const express    = require('express'),
      Influx     = require('influx'),
      bodyParser = require('body-parser'),
      winston    = require('winston');

// Define the application port
let port = process.env.PORT || 3000;

// Create a client towards InfluxDB
const influx = new Influx.InfluxDB({
 host: process.env.INFLUXDB_HOST,
 database: 'iot'
});

// Create express application
var app = express();

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle inconming data
app.post('/data',
         function(req, res, next){
             influx.writePoints([
                 {
                  measurement: 'data',
                  tags: { type: req.body.type },
                  fields: { sensor_id: req.body.sensor_id, value: req.body.value },
                  timestamp: new Date(req.body.ts).getTime() * 1000000
                 }
             ]).then(() => {
               winston.info(req.body);
               return res.sendStatus(201);
             })
             .catch( err => {
               winston.error(err.message);
               return res.sendStatus(500);
             });
         });

// Run web server
app.listen(port);
