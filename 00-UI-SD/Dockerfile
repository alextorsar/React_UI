FROM node:alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm install

EXPOSE 5173