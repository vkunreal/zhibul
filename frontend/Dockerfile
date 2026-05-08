# Stage 1: сборка
FROM node:20-alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем исходники и собираем приложение
COPY . .
RUN yarn build

# Stage 2: рантайм
FROM node:20-alpine AS runner

WORKDIR /app

# Переменная окружения в рантайме
ENV NODE_ENV=production

# Копируем артефакты сборки
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# Экспонируем порт Next.js (по умолчанию 3000)
EXPOSE 3000

# Команда запуска приложения
CMD ["yarn", "start"]
