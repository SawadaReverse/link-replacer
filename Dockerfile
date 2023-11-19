FROM node:20-alpine

ARG BOT_TOKEN
ENV BOT_TOKEN=${BOT_TOKEN}

COPY . /app
WORKDIR /app

RUN yarn
RUN yarn tsc
CMD [ "node", "dists/src/index.js" ]