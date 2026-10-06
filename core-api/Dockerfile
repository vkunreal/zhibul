ARG DATABASE_URL=postgresql://build:build@localhost:5432/build?schema=public

FROM node:26-slim AS base
WORKDIR /app

# Node 26 images no longer ship Corepack. Yarn 4 has to be activated explicitly:
# the lockfile is Yarn Berry, and `npm install -g yarn` would install Yarn 1.
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g corepack \
    && corepack enable \
    && corepack prepare yarn@4.18.1 --activate

COPY package.json yarn.lock .yarnrc.yml ./

FROM base AS deps
RUN yarn install --immutable

# ---- development ----
FROM deps AS dev
# `nest start --watch` runs the app through a shell wrapper and relies on `ps`
# to kill the whole process tree on rebuild. Without procps the app survives
# and the restarted one fails with EADDRINUSE.
RUN apt-get update && apt-get install -y --no-install-recommends procps \
    && rm -rf /var/lib/apt/lists/*
ARG DATABASE_URL
ENV NODE_ENV=development
ENV PORT=5002
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN yarn prisma generate
EXPOSE 5002
CMD ["yarn", "start:dev"]

# ---- build (also used for migrations) ----
FROM deps AS build
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN yarn prisma generate
RUN yarn build

# ---- production runtime ----
FROM base AS production
ENV NODE_ENV=production
ENV PORT=5002

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/package.json ./package.json

EXPOSE 5002
CMD ["node", "dist/main.js"]
