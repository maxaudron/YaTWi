# STAGE 0 - BUILD
FROM node
WORKDIR /app
COPY ./ /app/

RUN npm install
RUN npm rebuild node-sass --force
RUN npm run-script build --prod

# STAGE 1 - NGINX
FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
