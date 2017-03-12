# Objectives

*Containerize* the application adding a Dockerfile to the picture.

# Instructions

* Create a Dockerfile at the root of the project source code
* Choose one of the base image that embeds the runtime of your selected language
* Expose port 1337 in the Dockerfile
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
docker container run -p 1337:1337 iot:v1
````

Note: the *-p 1337:1337* option is specified for the port 1337 within the container to be published on the Docker host
