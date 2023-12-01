# we-pet

## Install test dependencies:
- npm install --save-dev jest
- run tests: npx jest

## Microsservices ports:
- **Gateway** -> 3000
- **Auth-microservice** -> 3001
- **User-microsservice** -> 3002
- **Animal-microsservice** -> 3003
- **ad-management-microsservice** -> 3004

## Create dockerfiles for each microservice

### Advertisement dockerfile
```
FROM node:18

# Create the working directory inside the contanier
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code to the working directory
COPY . .

# Choose the port for this microsservice
EXPOSE 3004

# Set environment variables
ENV GATEWAY_PORT=3000
ENV AD_MGMT_PORT=3004
ENV SECRET_KEY=wepet2023
ENV ATLAS_URL=mongodb://host.docker.internal:27017/advertisement?authSource=admin
ENV JWT_SECRET=wepet2023

# Start the application
CMD [ "npm", "start" ]
```

Steps:
- Build the image:
    ```docker build -t advertisement-microservice <path-to-dockerfile>```
- Run the Docker container:
     ``docker run -d -p 3004:3004 --name advertisement-microservice advertisement-microservice-image``
