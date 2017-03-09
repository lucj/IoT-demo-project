**Objectives**

Add Docker Compose to the picture to define the multi containers application

**Instructions**

* Create a docker-compose.yml file defining both services

````
version: "3.1"
services:
  db:
    image: influxdb
    command: influxdb -config /etc/influxdb/influxdb.conf
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
