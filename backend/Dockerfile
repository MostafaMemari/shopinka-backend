FROM node:alpine

RUN addgroup -g 1001 backend
RUN adduser -D -u 1001 -G backend backend_group

WORKDIR /app

COPY package*.json ./

RUN chown -R backend_group:backend /app

USER backend_group

RUN npx pnpm install

COPY --chown=backend_group:backend . .

EXPOSE 3000

CMD npx pnpm prisma generate && npx pnpm prisma migrate deploy && npx pnpm start:dev