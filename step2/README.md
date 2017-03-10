# Objectives

*Containerize* the application adding a Dockerfile to the picture.

# Instructions

* Create a Dockerfile at the root of the project source code
* Choose one of the base image that embeds the runtime of your selected language
* Expose port 3000 in the Dockerfile
* Add a .gitignore to prevent local node_modules folder to be taken into account in the context

# Build the image

When the Dockerfile is ready, the image can be built with the following command:

````
docker image build -t iot:v1 .
````

Note: the image has been tagged with *v1*, this version will be incremented with the changes done in the next steps.

# Run the application within a container

Now the application and all its dependencies and its runtime is packaged into an image, we can run it within a container.

````
docker container run -p 3000:3000 iot:v1
````

Note: the *-p 3000:3000* option is specified for the port 3000 within the container to be published on the Docker host

# Tests

Let's check everything is working fine now the application is running in a container.
For this, we run the same curl command as in the previous step.

````
curl -XPOST -H "Content-Type: application/json" -d '{"ts":"2017-03-07T23:12:52Z", "type": "temp", "value": 34, "sensor_id": 123 }' http://localhost:3000/data
````

The 201 HTTP Status Code should be returned and a log entry should be added in the standard output of the container.
