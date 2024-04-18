FROM node:18.16.0-slim as builder

RUN addgroup --gid 1001 clientgroup \
    && adduser --uid 1001 --ingroup clientgroup --home /home/client --disabled-password clientuser

WORKDIR /shoopp

COPY package*.json ./

RUN chown -R clientuser:clientgroup /shoopp

USER clientuser

RUN npm install --ignore-scripts

COPY src/ ./src/

COPY public/ ./public/

RUN npm run build

FROM nginx

RUN adduser --system --no-create-home --disabled-login nginx

EXPOSE 3000

USER nginx

COPY --from=builder --chown=nginx:nginx /shoopp/build /usr/share/nginx/html

RUN find /usr/share/nginx/html -type f -exec chmod 644 {} \; \
    && find /usr/share/nginx/html -type d -exec chmod 755 {} \;