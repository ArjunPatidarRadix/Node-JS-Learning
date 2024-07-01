FROM node:lts-alpine

RUN mkdir task-manager
COPY . ./task-manager
WORKDIR ./task-manager/

RUN npm install

EXPOSE 3000
CMD node src/index.js

