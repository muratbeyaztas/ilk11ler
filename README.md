# Süper Lig - Kadro Kurma Platformu

Türkiye Süper Lig takımları için interaktif kadro kurma ve istatistik platformu.

## 📋 Proje Özeti

Bu proje, kullanıcıların Türkiye Süper Lig takımları için kendi ideal kadrolarını oluşturmalarına ve diğer kullanıcıların tercihlerini görmelerine olanak sağlayan bir web uygulamasıdır.

## ✨ Özellikler

### Frontend

- ⚽ Süper Lig takımlarını listeleme
- 🏟️ İnteraktif futbol sahası görünümü (üstten bakış)
- 🎯 Farklı formasyon seçenekleri (4-4-2, 4-3-3, 3-5-2, 4-2-3-1, 3-4-3)
- 👥 Oyuncu seçimi ve pozisyon atama
- 📧 Email veya telefon ile kayıt sistemi
- ✅ SMS/Email doğrulama
- 💾 Kadro kaydetme
- 📊 İstatistik görüntüleme
- 📱 Responsive tasarım
- 🎨 Modern ve kullanıcı dostu arayüz

### Backend

- 🏗️ Clean Architecture
- 🔐 Kullanıcı doğrulama sistemi (SMS/Email)
- 💾 MongoDB veritabanı
- 📊 İstatistik toplama ve raporlama
- 🔄 RESTful API
- 📝 TypeScript

## 🛠️ Teknolojiler

### Frontend (`/fe`)

- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- Axios

### Backend (`/be`)

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Twilio (SMS)
- Nodemailer (Email)

## 📦 Kurulum

### Gereksinimler

- Node.js 18+
- MongoDB 6+
- npm veya yarn

### Backend Kurulumu

```bash
# Backend klasörüne gidin
cd be

# Bağımlılıkları yükleyin
npm install

# .env dosyası oluşturun
cp .env.example .env
# .env dosyasını düzenleyin

# Veritabanını seed edin
npx ts-node src/scripts/seedDatabase.ts

# Server'ı başlatın
npm run dev
```

Backend `http://localhost:5000` adresinde çalışacaktır.

### Frontend Kurulumu

```bash
# Frontend klasörüne gidin
cd fe

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Frontend `http://localhost:3000` adresinde çalışacaktır.

## 🎮 Kullanım

1. **Takım Seçimi**: Sol taraftaki listeden bir Süper Lig takımı seçin
2. **Formasyon Belirleme**: Üstteki dropdown'dan bir formasyon seçin
3. **Oyuncu Atama**: Saha üzerindeki pozisyonlara tıklayarak oyuncu seçin
4. **Kaydetme**: Kadronuzu tamamladıktan sonra "Kadroyu Kaydet" butonuna tıklayın
5. **Doğrulama**: Email veya telefon numaranıza gelen kodu girin
6. **İstatistikler**: Diğer kullanıcıların tercihlerini görüntüleyin

## 📁 Proje Yapısı

```
.
├── be/                 # Backend
│   ├── src/
│   │   ├── domain/           # Domain entities ve interfaces
│   │   ├── application/      # Use cases
│   │   ├── infrastructure/   # Database, services
│   │   └── presentation/     # Controllers, routes
│   └── package.json
│
├── fe/                 # Frontend
│   ├── src/
│   │   ├── components/       # React bileşenleri
│   │   ├── services/         # API servisleri
│   │   ├── store/           # State management
│   │   └── types/           # TypeScript types
│   └── package.json
│
└── README.md
```

## 🎨 Görseller

Proje için takım logoları, oyuncu ve teknik direktör fotoğrafları gereklidir. Bu görseller `fe/public/assets/` klasörüne aşağıdaki yapıda eklenmelidir:

```
fe/public/assets/
├── teams/              # Takım logoları
│   ├── galatasaray.png
│   ├── fenerbahce.png
│   ├── besiktas.png
│   └── trabzonspor.png
├── players/            # Oyuncu fotoğrafları
│   ├── gs/            # Galatasaray oyuncuları
│   ├── fb/            # Fenerbahçe oyuncuları
│   ├── bjk/           # Beşiktaş oyuncuları
│   └── ts/            # Trabzonspor oyuncuları
└── coaches/           # Teknik direktör fotoğrafları
```

> **Not**: Görseller şu anda placeholder olarak çalışmaktadır. Gerçek görselleri yukarıdaki yapıya uygun olarak ekleyebilirsiniz.

## 🔧 Yapılandırma

### Backend `.env` Dosyası

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

## 📊 API Endpoints

- `GET /api/teams` - Tüm takımları listele
- `GET /api/teams/:id` - Belirli bir takımı getir
- `POST /api/users/register` - Kullanıcı kaydı
- `POST /api/users/verify` - Doğrulama
- `POST /api/lineups` - Kadro kaydet
- `GET /api/lineups/user/:userId` - Kullanıcı kadroları
- `GET /api/statistics/team/:teamId` - Takım istatistikleri

## 🚀 Deployment

### Backend

```bash
cd be
npm run build
npm start
```

### Frontend

```bash
cd fe
npm run build
# dist/ klasörünü static hosting'e deploy edin
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

MIT

## 👨‍💻 Geliştirici

İletişim için: [İletişim Bilgileriniz]

## 🙏 Teşekkürler

- Transfermarkt - Oyuncu ve takım bilgileri için
- Tüm Süper Lig takımları

---

**Not**: Bu proje eğitim ve eğlence amaçlıdır. Ticari kullanım için ilgili takımlardan ve organizasyonlardan izin alınmalıdır.
