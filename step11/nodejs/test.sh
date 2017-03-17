#!/bin/bash

# Run InfluxDB in a container
docker container run -d -p 8083:8083 -p 8086:8086 --name influx influxdb

# Wait for the database to be ready
curl -sL -I localhost:8086/ping
while [ $? -ne 0 ];do
  sleep 2
  curl -sL -I localhost:8086/ping
done

# Create the iot database
curl -i -XPOST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE iot"

# Run the tests specifying the InfluxDB host
INFLUXDB_HOST=localhost npm test

# Remove the InfluxDB container
docker container stop influx && docker container rm influx
