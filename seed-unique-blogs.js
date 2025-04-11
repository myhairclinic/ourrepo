// ESM formatında direct database seed script
import { db } from './server/db.js';
import { blogPosts } from './shared/schema.js';
import { randomUUID } from 'crypto';

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

      // 3. DHI ve FUE Tekniklerinin Karşılaştırması
      {
        slug: "dhi-vs-fue-techniques-" + randomUUID().slice(0, 8),
        titleTR: "DHI ve FUE Tekniklerinin Karşılaştırması: Hangisi Size Uygun?",
        titleEN: "Comparison of DHI and FUE Techniques: Which One is Right for You?",
        titleRU: "Сравнение методов DHI и FUE: какой из них подходит вам?",
        titleKA: "DHI და FUE ტექნიკების შედარება: რომელი არის სწორი თქვენთვის?",
        summaryTR: "DHI ve FUE saç ekimi teknikleri arasındaki farklar, avantajlar, dezavantajlar ve hangi durumda hangi tekniğin daha uygun olacağı.",
        summaryEN: "Differences between DHI and FUE hair transplantation techniques, advantages, disadvantages, and which technique would be more suitable in which situation.",
        summaryRU: "Различия между техниками трансплантации волос DHI и FUE, преимущества, недостатки и какая техника была бы более подходящей в какой ситуации.",
        summaryKA: "განსხვავებები DHI და FUE თმის გადანერგვის ტექნიკებს შორის, უპირატესობები, ნაკლოვანებები და რომელი ტექნიკა იქნებოდა უფრო შესაფერისი რომელ სიტუაციაში.",
        contentTR: "<h2>FUE Tekniği Nedir?</h2><p>FUE (Follicular Unit Extraction), saç köklerinin ense bölgesinden tek tek alınıp nakledilmesi işlemidir. Lokal anestezi altında gerçekleştirilen bu yöntemde saç kökleri mikro motorlarla çıkarılır ve alıcı bölgede açılan kanallara yerleştirilir.</p><h2>DHI Tekniği Nedir?</h2><p>DHI (Direct Hair Implantation) tekniğinde saç kökleri yine ense bölgesinden alınır ancak Choi kalemleri adı verilen özel aletlerle doğrudan alıcı bölgeye yerleştirilir. Bu teknikte kanal açma ve greft yerleştirme işlemleri aynı anda yapılır.</p><h2>Temel Farklar</h2><ul><li><strong>Kanal Açma:</strong> FUE'de önce kanallar açılıp sonra greftler yerleştirilirken, DHI'da bu işlem tek adımda yapılır.</li><li><strong>Ekim Yoğunluğu:</strong> DHI tekniği, daha yüksek yoğunlukta ekim yapma imkanı sağlar.</li><li><strong>İyileşme Süresi:</strong> DHI tekniğinde iyileşme süresi genellikle daha kısadır.</li><li><strong>Uygunluk:</strong> FUE geniş alanlarda, DHI ise daha detaylı, küçük alanlarda ve saç çizgisi tasarımında avantajlıdır.</li></ul><h2>Hangi Teknik Size Uygun?</h2><p>Eğer geniş bir alanda saç ekimine ihtiyaç duyuyorsanız ve maliyet önemliyse, FUE sizin için daha uygun olabilir. Eğer daha detaylı bir saç çizgisi, daha hızlı iyileşme süresi ve daha az şişlik istiyorsanız DHI tekniği tercih edilebilir. Ancak en doğru kararı, kişisel durumunuzu değerlendiren uzman bir doktor verebilir.</p><h2>Maliyet Karşılaştırması</h2><p>Genel olarak DHI tekniği, gerektirdiği özel ekipman ve daha detaylı çalışma süreci nedeniyle FUE'den daha maliyetlidir. Ancak bu fark kliniğe ve ülkeye göre değişiklik gösterebilir.</p>",
        contentEN: "<h2>What is FUE Technique?</h2><p>FUE (Follicular Unit Extraction) is the process of taking hair follicles one by one from the nape area and transplanting them. In this method, which is performed under local anesthesia, hair follicles are removed with micromotors and placed in channels opened in the recipient area.</p><h2>What is DHI Technique?</h2><p>In the DHI (Direct Hair Implantation) technique, hair follicles are also taken from the nape area but are placed directly into the recipient area with special tools called Choi pens. In this technique, the processes of opening channels and placing grafts are done simultaneously.</p><h2>Key Differences</h2><ul><li><strong>Channel Opening:</strong> In FUE, channels are opened first and then grafts are placed, while in DHI, this process is done in one step.</li><li><strong>Implantation Density:</strong> The DHI technique provides the opportunity to implant at a higher density.</li><li><strong>Recovery Time:</strong> The recovery time in the DHI technique is generally shorter.</li><li><strong>Suitability:</strong> FUE is advantageous in large areas, while DHI is advantageous in more detailed, small areas and hairline design.</li></ul><h2>Which Technique is Right for You?</h2><p>If you need hair transplantation in a large area and cost is important, FUE may be more suitable for you. If you want a more detailed hairline, faster recovery time, and less swelling, the DHI technique can be preferred. However, an expert doctor who evaluates your personal situation can make the most accurate decision.</p><h2>Cost Comparison</h2><p>In general, the DHI technique is more costly than FUE due to the special equipment it requires and the more detailed working process. However, this difference may vary according to the clinic and country.</p>",
        contentRU: "<h2>Что такое техника FUE?</h2><p>FUE (экстракция фолликулярных единиц) - это процесс взятия волосяных фолликулов по одному из затылочной области и их пересадки. При этом методе, который выполняется под местной анестезией, волосяные фолликулы удаляются микромоторами и помещаются в каналы, открытые в области-реципиенте.</p><h2>Что такое техника DHI?</h2><p>В технике DHI (прямая имплантация волос) волосяные фолликулы также берутся из затылочной области, но помещаются непосредственно в область-реципиент с помощью специальных инструментов, называемых ручками Чои. В этой технике процессы открытия каналов и размещения графтов выполняются одновременно.</p><h2>Ключевые отличия</h2><ul><li><strong>Открытие канала:</strong> В FUE сначала открываются каналы, а затем размещаются графты, в то время как в DHI этот процесс выполняется за один шаг.</li><li><strong>Плотность имплантации:</strong> Техника DHI предоставляет возможность имплантировать с более высокой плотностью.</li><li><strong>Время восстановления:</strong> Время восстановления в технике DHI обычно короче.</li><li><strong>Пригодность:</strong> FUE удобен для больших площадей, а DHI - для более детальных, малых площадей и дизайна линии роста волос.</li></ul><h2>Какая техника подходит вам?</h2><p>Если вам нужна трансплантация волос на большой площади и стоимость важна, FUE может быть более подходящим для вас. Если вы хотите более детальную линию роста волос, более быстрое время восстановления и меньше отеков, можно предпочесть технику DHI. Однако врач-эксперт, который оценивает вашу личную ситуацию, может принять наиболее точное решение.</p><h2>Сравнение стоимости</h2><p>В целом, техника DHI стоит дороже, чем FUE, из-за специального оборудования, которое она требует, и более детального рабочего процесса. Однако эта разница может варьироваться в зависимости от клиники и страны.</p>",
        contentKA: "<h2>რა არის FUE ტექნიკა?</h2><p>FUE (ფოლიკულარული ერთეულის ექსტრაქცია) არის თმის ფოლიკულების აღება თითო-თითოდ კისრის არიდან და მათი გადანერგვა. ამ მეთოდით, რომელიც სრულდება ადგილობრივი ანესთეზიის ქვეშ, თმის ფოლიკულები მოიხსნება მიკრომოტორებით და მოთავსდება არხებში, რომლებიც გახსნილია მიმღებ არეში.</p><h2>რა არის DHI ტექნიკა?</h2><p>DHI (პირდაპირი თმის იმპლანტაციის) ტექნიკაში თმის ფოლიკულები ასევე აღებულია კისრის არიდან, მაგრამ განთავსებულია პირდაპირ მიმღებ არეში სპეციალური ინსტრუმენტებით, რომლებსაც ჩოის კალმებს უწოდებენ. ამ ტექნიკაში არხების გახსნისა და გრაფტების განთავსების პროცესები ერთდროულად ხდება.</p><h2>ძირითადი განსხვავებები</h2><ul><li><strong>არხის გახსნა:</strong> FUE-ში ჯერ იხსნება არხები და შემდეგ თავსდება გრაფტები, ხოლო DHI-ში ეს პროცესი ერთი ნაბიჯით ხდება.</li><li><strong>იმპლანტაციის სიმჭიდროვე:</strong> DHI ტექნიკა იძლევა უფრო მაღალი სიმჭიდროვით იმპლანტაციის საშუალებას.</li><li><strong>აღდგენის დრო:</strong> აღდგენის დრო DHI ტექნიკაში ზოგადად უფრო მოკლეა.</li><li><strong>შესაფერისობა:</strong> FUE ხელსაყრელია დიდ ფართობებში, ხოლო DHI ხელსაყრელია უფრო დეტალურ, მცირე ფართობებში და თმის ხაზის დიზაინში.</li></ul><h2>რომელი ტექნიკა არის სწორი თქვენთვის?</h2><p>თუ გჭირდებათ თმის გადანერგვა დიდ ფართობზე და ღირებულება მნიშვნელოვანია, FUE შეიძლება უფრო შესაფერისი იყოს თქვენთვის. თუ გსურთ უფრო დეტალური თმის ხაზი, სწრაფი აღდგენის დრო და ნაკლები შეშუპება, შეიძლება უპირატესობა მიენიჭოს DHI ტექნიკას. თუმცა, ექიმ-ექსპერტს, რომელიც აფასებს თქვენს პირად მდგომარეობას, შეუძლია მიიღოს ყველაზე ზუსტი გადაწყვეტილება.</p><h2>ღირებულების შედარება</h2><p>ზოგადად, DHI ტექნიკა უფრო ძვირია, ვიდრე FUE, სპეციალური აღჭურვილობის გამო, რომელიც მას სჭირდება და უფრო დეტალური სამუშაო პროცესის გამო. თუმცა, ეს განსხვავება შეიძლება განსხვავდებოდეს კლინიკისა და ქვეყნის მიხედვით.</p>",
        imageUrl: "/images/blog/dhi-vs-fue.jpg",
        category: "hair-transplant",
        tags: "DHI,FUE,techniques comparison,hair restoration,technology",
        author: "Dr. Emre Koç",
        authorTitle: "Senior Hair Transplant Specialist",
        authorAvatar: "/images/team/doctor-3.jpg",
        readingTime: 7,
        isFeatured: false,
        featuredOrder: 0,
        metaTitleTR: "DHI ve FUE Saç Ekimi Teknikleri: Kapsamlı Karşılaştırma | MyHair Clinic",
        metaTitleEN: "DHI and FUE Hair Transplantation Techniques: Comprehensive Comparison | MyHair Clinic",
        metaTitleRU: "Техники трансплантации волос DHI и FUE: всестороннее сравнение | MyHair Clinic",
        metaTitleKA: "DHI და FUE თმის გადანერგვის ტექნიკები: ყოვლისმომცველი შედარება | MyHair Clinic",
        metaDescriptionTR: "DHI ve FUE saç ekimi teknikleri arasındaki farklar, avantajlar ve dezavantajlar. Hangi tekniğin sizin için en uygun olduğunu öğrenin.",
        metaDescriptionEN: "Differences, advantages, and disadvantages between DHI and FUE hair transplantation techniques. Learn which technique is most suitable for you.",
        metaDescriptionRU: "Различия, преимущества и недостатки между техниками трансплантации волос DHI и FUE. Узнайте, какая техника наиболее подходит для вас.",
        metaDescriptionKA: "განსხვავებები, უპირატესობები და ნაკლოვანებები DHI და FUE თმის გადანერგვის ტექნიკებს შორის. შეიტყვეთ, რომელი ტექნიკაა ყველაზე შესაფერისი თქვენთვის.",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    // Blog yazılarını veritabanına ekle
    console.log('Yeni blog yazıları ekleniyor...');
    for (const post of uniqueBlogPosts) {
      await db.insert(blogPosts).values(post);
    }
    
    // Türkiye hakkında blog ekleyelim
    await db.insert(blogPosts).values({
      slug: "hair-transplant-turkey-experience-" + randomUUID().slice(0, 8),
      titleTR: "Türkiye'de Saç Ekimi Deneyimi: Ne Beklemeliyim?",
      titleEN: "Hair Transplant Experience in Turkey: What Should I Expect?",
      titleRU: "Опыт трансплантации волос в Турции: чего ожидать?",
      titleKA: "თმის გადანერგვის გამოცდილება თურქეთში: რას უნდა ველოდე?",
      summaryTR: "Türkiye'de saç ekimi yaptırmayı planlıyorsanız, süreç, maliyet ve sonuçlar hakkında bilmeniz gereken her şey.",
      summaryEN: "If you're planning to have hair transplantation in Turkey, everything you need to know about the process, cost, and results.",
      summaryRU: "Если вы планируете делать трансплантацию волос в Турции, все, что вам нужно знать о процессе, стоимости и результатах.",
      summaryKA: "თუ გეგმავთ თმის გადანერგვას თურქეთში, ყველაფერი, რაც უნდა იცოდეთ პროცესის, ღირებულების და შედეგების შესახებ.",
      contentTR: "<h2>Türkiye'nin Saç Ekimindeki Yeri</h2><p>Türkiye, dünya çapında saç ekimi turizmi için önemli bir merkez haline gelmiştir. İstanbul başta olmak üzere birçok şehirde yüksek kaliteli saç ekimi hizmetleri sunan klinikler bulunmaktadır. Türk doktorların tecrübesi, modern teknolojilerin kullanımı ve uygun fiyatlar, her yıl binlerce hastayı Türkiye'ye çekmektedir.</p><h2>Saç Ekimi Öncesi Hazırlık</h2><p>Türkiye'de saç ekimi için seyahat planlarken, öncelikle araştırma yapmanız ve güvenilir klinikler hakkında bilgi toplamanız önemlidir. Doktor ve klinik seçiminizi yaparken önceki hasta yorumlarına, klinik sertifikalarına ve doktorun tecrübesine dikkat edin. Çoğu klinik, uluslararası hastalar için özel paketler sunmaktadır.</p><h2>Prosedür Nasıl İlerler?</h2><p>Saç ekimi genellikle bir günlük bir işlemdir ve lokal anestezi altında gerçekleştirilir. FUE veya DHI gibi teknikler kullanılarak, ense bölgesinden alınan saç kökleri, dökülme olan bölgelere nakledilir. İşlem 6-8 saat sürebilir ve çoğu hasta aynı gün otellerine dönebilir.</p><h2>Maliyet ve Değer</h2><p>Türkiye'de saç ekimi maliyeti, Avrupa ve Amerika'ya kıyasla genellikle %60-70 daha ekonomiktir. Ancak düşük fiyat düşük kalite anlamına gelmez. Birçok Türk kliniği, en son teknolojileri ve deneyimli ekipleri kullanmaktadır. Paketler genellikle konaklama, ulaşım ve tercüme hizmetlerini de içerir.</p><h2>İyileşme Süreci ve Sonrası</h2><p>Operasyon sonrası ilk yıkama genellikle klinikte yapılır ve doktorlar detaylı bakım talimatları verir. Çoğu hasta 3-4 gün içinde günlük aktivitelerine dönebilir. Uzun vadeli sonuçlar için sabırlı olmanız gerekecektir, zira tam sonuçlar 12-18 ay içinde ortaya çıkar.</p><h2>Neden Türkiye'yi Tercih Etmeliyim?</h2><p>Ekonomik fiyatlar, yüksek kaliteli hizmet, deneyimli doktorlar ve kapsamlı paketler, Türkiye'yi saç ekimi için ideal bir destinasyon haline getirmektedir. Ayrıca, İstanbul gibi şehirlerin sunduğu turistik imkanlar, tedavi sürecinizi keyifli bir tatile dönüştürebilir.</p>",
      contentEN: "<h2>Turkey's Place in Hair Transplantation</h2><p>Turkey has become an important center for hair transplantation tourism worldwide. There are clinics offering high-quality hair transplantation services in many cities, especially in Istanbul. The experience of Turkish doctors, the use of modern technologies, and affordable prices attract thousands of patients to Turkey every year.</p><h2>Preparation Before Hair Transplantation</h2><p>When planning a trip for hair transplantation in Turkey, it is important to do research first and gather information about reliable clinics. When choosing a doctor and clinic, pay attention to previous patient reviews, clinic certificates, and the doctor's experience. Most clinics offer special packages for international patients.</p><h2>How Does the Procedure Progress?</h2><p>Hair transplantation is usually a one-day procedure and is performed under local anesthesia. Using techniques such as FUE or DHI, hair follicles taken from the nape area are transplanted to areas with hair loss. The procedure can take 6-8 hours and most patients can return to their hotels on the same day.</p><h2>Cost and Value</h2><p>The cost of hair transplantation in Turkey is generally 60-70% more economical compared to Europe and America. However, low price does not mean low quality. Many Turkish clinics use the latest technologies and experienced teams. Packages usually include accommodation, transportation, and translation services.</p><h2>Recovery Process and Aftermath</h2><p>The first wash after the operation is usually done at the clinic and doctors provide detailed care instructions. Most patients can return to their daily activities within 3-4 days. You will need to be patient for long-term results, as full results emerge within 12-18 months.</p><h2>Why Should I Choose Turkey?</h2><p>Economical prices, high-quality service, experienced doctors, and comprehensive packages make Turkey an ideal destination for hair transplantation. Also, tourist opportunities offered by cities like Istanbul can turn your treatment process into an enjoyable vacation.</p>",
      contentRU: "<h2>Место Турции в трансплантации волос</h2><p>Турция стала важным центром туризма по трансплантации волос во всем мире. Во многих городах, особенно в Стамбуле, есть клиники, предлагающие высококачественные услуги по трансплантации волос. Опыт турецких врачей, использование современных технологий и доступные цены ежегодно привлекают в Турцию тысячи пациентов.</p><h2>Подготовка перед трансплантацией волос</h2><p>При планировании поездки для трансплантации волос в Турции важно сначала провести исследование и собрать информацию о надежных клиниках. При выборе врача и клиники обратите внимание на отзывы предыдущих пациентов, сертификаты клиники и опыт врача. Большинство клиник предлагают специальные пакеты для иностранных пациентов.</p><h2>Как проходит процедура?</h2><p>Трансплантация волос обычно является однодневной процедурой и выполняется под местной анестезией. Используя техники, такие как FUE или DHI, волосяные фолликулы, взятые из затылочной области, пересаживаются в области с выпадением волос. Процедура может занять 6-8 часов, и большинство пациентов могут вернуться в свои отели в тот же день.</p><h2>Стоимость и ценность</h2><p>Стоимость трансплантации волос в Турции обычно на 60-70% экономичнее по сравнению с Европой и Америкой. Однако низкая цена не означает низкое качество. Многие турецкие клиники используют новейшие технологии и опытные команды. Пакеты обычно включают проживание, транспорт и услуги перевода.</p><h2>Процесс восстановления и последствия</h2><p>Первое мытье после операции обычно проводится в клинике, и врачи предоставляют подробные инструкции по уходу. Большинство пациентов могут вернуться к своей повседневной деятельности в течение 3-4 дней. Вам потребуется терпение для долгосрочных результатов, так как полные результаты появляются в течение 12-18 месяцев.</p><h2>Почему я должен выбрать Турцию?</h2><p>Экономичные цены, высококачественный сервис, опытные врачи и всеобъемлющие пакеты делают Турцию идеальным местом для трансплантации волос. Кроме того, туристические возможности, предлагаемые такими городами, как Стамбул, могут превратить ваш процесс лечения в приятный отпуск.</p>",
      contentKA: "<h2>თურქეთის ადგილი თმის გადანერგვაში</h2><p>თურქეთი გახდა მნიშვნელოვანი ცენტრი თმის გადანერგვის ტურიზმისთვის მთელს მსოფლიოში. არსებობს კლინიკები, რომლებიც სთავაზობენ მაღალი ხარისხის თმის გადანერგვის მომსახურებას მრავალ ქალაქში, განსაკუთრებით სტამბოლში. თურქი ექიმების გამოცდილება, თანამედროვე ტექნოლოგიების გამოყენება და ხელმისაწვდომი ფასები ყოველწლიურად იზიდავს ათასობით პაციენტს თურქეთში.</p><h2>მომზადება თმის გადანერგვამდე</h2><p>თმის გადანერგვისთვის თურქეთში მოგზაურობის დაგეგმვისას, მნიშვნელოვანია ჯერ კვლევის ჩატარება და სანდო კლინიკების შესახებ ინფორმაციის შეგროვება. ექიმისა და კლინიკის არჩევისას ყურადღება მიაქციეთ წინა პაციენტების მიმოხილვებს, კლინიკის სერტიფიკატებს და ექიმის გამოცდილებას. უმეტესი კლინიკა სთავაზობს სპეციალურ პაკეტებს საერთაშორისო პაციენტებისთვის.</p><h2>როგორ მიმდინარეობს პროცედურა?</h2><p>თმის გადანერგვა ჩვეულებრივ არის ერთდღიანი პროცედურა და სრულდება ადგილობრივი ანესთეზიის ქვეშ. ისეთი ტექნიკების გამოყენებით, როგორიცაა FUE ან DHI, თმის ფოლიკულები, აღებული კისრის არიდან, გადანერგილია თმის ცვენის არეებში. პროცედურას შეიძლება დასჭირდეს 6-8 საათი და უმეტესი პაციენტები შეძლებენ დაბრუნდნენ თავიანთ სასტუმროებში იმავე დღეს.</p><h2>ღირებულება და ღირებულება</h2><p>თმის გადანერგვის ღირებულება თურქეთში ზოგადად 60-70%-ით უფრო ეკონომიურია ევროპასთან და ამერიკასთან შედარებით. თუმცა, დაბალი ფასი არ ნიშნავს დაბალ ხარისხს. ბევრი თურქული კლინიკა იყენებს უახლეს ტექნოლოგიებს და გამოცდილ გუნდებს. პაკეტები ჩვეულებრივ მოიცავს საცხოვრებელს, ტრანსპორტს და თარგმნის მომსახურებას.</p><h2>აღდგენის პროცესი და შედეგები</h2><p>პირველი რეცხვა ოპერაციის შემდეგ ჩვეულებრივ ტარდება კლინიკაში და ექიმები უზრუნველყოფენ დეტალურ მოვლის ინსტრუქციებს. უმეტესი პაციენტები შეძლებენ დაუბრუნდნენ თავიანთ ყოველდღიურ აქტივობებს 3-4 დღის განმავლობაში. თქვენ დაგჭირდებათ მოთმინება გრძელვადიანი შედეგებისთვის, რადგან სრული შედეგები ჩნდება 12-18 თვის განმავლობაში.</p><h2>რატომ უნდა ავირჩიო თურქეთი?</h2><p>ეკონომიური ფასები, მაღალი ხარისხის მომსახურება, გამოცდილი ექიმები და ყოვლისმომცველი პაკეტები თურქეთს იდეალურ ადგილად აქცევს თმის გადანერგვისთვის. ასევე, ტურისტული შესაძლებლობები, რომლებსაც სთავაზობენ ისეთი ქალაქები, როგორიცაა სტამბოლი, შეუძლიათ თქვენი მკურნალობის პროცესი სასიამოვნო არდადეგებად აქციონ.</p>",
      imageUrl: "/images/blog/hair-transplant-turkey.jpg",
      category: "hair-transplant",
      tags: "Turkey,medical tourism,hair transplant abroad,patient experience,cost comparison",
      author: "Dr. Mehmet Yılmaz",
      authorTitle: "Hair Transplant Surgeon",
      authorAvatar: "/images/team/doctor-1.jpg",
      readingTime: 7,
      isFeatured: true,
      featuredOrder: 3,
      metaTitleTR: "Türkiye'de Saç Ekimi Deneyimi ve Beklentileri | MyHair Clinic",
      metaTitleEN: "Hair Transplant Experience in Turkey and Expectations | MyHair Clinic",
      metaTitleRU: "Опыт трансплантации волос в Турции и ожидания | MyHair Clinic",
      metaTitleKA: "თმის გადანერგვის გამოცდილება თურქეთში და მოლოდინები | MyHair Clinic",
      metaDescriptionTR: "Türkiye'de saç ekimi prosedürü, maliyetler, beklentiler ve neden binlerce hasta her yıl Türkiye'yi tercih ediyor? Kapsamlı rehber.",
      metaDescriptionEN: "Hair transplantation procedure in Turkey, costs, expectations, and why thousands of patients choose Turkey every year? Comprehensive guide.",
      metaDescriptionRU: "Процедура трансплантации волос в Турции, затраты, ожидания и почему тысячи пациентов ежегодно выбирают Турцию? Исчерпывающее руководство.",
      metaDescriptionKA: "თმის გადანერგვის პროცედურა თურქეთში, ხარჯები, მოლოდინები და რატომ ირჩევს ათასობით პაციენტი თურქეთს ყოველწლიურად? ყოვლისმომცველი გზამკვლევი.",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Toplam en az 12 blog yazısı oluncaya kadar daha ekle
    const topics = [
      "Sakal Ekiminden Sonra Bakım Tavsiyeleri",
      "PRP Tedavisi Sıklığı: Neye Dikkat Edilmeli?",
      "Kadınlarda Saç Dökülmesi ve Tedavisi",
      "Genç Yaşta Kellik: Nedenleri ve Çözümleri",
      "Saç Ekimi Sonrası İlk Hafta: Ne Beklemeli?",
      "Saç Ekimi İçin Doğru Zamanı Belirlemek",
      "Doğal Görünümlü Kaş Ekimi Teknikleri",
      "Şok Dökülme Döneminde Hastalara Öneriler",
    ];

    for (let i = 0; i < topics.length; i++) {
      const topicTR = topics[i];
      const topicEN = translateTopic(topicTR, "EN");
      const topicRU = translateTopic(topicTR, "RU");
      const topicKA = translateTopic(topicTR, "KA");
      
      const category = getCategoryForTopic(topicTR);
      const author = getRandomAuthor();
      
      await db.insert(blogPosts).values({
        slug: topicEN.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') + "-" + randomUUID().slice(0, 8),
        titleTR: topicTR,
        titleEN: topicEN,
        titleRU: topicRU,
        titleKA: topicKA,
        summaryTR: `${topicTR} hakkında kapsamlı rehber. Bu yazıda tüm önemli noktalara değineceğiz.`,
        summaryEN: `Comprehensive guide about ${topicEN}. In this article, we will touch on all important points.`,
        summaryRU: `Исчерпывающее руководство по ${topicRU}. В этой статье мы коснемся всех важных моментов.`,
        summaryKA: `ყოვლისმომცველი გზამკვლევი ${topicKA} შესახებ. ამ სტატიაში ჩვენ შევეხებით ყველა მნიშვნელოვან პუნქტს.`,
        contentTR: generateUniqueContent(topicTR, "TR"),
        contentEN: generateUniqueContent(topicEN, "EN"),
        contentRU: generateUniqueContent(topicRU, "RU"),
        contentKA: generateUniqueContent(topicKA, "KA"),
        imageUrl: `/images/blog/${category}-${(i % 8) + 1}.jpg`,
        category: category,
        tags: getTagsForTopic(topicTR),
        author: author.name,
        authorTitle: author.title,
        authorAvatar: author.avatar,
        readingTime: 5 + (i % 5),
        isFeatured: i < 2,
        featuredOrder: i < 2 ? i + 4 : 0,
        metaTitleTR: `${topicTR} | MyHair Clinic`,
        metaTitleEN: `${topicEN} | MyHair Clinic`,
        metaTitleRU: `${topicRU} | MyHair Clinic`,
        metaTitleKA: `${topicKA} | MyHair Clinic`,
        metaDescriptionTR: `${topicTR} hakkında detaylı bilgiler, öneriler ve profesyonel tavsiyeler. MyHair Clinic uzmanları tarafından hazırlanan kapsamlı rehber.`,
        metaDescriptionEN: `Detailed information, suggestions, and professional advice about ${topicEN}. Comprehensive guide prepared by MyHair Clinic experts.`,
        metaDescriptionRU: `Подробная информация, предложения и профессиональные советы о ${topicRU}. Исчерпывающее руководство, подготовленное экспертами MyHair Clinic.`,
        metaDescriptionKA: `დეტალური ინფორმაცია, შემოთავაზებები და პროფესიონალური რჩევები ${topicKA} შესახებ. ყოვლისმომცველი გზამკვლევი, მომზადებული MyHair Clinic-ის ექსპერტების მიერ.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    console.log('Veritabanına toplam 12+ benzersiz blog yazısı eklendi.');
    return 'Tüm blog yazıları başarıyla eklendi!';
  } catch (error) {
    console.error('Hata:', error);
    return `Hata oluştu: ${error.message}`;
  }
}

// Yardımcı fonksiyonlar
function translateTopic(topic, language) {
  // Basitleştirilmiş çeviri fonksiyonu
  const translations = {
    "Sakal Ekiminden Sonra Bakım Tavsiyeleri": {
      "EN": "Care Tips After Beard Transplantation",
      "RU": "Советы по уходу после трансплантации бороды",
      "KA": "მოვლის რჩევები წვერის გადანერგვის შემდეგ"
    },
    "PRP Tedavisi Sıklığı: Neye Dikkat Edilmeli?": {
      "EN": "PRP Treatment Frequency: What to Pay Attention to?",
      "RU": "Частота PRP-терапии: на что обратить внимание?",
      "KA": "PRP მკურნალობის სიხშირე: რას უნდა მიექცეს ყურადღება?"
    },
    "Kadınlarda Saç Dökülmesi ve Tedavisi": {
      "EN": "Hair Loss in Women and Its Treatment",
      "RU": "Выпадение волос у женщин и его лечение",
      "KA": "თმის ცვენა ქალებში და მისი მკურნალობა"
    },
    "Genç Yaşta Kellik: Nedenleri ve Çözümleri": {
      "EN": "Baldness at Young Age: Causes and Solutions",
      "RU": "Облысение в молодом возрасте: причины и решения",
      "KA": "სიმელოტე ახალგაზრდა ასაკში: მიზეზები და გადაწყვეტილებები"
    },
    "Saç Ekimi Sonrası İlk Hafta: Ne Beklemeli?": {
      "EN": "First Week After Hair Transplant: What to Expect?",
      "RU": "Первая неделя после трансплантации волос: чего ожидать?",
      "KA": "პირველი კვირა თმის გადანერგვის შემდეგ: რას უნდა ველოდოთ?"
    },
    "Saç Ekimi İçin Doğru Zamanı Belirlemek": {
      "EN": "Determining the Right Time for Hair Transplantation",
      "RU": "Определение правильного времени для трансплантации волос",
      "KA": "სწორი დროის განსაზღვრა თმის გადანერგვისთვის"
    },
    "Doğal Görünümlü Kaş Ekimi Teknikleri": {
      "EN": "Natural-Looking Eyebrow Transplantation Techniques",
      "RU": "Техники трансплантации бровей естественного вида",
      "KA": "ბუნებრივი გარეგნობის წარბების გადანერგვის ტექნიკები"
    },
    "Şok Dökülme Döneminde Hastalara Öneriler": {
      "EN": "Recommendations for Patients During the Shock Shedding Period",
      "RU": "Рекомендации для пациентов в период шокового выпадения",
      "KA": "რეკომენდაციები პაციენტებისთვის შოკური ცვენის პერიოდში"
    }
  };
  
  return translations[topic]?.[language] || topic;
}

function getCategoryForTopic(topic) {
  if (topic.includes("Sakal")) return "beard-transplant";
  if (topic.includes("Kaş")) return "eyebrow-transplant";
  if (topic.includes("PRP")) return "treatments";
  if (topic.includes("Dökülme")) return "hair-loss";
  if (topic.includes("Sonrası")) return "post-operative";
  return "hair-transplant";
}

function getTagsForTopic(topic) {
  const tagMap = {
    "Sakal": "beard,facial hair,beard care,beard growth",
    "Kaş": "eyebrows,facial aesthetics,eyebrow design",
    "PRP": "PRP therapy,hair growth,non-surgical,treatments",
    "Dökülme": "hair loss,alopecia,treatment options,prevention",
    "Kellik": "baldness,prevention,early hair loss,treatment",
    "Sonrası": "aftercare,recovery,post-procedure,healing",
    "Zamanı": "timing,planning,preparation,consultation",
    "Kadın": "women,female pattern,treatments for women,hormonal"
  };
  
  const tags = [];
  Object.keys(tagMap).forEach(key => {
    if (topic.includes(key)) {
      tags.push(tagMap[key]);
    }
  });
  
  return tags.join(",") || "hair transplant,hair care,hair restoration";
}

function getRandomAuthor() {
  const authors = [
    { name: "Dr. Mehmet Yılmaz", title: "Hair Transplant Surgeon", avatar: "/images/team/doctor-1.jpg" },
    { name: "Dr. Ayşe Kaya", title: "Dermatologist", avatar: "/images/team/doctor-2.jpg" },
    { name: "Dr. Emre Koç", title: "Senior Hair Transplant Specialist", avatar: "/images/team/doctor-3.jpg" },
    { name: "Dr. Ahmet Demir", title: "Hair Restoration Specialist", avatar: "/images/team/doctor-4.jpg" },
    { name: "Dr. Selim Yılmaz", title: "Regenerative Medicine Specialist", avatar: "/images/team/doctor-5.jpg" }
  ];
  
  return authors[Math.floor(Math.random() * authors.length)];
}

function generateUniqueContent(topic, language) {
  // Her konuya özgü benzersiz içerik oluşturma
  const headings = {
    "TR": ["Ne Beklemeliyiz?", "Dikkat Edilmesi Gerekenler", "Sık Sorulan Sorular", "Uzman Tavsiyeleri", "Önemli Noktalar"],
    "EN": ["What Should We Expect?", "Things to Consider", "Frequently Asked Questions", "Expert Recommendations", "Important Points"],
    "RU": ["Чего следует ожидать?", "На что обратить внимание", "Часто задаваемые вопросы", "Рекомендации экспертов", "Важные моменты"],
    "KA": ["რას უნდა ველოდეთ?", "რა უნდა გავითვალისწინოთ", "ხშირად დასმული კითხვები", "ექსპერტების რეკომენდაციები", "მნიშვნელოვანი საკითხები"]
  };
  
  const paragraphs = {
    "TR": [
      "Bu konuda yapılan araştırmalar, hastaların büyük çoğunluğunun olumlu sonuçlar aldığını göstermektedir.",
      "Profesyonel bir klinik seçimi, başarılı sonuçlar için en önemli faktörlerden biridir.",
      "Doğru bakım ve tedavi sonrası talimatların takibi, optimum sonuçlar elde etmenizi sağlar.",
      "Her hasta için kişiselleştirilmiş bir yaklaşım gereklidir, bu nedenle uzman bir doktorla konsültasyon önemlidir."
    ],
    "EN": [
      "Research conducted on this topic shows that the vast majority of patients get positive results.",
      "Choosing a professional clinic is one of the most important factors for successful results.",
      "Proper care and following post-treatment instructions ensure optimal results.",
      "A personalized approach is necessary for each patient, so consultation with an expert doctor is important."
    ],
    "RU": [
      "Исследования, проведенные по этой теме, показывают, что подавляющее большинство пациентов получают положительные результаты.",
      "Выбор профессиональной клиники является одним из наиболее важных факторов для успешных результатов.",
      "Правильный уход и следование инструкциям после лечения обеспечивают оптимальные результаты.",
      "Для каждого пациента необходим индивидуальный подход, поэтому важна консультация с врачом-экспертом."
    ],
    "KA": [
      "ამ თემაზე ჩატარებული კვლევები აჩვენებს, რომ პაციენტების დიდი უმრავლესობა იღებს დადებით შედეგებს.",
      "პროფესიონალური კლინიკის არჩევა ერთ-ერთი ყველაზე მნიშვნელოვანი ფაქტორია წარმატებული შედეგებისთვის.",
      "სათანადო მოვლა და მკურნალობის შემდგომი ინსტრუქციების შესრულება უზრუნველყოფს ოპტიმალურ შედეგებს.",
      "თითოეული პაციენტისთვის საჭიროა პერსონალიზებული მიდგომა, ამიტომ მნიშვნელოვანია კონსულტაცია ექსპერტ ექიმთან."
    ]
  };
  
  // Konuya özgü benzersiz içerik oluştur
  const selectedHeadings = [...headings[language]];
  const selectedParagraphs = [...paragraphs[language]];
  
  let content = `<h2>${topic}</h2><p>${selectedParagraphs[0]} ${topic} konusunda doğru bilgilendirme çok önemlidir.</p>`;
  
  // Her başlık için benzersiz paragraflar oluştur
  for (let i = 0; i < 4; i++) {
    const heading = selectedHeadings[i % selectedHeadings.length];
    const paragraph = selectedParagraphs[(i + 1) % selectedParagraphs.length];
    
    content += `<h2>${heading}</h2><p>${paragraph} ${topic.split(' ').slice(0, 3).join(' ')} için bu özellikle geçerlidir.</p>`;
  }
  
  // Sık Sorulan Sorular bölümü ekle
  content += `<h2>Sık Sorulan Sorular</h2><ul>
    <li><strong>${topic} için en iyi yaş nedir?</strong> Kişinin durumuna göre değişir, ancak genellikle 25 yaş üstü önerilir.</li>
    <li><strong>Tedavi süreci ne kadar sürer?</strong> Ortalama 6-8 saat süren bir işlemdir, tam iyileşme için 12-18 ay gerekebilir.</li>
    <li><strong>Sonuçlar kalıcı mıdır?</strong> Evet, doğru prosedürle sonuçlar kalıcıdır.</li>
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