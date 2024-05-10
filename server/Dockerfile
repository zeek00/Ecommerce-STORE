FROM node:22.0.0-slim

RUN addgroup --gid 1001 servergroup \
    && adduser --uid 1001 --ingroup servergroup --home /home/server --disabled-password serveruser

WORKDIR /shoopp

COPY ./package.json ./

RUN chown -R serveruser:servergroup /shoopp \
    && npm install \
    && chown -R serveruser:servergroup /shoopp/node_modules

USER serveruser
COPY database/ ./database/
COPY middleware/ ./middleware/
COPY utilities/ ./utilities/
COPY api.js ./
COPY server.js ./


EXPOSE 4050

CMD ["npm", "run", "start"]
