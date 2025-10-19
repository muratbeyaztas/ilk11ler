# Süper Lig Frontend

Türkiye Süper Lig takımları için kadro kurma ve istatistik platformu - Frontend

## Teknolojiler

- **React 18** - UI Library
- **TypeScript** - Programlama Dili
- **Vite** - Build Tool
- **TailwindCSS** - CSS Framework
- **Zustand** - State Management
- **Axios** - HTTP Client

## Özellikler

- ✅ Süper Lig takımlarını listeleme
- ✅ Takım seçimi ve oyuncu kadrosu görüntüleme
- ✅ Farklı formasyon seçenekleri (4-4-2, 4-3-3, 3-5-2, 4-2-3-1, 3-4-3)
- ✅ Oyuncu seçimi ve pozisyon atama
- ✅ Email veya telefon ile kayıt
- ✅ SMS/Email doğrulama
- ✅ Kadro kaydetme
- ✅ Responsive tasarım
- ✅ Modern ve kullanıcı dostu arayüz

## Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Development server'ı başlatın:

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

## Görseller

Uygulama için gerekli görseller `public/assets/` klasörüne eklenmelidir:

```
public/assets/
├── teams/              # Takım logoları
├── players/            # Oyuncu fotoğrafları
│   ├── gs/            # Galatasaray
│   ├── fb/            # Fenerbahçe
│   ├── bjk/           # Beşiktaş
│   └── ts/            # Trabzonspor
└── coaches/           # Teknik direktör fotoğrafları
```

## Klasör Yapısı

```
src/
├── components/        # React bileşenleri
├── services/          # API servisleri
├── store/            # Zustand state management
├── types/            # TypeScript type tanımları
├── App.tsx           # Ana uygulama bileşeni
├── main.tsx          # Entry point
└── index.css         # Global CSS
```

## Bileşenler

- **Header**: Üst menü ve kullanıcı bilgisi
- **TeamList**: Takım listesi (sol sidebar)
- **FieldView**: Futbol sahası görünümü (ana alan)
- **FormationSelector**: Formasyon seçici
- **PlayerSlot**: Saha üzerindeki oyuncu slotu
- **SubstitutesList**: Yedek oyuncular ve teknik direktör (sağ sidebar)
- **RegisterModal**: Kayıt modalı
- **VerifyModal**: Doğrulama modalı

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Production build preview
- `npm run lint` - ESLint kontrolü

## Lisans

MIT
