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
EXPOSE 80

# Set environment variables
ENV GATEWAY_PORT=80
ENV SECRET_KEY=wepet2023
ENV JWT_SECRET=wepet2023

# Start the application
CMD [ "npm", "start" ]
