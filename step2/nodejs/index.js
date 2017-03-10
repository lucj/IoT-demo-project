'use strict';

// Load dependencies
const express    = require('express'),
      bodyParser = require('body-parser'),
      winston    = require('winston');

// Define the application port
let port = process.env.PORT || 3000;

// Create express application
let app = express();

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle inconming data
app.post('/data',
         (req, res, next) => {
             winston.info(req.body);
             return res.sendStatus(201);
         });

// Run web server
app.listen(port);
