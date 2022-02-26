# Use a lighter version of Node as a parent image
FROM node:14.17
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
#COPY package-lock.json /client/

# Copy the current directory contents into the container at /client
COPY . /client/
# install dependencies

# To Fix Permissions for Packages
RUN npm config set unsafe-perm true
RUN npm install -g npm@8.2.0
RUN chown -R node /client/node_modules
USER node
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]

