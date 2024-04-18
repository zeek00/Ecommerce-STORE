FROM node:18.16.0-slim 

RUN addgroup servergroup \
    && adduser -u 1001 -G servergroup -h /home/server -D serveruser

WORKDIR /shoopp

COPY ./package.json ./package-lock.json ./

RUN chown -R serveruser:servergroup /shoopp && \
    npm install --ignore-scripts && \
    chown -R zeek:zeek /shoopp/node_modules

USER serveruser

COPY database/ ./database/
COPY middleware/ ./middleware/
COPY utilities/ ./utilities/
COPY server.js ./

EXPOSE 4050

CMD ["npm", "run", "start"]
