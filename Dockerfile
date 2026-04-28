# ─────────────────────────────────────────────
# STAGE 1: Builder — bağımlılıkları kur & build al
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Önce sadece package.json kopyala (layer cache optimizasyonu)
COPY package*.json ./

# Sadece production bağımlılıklarını kur
RUN npm ci --only=production

# Kaynak kodu kopyala
COPY src/ ./src/

# ─────────────────────────────────────────────
# STAGE 2: Runtime — sadece çalışacak dosyalar
# ─────────────────────────────────────────────
FROM node:20-alpine AS runtime

# Non-root user oluştur (güvenlik şartı!)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Sadece ihtiyacımız olanı builder'dan al
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src          ./src
COPY package.json ./

# Root olarak çalışma!
USER appuser

# Health check — Kubernetes liveness probe için
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "src/index.js"]
