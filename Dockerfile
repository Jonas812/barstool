# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server to serve the built application
RUN npm install -g serve

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "5000"]
