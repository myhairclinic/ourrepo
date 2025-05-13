-- Önce services tablosunun varlığını kontrol et ve yoksa oluştur
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

-- Services tablosundaki mevcut verileri temizle
TRUNCATE TABLE services RESTART IDENTITY CASCADE;

-- Services tablosuna örnek veri ekle
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
-- Saç Ekimi
(
  'sac-ekimi',
  'Saç Ekimi', 'Hair Transplant', 'Трансплантация волос', 'თმის გადანერგვა',
  'DHI ve FUE teknikleri ile dogal sonuçlar veren saç ekimi uygulamalari.', 
  'Hair transplant applications that give natural results with DHI and FUE techniques.', 
  'Трансплантация волос, дающая естественные результаты по технологиям DHI и FUE.', 
  'თმის გადანერგვა, რომელიც იძლევა ბუნებრივ შედეგებს DHI და FUE ტექნიკებით.',
  
  'Saç ekimi, saç dökülmesi sorunu yasayan kisilere kalici bir çözüm sunan cerrahi bir islemdir. Klinigimizde DHI ve FUE gibi modern teknikleri kullanarak, dogal görünümlü ve kalici sonuçlar elde edilmesini sagliyoruz. Islem, kendi saç köklerinizin alindigi donör bölgeden, saçlarin döküldügü alici bölgeye nakledilmesini içerir.', 
  
  'Hair transplantation is a surgical procedure that offers a permanent solution to people suffering from hair loss. In our clinic, we use modern techniques such as DHI and FUE to achieve natural-looking and permanent results. The procedure involves transferring your own hair follicles from the donor area to the recipient area where the hair has fallen out.',
  
  'Трансплантация волос — это хирургическая процедура, которая предлагает постоянное решение для людей, страдающих от выпадения волос. В нашей клинике мы используем современные методы, такие как DHI и FUE, для достижения естественно выглядящих и постоянных результатов. Процедура включает перенос собственных волосяных фолликулов из донорской области в область-реципиент, где выпали волосы.',
  
  'თმის გადანერგვა არის ქირურგიული პროცედურა, რომელიც სთავაზობს მუდმივ გადაწყვეტილებას თმის ცვენის პრობლემით დაავადებულ ადამიანებს. ჩვენს კლინიკაში ვიყენებთ თანამედროვე ტექნიკებს, როგორიცაა DHI და FUE, ბუნებრივი გარეგნობის და მუდმივი შედეგების მისაღწევად. პროცედურა მოიცავს საკუთარი თმის ფოლიკულების გადატანას დონორი უბნიდან რეციპიენტ უბანში, სადაც თმა გაცვივდა.',
  
  '1. Konsültasyon: Saç dökülme tipiniz ve beklentileriniz degerlendirilir.
2. Planlama: Donör ve alici bölge için detayli bir plan hazirlanir.
3. Anestezi: Lokal anestezi uygulanir.
4. Greft Toplama: Donör bölgeden saç kökleri alinir.
5. Kanal Açma: Alici bölgede mikro kanallar açilir.
6. Yerlestirme: Greftler bu kanallara yerlestirilir.
7. Tamamlama: Islem sonrasi bakim talimatlari verilir.',

  '1. Consultation: Your hair loss type and expectations are evaluated.
2. Planning: A detailed plan is prepared for the donor and recipient area.
3. Anesthesia: Local anesthesia is applied.
4. Graft Collection: Hair follicles are taken from the donor area.
5. Channel Opening: Micro channels are opened in the recipient area.
6. Placement: Grafts are placed in these channels.
7. Completion: Post-procedure care instructions are provided.',

  '1. Консультация: Оценивается тип выпадения волос и ваши ожидания.
2. Планирование: Готовится детальный план для донорской и реципиентной зоны.
3. Анестезия: Применяется местная анестезия.
4. Сбор графтов: Волосяные фолликулы берутся из донорской зоны.
5. Открытие каналов: В реципиентной зоне открываются микроканалы.
6. Размещение: Графты размещаются в этих каналах.
7. Завершение: Предоставляются инструкции по уходу после процедуры.',

  '1. კონსულტაცია: ფასდება თქვენი თმის ცვენის ტიპი და მოლოდინები.
2. დაგეგმვა: მზადდება დეტალური გეგმა დონორისა და რეციპიენტის ზონისთვის.
3. ანესთეზია: გამოიყენება ლოკალური ანესთეზია.
4. გრაფტების შეგროვება: თმის ფოლიკულები აღებულია დონორის ზონიდან.
5. არხების გახსნა: რეციპიენტის ზონაში იხსნება მიკროარხები.
6. განთავსება: გრაფტები თავსდება ამ არხებში.
7. დასრულება: წარმოდგენილია პროცედურის შემდგომი მოვლის ინსტრუქციები.',

  'Saç ekimi için ideal adaylar:
- Kalici saç dökülmesi yasayanlar
- Yeterli donör saç bölgesi olanlar
- Genel saglik durumu iyi olanlar
- Gerçekçi beklentileri olanlar
- 25-65 yas araliginda olanlar',

  'Ideal candidates for hair transplantation:
- Those experiencing permanent hair loss
- Those with sufficient donor hair area
- Those in good general health
- Those with realistic expectations
- Those between the ages of 25-65',

  'Идеальные кандидаты для трансплантации волос:
- Те, кто испытывает постоянное выпадение волос
- Те, у кого достаточная площадь донорских волос
- Те, кто в хорошем общем состоянии здоровья
- Те, у кого реалистичные ожидания
- Те, кто в возрасте от 25 до 65 лет',

  'იდეალური კანდიდატები თმის გადანერგვისთვის:
- ისინი, ვინც განიცდიან მუდმივ თმის ცვენას
- ისინი, ვისაც აქვთ საკმარისი დონორის თმის ფართობი
- ისინი, ვინც კარგ ზოგად ჯანმრთელობაში არიან
- ისინი, ვისაც აქვთ რეალისტური მოლოდინები
- ისინი, ვინც 25-65 წლის ასაკში არიან',

  'Saç ekimi sonrasi bakim:
- Ilk 3 gün boyunca nakil bölgesine dokunmayin
- 2 hafta boyunca agir sporlardan kaçinin
- Doktorunuzun önerdigi sampuan ve ilaçlari kullanin
- Direkt günes isigina maruz kalmaktan kaçinin
- Düzenli kontrollere gelin',

  'Post-hair transplant care:
- Do not touch the transplant area for the first 3 days
- Avoid heavy sports for 2 weeks
- Use the shampoo and medications recommended by your doctor
- Avoid exposure to direct sunlight
- Come for regular check-ups',

  'Уход после трансплантации волос:
- Не трогайте область трансплантации в течение первых 3 дней
- Избегайте тяжелых видов спорта в течение 2 недель
- Используйте шампунь и лекарства, рекомендованные вашим врачом
- Избегайте воздействия прямых солнечных лучей
- Приходите на регулярные проверки',

  'თმის გადანერგვის შემდგომი მოვლა:
- არ შეეხოთ გადანერგვის უბანს პირველი 3 დღის განმავლობაში
- თავი აარიდეთ მძიმე სპორტს 2 კვირის განმავლობაში
- გამოიყენეთ თქვენი ექიმის მიერ რეკომენდებული შამპუნი და მედიკამენტები
- თავი აარიდეთ პირდაპირი მზის სხივების ზემოქმედებას
- მოდით რეგულარული შემოწმებისთვის',

  '/images/services/hair-transplant.jpg',
  1500,
  '4-8 saat',
  TRUE
),
-- Sakal Ekimi
(
  'sakal-ekimi',
  'Sakal Ekimi', 'Beard Transplant', 'Пересадка бороды', 'წვერის გადანერგვა',
  'Seyrek sakal sorunu için kalici çözüm sunan sakal ekimi uygulamalari.', 
  'Beard transplant applications that offer a permanent solution for sparse beard problems.', 
  'Применение пересадки бороды, предлагающее постоянное решение для проблем с редкой бородой.', 
  'წვერის გადანერგვის პროცედურები, რომლებიც გთავაზობთ მუდმივ გადაწყვეტილებას მეჩხერი წვერის პრობლემებისთვის.',
  
  'Sakal ekimi, sakal bölgesinde seyreklik, bosluk veya asimetri sorunlari yasayan erkekler için kalici bir çözüm sunan islemdir. Saç ekimine benzer teknikler kullanilarak, kisinin kendi saç köklerinin sakal bölgesine nakledilmesiyle gerçeklestirilir. Bu sayede dogal görünümlü, kalici ve sik bir sakal elde edilir.', 
  
  'Beard transplantation is a procedure that offers a permanent solution for men experiencing sparseness, gaps, or asymmetry problems in the beard area. Using techniques similar to hair transplantation, it is performed by transplanting the person\'s own hair follicles to the beard area. This results in a natural-looking, permanent, and dense beard.',
  
  'Пересадка бороды — это процедура, которая предлагает постоянное решение для мужчин, испытывающих проблемы с редкостью, пробелами или асимметрией в области бороды. Используя методы, аналогичные трансплантации волос, она выполняется путем пересадки собственных волосяных фолликулов человека в область бороды. Это приводит к естественно выглядящей, постоянной и густой бороде.',
  
  'წვერის გადანერგვა არის პროცედურა, რომელიც სთავაზობს მუდმივ გადაწყვეტილებას კაცებს, რომლებსაც აქვთ პრობლემები სიმეჩხერით, ხარვეზებით ან ასიმეტრიული პრობლემები წვერის არეში. თმის გადანერგვის მსგავსი ტექნიკების გამოყენებით, ის ხორციელდება ადამიანის საკუთარი თმის ფოლიკულების გადანერგვით წვერის უბანში. ეს იწვევს ბუნებრივი გარეგნობის, მუდმივ და ხშირ წვერს.',
  
  '1. Konsültasyon: Sakal yapiniz ve beklentileriniz degerlendirilir.
2. Planlama: Donör ve alici bölge için plan yapilir.
3. Anestezi: Lokal anestezi uygulanir.
4. Greft Toplama: Basin arka kismindan saç kökleri alinir.
5. Kanal Açma: Sakal bölgesinde mikro kanallar açilir.
6. Yerlestirme: Greftler bu kanallara yerlestirilir.
7. Tamamlama: Islem sonrasi bakim talimatlari verilir.',

  '1. Consultation: Your beard structure and expectations are evaluated.
2. Planning: A plan is made for the donor and recipient area.
3. Anesthesia: Local anesthesia is applied.
4. Graft Collection: Hair follicles are taken from the back of the head.
5. Channel Opening: Micro channels are opened in the beard area.
6. Placement: Grafts are placed in these channels.
7. Completion: Post-procedure care instructions are provided.',

  '1. Консультация: Оценивается структура вашей бороды и ожидания.
2. Планирование: Составляется план для донорской и реципиентной зоны.
3. Анестезия: Применяется местная анестезия.
4. Сбор графтов: Волосяные фолликулы берутся с задней части головы.
5. Открытие каналов: В области бороды открываются микроканалы.
6. Размещение: Графты размещаются в этих каналах.
7. Завершение: Предоставляются инструкции по уходу после процедуры.',

  '1. კონსულტაცია: ფასდება თქვენი წვერის სტრუქტურა და მოლოდინები.
2. დაგეგმვა: კეთდება გეგმა დონორისა და რეციპიენტის ზონისთვის.
3. ანესთეზია: გამოიყენება ლოკალური ანესთეზია.
4. გრაფტების შეგროვება: თმის ფოლიკულები აღებულია თავის უკანა ნაწილიდან.
5. არხების გახსნა: წვერის ზონაში იხსნება მიკროარხები.
6. განთავსება: გრაფტები თავსდება ამ არხებში.
7. დასრულება: წარმოდგენილია პროცედურის შემდგომი მოვლის ინსტრუქციები.',

  'Sakal ekimi için ideal adaylar:
- Sakal bölgesinde seyreklik veya bosluk olanlar
- Sakal çikmayan alanlarda sakal isteyen erkekler
- Genel saglik durumu iyi olanlar
- Gerçekçi beklentileri olanlar
- 25 yas üstü olanlar',

  'Ideal candidates for beard transplantation:
- Those with sparseness or gaps in the beard area
- Men who want beard in areas where beard does not grow
- Those in good general health
- Those with realistic expectations
- Those over 25 years of age',

  'Идеальные кандидаты для пересадки бороды:
- Те, у кого есть редкость или пробелы в области бороды
- Мужчины, которые хотят бороду в областях, где борода не растет
- Те, кто в хорошем общем состоянии здоровья
- Те, у кого реалистичные ожидания
- Те, кто старше 25 лет',

  'იდეალური კანდიდატები წვერის გადანერგვისთვის:
- ისინი, ვისაც აქვთ სიმეჩხერე ან ხარვეზები წვერის არეში
- კაცები, რომლებსაც სურთ წვერი იმ ადგილებში, სადაც წვერი არ იზრდება
- ისინი, ვინც კარგ ზოგად ჯანმრთელობაში არიან
- ისინი, ვისაც აქვთ რეალისტური მოლოდინები
- ისინი, ვინც 25 წელზე მეტისაა',

  'Sakal ekimi sonrasi bakim:
- Ilk 3 gün boyunca nakil bölgesine dokunmayin
- 2 hafta boyunca tiras olmayin
- Doktorunuzun önerdigi sampuan ve ürünleri kullanin
- Direkt günes isigina maruz kalmaktan kaçinin
- Düzenli kontrollere gelin',

  'Post-beard transplant care:
- Do not touch the transplant area for the first 3 days
- Do not shave for 2 weeks
- Use the shampoo and products recommended by your doctor
- Avoid exposure to direct sunlight
- Come for regular check-ups',

  'Уход после пересадки бороды:
- Не трогайте область трансплантации в течение первых 3 дней
- Не бритье в течение 2 недель
- Используйте шампунь и продукты, рекомендованные вашим врачом
- Избегайте воздействия прямых солнечных лучей
- Приходите на регулярные проверки',

  'წვერის გადანერგვის შემდგომი მოვლა:
- არ შეეხოთ გადანერგვის უბანს პირველი 3 დღის განმავლობაში
- არ გაიპარსოთ 2 კვირის განმავლობაში
- გამოიყენეთ თქვენი ექიმის მიერ რეკომენდებული შამპუნი და პროდუქტები
- თავი აარიდეთ პირდაპირი მზის სხივების ზემოქმედებას
- მოდით რეგულარული შემოწმებისთვის',

  '/images/services/beard-transplant.jpg',
  1000,
  '3-5 saat',
  TRUE
),
-- Kaş Ekimi
(
  'kas-ekimi',
  'Kaş Ekimi', 'Eyebrow Transplant', 'Трансплантация бровей', 'წარბების გადანერგვა',
  'Seyrek ve sekilsiz kaslar için kalici çözüm sunan kas ekimi uygulamalari.', 
  'Eyebrow transplant applications that offer a permanent solution for sparse and shapeless eyebrows.', 
  'Применение трансплантации бровей, предлагающее постоянное решение для редких и бесформенных бровей.', 
  'წარბების გადანერგვის პროცედურები, რომლებიც გთავაზობთ მუდმივ გადაწყვეტილებას მეჩხერი და უფორმო წარბებისთვის.',
  
  'Kas ekimi, genetik faktörler, asiri epilasyon veya yaralanmalar sonucu kas bölgesinde seyreklesen ve sekil bozukluklari yasayan kisiler için uygulanan bir islemdir. Saç ekimine benzer bir teknikle, kisinin kendi saç köklerinin kas bölgesine nakledilmesiyle gerçeklestirilir. Bu islem sayesinde dogal görünümlü, kalici ve dolgun kaslar elde edilir.', 
  
  'Eyebrow transplantation is a procedure applied to people who experience thinning and deformation in the eyebrow area due to genetic factors, excessive epilation, or injuries. With a technique similar to hair transplantation, it is performed by transplanting the person\'s own hair follicles to the eyebrow area. Thanks to this procedure, natural-looking, permanent, and full eyebrows are obtained.',
  
  'Трансплантация бровей — это процедура, применяемая к людям, которые испытывают истончение и деформацию в области бровей из-за генетических факторов, чрезмерной эпиляции или травм. По методике, подобной трансплантации волос, она выполняется путем пересадки собственных волосяных фолликулов человека в область бровей. Благодаря этой процедуре получаются естественно выглядящие, постоянные и полные брови.',
  
  'წარბების გადანერგვა არის პროცედურა, რომელიც გამოიყენება ადამიანებისთვის, რომლებიც განიცდიან გათხელებას და დეფორმაციას წარბების ზონაში გენეტიკური ფაქტორების, ჭარბი ეპილაციის ან დაზიანებების გამო. თმის გადანერგვის მსგავსი ტექნიკით, ის ხორციელდება ადამიანის საკუთარი თმის ფოლიკულების გადანერგვით წარბების ზონაში. ამ პროცედურის წყალობით მიიღება ბუნებრივი გარეგნობის, მუდმივი და სავსე წარბები.',
  
  '1. Konsültasyon: Kas yapiniz ve beklentileriniz degerlendirilir.
2. Planlama: Ideal kas sekli çizilir ve donör bölge belirlenir.
3. Anestezi: Lokal anestezi uygulanir.
4. Greft Toplama: Basin arka kismindan ince saç kökleri alinir.
5. Kanal Açma: Kas bölgesinde mikro kanallar açilir.
6. Yerlestirme: Greftler bu kanallara yerlestirilir.
7. Tamamlama: Islem sonrasi bakim talimatlari verilir.',

  '1. Consultation: Your eyebrow structure and expectations are evaluated.
2. Planning: The ideal eyebrow shape is drawn and the donor area is determined.
3. Anesthesia: Local anesthesia is applied.
4. Graft Collection: Fine hair follicles are taken from the back of the head.
5. Channel Opening: Micro channels are opened in the eyebrow area.
6. Placement: Grafts are placed in these channels.
7. Completion: Post-procedure care instructions are provided.',

  '1. Консультация: Оценивается структура ваших бровей и ожидания.
2. Планирование: Рисуется идеальная форма бровей и определяется донорская зона.
3. Анестезия: Применяется местная анестезия.
4. Сбор графтов: С задней части головы берутся тонкие волосяные фолликулы.
5. Открытие каналов: В области бровей открываются микроканалы.
6. Размещение: Графты размещаются в этих каналах.
7. Завершение: Предоставляются инструкции по уходу после процедуры.',

  '1. კონსულტაცია: ფასდება თქვენი წარბების სტრუქტურა და მოლოდინები.
2. დაგეგმვა: იხაზება იდეალური წარბების ფორმა და განისაზღვრება დონორის ზონა.
3. ანესთეზია: გამოიყენება ლოკალური ანესთეზია.
4. გრაფტების შეგროვება: თხელი თმის ფოლიკულები აღებულია თავის უკანა ნაწილიდან.
5. არხების გახსნა: წარბების ზონაში იხსნება მიკროარხები.
6. განთავსება: გრაფტები თავსდება ამ არხებში.
7. დასრულება: წარმოდგენილია პროცედურის შემდგომი მოვლის ინსტრუქციები.',

  'Kas ekimi için ideal adaylar:
- Seyrek veya sekilsiz kaslari olanlar
- Kas alopesisi olanlar
- Yaralanma veya yanik sonucu kas kaybi yasayanlar
- Genel saglik durumu iyi olanlar
- Gerçekçi beklentileri olanlar',

  'Ideal candidates for eyebrow transplantation:
- Those with sparse or shapeless eyebrows
- Those with eyebrow alopecia
- Those who have lost eyebrows due to injury or burns
- Those in good general health
- Those with realistic expectations',

  'Идеальные кандидаты для трансплантации бровей:
- Те, у кого редкие или бесформенные брови
- Те, у кого алопеция бровей
- Те, кто потерял брови из-за травмы или ожогов
- Те, кто в хорошем общем состоянии здоровья
- Те, у кого реалистичные ожидания',

  'იდეალური კანდიდატები წარბების გადანერგვისთვის:
- ისინი, ვისაც აქვთ მეჩხერი ან უფორმო წარბები
- ისინი, ვისაც აქვთ წარბების ალოპეცია
- ისინი, ვინც დაკარგეს წარბები დაზიანების ან დამწვრობის გამო
- ისინი, ვინც კარგ ზოგად ჯანმრთელობაში არიან
- ისინი, ვისაც აქვთ რეალისტური მოლოდინები',

  'Kas ekimi sonrasi bakim:
- Ilk 3 gün boyunca nakil bölgesine dokunmayin
- 2 hafta boyunca kaslarinizi yikamayin
- Doktorunuzun önerdigi ürünleri kullanin
- Direkt günes isigina maruz kalmaktan kaçinin
- Düzenli kontrollere gelin',

  'Post-eyebrow transplant care:
- Do not touch the transplant area for the first 3 days
- Do not wash your eyebrows for 2 weeks
- Use the products recommended by your doctor
- Avoid exposure to direct sunlight
- Come for regular check-ups',

  'Уход после трансплантации бровей:
- Не трогайте область трансплантации в течение первых 3 дней
- Не мойте брови в течение 2 недель
- Используйте продукты, рекомендованные вашим врачом
- Избегайте воздействия прямых солнечных лучей
- Приходите на регулярные проверки',

  'წარბების გადანერგვის შემდგომი მოვლა:
- არ შეეხოთ გადანერგვის უბანს პირველი 3 დღის განმავლობაში
- არ დაიბანოთ წარბები 2 კვირის განმავლობაში
- გამოიყენეთ თქვენი ექიმის მიერ რეკომენდებული პროდუქტები
- თავი აარიდეთ პირდაპირი მზის სხივების ზემოქმედებას
- მოდით რეგულარული შემოწმებისთვის',

  '/images/services/eyebrow-transplant.jpg',
  800,
  '2-3 saat',
  TRUE
); 