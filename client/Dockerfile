FROM node:18.16.0-slim as builder

RUN addgroup -g 1000 zeek && \
    adduser -u 1000 -G zeek -h /home/zeek -D zeek

WORKDIR /shoopp

COPY ./package.json ./

RUN chown -R zeek:zeek /shoopp && \
    npm install --ignore-scripts && \
    chown -R zeek:zeek /shoopp/node_modules

USER zeek

COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder --chown=nginx:nginx /shoopp/build /usr/share/nginx/html
