In this implementation, we are using the *influx* npm library to connect to the underlying InfluxDB database.

## Starting the API

To start the API, the IP address of the InfluxDB host needs to be provided.

````
INFLUXDB_HOST=localhost npm start
````

## Running the test

To test the API, the IP address of the underlying InfluxDB database also need to be provided

````
INFLUXDB_HOST=localhost npm test

> iot@1.0.0 test /Users/luc/perso/Dropbox/Work/Side/Docker/IoT-demo-project/step4/nodejs
> mocha test/functional.js


  Creation
info: server listening on port 3000
info:  ts=2017-03-11T15:00:53Z, type=temp, value=34, sensor_id=123
    ✓ should create dummy data (83ms)


  1 passing (97ms)
````
