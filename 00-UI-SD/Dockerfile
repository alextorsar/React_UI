FROM node:alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN npm install react-hook-form

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]