FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npx pnpm config set cache-dir /app/.pnpm-cache

RUN npx pnpm install --frozen-lockfile

COPY . .

RUN npx pnpm prisma generate
RUN npx pnpm prisma migrate deploy

EXPOSE 3000

CMD ["npx", "pnpm", "start:dev"]
