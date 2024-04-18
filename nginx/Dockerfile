FROM nginx:alpine

RUN adduser -D -S -G nginx && \
    && chown -R nginx:nginx /var/cache/nginx && \
    && chown -R nginx:nginx /var/log/nginx

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/conf.d/default.conf

USER nginx
