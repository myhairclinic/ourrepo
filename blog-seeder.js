// Doğrudan API'yi kullanarak benzersiz blog yazıları eklemek için script
const https = require('https');
const http = require('http');
const { randomUUID } = require('crypto');

const API_BASE_URL = 'http://localhost:3000/api';

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

const createBlog = async (blogData) => {
  try {
    const result = await makeRequest(`${API_BASE_URL}/admin/blog`, 'POST', blogData);
    return result;
  } catch (error) {
    console.error('API hatası:', error);
    return null;
  }
};

const login = async () => {
  try {
    const result = await makeRequest(`${API_BASE_URL}/login`, 'POST', {
      username: 'admin',
      password: 'admin123'
    });
    return true;
  } catch (error) {
    console.error('Giriş hatası:', error);
    return false;
  }
};

async function seedBlogs() {
  try {
    // Admin olarak giriş yap
    const loggedIn = await login();
    if (!loggedIn) {
      console.error('Admin olarak giriş yapılamadı, işlem iptal ediliyor.');
      return;
    }
    
    console.log('Admin olarak giriş yapıldı, bloglar ekleniyor...');
    
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
      },
      
      // 3. Türkiye'de Saç Ekimi Deneyimi
      {
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
        imageUrl: "/images/blog/turkey-hair-transplant.jpg",
        category: "hair-transplant",
        tags: "Turkey,medical tourism,hair transplant abroad,patient experience,cost comparison",
        author: "Dr. Emre Koç",
        authorTitle: "Senior Hair Transplant Specialist",
        authorAvatar: "/images/team/doctor-3.jpg",
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
      }
    ];
    
    // Blog yazılarını ekle
    console.log(`Toplam ${uniqueBlogPosts.length} blog yazısı eklenecek...`);
    
    for (const blog of uniqueBlogPosts) {
      console.log(`"${blog.titleTR}" ekleniyor...`);
      const result = await createBlog(blog);
      if (result) {
        console.log(`"${blog.titleTR}" başarıyla eklendi.`);
      } else {
        console.error(`"${blog.titleTR}" eklenirken hata oluştu.`);
      }
    }
    
    console.log('Blog yazılarının eklenmesi tamamlandı!');
  } catch (error) {
    console.error('İşlem sırasında hata oluştu:', error);
  }
}

// Fonksiyonu çalıştır
seedBlogs();