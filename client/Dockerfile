FROM node:22.0.0-slim as builder

RUN addgroup --gid 1001 clientgroup \
    && adduser --uid 1001 --ingroup clientgroup --home /home/client --disabled-password clientuser

WORKDIR /shoopp

COPY package*.json ./

RUN chown -R clientuser:clientgroup /shoopp

USER clientuser

RUN npm install --ignore-scripts

COPY src/ ./src/

COPY public/ ./public/
COPY  nginx/ .nginx/

RUN npm run build

FROM nginx

RUN adduser --system --no-create-home --disabled-login nginx

EXPOSE 3000

COPY --from=builder --chown=nginx:nginx --chmod=755 /shoopp/build /usr/share/nginx/html

RUN find /usr/share/nginx/html -type f -exec chmod 644 {} \; \
    && find /usr/share/nginx/html -type d -exec chmod 755 {} \;

RUN chmod -R -w /usr/share/nginx/html






