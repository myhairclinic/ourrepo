# MyHair Clinic Web Portal

Bu proje, MyHair Clinic için geliştirilmiş kapsamlı bir çok dilli medikal turizm platformudur. Tiflis, Gürcistan'daki MyHair Clinic'in uluslararası saç restorasyon hizmetleri ve hasta yönetimi için gelişmiş bir dijital ekosistem sağlar.

## Proje Özellikleri

- 7 dil desteği (Türkçe, İngilizce, Rusça, Gürcüce, Azerice, Farsça, Kazakça)
- Saç ekimi, sakal ekimi ve diğer saç restorasyon hizmetleri için randevu yönetimi
- Ülkeye özel seyahat ve konaklama paketleri
- Gelişmiş yönetici paneli ile hasta yönetim modülü
- Telegram bot entegrasyonu ile anında bildirimler
- İleri düzey SEO özellikleri
- Duyarlı (responsive) ve uyarlanabilir tasarım
- Gelişmiş analitik ve raporlama

## Teknik Stack

- **Frontend:** React.js, TailwindCSS, ShadCN UI
- **Backend:** Express.js
- **Veritabanı:** PostgreSQL
- **ORM:** Drizzle ORM
- **Entegrasyon:** Telegram Bot API
- **Dil Yönetimi:** Çok dilli çeviriler
- **Multimedya:** Hastalara ait ilerleme fotoğrafları ve belge yönetimi
- **Güvenlik:** Rol tabanlı erişim kontrolü

## Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Ortam Değişkenleri

Projenin çalışması için aşağıdaki ortam değişkenlerinin tanımlanması gerekir:

- `DATABASE_URL`: PostgreSQL veritabanı bağlantı bilgisi
- `TELEGRAM_BOT_TOKEN`: Telegram bot token'ı

## Kurulum ve Veritabanı

```bash
# Veritabanı şemasını oluşturmak için
npm run db:push
```

## Kullanım

Yönetici paneline erişim için:

- URL: `/admin`
- Kullanıcı adı: `admin`
- Şifre: `******` (güvenlik amacıyla gizlenmiştir)

## İletişim

MyHair Clinic Tbilisi
Tsotne Dadiani 59 Tbilisi
Telefon: +995555003044
E-posta: myhairtbilisi@gmail.com