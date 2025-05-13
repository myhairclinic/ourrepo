# MyHair Clinic Web Sitesi

MyHair Clinic için çok dilli tıbbi turizm web sitesi. Bu platform, hasta yönetimi ve uluslararası saç restorasyon hizmetleri için kapsamlı bir dijital ekosistem sağlar.

## Özellikler

- Çok dilli destek (Türkçe, İngilizce, Rusça, Gürcüce)
- Duyarlı ve uyarlanabilir tasarım
- Kapsamlı yönetici kontrol paneli
- Hasta yönetim modülü
- Blog yönetim sistemi
- Randevu yönetimi
- Telegram bot entegrasyonu
- SEO optimizasyonu

## Teknoloji Yığını

- React.js ön uç (Shadcn UI bileşenleriyle)
- Express.js arka uç
- PostgreSQL veritabanı
- Drizzle ORM
- Node-Telegram-Bot-API

## Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/username/myhair-clinic-website.git
cd myhair-clinic-website

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Ortam Değişkenleri

Projenin çalışması için aşağıdaki ortam değişkenleri gereklidir:

- `DATABASE_URL`: PostgreSQL veritabanı bağlantı URL'si
- `TELEGRAM_BOT_TOKEN`: Telegram bildirimleri için bot token'ı
- `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT`: PostgreSQL bağlantı değişkenleri

## Katkıda Bulunma

Katkıda bulunmak için lütfen bir pull request gönderin veya iyileştirmeler için bir issue açın.

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## Security Best Practices

### API Keys and Tokens

Never commit sensitive tokens or API keys to Git repositories. Instead:

1. Store all sensitive credentials in environment variables
2. Use a `.env` file locally (and ensure it's in your `.gitignore`)
3. For production, use your hosting provider's secret/environment variable management system
4. If you accidentally commit a token:
   - Consider it compromised
   - Immediately revoke and regenerate the token
   - Contact the service provider if necessary

For Telegram Bot tokens specifically:
- Create a new bot or regenerate your token via [BotFather](https://t.me/botfather)
- Set the token in your environment variables as `TELEGRAM_BOT_TOKEN`
- Verify that your `.gitignore` includes `.env` files