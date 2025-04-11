// Blog yazılarını yeniden oluşturmak için çalıştırılacak script

async function seedBlogs() {
  try {
    console.log('Benzersiz blog yazıları ekleniyor...');
    const response = await fetch('http://localhost:3000/api/seed/unique-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    console.log('Sonuç:', result);
  } catch (error) {
    console.error('Hata:', error);
  }
}

seedBlogs();