# Objectives

Setting up a basic HTTP API that collects time series data sent in JSON.
The format of the input data is the following one:

````
{
  ts: TIMESTAMP
  type: TYPE_OF_DATA
  value: VALUE,
  sensor_id: ID_OF_THE_DEVICE_SENDING_THE_DATA
}
````

Example of a valid input data:

````
{
  ts: "2017-03-01T23:12:52Z",
  type: "temp",
  value: 34,
  sensor_id: 123
}
````

# The API

In order to create this application you can choose the language you want based on your preferences.
In the current version Node.js will be used as an example.

This first (and very simple) version of the API needs to 

* implement a HTTP Post endpoint on /data
* listen on port 1337 unless the PORT environment variable is provided
* reply with a 201 HTTP Status Code (creation)
* displays the received data on the standard output
* add a simple test to check the implementation (the test should send the data example defined above)

# Implementation's example

You are invited to develop your own implementation.
Otherwise, you can also copy, at the root of your *iot-api* folder, the content of the *nodejs* folder (Node.js example implementation) if you want to.

[Node.js](./nodejs)

Note: implementation examples in other languages will be provided soon.

-----
[< Previous](../step0) - [Next >](../step2)
