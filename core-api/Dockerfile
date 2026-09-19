ARG DATABASE_URL=postgresql://build:build@localhost:5432/build?schema=public

FROM node:26-slim AS base
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g yarn

COPY package.json yarn.lock ./

FROM base AS deps
RUN yarn install --frozen-lockfile

# ---- development ----
FROM deps AS dev
ARG DATABASE_URL
ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN yarn prisma generate
EXPOSE 5000 9229
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
ENV PORT=5000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/package.json ./package.json

EXPOSE 5000
CMD ["node", "dist/main.js"]
