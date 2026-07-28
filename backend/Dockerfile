# ── Étape 1 : build ──────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# ── Étape 2 : image finale ────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER appuser

EXPOSE 3000

CMD ["node", "index.js"]