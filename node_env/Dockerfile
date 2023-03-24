FROM node:14.20.0-alpine

WORKDIR /src

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
COPY . .

RUN npm i

ENTRYPOINT [ "node", "index.js" ]