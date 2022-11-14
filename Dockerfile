# stage 1
FROM node:latest as node

WORKDIR /app

COPY . .

RUN npm i 

RUN npm run build --prod

# stage 2
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# COPY  --from=node /app/nginx/*  /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/super-heroes /usr/share/nginx/html