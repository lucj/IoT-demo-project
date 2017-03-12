In this implementation several files are defined
* package.json that handles all the dependencies
* app.js that defines the expressjs web server
* index.js that run the server

On top of those, the file test/functional.js defines a simple test that starts the API, send data and verify the returned HTTP Status Code is 201.

## Starting the API

````
npm start
````

## Running the test

````
npm test

> iot@1.0.0 test /Users/luc/IoT-demo-project/step1/nodejs
> mocha test/functional.js

  Creation
info: server listening on port 3000
info:  ts=2017-03-11T15:00:53Z, type=temp, value=34, sensor_id=123
    ✓ should create dummy data (45ms)

  1 passing (58ms)
````
