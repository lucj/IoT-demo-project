# Objectives

Setting up a basic HTTP API that collects time series data sent in JSON.
The format of the data we will consider is the following one:

````
{
  ts: TIMESTAMP
  type: TYPE_OF_DATA
  value: VALUE,
  sensor_id: ID_OF_THE_DEVICE_SENDING_THE_DATA
}
````

For instance, a valid data could be the following one

````
{
  ts: "2017-03-01T23:12:52Z",
  type: "temp",
  value: 34,
  sensor_id: 123
}
````

The device which id is *123* send the value *34* of type *temp* (temperature) at the timestamp *2017-03-01T23:12:52Z*

# Details

The API should
* handle HTTP Post requests on /data
* reply with a 201 HTTP Status Code (creation)
* displays the received data on the standard output

# Instructions

To create this application you can choose the language you want based on your preferences.
In the current version, Node.js is used to illustrate the application.

This first (and very simple) version of the application needs to

* implement a HTTP Post endpoint on /data
* listen on port specified by the PORT environment variable or on 3000 is not provided

# Test

In order to validate the application, run it and send the following command.

If you have followed the Node.js example, the application is ran with the following command

````
npm start
````

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-01T23:12:52Z", "type": "temp", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````

A 201 HTTP Status Code should be returned to acknowledge the reception of the data. At the same time, the data should appear in the application log on the standard output.

````
info:  ts=2017-03-01T23:12:52Z, type=temp, value=34, sensor_id=123
````
