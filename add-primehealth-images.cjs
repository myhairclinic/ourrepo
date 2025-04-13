const { Pool } = require('pg');

// Veritabanı bağlantısı
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Blog ID'leri ve PrimeHealth görsel yolları
const imageUpdates = [
  { id: 60, imageUrl: '/attached_assets/primehealth1.png' },
  { id: 61, imageUrl: '/attached_assets/primehealth2.png' },
  { id: 62, imageUrl: '/attached_assets/primehealth3.png' },
  { id: 63, imageUrl: '/attached_assets/primehealth4.png' },
  { id: 64, imageUrl: '/attached_assets/primehealth5.png' },
  // Ekstra bloglar için varsayılan değerler
  { id: 65, imageUrl: '/attached_assets/primehealth1.png' },
  { id: 66, imageUrl: '/attached_assets/primehealth2.png' },
  { id: 67, imageUrl: '/attached_assets/primehealth3.png' },
  { id: 68, imageUrl: '/attached_assets/primehealth4.png' },
  { id: 69, imageUrl: '/attached_assets/primehealth5.png' },
  { id: 70, imageUrl: '/attached_assets/primehealth1.png' },
  { id: 71, imageUrl: '/attached_assets/primehealth2.png' },
  { id: 72, imageUrl: '/attached_assets/primehealth3.png' },
  { id: 73, imageUrl: '/attached_assets/primehealth4.png' },
  { id: 74, imageUrl: '/attached_assets/primehealth5.png' },
  { id: 75, imageUrl: '/attached_assets/primehealth1.png' },
  { id: 76, imageUrl: '/attached_assets/primehealth2.png' },
  { id: 77, imageUrl: '/attached_assets/primehealth3.png' },
  { id: 78, imageUrl: '/attached_assets/primehealth4.png' },
  { id: 79, imageUrl: '/attached_assets/primehealth5.png' },
  { id: 80, imageUrl: '/attached_assets/primehealth1.png' },
];

async function updateBlogImages() {
  const client = await pool.connect();
  
  try {
    console.log('Blog görsellerini güncelleme başladı...');
    
    // Her bir güncellemeyi gerçekleştir
    for (const update of imageUpdates) {
      const result = await client.query(
        'UPDATE blog_posts SET "image_url" = $1 WHERE id = $2 RETURNING id, "title_tr" as "titleTR", "image_url" as "imageUrl"',
        [update.imageUrl, update.id]
      );
      
      if (result.rows.length > 0) {
        console.log(`Blog güncellendi - ID: ${result.rows[0].id}, Başlık: ${result.rows[0].titleTR}, Görsel: ${result.rows[0].imageUrl}`);
      } else {
        console.log(`ID:${update.id} - Blog bulunamadı.`);
      }
    }
    
    console.log('Blog görselleri başarıyla güncellendi!');
  } catch (error) {
    console.error('Blog güncelleme hatası:', error);
  } finally {
    client.release();
  }
}

// Fonksiyonu çalıştır
updateBlogImages()
  .then(() => {
    console.log('İşlem tamamlandı.');
    process.exit(0);
  })
  .catch(err => {
    console.error('İşlem sırasında hata oluştu:', err);
    process.exit(1);
  });