FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --force && npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["nodemon", "src/server.js"]