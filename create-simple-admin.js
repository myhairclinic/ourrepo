// Basit bir admin kullanıcı oluşturma betiği
import { storage } from './server/storage.js';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminUser() {
  try {
    console.log('Admin kullanıcısı oluşturma işlemi başlatılıyor...');
    
    const username = 'admin';
    const password = '1234';
    const role = 'admin';
    
    // Önce mevcut kullanıcıları kontrol et
    const users = await storage.getUsers();
    console.log('Mevcut kullanıcılar:', users.length);
    
    const existingAdmin = users.find(user => user.username === username);
    if (existingAdmin) {
      console.log('Admin kullanıcısı zaten mevcut:', existingAdmin.id);
      return;
    }
    
    // Kullanıcı yoksa yeni admin oluştur
    const hashedPassword = await hashPassword(password);
    
    const newUser = await storage.createUser({
      username,
      password: hashedPassword,
      role
    });
    
    console.log('Yeni admin kullanıcısı oluşturuldu:', newUser.id);
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    process.exit(0);
  }
}

createAdminUser(); 