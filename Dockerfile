FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm ci --only=production

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist .

CMD ["node", "dist/src/index.js"]