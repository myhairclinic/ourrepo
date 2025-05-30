import { Request, Response } from "express";
import { storage } from "../storage";

// Basit bir slugify fonksiyonu
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Seed services data
export const seedServices = async (req: Request, res: Response) => {
  try {
    const services = [
      {
        slug: "hair-transplantation",
        titleTR: "Saç Ekimi",
        titleEN: "Hair Transplantation",
        titleRU: "Трансплантация Волос",
        titleKA: "თმის გადანერგვა",
        descriptionTR: "DHI ve FUE teknikleri ile doğal sonuçlar",
        descriptionEN: "Natural results with DHI and FUE techniques",
        descriptionRU: "Естественные результаты с использованием техник DHI и FUE",
        descriptionKA: "ბუნებრივი შედეგები DHI და FUE ტექნიკით",
        imageUrl: "/images/services/hair-transplant.jpg",
        detailedContentTR: "Saç ekimi, saç dökülmesi sorununu kalıcı olarak çözen cerrahi bir prosedürdür. MyHair Clinic'te, DHI ve FUE gibi en son teknikleri kullanarak doğal görünümlü sonuçlar elde etmekteyiz. İşlem 6-8 saat sürer ve lokal anestezi altında gerçekleştirilir.",
        detailedContentEN: "Hair transplantation is a surgical procedure that permanently solves the problem of hair loss. At MyHair Clinic, we achieve natural-looking results using the latest techniques such as DHI and FUE. The procedure takes 6-8 hours and is performed under local anesthesia.",
        detailedContentRU: "Трансплантация волос - это хирургическая процедура, которая навсегда решает проблему выпадения волос. В клинике MyHair мы достигаем естественно выглядящих результатов, используя новейшие методы, такие как DHI и FUE. Процедура занимает 6-8 часов и проводится под местной анестезией.",
        detailedContentKA: "თმის გადანერგვა არის ქირურგიული პროცედურა, რომელიც სამუდამოდ წყვეტს თმის ცვენის პრობლემას. MyHair კლინიკაში ჩვენ ვაღწევთ ბუნებრივად გამოყურებად შედეგებს უახლესი ტექნიკის გამოყენებით, როგორიცაა DHI და FUE. პროცედურა გრძელდება 6-8 საათი და ტარდება ლოკალური ანესთეზიით.",
        procedureDuration: "6-8 hours",
        recoveryTime: "7-10 days",
        resultTime: "8-12 months",
        procedureStepsTR: JSON.stringify([
          "Donör alanın hazırlanması",
          "Greft ekstraksiyonu",
          "Kanal açılması",
          "Greftlerin yerleştirilmesi",
          "İlk bakım talimatları"
        ]),
        procedureStepsEN: JSON.stringify([
          "Preparation of donor area",
          "Graft extraction",
          "Channel creation",
          "Placement of grafts",
          "Initial care instructions"
        ]),
        procedureStepsRU: JSON.stringify([
          "Подготовка донорской зоны",
          "Извлечение графтов",
          "Создание каналов",
          "Размещение графтов",
          "Инструкции по первоначальному уходу"
        ]),
        procedureStepsKA: JSON.stringify([
          "დონორის არეს მომზადება",
          "გრაფტის ექსტრაქცია",
          "არხის შექმნა",
          "გრაფტების განთავსება",
          "საწყისი მოვლის ინსტრუქციები"
        ]),
        idealCandidatesTR: "Saç dökülmesi yaşayan, sağlıklı, gerçekçi beklentileri olan kişiler",
        idealCandidatesEN: "People experiencing hair loss, who are healthy and have realistic expectations",
        idealCandidatesRU: "Люди, страдающие от выпадения волос, которые здоровы и имеют реалистичные ожидания",
        idealCandidatesKA: "ადამიანები, რომლებსაც აქვთ თმის ცვენა, ჯანმრთელები არიან და აქვთ რეალისტური მოლოდინები",
        aftercareTR: "Ekimden sonraki ilk günlerde başınızı yıkamamalı ve direkt güneş ışığından korumalısınız",
        aftercareEN: "In the first days after the transplant, you should not wash your head and protect it from direct sunlight",
        aftercareRU: "В первые дни после трансплантации нельзя мыть голову и следует защищать ее от прямых солнечных лучей",
        aftercareKA: "გადანერგვის შემდეგ პირველ დღეებში არ უნდა დაიბანოთ თავი და დაიცვათ ის პირდაპირი მზის სხივებისგან",
        faqsTR: JSON.stringify([
          {
            question: "Saç ekimi acı verir mi?",
            answer: "İşlem lokal anestezi altında yapıldığı için ağrı minimumdur"
          },
          {
            question: "Sonuçlar ne zaman görünür olur?",
            answer: "İlk sonuçlar 3-4 ay içinde görünmeye başlar, tam sonuçlar 8-12 ay içinde elde edilir"
          }
        ]),
        faqsEN: JSON.stringify([
          {
            question: "Is hair transplantation painful?",
            answer: "Since the procedure is performed under local anesthesia, pain is minimal"
          },
          {
            question: "When will the results become visible?",
            answer: "Initial results begin to appear within 3-4 months, with full results achieved within 8-12 months"
          }
        ]),
        faqsRU: JSON.stringify([
          {
            question: "Болезненна ли трансплантация волос?",
            answer: "Поскольку процедура проводится под местной анестезией, боль минимальна"
          },
          {
            question: "Когда результаты станут видимыми?",
            answer: "Первые результаты начинают появляться через 3-4 месяца, полные результаты достигаются через 8-12 месяцев"
          }
        ]),
        faqsKA: JSON.stringify([
          {
            question: "არის თუ არა თმის გადანერგვა მტკივნეული?",
            answer: "რადგან პროცედურა ტარდება ლოკალური ანესთეზიით, ტკივილი მინიმალურია"
          },
          {
            question: "როდის გახდება შედეგები ხილული?",
            answer: "საწყისი შედეგები იწყება 3-4 თვის განმავლობაში, სრული შედეგები მიიღწევა 8-12 თვის განმავლობაში"
          }
        ]),
        isActive: true,
        price: 1500,
        metaTitleTR: "Saç Ekimi | DHI ve FUE Teknikleri | MyHair Clinic",
        metaTitleEN: "Hair Transplantation | DHI and FUE Techniques | MyHair Clinic",
        metaTitleRU: "Трансплантация Волос | Техники DHI и FUE | MyHair Clinic",
        metaTitleKA: "თმის გადანერგვა | DHI და FUE ტექნიკა | MyHair Clinic",
        metaDescriptionTR: "MyHair Clinic'te DHI ve FUE teknikleriyle doğal görünümlü saç ekimi. Saç dökülmesine kalıcı çözüm, uzman doktorlar ve son teknoloji ekipmanlar.",
        metaDescriptionEN: "Natural-looking hair transplantation with DHI and FUE techniques at MyHair Clinic. Permanent solution to hair loss, expert doctors and state-of-the-art equipment.",
        metaDescriptionRU: "Естественно выглядящая трансплантация волос с использованием техник DHI и FUE в клинике MyHair. Постоянное решение проблемы выпадения волос, опытные врачи и современное оборудование.",
        metaDescriptionKA: "ბუნებრივად გამოყურებადი თმის გადანერგვა DHI და FUE ტექნიკით MyHair კლინიკაში. თმის ცვენის მუდმივი გადაწყვეტა, ექსპერტი ექიმები და თანამედროვე აღჭურვილობა."
      },
      {
        slug: "beard-transplantation",
        titleTR: "Sakal Ekimi",
        titleEN: "Beard Transplantation",
        titleRU: "Трансплантация Бороды",
        titleKA: "წვერის გადანერგვა",
        descriptionTR: "Seyrek sakalar için kalıcı çözüm",
        descriptionEN: "Permanent solution for sparse beards",
        descriptionRU: "Постоянное решение для редкой бороды",
        descriptionKA: "მუდმივი გადაწყვეტა თხელი წვერისთვის",
        imageUrl: "/images/services/beard-transplant.jpg",
        detailedContentTR: "Sakal ekimi, sakal büyümesi yetersiz olan erkekler için ideal bir işlemdir. Aynı saç ekiminde kullanılan teknikler kullanılarak, doğal ve kalıcı sonuçlar elde edilir. İşlem 3-5 saat sürer ve lokal anestezi altında gerçekleştirilir.",
        detailedContentEN: "Beard transplantation is an ideal procedure for men with insufficient beard growth. Using the same techniques as in hair transplantation, natural and permanent results are achieved. The procedure takes 3-5 hours and is performed under local anesthesia.",
        detailedContentRU: "Трансплантация бороды - идеальная процедура для мужчин с недостаточным ростом бороды. Используя те же методы, что и при трансплантации волос, достигаются естественные и постоянные результаты. Процедура занимает 3-5 часов и проводится под местной анестезией.",
        detailedContentKA: "წვერის გადანერგვა იდეალური პროცედურაა მამაკაცებისთვის, რომლებსაც არასაკმარისი წვერის ზრდა აქვთ. თმის გადანერგვის მსგავსი ტექნიკის გამოყენებით, მიიღწევა ბუნებრივი და მუდმივი შედეგები. პროცედურა გრძელდება 3-5 საათი და ტარდება ლოკალური ანესთეზიით.",
        procedureDuration: "3-5 hours",
        recoveryTime: "5-7 days",
        resultTime: "3-6 months",
        procedureStepsTR: JSON.stringify([
          "Donör alanın hazırlanması",
          "Greft ekstraksiyonu",
          "Alıcı alanda kanalların açılması",
          "Greftlerin yerleştirilmesi",
          "Bakım talimatları"
        ]),
        procedureStepsEN: JSON.stringify([
          "Preparation of donor area",
          "Graft extraction",
          "Creating channels in the recipient area",
          "Placement of grafts",
          "Care instructions"
        ]),
        procedureStepsRU: JSON.stringify([
          "Подготовка донорской зоны",
          "Извлечение графтов",
          "Создание каналов в зоне реципиента",
          "Размещение графтов",
          "Инструкции по уходу"
        ]),
        procedureStepsKA: JSON.stringify([
          "დონორის არეს მომზადება",
          "გრაფტის ექსტრაქცია",
          "მიმღები არეში არხების შექმნა",
          "გრაფტების განთავსება",
          "მოვლის ინსტრუქციები"
        ]),
        idealCandidatesTR: "Seyrek sakal veya sakal bölgesinde boşluklar olan erkekler",
        idealCandidatesEN: "Men with sparse beards or gaps in the beard area",
        idealCandidatesRU: "Мужчины с редкой бородой или пробелами в области бороды",
        idealCandidatesKA: "მამაკაცები თხელი წვერით ან წვერის არის სიცარიელეებით",
        aftercareTR: "İlk hafta içinde sakal bölgesini nazikçe yıkayın ve direkt güneş ışığından koruyun",
        aftercareEN: "Gently wash the beard area within the first week and protect it from direct sunlight",
        aftercareRU: "В течение первой недели аккуратно промывайте область бороды и защищайте ее от прямых солнечных лучей",
        aftercareKA: "პირველი კვირის განმავლობაში ფრთხილად დაიბანეთ წვერის არე და დაიცავით ის პირდაპირი მზის სხივებისგან",
        faqsTR: JSON.stringify([
          {
            question: "Sakal ekimi kalıcı mıdır?",
            answer: "Evet, sakal ekimi kalıcı bir çözümdür"
          },
          {
            question: "İşlem sonrası iyileşme süreci nasıldır?",
            answer: "İlk hafta içinde kızarıklık ve hafif şişlik olabilir, ancak bunlar kısa sürede geçer"
          }
        ]),
        faqsEN: JSON.stringify([
          {
            question: "Is beard transplantation permanent?",
            answer: "Yes, beard transplantation is a permanent solution"
          },
          {
            question: "How is the recovery process after the procedure?",
            answer: "There may be redness and mild swelling in the first week, but these pass quickly"
          }
        ]),
        faqsRU: JSON.stringify([
          {
            question: "Является ли трансплантация бороды постоянной?",
            answer: "Да, трансплантация бороды - это постоянное решение"
          },
          {
            question: "Каков процесс восстановления после процедуры?",
            answer: "В первую неделю может быть покраснение и легкий отек, но они быстро проходят"
          }
        ]),
        faqsKA: JSON.stringify([
          {
            question: "არის თუ არა წვერის გადანერგვა მუდმივი?",
            answer: "დიახ, წვერის გადანერგვა არის მუდმივი გადაწყვეტა"
          },
          {
            question: "როგორია აღდგენის პროცესი პროცედურის შემდეგ?",
            answer: "პირველ კვირაში შეიძლება იყოს სიწითლე და მსუბუქი შეშუპება, მაგრამ ისინი სწრაფად გაივლის"
          }
        ]),
        isActive: true,
        price: 1000,
        metaTitleTR: "Sakal Ekimi | Doğal Sonuçlar | MyHair Clinic",
        metaTitleEN: "Beard Transplantation | Natural Results | MyHair Clinic",
        metaTitleRU: "Трансплантация Бороды | Естественные Результаты | MyHair Clinic",
        metaTitleKA: "წვერის გადანერგვა | ბუნებრივი შედეგები | MyHair Clinic",
        metaDescriptionTR: "MyHair Clinic'te sakal ekimi ile doğal ve kalıcı sonuçlar. Seyrek sakallara veda edin, özgüveninizi geri kazanın.",
        metaDescriptionEN: "Natural and permanent results with beard transplantation at MyHair Clinic. Say goodbye to sparse beards and regain your confidence.",
        metaDescriptionRU: "Естественные и постоянные результаты с трансплантацией бороды в клинике MyHair. Попрощайтесь с редкой бородой и верните свою уверенность.",
        metaDescriptionKA: "ბუნებრივი და მუდმივი შედეგები წვერის გადანერგვით MyHair კლინიკაში. დაემშვიდობეთ თხელ წვერებს და დაიბრუნეთ თქვენი თავდაჯერებულობა."
      },
      {
        slug: "eyebrow-transplantation",
        titleTR: "Kaş Ekimi",
        titleEN: "Eyebrow Transplantation",
        titleRU: "Трансплантация Бровей",
        titleKA: "წარბების გადანერგვა",
        descriptionTR: "Seyrek veya olmayan kaşlar için kalıcı çözüm",
        descriptionEN: "Permanent solution for sparse or missing eyebrows",
        descriptionRU: "Постоянное решение для редких или отсутствующих бровей",
        descriptionKA: "მუდმივი გადაწყვეტა იშვიათი ან არარსებული წარბებისთვის",
        imageUrl: "/images/services/eyebrow-transplant.jpg",
        detailedContentTR: "Kaş ekimi, seyrek veya şekli bozulmuş kaşlar için kalıcı bir çözüm sunar. MyHair Clinic'te en son teknikler kullanılarak, doğal görünümlü ve yüz hatlarınıza uygun kaşlar oluşturulur. İşlem 2-3 saat sürer ve lokal anestezi altında gerçekleştirilir.",
        detailedContentEN: "Eyebrow transplantation offers a permanent solution for sparse or misshapen eyebrows. At MyHair Clinic, using the latest techniques, we create natural-looking eyebrows that match your facial features. The procedure takes 2-3 hours and is performed under local anesthesia.",
        detailedContentRU: "Трансплантация бровей предлагает постоянное решение для редких или деформированных бровей. В клинике MyHair, используя новейшие методы, мы создаем естественно выглядящие брови, соответствующие вашим чертам лица. Процедура занимает 2-3 часа и проводится под местной анестезией.",
        detailedContentKA: "წარბების გადანერგვა გთავაზობთ მუდმივ გადაწყვეტას იშვიათი ან დეფორმირებული წარბებისთვის. MyHair კლინიკაში, უახლესი ტექნიკის გამოყენებით, ჩვენ ვქმნით ბუნებრივად გამოყურებად წარბებს, რომლებიც შეესაბამება თქვენს სახის თვისებებს. პროცედურა გრძელდება 2-3 საათი და ტარდება ლოკალური ანესთეზიით.",
        procedureDuration: "2-3 hours",
        recoveryTime: "7-10 days",
        resultTime: "3-6 months",
        procedureStepsTR: JSON.stringify([
          "Kaş tasarımı ve planlama",
          "Donör alanın hazırlanması",
          "Greft ekstraksiyonu",
          "Kaş alanında kanalların açılması",
          "Greftlerin yerleştirilmesi"
        ]),
        procedureStepsEN: JSON.stringify([
          "Eyebrow design and planning",
          "Preparation of donor area",
          "Graft extraction",
          "Creating channels in the eyebrow area",
          "Placement of grafts"
        ]),
        procedureStepsRU: JSON.stringify([
          "Дизайн и планирование бровей",
          "Подготовка донорской зоны",
          "Извлечение графтов",
          "Создание каналов в области бровей",
          "Размещение графтов"
        ]),
        procedureStepsKA: JSON.stringify([
          "წარბების დიზაინი და დაგეგმვა",
          "დონორის არეს მომზადება",
          "გრაფტის ექსტრაქცია",
          "წარბების არეში არხების შექმნა",
          "გრაფტების განთავსება"
        ]),
        idealCandidatesTR: "Seyrek, asimetrik veya şekli bozulmuş kaşlara sahip kişiler",
        idealCandidatesEN: "People with sparse, asymmetrical, or misshapen eyebrows",
        idealCandidatesRU: "Люди с редкими, асимметричными или деформированными бровями",
        idealCandidatesKA: "ადამიანები იშვიათი, ასიმეტრიული ან დეფორმირებული წარბებით",
        aftercareTR: "İlk hafta boyunca kaşları ıslatmaktan kaçının ve direkt güneş ışığına maruz bırakmayın",
        aftercareEN: "Avoid wetting the eyebrows during the first week and do not expose them to direct sunlight",
        aftercareRU: "Избегайте намокания бровей в течение первой недели и не подвергайте их воздействию прямых солнечных лучей",
        aftercareKA: "მოერიდეთ წარბების დასველებას პირველი კვირის განმავლობაში და არ გამოფინოთ ისინი პირდაპირი მზის სხივებზე",
        faqsTR: JSON.stringify([
          {
            question: "Kaş ekimi sonuçları doğal görünür mü?",
            answer: "Evet, deneyimli uzmanlarımız tarafından yapılan kaş ekimi işlemi son derece doğal sonuçlar verir"
          },
          {
            question: "Kaş ekiminden sonra kaşlarımı kesmeye devam etmem gerekecek mi?",
            answer: "Evet, transplant edilen saç folikülleri normal saç özellikleri gösterir ve düzenli kesim gerektirir"
          }
        ]),
        faqsEN: JSON.stringify([
          {
            question: "Do eyebrow transplantation results look natural?",
            answer: "Yes, eyebrow transplantation performed by our experienced specialists gives extremely natural results"
          },
          {
            question: "Will I need to continue trimming my eyebrows after transplantation?",
            answer: "Yes, the transplanted hair follicles exhibit normal hair characteristics and require regular trimming"
          }
        ]),
        faqsRU: JSON.stringify([
          {
            question: "Выглядят ли результаты трансплантации бровей естественно?",
            answer: "Да, трансплантация бровей, выполненная нашими опытными специалистами, дает чрезвычайно естественные результаты"
          },
          {
            question: "Нужно ли мне будет продолжать подстригать брови после трансплантации?",
            answer: "Да, пересаженные волосяные фолликулы демонстрируют нормальные характеристики волос и требуют регулярной стрижки"
          }
        ]),
        faqsKA: JSON.stringify([
          {
            question: "არის თუ არა წარბების გადანერგვის შედეგები ბუნებრივი?",
            answer: "დიახ, წარბების გადანერგვა ჩვენი გამოცდილი სპეციალისტების მიერ იძლევა უკიდურესად ბუნებრივ შედეგებს"
          },
          {
            question: "დამჭირდება თუ არა წარბების გასწორება გადანერგვის შემდეგ?",
            answer: "დიახ, გადანერგილ თმის ფოლიკულებს აქვთ ნორმალური თმის მახასიათებლები და საჭიროებენ რეგულარულ გასწორებას"
          }
        ]),
        isActive: true,
        price: 800,
        metaTitleTR: "Kaş Ekimi | Doğal ve Kalıcı Sonuçlar | MyHair Clinic",
        metaTitleEN: "Eyebrow Transplantation | Natural and Permanent Results | MyHair Clinic",
        metaTitleRU: "Трансплантация Бровей | Естественные и Постоянные Результаты | MyHair Clinic",
        metaTitleKA: "წარბების გადანერგვა | ბუნებრივი და მუდმივი შედეგები | MyHair Clinic",
        metaDescriptionTR: "MyHair Clinic'te kaş ekimi ile doğal ve kalıcı sonuçlar. Seyrek, asimetrik veya olmayan kaşlar için kalıcı çözüm.",
        metaDescriptionEN: "Natural and permanent results with eyebrow transplantation at MyHair Clinic. Permanent solution for sparse, asymmetrical, or missing eyebrows.",
        metaDescriptionRU: "Естественные и постоянные результаты с трансплантацией бровей в клинике MyHair. Постоянное решение для редких, асимметричных или отсутствующих бровей.",
        metaDescriptionKA: "ბუნებრივი და მუდმივი შედეგები წარბების გადანერგვით MyHair კლინიკაში. მუდმივი გადაწყვეტა იშვიათი, ასიმეტრიული ან არარსებული წარბებისთვის."
      },
      {
        slug: "prp-treatment",
        titleTR: "PRP Tedavisi",
        titleEN: "PRP Treatment",
        titleRU: "Лечение PRP",
        titleKA: "PRP მკურნალობა",
        descriptionTR: "Saç dökülmesini durdurma ve saç kalitesini artırma",
        descriptionEN: "Stop hair loss and improve hair quality",
        descriptionRU: "Остановка выпадения волос и улучшение качества волос",
        descriptionKA: "თმის ცვენის შეჩერება და თმის ხარისხის გაუმჯობესება",
        imageUrl: "/images/services/prp-treatment.jpg",
        detailedContentTR: "PRP (Platelet Rich Plasma) tedavisi, kendi kanınızdan elde edilen trombositten zengin plazmanın saçlı deriye enjekte edilmesi işlemidir. Bu tedavi, saç dökülmesini yavaşlatır, saç büyümesini uyarır ve saç kalitesini artırır. İşlem yaklaşık 30-45 dakika sürer ve genellikle 3-4 seans önerilir.",
        detailedContentEN: "PRP (Platelet Rich Plasma) treatment is the process of injecting platelet-rich plasma derived from your own blood into the scalp. This treatment slows down hair loss, stimulates hair growth, and improves hair quality. The procedure takes approximately 30-45 minutes, and typically 3-4 sessions are recommended.",
        detailedContentRU: "Лечение PRP (Platelet Rich Plasma, богатая тромбоцитами плазма) - это процесс введения богатой тромбоцитами плазмы, полученной из вашей собственной крови, в кожу головы. Это лечение замедляет выпадение волос, стимулирует рост волос и улучшает качество волос. Процедура занимает примерно 30-45 минут, обычно рекомендуется 3-4 сеанса.",
        detailedContentKA: "PRP (თრომბოციტებით მდიდარი პლაზმა) მკურნალობა არის თქვენი საკუთარი სისხლიდან მიღებული თრომბოციტებით მდიდარი პლაზმის თავის კანში ინექცია. ეს მკურნალობა ანელებს თმის ცვენას, ასტიმულირებს თმის ზრდას და აუმჯობესებს თმის ხარისხს. პროცედურა გრძელდება დაახლოებით 30-45 წუთი და როგორც წესი, რეკომენდებულია 3-4 სეანსი.",
        procedureDuration: "30-45 minutes",
        recoveryTime: "Immediate",
        resultTime: "3-6 months",
        procedureStepsTR: JSON.stringify([
          "Kan alımı",
          "Plazmanın ayrıştırılması",
          "PRP'nin hazırlanması",
          "Saçlı deriye enjeksiyon"
        ]),
        procedureStepsEN: JSON.stringify([
          "Blood collection",
          "Separation of plasma",
          "Preparation of PRP",
          "Injection into the scalp"
        ]),
        procedureStepsRU: JSON.stringify([
          "Забор крови",
          "Отделение плазмы",
          "Подготовка PRP",
          "Инъекция в кожу головы"
        ]),
        procedureStepsKA: JSON.stringify([
          "სისხლის აღება",
          "პლაზმის გამოყოფა",
          "PRP-ის მომზადება",
          "ინექცია თავის კანში"
        ]),
        idealCandidatesTR: "Saç dökülmesi yaşayan, saç kalitesini artırmak isteyen veya saç ekimi sonrası iyileşmeyi hızlandırmak isteyen kişiler",
        idealCandidatesEN: "People experiencing hair loss, wanting to improve hair quality, or looking to accelerate recovery after hair transplantation",
        idealCandidatesRU: "Люди, испытывающие выпадение волос, желающие улучшить качество волос или ускорить восстановление после трансплантации волос",
        idealCandidatesKA: "ადამიანები, რომლებსაც აქვთ თმის ცვენა, სურთ თმის ხარისხის გაუმჯობესება ან თმის გადანერგვის შემდეგ აღდგენის დაჩქარება",
        aftercareTR: "İşlem sonrası aynı gün saçlarınızı yıkayabilir ve normal aktivitelerinize dönebilirsiniz",
        aftercareEN: "After the procedure, you can wash your hair the same day and return to your normal activities",
        aftercareRU: "После процедуры вы можете помыть волосы в тот же день и вернуться к своей обычной деятельности",
        aftercareKA: "პროცედურის შემდეგ, შეგიძლიათ დაიბანოთ თმა იმავე დღეს და დაუბრუნდეთ თქვენს ჩვეულებრივ საქმიანობას",
        faqsTR: JSON.stringify([
          {
            question: "PRP tedavisi ağrılı mıdır?",
            answer: "İşlem öncesi uygulanan lokal anestezi sayesinde minimal düzeyde rahatsızlık hissedilir"
          },
          {
            question: "Kaç seans PRP tedavisi gereklidir?",
            answer: "Optimum sonuçlar için genellikle 4-6 hafta aralıklarla 3-4 seans önerilir"
          }
        ]),
        faqsEN: JSON.stringify([
          {
            question: "Is PRP treatment painful?",
            answer: "Thanks to local anesthesia applied before the procedure, minimal discomfort is felt"
          },
          {
            question: "How many sessions of PRP treatment are required?",
            answer: "For optimal results, typically 3-4 sessions at 4-6 week intervals are recommended"
          }
        ]),
        faqsRU: JSON.stringify([
          {
            question: "Болезненно ли лечение PRP?",
            answer: "Благодаря местной анестезии, применяемой перед процедурой, ощущается минимальный дискомфорт"
          },
          {
            question: "Сколько сеансов лечения PRP требуется?",
            answer: "Для оптимальных результатов обычно рекомендуется 3-4 сеанса с интервалом в 4-6 недель"
          }
        ]),
        faqsKA: JSON.stringify([
          {
            question: "არის თუ არა PRP მკურნალობა მტკივნეული?",
            answer: "პროცედურის წინ ადგილობრივი ანესთეზიის წყალობით, მინიმალური დისკომფორტი იგრძნობა"
          },
          {
            question: "რამდენი სეანსი PRP მკურნალობაა საჭირო?",
            answer: "ოპტიმალური შედეგებისთვის, ჩვეულებრივ რეკომენდებულია 3-4 სეანსი 4-6 კვირის ინტერვალით"
          }
        ]),
        isActive: true,
        price: 300,
        metaTitleTR: "PRP Tedavisi | Saç Dökülmesine Karşı Etkili Çözüm | MyHair Clinic",
        metaTitleEN: "PRP Treatment | Effective Solution Against Hair Loss | MyHair Clinic",
        metaTitleRU: "Лечение PRP | Эффективное Решение Против Выпадения Волос | MyHair Clinic",
        metaTitleKA: "PRP მკურნალობა | ეფექტური გადაწყვეტა თმის ცვენის წინააღმდეგ | MyHair Clinic",
        metaDescriptionTR: "MyHair Clinic'te PRP tedavisi ile saç dökülmesini durdurun ve saç kalitesini artırın. Kendi kanınızdan elde edilen trombositlerle doğal iyileşme süreci.",
        metaDescriptionEN: "Stop hair loss and improve hair quality with PRP treatment at MyHair Clinic. Natural healing process with platelets derived from your own blood.",
        metaDescriptionRU: "Остановите выпадение волос и улучшите качество волос с помощью лечения PRP в клинике MyHair. Естественный процесс заживления с тромбоцитами из вашей собственной крови.",
        metaDescriptionKA: "შეაჩერეთ თმის ცვენა და გააუმჯობესეთ თმის ხარისხი PRP მკურნალობით MyHair კლინიკაში. ბუნებრივი გაჯანსაღების პროცესი თქვენი საკუთარი სისხლიდან მიღებული თრომბოციტებით."
      },
      {
        slug: "hair-mesotherapy",
        titleTR: "Saç Mezoterapisi",
        titleEN: "Hair Mesotherapy",
        titleRU: "Мезотерапия Волос",
        titleKA: "თმის მეზოთერაპია",
        descriptionTR: "Saç köklerini besleyen ve güçlendiren tedavi",
        descriptionEN: "Treatment that nourishes and strengthens hair follicles",
        descriptionRU: "Лечение, питающее и укрепляющее волосяные фолликулы",
        descriptionKA: "მკურნალობა, რომელიც კვებავს და აძლიერებს თმის ფოლიკულებს",
        imageUrl: "/images/services/hair-mesotherapy.jpg",
        detailedContentTR: "Saç mezoterapisi, vitaminler, mineraller, amino asitler ve hyaluronik asit içeren özel karışımların saçlı deriye enjekte edildiği bir tedavi yöntemidir. Bu tedavi, saç köklerini besler, kan dolaşımını artırır ve saç dökülmesini azaltarak yeni saç büyümesini teşvik eder. İşlem yaklaşık 30-45 dakika sürer.",
        detailedContentEN: "Hair mesotherapy is a treatment method in which special mixtures containing vitamins, minerals, amino acids, and hyaluronic acid are injected into the scalp. This treatment nourishes hair follicles, increases blood circulation, and promotes new hair growth by reducing hair loss. The procedure takes approximately 30-45 minutes.",
        detailedContentRU: "Мезотерапия волос - это метод лечения, при котором специальные смеси, содержащие витамины, минералы, аминокислоты и гиалуроновую кислоту, вводятся в кожу головы. Это лечение питает волосяные фолликулы, улучшает кровообращение и способствует росту новых волос, уменьшая выпадение волос. Процедура занимает примерно 30-45 минут.",
        detailedContentKA: "თმის მეზოთერაპია არის მკურნალობის მეთოდი, რომლის დროსაც სპეციალური ნარევები, რომლებიც შეიცავს ვიტამინებს, მინერალებს, ამინომჟავებს და ჰიალურონის მჟავას, შეიყვანება თავის კანში. ეს მკურნალობა კვებავს თმის ფოლიკულებს, ზრდის სისხლის მიმოქცევას და ხელს უწყობს ახალი თმის ზრდას თმის ცვენის შემცირებით. პროცედურა გრძელდება დაახლოებით 30-45 წუთი.",
        procedureDuration: "30-45 minutes",
        recoveryTime: "Immediate",
        resultTime: "2-3 months",
        procedureStepsTR: JSON.stringify([
          "Saçlı derinin temizlenmesi",
          "Mezoterapi solüsyonunun hazırlanması",
          "Mikro enjeksiyonlar",
          "Saçlı deriye masaj yapılması"
        ]),
        procedureStepsEN: JSON.stringify([
          "Cleansing of scalp",
          "Preparation of mesotherapy solution",
          "Micro-injections",
          "Massage of the scalp"
        ]),
        procedureStepsRU: JSON.stringify([
          "Очищение кожи головы",
          "Подготовка раствора для мезотерапии",
          "Микроинъекции",
          "Массаж кожи головы"
        ]),
        procedureStepsKA: JSON.stringify([
          "თავის კანის გაწმენდა",
          "მეზოთერაპიის ხსნარის მომზადება",
          "მიკრო-ინექციები",
          "თავის კანის მასაჟი"
        ]),
        idealCandidatesTR: "Saç dökülmesinin erken evrelerinde olan, saç incelmesi yaşayan veya saç kalitesini artırmak isteyen kişiler",
        idealCandidatesEN: "People in the early stages of hair loss, experiencing hair thinning, or wanting to improve hair quality",
        idealCandidatesRU: "Люди на ранних стадиях выпадения волос, испытывающие истончение волос или желающие улучшить качество волос",
        idealCandidatesKA: "ადამიანები თმის ცვენის ადრეულ ეტაპებზე, თმის გათხელებით ან თმის ხარისხის გაუმჯობესების სურვილით",
        aftercareTR: "İşlem sonrası 24 saat saçlarınızı yıkamamanız ve güneşten korumanız önerilir",
        aftercareEN: "It is recommended not to wash your hair for 24 hours after the procedure and to protect it from the sun",
        aftercareRU: "Рекомендуется не мыть волосы в течение 24 часов после процедуры и защищать их от солнца",
        aftercareKA: "რეკომენდებულია არ დაიბანოთ თმა პროცედურის შემდეგ 24 საათის განმავლობაში და დაიცვათ ის მზისგან",
        faqsTR: JSON.stringify([
          {
            question: "Saç mezoterapisi kimlere önerilir?",
            answer: "Saç dökülmesi yaşayan, saç kalitesi düşük olan veya saç büyümesini hızlandırmak isteyen kişilere önerilir"
          },
          {
            question: "Kaç seans saç mezoterapisi gerekir?",
            answer: "Genellikle 2-4 haftalık aralıklarla 6-8 seans önerilir, ardından 2-3 ayda bir bakım seansları yapılabilir"
          }
        ]),
        faqsEN: JSON.stringify([
          {
            question: "Who is hair mesotherapy recommended for?",
            answer: "It is recommended for people experiencing hair loss, with low hair quality, or wanting to accelerate hair growth"
          },
          {
            question: "How many sessions of hair mesotherapy are required?",
            answer: "Usually 6-8 sessions at 2-4 week intervals are recommended, followed by maintenance sessions every 2-3 months"
          }
        ]),
        faqsRU: JSON.stringify([
          {
            question: "Кому рекомендуется мезотерапия волос?",
            answer: "Рекомендуется людям с выпадением волос, с низким качеством волос или желающим ускорить рост волос"
          },
          {
            question: "Сколько сеансов мезотерапии волос требуется?",
            answer: "Обычно рекомендуется 6-8 сеансов с интервалом в 2-4 недели, затем поддерживающие сеансы каждые 2-3 месяца"
          }
        ]),
        faqsKA: JSON.stringify([
          {
            question: "ვისთვის არის რეკომენდებული თმის მეზოთერაპია?",
            answer: "რეკომენდებულია ადამიანებისთვის, რომლებსაც აქვთ თმის ცვენა, დაბალი თმის ხარისხი ან სურთ თმის ზრდის დაჩქარება"
          },
          {
            question: "რამდენი სეანსი თმის მეზოთერაპიაა საჭირო?",
            answer: "ჩვეულებრივ რეკომენდებულია 6-8 სეანსი 2-4 კვირის ინტერვალით, შემდეგ კი შემანარჩუნებელი სეანსები ყოველ 2-3 თვეში"
          }
        ]),
        isActive: true,
        price: 200,
        metaTitleTR: "Saç Mezoterapisi | Saç Köklerini Besleyen Tedavi | MyHair Clinic",
        metaTitleEN: "Hair Mesotherapy | Treatment That Nourishes Hair Follicles | MyHair Clinic",
        metaTitleRU: "Мезотерапия Волос | Лечение, Питающее Волосяные Фолликулы | MyHair Clinic",
        metaTitleKA: "თმის მეზოთერაპია | მკურნალობა, რომელიც კვებავს თმის ფოლიკულებს | MyHair Clinic",
        metaDescriptionTR: "MyHair Clinic'te saç mezoterapisi ile saç köklerinizi besleyin ve güçlendirin. Vitaminler, mineraller ve amino asitler içeren özel formülümüzle saç dökülmesini azaltın.",
        metaDescriptionEN: "Nourish and strengthen your hair follicles with hair mesotherapy at MyHair Clinic. Reduce hair loss with our special formula containing vitamins, minerals, and amino acids.",
        metaDescriptionRU: "Питайте и укрепляйте волосяные фолликулы с помощью мезотерапии волос в клинике MyHair. Уменьшите выпадение волос с нашей специальной формулой, содержащей витамины, минералы и аминокислоты.",
        metaDescriptionKA: "კვებეთ და გააძლიერეთ თქვენი თმის ფოლიკულები თმის მეზოთერაპიით MyHair კლინიკაში. შეამცირეთ თმის ცვენა ჩვენი სპეციალური ფორმულით, რომელიც შეიცავს ვიტამინებს, მინერალებს და ამინომჟავებს."
      }
    ];

    // Add each service to the database
    for (const service of services) {
      await storage.createService(service);
    }

    res.status(200).json({ message: "Services seeded successfully" });
  } catch (error) {
    console.error("Error seeding services:", error);
    res.status(500).json({ error: "Failed to seed services" });
  }
};

