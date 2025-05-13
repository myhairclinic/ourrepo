// CJS formatında ürünler tablosu oluşturma ve doldurma scripti
require('dotenv').config();
const { Pool } = require('pg');

// Veritabanı bağlantısı
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres'
});

async function setupProducts() {
  const client = await pool.connect();
  
  try {
    console.log('Veritabanına bağlanıldı');
    
    // 1. Tabloyu sil (varsa)
    await client.query('DROP TABLE IF EXISTS products CASCADE');
    console.log('Eski products tablosu silindi');
    
    // 2. Tabloyu oluştur
    const createTable = `
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name_tr TEXT NOT NULL,
        name_en TEXT NOT NULL,
        name_ru TEXT NOT NULL,
        name_ka TEXT NOT NULL,
        description_tr TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_ru TEXT NOT NULL,
        description_ka TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        currency TEXT NOT NULL DEFAULT 'EUR',
        category TEXT NOT NULL,
        image_url TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )
    `;
    
    await client.query(createTable);
    console.log('Products tablosu oluşturuldu');
    
    // 3. Ürünleri ekle
    const insertProducts = `
      INSERT INTO products (
        slug, name_tr, name_en, name_ru, name_ka, 
        description_tr, description_en, description_ru, description_ka,
        price, currency, category, image_url, is_active
      ) VALUES
      (
        'sac-bakim-serumu', 
        'Saç Bakım Serumu', 'Hair Care Serum', 'Сыворотка для ухода за волосами', 'თმის მოვლის შრატი',
        'Saç ekimi sonrası iyileşme sürecini hızlandıran özel formüllü serum', 
        'Special formula serum that speeds healing after hair transplantation', 
        'Специальная формула сыворотки, ускоряющая заживление после трансплантации волос', 
        'სპეციალური ფორმულა შრატი, რომელიც აჩქარებს შეხორცებას თმის გადანერგვის შემდეგ',
        29.99, 'EUR', 'hair-care', '/images/products/hair-serum.jpg', true
      ),
      (
        'vitamin-kompleksi', 
        'Saç Vitamini Kompleksi', 'Hair Vitamin Complex', 'Витаминный комплекс для волос', 'თმის ვიტამინის კომპლექსი',
        'Saç sağlığını içten destekleyen vitamin takviyesi', 
        'Vitamin supplement that supports hair health from within', 
        'Витаминная добавка, поддерживающая здоровье волос изнутри', 
        'ვიტამინის დანამატი, რომელიც ხელს უწყობს თმის ჯანმრთელობას შიგნიდან',
        39.99, 'EUR', 'supplement', '/images/products/hair-vitamins.jpg', true
      ),
      (
        'anti-shedding-sampuan', 
        'Dökülme Karşıtı Şampuan', 'Anti-Shedding Shampoo', 'Шампунь против выпадения', 'ცვენის საწინააღმდეგო შამპუნი',
        'Saç dökülmesine karşı etkili şampuan', 
        'Effective shampoo against hair loss', 
        'Эффективный шампунь против выпадения волос', 
        'ეფექტური შამპუნი თმის ცვენის წინააღმდეგ',
        19.99, 'EUR', 'hair-care', '/images/products/anti-shedding-shampoo.jpg', true
      ),
      (
        'sac-masaj-aleti', 
        'Saç Derisi Masaj Aleti', 'Scalp Massager', 'Массажер для кожи головы', 'თავის კანის მასაჟიორი',
        'Saç derisindeki kan dolaşımını artıran masaj aleti', 
        'Massage device that increases blood circulation in the scalp', 
        'Массажное устройство, улучшающее кровообращение в коже головы', 
        'მასაჟის მოწყობილობა, რომელიც ზრდის სისხლის მიმოქცევას თავის კანზე',
        24.99, 'EUR', 'tool', '/images/products/scalp-massager.jpg', true
      ),
      (
        'nemlendirici-sac-kremi', 
        'Yoğun Nemlendirici Saç Kremi', 'Moisturizing Conditioner', 'Увлажняющий кондиционер', 'დამატენიანებელი კონდიციონერი',
        'Derinlemesine nemlendiren saç kremi', 
        'Deeply moisturizing hair conditioner', 
        'Глубоко увлажняющий кондиционер для волос', 
        'ღრმად დამატენიანებელი თმის კონდიციონერი',
        18.99, 'EUR', 'hair-care', '/images/products/moisturizing-conditioner.jpg', true
      )
    `;
    
    await client.query(insertProducts);
    console.log('Ürünler eklendi');
    
    // 4. Veri kontrolü
    const checkResult = await client.query('SELECT COUNT(*) FROM products');
    console.log(`Toplam ${checkResult.rows[0].count} ürün eklendi`);
    
    console.log('İşlem başarıyla tamamlandı');
  } catch (err) {
    console.error('HATA:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

setupProducts().catch(err => console.error('Genel hata:', err)); 