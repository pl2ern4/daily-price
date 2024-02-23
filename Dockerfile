FROM node:20.11.1 as build 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.25.4
COPY /nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html