// Load dependencies
const express    = require('express'),
      bodyParser = require('body-parser'),
      winston    = require('winston');

// Create express application
let app = module.exports = express();

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle inconming data
app.post('/data',
         (req, res, next) => {
             winston.info(req.body);
             return res.sendStatus(201);
         });
