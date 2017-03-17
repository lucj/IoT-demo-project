# Purpose

This project is used to illustrate the [Docker from the ground up](https://www.udemy.com/docker-from-the-ground-up/) online course.

Several Docker related concepts and tools will be covers:
* Dockerfile
* images
* volumes
* Docker Compose
* Docker Machine
* Swarm
* and some other cool stuff...

To do this, we will follow several steps to create a simple application and improve it.

* [Create the data simulator](./step0/)
* [Create the API](./step1/)
* [Containerize the API](./step2/)
* [Use Docker Hub to store the API image](./step3/)
* [Run InfluxDB in a container](./step4/)
* [Modify the API to persist data into InfluxDB](./step5/)
* [Move into a multi-containers Docker Compose application](./step6/)
* [Add Grafana visualisation service](./step7/)
* [Deploy the application on a remote host created with Docker Machine](./step8/)
* [Deploy the application on a Docker Swarm](./step9/)
* [Setup a simple Continuous Integration pipeline](./step10/)
* [Setup a simple Continuous Deployment pipeline](./step11/)
* and more to come...

# The application

The project that we will create is a backend for IoT that is to say an application used to collect data coming from IoT devices.

To better understand it, let's consider the 2 sides of the project
- the device that measures data and send them to a backend
- the backend that collects data and exposes them through an API

## Device

There are a lot of mass market IoT devices out there
- [Raspberry PI](https://www.raspberrypi.org/), that comes in different flavors
- [C.H.I.P](https://getchip.com/)
- [Orange Pi](http://www.orangepi.org/)
- ...

Those devices are really cheap and embeds a Linux distribution (or if its not there, it's easy to install one).
Also, a lot of sensors can be attached to those devices, making them interacting with the external world a breaze.
Having those devices send information over HTTP or other lower level network protocols is very easy.

In this project, we will start by using a bash script to simulate the sending of temperature information.
At the end, we will setup a real device, a Raspberry PI, to get real temperature and send it to our backend.

## Backend

The backend is a HTTP API that
- receives the data
- exposes those data to the external world

The data received are stored in [InfluxDB](https://github.com/influxdata/influxdb) that is a great database dedicated to time serie data.

The visualisation is done with [Grafana](http://grafana.org), an excellent tool to build metrics and analytic dashboards.

The example implementation of the backend is done with Node.js but Python, Java and any other programming languages will also be used in a near future.
Pull Request are welcome shall you want to provide an implementation in another language.

# Status

In the current version, this application is not suitable for production use but it's a good starting point to create a backend for personal or startup projects.

# Prerequisites

In order to start this project, you only need to have an account on [GitHub](https://github.com) and a new repository named *iot-api* (or any other name you choose).
In the different steps of this project, you will be asked to modify the code within this repository.

# Go !

Let's start with [the first step](./step0) and create a simple simulator in Bash.

# Licence

The MIT License (MIT)

Copyright (c) [2017] [Luc Juggery]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
