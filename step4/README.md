# Objectives

Modify the application so it uses InfluxDB to persist the data received

# Instructions

* Use an InfluxDB driver for the langage you selected
* Use this driver to persist the json data received
* Get the *type* tag, the *sensor_id* and *value* fields from the request's body
* Specify the InfluxDB host through the INFLUXDB_HOST environment variable

# Implementation

[Node.js](./nodejs)

# Building the new image

When the changes above are done in the code, we create a new version of the image and tag it with *v2*.

````
docker image build -t iot:v2 .
````

# Run a container based on the new image

As the application now relies on the underlying InfluxDB database, we will provide the IP of the container running InfluxDB to the API container (172.17.0.2 in our example, but yours might be different).

````
docker container run -e "INFLUXDB_HOST=172.17.0.2" -p 1337:1337 iot:v2
````

Notes
* this is a temporary setup to show an example on how a container can use the service of another one. We will enhance this in the next steps when dealing with Docker Compose.
* containers can see each other using their IP addresses as they are on the same *Docker0* default bridge network.
