const dotenv = require('dotenv');
dotenv.config();
const { pool } = require('./server/db.js');
const { drizzle } = require('drizzle-orm/neon-serverless');
const schema = require('./shared/schema.js');

const db = drizzle({ client: pool, schema });

async function addPredefinedMessages() {
  try {
    // Mevcut şablonları temizle
    await db.delete(schema.telegramPredefinedMessages);
    
    console.log('Eski hazır mesaj şablonları temizlendi.');
    
    // Yeni şablonları ekle
    const predefinedMessages = [
      {
        title: 'Karşılama Mesajı',
        text: "Merhaba! MyHair Clinic'e hoş geldiniz. Size nasıl yardımcı olabiliriz?",
        language: 'tr',
        tags: ['karşılama', 'hoşgeldiniz']
      },
      {
        title: 'Randevu Onayı',
        text: 'Sayın hastamız, randevunuz başarıyla oluşturulmuştur. Randevu detaylarınız: {{tarih}} {{saat}}. Herhangi bir değişiklik için bize ulaşabilirsiniz.',
        language: 'tr',
        tags: ['randevu', 'onay']
      },
      {
        title: 'Saç Ekimi Bilgilendirme',
        text: 'FUE ve DHI tekniklerini kullanarak yüksek başarı oranıyla saç ekimi hizmeti sunmaktayız. Detaylı bilgi almak ve ücretsiz konsültasyon için iletişime geçebilirsiniz.',
        language: 'tr',
        tags: ['saç ekimi', 'bilgi']
      },
      {
        title: 'Fiyat Bilgisi',
        text: 'Saç ekimi fiyatlarımız kişisel ihtiyaçlarınıza göre değişiklik göstermektedir. Ücretsiz saç analizi sonrasında detaylı fiyat bilgisi verebiliriz. İletişim bilgilerinizi bırakabilirsiniz.',
        language: 'tr',
        tags: ['fiyat', 'ücret']
      },
      {
        title: 'İlaç Kullanımı Bilgilendirme',
        text: 'Saç ekimi sonrası ilaç kullanımı hakkında: Doktorunuzun reçete ettiği ilaçları düzenli kullanmanız iyileşme sürecini hızlandıracaktır. Antibiyotik tedavisini tam süresi boyunca kullanmanız önemlidir.',
        language: 'tr',
        tags: ['ilaç', 'tedavi', 'aftercare']
      },
      {
        title: 'Accommodation Information',
        text: 'During your stay in Tbilisi, we offer complimentary accommodation at our partner hotels. Your comfort is our priority throughout your treatment journey.',
        language: 'en',
        tags: ['accommodation', 'hotel']
      },
      {
        title: 'Welcome Message',
        text: 'Hello! Welcome to MyHair Clinic. How may we assist you today?',
        language: 'en',
        tags: ['welcome', 'greeting']
      },
      {
        title: 'Appointment Confirmation',
        text: 'Dear patient, your appointment has been successfully scheduled for {{date}} at {{time}}. Please contact us if you need to make any changes.',
        language: 'en',
        tags: ['appointment', 'confirmation']
      },
      {
        title: 'Информация о Процедуре',
        text: 'Мы проводим трансплантацию волос с использованием современных техник FUE и DHI. Для получения более подробной информации и бесплатной консультации, пожалуйста, свяжитесь с нами.',
        language: 'ru',
        tags: ['процедура', 'информация']
      },
      {
        title: 'Приветственное Сообщение',
        text: 'Здравствуйте! Добро пожаловать в клинику MyHair. Чем мы можем вам помочь сегодня?',
        language: 'ru',
        tags: ['приветствие', 'добро пожаловать']
      }
    ];
    
    // Şablonları veritabanına ekle
    await db.insert(schema.telegramPredefinedMessages).values(predefinedMessages);
    
    console.log(`${predefinedMessages.length} adet hazır mesaj şablonu eklendi.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Hazır mesaj şablonları eklenirken hata oluştu:', error);
    process.exit(1);
  }
}

addPredefinedMessages();