FROM node:14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR ./dist
ENV NODE_PATH .
EXPOSE 8080
CMD [ "node", "app.js" ]