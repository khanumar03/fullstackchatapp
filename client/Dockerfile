FROM node:18-alpine

WORKDIR /app-client

COPY package.json /app-client/
COPY package-lock.json /app-client/

RUN npm ci

COPY . /app-client/

EXPOSE 3000

CMD [ "npm","run", "dev" ]