FROM node:26-alpine

WORKDIR /app

# Node 26 images no longer ship Corepack. Yarn 4 has to be activated explicitly:
# the lockfile is Yarn Berry, and `npm install -g yarn` would install Yarn 1.
RUN npm install -g corepack \
    && corepack enable \
    && corepack prepare yarn@4.18.1 --activate

COPY package.json yarn.lock .yarnrc.yml ./

# Меньше параллельных загрузок — иначе Docker Desktop часто падает с OOM.
ENV YARN_NETWORK_CONCURRENCY=4
RUN yarn install --immutable

COPY . .

EXPOSE 3000
CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "3000"]
