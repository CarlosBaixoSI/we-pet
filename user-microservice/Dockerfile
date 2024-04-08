FROM node:18-alpine

# Create the working directory inside the contanier
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code to the working directory
COPY . .

# Choose the port for this microservice
EXPOSE 3002

# Set environment variables
ENV GATEWAY_PORT=3000
ENV USERS_PORT=3002
ENV SECRET_KEY=wepet2023
ENV ATLAS_URL=mongodb://host.docker.internal:27017/users?authSource=admin
ENV JWT_SECRET=wepet2023

# Start the application
CMD [ "npm", "start" ]
