import { Request, Response } from "express";
import { storage } from "../storage";

// Seed sample services
export const seedServices = async (req: Request, res: Response) => {
  try {
    // Create sample services
    const services = [
      {
        slug: "hair-transplantation",
        titleTR: "Saç Ekimi",
        titleEN: "Hair Transplantation",
        titleRU: "Трансплантация Волос",
        titleKA: "თმის გადანერგვა",
        descriptionTR: "FUE ve DHI teknikleri kullanarak doğal görünümlü saç ekimi hizmeti sunuyoruz.",
        descriptionEN: "We provide natural-looking hair transplantation service using FUE and DHI techniques.",
        descriptionRU: "Мы предоставляем услуги по трансплантации волос естественного вида, используя техники FUE и DHI.",
        descriptionKA: "ჩვენ ვუზრუნველყოფთ ბუნებრივი გარეგნობის თმის გადანერგვის სერვისს FUE და DHI ტექნიკებით.",
        imageUrl: "/images/services/hair-transplant.jpg",
        isActive: true
      },
      {
        slug: "eyebrow-transplantation",
        titleTR: "Kaş Ekimi",
        titleEN: "Eyebrow Transplantation",
        titleRU: "Трансплантация Бровей",
        titleKA: "წარბების გადანერგვა",
        descriptionTR: "Kişiye özel tasarımla doğal görünümlü kaş ekimi yapıyoruz.",
        descriptionEN: "We perform natural-looking eyebrow transplantation with personalized design.",
        descriptionRU: "Мы выполняем естественно выглядящую трансплантацию бровей с индивидуальным дизайном.",
        descriptionKA: "ჩვენ ვასრულებთ ბუნებრივი გარეგნობის წარბების გადანერგვას პერსონალიზებული დიზაინით.",
        imageUrl: "/images/services/eyebrow-transplant.jpg",
        isActive: true
      },
      {
        slug: "beard-transplantation",
        titleTR: "Sakal Ekimi",
        titleEN: "Beard Transplantation",
        titleRU: "Трансплантация Бороды",
        titleKA: "წვერის გადანერგვა",
        descriptionTR: "Yüz hatlarınıza uygun doğal sakal görünümü için sakal ekimi yapıyoruz.",
        descriptionEN: "We perform beard transplantation for a natural beard appearance that suits your facial features.",
        descriptionRU: "Мы выполняем трансплантацию бороды для естественного вида бороды, который соответствует вашим чертам лица.",
        descriptionKA: "ჩვენ ვასრულებთ წვერის გადანერგვას ბუნებრივი წვერის გარეგნობისთვის, რომელიც შეესაბამება თქვენს სახის ნაკვთებს.",
        imageUrl: "/images/services/beard-transplant.jpg",
        isActive: true
      },
      {
        slug: "prp-treatment",
        titleTR: "PRP Tedavisi",
        titleEN: "PRP Treatment",
        titleRU: "PRP Терапия",
        titleKA: "PRP მკურნალობა",
        descriptionTR: "Kendi kanınızdan elde edilen trombositlerle saç dökülmesini durdurun.",
        descriptionEN: "Stop hair loss with platelets derived from your own blood.",
        descriptionRU: "Остановите выпадение волос с помощью тромбоцитов, полученных из вашей собственной крови.",
        descriptionKA: "შეაჩერეთ თმის ცვენა თქვენი საკუთარი სისხლიდან მიღებული თრომბოციტებით.",
        imageUrl: "/images/services/prp-treatment.jpg",
        isActive: true
      },
      {
        slug: "hair-mesotherapy",
        titleTR: "Saç Mezoterapisi",
        titleEN: "Hair Mesotherapy",
        titleRU: "Мезотерапия Волос",
        titleKA: "თმის მეზოთერაპია",
        descriptionTR: "Vitamin ve mineral kokteylleri ile saç köklerini besleyin ve güçlendirin.",
        descriptionEN: "Nourish and strengthen hair follicles with vitamin and mineral cocktails.",
        descriptionRU: "Питайте и укрепляйте волосяные фолликулы с помощью витаминных и минеральных коктейлей.",
        descriptionKA: "კვებავს და აძლიერებს თმის ფოლიკულებს ვიტამინის და მინერალების კოქტეილებით.",
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