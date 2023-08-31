FROM node:18-alpine

WORKDIR /app-client

COPY package.json /app-client/

RUN npm install 

COPY . /app-client/

EXPOSE 3000

CMD [ "npm","run", "dev" ]