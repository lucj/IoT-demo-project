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

We can also use another approach using Docker Compose. The *compose-test.yml* file illustrate this approach. It basically define 3 services:
* db: the InfluxDB we need to run so the API can persist the data it receives
* init: a simple service which only purpose is to create the underlying database
* test: used to build the image and run the test on it using the underlying database

Using this file, the test are ran simply using the *docke-compose build* and a *docker-compose run* command.

Let's see it in action.

First the *api* image is built.

````
$ docker-compose -f compose-test.yml build
db uses an image, skipping
init uses an image, skipping
Building test
Step 1/9 : FROM mhart/alpine-node:7.7.1
 ---> e1a533c514f2
Step 2/9 : ENV LAST_UPDATED 20170301T231500
 ---> Using cache
 ---> 4a6e696daca9
Step 3/9 : COPY package.json /tmp/package.json
 ---> Using cache
 ---> 47f600d37818
Step 4/9 : RUN cd /tmp && npm install
 ---> Using cache
 ---> 42728a236249
Step 5/9 : RUN mkdir /app && cp -a /tmp/node_modules /app/
 ---> Using cache
 ---> 7f7e7667f3db
Step 6/9 : COPY . /app/
 ---> Using cache
 ---> 7dfd3c4ef6d7
Step 7/9 : WORKDIR /app
 ---> Using cache
 ---> 6663e8bb6dcc
Step 8/9 : EXPOSE 1337
 ---> Using cache
 ---> a62bbb5131bf
Step 9/9 : CMD npm start
 ---> Using cache
 ---> df0d8095261b
Successfully built df0d8095261b
````

Then, the tests are ran on the image previously built.

````
$ docker-compose -f compose-test.yml run test
Creating nodejs_db_1
Creating nodejs_init_1

> iot@1.0.0 test /app
> mocha test/functional.js



  Creation
info: server listening on port 3000
info:  ts=2017-03-11T15:00:53Z, type=temp, value=34, sensor_id=123
    ✓ should create dummy data (88ms)


  1 passing (104ms)

````

# Adding circle.yml file

In order for the tests to be done in CircleCI, we need to specify the different phases in a *circle.yml* file that will be created at the root of the repository.

Basically, this file defines
* the environment CircleCI platform needs to set up for the tests: only docker/docker-compose are needed here
* the test commands that needs to be ran: run the test service defined in the compose file
* the deployment that needs to be done when the tests succeed: create an image and push it to the Docker Hub


Notes
* there are obviously much more available options but those ones will match our needs for now
* CircleCI is currently running a Beta of the version 2 of the platform where Docker will be a first class citizen. We do not use the v2 formalism yet and we will come back to this when it's official released.

Also, we have defined the file *compose-test-ci.yml* which serves the same purposes as the *compose-test.yml* file we used previously. Some changes have been done because CircleCI runs a previous version of Docker Compose and then do not take into account all the options used in the last version.
