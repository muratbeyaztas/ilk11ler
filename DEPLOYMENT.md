# Deployment (Yayınlama) Kılavuzu

Bu dokümanda projenin production ortamına nasıl deploy edileceği anlatılmaktadır.

## İçindekiler

- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Veritabanı](#veritabanı)
- [Önerilen Platformlar](#önerilen-platformlar)

## Backend Deployment

### 1. Environment Variables

Production ortamında aşağıdaki environment variable'ları ayarlayın:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=very_strong_random_secret_key

# Email (Production SMTP)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password
EMAIL_FROM=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

### 2. Build

```bash
cd be
npm install
npm run build
```

### 3. Start

```bash
npm start
```

### Heroku'ya Deploy

```bash
cd be

# Heroku CLI ile login
heroku login

# Yeni app oluştur
heroku create your-app-name

# MongoDB addon ekle (veya MongoDB Atlas kullan)
heroku addons:create mongolab:sandbox

# Environment variables ayarla
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
heroku config:set EMAIL_HOST=smtp.gmail.com
# ... diğer config'ler

# Deploy
git init
git add .
git commit -m "Initial backend deploy"
git push heroku main

# Seed database (sadece ilk defa)
heroku run npm run seed
```

### Railway'e Deploy

1. [Railway](https://railway.app/) hesabı oluşturun
2. GitHub repo'nuzu bağlayın
3. `be` klasörünü root olarak seçin
4. Environment variables ekleyin
5. Deploy edin

### DigitalOcean/VPS'e Deploy

```bash
# VPS'e SSH ile bağlan
ssh user@your-server-ip

# Node.js ve MongoDB kur
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb

# MongoDB'yi başlat
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Projeyi klonla
git clone your-repo-url
cd your-repo/be

# Bağımlılıkları yükle
npm install
npm run build

# PM2 ile çalıştır
sudo npm install -g pm2
pm2 start dist/server.js --name superlig-backend
pm2 startup
pm2 save

# Nginx reverse proxy
sudo apt install nginx
# Nginx config yap (aşağıdaki örneği kullan)
sudo systemctl restart nginx
```

Nginx config (`/etc/nginx/sites-available/superlig`):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Frontend Deployment

### 1. Environment Variables

Frontend için `.env` dosyası (production):

```env
VITE_API_URL=https://your-backend-url.com
```

`fe/src/services/api.ts` dosyasını güncelleyin:

```typescript
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "/api",
	// ...
});
```

### 2. Build

```bash
cd fe
npm install
npm run build
# dist/ klasörü oluşur
```

### Vercel'e Deploy

```bash
cd fe

# Vercel CLI kur
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Veya:

1. [Vercel](https://vercel.com/) hesabı oluşturun
2. GitHub repo'nuzu bağlayın
3. Root directory'yi `fe` olarak ayarlayın
4. Deploy edin

### Netlify'a Deploy

1. [Netlify](https://netlify.com/) hesabı oluşturun
2. "New site from Git" seçin
3. Repo'nuzu seçin
4. Build settings:
   - Base directory: `fe`
   - Build command: `npm run build`
   - Publish directory: `fe/dist`
5. Environment variables ekleyin
6. Deploy edin

### Cloudflare Pages'e Deploy

```bash
cd fe
npm run build

# Wrangler CLI
npm install -g wrangler
wrangler login
wrangler pages publish dist --project-name=superlig
```

## Veritabanı

### MongoDB Atlas (Önerilen)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hesabı oluşturun
2. Ücretsiz cluster oluşturun (M0 Sandbox)
3. Database user oluşturun
4. Network Access'te IP whitelist yapın (0.0.0.0/0 tüm IP'ler)
5. Connection string'i alın
6. Backend environment variables'a ekleyin:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/superlig
   ```

### Seed Data

Production veritabanını seed etmek için:

```bash
# Lokal
MONGODB_URI=your_production_uri npx ts-node src/scripts/seedDatabase.ts

# Veya backend'i deploy ettikten sonra
heroku run npm run seed  # Heroku
railway run npm run seed  # Railway
```

## Önerilen Platformlar

### Backend

| Platform     | Ücretsiz Plan  | Önerilen   |
| ------------ | -------------- | ---------- |
| Railway      | ✅ ($5 kredit) | ⭐⭐⭐⭐⭐ |
| Heroku       | ✅ (750 saat)  | ⭐⭐⭐⭐   |
| Render       | ✅ (750 saat)  | ⭐⭐⭐⭐   |
| DigitalOcean | ❌ ($5/ay)     | ⭐⭐⭐⭐⭐ |

### Frontend

| Platform         | Ücretsiz Plan | Önerilen   |
| ---------------- | ------------- | ---------- |
| Vercel           | ✅            | ⭐⭐⭐⭐⭐ |
| Netlify          | ✅            | ⭐⭐⭐⭐⭐ |
| Cloudflare Pages | ✅            | ⭐⭐⭐⭐   |

### Veritabanı

| Platform      | Ücretsiz Plan | Önerilen   |
| ------------- | ------------- | ---------- |
| MongoDB Atlas | ✅ (512 MB)   | ⭐⭐⭐⭐⭐ |
| Railway       | ✅ (limitli)  | ⭐⭐⭐⭐   |

## Full Stack Deploy Örneği

### Railway + Vercel + MongoDB Atlas

1. **MongoDB Atlas**

   - Cluster oluştur
   - Connection string al

2. **Railway (Backend)**

   - GitHub repo'yu bağla
   - `be` klasörünü seç
   - Environment variables ekle
   - Auto-deploy aktif

3. **Vercel (Frontend)**

   - GitHub repo'yu bağla
   - `fe` klasörünü seç
   - `VITE_API_URL` ekle (Railway URL)
   - Auto-deploy aktif

4. **Custom Domain (Opsiyonel)**
   - Railway: `api.yourdomain.com`
   - Vercel: `yourdomain.com`

## Güvenlik

Production'da mutlaka yapın:

- [ ] Güçlü JWT secret kullanın
- [ ] HTTPS kullanın
- [ ] CORS ayarlarını yapın
- [ ] Rate limiting ekleyin
- [ ] MongoDB'de authentication aktif
- [ ] Environment variables'ları güvende tutun
- [ ] .env dosyasını git'e eklemeyin

## Monitoring

Production'da izleme:

- **Backend**: PM2, Railway logs, Heroku logs
- **Errors**: Sentry
- **Analytics**: Google Analytics
- **Uptime**: UptimeRobot

## Backup

MongoDB Atlas otomatik backup yapar. Manuel backup için:

```bash
# MongoDB dump
mongodump --uri="your_mongodb_uri" --out=./backup

# Restore
mongorestore --uri="your_mongodb_uri" ./backup
```

## CI/CD

GitHub Actions örneği (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd be && npm install && npm run build
      # Deploy steps...

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd fe && npm install && npm run build
      # Deploy steps...
```

---

Sorularınız için: [GitHub Issues](your-github-url/issues)
