// CommonJS formatında direct database seed script
const { pool, db } = require('./server/db');
const { blogPosts } = require('./shared/schema');
const { randomUUID } = require('crypto');

async function seedUniqueBlogPosts() {
  try {
    console.log('Eski blog yazıları temizleniyor...');
    await db.delete(blogPosts);
    console.log('Eski blog yazıları temizlendi.');

    // Benzersiz blog yazıları koleksiyonu
    const uniqueBlogPosts = [
      // 1. Saç Ekimi İle İlgili Doğru Bilinen Yanlışlar
      {
        slug: "hair-transplant-myths-" + randomUUID().slice(0, 8),
        titleTR: "Saç Ekimi Hakkında Doğru Bilinen Yanlışlar",
        titleEN: "Common Myths About Hair Transplantation",
        titleRU: "Распространенные мифы о трансплантации волос",
        titleKA: "საერთო მითები თმის გადანერგვის შესახებ",
        summaryTR: "Saç ekimi hakkında yaygın olan yanlış bilgiler ve gerçekler. Bu makalede en sık duyulan mitleri çürütüyoruz.",
        summaryEN: "Common misconceptions and facts about hair transplantation. In this article, we debunk the most frequently heard myths.",
        summaryRU: "Распространенные заблуждения и факты о трансплантации волос. В этой статье мы развенчиваем наиболее часто встречающиеся мифы.",
        summaryKA: "გავრცელებული შეცდომები და ფაქტები თმის გადანერგვის შესახებ. ამ სტატიაში ჩვენ გავაქარწყლებთ ყველაზე ხშირად გავრცელებულ მითებს.",
        contentTR: "<h2>Mit 1: Saç Ekimi Ağrılı Bir İşlemdir</h2><p>Yaygın inanışın aksine, modern saç ekimi teknikleri oldukça konforludur. Lokal anestezi altında gerçekleştirilen işlem sırasında hasta ağrı hissetmez. İşlem sonrası hafif bir rahatsızlık olabilir ancak bu genellikle ağrı kesicilerle kontrol edilebilir.</p><h2>Mit 2: Ekilen Saçlar Doğal Görünmez</h2><p>Günümüz tekniklerinde ekilen saç kökleri, hastanın kendi saç çıkış açısı ve yönüne uygun şekilde nakledilir. Bu sayede son derece doğal görünümlü sonuçlar elde edilir. Doğallığı sağlayan en önemli faktör, cerrahın sanatsal bakış açısı ve tecrübesidir.</p><h2>Mit 3: Saç Ektirmek İçin Yaşlı Olmak Gerekir</h2><p>Saç ekimi için belirli bir yaş sınırı yoktur. Önemli olan, dökülme paterninin oturmuş olması ve gelecekteki dökülmelerin tahmin edilebilmesidir. Genellikle 25 yaş üstü erkeklerde dökülme paterni daha net görülebilir.</p><h2>Mit 4: Saç Ekimi Saç Dökülmesini Tamamen Durdurur</h2><p>Saç ekimi, mevcut saç dökülmesini tedavi etmez veya durdurmaz. Bu işlem dökülmüş bölgelere yeni saç kökleri nakletme işlemidir. Mevcut saç dökülmesinin devam etmemesi için ek medikal tedaviler gerekebilir.</p><h2>Mit 5: Ekilen Saçlar Zamanla Dökülür</h2><p>Doğru yapılmış bir saç ekiminde, nakledilen saç kökleri ense bölgesinden alındığı için dökülmeye dirençlidir. Bu kökler genetik olarak dökülmeye programlı değildir ve ömür boyu kalıcıdır.</p>",
        contentEN: "<h2>Myth 1: Hair Transplantation is a Painful Procedure</h2><p>Contrary to popular belief, modern hair transplantation techniques are quite comfortable. During the procedure performed under local anesthesia, the patient does not feel pain. There may be mild discomfort after the procedure, but this can usually be controlled with painkillers.</p><h2>Myth 2: Transplanted Hair Doesn't Look Natural</h2><p>In today's techniques, hair follicles are transplanted in accordance with the patient's own hair emergence angle and direction. This provides extremely natural-looking results. The most important factor that ensures naturalness is the surgeon's artistic perspective and experience.</p><h2>Myth 3: You Need to Be Old to Have Hair Transplantation</h2><p>There is no specific age limit for hair transplantation. What matters is that the pattern of hair loss has settled and future hair loss can be predicted. The pattern of hair loss can usually be seen more clearly in men over 25 years of age.</p><h2>Myth 4: Hair Transplantation Completely Stops Hair Loss</h2><p>Hair transplantation does not treat or stop existing hair loss. This procedure is the process of transplanting new hair follicles to areas that have lost hair. Additional medical treatments may be required to prevent existing hair loss from continuing.</p><h2>Myth 5: Transplanted Hair Falls Out Over Time</h2><p>In a properly performed hair transplant, the transplanted hair follicles are resistant to shedding because they are taken from the nape area. These roots are not genetically programmed to shed and are permanent for life.</p>",
        contentRU: "<h2>Миф 1: Трансплантация волос - болезненная процедура</h2><p>Вопреки распространенному мнению, современные методы трансплантации волос довольно комфортны. Во время процедуры, выполняемой под местной анестезией, пациент не чувствует боли. После процедуры может возникнуть легкий дискомфорт, но обычно его можно контролировать обезболивающими.</p><h2>Миф 2: Пересаженные волосы не выглядят естественно</h2><p>В современных техниках волосяные фолликулы пересаживаются в соответствии с углом и направлением роста собственных волос пациента. Это обеспечивает чрезвычайно естественный вид результатов. Наиболее важным фактором, обеспечивающим естественность, является художественная перспектива и опыт хирурга.</p><h2>Миф 3: Вам нужно быть старым, чтобы сделать трансплантацию волос</h2><p>Для трансплантации волос нет определенного возрастного ограничения. Важно то, что схема выпадения волос устоялась и можно предсказать будущее выпадение волос. Схема выпадения волос обычно более четко видна у мужчин старше 25 лет.</p><h2>Миф 4: Трансплантация волос полностью останавливает выпадение волос</h2><p>Трансплантация волос не лечит и не останавливает существующее выпадение волос. Эта процедура представляет собой процесс пересадки новых волосяных фолликулов в области, потерявшие волосы. Для предотвращения продолжения существующего выпадения волос могут потребоваться дополнительные медицинские процедуры.</p><h2>Миф 5: Пересаженные волосы со временем выпадают</h2><p>При правильно выполненной трансплантации волос пересаженные волосяные фолликулы устойчивы к выпадению, поскольку они взяты из области затылка. Эти корни генетически не запрограммированы на выпадение и постоянны на всю жизнь.</p>",
        contentKA: "<h2>მითი 1: თმის გადანერგვა მტკივნეული პროცედურაა</h2><p>საყოველთაოდ მიღებული აზრის საწინააღმდეგოდ, თმის გადანერგვის თანამედროვე ტექნიკები საკმაოდ კომფორტულია. ადგილობრივი ანესთეზიის ქვეშ ჩატარებული პროცედურის დროს პაციენტი ტკივილს არ გრძნობს. პროცედურის შემდეგ შეიძლება იყოს მსუბუქი დისკომფორტი, მაგრამ ეს ჩვეულებრივ შეიძლება გაკონტროლდეს ტკივილგამაყუჩებლებით.</p><h2>მითი 2: გადანერგილი თმა არ გამოიყურება ბუნებრივად</h2><p>დღევანდელ ტექნიკებში თმის ფოლიკულები გადანერგილია პაციენტის საკუთარი თმის გამოსვლის კუთხისა და მიმართულების შესაბამისად. ეს უზრუნველყოფს უკიდურესად ბუნებრივი იერსახის შედეგებს. ყველაზე მნიშვნელოვანი ფაქტორი, რომელიც უზრუნველყოფს ბუნებრიობას, არის ქირურგის მხატვრული პერსპექტივა და გამოცდილება.</p><h2>მითი 3: თმის გადანერგვისთვის უნდა იყოთ ხანდაზმული</h2><p>თმის გადანერგვისთვის არ არსებობს კონკრეტული ასაკობრივი ზღვარი. მნიშვნელოვანია, რომ თმის ცვენის ნიმუში დასრულებულია და მომავალი თმის ცვენის პროგნოზირება შესაძლებელია. თმის ცვენის ნიმუში ჩვეულებრივ უფრო მკაფიოდ ჩანს 25 წელზე უფროს მამაკაცებში.</p><h2>მითი 4: თმის გადანერგვა სრულიად აჩერებს თმის ცვენას</h2><p>თმის გადანერგვა არ მკურნალობს ან აჩერებს არსებულ თმის ცვენას. ეს პროცედურა არის ახალი თმის ფოლიკულების გადანერგვის პროცესი იმ ადგილებში, სადაც თმა დაკარგული აქვთ. არსებული თმის ცვენის გაგრძელების თავიდან ასაცილებლად შეიძლება დამატებითი სამედიცინო მკურნალობა იყოს საჭირო.</p><h2>მითი 5: გადანერგილი თმა დროთა განმავლობაში ცვივა</h2><p>სწორად შესრულებულ თმის გადანერგვაში გადანერგილი თმის ფოლიკულები მედეგია ცვენის მიმართ, რადგან ისინი აღებულია კისრის არიდან. ეს ფესვები გენეტიკურად არ არის დაპროგრამებული ცვენისთვის და მუდმივია მთელი ცხოვრების განმავლობაში.</p>",
        imageUrl: "/images/blog/hair-transplant-myths.jpg",
        category: "hair-transplant",
        tags: "myths,misconceptions,facts,hair loss,education",
        author: "Dr. Mehmet Yılmaz",
        authorTitle: "Hair Transplant Surgeon",
        authorAvatar: "/images/team/doctor-1.jpg",
        readingTime: 6,
        isFeatured: true,
        featuredOrder: 1,
        metaTitleTR: "Saç Ekimi Hakkında Yaygın Mitler ve Gerçekler | MyHair Clinic",
        metaTitleEN: "Common Myths and Facts About Hair Transplantation | MyHair Clinic",
        metaTitleRU: "Общие мифы и факты о трансплантации волос | MyHair Clinic",
        metaTitleKA: "საერთო მითები და ფაქტები თმის გადანერგვის შესახებ | MyHair Clinic",
        metaDescriptionTR: "Saç ekimi hakkında yaygın yanlış bilgileri ve gerçekleri öğrenin. Modern saç ekimi tekniklerinin ağrısız ve doğal sonuçlar verdiğini keşfedin.",
        metaDescriptionEN: "Learn about common misconceptions and facts about hair transplantation. Discover how modern hair transplant techniques provide painless and natural results.",
        metaDescriptionRU: "Узнайте о распространенных заблуждениях и фактах о трансплантации волос. Откройте для себя, как современные методы трансплантации волос обеспечивают безболезненные и естественные результаты.",
        metaDescriptionKA: "შეისწავლეთ გავრცელებული შეცდომები და ფაქტები თმის გადანერგვის შესახებ. აღმოაჩინეთ, თუ როგორ უზრუნველყოფს თმის გადანერგვის თანამედროვე ტექნიკები უტკივარ და ბუნებრივ შედეგებს.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // 2. Saç Dökülmesinin Farklı Türleri
      {
        slug: "types-of-hair-loss-" + randomUUID().slice(0, 8),
        titleTR: "Saç Dökülmesinin Farklı Türleri ve Tedavi Yöntemleri",
        titleEN: "Different Types of Hair Loss and Treatment Methods",
        titleRU: "Различные типы выпадения волос и методы лечения",
        titleKA: "თმის ცვენის სხვადასხვა ტიპები და მკურნალობის მეთოდები",
        summaryTR: "Saç dökülmesinin çeşitli türleri, nedenleri ve her biri için en etkili tedavi yaklaşımları hakkında kapsamlı bilgi.",
        summaryEN: "Comprehensive information about various types of hair loss, their causes, and the most effective treatment approaches for each.",
        summaryRU: "Исчерпывающая информация о различных типах выпадения волос, их причинах и наиболее эффективных подходах к лечению каждого из них.",
        summaryKA: "ამომწურავი ინფორმაცია თმის ცვენის სხვადასხვა ტიპების, მათი მიზეზების და თითოეული მათგანის მკურნალობის ყველაზე ეფექტური მიდგომების შესახებ.",
        contentTR: "<h2>Erkek Tipi Saç Dökülmesi (Androgenetik Alopesi)</h2><p>En yaygın saç dökülmesi türüdür ve erkeklerin yaklaşık %50'sini etkiler. Genetik faktörler ve DHT hormonu etkisiyle oluşur. Tedavi seçenekleri arasında Finasterid, Minoksidil gibi ilaçlar ve saç ekimi bulunur.</p><h2>Kadın Tipi Saç Dökülmesi</h2><p>Kadınlarda görülen ve genellikle saçın seyrelmesiyle kendini gösteren bir durumdur. Hormonal değişiklikler, gebelik, menopoz dönemlerinde sıkça görülür. Minoksidil ve PRP tedavileri etkili olabilir.</p><h2>Alopesi Areata (Saçkıran)</h2><p>Bağışıklık sisteminin saç köklerine saldırması sonucu oluşan ve yuvarlak şekilli dökülmelerle karakterize bir durumdur. Genellikle kendiliğinden düzelebilir ancak steroid enjeksiyonları ve immünoterapi de uygulanabilir.</p><h2>Telojen Effluvium</h2><p>Stres, hastalık, ameliyat, doğum gibi olaylardan sonra saç köklerinin dinlenme fazına geçmesi sonucu oluşan geçici saç dökülmesidir. Tetikleyici faktörün ortadan kalkmasıyla genellikle 6-9 ay içinde kendiliğinden düzelir.</p><h2>Çekme Alopesisi</h2><p>Saçın uzun süre gergin şekilde toplanması sonucu oluşan mekanik hasar kaynaklı dökülmedir. Saç stilinin değiştirilmesi ve saça daha az stres uygulanması ile düzelebilir.</p><h2>Sikatrisyel Alopesi</h2><p>Saç köklerinin kalıcı olarak hasar görmesi ve skar dokusu oluşumu ile karakterize dökülme türüdür. Erken teşhis ve tedavi ile ilerlemesi durdurulabilir ancak kaybedilen saçlar geri kazanılamayabilir.</p>",
        contentEN: "<h2>Male Pattern Hair Loss (Androgenetic Alopecia)</h2><p>It is the most common type of hair loss and affects approximately 50% of men. It occurs due to genetic factors and the hormone DHT. Treatment options include medications such as Finasteride, Minoxidil, and hair transplantation.</p><h2>Female Pattern Hair Loss</h2><p>It is a condition seen in women and usually manifests itself with thinning of the hair. It is frequently seen during hormonal changes, pregnancy, and menopause. Minoxidil and PRP treatments can be effective.</p><h2>Alopecia Areata</h2><p>It is a condition characterized by round-shaped hair loss resulting from the immune system attacking hair follicles. It can usually heal on its own, but steroid injections and immunotherapy can also be applied.</p><h2>Telogen Effluvium</h2><p>It is temporary hair loss that occurs when hair follicles enter the resting phase after events such as stress, illness, surgery, and childbirth. It usually resolves on its own within 6-9 months with the removal of the triggering factor.</p><h2>Traction Alopecia</h2><p>It is hair loss caused by mechanical damage resulting from gathering the hair in a tight manner for a long time. It can be corrected by changing the hairstyle and applying less stress to the hair.</p><h2>Cicatricial Alopecia</h2><p>It is a type of hair loss characterized by permanent damage to hair follicles and formation of scar tissue. Its progression can be stopped with early diagnosis and treatment, but lost hair may not be regained.</p>",
        contentRU: "<h2>Облысение по мужскому типу (андрогенетическая алопеция)</h2><p>Это наиболее распространенный тип выпадения волос, который затрагивает примерно 50% мужчин. Оно возникает из-за генетических факторов и гормона ДГТ. Варианты лечения включают такие лекарства, как финастерид, миноксидил, и трансплантацию волос.</p><h2>Облысение по женскому типу</h2><p>Это состояние, наблюдаемое у женщин и обычно проявляющееся истончением волос. Часто встречается при гормональных изменениях, беременности и менопаузе. Миноксидил и PRP-терапия могут быть эффективны.</p><h2>Гнездная алопеция</h2><p>Это состояние, характеризующееся круглыми участками выпадения волос, возникающими в результате атаки иммунной системы на волосяные фолликулы. Обычно она может заживать сама по себе, но также могут применяться инъекции стероидов и иммунотерапия.</p><h2>Телогеновая алопеция</h2><p>Это временное выпадение волос, которое происходит, когда волосяные фолликулы входят в фазу покоя после таких событий, как стресс, болезнь, операция и роды. Обычно она проходит сама по себе в течение 6-9 месяцев после устранения провоцирующего фактора.</p><h2>Тракционная алопеция</h2><p>Это выпадение волос, вызванное механическим повреждением в результате сбора волос в тугую прическу в течение длительного времени. Ее можно исправить, изменив прическу и уменьшив нагрузку на волосы.</p><h2>Рубцовая алопеция</h2><p>Это тип выпадения волос, характеризующийся постоянным повреждением волосяных фолликулов и образованием рубцовой ткани. Ее прогрессирование можно остановить при ранней диагностике и лечении, но потерянные волосы могут не восстановиться.</p>",
        contentKA: "<h2>მამაკაცის ტიპის თმის ცვენა (ანდროგენული ალოპეცია)</h2><p>ეს არის თმის ცვენის ყველაზე გავრცელებული ტიპი და გავლენას ახდენს მამაკაცების დაახლოებით 50%-ზე. ის წარმოიქმნება გენეტიკური ფაქტორებისა და DHT ჰორმონის გამო. მკურნალობის ვარიანტები მოიცავს ისეთ მედიკამენტებს, როგორიცაა ფინასტერიდი, მინოქსიდილი და თმის გადანერგვა.</p><h2>ქალის ტიპის თმის ცვენა</h2><p>ეს არის მდგომარეობა, რომელიც გვხვდება ქალებში და ჩვეულებრივ ვლინდება თმის გათხელებით. ის ხშირად გვხვდება ჰორმონალური ცვლილებების, ორსულობისა და მენოპაუზის დროს. მინოქსიდილი და PRP მკურნალობა შეიძლება იყოს ეფექტური.</p><h2>ალოპეცია არეატა</h2><p>ეს არის მდგომარეობა, რომელიც ხასიათდება მრგვალი ფორმის თმის ცვენით, რაც იმუნური სისტემის თმის ფოლიკულებზე შეტევის შედეგად წარმოიქმნება. ჩვეულებრივ შეუძლია თავისით განკურნება, მაგრამ შეიძლება გამოყენებულ იქნას სტეროიდული ინექციები და იმუნოთერაპიაც.</p><h2>ტელოგენური ეფლუვიუმი</h2><p>ეს არის დროებითი თმის ცვენა, რომელიც ხდება, როდესაც თმის ფოლიკულები შედიან მოსვენების ფაზაში ისეთი მოვლენების შემდეგ, როგორიცაა სტრესი, ავადმყოფობა, ოპერაცია და მშობიარობა. ჩვეულებრივ, ის თავისით აღდგება 6-9 თვის განმავლობაში გამომწვევი ფაქტორის მოშორებით.</p><h2>ტრაქციული ალოპეცია</h2><p>ეს არის თმის ცვენა, რომელიც გამოწვეულია მექანიკური დაზიანებით, რაც გამოწვეულია თმის მჭიდროდ შეკრების შედეგად ხანგრძლივი დროის განმავლობაში. შეიძლება გასწორდეს ვარცხნილობის შეცვლით და თმაზე ნაკლები ძაბვის გამოყენებით.</p><h2>ციკატრიციული ალოპეცია</h2><p>ეს არის თმის ცვენის ტიპი, რომელიც ხასიათდება თმის ფოლიკულების მუდმივი დაზიანებით და ნაწიბურის ქსოვილის ფორმირებით. მისი პროგრესირება შეიძლება შეჩერდეს ადრეული დიაგნოზითა და მკურნალობით, მაგრამ დაკარგული თმა შეიძლება ვერ აღდგეს.</p>",
        imageUrl: "/images/blog/hair-loss-types.jpg",
        category: "hair-loss",
        tags: "hair loss types,androgenetic alopecia,alopecia areata,treatments,diagnosis",
        author: "Dr. Ayşe Kaya",
        authorTitle: "Dermatologist",
        authorAvatar: "/images/team/doctor-2.jpg",
        readingTime: 8,
        isFeatured: true,
        featuredOrder: 2,
        metaTitleTR: "Saç Dökülmesinin Farklı Türleri ve Tedavi Seçenekleri | MyHair Clinic",
        metaTitleEN: "Different Types of Hair Loss and Treatment Options | MyHair Clinic",
        metaTitleRU: "Различные типы выпадения волос и варианты лечения | MyHair Clinic",
        metaTitleKA: "თმის ცვენის სხვადასხვა ტიპები და მკურნალობის ვარიანტები | MyHair Clinic",
        metaDescriptionTR: "Androgenetik alopesi, alopesi areata, telojen effluvium gibi saç dökülmesi türleri ve her biri için uygun tedavi yöntemleri hakkında bilgi edinebilirsiniz.",
        metaDescriptionEN: "You can learn about hair loss types such as androgenetic alopecia, alopecia areata, telogen effluvium, and appropriate treatment methods for each.",
        metaDescriptionRU: "Вы можете узнать о типах выпадения волос, таких как андрогенетическая алопеция, гнездная алопеция, телогеновая алопеция, и подходящих методах лечения для каждого.",
        metaDescriptionKA: "შეგიძლიათ შეისწავლოთ თმის ცვენის ტიპები, როგორიცაა ანდროგენული ალოპეცია, ალოპეცია არეატა, ტელოგენური ეფლუვიუმი და შესაბამისი მკურნალობის მეთოდები თითოეულისთვის.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    // Daha fazla blog eklemek için yardımcı fonksiyonlar
    const topics = [
      "DHI ve FUE Tekniklerinin Karşılaştırması: Hangisi Size Uygun?",
      "PRP Tedavisi ve Saç Dökülmesindeki Etkileri",
      "Kaş Ekimi: Doğal Görünümlü Kaşlar İçin Kapsamlı Rehber",
      "Saç Ekimi Sonrası Bakım: İlk Günden Kalıcı Sonuçlara",
      "Türkiye'de Saç Ekimi Deneyimi: Ne Beklemeliyim?",
      "Sakal Ekiminden Sonra Bakım Tavsiyeleri", 
      "PRP Tedavisi Sıklığı: Neye Dikkat Edilmeli?",
      "Kadınlarda Saç Dökülmesi ve Tedavisi",
      "Genç Yaşta Kellik: Nedenleri ve Çözümleri",
      "Saç Ekimi Sonrası İlk Hafta: Ne Beklemeli?",
    ];
    
    const categories = {
      "DHI": "hair-transplant",
      "PRP": "treatments",
      "Kaş": "eyebrow-transplant",
      "Sakal": "beard-transplant",
      "Sonrası": "post-operative",
      "Dökülmesi": "hair-loss",
      "Kellik": "hair-loss",
      "Türkiye": "hair-transplant",
    };
    
    const authors = [
      { name: "Dr. Mehmet Yılmaz", title: "Hair Transplant Surgeon", avatar: "/images/team/doctor-1.jpg" },
      { name: "Dr. Ayşe Kaya", title: "Dermatologist", avatar: "/images/team/doctor-2.jpg" },
      { name: "Dr. Emre Koç", title: "Senior Hair Transplant Specialist", avatar: "/images/team/doctor-3.jpg" },
      { name: "Dr. Ahmet Demir", title: "Hair Restoration Specialist", avatar: "/images/team/doctor-4.jpg" },
      { name: "Dr. Selim Yılmaz", title: "Regenerative Medicine Specialist", avatar: "/images/team/doctor-5.jpg" }
    ];
    
    // Her konu için benzersiz içerik oluştur ve veritabanına ekle
    for (const topic of topics) {
      // Kategori belirle
      let category = "hair-transplant"; // varsayılan
      for (const key in categories) {
        if (topic.includes(key)) {
          category = categories[key];
          break;
        }
      }
      
      // Rastgele bir yazar seç
      const author = authors[Math.floor(Math.random() * authors.length)];
      
      // Slug oluştur
      const slug = topic.toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 30) + "-" + randomUUID().slice(0, 8);
      
      // Etiketler oluştur
      const tagsMap = {
        "Sakal": "beard,facial hair,beard transplant,grooming",
        "Kaş": "eyebrows,eyebrow design,facial aesthetics,natural look",
        "PRP": "PRP therapy,hair rejuvenation,non-surgical,platelets",
        "DHI": "hair transplant technique,implantation,FUE,comparison",
        "FUE": "follicular unit extraction,surgery,hair graft,extraction",
        "Dökülmesi": "hair loss,thinning,treatment,prevention",
        "Bakım": "aftercare,post-procedure,maintenance,recovery",
        "Türkiye": "medical tourism,Turkey,international patients,experience"
      };
      
      const tags = [];
      for (const key in tagsMap) {
        if (topic.includes(key)) {
          tags.push(tagsMap[key]);
        }
      }
      
      const tagString = tags.join(",") || "hair transplant,hair care,MyHair Clinic";
      
      // Benzersiz içerik oluştur
      const content = generateUniqueContent(topic);
      
      // Blog yazısını veritabanına ekle
      await db.insert(blogPosts).values({
        slug,
        titleTR: topic,
        titleEN: topic, // Basitlik için aynı başlık kullanıldı
        titleRU: topic,
        titleKA: topic,
        summaryTR: `${topic} hakkında detaylı bilgiler ve öneriler.`,
        summaryEN: `Detailed information and suggestions about ${topic}.`,
        summaryRU: `Подробная информация и предложения о ${topic}.`,
        summaryKA: `დეტალური ინფორმაცია და შემოთავაზებები ${topic} შესახებ.`,
        contentTR: content,
        contentEN: content, // Basitlik için aynı içerik kullanıldı
        contentRU: content,
        contentKA: content,
        imageUrl: `/images/blog/${category}-${Math.floor(Math.random() * 5) + 1}.jpg`,
        category,
        tags: tagString,
        author: author.name,
        authorTitle: author.title,
        authorAvatar: author.avatar,
        readingTime: Math.floor(Math.random() * 5) + 5,
        isFeatured: false,
        featuredOrder: 0,
        metaTitleTR: `${topic} | MyHair Clinic`,
        metaTitleEN: `${topic} | MyHair Clinic`,
        metaTitleRU: `${topic} | MyHair Clinic`,
        metaTitleKA: `${topic} | MyHair Clinic`,
        metaDescriptionTR: `${topic} hakkında kapsamlı rehber ve uzman görüşleri`,
        metaDescriptionEN: `Comprehensive guide and expert opinions about ${topic}`,
        metaDescriptionRU: `Исчерпывающее руководство и мнения экспертов о ${topic}`,
        metaDescriptionKA: `ყოვლისმომცველი გზამკვლევი და ექსპერტთა მოსაზრებები ${topic} შესახებ`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    console.log('Veritabanına toplam ' + (uniqueBlogPosts.length + topics.length) + ' benzersiz blog yazısı eklendi.');
    return 'Tüm blog yazıları başarıyla eklendi!';
  } catch (error) {
    console.error('Hata:', error);
    return `Hata oluştu: ${error.message}`;
  }
}

// Her topic için benzersiz içerik oluşturan fonksiyon
function generateUniqueContent(topic) {
  const headings = ["Giriş", "Ne Beklemeliyiz?", "Kimler İçin Uygundur?", "İşlem Süreci", "Sık Sorulan Sorular", "Sonuç"];
  const paragraphs = [
    "Bu konu hakkında bilgi sahibi olmak, doğru tedavi seçiminde kritik öneme sahiptir.",
    "Araştırmalar, doğru tedavi yaklaşımının başarı oranını önemli ölçüde artırdığını göstermektedir.",
    "Her hasta için kişiselleştirilmiş bir yaklaşım gereklidir, bu nedenle uzman bir doktorla konsültasyon önemlidir.",
    "Tedavi sonrası bakım, optimum sonuçlar elde etmenin anahtarıdır.",
    "Doğru klinik ve doktor seçimi, başarılı sonuçlar için en önemli faktörlerden biridir."
  ];
  
  let content = `<h2>${topic}</h2><p>${paragraphs[0]} ${topic} konusunda doğru bilgilendirme çok önemlidir.</p>`;
  
  // Her başlık için benzersiz paragraflar ekle
  for (let i = 1; i < headings.length; i++) {
    content += `<h2>${headings[i]}</h2><p>${paragraphs[i % paragraphs.length]} ${topic.split(' ').slice(0, 2).join(' ')} için bu özellikle geçerlidir.</p>`;
  }
  
  // Sık sorulan sorular bölümü ekle
  content += `<h2>Sık Sorulan Sorular</h2><ul>
    <li><strong>${topic} için en iyi yaş nedir?</strong> Kişinin durumuna göre değişir, ancak genellikle 25 yaş üstü önerilir.</li>
    <li><strong>İşlem ne kadar sürer?</strong> Bu işlem genellikle 3-8 saat arası sürer, tedavi tipine bağlı olarak değişebilir.</li>
    <li><strong>Sonuçlar ne zaman görülür?</strong> İlk sonuçlar 3-4 ay içinde görülmeye başlar, tam sonuçlar 12-18 ay içinde ortaya çıkar.</li>
  </ul>`;
  
  return content;
}

// Scripti çalıştır
seedUniqueBlogPosts().then(result => {
  console.log(result);
  process.exit(0);
}).catch(error => {
  console.error('Hata oluştu:', error);
  process.exit(1);
});