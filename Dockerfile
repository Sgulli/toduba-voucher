FROM  node:22-alpine AS builder

WORKDIR /app

COPY package*.json prisma/ ./
RUN npm ci 

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

RUN npm ci --only=production --omit=dev

# Expose the port the app runs on (based on env configuration)
EXPOSE 8080

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
 
CMD ["npm", "run", "start:prod"]