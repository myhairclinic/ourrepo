-- Önce packages tablosunun varlığını kontrol et ve yoksa oluştur
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

-- Packages tablosuna örnek veri ekle
INSERT INTO packages (
  slug, 
  name_tr, name_en, name_ru, name_ka, 
  description_tr, description_en, description_ru, description_ka, 
  price, currency, package_type, duration, includes, country_code, image_url, is_active, featured_order
) VALUES 
-- Premium Paket
(
  'premium-saç-ekimi',
  'Premium Saç Ekimi Paketi', 'Premium Hair Transplant Package', 'Премиум пакет трансплантации волос', 'პრემიუმ თმის გადანერგვის პაკეტი',
  'Lüks otel konaklaması, VIP transfer ve özel bakım ürünleri içeren premium saç ekimi paketi.', 
  'Premium hair transplant package including luxury hotel accommodation, VIP transfers, and specialized care products.', 
  'Премиум-пакет трансплантации волос, включающий проживание в роскошном отеле, VIP-трансферы и специализированные средства по уходу.',
  'პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს სასტუმროში განთავსებას, VIP ტრანსფერებს და სპეციალიზებულ მოვლის პროდუქტებს.',
  2500, 'EUR', 'premium', '2-3 gün/days', 
  'Lüks otel,VIP transfer,FUE tekniği,3000 greft,Aftercare paketi,Saç bakım ürünleri,Sınırsız danışmanlık',
  'TR', '/images/packages/premium.jpg', TRUE, 1
),
-- Standart Paket
(
  'standart-saç-ekimi',
  'Standart Saç Ekimi Paketi', 'Standard Hair Transplant Package', 'Стандартный пакет трансплантации волос', 'სტანდარტული თმის გადანერგვის პაკეტი',
  'Konforlu konaklama, transfer ve bakım ürünleri içeren standart saç ekimi paketi.', 
  'Standard hair transplant package including comfortable accommodation, transfers, and care products.', 
  'Стандартный пакет трансплантации волос, включающий комфортное проживание, трансферы и средства по уходу.',
  'სტანდარტული თმის გადანერგვის პაკეტი, რომელიც მოიცავს კომფორტულ საცხოვრებელს, ტრანსფერებს და მოვლის პროდუქტებს.',
  1800, 'EUR', 'standard', '2 gün/days', 
  'Standart otel,Transfer,FUE tekniği,2500 greft,Aftercare paketi,Saç bakım ürünleri',
  'TR', '/images/packages/standard.jpg', TRUE, 2
),
-- Ekonomik Paket
(
  'ekonomik-saç-ekimi',
  'Ekonomik Saç Ekimi Paketi', 'Economic Hair Transplant Package', 'Экономичный пакет трансплантации волос', 'ეკონომიური თმის გადანერგვის პაკეტი',
  'Uygun fiyatlı konaklama ve temel bakım ürünleri içeren ekonomik saç ekimi paketi.', 
  'Economic hair transplant package including budget accommodation and basic care products.', 
  'Экономичный пакет трансплантации волос, включающий бюджетное проживание и базовые средства по уходу.',
  'ეკონომიური თმის გადანერგვის პაკეტი, რომელიც მოიცავს ბიუჯეტურ საცხოვრებელს და ძირითად მოვლის პროდუქტებს.',
  1200, 'EUR', 'budget', '2 gün/days', 
  'Ekonomik otel,Transfer,FUE tekniği,2000 greft,Temel aftercare paketi',
  'TR', '/images/packages/economic.jpg', TRUE, 3
),
-- Lüks Paket
(
  'luks-saç-ekimi',
  'Lüks Saç Ekimi Paketi', 'Luxury Hair Transplant Package', 'Люкс пакет трансплантации волос', 'ლუქს თმის გადანერგვის პაკეტი',
  '5 yıldızlı otel konaklaması, özel şoförlü transfer ve premium bakım ürünleri içeren lüks saç ekimi paketi.', 
  'Luxury hair transplant package including 5-star hotel accommodation, private chauffeur transfers, and premium care products.', 
  'Люкс-пакет трансплантации волос, включающий проживание в 5-звездочном отеле, частные трансферы с шофером и премиальные средства по уходу.',
  'ლუქს თმის გადანერგვის პაკეტი, რომელიც მოიცავს 5-ვარსკვლავიან სასტუმროში განთავსებას, კერძო შოფრით ტრანსფერებს და პრემიუმ მოვლის პროდუქტებს.',
  3500, 'EUR', 'luxury', '3-4 gün/days', 
  '5 yıldızlı otel,Özel şoförlü VIP transfer,Sapphire FUE tekniği,3500 greft,Premium aftercare paketi,Özel saç bakım ürünleri seti,Ömür boyu sınırsız danışmanlık,1 yıl kontrol muayeneleri',
  'TR', '/images/packages/luxury.jpg', TRUE, 0
); 