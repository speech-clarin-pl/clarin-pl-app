FROM nginx

RUN echo "no cache"

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY build /www
