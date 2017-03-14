# Objectives

In this step, we will add Docker Compose to the picture and define the multi containers application

# Instructions

Change the code so that the default INFLUXDB_HOST is "db" (the name of the InfluxDB service) if no other value is provided as an environment variable.
 
# Example implementation

[Node.js](./nodejs)

# Compose file

The compose file is defined as follow

* 2 services: *db* and *api*
* definition of *influxdata* volume and mount it on /var/lib/influxdb of the *db* service
* usage of the influxdb.conf file present locally
* publication of port 8083 and 8086 of the *db* service
* publication of port 1337 of the *api* service

# Running the application

To take into account the changes done in the code (modification of the default INFLUXDB_HOST), let's run the application using the *--build* option.

Note: we are using here the *build* and the *image* instructions so the version *v3* of the image can be created directly with Docker Compose using the following command:

````
$ docker-compose up --build
Creating network "step5_default" with the default driver
Creating volume "step5_influxdata" with default driver
Building api
Step 1/9 : FROM mhart/alpine-node:7.7.1
 ---> e1a533c514f2
Step 2/9 : ENV LAST_UPDATED 20170301T231500
 ---> Using cache
 ---> 4a6e696daca9
Step 3/9 : COPY package.json /tmp/package.json
 ---> 47f600d37818
Removing intermediate container 886efe383c7d
Step 4/9 : RUN cd /tmp && npm install
 ---> Running in f5398f02b98c
...
Removing intermediate container f5398f02b98c
Step 5/9 : RUN mkdir /app && cp -a /tmp/node_modules /app/
 ---> Running in 1f78c73d24ec
 ---> 7f7e7667f3db
Removing intermediate container 1f78c73d24ec
Step 6/9 : COPY . /app/
 ---> aa3f46efeb3f
Removing intermediate container 0b3225eb929b
Step 7/9 : WORKDIR /app
 ---> 053f8371a52f
Removing intermediate container 62d4ab2dcdcc
Step 8/9 : EXPOSE 1337
 ---> Running in 013e278b6ad5
 ---> 85ac56c8afd2
Removing intermediate container 013e278b6ad5
Step 9/9 : CMD npm start
 ---> Running in c9fdf62f3dad
 ---> dea68591ed39
Removing intermediate container c9fdf62f3dad
Successfully built dea68591ed39
Creating step5_api_1
Creating step5_db_1
Attaching to step5_api_1, step5_db_1
db_1   | [I] 2017-03-12T21:10:21Z InfluxDB starting, version 1.2.1, branch master, commit 3ec60fe2649b51a85cd1db6c8937320a80a64c35
db_1   | [I] 2017-03-12T21:10:21Z Go version go1.7.4, GOMAXPROCS set to 4
db_1   | [I] 2017-03-12T21:10:21Z Using configuration at: /etc/influxdb/influxdb.conf
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
api_1  |
api_1  | > iot@1.0.0 start /app
api_1  | > node index.js
api_1  |
db_1   | [I] 2017-03-12T21:10:21Z Using data dir: /var/lib/influxdb/data service=store
db_1   | [I] 2017-03-12T21:10:21Z opened service service=subscriber
db_1   | [I] 2017-03-12T21:10:21Z Starting monitor system service=monitor
db_1   | [I] 2017-03-12T21:10:21Z 'build' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-12T21:10:21Z 'runtime' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-12T21:10:21Z 'network' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-12T21:10:21Z 'system' registered for diagnostics monitoring service=monitor
db_1   | [I] 2017-03-12T21:10:21Z Starting precreation service with check interval of 10m0s, advance period of 30m0s service=shard-precreation
db_1   | [I] 2017-03-12T21:10:21Z Starting snapshot service service=snapshot
db_1   | [I] 2017-03-12T21:10:21Z Starting admin service service=admin
db_1   | [I] 2017-03-12T21:10:21Z DEPRECATED: This plugin is deprecated as of 1.1.0 and will be removed in a future release service=admin
db_1   | [I] 2017-03-12T21:10:21Z Listening on HTTP: [::]:8083 service=admin
db_1   | [I] 2017-03-12T21:10:21Z Starting continuous query service service=continuous_querier
db_1   | [I] 2017-03-12T21:10:21Z Starting HTTP service service=httpd
db_1   | [I] 2017-03-12T21:10:21Z Authentication enabled:false service=httpd
db_1   | [I] 2017-03-12T21:10:21Z Listening on HTTP:[::]:8086 service=httpd
db_1   | [I] 2017-03-12T21:10:21Z Starting retention policy enforcement service with check interval of 30m0s service=retention
db_1   | [I] 2017-03-12T21:10:21Z Listening for signals
db_1   | [I] 2017-03-12T21:10:21Z Storing statistics in database '_internal' retention policy 'monitor', at interval 10s service=monitor
db_1   | [I] 2017-03-12T21:10:21Z Sending usage statistics to usage.influxdata.com
api_1  | info: server listening on port 1337
...
````

From the output we can see the creation of several components
* the user defined bridge network the containers will be connected to
* the volume defined to handle InfluxDB data
* the build of the *api* image
* the services' containers, *db* and *api*

# Create the *iot* database

Let's use the InfluxDB administration interface to create our database, named *iot*.

![Create database from administration interface](./images/01-create-iot-db.png)

# Push the newly created image

Using the *--build* option when running *docker-compose up*, the *v3* version of the image has been created.

Let's push it to Docker Hub.

````
$ docker image push lucj/iot-api:v3
The push refers to a repository [docker.io/lucj/iot-api]
c77035b16cb3: Pushed
906e9be4d576: Pushed
d712cb66e5d4: Pushed
264232f2575c: Pushed
8e254b51dfd6: Mounted from mhart/alpine-node
60ab55d3379d: Mounted from mhart/alpine-node
v3: digest: sha256:4d6163739eb6cc2ce936864c30af5b7a71263d7e4121ad2f9482481d28147cf5 size: 1580
````

-----
[< Previous](../step5) - [Next >](../step7)
