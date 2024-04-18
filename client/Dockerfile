
FROM node:18.16.0-slim as builder

RUN addgroup -g 1000 zeek && \
    adduser -u 1000 -G zeek -h /home/zeek -D zeek

WORKDIR /shoopp

COPY package*.json ./

RUN chown -R zeek:zeek /shoopp

USER zeek


RUN npm install --ignore-scripts

COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

FROM nginx

RUN adduser --system --no-create-home --disabled-login --group nginx


EXPOSE 3000

USER nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder --chown=nginx:nginx /shoopp/build /usr/share/nginx/html

RUN find /usr/share/nginx/html -type f -exec chmod 644 {} \; \
    && find /usr/share/nginx/html -type d -exec chmod 755 {} \; \
    && chmod -R a-w /usr/share/nginx/html
