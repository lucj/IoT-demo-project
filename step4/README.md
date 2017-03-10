# Objectives

Modify the application so it uses InfluxDB to persist the data received

# Instructions

* Use an InfluxDB driver for the langage you selected
* Use this driver to persist the json data received
* Get the *type* tag, the *sensor_id* and *value* fields from the request's body
* Specify the InfluxDB host through the INFLUXDB_HOST environment variable

# Building the new image

With those changes done, we inscrement the version of the image so it is tagged *v2*.

````
docker image build -t iot:v2 .
````

# Run a container based on the new image

As the application now relies on the underlying InfluxDB database, we will provide the IP of the container running InfluxDB to the API container (172.17.0.2 in our example, but yours might be different).

````
docker container run -e "INFLUXDB_HOST=172.17.0.2" -p 3000:3000 iot:v2
````

Notes
* this is a temporary setup to show an example on how a container can use the service of another one. We will enhance this in the next steps when dealing with Docker Compose.
* containers can see each other using their IP addresses as they are on the same *Docker0* default bridge network.

# Tests

The following command will send JSON data to the API and persist it in the underlying InfluxDB. A 201 HTTP Status code should be returned.

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-07T23:12:52Z", "type": "temp", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````
