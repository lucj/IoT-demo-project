# Purpose

This project is used to illustrate several of the concepts of Docker
- containers
- Dockerfile
- images
- volumes
- Docker Compose
- Docker Machine
- Swarm
- and a lot of other cool things...

We will start to create a simple application that we will move to Docker and improve smoothly

# The application

The project that we will create is a backend for IoT devices.  What is that exactly ?

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

In this project, we will make things simpler and use a Raspberry PI that measures the temperature of its CPU and send this information every minute to our backend through a HTTP Post request.
The python script that performs those action will be provided.

Note: if you do not have a Raspberry (yet!), no problem as we will also provide a simulator that will work totally fine.

## Backend

The backend is a HTTP API that
- receives the data sent by the device (or by the simulator)
- exposes those data to the external world

The data received are stored in [InfluxDB](https://github.com/influxdata/influxdb) that is a great database dedicated to time serie data.

The current implementation of the backend is done with Node.js but Python, Java and any other programming languages can be considered.
Pull Request are welcome shall you want to provide an implementation in another language.

# Status

In the current version, this application is not suitable for production use but it's a good starting point to create a backend for personal or startup projects.

# Licence

The MIT License (MIT)

Copyright (c) [year] [fullname]

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
