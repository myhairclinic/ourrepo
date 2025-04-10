import { Request, Response } from "express";
import { storage } from "../storage";

// Seed sample services
export const seedServices = async (req: Request, res: Response) => {
  try {
    // Create sample services
    const services = [
      {
        order: 1,
        slug: "hair-transplantation",
        titleTR: "Saç Ekimi",
        titleEN: "Hair Transplantation",
        titleRU: "Трансплантация Волос",
        titleKA: "თმის გადანერგვა",
        descriptionTR: "FUE ve DHI teknikleri kullanarak doğal görünümlü saç ekimi hizmeti sunuyoruz.",
        descriptionEN: "We provide natural-looking hair transplantation service using FUE and DHI techniques.",
        descriptionRU: "Мы предоставляем услуги по трансплантации волос естественного вида, используя техники FUE и DHI.",
        descriptionKA: "ჩვენ ვუზრუნველყოფთ ბუნებრივი გარეგნობის თმის გადანერგვის სერვისს FUE და DHI ტექნიკებით.",
        contentTR: "Saç ekimi, saçsız veya seyrek saçlı bölgelere sağlıklı saç köklerinin nakledilmesi işlemidir. Kliniğimizde en modern FUE ve DHI tekniklerini kullanıyoruz.",
        contentEN: "Hair transplantation is the process of transplanting healthy hair follicles to bald or thinning areas. At our clinic, we use the most modern FUE and DHI techniques.",
        contentRU: "Трансплантация волос - это процесс пересадки здоровых волосяных фолликулов в лысые или истончающиеся участки. В нашей клинике мы используем самые современные техники FUE и DHI.",
        contentKA: "თმის გადანერგვა არის ჯანმრთელი თმის ფოლიკულების გადანერგვის პროცესი მელოტ ან განლეულ ადგილებში. ჩვენს კლინიკაში ვიყენებთ ყველაზე თანამედროვე FUE და DHI ტექნიკას.",
        imageUrl: "/images/services/hair-transplant.jpg",
        isActive: true
      },
      {
        order: 2,
        slug: "eyebrow-transplantation",
        titleTR: "Kaş Ekimi",
        titleEN: "Eyebrow Transplantation",
        titleRU: "Трансплантация Бровей",
        titleKA: "წარბების გადანერგვა",
        descriptionTR: "Kişiye özel tasarımla doğal görünümlü kaş ekimi yapıyoruz.",
        descriptionEN: "We perform natural-looking eyebrow transplantation with personalized design.",
        descriptionRU: "Мы выполняем естественно выглядящую трансплантацию бровей с индивидуальным дизайном.",
        descriptionKA: "ჩვენ ვასრულებთ ბუნებრივი გარეგნობის წარბების გადანერგვას პერსონალიზებული დიზაინით.",
        contentTR: "Kaş ekimi, seyrek veya olmayan kaşlara sağlıklı kıl köklerinin nakledilmesi işlemidir. Doğal ve estetik bir görünüm sağlar.",
        contentEN: "Eyebrow transplantation is the process of transplanting healthy hair follicles to sparse or non-existent eyebrows. It provides a natural and aesthetic appearance.",
        contentRU: "Трансплантация бровей - это процесс пересадки здоровых волосяных фолликулов на редкие или отсутствующие брови. Она обеспечивает естественный и эстетичный вид.",
        contentKA: "წარბების გადანერგვა არის ჯანმრთელი თმის ფოლიკულების გადანერგვის პროცესი იშვიათ ან არარსებულ წარბებზე. ის უზრუნველყოფს ბუნებრივ და ესთეტიკურ გარეგნობას.",
        imageUrl: "/images/services/eyebrow-transplant.jpg",
        isActive: true
      },
      {
        order: 3,
        slug: "beard-transplantation",
        titleTR: "Sakal Ekimi",
        titleEN: "Beard Transplantation",
        titleRU: "Трансплантация Бороды",
        titleKA: "წვერის გადანერგვა",
        descriptionTR: "Yüz hatlarınıza uygun doğal sakal görünümü için sakal ekimi yapıyoruz.",
        descriptionEN: "We perform beard transplantation for a natural beard appearance that suits your facial features.",
        descriptionRU: "Мы выполняем трансплантацию бороды для естественного вида бороды, который соответствует вашим чертам лица.",
        descriptionKA: "ჩვენ ვასრულებთ წვერის გადანერგვას ბუნებრივი წვერის გარეგნობისთვის, რომელიც შეესაბამება თქვენს სახის ნაკვთებს.",
        contentTR: "Sakal ekimi, seyrek veya hiç olmayan sakal bölgelerine sağlıklı kıl köklerinin nakledilmesi işlemidir. Erkeksi ve doğal bir görünüm sağlar.",
        contentEN: "Beard transplantation is the process of transplanting healthy hair follicles to sparse or non-existent beard areas. It provides a masculine and natural appearance.",
        contentRU: "Трансплантация бороды - это процесс пересадки здоровых волосяных фолликулов на редкие или отсутствующие участки бороды. Она обеспечивает мужественный и естественный вид.",
        contentKA: "წვერის გადანერგვა არის ჯანმრთელი თმის ფოლიკულების გადანერგვის პროცესი იშვიათ ან არარსებულ წვერის უბნებზე. ის უზრუნველყოფს მამაკაცურ და ბუნებრივ გარეგნობას.",
        imageUrl: "/images/services/beard-transplant.jpg",
        isActive: true
      },
      {
        order: 4,
        slug: "prp-treatment",
        titleTR: "PRP Tedavisi",
        titleEN: "PRP Treatment",
        titleRU: "PRP Терапия",
        titleKA: "PRP მკურნალობა",
        descriptionTR: "Kendi kanınızdan elde edilen trombositlerle saç dökülmesini durdurun.",
        descriptionEN: "Stop hair loss with platelets derived from your own blood.",
        descriptionRU: "Остановите выпадение волос с помощью тромбоцитов, полученных из вашей собственной крови.",
        descriptionKA: "შეაჩერეთ თმის ცვენა თქვენი საკუთარი სისხლიდან მიღებული თრომბოციტებით.",
        contentTR: "PRP, hastanın kendi kanından elde edilen trombositten zengin plazmadır. Saç dökülmesini durdurmak ve saç büyümesini teşvik etmek için kullanılır.",
        contentEN: "PRP is platelet-rich plasma derived from the patient's own blood. It is used to stop hair loss and stimulate hair growth.",
        contentRU: "PRP - это обогащенная тромбоцитами плазма, полученная из собственной крови пациента. Она используется для остановки выпадения волос и стимуляции их роста.",
        contentKA: "PRP არის თრომბოციტებით მდიდარი პლაზმა, მიღებული პაციენტის საკუთარი სისხლიდან. იგი გამოიყენება თმის ცვენის შესაჩერებლად და თმის ზრდის სტიმულირებისთვის.",
        imageUrl: "/images/services/prp-treatment.jpg",
        isActive: true
      },
      {
        order: 5,
        slug: "hair-mesotherapy",
        titleTR: "Saç Mezoterapisi",
        titleEN: "Hair Mesotherapy",
        titleRU: "Мезотерапия Волос",
        titleKA: "თმის მეზოთერაპია",
        descriptionTR: "Vitamin ve mineral kokteylleri ile saç köklerini besleyin ve güçlendirin.",
        descriptionEN: "Nourish and strengthen hair follicles with vitamin and mineral cocktails.",
        descriptionRU: "Питайте и укрепляйте волосяные фолликулы с помощью витаминных и минеральных коктейлей.",
        descriptionKA: "კვებავს და აძლიერებს თმის ფოლიკულებს ვიტამინის და მინერალების კოქტეილებით.",
        contentTR: "Saç mezoterapisi, özel vitamin, mineral ve ilaç karışımlarının saç derisine ince iğnelerle enjekte edildiği bir tedavi yöntemidir. Saç dökülmesini azaltır ve saç kalitesini artırır.",
        contentEN: "Hair mesotherapy is a treatment method in which special vitamin, mineral, and medication mixtures are injected into the scalp with fine needles. It reduces hair loss and improves hair quality.",
        contentRU: "Мезотерапия волос - это метод лечения, при котором специальные смеси витаминов, минералов и лекарств вводятся в кожу головы тонкими иглами. Она уменьшает выпадение волос и улучшает качество волос.",
        contentKA: "თმის მეზოთერაპია არის მკურნალობის მეთოდი, რომლის დროსაც სპეციალური ვიტამინის, მინერალისა და მედიკამენტების ნარევები შეიყვანება თავის კანში წვრილი ნემსებით. ის ამცირებს თმის ცვენას და აუმჯობესებს თმის ხარისხს.",
        imageUrl: "/images/services/hair-mesotherapy.jpg",
        isActive: true
      }
    ];

    // Add each service
    for (const serviceData of services) {
      const existingService = await storage.getServiceBySlug(serviceData.slug);
      if (!existingService) {
        await storage.createService(serviceData);
      }
    }

    return res.status(200).json({ message: "Services seeded successfully" });
  } catch (error) {
    console.error("Error seeding services:", error);
    return res.status(500).json({ message: "Error seeding services" });
  }
};

// Endpoint to seed all demo data for the application
export const seedAllData = async (req: Request, res: Response) => {
  try {
    await seedServices(req, res);
    // Add other seed functions here as needed
    return res.status(200).json({ message: "All data seeded successfully" });
  } catch (error) {
    console.error("Error seeding all data:", error);
    return res.status(500).json({ message: "Error seeding all data" });
  }
};