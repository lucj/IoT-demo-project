**Objectives**

Run a container with [InfluxDB](https://github.com/influxdata/influxdb), a great open source Time Serie Database.

**Instructions**

* Go to the Docker Hub page of the official [Influxdb image](https://hub.docker.com/_/influxdb/)

* Generate the default configuration file

````
docker container run --rm influxdb influxd config > influxdb.conf
````

* Modify the admin part of the configuration file so that the administration interface is enabled

````
[admin]
  enabled = true
  bind-address = ":8083"
  https-enabled = false
  https-certificate = "/etc/ssl/influxdb.pem"
````

* Create a volume named *influxdata*

````
docker volume create influxdata
````

* Run a container using the named volume and the modified configuration file

````
docker container run -p 8083:8083 -p 8086:8086 \
      -v $PWD/influxdb.conf:/etc/influxdb/influxdb.conf:ro \
      -v influxdb:/var/lib/influxdb \
      influxdb -config /etc/influxdb/influxdb.conf
````

Note on ports:
* 8086 is Influx's API port 
* 8083 is used by the administration interface

**Tests**

* Influxdb administration interface should be available on (http://localhost:8083)

![Influxdb admin](/images/influxdb-admin.png)

* Create a database named *iot* using the following request targeting Influxdb's API

````
curl -i -XPOST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE iot"
````

![Iot database](/images/iot-database.png)

* Insert a test entry in the newly created database

````
curl -i -XPOST 'http://localhost:8086/write?db=iot' --data-binary 'temperature,sensor_id=123 value=34 1483481572000000000'
````

This HTTP Post request creates our dummy data into the temperature table.

* Verify using the administration interface

![Iot database](/images/influxdb-query-example.png)
