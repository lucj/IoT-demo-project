**Objectives**

Adding a Dockerfile to containerize the application

**Instructions**

* Choose one of the base image that embeds the runtime of your selected language
* Expose port 3000 in the Dockerfile
* Add a .gitignore to prevent local node_modules folder to be taken into account in the context

**Tests**

* Build the image

````
docker image build -t iot:v1 .
````

* Run a container based on this image and publish the port 3000

````
docker container run -p 3000:3000 iot:v1
````

* Test the application with the following command

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-07T23:12:52Z", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````
