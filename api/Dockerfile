FROM node:12-slim AS build

WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build

EXPOSE 5556
CMD [ "yarn", "start" ]