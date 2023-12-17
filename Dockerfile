FROM node:14

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY advertisement-microservice/routes/ /app/advertisement-microservice/routes/
COPY donations-microservice/routes/ /app/donations-microservice/routes/
COPY animal-microservice/routes/ /app/animal-microservice/routes/
COPY user-microservice/routes/ /app/user-microservice/routes/
COPY auth-microservice/src/routes/ /app/auth-microservice/src/routes/
COPY shelter-microservice/routes/ /app/shelter-microservice/routes/

COPY swagger.js /app

EXPOSE 3007

CMD ["node", "swagger.js"]