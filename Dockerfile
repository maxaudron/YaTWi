# STAGE 0 - BUILD
FROM node
WORKDIR /app
COPY ./ /app/

RUN sed -i "s/development/production/" ./src/assets/env.json
RUN npm install
RUN npm rebuild node-sass --force
RUN npm run-script build --prod

# STAGE 1 - NGINX
FROM registry.gitlab.com/ejectedspace/tiny-webserver:latest
COPY --from=0 /app/dist /