// Seed new country packages only (Azerbaijan and Kazakhstan)
export const seedNewCountryPackages = async (req: Request, res: Response) => {
  try {
    const packages = [
      {
        slug: "premium-hair-transplant-az-new",
        titleTR: "Premium Saç Ekimi Paketi - Azerbaycan",
        titleEN: "Premium Hair Transplant Package - Azerbaijan",
        titleRU: "Премиум Пакет Трансплантации Волос - Азербайджан",
        titleKA: "პრემიუმ თმის გადანერგვის პაკეტი - აზერბაიჯანი",
        descriptionTR: "Azerbaycan'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren kapsamlı saç ekimi paketi",
        descriptionEN: "Comprehensive hair transplantation package including luxury accommodation and exclusive services for our guests from Azerbaijan",
        descriptionRU: "Комплексный пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Азербайджана",
        descriptionKA: "ყოვლისმომცველი თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის აზერბაიჯანიდან",
        contentTR: "Azerbaycan'dan gelen hastalarımız için özel olarak hazırlanmış bu paket, saç ekimi işlemi ve Bakü'den kolayca ulaşım sağlanan Tiflis'te konforlu bir deneyim sunuyor. 5 yıldızlı otelde konaklama, VIP transfer ve rehberli tur dahildir.",
        contentEN: "Specially prepared for our patients from Azerbaijan, this package offers a comfortable experience in Tbilisi with easy transportation from Baku. 5-star hotel accommodation, VIP transfer, and guided tour are included.",
        contentRU: "Специально подготовленный для наших пациентов из Азербайджана, этот пакет предлагает комфортное пребывание в Тбилиси с удобным транспортом из Баку. Проживание в 5-звездочном отеле, VIP transfer, and guided tour are included.",
        contentKA: "სპეციალურად მომზადებული ჩვენი პაციენტებისთვის აზერბაიჯანიდან, ეს პაკეტი გთავაზობთ კომფორტულ გამოცდილებას თბილისში ბაქოდან ადვილი ტრანსპორტირებით. 5-ვარსკვლავიანი სასტუმროს საცხოვრებელი, VIP ტრანსფერი და გიდთან ტური შედის.",
        imageUrl: "/images/packages/premium-package-az.jpg",
        countryOrigin: "AZ",
        countryCode: "AZ",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece konaklama (kahvaltı dahil)",
        accommodationEN: "4 nights in a 5-star hotel (breakfast included)",
        accommodationRU: "4 ночи в 5-звездочном отеле (включая завтрак)",
        accommodationKA: "4 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "VIP sınır geçişi yardımı ve şehir içi ulaşım",
        transportationEN: "VIP border crossing assistance and city transportation",
        transportationRU: "VIP-помощь при пересечении границы и городской транспорт",
        transportationKA: "VIP საზღვრის გადაკვეთის დახმარება და ქალაქის ტრანსპორტი",
        activitiesTR: "Şehir turu ve geleneksel Azerbaycan restoranında akşam yemeği",
        activitiesEN: "City tour and dinner at a traditional Azerbaijani restaurant",
        activitiesRU: "Экскурсия по городу и ужин в традиционном азербайджанском ресторане",
        activitiesKA: "ქალაქის ტური და ვახშამი ტრადიციულ აზერბაიჯანულ რესტორანში",
        isFeatured: true,
        highlights: JSON.stringify([
          "Azerbaycanca konuşan kişisel rehber",
          "Premium saç analizi",
          "Azerbaycan TV kanalları",
          "Azerbaycan çayı servisi"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/premium-az-1.jpg",
          "/images/packages/premium-az-2.jpg",
          "/images/packages/premium-az-3.jpg"
        ]),
        reviewsTR: "Harika bir deneyimdi! Sınır geçişinde büyük yardım aldık ve tedavi sürecinde çok rahat ettik.",
        reviewsEN: "It was a wonderful experience! We received great help with the border crossing and felt very comfortable during the treatment process.",
        reviewsRU: "Это был замечательный опыт! Мы получили отличную помощь при пересечении границы и чувствовали себя очень комфортно во время лечения.",
        reviewsKA: "ეს იყო შესანიშნავი გამოცდილება! მივიღეთ დიდი დახმარება საზღვრის გადაკვეთაში და თავს ძალიან კომფორტულად ვგრძნობდით მკურნალობის პროცესში."
      },
      {
        slug: "premium-hair-transplant-kz-new",
        titleTR: "Premium Saç Ekimi Paketi - Kazakistan",
        titleEN: "Premium Hair Transplant Package - Kazakhstan",
        titleRU: "Премиум Пакет Трансплантации Волос - Казахстан",
        titleKA: "პრემიუმ თმის გადანერგვის პაკეტი - ყაზახეთი",
        descriptionTR: "Kazakistan'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren kapsamlı saç ekimi paketi",
        descriptionEN: "Comprehensive hair transplantation package including luxury accommodation and exclusive services for our guests from Kazakhstan",
        descriptionRU: "Комплексный пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Казахстана",
        descriptionKA: "ყოვლისმომცველი თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის ყაზახეთიდან",
        contentTR: "Kazakistan'dan gelen hastalarımız için özel olarak hazırlanmış bu paket, saç ekimi işlemi ve Tiflis'te konforlu bir tatil deneyimi sunuyor. Doğrudan uçuşlar, 5 yıldızlı otelde konaklama, VIP transfer ve rehberli tur dahildir.",
        contentEN: "Specially prepared for our patients from Kazakhstan, this package offers a comfortable vacation experience in Tbilisi. Direct flights, 5-star hotel accommodation, VIP transfer, and guided tour are included.",
        contentRU: "Специально подготовленный для наших пациентов из Казахстана, этот пакет предлагает комфортный отдых в Тбилиси. Прямые рейсы, проживание в 5-звездочном отеле, VIP-трансфер и экскурсия с гидом включены.",
        contentKA: "სპეციალურად მომზადებული ჩვენი პაციენტებისთვის ყაზახეთიდან, ეს პაკეტი გთავაზობთ კომფორტულ დასვენებას თბილისში. პირდაპირი ფრენები, 5-ვარსკვლავიანი სასტუმროს საცხოვრებელი, VIP ტრანსფერი და გიდთან ტური შედის.",
        imageUrl: "/images/packages/premium-package-kz.jpg",
        countryOrigin: "KZ",
        countryCode: "KZ",
        durationDays: 7,
        accommodationTR: "5 yıldızlı otelde 6 gece konaklama (kahvaltı dahil)",
        accommodationEN: "6 nights in a 5-star hotel (breakfast included)",
        accommodationRU: "6 ночей в 5-звездочном отеле (включая завтрак)",
        accommodationKA: "6 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "Havalimanı VIP karşılama ve şehir içi özel ulaşım",
        transportationEN: "Airport VIP meeting and private city transportation",
        transportationRU: "VIP-встреча в аэропорту и частный городской транспорт",
        transportationKA: "აეროპორტის VIP შეხვედრა და კერძო ქალაქის ტრანსპორტი",
        activitiesTR: "Kapsamlı şehir turu ve Gürcistan'ın ünlü şarap bölgesi Kakheti'ye gezi",
        activitiesEN: "Comprehensive city tour and trip to Georgia's famous wine region Kakheti",
        activitiesRU: "Комплексная экскурсия по городу и поездка в знаменитый винный регион Грузии Кахетию",
        activitiesKA: "ყოვლისმომცველი ქალაქის ტური და მოგზაურობა საქართველოს ცნობილ ღვინის რეგიონში კახეთში",
        isFeatured: true,
        highlights: JSON.stringify([
          "Rusça konuşan kişisel rehber",
          "Premium saç analizi",
          "Kazak TV kanalları",
          "Uzun mesafe seyahat sonrası masaj"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/premium-kz-1.jpg",
          "/images/packages/premium-kz-2.jpg",
          "/images/packages/premium-kz-3.jpg"
        ]),
        reviewsTR: "Harika bir deneyimdi! Uzun seyahat sonrası tüm yorgunluğumuzu aldılar ve tedavi süreci mükemmeldi.",
        reviewsEN: "It was a great experience! They took away all our fatigue after the long journey and the treatment process was perfect.",
        reviewsRU: "Это был отличный опыт! Они сняли всю нашу усталость после долгого путешествия, и процесс лечения был идеальным.",
        reviewsKA: "ეს იყო შესანიშნავი გამოცდილება! მათ მოგვცილეს ჩვენი მთელი დაღლილობა გრძელი მოგზაურობის შემდეგ და მკურნალობის პროცესი იყო სრულყოფილი."
      }
    ];

    for (const pkg of packages) {
      await storage.createPackage(pkg);
    }

    res.status(200).json({ message: "New country packages seeded successfully" });
  } catch (error) {
    console.error("Error seeding new country packages:", error);
    res.status(500).json({ error: "Failed to seed new country packages" });
  }
};

