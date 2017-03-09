**Objectives**

Modify the application so it uses InfluxDB to persist the data received

**Instructions**

* Use an InfluxDB driver for the langage you selected

* Specify the InfluxDB host through the INFLUXDB_HOST environment variable

* Build the new image and tag it with v2

````
docker image build -t iot:v2 .
````

* Run a container based on iot:v2, specifying the IP of the InfluxDB container

````
docker container run -e "INFLUXDB_HOST=IP_OF_INFLUXDB" -p 3000:3000 iot:v2
````

**Tests**


The following command should create data in InfluxDB, a 201 HTTP Status code should be returned.

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-07T23:12:52Z", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````
