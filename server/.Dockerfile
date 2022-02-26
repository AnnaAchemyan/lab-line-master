# Use a lighter version of Node as a parent image
FROM node:14.17
# Set the working directory to /server
WORKDIR /server
# copy package.json into the container at /server
COPY package*.json /server/
#COPY package-lock.json /server/

# Copy the current directory contents into the container at /server
COPY . /server/
# install dependencies
RUN npm install -g npm@8.2.0
# Make port 4000 available to the world outside this container
EXPOSE 4000
# Run the app when the container launches
CMD ["npm", "start"]