// Seed travel packages data
export const seedPackages = async (req: Request, res: Response) => {
  try {
    const packages = [
      // Türkiye için lüks saç ekimi paketi
      {
        slug: "luks-sac-ekimi-paketi-tr",
        titleTR: "Lüks Saç Ekimi Paketi - Türkiye",
        titleEN: "Luxury Hair Transplant Package - Turkey",
        titleRU: "Люкс Пакет Трансплантации Волос - Турция",
        titleKA: "ლუქსი თმის გადანერგვის პაკეტი - თურქეთი",
        descriptionTR: "Türkiye'den gelen misafirlerimiz için lüks konaklama ve özel servisler içeren premium saç ekimi paketi",
        descriptionEN: "Premium hair transplantation package including luxury accommodation and exclusive services for our guests from Turkey",
        descriptionRU: "Премиум пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Турции",
        descriptionKA: "პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის თურქეთიდან",
        contentTR: "Türkiye'den gelen hastalarımız için özel olarak hazırlanmış bu lüks paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transferler ve şehir turu dahildir.",
        contentEN: "This luxury package, specially prepared for our patients from Turkey, combines hair transplant treatment with a comfortable vacation experience. Includes accommodation in a 5-star hotel, VIP transfers, and city tour.",
        contentRU: "Этот люкс пакет, специально подготовленный для наших пациентов из Турции, сочетает лечение по трансплантации волос с комфортным отдыхом. Включает проживание в 5-звездочном отеле, VIP-трансферы и экскурсию по городу.",
        contentKA: "ეს ლუქსი პაკეტი, სპეციალურად მომზადებული ჩვენი პაციენტებისთვის თურქეთიდან, აერთიანებს თმის გადანერგვის მკურნალობას კომფორტულ დასვენებასთან. მოიცავს 5-ვარსკვლავიან სასტუმროში განთავსებას, VIP ტრანსფერებს და ქალაქის ტურს.",
        imageUrl: "/images/packages/luxury-package.jpg",
        countryOrigin: "TR",
        countryCode: "TR",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece lüks konaklama",
        accommodationEN: "4 nights luxury accommodation in a 5-star hotel",
        accommodationRU: "4 ночи в роскошном номере 5-звездочного отеля",
        accommodationKA: "4 ღამის ლუქსი განთავსება 5-ვარსკვლავიან სასტუმროში",
        transportationTR: "VIP havalimanı transferleri ve özel araç",
        transportationEN: "VIP airport transfers and private vehicle",
        transportationRU: "VIP трансферы из аэропорта и частный автомобиль",
        transportationKA: "VIP აეროპორტის ტრანსფერები და კერძო მანქანა",
        activitiesTR: "Özel şehir turu ve lüks spa deneyimi",
        activitiesEN: "Private city tour and luxury spa experience",
        activitiesRU: "Частная экскурсия по городу и роскошный спа-опыт",
        activitiesKA: "კერძო ქალაქის ტური და ლუქსის სპა გამოცდილება",
        highlights: JSON.stringify([
          "VIP karşılama",
          "Premium saç analizi",
          "Lüks konaklama",
          "Özel transferler"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/luxury-1.jpg",
          "/images/packages/luxury-2.jpg",
          "/images/packages/luxury-3.jpg"
        ]),
        packageType: "luxury" as "luxury",
        isAllInclusive: true,
        isFeatured: true
      },
      
      // Rusya için lüks saç ekimi paketi
      {
        slug: "luks-sac-ekimi-paketi-ru",
        titleTR: "Lüks Saç Ekimi Paketi - Rusya",
        titleEN: "Luxury Hair Transplant Package - Russia",
        titleRU: "Люкс Пакет Трансплантации Волос - Россия",
        titleKA: "ლუქსი თმის გადანერგვის პაკეტი - რუსეთი",
        descriptionTR: "Rusya'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren premium saç ekimi paketi",
        descriptionEN: "Premium hair transplantation package including luxury accommodation and exclusive services for our guests from Russia",
        descriptionRU: "Премиум пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из России",
        descriptionKA: "პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის რუსეთიდან",
        contentTR: "Rusya'dan gelen hastalarımız için özel olarak hazırlanmış bu lüks paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transferler ve şehir turu dahildir.",
        contentEN: "This luxury package, specially prepared for our patients from Russia, combines hair transplant treatment with a comfortable vacation experience. Includes accommodation in a 5-star hotel, VIP transfers, and city tour.",
        contentRU: "Этот люкс пакет, специально подготовленный для наших пациентов из России, сочетает лечение по трансплантации волос с комфортным отдыхом. Включает проживание в 5-звездочном отеле, VIP-трансферы и экскурсию по городу.",
        contentKA: "ეს ლუქსი პაკეტი, სპეციალურად მომზადებული ჩვენი რუსი პაციენტებისთვის რუსეთიდან, აერთიანებს თმის გადანერგვის მკურნალობას კომფორტულ დასვენებასთან. მოიცავს 5-ვარსკვლავიან სასტუმროში განთავსებას, VIP ტრანსფერებს და ქალაქის ტურს.",
        imageUrl: "/images/packages/luxury-package.jpg",
        countryOrigin: "RU",
        countryCode: "RU",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece lüks konaklama",
        accommodationEN: "4 nights luxury accommodation in a 5-star hotel",
        accommodationRU: "4 ночи в роскошном номере 5-звездочного отеля",
        accommodationKA: "4 ღამის ლუქსი განთავსება 5-ვარსკვლავიან სასტუმროში",
        transportationTR: "VIP havalimanı transferleri ve özel araç",
        transportationEN: "VIP airport transfers and private vehicle",
        transportationRU: "VIP трансферы из аэропорта и частный автомобиль",
        transportationKA: "VIP აეროპორტის ტრანსფერები და კერძო მანქანა",
        activitiesTR: "Özel şehir turu ve lüks spa deneyimi",
        activitiesEN: "Private city tour and luxury spa experience",
        activitiesRU: "Частная экскурсия по городу и роскошный спа-опыт",
        activitiesKA: "კერძო ქალაქის ტური და ლუქსის სპა გამოცდილება",
        highlights: JSON.stringify([
          "Rusça konuşan rehber",
          "Premium saç analizi",
          "Lüks konaklama",
          "Özel transferler"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/luxury-1.jpg",
          "/images/packages/luxury-2.jpg",
          "/images/packages/luxury-3.jpg"
        ]),
        packageType: "luxury" as "luxury",
        isAllInclusive: true,
        isFeatured: true
      },
      
      // Azerbaycan için lüks saç ekimi paketi
      {
        slug: "luks-sac-ekimi-paketi-az",
        titleTR: "Lüks Saç Ekimi Paketi - Azerbaycan",
        titleEN: "Luxury Hair Transplant Package - Azerbaijan",
        titleRU: "Люкс Пакет Трансплантации Волос - Азербайджан",
        titleKA: "ლუქსი თმის გადანერგვის პაკეტი - აზერბაიჯანი",
        descriptionTR: "Azerbaycan'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren premium saç ekimi paketi",
        descriptionEN: "Premium hair transplantation package including luxury accommodation and exclusive services for our guests from Azerbaijan",
        descriptionRU: "Премиум пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Азербайджана",
        descriptionKA: "პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის აზერბაიჯანიდან",
        contentTR: "Azerbaycan'dan gelen hastalarımız için özel olarak hazırlanmış bu lüks paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transferler ve şehir turu dahildir.",
        contentEN: "This luxury package, specially prepared for our patients from Azerbaijan, combines hair transplant treatment with a comfortable vacation experience. Includes accommodation in a 5-star hotel, VIP transfers, and city tour.",
        contentRU: "Этот люкс пакет, специально подготовленный для наших пациентов из Азербайджана, сочетает лечение по трансплантации волос с комфортным отдыхом. Включает проживание в 5-звездочном отеле, VIP-трансферы и экскурсию по городу.",
        contentKA: "ეს ლუქსი პაკეტი, სპეციალურად მომზადებული ჩვენი პაციენტებისთვის აზერბაიჯანიდან, აერთიანებს თმის გადანერგვის მკურნალობას კომფორტულ დასვენებასთან. მოიცავს 5-ვარსკვლავიან სასტუმროში განთავსებას, VIP ტრანსფერებს და ქალაქის ტურს.",
        imageUrl: "/images/packages/luxury-package.jpg",
        countryOrigin: "AZ",
        countryCode: "AZ",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece lüks konaklama",
        accommodationEN: "4 nights luxury accommodation in a 5-star hotel",
        accommodationRU: "4 ночи в роскошном номере 5-звездочного отеля",
        accommodationKA: "4 ღამის ლუქსი განთავსება 5-ვარსკვლავიან სასტუმროში",
        transportationTR: "VIP havalimanı transferleri ve özel araç",
        transportationEN: "VIP airport transfers and private vehicle",
        transportationRU: "VIP трансферы из аэропорта и частный автомобиль",
        transportationKA: "VIP აეროპორტის ტრანსფერები და კერძო მანქანა",
        activitiesTR: "Özel şehir turu ve lüks spa deneyimi",
        activitiesEN: "Private city tour and luxury spa experience",
        activitiesRU: "Частная экскурсия по городу и роскошный спа-опыт",
        activitiesKA: "კერძო ქალაქის ტური და ლუქსის სპა გამოცდილება",
        highlights: JSON.stringify([
          "Azerbaycanca konuşan rehber",
          "Premium saç analizi",
          "Lüks konaklama",
          "Özel transferler"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/luxury-1.jpg",
          "/images/packages/luxury-2.jpg",
          "/images/packages/luxury-3.jpg"
        ]),
        packageType: "luxury" as "luxury",
        isAllInclusive: true,
        isFeatured: true
      },
      
      // Ukrayna için lüks saç ekimi paketi
      {
        slug: "luks-sac-ekimi-paketi-ua",
        titleTR: "Lüks Saç Ekimi Paketi - Ukrayna",
        titleEN: "Luxury Hair Transplant Package - Ukraine",
        titleRU: "Люкс Пакет Трансплантации Волос - Украина",
        titleKA: "ლუქსი თმის გადანერგვის პაკეტი - უკრაინა",
        descriptionTR: "Ukrayna'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren premium saç ekimi paketi",
        descriptionEN: "Premium hair transplantation package including luxury accommodation and exclusive services for our guests from Ukraine",
        descriptionRU: "Премиум пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Украины",
        descriptionKA: "პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის უკრაინიდან",
        contentTR: "Ukrayna'dan gelen hastalarımız için özel olarak hazırlanmış bu paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transferler ve şehir turu dahildir.",
        contentEN: "Specially prepared for our patients from Ukraine, this package offers a comfortable vacation experience in Tbilisi. 5-star hotel accommodation, VIP transfer, and guided tour are included.",
        contentRU: "Специально подготовленный для наших пациентов из Украины, этот пакет предлагает комфортный отдых в Тбилиси. Проживание в 5-звездочном отеле, VIP-трансфер и экскурсия с гидом включены.",
        contentKA: "სპეციალურად მომზადებული ჩვენი პაციენტებისთვის ირანიდან, ეს პაკეტი გთავაზობთ კომფორტულ დასვენებას თბილისში. 5-ვარსკვლავიანი სასტუმროს საცხოვრებელი, VIP ტრანსფერი და გიდთან ტური შედის.",
        imageUrl: "/images/packages/ukraine-package.jpg",
        countryOrigin: "UA",
        countryCode: "UA",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece lüks konaklama",
        accommodationEN: "4 nights luxury accommodation in a 5-star hotel",
        accommodationRU: "4 ночи в роскошном номере 5-звездочного отеля",
        accommodationKA: "4 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "VIP havalimanı transferleri ve özel araç",
        transportationEN: "VIP airport transfers and private vehicle",
        transportationRU: "VIP трансферы из аэропорта и частный автомобиль",
        transportationKA: "VIP აეროპორტის ტრანსფერები და კერძო მანქანა",
        activitiesTR: "Özel şehir turu ve lüks spa deneyimi",
        activitiesEN: "Private city tour and luxury spa experience",
        activitiesRU: "Частная экскурсия по городу и роскошный спа-опыт",
        activitiesKA: "კერძო ქალაქის ტური და ლუქსის სპა გამოცდილება",
        highlights: JSON.stringify([
          "Ukraynaca konuşan rehber",
          "Premium saç analizi",
          "Lüks konaklama",
          "Özel transferler"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/luxury-1.jpg",
          "/images/packages/luxury-2.jpg",
          "/images/packages/luxury-3.jpg"
        ]),
        packageType: "luxury" as "luxury",
        isAllInclusive: true,
        isFeatured: true
      },
      
      // İran için lüks saç ekimi paketi
      {
        slug: "luks-sac-ekimi-paketi-ir",
        titleTR: "Lüks Saç Ekimi Paketi - İran",
        titleEN: "Luxury Hair Transplant Package - Iran",
        titleRU: "Люкс Пакет Трансплантации Волос - Иран",
        titleKA: "ლუქსი თმის გადანერგვის პაკეტი - ირანი",
        descriptionTR: "İran'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren premium saç ekimi paketi",
        descriptionEN: "Premium hair transplantation package including luxury accommodation and exclusive services for our guests from Iran",
        descriptionRU: "Премиум пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Ирана",
        descriptionKA: "პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის ირანიდან",
        contentTR: "İran'dan gelen hastalarımız için özel olarak hazırlanmış bu lüks paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transferler ve şehir turu dahildir.",
        contentEN: "This luxury package, specially prepared for our patients from Iran, combines hair transplant treatment with a comfortable vacation experience. Includes accommodation in a 5-star hotel, VIP transfers, and city tour.",
        contentRU: "Специально подготовленный для наших пациентов из Ирана, этот пакет предлагает комфортный отдых в Тбилиси. Проживание в 5-звездочном отеле, VIP-трансфер и экскурсия с гидом включены.",
        contentKA: "სპეციალურად მომზადებული ჩვენი პაციენტებისთვის ირანიდან, ეს პაკეტი გთავაზობთ კომფორტულ დასვენებას თბილისში. 5-ვარსკვლავიანი სასტუმროს საცხოვრებელი, VIP ტრანსფერი და გიდთან ტური შედის.",
        imageUrl: "/images/packages/luxury-package.jpg",
        countryOrigin: "IR",
        countryCode: "IR",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece lüks konaklama",
        accommodationEN: "4 nights luxury accommodation in a 5-star hotel",
        accommodationRU: "4 ночи в 5-звездочном отеле (включая завтрак)",
        accommodationKA: "4 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "VIP havalimanı transferleri ve özel araç",
        transportationEN: "VIP airport transfers and private vehicle",
        transportationRU: "VIP трансферы из аэропорта и частный автомобиль",
        transportationKA: "VIP აეროპორტის ტრანსფერები და კერძო მანქანა",
        activitiesTR: "Özel şehir turu ve lüks spa deneyimi",
        activitiesEN: "Private city tour and luxury spa experience",
        activitiesRU: "Частная экскурсия по городу и роскошный спа-опыт",
        activitiesKA: "კერძო ქალაქის ტური და ლუქსის სპა გამოცდილება",
        highlights: JSON.stringify([
          "Farsça konuşan rehber",
          "Premium saç analizi",
          "Lüks konaklama",
          "Özel transferler"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/luxury-1.jpg",
          "/images/packages/luxury-2.jpg",
          "/images/packages/luxury-3.jpg"
        ]),
        packageType: "luxury" as "luxury",
        isAllInclusive: true,
        isFeatured: true
      },
      
      // Kazakistan için lüks saç ekimi paketi
      {
        slug: "luks-sac-ekimi-paketi-kz",
        titleTR: "Lüks Saç Ekimi Paketi - Kazakistan",
        titleEN: "Luxury Hair Transplant Package - Kazakhstan",
        titleRU: "Люкс Пакет Трансплантации Волос - Казахстан",
        titleKA: "ლუქსი თმის გადანერგვის პაკეტი - ყაზახეთი",
        descriptionTR: "Kazakistan'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren premium saç ekimi paketi",
        descriptionEN: "Premium hair transplantation package including luxury accommodation and exclusive services for our guests from Kazakhstan",
        descriptionRU: "Премиум пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Казахстана",
        descriptionKA: "პრემიუმ თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის ყაზახეთიდან",
        contentTR: "Kazakistan'dan gelen hastalarımız için özel olarak hazırlanmış bu lüks paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transferler ve şehir turu dahildir.",
        contentEN: "This luxury package, specially prepared for our patients from Kazakhstan, combines hair transplant treatment with a comfortable vacation experience. Includes accommodation in a 5-star hotel, VIP transfers, and city tour.",
        contentRU: "Этот люкс пакет, специально подготовленный для наших пациентов из Казахстана, сочетает лечение по трансплантации волос с комфортным отдыхом. Включает проживание в 5-звездочном отеле, VIP-трансферы и экскурсию по городу.",
        contentKA: "ეს ლუქსი პაკეტი, სპეციალურად მომზადებული ჩვენი პაციენტებისთვის ყაზახეთიდან, აერთიანებს თმის გადანერგვის მკურნალობას კომფორტულ დასვენებასთან. მოიცავს 5-ვარსკვლავიან სასტუმროში განთავსებას, VIP ტრანსფერებს და ქალაქის ტურს.",
        imageUrl: "/images/packages/luxury-package.jpg",
        countryOrigin: "KZ",
        countryCode: "KZ",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece lüks konaklama",
        accommodationEN: "4 nights luxury accommodation in a 5-star hotel",
        accommodationRU: "4 ночи в роскошном номере 5-звездочного отеля",
        accommodationKA: "4 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "VIP havalimanı transferleri ve özel araç",
        transportationEN: "VIP airport transfers and private vehicle",
        transportationRU: "VIP трансферы из аэропорта и частный автомобиль",
        transportationKA: "VIP აეროპორტის ტრანსფერები და კერძო მანქანა",
        activitiesTR: "Özel şehir turu ve lüks spa deneyimi",
        activitiesEN: "Private city tour and luxury spa experience",
        activitiesRU: "Частная экскурсия по городу и роскошный спа-опыт",
        activitiesKA: "კერძო ქალაქის ტური და ლუქსის სპა გამოცდილება",
        highlights: JSON.stringify([
          "Kazakça ve Rusça konuşan rehber",
          "Premium saç analizi",
          "Lüks konaklama",
          "Özel transferler"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/luxury-1.jpg",
          "/images/packages/luxury-2.jpg",
          "/images/packages/luxury-3.jpg"
        ]),
        packageType: "luxury" as "luxury",
        isAllInclusive: true,
        isFeatured: true
      },
      {
        slug: "standard-hair-transplant-tr",
        titleTR: "Standart Saç Ekimi Paketi - Türkiye",
        titleEN: "Standard Hair Transplant Package - Turkey",
        titleRU: "Стандартный Пакет Трансплантации Волос - Турция",
        titleKA: "სტანდარტული თმის გადანერგვის პაკეტი - თურქეთი",
        descriptionTR: "Türkiye'den gelen misafirlerimiz için konforlu konaklama ve kaliteli hizmetler içeren ekonomik saç ekimi paketi",
        descriptionEN: "Economic hair transplantation package including comfortable accommodation and quality services for our guests from Turkey",
        descriptionRU: "Экономичный пакет трансплантации волос, включающий комфортное проживание и качественные услуги для наших гостей из Турции",
        descriptionKA: "ეკონომიური თმის გადანერგვის პაკეტი, რომელიც მოიცავს კომფორტულ საცხოვრებელს და ხარისხიან მომსახურებას ჩვენი სტუმრებისთვის თურქეთიდან",
        contentTR: "Türkiye'den gelen hastalarımız için uygun fiyatlı standart paketimiz. 4 yıldızlı otelde konaklama, standart havaalanı transferleri ve şehir merkezine yarım günlük tur dahildir.",
        contentEN: "Our standard affordable package for patients from Turkey. Includes accommodation in a 4-star hotel, standard airport transfers, and a half-day tour to the city center.",
        contentRU: "Наш стандартный доступный пакет для пациентов из Турции. Включает проживание в 4-звездочном отеле, стандартные трансферы из аэропорта и полудневную экскурсию в центр города.",
        contentKA: "ჩვენი სტანდარტული ხელმისაწვდომი პაკეტი პაციენტებისთვის თურქეთიდან. მოიცავს საცხოვრებელს 4-ვარსკვლავიან სასტუმროში, სტანდარტულ აეროპორტის ტრანსფერებს და ნახევარდღიან ტურს ქალაქის ცენტრში.",
        imageUrl: "/images/packages/standard-package-tr.jpg",
        countryOrigin: "TR",
        countryCode: "TR",
        durationDays: 4,
        accommodationTR: "4 yıldızlı otelde 3 gece konaklama (kahvaltı dahil)",
        accommodationEN: "3 nights in a 4-star hotel (breakfast included)",
        accommodationRU: "3 ночи в 4-звездочном отеле (включая завтрак)",
        accommodationKA: "3 ღამე 4 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "Standart havaalanı transferleri",
        transportationEN: "Standard airport transfers",
        transportationRU: "Стандартные трансферы из аэропорта",
        transportationKA: "სტანდარტული აეროპორტის ტრანსფერები",
        activitiesTR: "Şehir merkezine yarım günlük tur",
        activitiesEN: "Half-day tour to the city center",
        activitiesRU: "Полудневная экскурсия в центр города",
        activitiesKA: "ნახევარდღიანი ტური ქალაქის ცენტრში",
        isFeatured: false,
        highlights: JSON.stringify([
          "Türkçe konuşan rehber",
          "Standart saç analizi",
          "Wi-Fi",
          "Hastane transferleri"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/standard-tr-1.jpg",
          "/images/packages/standard-tr-2.jpg"
        ]),
        reviewsTR: "Uygun fiyata kaliteli hizmet. Operasyon çok başarılı geçti.",
        reviewsEN: "Quality service at an affordable price. The operation was very successful.",
        reviewsRU: "Качественный сервис по доступной цене. Операция прошла очень успешно.",
        reviewsKA: "ხარისხიანი მომსახურება ხელმისაწვდომ ფასად. ოპერაცია ძალიან წარმატებული იყო."
      },
      {
        slug: "standard-hair-transplant-az",
        titleTR: "Standart Saç Ekimi Paketi - Azerbaycan",
        titleEN: "Standard Hair Transplant Package - Azerbaijan",
        titleRU: "Стандартный Пакет Трансплантации Волос - Азербайджан",
        titleKA: "სტანდარტული თმის გადანერგვის პაკეტი - აზერბაიჯანი",
        descriptionTR: "Azerbaycan'dan gelen misafirlerimiz için rahat konaklama ve güvenilir hizmetler içeren ekonomik saç ekimi paketi",
        descriptionEN: "Economic hair transplantation package including comfortable accommodation and reliable services for our guests from Azerbaijan",
        descriptionRU: "Экономичный пакет трансплантации волос, включающий комфортное проживание и надежные услуги для наших гостей из Азербайджана",
        descriptionKA: "ეკონომიური თმის გადანერგვის პაკეტი, რომელიც მოიცავს კომფორტულ საცხოვრებელს და საიმედო მომსახურებას ჩვენი სტუმრებისთვის აზერბაიჯანიდან",
        contentTR: "Azerbaycanlı hastalarımız için uygun fiyatlı standart paketimiz. 4 yıldızlı otelde konaklama, standart havaalanı transferleri ve şehir merkezine yarım günlük tur içerir.",
        contentEN: "Our affordable standard package for patients from Azerbaijan. Includes accommodation in a 4-star hotel, standard airport transfers, and a half-day tour to the city center.",
        contentRU: "Наш доступный стандартный пакет для пациентов из Азербайджана. Включает проживание в 4-звездочном отеле, стандартные трансферы из аэропорта и полудневную экскурсию в центр города.",
        contentKA: "ჩვენი ხელმისაწვდომი სტანდარტული პაკეტი პაციენტებისთვის აზერბაიჯანიდან. მოიცავს საცხოვრებელს 4-ვარსკვლავიან სასტუმროში, სტანდარტულ აეროპორტის ტრანსფერებს და ნახევარდღიან ტურს ქალაქის ცენტრში.",
        imageUrl: "/images/packages/standard-package-az.jpg",
        countryOrigin: "AZ",
        countryCode: "AZ",
        durationDays: 4,
        accommodationTR: "4 yıldızlı otelde 3 gece konaklama (kahvaltı dahil)",
        accommodationEN: "3 nights in a 4-star hotel (breakfast included)",
        accommodationRU: "3 ночи в 4-звездочном отеле (включая завтрак)",
        accommodationKA: "3 ღამე 4 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "Standart havaalanı transferleri",
        transportationEN: "Standard airport transfers",
        transportationRU: "Стандартные трансферы из аэропорта",
        transportationKA: "სტანდარტული აეროპორტის ტრანსფერები",
        activitiesTR: "Şehir merkezine yarım günlük tur",
        activitiesEN: "Half-day tour to the city center",
        activitiesRU: "Полудневная экскурсия в центр города",
        activitiesKA: "ნახევარდღიანი ტური ქალაქის ცენტრში",
        isFeatured: false,
        highlights: JSON.stringify([
          "Azeri ve Rusça konuşan rehber",
          "Standart saç analizi",
          "Wi-Fi",
          "Hastane transferleri"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/standard-az-1.jpg",
          "/images/packages/standard-az-2.jpg"
        ]),
        reviewsTR: "Sadə və etibarlı xidmət. Qiymətə görə çox yaxşıdır.",
        reviewsEN: "Simple and reliable service. Very good for the price.",
        reviewsRU: "Простой и надежный сервис. Очень хорошо для этой цены.",
        reviewsKA: "მარტივი და საიმედო სერვისი. ძალიან კარგია ფასისთვის."
      },
      {
        slug: "premium-hair-transplant-ru",
        titleTR: "Premium Saç Ekimi Paketi - Rusya",
        titleEN: "Premium Hair Transplant Package - Russia",
        titleRU: "Премиум Пакет Трансплантации Волос - Россия",
        titleKA: "პრემიუმ თმის გადანერგვის პაკეტი - რუსეთი",
        descriptionTR: "Rusya'dan gelen misafirlerimiz için lüks konaklama ve özel hizmetler içeren kapsamlı saç ekimi paketi",
        descriptionEN: "Comprehensive hair transplantation package including luxury accommodation and special services for our guests from Russia",
        descriptionRU: "Комплексный пакет трансплантации волос, включающий роскошное проживание и специальные услуги для наших гостей из России",
        descriptionKA: "ყოვლისმომცველი თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და სპეციალურ მომსახურებას ჩვენი სტუმრებისთვის რუსეთიდან",
        contentTR: "Rus hastalarımız için özel olarak hazırlanmış lüks paket. 5 yıldızlı otelde süit konaklama, VIP transferler, Rus mutfağı sunan restoranda akşam yemeği ve kapsamlı şehir turu dahildir.",
        contentEN: "Luxury package specially prepared for our Russian patients. Includes suite accommodation in a 5-star hotel, VIP transfers, dinner at a restaurant offering Russian cuisine, and a comprehensive city tour.",
        contentRU: "Роскошный пакет, специально подготовленный для наших российских пациентов. Включает проживание в люксе в 5-звездочном отеле, VIP-трансферы, ужин в ресторане, предлагающем русскую кухню, и комплексную экскурсию по городу.",
        contentKA: "ლუქსი პაკეტი, სპეციალურად მომზადებული ჩვენი რუსი პაციენტებისთვის. მოიცავს სუიტის საცხოვრებელს 5-ვარსკვლავიან სასტუმროში, VIP ტრანსფერებს, ვახშამს რესტორანში, რომელიც გთავაზობთ რუსულ სამზარეულოს და ყოვლისმომცველ ქალაქის ტურს.",
        imageUrl: "/images/packages/premium-package-ru.jpg",
        countryOrigin: "RU",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece süit konaklama",
        accommodationEN: "4 nights suite accommodation in a 5-star hotel",
        accommodationRU: "4 ночи проживания в люксе в 5-звездочном отеле",
        accommodationKA: "4 ღამე სუიტის საცხოვრებელი 5 ვარსკვლავიან სასტუმროში",
        transportationTR: "VIP havaalanı transferleri ve özel şoför",
        transportationEN: "VIP airport transfers and private chauffeur",
        transportationRU: "VIP трансферы из аэропорта и частный шофер",
        transportationKA: "VIP აეროპორტის ტრანსფერები და პირადი მძღოლი",
        activitiesTR: "Rus mutfağı sunan restoranda akşam yemeği ve kapsamlı şehir turu",
        activitiesEN: "Dinner at a restaurant offering Russian cuisine and comprehensive city tour",
        activitiesRU: "Ужин в ресторане, предлагающем русскую кухню, и комплексная экскурсия по городу",
        activitiesKA: "ვახშამი რესტორანში, რომელიც გთავაზობთ რუსულ სამზარეულოს და ყოვლისმომცველ ქალაქის ტურს",
        isFeatured: true,
        highlights: JSON.stringify([
          "Rusça konuşan kişisel rehber",
          "Premium saç analizi",
          "Rus TV kanalları",
          "Rus hamam deneyimi"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/premium-ru-1.jpg",
          "/images/packages/premium-ru-2.jpg",
          "/images/packages/premium-ru-3.jpg"
        ]),
        reviewsTR: "Отличный сервис! Всё было организовано на высшем уровне.",
        reviewsEN: "Excellent service! Everything was organized at the highest level.",
        reviewsRU: "Отличный сервис! Всё было организовано на высшем уровне.",
        reviewsKA: "შესანიშნავი სერვისი! ყველაფერი ორგანიზებული იყო უმაღლეს დონეზე."
      },
      {
        slug: "standard-hair-transplant-ru",
        titleTR: "Standart Saç Ekimi Paketi - Rusya",
        titleEN: "Standard Hair Transplant Package - Russia",
        titleRU: "Стандартный Пакет Трансплантации Волос - Россия",
        titleKA: "სტანდარტული თმის გადანერგვის პაკეტი - რუსეთი",
        descriptionTR: "Rusya'dan gelen misafirlerimiz için rahat konaklama ve profesyonel hizmetler içeren ekonomik saç ekimi paketi",
        descriptionEN: "Economic hair transplantation package including comfortable accommodation and professional services for our guests from Russia",
        descriptionRU: "Экономичный пакет трансплантации волос, включающий комфортное проживание и профессиональные услуги для наших гостей из России",
        descriptionKA: "ეკონომიური თმის გადანერგვის პაკეტი, რომელიც მოიცავს კომფორტულ საცხოვრებელს და პროფესიონალურ მომსახურებას ჩვენი სტუმრებისთვის რუსეთიდან",
        contentTR: "Rus hastalarımız için uygun fiyatlı ekonomik paketimiz. 4 yıldızlı otelde konaklama, standart havaalanı transferleri ve şehir merkezine yarım günlük tur dahildir.",
        contentEN: "Our affordable economic package for Russian patients. Includes accommodation in a 4-star hotel, standard airport transfers, and a half-day tour to the city center.",
        contentRU: "Наш доступный экономичный пакет для российских пациентов. Включает проживание в 4-звездочном отеле, стандартные трансферы из аэропорта и полудневную экскурсию в центр города.",
        contentKA: "ჩვენი ხელმისაწვდომი ეკონომიური პაკეტი რუსი პაციენტებისთვის. მოიცავს საცხოვრებელს 4-ვარსკვლავიან სასტუმროში, სტანდარტულ აეროპორტის ტრანსფერებს და ნახევარდღიან ტურს ქალაქის ცენტრში.",
        imageUrl: "/images/packages/standard-package-ru.jpg",
        countryOrigin: "RU",
        durationDays: 4,
        accommodationTR: "4 yıldızlı otelde 3 gece konaklama",
        accommodationEN: "3 nights accommodation in a 4-star hotel",
        accommodationRU: "3 ночи проживания в 4-звездочном отеле",
        accommodationKA: "3 ღამე საცხოვრებელი 4 ვარსკვლავიან სასტუმროში",
        transportationTR: "Standart havaalanı transferleri",
        transportationEN: "Standard airport transfers",
        transportationRU: "Стандартные трансферы из аэропорта",
        transportationKA: "სტანდარტული აეროპორტის ტრანსფერები",
        activitiesTR: "Şehir merkezine yarım günlük tur",
        activitiesEN: "Half-day tour to the city center",
        activitiesRU: "Полудневная экскурсия в центр города",
        activitiesKA: "ნახევარდღიანი ტური ქალაქის ცენტრში",
        isFeatured: false,
        highlights: JSON.stringify([
          "Rusça konuşan rehber",
          "Standart saç analizi",
          "Wi-Fi",
          "Rus TV kanalları"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/standard-ru-1.jpg",
          "/images/packages/standard-ru-2.jpg"
        ]),
        reviewsTR: "Хорошее соотношение цены и качества. Результаты превзошли мои ожидания.",
        reviewsEN: "Good value for money. The results exceeded my expectations.",
        reviewsRU: "Хорошее соотношение цены и качества. Результаты превзошли мои ожидания.",
        reviewsKA: "კარგი ფასისა და ხარისხის თანაფარდობა. შედეგებმა გადააჭარბა ჩემს მოლოდინებს."
      },
      {
        slug: "premium-hair-transplant-ua",
        titleTR: "Premium Saç Ekimi Paketi - Ukrayna",
        titleEN: "Premium Hair Transplant Package - Ukraine",
        titleRU: "Премиум Пакет Трансплантации Волос - Украина",
        titleKA: "პრემიუმ თმის გადანერგვის პაკეტი - უკრაინა",
        descriptionTR: "Ukrayna'dan gelen misafirlerimiz için lüks konaklama ve özel hizmetler içeren kapsamlı saç ekimi paketi",
        descriptionEN: "Comprehensive hair transplantation package including luxury accommodation and special services for our guests from Ukraine",
        descriptionRU: "Комплексный пакет трансплантации волос, включающий роскошное проживание и специальные услуги для наших гостей из Украины",
        descriptionKA: "ყოვლისმომცველი თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და სპეციალურ მომსახურებას ჩვენი სტუმრებისთვის უკრაინიდან",
        contentTR: "Ukrayna'dan gelen hastalarımız için özel olarak hazırlanmış bu paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transfer ve rehberli tur dahildir.",
        contentEN: "Specially prepared for our patients from Ukraine, this package offers a comfortable vacation experience in Tbilisi. 5-star hotel accommodation, VIP transfer, and guided tour are included.",
        contentRU: "Специально подготовленный для наших пациентов из Украины, этот пакет предлагает комфортный отдых в Тбилиси. Проживание в 5-звездочном отеле, VIP-трансфер и экскурсия с гидом включены.",
        contentKA: "სპეციალურად მომზადებული ჩვენი პაციენტებისთვის ირანიდან, ეს პაკეტი გთავაზობთ კომფორტულ დასვენებას თბილისში. 5-ვარსკვლავიანი სასტუმროს საცხოვრებელი, VIP ტრანსფერი და გიდთან ტური შედის.",
        imageUrl: "/images/packages/ukraine-package.jpg",
        countryOrigin: "UA",
        countryCode: "UA",
        durationDays: 6,
        accommodationTR: "5 yıldızlı otelde 5 gece konaklama (kahvaltı dahil)",
        accommodationEN: "5 nights in a 5-star hotel (breakfast included)",
        accommodationRU: "5 ночей в 5-звездочном отеле (включая завтрак)",
        accommodationKA: "5 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "Havalimanı VIP karşılama ve şehir içi özel ulaşım",
        transportationEN: "Airport VIP meeting and private city transportation",
        transportationRU: "VIP-встреча в аэропорту и частный городской транспорт",
        transportationKA: "აეროპორტის VIP შეხვედრა და კერძო ქალაქის ტრანსპორტი",
        activitiesTR: "Kapsamlı şehir turu ve Gürcistan'ın ünlü şarap bölgesi Kakheti'ye gezi",
        activitiesEN: "Comprehensive city tour and trip to Georgia's famous wine region Kakheti",
        activitiesRU: "Комплексная экскурсия по городу и поездка в знаменитый винный регион Грузии Кахетию",
        activitiesKA: "ყოვლისმომცველი ქალაქის ტური და მოგზაურობა საქართველოს ცნობილ ღვინის რეგიონში კახეთში",
        isFeatured: true,
        highlights: JSON.stringify([
          "Ukraynaca konuşan kişisel rehber",
          "Premium saç analizi",
          "Ukrayna TV kanalları",
          "Şehir gezisi sonrası spa"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/premium-ua-1.jpg",
          "/images/packages/premium-ua-2.jpg",
          "/images/packages/premium-ua-3.jpg"
        ]),
        packageType: "premium",
        isAllInclusive: true
      },
      {
        slug: "premium-hair-transplant-ir",
        titleTR: "Premium Saç Ekimi Paketi - İran",
        titleEN: "Premium Hair Transplant Package - Iran",
        titleRU: "Премиум Пакет Трансплантации Волос - Иран",
        titleKA: "პრემიუმ თმის გადანერგვის პაკეტი - ირანი",
        descriptionTR: "İran'dan gelen misafirlerimiz için lüks konaklama ve özel servisler içeren kapsamlı saç ekimi paketi",
        descriptionEN: "Comprehensive hair transplantation package including luxury accommodation and exclusive services for our guests from Iran",
        descriptionRU: "Комплексный пакет трансплантации волос, включающий роскошное проживание и эксклюзивные услуги для наших гостей из Ирана",
        descriptionKA: "ყოვლისმომცველი თმის გადანერგვის პაკეტი, რომელიც მოიცავს ლუქს საცხოვრებელს და ექსკლუზიურ სერვისებს ჩვენი სტუმრებისთვის ირანიდან",
        contentTR: "İran'dan gelen hastalarımız için özel olarak hazırlanmış bu paket, saç ekimi tedavisini konforlu bir tatil deneyimiyle birleştiriyor. 5 yıldızlı otelde konaklama, VIP transfer ve rehberli tur dahildir.",
        contentEN: "Specially prepared for our patients from Iran, this package offers a comfortable vacation experience in Tbilisi. 5-star hotel accommodation, VIP transfer, and guided tour are included.",
        contentRU: "Специально подготовленный для наших пациентов из Ирана, этот пакет предлагает комфортный отдых в Тбилиси. Проживание в 5-звездочном отеле, VIP-трансфер и экскурсия с гидом включены.",
        contentKA: "სპეციალურად მომზადებული ჩვენი პაციენტებისთვის ირანიდან, ეს პაკეტი გთავაზობთ კომფორტულ დასვენებას თბილისში. 5-ვარსკვლავიანი სასტუმროს საცხოვრებელი, VIP ტრანსფერი და გიდთან ტური შედის.",
        imageUrl: "/images/packages/iran-package.jpg",
        countryOrigin: "IR",
        durationDays: 5,
        accommodationTR: "5 yıldızlı otelde 4 gece konaklama (kahvaltı dahil)",
        accommodationEN: "4 nights in a 5-star hotel (breakfast included)",
        accommodationRU: "4 ночи в 5-звездочном отеле (включая завтрак)",
        accommodationKA: "4 ღამე 5 ვარსკვლავიან სასტუმროში (საუზმე შედის)",
        transportationTR: "Havalimanı VIP karşılama ve şehir içi özel ulaşım",
        transportationEN: "Airport VIP meeting and private city transportation",
        transportationRU: "VIP-встреча в аэропорту и частный городской транспорт",
        transportationKA: "აეროპორტის VIP შეხვედრა და კერძო ქალაქის ტრანსპორტი",
        activitiesTR: "Şehir turu ve İran mutfağına benzer yerel restoranlarda akşam yemeği",
        activitiesEN: "City tour and dinner at local restaurants with cuisine similar to Iranian",
        activitiesRU: "Экскурсия по городу и ужин в местных ресторанах с кухней, похожей на иранскую",
        activitiesKA: "ქალაქის ტური და ვახშამი ადგილობრივ რესტორნებში ირანულთან მსგავსი სამზარეულოთი",
        isFeatured: true,
        highlights: JSON.stringify([
          "Farsça konuşan kişisel rehber",
          "Premium saç analizi",
          "Helal yemek seçenekleri",
          "İslami kurallara uygun konaklama"
        ]),
        galleryImages: JSON.stringify([
          "/images/packages/premium-ir-1.jpg",
          "/images/packages/premium-ir-2.jpg",
          "/images/packages/premium-ir-3.jpg"
        ]),
        packageType: "premium",
        isAllInclusive: true
      }
    ];

    // Add each package to the database
    for (const packageItem of packages) {
      await storage.createPackage(packageItem);
    }

    res.status(200).json({ message: "Packages seeded successfully" });
  } catch (error) {
    console.error("Error seeding packages:", error);
    res.status(500).json({ error: "Failed to seed packages" });
  }
};