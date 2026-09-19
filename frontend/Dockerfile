FROM node:26-alpine AS base
WORKDIR /app

RUN npm install -g yarn

COPY package.json yarn.lock ./

# ---- development ----
FROM base AS dev
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["yarn", "dev", "--hostname", "0.0.0.0"]

# ---- production build ----
FROM base AS builder

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_METRIKA_ID
ARG NEXT_PUBLIC_GTM_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_METRIKA_ID=$NEXT_PUBLIC_METRIKA_ID \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# ---- production runtime ----
FROM node:26-alpine AS runner
WORKDIR /app

RUN npm install -g yarn

ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_METRIKA_ID
ARG NEXT_PUBLIC_GTM_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_METRIKA_ID=$NEXT_PUBLIC_METRIKA_ID \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000
CMD ["yarn", "start"]
