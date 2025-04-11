// Admin kullanıcısını oluşturmak için script
const http = require('http');
const crypto = require('crypto');

const API_URL = 'http://localhost:3000/api';

function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const options = {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(body);
            resolve(json);
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`HTTP Hatası: ${res.statusCode} ${body}`));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Admin kullanıcısını oluşturmak için parola hash'leme fonksiyonu
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${derivedKey.toString('hex')}.${salt}`);
    });
  });
}

async function createAdminUser() {
  try {
    const hashedPassword = await hashPassword('admin123');
    
    const userData = {
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    };
    
    console.log('Admin kullanıcısı oluşturuluyor...');
    
    try {
      const response = await makeRequest(`${API_URL}/register`, 'POST', userData);
      console.log('Admin kullanıcısı başarıyla oluşturuldu:', response);
    } catch (error) {
      console.log('Admin kullanıcısı zaten mevcut olabilir, login deniyoruz...');
      
      try {
        const loginResponse = await makeRequest(`${API_URL}/login`, 'POST', {
          username: 'admin',
          password: 'admin123'
        });
        console.log('Admin kullanıcısı ile giriş başarılı:', loginResponse);
      } catch (loginError) {
        console.error('Giriş başarısız:', loginError.message);
      }
    }
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

// Admin kullanıcı oluşturma fonksiyonunu çalıştır
createAdminUser();