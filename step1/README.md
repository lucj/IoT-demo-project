**Objectives**

Setting up a basic web server that collects time series data in json format

**Input example**

{
  ts: "2017-03-01T23:12:52Z",
  value: 34,
  sensor_id: 123
}

**Expected Behavior**

Handle HTTP Post requests
Sends a 201 HTTP Status Code (creation)
Displays the received message on the standard output

**Instructions**

* Choose the language you want
* Implement the HTTP Post endpoint on /data
* Should listen on port specified by the PORT environment variable or on 3000 is not provided

Note: this example in be done in Node.js but additional langagues will be added later on

**Tests**

Following command should receive a 201 (Created).

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-01T23:12:52Z", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````
