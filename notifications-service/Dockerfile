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
EXPOSE 3008

# Set environment variables
ENV VAPID_PUBLIC_KEY=BOzIIq3snZ8VMvQxSa8gA9HKlWvQRQ-D2EDgk4QZqUBiIWGhHleVY-gJWVH_HzZEWyzVuo-eak2QjIlXHo-CEVc
ENV VAPID_PRIVATE_KEY=c4-1d73qXei1WRXN8YO7YCpxRDuOZZ7DTFF5M8YZhOk

# Start the application
CMD [ "npm", "start" ]
