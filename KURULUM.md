# Kurulum Kılavuzu

Bu dokümanda projenin sıfırdan kurulumu ve çalıştırılması adım adım anlatılmaktadır.

## Gereksinimler

Başlamadan önce sisteminizde aşağıdaki yazılımların kurulu olduğundan emin olun:

- **Node.js** 18 veya üzeri ([İndir](https://nodejs.org/))
- **MongoDB** 6 veya üzeri ([İndir](https://www.mongodb.com/try/download/community))
- **Git** ([İndir](https://git-scm.com/))

## Adım 1: Projeyi İndirin

```bash
git clone <repository-url>
cd ilk11ler
```

## Adım 2: MongoDB'yi Başlatın

### Windows:

```bash
# MongoDB'yi servis olarak başlatın
net start MongoDB
```

### Mac/Linux:

```bash
# MongoDB'yi başlatın
mongod --config /usr/local/etc/mongod.conf
```

Alternatif olarak MongoDB Compass veya MongoDB Atlas (cloud) kullanabilirsiniz.

## Adım 3: Backend Kurulumu

```bash
# Backend klasörüne gidin
cd be

# Bağımlılıkları yükleyin
npm install

# .env dosyası zaten hazır (be/.env)
# İsterseniz email ve SMS ayarlarını yapılandırabilirsiniz

# Veritabanını seed edin (örnek takım ve oyuncu verileri)
npx ts-node src/scripts/seedDatabase.ts
```

Seed işlemi başarılı olursa şu çıktıyı göreceksiniz:

```
🌱 Veritabanı seed işlemi başlıyor...
🗑️  Mevcut veriler temizlendi
✅ Galatasaray eklendi
✅ Fenerbahçe eklendi
✅ Beşiktaş eklendi
✅ Trabzonspor eklendi
🎉 Seed işlemi tamamlandı!
```

```bash
# Backend server'ı başlatın
npm run dev
```

Backend `http://localhost:5000` adresinde çalışmaya başlayacak.

## Adım 4: Frontend Kurulumu

Yeni bir terminal penceresi açın:

```bash
# Ana dizinden frontend klasörüne gidin
cd fe

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Frontend `http://localhost:3000` adresinde çalışmaya başlayacak.

## Adım 5: Tarayıcıda Açın

Tarayıcınızda `http://localhost:3000` adresine gidin. Uygulama hazır!

## Sorun Giderme

### MongoDB Bağlantı Hatası

Eğer "MongoDB bağlantı hatası" alıyorsanız:

1. MongoDB'nin çalıştığından emin olun:

   ```bash
   # Windows
   sc query MongoDB

   # Mac/Linux
   brew services list | grep mongodb
   ```

2. MongoDB URI'yi kontrol edin (`be/.env` dosyasında):
   ```
   MONGODB_URI=mongodb://localhost:27017/superlig
   ```

### Port Kullanımda Hatası

Eğer port zaten kullanılıyor hatası alıyorsanız:

**Backend için (5000):**

```bash
# Windows
netstat -ano | findstr :5000
# PID'yi not edin ve sonlandırın:
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Frontend için (3000):**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Bağımlılık Yükleme Hataları

Eğer `npm install` sırasında hata alıyorsanız:

```bash
# Node modüllerini temizleyin
rm -rf node_modules package-lock.json

# Önbelleği temizleyin
npm cache clean --force

# Tekrar yükleyin
npm install
```

## Görselleri Ekleme (Opsiyonel)

Gerçek takım ve oyuncu görselleri eklemek için:

1. `fe/public/assets/` klasörüne gidin
2. Aşağıdaki yapıya göre görselleri ekleyin:

```
assets/
├── teams/
│   ├── galatasaray.png
│   ├── fenerbahce.png
│   ├── besiktas.png
│   └── trabzonspor.png
├── players/
│   ├── gs/
│   │   ├── muslera.png
│   │   ├── icardi.png
│   │   └── ...
│   ├── fb/
│   ├── bjk/
│   └── ts/
└── coaches/
    ├── okan-buruk.png
    └── ...
```

Not: Görseller olmadan da uygulama çalışır, placeholder görseller gösterilir.

## Email/SMS Doğrulama Ayarları (Opsiyonel)

### Email için:

`be/.env` dosyasında:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@superlig.com
```

Gmail kullanıyorsanız:

1. Google hesabınızda 2FA'yı aktif edin
2. App Password oluşturun ([Talimatlar](https://support.google.com/accounts/answer/185833))
3. App Password'ü `EMAIL_PASS` olarak kullanın

### SMS için (Twilio):

1. [Twilio](https://www.twilio.com/) hesabı oluşturun
2. Telefon numarası alın
3. `be/.env` dosyasında ayarları yapın:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+15551234567
```

## Production Build

### Backend:

```bash
cd be
npm run build
npm start
```

### Frontend:

```bash
cd fe
npm run build
# dist/ klasörünü bir web server'a deploy edin
```

## Yardım

Sorun yaşıyorsanız:

1. [GitHub Issues](your-github-url/issues) sayfasından yeni bir issue açın
2. Hata mesajını ve sisteminizdeki versiyonları ekleyin:
   ```bash
   node --version
   npm --version
   mongo --version
   ```

İyi eğlenceler! ⚽
