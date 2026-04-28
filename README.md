# 🚀 egitim-ci-demo

GitHub Actions CI/CD Eğitim Projesi — Node.js REST API

[![CI](https://github.com/YOUR_ORG/egitim-ci-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_ORG/egitim-ci-demo/actions/workflows/ci.yml)

## Proje Yapısı

```
egitim-ci-demo/
├── src/
│   ├── index.js          # Sunucu başlatma
│   ├── app.js            # Express app
│   ├── routes/
│   │   ├── health.js     # GET /health
│   │   └── users.js      # GET|POST|DELETE /api/users
│   └── middleware/
│       └── logger.js     # Request logger
├── tests/
│   ├── health.test.js
│   └── users.test.js
├── .github/
│   └── workflows/
│       └── ci.yml        # CI Pipeline
├── Dockerfile            # Multi-stage build
└── package.json
```

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env

# Geliştirme modunda başlat
npm run dev
```

## Kullanım

```bash
# Health check
curl http://localhost:3000/health

# Tüm kullanıcılar
curl http://localhost:3000/api/users

# Tek kullanıcı
curl http://localhost:3000/api/users/1

# Yeni kullanıcı
curl -X POST http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Yeni Kullanıcı","email":"yeni@example.com"}'

# Kullanıcı sil
curl -X DELETE http://localhost:3000/api/users/1
```

## Test & Lint

```bash
npm test          # Testleri çalıştır
npm run lint      # Lint kontrolü
npm run lint:fix  # Lint otomatik düzelt
```

## Docker

```bash
docker build -t egitim-ci-demo .
docker run -p 3000:3000 egitim-ci-demo
```

## API Endpoints

| Method | Endpoint          | Açıklama              |
|--------|-------------------|-----------------------|
| GET    | /health           | Sağlık kontrolü       |
| GET    | /api/users        | Tüm kullanıcıları al  |
| GET    | /api/users/:id    | Tek kullanıcı         |
| POST   | /api/users        | Yeni kullanıcı oluştur|
| DELETE | /api/users/:id    | Kullanıcı sil         |
