# Süper Lig Backend API

Türkiye Süper Lig takımları için kadro kurma ve istatistik platformu - Backend API

## Teknolojiler

- **Node.js** - Runtime
- **Express** - Web Framework
- **TypeScript** - Programlama Dili
- **MongoDB** - Veritabanı
- **Mongoose** - ODM
- **Clean Architecture** - Mimari Yapı

## Kurulum

### Gereksinimler

- Node.js 18+
- MongoDB 6+
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. `.env` dosyası oluşturun:

```bash
cp .env.example .env
```

3. `.env` dosyasını düzenleyin ve gerekli değişkenleri ayarlayın:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/superlig
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# Twilio (SMS için)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@superlig.com
```

4. Veritabanını seed edin:

```bash
npm run dev
# Başka bir terminalde:
npx ts-node src/scripts/seedDatabase.ts
```

5. Development server'ı başlatın:

```bash
npm run dev
```

Server `http://localhost:5000` adresinde çalışacaktır.

## API Endpoints

### Teams (Takımlar)

- `GET /api/teams` - Tüm takımları listele
- `GET /api/teams/:id` - Belirli bir takımı getir

### Users (Kullanıcılar)

- `POST /api/users/register` - Kullanıcı kaydı (email veya telefon)
- `POST /api/users/verify` - Doğrulama kodu ile kullanıcıyı doğrula

### Lineups (Kadrolar)

- `POST /api/lineups` - Kadro kaydet
- `GET /api/lineups/user/:userId` - Kullanıcının kadrolarını getir

### Statistics (İstatistikler)

- `GET /api/statistics/team/:teamId` - Takım istatistikleri
- `GET /api/statistics/team/:teamId/position/:position` - Pozisyon bazlı istatistikler

## Clean Architecture Yapısı

```
src/
├── domain/               # İş mantığı ve kurallar
│   ├── entities/        # Domain modelleri
│   └── repositories/    # Repository interface'leri
├── application/         # Use case'ler
│   └── use-cases/       # İş akışları
├── infrastructure/      # Dış servisler
│   ├── database/        # MongoDB modelleri
│   ├── repositories/    # Repository implementasyonları
│   └── services/        # Email, SMS servisleri
└── presentation/        # API katmanı
    ├── controllers/     # Controller'lar
    └── routes/          # Route tanımları
```

## Scripts

- `npm run dev` - Development mode
- `npm run build` - Production build
- `npm start` - Production mode
- `npm test` - Testleri çalıştır

## Lisans

MIT
