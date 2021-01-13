FROM node:slim as build

WORKDIR /app

ADD package.json ./
ADD package-lock.json ./
ADD config-overrides.js ./
ADD public ./public
ADD src ./src

RUN apt-get update && apt-get -y install python make

RUN apt-get -y install g++

RUN npm install

RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /www
