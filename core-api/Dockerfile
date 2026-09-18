FROM node:22-slim AS base
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./

# зависимости целиком, включая dev
FROM base AS deps
RUN yarn install --frozen-lockfile

# ---- режим разработки ----
FROM deps AS dev
ENV NODE_ENV=development
ENV PORT=5000
COPY . .
RUN yarn prisma generate
EXPOSE 5000 9229
CMD ["yarn", "start:dev"]

# ---- сборка для прода ----
FROM deps AS build
COPY . .
RUN yarn prisma generate
RUN yarn build

# ---- прод-рантайм ----
FROM base AS production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
ENV PORT=5000
EXPOSE 5000
CMD ["node", "dist/src/main.js"]
