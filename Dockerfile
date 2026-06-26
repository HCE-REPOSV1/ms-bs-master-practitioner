# Dockerfile — ms-bs-practitioner-service
# Multi-stage build generado por Jarvis Platform

# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ── Stage 2: Production ─────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nestjs && adduser -S nestjs -G nestjs
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh
EXPOSE 10405
USER nestjs
CMD ["sh", "entrypoint.sh"]
