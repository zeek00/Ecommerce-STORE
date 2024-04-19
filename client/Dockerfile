FROM node:18.16.0-slim as builder

RUN addgroup --system nonroot && \
    adduser --system --ingroup nonroot --home /home/nonroot nonroot

WORKDIR /shoopp

COPY package*.json ./

RUN chown -R nonroot:nonroot /shoopp

USER nonroot

RUN npm install --ignore-scripts

COPY src/ ./src/

COPY public/ ./public/

RUN npm run build

FROM nginx:alpine

RUN adduser -D -S -G nonroot

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/conf.d/default.conf

USER nonroot

COPY --from=builder --chown=nonroot:nonroot --chmod=755 /shoopp/build /usr/share/nginx/html

RUN find /usr/share/nginx/html -type f -exec chmod 644 {} \; \
    && find /usr/share/nginx/html -type d -exec chmod 755 {} \; \
    && chmod -R -w /usr/share/nginx/html
