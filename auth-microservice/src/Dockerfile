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
EXPOSE 3001

# Set environment variables
ENV GATEWAY_PORT=3000
ENV AUTH_PORT=3001
ENV SECRET_KEY=wepet2023
ENV ATLAS_URL=mongodb://host.docker.internal:27017/authentication?authSource=admin
ENV JWT_SECRET=wepet2023
ENV MAIL_CLIENT_ID=881859867128-6aaofekg3f2vs13j7ufpgp571lpj2h2s.apps.googleusercontent.com
ENV MAIL_CLIENT_SECRET=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
ENV MAIL_REFRESH_TOKEN=1//04igO8sz8CwhPCgYIARAAGAQSNwF-L9IrB3WjW07CRaeJyW5KzEC4i9r3MOBwijoNiG53VxI3TK8cgVzuoDvkpTG3eG0R2XcrCfY
ENV MAIL_REDIRECT_URI=https://developers.google.com/oauthplayground

# Start the application
CMD [ "npm", "start" ]
