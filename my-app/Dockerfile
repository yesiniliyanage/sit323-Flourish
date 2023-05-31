# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose a port for the application
EXPOSE 3000

# Set the command to run when the container starts
CMD [ "npm", "start" ]
