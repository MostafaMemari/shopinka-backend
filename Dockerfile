FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm --registry=https://registry.npmmirror.com
RUN pnpm install --frozen-lockfile --registry=https://registry.npmmirror.com

COPY . .
RUN pnpm prisma generate
RUN pnpm build


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3500

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 3500

ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]