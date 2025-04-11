import { Request, Response } from "express";
import { storage } from "../storage";
import { InsertBlogPost } from "@shared/schema";

export async function seedBlogPosts(req: Request, res: Response) {
  try {
    // Önce mevcut blog gönderilerini kontrol edin
    const existingPosts = await storage.getBlogPosts();
    
    if (existingPosts.length > 0) {
      return res.status(400).json({ 
        message: "Blog posts already exist. Clear them first if you want to reseed.",
        count: existingPosts.length 
      });
    }

    // Örnek blog gönderileri
    const blogPosts: InsertBlogPost[] = [
      {
        slug: "fue-vs-dhi-differences",
        titleTR: "FUE ve DHI Saç Ekimi Teknikleri Arasındaki Farklar",
        titleEN: "Differences Between FUE and DHI Hair Transplantation Techniques",
        titleRU: "Различия между методами трансплантации волос FUE и DHI",
        titleKA: "განსხვავებები FUE და DHI თმის გადანერგვის ტექნიკებს შორის",
        summaryTR: "Saç ekimi tekniklerinden FUE ve DHI arasındaki farkları, avantajları ve dezavantajları keşfedin.",
        summaryEN: "Discover the differences, advantages, and disadvantages between FUE and DHI hair transplantation techniques.",
        summaryRU: "Откройте для себя различия, преимущества и недостатки методов трансплантации волос FUE и DHI.",
        summaryKA: "აღმოაჩინეთ განსხვავებები, უპირატესობები და ნაკლოვანებები FUE და DHI თმის გადანერგვის ტექნიკებს შორის.",
        contentTR: "<h2>FUE Tekniği Nedir?</h2><p>FUE (Follicular Unit Extraction) tekniği, saç köklerinin tek tek alınıp nakledildiği yöntemdir. Mikrocerrahi aletler yardımıyla ense ve yan bölgelerden alınan saç kökleri, saçsız bölgelere yerleştirilir.</p><h2>DHI Tekniği Nedir?</h2><p>DHI (Direct Hair Implantation) tekniğinde ise özel Choi kalemleri kullanılarak saç kökleri direkt olarak saçsız bölgeye nakledilir. Kanal açma işlemi yoktur.</p><h2>Hangi Teknik Daha İyi?</h2><p>Her iki tekniğin de kendine göre avantajları vardır. DHI daha az travmatik ve iyileşme süresi kısadır, FUE ise daha geniş alanlara nakil yapabilme imkanı sunar.</p>",
        contentEN: "<h2>What is the FUE Technique?</h2><p>FUE (Follicular Unit Extraction) is a method where hair follicles are extracted one by one and transplanted. Hair follicles taken from the nape and side areas with microsurgical tools are placed in bald areas.</p><h2>What is the DHI Technique?</h2><p>In the DHI (Direct Hair Implantation) technique, hair follicles are directly transplanted to the bald area using special Choi pens. There is no channel opening process.</p><h2>Which Technique is Better?</h2><p>Both techniques have their own advantages. DHI is less traumatic and has a shorter recovery period, while FUE offers the possibility of transplanting to larger areas.</p>",
        contentRU: "<h2>Что такое метод FUE?</h2><p>FUE (Follicular Unit Extraction) — это метод, при котором волосяные фолликулы извлекаются один за другим и пересаживаются. Волосяные фолликулы, взятые из затылочной и боковых областей с помощью микрохирургических инструментов, помещаются в залысинах.</p><h2>Что такое техника DHI?</h2><p>В технике DHI (Direct Hair Implantation) волосяные фолликулы пересаживаются непосредственно в залысины с помощью специальных ручек Чой. Процесса открытия канала нет.</p><h2>Какая техника лучше?</h2><p>Обе техники имеют свои преимущества. DHI менее травматичен и имеет более короткий период восстановления, в то время как FUE предлагает возможность пересадки на большие площади.</p>",
        contentKA: "<h2>რა არის FUE ტექნიკა?</h2><p>FUE (Follicular Unit Extraction) არის მეთოდი, სადაც თმის ფოლიკულები ამოღებულია ერთი ერთზე და გადანერგილია. თხემისა და გვერდითი უბნებიდან მიკროქირურგიული ინსტრუმენტებით აღებული თმის ფოლიკულები თავსდება მელოტ უბნებში.</p><h2>რა არის DHI ტექნიკა?</h2><p>DHI (Direct Hair Implantation) ტექნიკაში, თმის ფოლიკულები პირდაპირ გადანერგილია მელოტ უბანში სპეციალური ჩოი კალმების გამოყენებით. არხის გახსნის პროცესი არ არის.</p><h2>რომელი ტექნიკაა უკეთესი?</h2><p>ორივე ტექნიკას აქვს საკუთარი უპირატესობები. DHI ნაკლებად ტრავმატულია და აქვს მოკლე აღდგენის პერიოდი, ხოლო FUE გთავაზობთ უფრო დიდ ფართობებზე გადანერგვის შესაძლებლობას.</p>",
        imageUrl: "/images/blog/fue-vs-dhi.jpg",
        category: "treatments",
        tags: "FUE,DHI,hair transplantation,techniques",
        author: "Dr. Mehmet Yılmaz",
        authorTitle: "Hair Transplant Specialist",
        authorAvatar: "/images/team/doctor-1.jpg",
        readingTime: 8,
        isFeatured: true,
        featuredOrder: 1,
        metaTitleTR: "FUE ve DHI Saç Ekimi Teknikleri Arasındaki Farklar | MyHair Clinic",
        metaTitleEN: "Differences Between FUE and DHI Hair Transplantation Techniques | MyHair Clinic",
        metaTitleRU: "Различия между методами трансплантации волос FUE и DHI | MyHair Clinic",
        metaTitleKA: "განსხვავებები FUE და DHI თმის გადანერგვის ტექნიკებს შორის | MyHair Clinic",
        metaDescriptionTR: "Saç ekimi tekniklerinden FUE ve DHI arasındaki farkları, avantajları ve dezavantajları öğrenin. Hangi teknik sizin için daha uygun olabilir?",
        metaDescriptionEN: "Learn about the differences, advantages, and disadvantages between FUE and DHI hair transplantation techniques. Which technique might be more suitable for you?",
        metaDescriptionRU: "Узнайте о различиях, преимуществах и недостатках между методами трансплантации волос FUE и DHI. Какая техника может быть более подходящей для вас?",
        metaDescriptionKA: "შეისწავლეთ განსხვავებები, უპირატესობები და ნაკლოვანებები FUE და DHI თმის გადანერგვის ტექნიკებს შორის. რომელი ტექნიკა შეიძლება იყოს უფრო შესაფერისი თქვენთვის?",
      },
      {
        slug: "post-hair-transplant-care",
        titleTR: "Saç Ekimi Sonrası Bakım Kılavuzu",
        titleEN: "Post-Hair Transplant Care Guide",
        titleRU: "Руководство по уходу после трансплантации волос",
        titleKA: "თმის გადანერგვის შემდგომი მოვლის გზამკვლევი",
        summaryTR: "Saç ekimi sonrası en iyi sonuçları elde etmek için yapmanız ve yapmamanız gerekenler.",
        summaryEN: "What to do and what not to do for best results after a hair transplant.",
        summaryRU: "Что делать и чего не делать для достижения наилучших результатов после трансплантации волос.",
        summaryKA: "რა უნდა გააკეთოთ და რა არ უნდა გააკეთოთ საუკეთესო შედეგებისთვის თმის გადანერგვის შემდეგ.",
        contentTR: "<h2>İlk 24 Saat</h2><p>Operasyon sonrası ilk 24 saat kritik önem taşır. Bu süre zarfında yatarken başınızı hafif yüksek tutacak şekilde pozisyonlayın ve kesinlikle nakil bölgesine dokunmayın.</p><h2>İlk Hafta</h2><p>İlk hafta boyunca şapka, bere gibi aksesuarlar kullanmayın. Doktorunuzun önerdiği özel şampuan dışında herhangi bir saç bakım ürünü kullanmayın. Spor ve ağır fiziksel aktivitelerden kaçının.</p><h2>İlk Ay</h2><p>İlk ay boyunca saçlarınızı boyamayın ve direkt güneş ışığından koruyun. Sauna, hamam, jakuzi gibi yerlerden uzak durun.</p><h2>Uzun Vadeli Bakım</h2><p>Sağlıklı bir diyet, düzenli egzersiz ve stresten uzak durmak nakledilen saç köklerinin sağlığı için önemlidir. Vitamin takviyesi de düşünülebilir.</p>",
        contentEN: "<h2>First 24 Hours</h2><p>The first 24 hours after the operation are critical. During this time, position your head slightly elevated when lying down and absolutely do not touch the transplanted area.</p><h2>First Week</h2><p>Do not use accessories like hats or caps during the first week. Do not use any hair care products other than the special shampoo recommended by your doctor. Avoid sports and heavy physical activities.</p><h2>First Month</h2><p>Do not dye your hair during the first month and protect it from direct sunlight. Stay away from places like saunas, steam rooms, and jacuzzis.</p><h2>Long-Term Care</h2><p>A healthy diet, regular exercise, and avoiding stress are important for the health of the transplanted hair follicles. Vitamin supplements can also be considered.</p>",
        contentRU: "<h2>Первые 24 часа</h2><p>Первые 24 часа после операции имеют решающее значение. В это время держите голову слегка приподнятой, когда лежите, и абсолютно не трогайте пересаженную область.</p><h2>Первая неделя</h2><p>Не используйте аксессуары, такие как шляпы или кепки, в течение первой недели. Не используйте никакие средства по уходу за волосами, кроме специального шампуня, рекомендованного вашим врачом. Избегайте спорта и тяжелых физических нагрузок.</p><h2>Первый месяц</h2><p>Не красьте волосы в течение первого месяца и защищайте их от прямых солнечных лучей. Держитесь подальше от таких мест, как сауны, парные и джакузи.</p><h2>Долгосрочный уход</h2><p>Здоровая диета, регулярные физические упражнения и избегание стресса важны для здоровья пересаженных волосяных фолликулов. Также можно рассмотреть прием витаминных добавок.</p>",
        contentKA: "<h2>პირველი 24 საათი</h2><p>ოპერაციის შემდეგ პირველი 24 საათი კრიტიკულად მნიშვნელოვანია. ამ დროს, დაწოლისას თავი ოდნავ აწეული გქონდეთ და არავითარ შემთხვევაში არ შეეხოთ გადანერგილ ადგილს.</p><h2>პირველი კვირა</h2><p>პირველი კვირის განმავლობაში არ გამოიყენოთ ისეთი აქსესუარები, როგორიცაა ქუდები ან კეპები. არ გამოიყენოთ თმის მოვლის პროდუქტები, გარდა ექიმის მიერ რეკომენდებული სპეციალური შამპუნისა. მოერიდეთ სპორტს და მძიმე ფიზიკურ აქტივობებს.</p><h2>პირველი თვე</h2><p>პირველი თვის განმავლობაში არ შეღებოთ თმა და დაიცავით ის პირდაპირი მზის სხივებისგან. თავი აარიდეთ ისეთ ადგილებს, როგორიცაა საუნა, ორთქლის ოთახები და ჯაკუზი.</p><h2>გრძელვადიანი მოვლა</h2><p>ჯანსაღი კვება, რეგულარული ვარჯიში და სტრესის თავიდან აცილება მნიშვნელოვანია გადანერგილი თმის ფოლიკულების ჯანმრთელობისთვის. ასევე შეიძლება განიხილოთ ვიტამინის დანამატები.</p>",
        imageUrl: "/images/blog/post-care.jpg",
        category: "aftercare",
        tags: "aftercare,hair washing,post-operation,recovery",
        author: "Dr. Ayşe Kaya",
        authorTitle: "Dermatologist",
        authorAvatar: "/images/team/doctor-2.jpg",
        readingTime: 10,
        isFeatured: true,
        featuredOrder: 2,
        metaTitleTR: "Saç Ekimi Sonrası Bakım: İyileşme Sürecini Hızlandıracak İpuçları | MyHair Clinic",
        metaTitleEN: "Post-Hair Transplant Care: Tips to Speed Up Recovery | MyHair Clinic",
        metaTitleRU: "Уход после трансплантации волос: советы для ускорения восстановления | MyHair Clinic",
        metaTitleKA: "თმის გადანერგვის შემდგომი მოვლა: რჩევები აღდგენის დასაჩქარებლად | MyHair Clinic",
        metaDescriptionTR: "Saç ekimi sonrası bakım rehberi: İyileşme sürecini hızlandırmak ve en iyi sonuçları elde etmek için yapmanız ve yapmamanız gerekenler.",
        metaDescriptionEN: "Post-hair transplant care guide: What to do and what not to do to speed up the healing process and achieve the best results.",
        metaDescriptionRU: "Руководство по уходу после трансплантации волос: что делать и чего не делать, чтобы ускорить процесс заживления и достичь наилучших результатов.",
        metaDescriptionKA: "თმის გადანერგვის შემდგომი მოვლის გზამკვლევი: რა უნდა გააკეთოთ და რა არ უნდა გააკეთოთ გამოჯანმრთელების პროცესის დასაჩქარებლად და საუკეთესო შედეგების მისაღწევად.",
      },
      {
        slug: "myths-about-hair-loss",
        titleTR: "Saç Dökülmesi Hakkında 5 Yaygın Mit",
        titleEN: "5 Common Myths About Hair Loss",
        titleRU: "5 распространенных мифов о выпадении волос",
        titleKA: "5 გავრცელებული მითი თმის ცვენის შესახებ",
        summaryTR: "Saç dökülmesi hakkında yaygın olarak inanılan ama gerçek olmayan 5 miti bilimsel gerçeklerle çürütüyoruz.",
        summaryEN: "We debunk 5 commonly believed myths about hair loss with scientific facts.",
        summaryRU: "Мы развенчиваем 5 широко распространенных мифов о выпадении волос с помощью научных фактов.",
        summaryKA: "ჩვენ ვამხელთ 5 ფართოდ გავრცელებულ მითს თმის ცვენის შესახებ სამეცნიერო ფაქტებით.",
        contentTR: "<h2>Mit 1: Saç Dökülmesi Sadece Erkeklerde Olur</h2><p>Gerçek: Saç dökülmesi hem erkeklerde hem de kadınlarda görülebilir. Kadınlarda genellikle saçın incelmesi şeklinde kendini gösterirken, erkeklerde belirli bölgelerde kellik olarak ortaya çıkar.</p><h2>Mit 2: Şapka Takmak Saç Dökülmesine Neden Olur</h2><p>Gerçek: Şapka takmak saç köklerine zarar vermez ve saç dökülmesine neden olmaz. Ancak çok sıkı şapkalar saçı çekebilir ve traksiyon alopesisine neden olabilir.</p><h2>Mit 3: Saçı Sık Yıkamak Dökülmeyi Arttırır</h2><p>Gerçek: Saçı yıkamak, zaten dökülmeye hazır olan saçların dökülmesini hızlandırabilir, ancak yeni dökülmelere neden olmaz. Aksine, temiz bir saç derisi saç sağlığı için önemlidir.</p><h2>Mit 4: Stres Tek Başına Kelliğe Neden Olur</h2><p>Gerçek: Şiddetli stres geçici saç dökülmesine (telogen effluvium) neden olabilirken, kalıcı kellik genellikle genetik faktörlerden kaynaklanır.</p><h2>Mit 5: Saç Bakım Ürünleri Saç Dökülmesini Durdurabilir</h2><p>Gerçek: Şampuan, saç kremi gibi normal saç bakım ürünleri saç dökülmesini durduramaz. Saç dökülmesi için Minoxidil, Finasteride gibi klinik olarak kanıtlanmış tedaviler gereklidir.</p>",
        contentEN: "<h2>Myth 1: Hair Loss Only Happens to Men</h2><p>Fact: Hair loss can occur in both men and women. While it often manifests as thinning hair in women, it appears as baldness in specific areas for men.</p><h2>Myth 2: Wearing Hats Causes Hair Loss</h2><p>Fact: Wearing hats does not damage hair follicles and does not cause hair loss. However, very tight hats can pull on hair and cause traction alopecia.</p><h2>Myth 3: Frequent Hair Washing Increases Hair Loss</h2><p>Fact: Washing hair may accelerate the shedding of hairs that were already ready to fall out, but it does not cause new hair loss. In fact, a clean scalp is important for hair health.</p><h2>Myth 4: Stress Alone Causes Baldness</h2><p>Fact: While severe stress can cause temporary hair loss (telogen effluvium), permanent baldness is usually due to genetic factors.</p><h2>Myth 5: Hair Care Products Can Stop Hair Loss</h2><p>Fact: Regular hair care products like shampoo and conditioner cannot stop hair loss. Clinically proven treatments like Minoxidil and Finasteride are needed for hair loss.</p>",
        contentRU: "<h2>Миф 1: Выпадение волос случается только у мужчин</h2><p>Факт: Выпадение волос может происходить как у мужчин, так и у женщин. В то время как у женщин это часто проявляется в виде истончения волос, у мужчин это проявляется в виде облысения в определенных областях.</p><h2>Миф 2: Ношение шляп вызывает выпадение волос</h2><p>Факт: Ношение шляп не повреждает волосяные фолликулы и не вызывает выпадение волос. Однако очень тесные шляпы могут тянуть волосы и вызывать тракционную алопецию.</p><h2>Миф 3: Частое мытье волос увеличивает выпадение волос</h2><p>Факт: Мытье волос может ускорить выпадение волос, которые уже были готовы выпасть, но не вызывает новое выпадение волос. На самом деле, чистая кожа головы важна для здоровья волос.</p><h2>Миф 4: Стресс сам по себе вызывает облысение</h2><p>Факт: В то время как сильный стресс может вызвать временное выпадение волос (телогеновый эффлювиум), постоянное облысение обычно связано с генетическими факторами.</p><h2>Миф 5: Средства по уходу за волосами могут остановить выпадение волос</h2><p>Факт: Обычные средства по уходу за волосами, такие как шампунь и кондиционер, не могут остановить выпадение волос. Для выпадения волос необходимы клинически проверенные методы лечения, такие как Миноксидил и Финастерид.</p>",
        contentKA: "<h2>მითი 1: თმის ცვენა მხოლოდ მამაკაცებს ემართებათ</h2><p>ფაქტი: თმის ცვენა შეიძლება მოხდეს როგორც მამაკაცებში, ისე ქალებში. ქალებში ეს ხშირად ვლინდება როგორც თმის გათხელება, ხოლო მამაკაცებში - როგორც სიმელოტე კონკრეტულ ადგილებში.</p><h2>მითი 2: ქუდების ტარება იწვევს თმის ცვენას</h2><p>ფაქტი: ქუდების ტარება არ აზიანებს თმის ფოლიკულებს და არ იწვევს თმის ცვენას. თუმცა, ძალიან მჭიდრო ქუდებმა შეიძლება გამოიწვიოს თმის გაჭიმვა და ტრაქციული ალოპეცია.</p><h2>მითი 3: ხშირი თმის დაბანა ზრდის თმის ცვენას</h2><p>ფაქტი: თმის დაბანამ შეიძლება დააჩქაროს იმ თმის ცვენა, რომელიც უკვე მზად იყო ცვენისთვის, მაგრამ ის არ იწვევს ახალ თმის ცვენას. ფაქტობრივად, სუფთა თავის კანი მნიშვნელოვანია თმის ჯანმრთელობისთვის.</p><h2>მითი 4: მხოლოდ სტრესი იწვევს სიმელოტეს</h2><p>ფაქტი: მაშინ როცა ძლიერმა სტრესმა შეიძლება გამოიწვიოს დროებითი თმის ცვენა (ტელოგენური ეფლუვიუმი), მუდმივი სიმელოტე ჩვეულებრივ გენეტიკური ფაქტორებით არის გამოწვეული.</p><h2>მითი 5: თმის მოვლის პროდუქტებს შეუძლიათ თმის ცვენის შეჩერება</h2><p>ფაქტი: ჩვეულებრივ თმის მოვლის პროდუქტებს, როგორიცაა შამპუნი და კონდიციონერი, არ შეუძლიათ შეაჩერონ თმის ცვენა. თმის ცვენისთვის საჭიროა კლინიკურად დამტკიცებული მკურნალობა, როგორიცაა მინოქსიდილი და ფინასტერიდი.</p>",
        imageUrl: "/images/blog/hair-loss-myths.jpg",
        category: "education",
        tags: "myths,hair loss,baldness,facts",
        author: "Dr. Ali Demir",
        authorTitle: "Trichologist",
        authorAvatar: "/images/team/doctor-3.jpg",
        readingTime: 7,
        isFeatured: true,
        featuredOrder: 3,
        metaTitleTR: "Saç Dökülmesi Hakkında 5 Yaygın Mit ve Gerçekler | MyHair Clinic",
        metaTitleEN: "5 Common Myths About Hair Loss and the Facts | MyHair Clinic",
        metaTitleRU: "5 распространенных мифов о выпадении волос и факты | MyHair Clinic",
        metaTitleKA: "5 გავრცელებული მითი თმის ცვენის შესახებ და ფაქტები | MyHair Clinic",
        metaDescriptionTR: "Saç dökülmesi hakkında yaygın olarak inanılan ama gerçek olmayan mitleri bilimsel gerçeklerle öğrenin.",
        metaDescriptionEN: "Learn about commonly believed myths about hair loss and the scientific facts that debunk them.",
        metaDescriptionRU: "Узнайте о распространенных мифах о выпадении волос и научных фактах, которые их опровергают.",
        metaDescriptionKA: "შეისწავლეთ ფართოდ გავრცელებული მითები თმის ცვენის შესახებ და სამეცნიერო ფაქტები, რომლებიც მათ ამხელენ.",
      },
      {
        slug: "medical-tourism-in-georgia",
        titleTR: "Gürcistan'da Saç Ekimi ve Tıp Turizmi",
        titleEN: "Hair Transplants and Medical Tourism in Georgia",
        titleRU: "Трансплантация волос и медицинский туризм в Грузии",
        titleKA: "თმის გადანერგვა და სამედიცინო ტურიზმი საქართველოში",
        summaryTR: "Gürcistan'ın neden saç ekimi ve tıp turizmi için giderek popüler bir destinasyon haline geldiğini keşfedin.",
        summaryEN: "Discover why Georgia is becoming an increasingly popular destination for hair transplants and medical tourism.",
        summaryRU: "Узнайте, почему Грузия становится все более популярным направлением для трансплантации волос и медицинского туризма.",
        summaryKA: "აღმოაჩინეთ, თუ რატომ ხდება საქართველო სულ უფრო პოპულარული დანიშნულების ადგილი თმის გადანერგვისა და სამედიცინო ტურიზმისთვის.",
        contentTR: "<h2>Gürcistan'da Tıp Turizmi</h2><p>Son yıllarda Gürcistan, kaliteli sağlık hizmetleri, uygun fiyatlar ve benzersiz turistik deneyimler sunan bir tıp turizmi merkezi olarak öne çıkmıştır. Özellikle saç ekimi alanında dünya standartlarında hizmet veren klinikler bulunmaktadır.</p><h2>Neden Gürcistan'da Saç Ekimi?</h2><p>Gürcistan'da saç ekimi tercih etmenin birçok avantajı vardır: Avrupa standartlarında hizmet, önemli ölçüde düşük maliyetler, kalifiye doktorlar ve modern teknoloji. Ayrıca Türkiye, Rusya, Azerbaycan gibi komşu ülkelerden kolay ulaşım sağlanabilmektedir.</p><h2>Tiflis'te Tatil ve Tedavi</h2><p>Saç ekimi için Tiflis'e gelen hastalar, operasyon dışındaki zamanlarda şehrin zengin kültürünü, lezzetli mutfağını ve doğal güzelliklerini keşfetme şansına sahiptir. Eski Şehir, Narikala Kalesi, kaplıcalar ve şarap turları popüler aktiviteler arasındadır.</p><h2>Prosedür ve İyileşme</h2><p>Operasyon genellikle 6-8 saat sürer ve lokal anestezi altında gerçekleştirilir. İyileşme süreci için Tiflis'te 3-5 gün kalmak yeterlidir. Bu süre zarfında doktorunuz gerekli kontrolleri yapacak ve eve dönüş için onay verecektir.</p>",
        contentEN: "<h2>Medical Tourism in Georgia</h2><p>In recent years, Georgia has emerged as a medical tourism hub offering quality healthcare services, affordable prices, and unique tourist experiences. It particularly has world-class clinics specializing in hair transplantation.</p><h2>Why Choose Hair Transplantation in Georgia?</h2><p>There are many advantages to choosing hair transplantation in Georgia: European standard service, significantly lower costs, qualified doctors, and modern technology. There is also easy access from neighboring countries like Turkey, Russia, and Azerbaijan.</p><h2>Vacation and Treatment in Tbilisi</h2><p>Patients who come to Tbilisi for hair transplantation have the chance to explore the city's rich culture, delicious cuisine, and natural beauty in their free time. The Old Town, Narikala Fortress, thermal baths, and wine tours are among the popular activities.</p><h2>Procedure and Recovery</h2><p>The operation usually takes 6-8 hours and is performed under local anesthesia. Staying in Tbilisi for 3-5 days is sufficient for the recovery process. During this time, your doctor will perform the necessary checks and approve your return home.</p>",
        contentRU: "<h2>Медицинский туризм в Грузии</h2><p>В последние годы Грузия стала центром медицинского туризма, предлагающим качественные медицинские услуги, доступные цены и уникальный туристический опыт. В частности, здесь есть клиники мирового класса, специализирующиеся на трансплантации волос.</p><h2>Почему стоит выбрать трансплантацию волос в Грузии?</h2><p>Выбор трансплантации волос в Грузии имеет много преимуществ: сервис европейского стандарта, значительно более низкие затраты, квалифицированные врачи и современные технологии. Также есть легкий доступ из соседних стран, таких как Турция, Россия и Азербайджан.</p><h2>Отдых и лечение в Тбилиси</h2><p>Пациенты, которые приезжают в Тбилиси для трансплантации волос, имеют возможность в свободное время познакомиться с богатой культурой города, вкусной кухней и природной красотой. Старый город, крепость Нарикала, термальные ванны и винные туры входят в число популярных мероприятий.</p><h2>Процедура и восстановление</h2><p>Операция обычно занимает 6-8 часов и проводится под местной анестезией. Для процесса восстановления достаточно остаться в Тбилиси на 3-5 дней. В течение этого времени ваш врач проведет необходимые проверки и одобрит ваше возвращение домой.</p>",
        contentKA: "<h2>სამედიცინო ტურიზმი საქართველოში</h2><p>ბოლო წლებში საქართველო გამოჩნდა როგორც სამედიცინო ტურიზმის ცენტრი, რომელიც გთავაზობთ ხარისხიან ჯანდაცვის მომსახურებას, ხელმისაწვდომ ფასებს და უნიკალურ ტურისტულ გამოცდილებას. განსაკუთრებით მას აქვს მსოფლიო კლასის კლინიკები, რომლებიც სპეციალიზირებულია თმის გადანერგვაში.</p><h2>რატომ უნდა აირჩიოთ თმის გადანერგვა საქართველოში?</h2><p>საქართველოში თმის გადანერგვის არჩევას ბევრი უპირატესობა აქვს: ევროპული სტანდარტის მომსახურება, მნიშვნელოვნად დაბალი ხარჯები, კვალიფიციური ექიმები და თანამედროვე ტექნოლოგია. ასევე არსებობს ადვილი მისასვლელი მეზობელი ქვეყნებიდან, როგორიცაა თურქეთი, რუსეთი და აზერბაიჯანი.</p><h2>დასვენება და მკურნალობა თბილისში</h2><p>პაციენტებს, რომლებიც ჩამოდიან თბილისში თმის გადანერგვისთვის, აქვთ შანსი შეისწავლონ ქალაქის მდიდარი კულტურა, გემრიელი სამზარეულო და ბუნებრივი სილამაზე თავიანთ თავისუფალ დროს. ძველი ქალაქი, ნარიყალას ციხე, თერმული აბანოები და ღვინის ტურები პოპულარულ აქტივობებს შორისაა.</p><h2>პროცედურა და აღდგენა</h2><p>ოპერაცია ჩვეულებრივ გრძელდება 6-8 საათს და ტარდება ადგილობრივი ანესთეზიის ქვეშ. აღდგენის პროცესისთვის საკმარისია თბილისში 3-5 დღით დარჩენა. ამ დროის განმავლობაში, თქვენი ექიმი ჩაატარებს საჭირო შემოწმებებს და დაამტკიცებს თქვენს დაბრუნებას სახლში.</p>",
        imageUrl: "/images/blog/georgia-medical-tourism.jpg",
        category: "travel",
        tags: "Georgia,Tbilisi,medical tourism,travel",
        author: "Nina Japaridze",
        authorTitle: "Travel Specialist",
        authorAvatar: "/images/team/specialist-1.jpg",
        readingTime: 9,
        isFeatured: false,
        metaTitleTR: "Gürcistan'da Saç Ekimi ve Tıp Turizmi: Tiflis'te Saç Ekimi Rehberi | MyHair Clinic",
        metaTitleEN: "Hair Transplants and Medical Tourism in Georgia: A Guide to Hair Transplantation in Tbilisi | MyHair Clinic",
        metaTitleRU: "Трансплантация волос и медицинский туризм в Грузии: Руководство по трансплантации волос в Тбилиси | MyHair Clinic",
        metaTitleKA: "თმის გადანერგვა და სამედიცინო ტურიზმი საქართველოში: გზამკვლევი თმის გადანერგვისთვის თბილისში | MyHair Clinic",
        metaDescriptionTR: "Gürcistan'da saç ekimi, tıp turizmi ve Tiflis'te tatil rehberi. Kaliteli ve uygun fiyatlı saç ekimi için Gürcistan'ı tercih etmenin avantajları.",
        metaDescriptionEN: "A guide to hair transplantation, medical tourism, and vacationing in Georgia. Advantages of choosing Georgia for quality and affordable hair transplantation.",
        metaDescriptionRU: "Руководство по трансплантации волос, медицинскому туризму и отдыху в Грузии. Преимущества выбора Грузии для качественной и доступной трансплантации волос.",
        metaDescriptionKA: "გზამკვლევი თმის გადანერგვისთვის, სამედიცინო ტურიზმისთვის და დასვენებისთვის საქართველოში. უპირატესობები საქართველოს არჩევისას ხარისხიანი და ხელმისაწვდომი თმის გადანერგვისთვის.",
      },
      {
        slug: "nutrition-for-healthy-hair",
        titleTR: "Sağlıklı Saçlar İçin Beslenme Rehberi",
        titleEN: "Nutrition Guide for Healthy Hair",
        titleRU: "Руководство по питанию для здоровых волос",
        titleKA: "კვების გზამკვლევი ჯანსაღი თმისთვის",
        summaryTR: "Saç sağlığınızı iyileştiren ve saç dökülmesini azaltan yiyecekler ve besinler hakkında bilmeniz gerekenler.",
        summaryEN: "What you need to know about foods and nutrients that improve hair health and reduce hair loss.",
        summaryRU: "Что вам нужно знать о продуктах и питательных веществах, которые улучшают здоровье волос и уменьшают выпадение волос.",
        summaryKA: "რა უნდა იცოდეთ საკვებისა და საკვები ნივთიერებების შესახებ, რომლებიც აუმჯობესებენ თმის ჯანმრთელობას და ამცირებენ თმის ცვენას.",
        contentTR: "<h2>Protein</h2><p>Saçlar keratin adı verilen bir proteinden oluşur. Bu nedenle, diyetinizde yeterli protein olması saç sağlığı için çok önemlidir. Et, balık, yumurta, baklagiller ve fındık gibi gıdalar mükemmel protein kaynaklarıdır.</p><h2>Omega-3 Yağ Asitleri</h2><p>Somon, chia tohumu ve keten tohumu gibi omega-3 açısından zengin gıdalar, saç foliküllerini besler ve saç büyümesini destekler. Ayrıca saç derisini nemlendirmeye ve iltihabı azaltmaya yardımcı olurlar.</p><h2>Demir</h2><p>Demir eksikliği, saç dökülmesinin yaygın bir nedenidir. Kırmızı et, ıspanak ve mercimek gibi demir açısından zengin gıdalar tüketmek, saç hücrelerinin sağlıklı büyümesi için gerekli oksijen taşınımını destekler.</p><h2>A, C ve E Vitaminleri</h2><p>Bu vitaminler güçlü antioksidanlardır ve saç foliküllerine zarar verebilecek serbest radikalleri nötralize ederler. Havuç, portakal ve fındık gibi besinlerden alınabilirler.</p><h2>Çinko</h2><p>Çinko, yağ bezlerinin düzgün çalışmasına yardımcı olur ve saç dökülmesini önleyebilir. İstiridye, kırmızı et ve kabak çekirdeği iyi çinko kaynaklarıdır.</p><h2>Biyotin (B7 Vitamini)</h2><p>Biyotin, saç, cilt ve tırnak sağlığı için önemli bir vitamindir. Yumurta sarısı, fındık ve avokado gibi gıdalardan bulunabilir.</p>",
        contentEN: "<h2>Protein</h2><p>Hair is made of a protein called keratin. Therefore, having enough protein in your diet is crucial for hair health. Foods like meat, fish, eggs, legumes, and nuts are excellent sources of protein.</p><h2>Omega-3 Fatty Acids</h2><p>Foods rich in omega-3 such as salmon, chia seeds, and flaxseeds nourish hair follicles and support hair growth. They also help moisturize the scalp and reduce inflammation.</p><h2>Iron</h2><p>Iron deficiency is a common cause of hair loss. Consuming iron-rich foods like red meat, spinach, and lentils supports the transportation of oxygen necessary for the healthy growth of hair cells.</p><h2>Vitamins A, C, and E</h2><p>These vitamins are powerful antioxidants and neutralize free radicals that can damage hair follicles. They can be obtained from foods like carrots, oranges, and nuts.</p><h2>Zinc</h2><p>Zinc helps sebaceous glands work properly and can prevent hair loss. Oysters, red meat, and pumpkin seeds are good sources of zinc.</p><h2>Biotin (Vitamin B7)</h2><p>Biotin is an important vitamin for hair, skin, and nail health. It can be found in foods like egg yolks, nuts, and avocados.</p>",
        contentRU: "<h2>Белок</h2><p>Волосы состоят из белка, называемого кератином. Поэтому наличие достаточного количества белка в рационе имеет решающее значение для здоровья волос. Продукты, такие как мясо, рыба, яйца, бобовые и орехи, являются отличными источниками белка.</p><h2>Жирные кислоты Омега-3</h2><p>Продукты, богатые омега-3, такие как лосось, семена чиа и семена льна, питают волосяные фолликулы и поддерживают рост волос. Они также помогают увлажнить кожу головы и уменьшить воспаление.</p><h2>Железо</h2><p>Дефицит железа является распространенной причиной выпадения волос. Употребление богатых железом продуктов, таких как красное мясо, шпинат и чечевица, поддерживает транспортировку кислорода, необходимого для здорового роста клеток волос.</p><h2>Витамины A, C и E</h2><p>Эти витамины являются мощными антиоксидантами и нейтрализуют свободные радикалы, которые могут повредить волосяные фолликулы. Их можно получить из таких продуктов, как морковь, апельсины и орехи.</p><h2>Цинк</h2><p>Цинк помогает сальным железам работать должным образом и может предотвратить выпадение волос. Устрицы, красное мясо и тыквенные семечки являются хорошими источниками цинка.</p><h2>Биотин (витамин B7)</h2><p>Биотин — важный витамин для здоровья волос, кожи и ногтей. Его можно найти в таких продуктах, как яичные желтки, орехи и авокадо.</p>",
        contentKA: "<h2>ცილა</h2><p>თმა შედგება ცილისგან, რომელსაც კერატინი ჰქვია. ამიტომ, თქვენს რაციონში საკმარისი ცილის ქონა გადამწყვეტია თმის ჯანმრთელობისთვის. საკვები, როგორიცაა ხორცი, თევზი, კვერცხი, პარკოსნები და თხილი, ცილის შესანიშნავი წყაროა.</p><h2>ომეგა-3 ცხიმოვანი მჟავები</h2><p>ომეგა-3-ით მდიდარი საკვები, როგორიცაა ორაგული, ჩია და სელის თესლი, კვებავს თმის ფოლიკულებს და ხელს უწყობს თმის ზრდას. ისინი ასევე ეხმარებიან თავის კანის დატენიანებას და ანთების შემცირებას.</p><h2>რკინა</h2><p>რკინის დეფიციტი თმის ცვენის ხშირი მიზეზია. რკინით მდიდარი საკვების მოხმარება, როგორიცაა წითელი ხორცი, ისპანახი და ოსპი, ხელს უწყობს ჟანგბადის ტრანსპორტირებას, რაც აუცილებელია თმის უჯრედების ჯანსაღი ზრდისთვის.</p><h2>ვიტამინები A, C და E</h2><p>ეს ვიტამინები ძლიერი ანტიოქსიდანტებია და ანეიტრალებენ თავისუფალ რადიკალებს, რომლებსაც შეუძლიათ დააზიანონ თმის ფოლიკულები. ისინი შეიძლება მიღებულ იქნას ისეთი საკვებიდან, როგორიცაა სტაფილო, ფორთოხალი და თხილი.</p><h2>თუთია</h2><p>თუთია ეხმარება ცხიმოვან ჯირკვლებს სწორად მუშაობაში და შეუძლია თავიდან აიცილოს თმის ცვენა. ხამანწკები, წითელი ხორცი და გოგრის თესლები თუთიის კარგი წყაროა.</p><h2>ბიოტინი (ვიტამინი B7)</h2><p>ბიოტინი მნიშვნელოვანი ვიტამინია თმის, კანის და ფრჩხილების ჯანმრთელობისთვის. ის შეიძლება მოიძებნოს ისეთ საკვებში, როგორიცაა კვერცხის გული, თხილი და ავოკადო.</p>",
        imageUrl: "/images/blog/hair-nutrition.jpg",
        category: "education",
        tags: "nutrition,diet,hair health,vitamins",
        author: "Dr. Zeynep Yıldız",
        authorTitle: "Nutritionist",
        authorAvatar: "/images/team/doctor-4.jpg",
        readingTime: 6,
        isFeatured: false,
        metaTitleTR: "Sağlıklı Saçlar İçin Beslenme Rehberi: En İyi Saç Dostu Besinler | MyHair Clinic",
        metaTitleEN: "Nutrition Guide for Healthy Hair: The Best Hair-Friendly Foods | MyHair Clinic",
        metaTitleRU: "Руководство по питанию для здоровых волос: лучшие продукты для волос | MyHair Clinic",
        metaTitleKA: "კვების გზამკვლევი ჯანსაღი თმისთვის: საუკეთესო თმის მეგობრული საკვები | MyHair Clinic",
        metaDescriptionTR: "Saç sağlığını iyileştiren ve saç dökülmesini azaltan gıdalar ve besinler hakkında kapsamlı beslenme rehberi.",
        metaDescriptionEN: "Comprehensive nutrition guide about foods and nutrients that improve hair health and reduce hair loss.",
        metaDescriptionRU: "Комплексное руководство по питанию о продуктах и питательных веществах, которые улучшают здоровье волос и уменьшают их выпадение.",
        metaDescriptionKA: "ყოვლისმომცველი კვების გზამკვლევი საკვებისა და საკვები ნივთიერებების შესახებ, რომლებიც აუმჯობესებენ თმის ჯანმრთელობას და ამცირებენ თმის ცვენას.",
      }
    ];

    // Blog gönderilerini tek tek ekleyin
    for (const post of blogPosts) {
      await storage.createBlogPost(post);
    }

    res.status(201).json({ 
      message: "Blog posts created successfully", 
      count: blogPosts.length 
    });
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    res.status(500).json({ message: "Failed to seed blog posts" });
  }
}