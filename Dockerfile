# STAGE 0 - BUILD
FROM node
WORKDIR /app
COPY ./ /app/

RUN sed -i "s/development/production/" ./src/assets/env.json
RUN npm install
RUN npm rebuild node-sass --force
RUN npm run-script build --prod

# STAGE 1 - NGINX
FROM nginx:latest
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/dist /usr/share/nginx/html
VOLUME ["/assets"]
