FROM node:26-alpine AS base
WORKDIR /app

# Node 26 images no longer ship Corepack. Yarn 4 has to be activated explicitly:
# the lockfile is Yarn Berry, and `npm install -g yarn` would install Yarn 1.
RUN npm install -g corepack \
    && corepack enable \
    && corepack prepare yarn@4.18.1 --activate

COPY package.json yarn.lock .yarnrc.yml ./

# ---- development ----
FROM base AS dev
RUN yarn install --immutable
COPY . .
EXPOSE 3000
CMD ["yarn", "dev", "--hostname", "0.0.0.0"]

# ---- production build ----
FROM base AS builder

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_CORE_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_METRIKA_ID
ARG NEXT_PUBLIC_GTM_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_API_CORE_URL=$NEXT_PUBLIC_API_CORE_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_METRIKA_ID=$NEXT_PUBLIC_METRIKA_ID \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

RUN yarn install --immutable
COPY . .
RUN yarn build

# ---- production runtime ----
FROM node:26-alpine AS runner
WORKDIR /app

RUN npm install -g corepack \
    && corepack enable \
    && corepack prepare yarn@4.18.1 --activate

ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_CORE_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_METRIKA_ID
ARG NEXT_PUBLIC_GTM_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_API_CORE_URL=$NEXT_PUBLIC_API_CORE_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_METRIKA_ID=$NEXT_PUBLIC_METRIKA_ID \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.yarnrc.yml /app/.yarnrc.yml

EXPOSE 3000
CMD ["yarn", "start"]
