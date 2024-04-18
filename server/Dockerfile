FROM node:18.16.0-slim 

RUN addgroup -g 1001 zeek && \
    adduser -u 1001 -G zeek -h /home/zeek -D zeek

WORKDIR /shoopp

COPY ./package.json ./package-lock.json ./

RUN chown -R zeek:zeek /shoopp && \
    npm install --ignore-scripts && \
    chown -R zeek:zeek /shoopp/node_modules

USER zeek

COPY database/ ./database/
COPY middleware/ ./middleware/
COPY utilities/ ./utilities/
COPY server.js ./

EXPOSE 4050

CMD ["npm", "run", "start"]
