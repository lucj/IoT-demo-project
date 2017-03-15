In this step, we define a default value, "db", for the InfluxDB host the *api* needs to connect to. 

````
// Create a client towards InfluxDB
let influx = new Influx.InfluxDB({
   host: process.env.INFLUXDB_HOST || "db",
   database: 'iot'
});
````

As each service of a Docker Compose application can communicate with other services using their name, this code changes replaces the environment variable that would be defined in the *docker-compose.yml* file otherwise.
