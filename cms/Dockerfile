FROM node:26-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack enable && yarn install --immutable

COPY . .

CMD [ "yarn", "dev" ]
