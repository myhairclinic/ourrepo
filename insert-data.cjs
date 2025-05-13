// Veritabanı tabloları ve örnek veri oluşturma
require('dotenv').config();
const { Client } = require('pg');
const crypto = require('crypto');
const util = require('util');

// Veritabanı bağlantısı
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Ana fonksiyon
async function setupDatabase() {
  try {
    // Veritabanına bağlan
    await client.connect();
    console.log('Veritabanına bağlantı başarılı');
    
    // Packages tablosunu oluştur
    await createPackagesTable();
    
    // Services tablosunu oluştur
    await createServicesTable();
    
    // Örnek paket verileri ekle
    await insertPackages();
    
    // Örnek hizmet verileri ekle
    await insertServices();
    
    console.log('Tüm işlemler başarıyla tamamlandı');
  } catch (error) {
    console.error('Bir hata oluştu:', error);
  } finally {
    // Bağlantıyı kapat
    await client.end();
    console.log('Veritabanı bağlantısı kapatıldı');
  }
}

// Packages tablosunu oluştur
async function createPackagesTable() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS packages (
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
        price INTEGER NOT NULL,
        currency TEXT NOT NULL DEFAULT 'EUR',
        package_type TEXT NOT NULL,
        duration TEXT,
        includes TEXT NOT NULL,
        country_code TEXT,
        image_url TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        featured_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Packages tablosu oluşturuldu/kontrol edildi');
    
    // Tabloyu temizle
    await client.query('TRUNCATE TABLE packages RESTART IDENTITY CASCADE;');
    console.log('Packages tablosu temizlendi');
  } catch (error) {
    console.error('Packages tablosu oluşturulurken hata:', error);
    throw error;
  }
}

// Services tablosunu oluştur
async function createServicesTable() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title_tr TEXT NOT NULL,
        title_en TEXT NOT NULL,
        title_ru TEXT NOT NULL,
        title_ka TEXT NOT NULL,
        description_tr TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_ru TEXT NOT NULL,
        description_ka TEXT NOT NULL,
        detailed_content_tr TEXT,
        detailed_content_en TEXT,
        detailed_content_ru TEXT,
        detailed_content_ka TEXT,
        procedure_steps_tr TEXT,
        procedure_steps_en TEXT,
        procedure_steps_ru TEXT,
        procedure_steps_ka TEXT,
        candidate_info_tr TEXT,
        candidate_info_en TEXT,
        candidate_info_ru TEXT,
        candidate_info_ka TEXT,
        post_care_tr TEXT,
        post_care_en TEXT,
        post_care_ru TEXT,
        post_care_ka TEXT,
        faqs_tr TEXT,
        faqs_en TEXT,
        faqs_ru TEXT,
        faqs_ka TEXT,
        image_url TEXT NOT NULL DEFAULT '/images/services/default.jpg',
        extra_image_urls TEXT,
        video_url TEXT,
        duration TEXT DEFAULT '60-90',
        price INTEGER,
        meta_title_tr TEXT,
        meta_title_en TEXT,
        meta_title_ru TEXT,
        meta_title_ka TEXT,
        meta_description_tr TEXT,
        meta_description_en TEXT,
        meta_description_ru TEXT,
        meta_description_ka TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Services tablosu oluşturuldu/kontrol edildi');
    
    // Tabloyu temizle
    await client.query('TRUNCATE TABLE services RESTART IDENTITY CASCADE;');
    console.log('Services tablosu temizlendi');
  } catch (error) {
    console.error('Services tablosu oluşturulurken hata:', error);
    throw error;
  }
}

