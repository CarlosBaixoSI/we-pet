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
EXPOSE 3003

# Set environment variables
ENV GATEWAY_PORT=3000
ENV ANIMAL_PORT=3003
ENV SECRET_KEY=wepet2023
ENV ATLAS_URL=mongodb://host.docker.internal:27017/animals?authSource=admin
ENV JWT_SECRET=wepet2023
ENV AWS_BUCKET_NAME=we-pet
ENV AWS_BUCKET_REGION=us-east-1
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# Start the application
CMD [ "npm", "start" ]
