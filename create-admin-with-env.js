// .env dosyasını önce yükleyen basit bir admin kullanıcı oluşturma betiği
import { config } from 'dotenv';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import ws from 'ws';

// .env dosyasını yükle
config();

// Gerekli fonksiyonları tanımla
const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminUser() {
  console.log('Admin kullanıcısı oluşturma işlemi başlatılıyor...');
  
  // DATABASE_URL'i kontrol et
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL bulunamadı! .env dosyasını kontrol edin.');
    process.exit(1);
  }
  
  console.log('Veritabanı URL:', process.env.DATABASE_URL);
  
  // Veritabanı bağlantısı
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    // Kullanıcı oluşturmak için SQL sorgusu
    const hashedPassword = await hashPassword('1234');
    
    // Önce users tablosunun varlığını kontrol et
    const tableResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    const tableExists = tableResult.rows[0].exists;
    
    if (!tableExists) {
      console.log('Users tablosu bulunamadı, oluşturuluyor...');
      
      // Tablo oluştur
      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);
      
      console.log('Users tablosu oluşturuldu.');
    }
    
    // Mevcut admin kullanıcısını kontrol et
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', ['admin']);
    
    if (userResult.rows.length > 0) {
      console.log('Admin kullanıcısı zaten mevcut. ID:', userResult.rows[0].id);
    } else {
      // Yeni admin kullanıcı oluştur
      const insertResult = await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
        ['admin', hashedPassword, 'admin']
      );
      
      console.log('Yeni admin kullanıcısı oluşturuldu. ID:', insertResult.rows[0].id);
    }
    
  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    // Bağlantıyı kapat
    await pool.end();
    console.log('İşlem tamamlandı.');
  }
}

// Admin kullanıcı oluşturma fonksiyonunu çalıştır
createAdminUser(); 