FROM mhart/alpine-node:6.11.0
ENV LAST_UPDATED 20170624T180000

# Copy list of server side dependencies
COPY package.json /tmp/package.json

# Install dependencies
RUN cd /tmp && npm install

# Copy dependencies libraries
RUN mkdir /app && cp -a /tmp/node_modules /app/

# Copy src files
COPY . /app/

# Use /app working directory
WORKDIR /app

# Expose http port
EXPOSE 1337

# Run application
CMD ["npm", "start"]