// Packages tablosuna örnek veri ekle
async function insertPackages() {
  try {
    await client.query(`
      INSERT INTO packages (
        slug, 
        name_tr, name_en, name_ru, name_ka, 
        description_tr, description_en, description_ru, description_ka, 
        price, currency, package_type, duration, includes, country_code, image_url, is_active, featured_order
      ) VALUES 
      (
        'premium-sac-ekimi',
        'Premium Saç Ekimi Paketi', 'Premium Hair Transplant Package', 'Премиум пакет трансплантации волос', 'პრემიუმ თმის გადანერგვის პაკეტი',
        'Lüks otel konaklaması, VIP transfer ve özel bakım ürünleri içeren premium saç ekimi paketi.', 
        'Premium hair transplant package including luxury hotel accommodation, VIP transfers, and specialized care products.', 
        'Премиум-пакет трансплантации волос, включающий проживание в роскошном отеле, VIP-трансферы и специализированные средства по уходу.',
        'პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს სასტუმროში განთავსებას, VIP ტრანსფერებს და სპეციალიზებულ მოვლის პროდუქტებს.',
        2500, 'EUR', 'premium', '2-3 gün/days', 
        'Lüks otel,VIP transfer,FUE teknigi,3000 greft,Aftercare paketi,Sac bakim ürünleri,Sinirsiz danismanlik',
        'TR', '/images/packages/premium.jpg', TRUE, 1
      ),
      (
        'standart-sac-ekimi',
        'Standart Saç Ekimi Paketi', 'Standard Hair Transplant Package', 'Стандартный пакет трансплантации волос', 'სტანდარტული თმის გადანერგვის პაკეტი',
        'Konforlu konaklama, transfer ve bakım ürünleri içeren standart saç ekimi paketi.', 
        'Standard hair transplant package including comfortable accommodation, transfers, and care products.', 
        'Стандартный пакет трансплантации волос, включающий комфортное проживание, трансферы и средства по уходу.',
        'სტანდარტული თმის გადანერგვის პაკეტი, რომელიც მოიცავს კომფორტულ საცხოვრებელს, ტრანსფერებს და მოვლის პროდუქტებს.',
        1800, 'EUR', 'standard', '2 gün/days', 
        'Standart otel,Transfer,FUE teknigi,2500 greft,Aftercare paketi,Sac bakim ürünleri',
        'TR', '/images/packages/standard.jpg', TRUE, 2
      ),
      (
        'ekonomik-sac-ekimi',
        'Ekonomik Saç Ekimi Paketi', 'Economic Hair Transplant Package', 'Экономичный пакет трансплантации волос', 'ეკონომიური თმის გადანერგვის პაკეტი',
        'Uygun fiyatlı konaklama ve temel bakım ürünleri içeren ekonomik saç ekimi paketi.', 
        'Economic hair transplant package including budget accommodation and basic care products.', 
        'Экономичный пакет трансплантации волос, включающий бюджетное проживание и базовые средства по уходу.',
        'ეკონომიური თმის გადანერგვის პაკეტი, რომელიც მოიცავს ბიუჯეტურ საცხოვრებელს და ძირითად მოვლის პროდუქტებს.',
        1200, 'EUR', 'budget', '2 gün/days', 
        'Ekonomik otel,Transfer,FUE teknigi,2000 greft,Temel aftercare paketi',
        'TR', '/images/packages/economic.jpg', TRUE, 3
      ),
      (
        'luks-sac-ekimi',
        'Lüks Saç Ekimi Paketi', 'Luxury Hair Transplant Package', 'Люкс пакет трансплантации волос', 'ლუქს თმის გადანერგვის პაკეტი',
        '5 yıldızlı otel konaklaması, özel şoförlü transfer ve premium bakım ürünleri içeren lüks saç ekimi paketi.', 
        'Luxury hair transplant package including 5-star hotel accommodation, private chauffeur transfers, and premium care products.', 
        'Люкс-пакет трансплантации волос, включающий проживание в 5-звездочном отеле, частные трансферы с шофером и премиальные средства по уходу.',
        'ლუქს თმის გადანერგვის პაკეტი, რომელიც მოიცავს 5-ვარსკვლავიან სასტუმროში განთავსებას, კერძო შოფრით ტრანსფერებს და პრემიუმ მოვლის პროდუქტებს.',
        3500, 'EUR', 'luxury', '3-4 gün/days', 
        '5 yildizli otel,Özel soförlü VIP transfer,Sapphire FUE teknigi,3500 greft,Premium aftercare paketi,Özel sac bakim ürünleri seti,Ömür boyu sinirsiz danismanlik,1 yil kontrol muayeneleri',
        'TR', '/images/packages/luxury.jpg', TRUE, 0
      )
    `);
    console.log('Packages tablosuna örnek veriler eklendi');
  } catch (error) {
    console.error('Packages verileri eklenirken hata:', error);
    throw error;
  }
}

