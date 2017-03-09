'use strict';

// Private
const express    = require('express'),
      bodyParser = require('body-parser'),
      winston    = require('winston'),
      port       = process.env.PORT || 3000;

// Create express application
var app = express();

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle inconming data
app.post('/data',
         function( (req, res, next) => {
             winston.info(req.body);
             return res.sendStatus(201);
         });

// Run web server
app.listen(port);
