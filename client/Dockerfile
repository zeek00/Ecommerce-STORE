FROM node:18.16.0-alpine as builder

WORKDIR /shoopp

COPY ./package.json ./


RUN npm install

COPY . .

RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /shoopp/build /usr/share/nginx/html

