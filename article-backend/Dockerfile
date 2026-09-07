FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json prisma7.config.ts ./
COPY prisma ./prisma
COPY src ./src

ARG DATABASE_URL="mysql://user:pass@localhost:3306/db"
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate --config prisma7.config.ts
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/src/docs ./src/docs

COPY prisma ./prisma
COPY prisma7.config.ts ./

EXPOSE 8000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
