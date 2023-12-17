# Use a Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will listen on
EXPOSE 3007

# Start the application
CMD [ "node", "app.js" ]