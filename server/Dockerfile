FROM node:18.16.0-alpine

WORKDIR /shoopp

COPY ./package.json ./


RUN npm install

COPY . .

CMD ["npm", "run", "start"]