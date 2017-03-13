# Objectives

Create a simulator that send temperature data in the following JSON format:

````
{
  ts: TIMESTAMP
  type: "temp"
  value: VALUE,
  sensor_id: ID_OF_THE_DEVICE_SENDING_THE_DATA
}
````

For instance, a valid data could be the following one

````
{
  ts: "2017-03-01T23:12:52Z",
  type: "temp",
  value: 34,
  sensor_id: 123
}
````

In the real world, those data would be sent by a real device and represent the temperature with value *34* sent by the device which id is *123* and collected on the *2017-03-01T23:12:52Z* (date in ISO8601 format).

#  The simulator

The simulator can be done in any language, on the current example it's done in bash shell.
It's a very minimal, and only
* get the current date
* generate a random number for the temperature (quite hot location btw)
* send the data in JSON using the *curl* command (note: the targeted API will run on port 1337 as we will see in the next step)
* wait 1 seconds and repeat

A possible implementation is the following one

````
!/bin/bash

while(true); do
    # Current date
    d=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    # Random temperature between 20 and 34°C
    temp=$(( ( RANDOM % 15 )  + 20 ))

    # Send data to API
    curl -XPOST -H "Content-Type: application/json" -d '{"ts":"'$d'", "type": "temp", "value": '$temp', "sensor_id": 123 }' http://localhost:1337/data

    sleep 1
done
````


[Next step](../step1)
