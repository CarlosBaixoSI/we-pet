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
EXPOSE 3006

# Set environment variables
ENV GATEWAY_PORT=3000
ENV SHELTER_PORT=3006
ENV SECRET_KEY=wepet2023
ENV ATLAS_URL=mongodb+srv://mailwepet:juHO4n2a0ttGlfT0@wepet.n2ik9nt.mongodb.net/shelters?retryWrites=true&w=majority&appName=wepet
ENV JWT_SECRET=wepet2023
ENV AWS_BUCKET_NAME=we-pet
ENV AWS_BUCKET_REGION=us-east-1
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# Start the application
CMD [ "npm", "start" ]
