import { Request, Response } from "express";
import { storage } from "../storage";
import { InsertProduct } from "@shared/schema";

export async function seedVithairProducts(req: Request, res: Response) {
  try {
    // Temizleme: Önce mevcut tüm ürünleri silelim
    const existingProducts = await storage.getProducts();
    for (const product of existingProducts) {
      await storage.deleteProduct(product.id);
    }
    
    // Yeni ürünleri ekleme
    const products: InsertProduct[] = [
      {
        slug: "vie-anti-hair-loss-shampoo",
        nameTR: "Vie Saç Dökülmesine Karşı Şampuan",
        nameEN: "Vie Anti Hair Loss Shampoo",
        nameRU: "Vie Шампунь Против Выпадения Волос",
        nameKA: "Vie თმის ცვენის საწინააღმდეგო შამპუნი",
        descriptionTR: "Saç dökülmesini azaltan ve saç köklerini güçlendiren özel formüllü şampuan.",
        descriptionEN: "Specially formulated shampoo that reduces hair loss and strengthens hair roots.",
        descriptionRU: "Специально разработанный шампунь, уменьшающий выпадение волос и укрепляющий корни волос.",
        descriptionKA: "სპეციალურად ფორმულირებული შამპუნი, რომელიც ამცირებს თმის ცვენას და აძლიერებს თმის ფესვებს.",
        imageUrl: "/images/products/vie-anti-hair-loss-shampoo.svg",
        usageTR: "Islak saça uygulayın, nazikçe masaj yapın ve durulayın. Haftada 2-3 kez kullanın.",
        usageEN: "Apply to wet hair, massage gently, and rinse. Use 2-3 times per week.",
        usageRU: "Нанесите на влажные волосы, мягко помассируйте и смойте. Используйте 2-3 раза в неделю.",
        usageKA: "წაისვით სველ თმაზე, ნაზად გაიმასაჟეთ და გაიწმინდეთ. გამოიყენეთ კვირაში 2-3-ჯერ.",
        ingredientsTR: "Su, Sodyum Lauret Sülfat, Kakao Yağı, Argan Yağı, Keratin, Kafein, Biotin",
        ingredientsEN: "Water, Sodium Laureth Sulfate, Cocoa Butter, Argan Oil, Keratin, Caffeine, Biotin",
        ingredientsRU: "Вода, Лаурет Сульфат Натрия, Масло Какао, Аргановое Масло, Кератин, Кофеин, Биотин",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეთ სულფატი, კაკაოს კარაქი, არგანის ზეთი, კერატინი, კოფეინი, ბიოტინი",
        order: 1,
        isActive: true
      },
      {
        slug: "vie-volumizing-shampoo",
        nameTR: "Vie Saç Hacim Şampuanı",
        nameEN: "Vie Volumizing Shampoo",
        nameRU: "Vie Объемный Шампунь",
        nameKA: "Vie მოცულობითი შამპუნი",
        descriptionTR: "İnce telli saçlara hacim ve canlılık veren besleyici şampuan.",
        descriptionEN: "Nourishing shampoo that gives volume and vitality to fine hair.",
        descriptionRU: "Питательный шампунь, придающий объем и жизненную силу тонким волосам.",
        descriptionKA: "მკვებავი შამპუნი, რომელიც ანიჭებს მოცულობასა და სიცოცხლეს წვრილ თმას.",
        imageUrl: "/images/products/vie-volumizing-shampoo.svg",
        usageTR: "Islak saça uygulayın, 2-3 dakika bekletin ve durulayın. Günlük kullanıma uygundur.",
        usageEN: "Apply to wet hair, wait 2-3 minutes, and rinse. Suitable for daily use.",
        usageRU: "Нанесите на влажные волосы, подождите 2-3 минуты и смойте. Подходит для ежедневного использования.",
        usageKA: "წაისვით სველ თმაზე, დაელოდეთ 2-3 წუთი და გაიწმინდეთ. შესაფერისია ყოველდღიური გამოყენებისთვის.",
        ingredientsTR: "Su, Sodyum Lauret Sülfat, Panthenol, Hidrolize Protein, Nane Özü, E Vitamini",
        ingredientsEN: "Water, Sodium Laureth Sulfate, Panthenol, Hydrolyzed Protein, Mint Extract, Vitamin E",
        ingredientsRU: "Вода, Лаурет Сульфат Натрия, Пантенол, Гидролизованный Протеин, Мятный Экстракт, Витамин Е",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეთ სულფატი, პანთენოლი, ჰიდროლიზებული ცილა, პიტნის ექსტრაქტი, ვიტამინი E",
        order: 2,
        isActive: true
      },
      {
        slug: "vie-keratin-hair-mask",
        nameTR: "Vie Keratin Saç Maskesi",
        nameEN: "Vie Keratin Hair Mask",
        nameRU: "Vie Кератиновая Маска для Волос",
        nameKA: "Vie კერატინის თმის ნიღაბი",
        descriptionTR: "Yıpranmış saçları derinlemesine onaran ve pürüzsüzleştiren yoğun bakım maskesi.",
        descriptionEN: "Intensive care mask that deeply repairs and smoothes damaged hair.",
        descriptionRU: "Маска интенсивного ухода, глубоко восстанавливающая и разглаживающая поврежденные волосы.",
        descriptionKA: "ინტენსიური მოვლის ნიღაბი, რომელიც ღრმად აღადგენს და ასწორებს დაზიანებულ თმას.",
        imageUrl: "/images/products/vie-keratin-hair-mask.svg",
        usageTR: "Şampuanlı yıkamadan sonra nemli saça uygulayın, 10-15 dakika bekletin ve durulayın. Haftada 1-2 kez kullanın.",
        usageEN: "Apply to damp hair after shampooing, wait 10-15 minutes, and rinse. Use 1-2 times per week.",
        usageRU: "Нанесите на влажные волосы после мытья шампунем, подождите 10-15 минут и смойте. Используйте 1-2 раза в неделю.",
        usageKA: "წაისვით ნოტიო თმაზე შამპუნის შემდეგ, დაელოდეთ 10-15 წუთი და გაიწმინდეთ. გამოიყენეთ კვირაში 1-2-ჯერ.",
        ingredientsTR: "Su, Keratin, Argan Yağı, Shea Yağı, Biotin, D Panthenol, E Vitamini, Gliserin",
        ingredientsEN: "Water, Keratin, Argan Oil, Shea Butter, Biotin, D-Panthenol, Vitamin E, Glycerin",
        ingredientsRU: "Вода, Кератин, Аргановое Масло, Масло Ши, Биотин, D-Пантенол, Витамин Е, Глицерин",
        ingredientsKA: "წყალი, კერატინი, არგანის ზეთი, შეას კარაქი, ბიოტინი, D-პანთენოლი, ვიტამინი E, გლიცერინი",
        order: 3,
        isActive: true
      },
      {
        slug: "vie-hair-growth-serum",
        nameTR: "Vie Saç Büyüme Serumu",
        nameEN: "Vie Hair Growth Serum",
        nameRU: "Vie Сыворотка для Роста Волос",
        nameKA: "Vie თმის ზრდის შრატი",
        descriptionTR: "Saç büyümesini hızlandıran ve saç köklerini canlandıran konsantre serum.",
        descriptionEN: "Concentrated serum that accelerates hair growth and revitalizes hair roots.",
        descriptionRU: "Концентрированная сыворотка, ускоряющая рост волос и оживляющая корни волос.",
        descriptionKA: "კონცენტრირებული შრატი, რომელიც აჩქარებს თმის ზრდას და აცოცხლებს თმის ფესვებს.",
        imageUrl: "/images/products/vie-hair-growth-serum.svg",
        usageTR: "Temiz kuru veya nemli saç derisine birkaç damla uygulayın ve nazikçe masaj yapın. Günlük kullanım için uygundur.",
        usageEN: "Apply a few drops to clean dry or damp scalp and massage gently. Suitable for daily use.",
        usageRU: "Нанесите несколько капель на чистую сухую или влажную кожу головы и мягко помассируйте. Подходит для ежедневного использования.",
        usageKA: "წაისვით რამდენიმე წვეთი სუფთა მშრალ ან ნოტიო თავის კანზე და ნაზად გაიმასაჟეთ. შესაფერისია ყოველდღიური გამოყენებისთვის.",
        ingredientsTR: "Kafein, Biotin, Peptidler, Niasinamid, Argan Yağı, Biberiye Özü, Ginseng Özü",
        ingredientsEN: "Caffeine, Biotin, Peptides, Niacinamide, Argan Oil, Rosemary Extract, Ginseng Extract",
        ingredientsRU: "Кофеин, Биотин, Пептиды, Ниацинамид, Аргановое Масло, Экстракт Розмарина, Экстракт Женьшеня",
        ingredientsKA: "კოფეინი, ბიოტინი, პეპტიდები, ნიაცინამიდი, არგანის ზეთი, როზმარინის ექსტრაქტი, ჟენშენის ექსტრაქტი",
        order: 4,
        isActive: true
      },
      {
        slug: "vie-beard-growth-oil",
        nameTR: "Vie Sakal Büyüme Yağı",
        nameEN: "Vie Beard Growth Oil",
        nameRU: "Vie Масло для Роста Бороды",
        nameKA: "Vie წვერის ზრდის ზეთი",
        descriptionTR: "Sakal büyümesini destekleyen ve cildi nemlendiren doğal yağ karışımı.",
        descriptionEN: "Natural oil blend that supports beard growth and moisturizes the skin.",
        descriptionRU: "Натуральная смесь масел, которая поддерживает рост бороды и увлажняет кожу.",
        descriptionKA: "ბუნებრივი ზეთების ნარევი, რომელიც ხელს უწყობს წვერის ზრდას და ატენიანებს კანს.",
        imageUrl: "/images/products/vie-beard-growth-oil.svg",
        usageTR: "Temiz cilde 3-4 damla uygulayın ve nazikçe masaj yapın. Günlük kullanım için uygundur.",
        usageEN: "Apply 3-4 drops to clean skin and massage gently. Suitable for daily use.",
        usageRU: "Нанесите 3-4 капли на чистую кожу и мягко помассируйте. Подходит для ежедневного использования.",
        usageKA: "წაისვით 3-4 წვეთი სუფთა კანზე და ნაზად გაიმასაჟეთ. შესაფერისია ყოველდღიური გამოყენებისთვის.",
        ingredientsTR: "Jojoba Yağı, Argan Yağı, Üzüm Çekirdeği Yağı, Biberiye Özü, E Vitamini, Minoxidil",
        ingredientsEN: "Jojoba Oil, Argan Oil, Grapeseed Oil, Rosemary Extract, Vitamin E, Minoxidil",
        ingredientsRU: "Масло Жожоба, Аргановое Масло, Масло Виноградных Косточек, Экстракт Розмарина, Витамин Е, Миноксидил",
        ingredientsKA: "ჟოჟობას ზეთი, არგანის ზეთი, ყურძნის წიპწის ზეთი, როზმარინის ექსტრაქტი, ვიტამინი E, მინოქსიდილი",
        order: 5,
        isActive: true
      },
      {
        slug: "vie-scalp-therapy-lotion",
        nameTR: "Vie Saç Derisi Terapi Losyonu",
        nameEN: "Vie Scalp Therapy Lotion",
        nameRU: "Vie Лосьон Терапии Кожи Головы",
        nameKA: "Vie თავის კანის თერაპიის ლოსიონი",
        descriptionTR: "Kuru ve kaşıntılı saç derisini yatıştıran ve tedavi eden özel formüllü losyon.",
        descriptionEN: "Specially formulated lotion that soothes and treats dry and itchy scalp.",
        descriptionRU: "Специально разработанный лосьон, успокаивающий и лечащий сухую и зудящую кожу головы.",
        descriptionKA: "სპეციალურად ფორმულირებული ლოსიონი, რომელიც ამშვიდებს და მკურნალობს მშრალ და ქავილიან თავის კანს.",
        imageUrl: "/images/products/vie-scalp-therapy-lotion.svg",
        usageTR: "Temiz saç derisine uygulayın ve nazikçe masaj yapın. Durulamayın. Haftada 2-3 kez kullanın.",
        usageEN: "Apply to clean scalp and massage gently. Do not rinse. Use 2-3 times per week.",
        usageRU: "Нанесите на чистую кожу головы и мягко помассируйте. Не смывайте. Используйте 2-3 раза в неделю.",
        usageKA: "წაისვით სუფთა თავის კანზე და ნაზად გაიმასაჟეთ. არ გაირეცხოთ. გამოიყენეთ კვირაში 2-3-ჯერ.",
        ingredientsTR: "Aloe Vera, Çay Ağacı Yağı, Salisilik Asit, Menthol, Panthenol, Niasinamid",
        ingredientsEN: "Aloe Vera, Tea Tree Oil, Salicylic Acid, Menthol, Panthenol, Niacinamide",
        ingredientsRU: "Алоэ Вера, Масло Чайного Дерева, Салициловая Кислота, Ментол, Пантенол, Ниацинамид",
        ingredientsKA: "ალოე ვერა, ჩაის ხის ზეთი, სალიცილის მჟავა, მენთოლი, პანთენოლი, ნიაცინამიდი",
        order: 6,
        isActive: true
      },
      {
        slug: "vie-argan-hair-oil",
        nameTR: "Vie Argan Saç Yağı",
        nameEN: "Vie Argan Hair Oil",
        nameRU: "Vie Аргановое Масло для Волос",
        nameKA: "Vie არგანის თმის ზეთი",
        descriptionTR: "Kuru ve yıpranmış saçları besleyen ve parlaklaştıran lüks argan yağı formülü.",
        descriptionEN: "Luxurious argan oil formula that nourishes and adds shine to dry and damaged hair.",
        descriptionRU: "Роскошная формула арганового масла, питающая и придающая блеск сухим и поврежденным волосам.",
        descriptionKA: "ძვირფასი არგანის ზეთის ფორმულა, რომელიც კვებავს და ბზინვარებას ანიჭებს მშრალ და დაზიანებულ თმას.",
        imageUrl: "/images/products/vie-argan-hair-oil.svg",
        usageTR: "Nemli veya kuru saçlara birkaç damla uygulayın. Durulama gerektirmez. Günlük kullanıma uygundur.",
        usageEN: "Apply a few drops to damp or dry hair. No need to rinse. Suitable for daily use.",
        usageRU: "Нанесите несколько капель на влажные или сухие волосы. Не требует смывания. Подходит для ежедневного использования.",
        usageKA: "წაისვით რამდენიმე წვეთი ნოტიო ან მშრალ თმაზე. არ საჭიროებს გარეცხვას. შესაფერისია ყოველდღიური გამოყენებისთვის.",
        ingredientsTR: "Argan Yağı, Jojoba Yağı, Hindistan Cevizi Yağı, E Vitamini, Keten Tohumu Yağı",
        ingredientsEN: "Argan Oil, Jojoba Oil, Coconut Oil, Vitamin E, Flaxseed Oil",
        ingredientsRU: "Аргановое Масло, Масло Жожоба, Кокосовое Масло, Витамин Е, Льняное Масло",
        ingredientsKA: "არგანის ზეთი, ჟოჟობას ზეთი, ქოქოსის ზეთი, ვიტამინი E, სელის ზეთი",
        order: 7,
        isActive: true
      },
      {
        slug: "vie-hair-repair-conditioner",
        nameTR: "Vie Saç Onarıcı Saç Kremi",
        nameEN: "Vie Hair Repair Conditioner",
        nameRU: "Vie Восстанавливающий Кондиционер для Волос",
        nameKA: "Vie თმის აღმდგენი კონდიციონერი",
        descriptionTR: "Yıpranmış ve boyalı saçlar için derinlemesine onarım sağlayan zengin saç kremi.",
        descriptionEN: "Rich conditioner that provides deep repair for damaged and colored hair.",
        descriptionRU: "Насыщенный кондиционер, обеспечивающий глубокое восстановление поврежденных и окрашенных волос.",
        descriptionKA: "მდიდარი კონდიციონერი, რომელიც უზრუნველყოფს ღრმა აღდგენას დაზიანებული და შეღებილი თმისთვის.",
        imageUrl: "/images/products/vie-hair-repair-conditioner.svg",
        usageTR: "Şampuanla yıkadıktan sonra nemli saça uygulayın, 2-3 dakika bekletin ve durulayın. Her yıkamada kullanılabilir.",
        usageEN: "Apply to damp hair after shampooing, wait 2-3 minutes, and rinse. Can be used with every wash.",
        usageRU: "Нанесите на влажные волосы после мытья шампунем, подождите 2-3 минуты и смойте. Можно использовать при каждом мытье.",
        usageKA: "წაისვით ნოტიო თმაზე შამპუნის შემდეგ, დაელოდეთ 2-3 წუთი და გაიწმინდეთ. შეიძლება გამოყენებული იყოს ყოველი დაბანისას.",
        ingredientsTR: "Su, Keratin, Argan Yağı, Hindistan Cevizi Yağı, Shea Yağı, Protein Kompleksi, Biotin",
        ingredientsEN: "Water, Keratin, Argan Oil, Coconut Oil, Shea Butter, Protein Complex, Biotin",
        ingredientsRU: "Вода, Кератин, Аргановое Масло, Кокосовое Масло, Масло Ши, Протеиновый Комплекс, Биотин",
        ingredientsKA: "წყალი, კერატინი, არგანის ზეთი, ქოქოსის ზეთი, შეას კარაქი, ცილოვანი კომპლექსი, ბიოტინი",
        order: 8,
        isActive: true
      }
    ];
    
    const addedProducts = [];
    
    for (const productData of products) {
      const newProduct = await storage.createProduct(productData);
      addedProducts.push(newProduct);
    }
    
    return res.status(201).json({
      message: `${addedProducts.length} ürün başarıyla eklendi.`,
      products: addedProducts
    });
    
  } catch (error) {
    console.error("Vithair ürünleri eklenirken hata oluştu:", error);
    return res.status(500).json({
      message: "Ürünler eklenirken bir hata oluştu.",
      error: (error as Error).message
    });
  }
}