FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npx pnpm install --ignore-scripts=false

COPY . .

RUN npx pnpm prisma generate

RUN npx pnpm build

EXPOSE 3000

CMD ["npx", "pnpm", "start"]
