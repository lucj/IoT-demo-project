# Foreword

When we have initiated this API we have created a simple test just to setup the testing process (even if it does not a lot of things). It's now time to enhance the way tests are ran in order to better automate them.

# How testing is done

In order to run the tests in the current impplementation, we need to: run an instance of InfluxDB, create the *iot* database and execute the test defined in the API.

Run the database and create the *iot* database

````
docker container run -d -p 8083:8083 -p 8086:8086 --name influx influxdb
curl -i -XPOST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE iot"
````

Run the test defined in *test/functional.js*

````
$ INFLUXDB_HOST=localhost npm test

> iot@1.0.0 test /Users/luc/perso/Dropbox/Work/Side/Docker/IoT-demo-project/step10/nodejs
> mocha test/functional.js

  Creation
info: server listening on port 3000
info:  ts=2017-03-11T15:00:53Z, type=temp, value=34, sensor_id=123
    ✓ should create dummy data (90ms)

  1 passing (103ms)
````

# Simplify the testing process

## Using a bash script

We can create a shell script with the above commands and run it during the test phase. An example of the *test.sh* script has been added to the [Node.js example implementation](./nodejs/).

This is not the option we will use when running the test on CircleCI though.

## Using a Docker Compose file

We can also use another approach using Docker Compose. The *compose-test.yml* file illustrate this approach. It basically define 2 services:
* db: the InfluxDB we need to run so the API can persist the data it receives
* sut (system under test): used to build the image and run the test on it using the underlying database

Note:*sut* is used as this is the default service name ran by Docker Cloud when used as a CI tool (instead of CircleCI). We have decided to keepo the same name in this example.

Using this file, the test are ran simply using the *docke-compose build* and a *docker-compose run* command.

At the same time, we have added the installation of *curl* in the base image, this is very light and will help to create the database when running the tests.

Let's see it in action.

````
$ docker-compose -f compose-test.yml build sut
Building sut
Step 1/10 : FROM mhart/alpine-node:7.7.1
 ---> e1a533c514f2
Step 2/10 : ENV LAST_UPDATED 20170301T231500
 ---> Using cache
 ---> 4a6e696daca9
Step 3/10 : RUN apk add -U curl
 ---> Running in 26662acf2633
fetch http://dl-cdn.alpinelinux.org/alpine/v3.5/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.5/community/x86_64/APKINDEX.tar.gz
(1/4) Installing ca-certificates (20161130-r0)
(2/4) Installing libssh2 (1.7.0-r2)
(3/4) Installing libcurl (7.52.1-r2)
(4/4) Installing curl (7.52.1-r2)
Executing busybox-1.25.1-r0.trigger
Executing ca-certificates-20161130-r0.trigger
OK: 7 MiB in 17 packages
 ---> c3d6acf8023f
Removing intermediate container 26662acf2633
Step 4/10 : COPY package.json /tmp/package.json
 ---> c4039033878c
Removing intermediate container 630cc2aff5bf
Step 5/10 : RUN cd /tmp && npm install
 ---> Running in 90ca79f79211
iot@1.0.0 /tmp
+-- body-parser@1.17.1
...
npm WARN iot@1.0.0 No repository field.
 ---> 1a328e9a8fe6
Removing intermediate container 90ca79f79211
Step 6/10 : RUN mkdir /app && cp -a /tmp/node_modules /app/
 ---> Running in 07d503221dcf
 ---> 0d4d2b07da98
Removing intermediate container 07d503221dcf
Step 7/10 : COPY . /app/
 ---> 26322e176963
Removing intermediate container d688a9402aaf
Step 8/10 : WORKDIR /app
 ---> 448232deadbe
Removing intermediate container 8de202977bb7
Step 9/10 : EXPOSE 1337
 ---> Running in 7ec87ac42cee
 ---> 34b8c67bacf5
Removing intermediate container 7ec87ac42cee
Step 10/10 : CMD npm start
 ---> Running in ef18e2dcd7be
 ---> 319d46689567
Removing intermediate container ef18e2dcd7be
Successfully built 319d46689567
````

Then, we run the tests on the image previously built.

````
$ docker-compose -f compose-test.yml run sut
HTTP/1.1 200 OK
Connection: close
Content-Type: application/json
Request-Id: a661cdb3-0d59-11e7-8001-000000000000
X-Influxdb-Version: 1.2.1
Date: Mon, 20 Mar 2017 10:40:35 GMT
Transfer-Encoding: chunked

{"results":[{"statement_id":0}]}

> iot@1.0.0 test /app
> mocha test/functional.js

  Creation
info: server listening on port 3000
info:  ts=2017-03-11T15:00:53Z, type=temp, value=34, sensor_id=123
    ✓ should create dummy data (83ms)

  1 passing (99ms)
````

# Adding circle.yml file

In order for the tests to be done in CircleCI, we need to specify the different phases in a *circle.yml* file that will be created at the root of the repository.

Basically, this file defines
* the environment CircleCI platform needs to set up for the tests: only docker/docker-compose are needed here
* the test commands that needs to be ran: run the test service defined in the compose file
* the deployment that needs to be done when the tests succeed: create an image and push it to the Docker Hub

Notes:
- there are obviously much more available options but those ones will match our needs for now
- the test phase specified in circle.yml does not use run the build phase as by default it will be ran each time the tests are executed on the platform (new CircleCI environment spin up each time)