// Services tablosuna örnek veri ekle
async function insertServices() {
  try {
    await client.query(`
      INSERT INTO services (
        slug, 
        title_tr, title_en, title_ru, title_ka,
        description_tr, description_en, description_ru, description_ka,
        detailed_content_tr, detailed_content_en, detailed_content_ru, detailed_content_ka,
        procedure_steps_tr, procedure_steps_en, procedure_steps_ru, procedure_steps_ka,
        candidate_info_tr, candidate_info_en, candidate_info_ru, candidate_info_ka,
        post_care_tr, post_care_en, post_care_ru, post_care_ka,
        image_url, price, duration, is_active
      ) VALUES 
      (
        'sac-ekimi',
        'Saç Ekimi', 'Hair Transplant', 'Трансплантация волос', 'თმის გადანერგვა',
        'DHI ve FUE teknikleri ile dogal sonuçlar veren saç ekimi uygulamalari.', 
        'Hair transplant applications that give natural results with DHI and FUE techniques.', 
        'Трансплантация волос, дающая естественные результаты по технологиям DHI и FUE.', 
        'თმის გადანერგვა, რომელიც იძლევა ბუნებრივ შედეგებს DHI და FUE ტექნიკებით.',
        
        'Saç ekimi, saç dökülmesi sorunu yasayan kisilere kalici bir çözüm sunan cerrahi bir islemdir. Klinigimizde DHI ve FUE gibi modern teknikleri kullanarak, dogal görünümlü ve kalici sonuçlar elde edilmesini sagliyoruz.', 
        
        'Hair transplantation is a surgical procedure that offers a permanent solution to people suffering from hair loss. In our clinic, we use modern techniques such as DHI and FUE to achieve natural-looking and permanent results.',
        
        'Трансплантация волос — это хирургическая процедура, которая предлагает постоянное решение для людей, страдающих от выпадения волос. В нашей клинике мы используем современные методы, такие как DHI и FUE.',
        
        'თმის გადანერგვა არის ქირურგიული პროცედურა, რომელიც სთავაზობს მუდმივ გადაწყვეტილებას თმის ცვენის პრობლემით დაავადებულ ადამიანებს. ჩვენს კლინიკაში ვიყენებთ თანამედროვე ტექნიკებს.',
        
        '1. Konsültasyon
2. Planlama
3. Anestezi
4. Greft Toplama
5. Kanal Açma
6. Yerlestirme
7. Tamamlama',

        '1. Consultation
2. Planning
3. Anesthesia
4. Graft Collection
5. Channel Opening
6. Placement
7. Completion',

        '1. Консультация
2. Планирование
3. Анестезия
4. Сбор графтов
5. Открытие каналов
6. Размещение
7. Завершение',

        '1. კონსულტაცია
2. დაგეგმვა
3. ანესთეზია
4. გრაფტების შეგროვება
5. არხების გახსნა
6. განთავსება
7. დასრულება',

        'Saç ekimi için ideal adaylar:
- Kalici saç dökülmesi yasayanlar
- Yeterli donör saç bölgesi olanlar
- Genel saglik durumu iyi olanlar',

        'Ideal candidates for hair transplantation:
- Those experiencing permanent hair loss
- Those with sufficient donor hair area
- Those in good general health',

        'Идеальные кандидаты для трансплантации волос:
- Те, кто испытывает постоянное выпадение волос
- Те, у кого достаточная площадь донорских волос
- Те, кто в хорошем общем состоянии здоровья',

        'იდეალური კანდიდატები თმის გადანერგვისთვის:
- ისინი, ვინც განიცდიან მუდმივ თმის ცვენის პრობლემით დაავადებულ ადამიანებს. ჩვენს კლინიკაში ვიყენებთ თანამედროვე ტექნიკებს.',

        'Saç ekimi sonrasi bakim:
- Ilk 3 gün dokunmayin
- 2 hafta agir sporlardan kaçinin
- Doktorun önerdigi sampuani kullanin',

        'Post-hair transplant care:
- Do not touch for the first 3 days
- Avoid heavy sports for 2 weeks
- Use the recommended shampoo',

        'Уход после трансплантации волос:
- Не трогайте в течение первых 3 дней
- Избегайте тяжелых видов спорта в течение 2 недель
- Используйте рекомендованный шампунь',

        'თმის გადანერგვის შემდგომი მოვლა:
- არ შეეხოთ პირველი 3 დღის განმავლობაში
- თავი აარიდეთ მძიმე სპორტს 2 კვირის განმავლობაში
- გამოიყენეთ რეკომენდებული შამპუნი',

        '/images/services/hair-transplant.jpg',
        1500,
        '4-8 saat',
        TRUE
      ),
      (
        'sakal-ekimi',
        'Sakal Ekimi', 'Beard Transplant', 'Пересадка бороды', 'წვერის გადანერგვა',
        'Seyrek sakal sorunu için kalici çözüm sunan sakal ekimi uygulamalari.', 
        'Beard transplant applications that offer a permanent solution for sparse beard problems.', 
        'Применение пересадки бороды, предлагающее постоянное решение для проблем с редкой бородой.', 
        'წვერის გადანერგვის პროცედურები, რომლებიც გთავაზობთ მუდმივ გადაწყვეტილებას მეჩხერი წვერის პრობლემებისთვის.',
        
        'Sakal ekimi, sakal bölgesinde seyreklik, bosluk veya asimetri sorunlari yasayan erkekler için kalici bir çözüm sunan islemdir.', 
        
        'Beard transplantation is a procedure that offers a permanent solution for men experiencing sparseness, gaps, or asymmetry problems in the beard area.',
        
        'Пересадка бороды — это процедура, которая предлагает постоянное решение для мужчин, испытывающих проблемы с редкостью, пробелами или асимметрией в области бороды.',
        
        'წვერის გადანერგვა არის პროცედურა, რომელიც სთავაზობს მუდმივ გადაწყვეტილებას კაცებს, რომლებსაც აქვთ პრობლემები სიმეჩხერით, ხარვეზებით ან ასიმეტრიული პრობლემები წვერის არეში.',
        
        '1. Konsültasyon
2. Planlama
3. Anestezi
4. Greft Toplama
5. Kanal Açma
6. Yerlestirme
7. Tamamlama',

        '1. Consultation
2. Planning
3. Anesthesia
4. Graft Collection
5. Channel Opening
6. Placement
7. Completion',

        '1. Консультация
2. Планирование
3. Анестезия
4. Сбор графтов
5. Открытие каналов
6. Размещение
7. Завершение',

        '1. კონსულტაცია
2. დაგეგმვა
3. ანესთეზია
4. გრაფტების შეგროვება
5. არხების გახსნა
6. განთავსება
7. დასრულება',

        'Sakal ekimi için ideal adaylar:
- Sakal bölgesinde seyreklik veya bosluk olanlar
- Sakal çikmayan alanlarda sakal isteyen erkekler',

        'Ideal candidates for beard transplantation:
- Those with sparseness or gaps in the beard area
- Men who want beard in areas where beard does not grow',

        'Идеальные кандидаты для пересадки бороды:
- Те, у кого есть редкость или пробелы в области бороды
- Мужчины, которые хотят бороду в областях, где борода не растет',

        'იდეალური კანდიდატები წვერის გადანერგვისთვის:
- ისინი, ვისაც აქვთ სიმეჩხერე ან ხარვეზები წვერის არეში
- კაცები, რომლებსაც სურთ წვერი იმ ადგილებში, სადაც წვერი არ იზრდება',

        'Sakal ekimi sonrasi bakim:
- Ilk 3 gün dokunmayin
- 2 hafta tiras olmayin
- Doktorun önerdigi ürünleri kullanin',

        'Post-beard transplant care:
- Do not touch for the first 3 days
- Do not shave for 2 weeks
- Use the recommended products',

        'Уход после пересадки бороды:
- Не трогайте в течение первых 3 дней
- Не бритье в течение 2 недель
- Используйте рекомендованные продукты',

        'წვერის გადანერგვის შემდგომი მოვლა:
- არ შეეხოთ პირველი 3 დღის განმავლობაში
- არ გაიპარსოთ 2 კვირის განმავლობაში
- გამოიყენეთ რეკომენდებული პროდუქტები',

        '/images/services/beard-transplant.jpg',
        1000,
        '3-5 saat',
        TRUE
      ),
      (
        'kas-ekimi',
        'Kaş Ekimi', 'Eyebrow Transplant', 'Трансплантация бровей', 'წარბების გადანერგვა',
        'Seyrek ve sekilsiz kaslar için kalici çözüm sunan kas ekimi uygulamalari.', 
        'Eyebrow transplant applications that offer a permanent solution for sparse and shapeless eyebrows.', 
        'Применение трансплантации бровей, предлагающее постоянное решение для редких и бесформенных бровей.', 
        'წარბების გადანერგვის პროცედურები, რომლებიც გთავაზობთ მუდმივ გადაწყვეტილებას მეჩხერი და უფორმო წარბებისთვის.',
        
        'Kas ekimi, genetik faktörler, asiri epilasyon veya yaralanmalar sonucu kas bölgesinde seyreklesen ve sekil bozukluklari yasayan kisiler için uygulanan bir islemdir.', 
        
        'Eyebrow transplantation is a procedure applied to people who experience thinning and deformation in the eyebrow area due to genetic factors, excessive epilation, or injuries.',
        
        'Трансплантация бровей — это процедура, применяемая к людям, которые испытывают истончение и деформацию в области бровей из-за генетических факторов, чрезмерной эпиляции или травм.',
        
        'წარბების გადანერგვა არის პროცედურა, რომელიც გამოიყენება ადამიანებისთვის, რომლებიც განიცდიან გათხელებას და დეფორმაციას წარბების ზონაში გენეტიკური ფაქტორების, ჭარბი ეპილაციის ან დაზიანებების გამო.',
        
        '1. Konsültasyon
2. Planlama
3. Anestezi
4. Greft Toplama
5. Kanal Açma
6. Yerlestirme
7. Tamamlama',

        '1. Consultation
2. Planning
3. Anesthesia
4. Graft Collection
5. Channel Opening
6. Placement
7. Completion',

        '1. Консультация
2. Планирование
3. Анестезия
4. Сбор графтов
5. Открытие каналов
6. Размещение
7. Завершение',

        '1. კონსულტაცია
2. დაგეგმვა
3. ანესთეზია
4. გრაფტების შეგროვება
5. არხების გახსნა
6. განთავსება
7. დასრულება',

        'Kas ekimi için ideal adaylar:
- Seyrek veya sekilsiz kaslari olanlar
- Kas alopesisi olanlar
- Yaralanma veya yanik sonucu kas kaybi yasayanlar',

        'Ideal candidates for eyebrow transplantation:
- Those with sparse or shapeless eyebrows
- Those with eyebrow alopecia
- Those who have lost eyebrows due to injury or burns',

        'Идеальные кандидаты для трансплантации бровей:
- Те, у кого редкие или бесформенные брови
- Те, у кого алопеция бровей
- Те, кто потерял брови из-за травмы или ожогов',

        'იდეალური კანდიდატები წარბების გადანერგვისთვის:
- ისინი, ვისაც აქვთ მეჩხერი ან უფორმო წარბები
- ისინი, ვისაც აქვთ წარბების ალოპეცია
- ისინი, ვინც დაკარგეს წარბები დაზიანების ან დამწვრობის გამო',

        'Kas ekimi sonrasi bakim:
- Ilk 3 gün dokunmayin
- 2 hafta yikamayin
- Doktorun önerdigi ürünleri kullanin',

        'Post-eyebrow transplant care:
- Do not touch for the first 3 days
- Do not wash for 2 weeks
- Use the recommended products',

        'Уход после трансплантации бровей:
- Не трогайте в течение первых 3 дней
- Не мойте в течение 2 недель
- Используйте рекомендованные продукты',

        'წარბების გადანერგვის შემდგომი მოვლა:
- არ შეეხოთ პირველი 3 დღის განმავლობაში
- არ დაიბანოთ 2 კვირის განმავლობაში
- გამოიყენეთ რეკომენდებული პროდუქტები',

        '/images/services/eyebrow-transplant.jpg',
        800,
        '2-3 saat',
        TRUE
      )
    `);
    console.log('Services tablosuna örnek veriler eklendi');
  } catch (error) {
    console.error('Services verileri eklenirken hata:', error);
    throw error;
  }
}

// Veritabanını kur ve doldur
setupDatabase(); 