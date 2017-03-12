// Load dependencies
const express    = require('express'),
      Influx     = require('influx'),
      bodyParser = require('body-parser'),
      winston    = require('winston');

// Create express application
let app = module.exports = express();

// Create a client towards InfluxDB
let influx = new Influx.InfluxDB({
   host: process.env.INFLUXDB_HOST,
   database: 'iot'
});

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
