# Objectives

In this step, we will add Docker Compose to the picture and define the multi containers application

# Instructions

* Create a docker-compose.yml file defining both services (*db* and *api*)
* *db*: defines the *influxdata* volume and mount it on /var/lib/influxdb
* *db*: use the influxdb.conf file present locally
* *db*: export both 8083 and 8086 ports
* *api*: use "db" as the default InfluxDB host
* *api*: use the build instruction to easily rebuild the application image while in development environment
* *api*: export port 3000
 
Below is an example of the docker-compose.yml file:

````
version: "3.1"
services:
  db:
    image: influxdb
    command: -config /etc/influxdb/influxdb.conf
    ports:
      - 8083:8083
      - 8086:8086
    volumes:
      - influxdata:/var/lib/influxdb
      - ./influxdb.conf:/etc/influxdb/influxdb.conf
  api:
   image: iot:v2
   build: ./nodejs
   command: npm start
   ports:
     - 3000:3000
volumes:
  - influxdata
````

# Running the application

With this compose file created, the application can be ran easily with the following command

````
docker-compose up
````

From the output we can see the creation of several components
* the user defined bridge network the containers will be connected to
* the volume defined to handle InfluxDB data
* the services' containers, *db* and *api*

````
Creating network "step5_default" with the default driver
Creating volume "step5_influxdata" with default driver
Creating step5_api_1
Creating step5_db_1
Attaching to step5_db_1, step5_api_1
db_1   | [I] 2017-03-10T15:24:23Z InfluxDB starting, version 1.2.1, branch master, commit 3ec60fe2649b51a85cd1db6c8937320a80a64c35
db_1   | [I] 2017-03-10T15:24:23Z Go version go1.7.4, GOMAXPROCS set to 4
db_1   | [I] 2017-03-10T15:24:23Z Using configuration at: /etc/influxdb/influxdb.conf
db_1   |
db_1   |  8888888           .d888 888                   8888888b.  888888b.
db_1   |    888            d88P"  888                   888  "Y88b 888  "88b
db_1   |    888            888    888                   888    888 888  .88P
db_1   |    888   88888b.  888888 888 888  888 888  888 888    888 8888888K.
db_1   |    888   888 "88b 888    888 888  888  Y8bd8P' 888    888 888  "Y88b
db_1   |    888   888  888 888    888 888  888   X88K   888    888 888    888
db_1   |    888   888  888 888    888 Y88b 888 .d8""8b. 888  .d88P 888   d88P
db_1   |  8888888 888  888 888    888  "Y88888 888  888 8888888P"  8888888P"
db_1   |
db_1   | [I] 2017-03-10T15:24:23Z Using data dir: /var/lib/influxdb/data service=store
db_1   | [I] 2017-03-10T15:24:23Z opened service service=subscriber
db_1   | [I] 2017-03-10T15:24:23Z Starting monitor system service=monitor
db_1   | [I] 2017-03-10T15:24:23Z 'build' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-10T15:24:23Z 'runtime' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-10T15:24:23Z 'network' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-10T15:24:23Z 'system' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-10T15:24:23Z Starting precreation service with check interval of 10m0s, advance period of 30m0s service=shard-precreation
db_1   | [I] 2017-03-10T15:24:23Z Starting snapshot service service=snapshot
db_1   | [I] 2017-03-10T15:24:23Z Starting admin service service=admin
db_1   | [I] 2017-03-10T15:24:23Z DEPRECATED: This plugin is deprecated as of 1.1.0 and will be removed in a future release service=admin
db_1   | [I] 2017-03-10T15:24:23Z Listening on HTTP: [::]:8083 service=admin
db_1   | [I] 2017-03-10T15:24:23Z Starting continuous query service service=continuous_querier
db_1   | [I] 2017-03-10T15:24:23Z Starting HTTP service service=httpd
db_1   | [I] 2017-03-10T15:24:23Z Authentication enabled:false service=httpd
db_1   | [I] 2017-03-10T15:24:23Z Listening on HTTP:[::]:8086 service=httpd
db_1   | [I] 2017-03-10T15:24:23Z Starting retention policy enforcement service with check interval of 30m0s service=retention
db_1   | [I] 2017-03-10T15:24:23Z Listening for signals
db_1   | [I] 2017-03-10T15:24:23Z Storing statistics in database '_internal' retention policy 'monitor', at interval 10s service=monitor
db_1   | [I] 2017-03-10T15:24:23Z Sending usage statistics to usage.influxdata.com
api_1  |
api_1  | > iot@1.0.0 start /app
api_1  | > node index.js
api_1  |
db_1   | [I] 2017-03-10T15:24:40Z /var/lib/influxdb/data/_internal/monitor/1 database index loaded in 30.164µs service=shard
````

Note: when running a Docker Compose application, the containers can communicate together only by using the name of the service, this is the reason why the InfluxDB host defined in the *api* can be referenced with "db". The creation of a user-defined bridge network enables this communication by name.

# Test

As a new instance of InfluxDB as been created, we need to create our *iot* database first. This time we will create it using the administration interface available on port 8083.

![Influxdb admin](./images/influxdb-iot-creation.png)

Once again, let's test the application with the following curl command. If everything is fine, a 201 HTTP Status Code should be returned, and an info message should be added in the *api* logs.

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-07T23:12:52Z", "type": "temp", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````
