import { Request, Response } from "express";
import { storage } from "../storage";

// Seed Vithair hair products
export async function seedVithairProducts(req: Request, res: Response) {
  try {
    // Delete existing products if any
    const existingProducts = await storage.getProducts();
    for (const product of existingProducts) {
      await storage.deleteProduct(product.id);
    }

    const products = [
      {
        slug: "vie-anti-hair-loss-shampoo",
        nameTR: "Vie Saç Dökülmesine Karşı Şampuan",
        nameEN: "Vie Anti Hair Loss Shampoo",
        nameRU: "Vie Шампунь против выпадения волос",
        nameKA: "Vie თმის ცვენის საწინააღმდეგო შამპუნი",
        descriptionTR: "Saç dökülmesine karşı etkili formül içeren bu şampuan, saç köklerini güçlendirir ve saç dökülmesini önlemeye yardımcı olur.",
        descriptionEN: "This shampoo contains an effective formula against hair loss that strengthens hair roots and helps prevent hair loss.",
        descriptionRU: "Этот шампунь содержит эффективную формулу против выпадения волос, которая укрепляет корни волос и помогает предотвратить их выпадение.",
        descriptionKA: "ეს შამპუნი შეიცავს ეფექტურ ფორმულას თმის ცვენის წინააღმდეგ, რომელიც აძლიერებს თმის ფესვებს და ხელს უწყობს თმის ცვენის პრევენციას.",
        usageTR: "Islak saça uygulayın, nazikçe masaj yapın ve durulayın. En iyi sonuç için haftada en az 3 kez kullanın.",
        usageEN: "Apply to wet hair, massage gently, and rinse. Use at least 3 times per week for best results.",
        usageRU: "Нанесите на влажные волосы, аккуратно помассируйте и смойте. Используйте не менее 3 раз в неделю для достижения наилучших результатов.",
        usageKA: "წაუსვით სველ თმას, ფრთხილად დაიმასაჟეთ და გაავლეთ. გამოიყენეთ კვირაში მინიმუმ 3-ჯერ საუკეთესო შედეგებისთვის.",
        ingredientsTR: "Su, Sodyum Laureth Sülfat, Kakao Yağı, Argan Yağı, Bitkisel Proteinler, Biotin, Keratin",
        ingredientsEN: "Water, Sodium Laureth Sulfate, Cocoa Butter, Argan Oil, Vegetable Proteins, Biotin, Keratin",
        ingredientsRU: "Вода, Лаурет Сульфат Натрия, Масло Какао, Аргановое Масло, Растительные Белки, Биотин, Кератин",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეტ სულფატი, კაკაოს კარაქი, არგანის ზეთი, მცენარეული ცილები, ბიოტინი, კერატინი",
        imageUrl: "/images/products/vie-anti-hair-loss-shampoo.svg",
        order: 1,
        isActive: true
      },
      {
        slug: "vie-volumizing-shampoo",
        nameTR: "Vie Saç Hacim Şampuanı",
        nameEN: "Vie Volumizing Shampoo",
        nameRU: "Vie Шампунь для объема волос",
        nameKA: "Vie მოცულობის შამპუნი",
        descriptionTR: "İnce telli saçlar için özel olarak formüle edilmiş bu şampuan, saçlara ekstra hacim ve canlılık kazandırır.",
        descriptionEN: "Specially formulated for fine hair, this shampoo gives extra volume and vitality to your hair.",
        descriptionRU: "Специально разработанный для тонких волос, этот шампунь придает волосам дополнительный объем и жизненную силу.",
        descriptionKA: "სპეციალურად ფორმულირებული თხელი თმისთვის, ეს შამპუნი აძლევს დამატებით მოცულობას და სიცოცხლეს თქვენს თმას.",
        usageTR: "Islak saça uygulayın, masaj yapın ve iyice durulayın. Hacim için köklerden uçlara doğru masaj yapın.",
        usageEN: "Apply to wet hair, massage, and rinse thoroughly. Massage from roots to ends for volume.",
        usageRU: "Нанесите на влажные волосы, помассируйте и тщательно смойте. Для объема массируйте от корней до кончиков.",
        usageKA: "წაუსვით სველ თმას, დაიმასაჟეთ და საფუძვლიანად გაავლეთ. დაიმასაჟეთ ფესვებიდან ბოლოებამდე მოცულობისთვის.",
        ingredientsTR: "Su, Sodyum Laureth Sülfat, Hindistan Cevizi Yağı, Pantenol, Keratin, E Vitamini",
        ingredientsEN: "Water, Sodium Laureth Sulfate, Coconut Oil, Panthenol, Keratin, Vitamin E",
        ingredientsRU: "Вода, Лаурет Сульфат Натрия, Кокосовое Масло, Пантенол, Кератин, Витамин Е",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეტ სულფატი, ქოქოსის ზეთი, პანთენოლი, კერატინი, ვიტამინი E",
        imageUrl: "/images/products/vie-volumizing-shampoo.svg",
        order: 2,
        isActive: true
      },
      {
        slug: "vie-keratin-hair-mask",
        nameTR: "Vie Keratin Saç Maskesi",
        nameEN: "Vie Keratin Hair Mask",
        nameRU: "Vie Кератиновая маска для волос",
        nameKA: "Vie კერატინის თმის ნიღაბი",
        descriptionTR: "Yoğun keratin içeren bu maske, yıpranmış saçları onarır, güçlendirir ve parlaklık kazandırır.",
        descriptionEN: "This mask, rich in keratin, repairs damaged hair, strengthens it, and adds shine.",
        descriptionRU: "Эта маска, богатая кератином, восстанавливает поврежденные волосы, укрепляет их и придает блеск.",
        descriptionKA: "ეს ნიღაბი, მდიდარი კერატინით, არემონტებს დაზიანებულ თმას, აძლიერებს მას და მატებს ბზინვარებას.",
        usageTR: "Yıkanmış saça uygulayın, 10-15 dakika bekletin ve iyice durulayın. Haftada 1-2 kez kullanın.",
        usageEN: "Apply to washed hair, leave for 10-15 minutes, and rinse thoroughly. Use 1-2 times per week.",
        usageRU: "Нанесите на вымытые волосы, оставьте на 10-15 минут и тщательно смойте. Используйте 1-2 раза в неделю.",
        usageKA: "წაუსვით გარეცხილ თმას, დატოვეთ 10-15 წუთი და საფუძვლიანად გაავლეთ. გამოიყენეთ კვირაში 1-2-ჯერ.",
        ingredientsTR: "Su, Keratin, Argan Yağı, Makadamya Yağı, Shea Yağı, E Vitamini",
        ingredientsEN: "Water, Keratin, Argan Oil, Macadamia Oil, Shea Butter, Vitamin E",
        ingredientsRU: "Вода, Кератин, Аргановое Масло, Масло Макадамии, Масло Ши, Витамин Е",
        ingredientsKA: "წყალი, კერატინი, არგანის ზეთი, მაკადამიის ზეთი, ში კარაქი, ვიტამინი E",
        imageUrl: "/images/products/vie-keratin-hair-mask.svg",
        order: 3,
        isActive: true
      },
      {
        slug: "vie-hair-growth-serum",
        nameTR: "Vie Saç Büyüme Serumu",
        nameEN: "Vie Hair Growth Serum",
        nameRU: "Vie Сыворотка для роста волос",
        nameKA: "Vie თმის ზრდის შრატი",
        descriptionTR: "Bu konsantre serum, saç büyümesini uyarır, dökülmeyi azaltır ve saç köklerini güçlendirir.",
        descriptionEN: "This concentrated serum stimulates hair growth, reduces hair loss, and strengthens hair follicles.",
        descriptionRU: "Эта концентрированная сыворотка стимулирует рост волос, уменьшает их выпадение и укрепляет волосяные фолликулы.",
        descriptionKA: "ეს კონცენტრირებული შრატი ასტიმულირებს თმის ზრდას, ამცირებს თმის ცვენას და აძლიერებს თმის ფოლიკულებს.",
        usageTR: "Temiz, kuru saç derisine direkt uygulayın ve nazikçe masaj yapın. Günde 1 kez kullanın.",
        usageEN: "Apply directly to clean, dry scalp and massage gently. Use once daily.",
        usageRU: "Нанесите непосредственно на чистую, сухую кожу головы и аккуратно помассируйте. Используйте один раз в день.",
        usageKA: "წაუსვით პირდაპირ სუფთა, მშრალ თავის კანს და ფრთხილად დაიმასაჟეთ. გამოიყენეთ დღეში ერთხელ.",
        ingredientsTR: "Su, Kafein, Biyotin, Niasinamid, Peptitler, Procapil, Pantenol",
        ingredientsEN: "Water, Caffeine, Biotin, Niacinamide, Peptides, Procapil, Panthenol",
        ingredientsRU: "Вода, Кофеин, Биотин, Ниацинамид, Пептиды, Прокапил, Пантенол",
        ingredientsKA: "წყალი, კაფეინი, ბიოტინი, ნიაცინამიდი, პეპტიდები, პროკაპილი, პანთენოლი",
        imageUrl: "/images/products/vie-hair-growth-serum.svg",
        order: 4,
        isActive: true
      },
      {
        slug: "vie-beard-growth-oil",
        nameTR: "Vie Sakal Büyüme Yağı",
        nameEN: "Vie Beard Growth Oil",
        nameRU: "Vie Масло для роста бороды",
        nameKA: "Vie წვერის ზრდის ზეთი",
        descriptionTR: "Özel olarak formüle edilmiş bu yağ, sakal büyümesini teşvik eder, kaşıntıyı azaltır ve sakalı yumuşatır.",
        descriptionEN: "This specially formulated oil promotes beard growth, reduces itching, and softens the beard.",
        descriptionRU: "Это специально разработанное масло способствует росту бороды, уменьшает зуд и смягчает бороду.",
        descriptionKA: "ეს სპეციალურად ფორმულირებული ზეთი ხელს უწყობს წვერის ზრდას, ამცირებს ქავილს და არბილებს წვერს.",
        usageTR: "Birkaç damla yağı avucunuza alın, elleriniz arasında yayın ve sakalınıza masaj yaparak uygulayın. Günde 1-2 kez kullanın.",
        usageEN: "Take a few drops of oil in your palm, spread between your hands, and apply to your beard by massaging. Use 1-2 times daily.",
        usageRU: "Возьмите несколько капель масла на ладонь, распределите между руками и нанесите на бороду, массируя. Используйте 1-2 раза в день.",
        usageKA: "აიღეთ რამდენიმე წვეთი ზეთი ხელისგულზე, გაშალეთ ხელებს შორის და წაუსვით წვერს მასაჟით. გამოიყენეთ დღეში 1-2-ჯერ.",
        ingredientsTR: "Argan Yağı, Jojoba Yağı, Biberiye Yağı, Kekik Yağı, E Vitamini, Üzüm Çekirdeği Yağı",
        ingredientsEN: "Argan Oil, Jojoba Oil, Rosemary Oil, Thyme Oil, Vitamin E, Grapeseed Oil",
        ingredientsRU: "Аргановое Масло, Масло Жожоба, Масло Розмарина, Масло Тимьяна, Витамин Е, Масло Виноградных Косточек",
        ingredientsKA: "არგანის ზეთი, ჟოჟობას ზეთი, როზმარინის ზეთი, ურცის ზეთი, ვიტამინი E, ყურძნის წიპწის ზეთი",
        imageUrl: "/images/products/vie-beard-growth-oil.svg",
        order: 5,
        isActive: true
      },
      {
        slug: "vie-scalp-therapy-lotion",
        nameTR: "Vie Saç Derisi Terapi Losyonu",
        nameEN: "Vie Scalp Therapy Lotion",
        nameRU: "Vie Лосьон для терапии кожи головы",
        nameKA: "Vie თავის კანის თერაპიის ლოსიონი",
        descriptionTR: "Hassas ve kuru saç derisi için özel olarak geliştirilmiş bu losyon, saç derisini yatıştırır, nemlenmesini sağlar ve sağlıklı kalmaya yardımcı olur.",
        descriptionEN: "Specially developed for sensitive and dry scalps, this lotion soothes the scalp, provides hydration, and helps it stay healthy.",
        descriptionRU: "Специально разработанный для чувствительной и сухой кожи головы, этот лосьон успокаивает кожу головы, обеспечивает увлажнение и помогает ей оставаться здоровой.",
        descriptionKA: "სპეციალურად შექმნილი მგრძნობიარე და მშრალი თავის კანისთვის, ეს ლოსიონი ამშვიდებს თავის კანს, უზრუნველყოფს ჰიდრატაციას და ეხმარება მას ჯანმრთელად დარჩენაში.",
        usageTR: "Temiz saça uygulayın ve saç derisine nazikçe masaj yapın. Durulamayın. Haftada 2-3 kez kullanın.",
        usageEN: "Apply to clean hair and gently massage into scalp. Do not rinse. Use 2-3 times per week.",
        usageRU: "Нанесите на чистые волосы и аккуратно вмассируйте в кожу головы. Не смывайте. Используйте 2-3 раза в неделю.",
        usageKA: "წაუსვით სუფთა თმას და ფრთხილად დაიმასაჟეთ თავის კანში. არ გაავლოთ. გამოიყენეთ კვირაში 2-3-ჯერ.",
        ingredientsTR: "Su, Pantenol, Aloe Vera, Çay Ağacı Yağı, Glikolik Asit, Hiyalüronik Asit, Allantoin",
        ingredientsEN: "Water, Panthenol, Aloe Vera, Tea Tree Oil, Glycolic Acid, Hyaluronic Acid, Allantoin",
        ingredientsRU: "Вода, Пантенол, Алоэ Вера, Масло Чайного Дерева, Гликолевая Кислота, Гиалуроновая Кислота, Аллантоин",
        ingredientsKA: "წყალი, პანთენოლი, ალოე ვერა, ჩაის ხის ზეთი, გლიკოლის მჟავა, ჰიალურონის მჟავა, ალანტოინი",
        imageUrl: "/images/products/vie-scalp-therapy-lotion.svg",
        order: 6,
        isActive: true
      },
      {
        slug: "vie-argan-hair-oil",
        nameTR: "Vie Argan Saç Yağı",
        nameEN: "Vie Argan Hair Oil",
        nameRU: "Vie Аргановое масло для волос",
        nameKA: "Vie არგანის თმის ზეთი",
        descriptionTR: "Saf argan yağından yapılan bu ürün, saçları besler, onarır ve ipeksi pürüzsüzlük sağlar.",
        descriptionEN: "Made from pure argan oil, this product nourishes, repairs, and provides silky smoothness to hair.",
        descriptionRU: "Сделанный из чистого арганового масла, этот продукт питает, восстанавливает и придает волосам шелковистую гладкость.",
        descriptionKA: "დამზადებული სუფთა არგანის ზეთისგან, ეს პროდუქტი კვებავს, აღადგენს და უზრუნველყოფს აბრეშუმისებრ სიგლუვეს თმას.",
        usageTR: "Nemli veya kuru saça birkaç damla uygulayın. Özellikle saç uçlarına odaklanın. Yıkamayın.",
        usageEN: "Apply a few drops to damp or dry hair. Focus especially on hair ends. Do not wash out.",
        usageRU: "Нанесите несколько капель на влажные или сухие волосы. Сосредоточьтесь особенно на кончиках волос. Не смывайте.",
        usageKA: "წაუსვით რამდენიმე წვეთი ნესტიან ან მშრალ თმას. განსაკუთრებით ყურადღება მიაქციეთ თმის ბოლოებს. არ ჩამოიბანოთ.",
        ingredientsTR: "Saf Argan Yağı, E Vitamini",
        ingredientsEN: "Pure Argan Oil, Vitamin E",
        ingredientsRU: "Чистое Аргановое Масло, Витамин Е",
        ingredientsKA: "სუფთა არგანის ზეთი, ვიტამინი E",
        imageUrl: "/images/products/vie-argan-hair-oil.svg",
        order: 7,
        isActive: true
      },
      {
        slug: "vie-hair-repair-conditioner",
        nameTR: "Vie Saç Onarıcı Saç Kremi",
        nameEN: "Vie Hair Repair Conditioner",
        nameRU: "Vie Восстанавливающий кондиционер для волос",
        nameKA: "Vie თმის აღმდგენი კონდიციონერი",
        descriptionTR: "Yıpranmış ve hasar görmüş saçlar için ideal olan bu saç kremi, saçları derinlemesine besler, yumuşatır ve yönetimi kolaylaştırır.",
        descriptionEN: "Ideal for worn and damaged hair, this conditioner deeply nourishes hair, softens it, and makes it easier to manage.",
        descriptionRU: "Идеально подходящий для поврежденных волос, этот кондиционер глубоко питает волосы, смягчает их и облегчает укладку.",
        descriptionKA: "იდეალური გაცვეთილი და დაზიანებული თმისთვის, ეს კონდიციონერი ღრმად კვებავს თმას, არბილებს მას და ამარტივებს მის მართვას.",
        usageTR: "Şampuandan sonra uygulayın, 2-3 dakika bekletin ve durulayın. Haftada en az 2 kez kullanın.",
        usageEN: "Apply after shampooing, leave for 2-3 minutes, and rinse. Use at least twice a week.",
        usageRU: "Нанесите после мытья шампунем, оставьте на 2-3 минуты и смойте. Используйте не менее двух раз в неделю.",
        usageKA: "წაუსვით დაბანის შემდეგ, დატოვეთ 2-3 წუთი და გაავლეთ. გამოიყენეთ კვირაში მინიმუმ ორჯერ.",
        ingredientsTR: "Su, Hindistan Cevizi Yağı, Keratin, Şea Yağı, Pantenol, E Vitamini, Jojoba Yağı",
        ingredientsEN: "Water, Coconut Oil, Keratin, Shea Butter, Panthenol, Vitamin E, Jojoba Oil",
        ingredientsRU: "Вода, Кокосовое Масло, Кератин, Масло Ши, Пантенол, Витамин Е, Масло Жожоба",
        ingredientsKA: "წყალი, ქოქოსის ზეთი, კერატინი, ში კარაქი, პანთენოლი, ვიტამინი E, ჟოჟობას ზეთი",
        imageUrl: "/images/products/vie-hair-repair-conditioner.svg",
        order: 8,
        isActive: true
      }
    ];

    const createdProducts = [];

    for (const product of products) {
      const newProduct = await storage.createProduct(product);
      createdProducts.push(newProduct);
    }

    res.status(200).json({
      message: "Vithair ürünleri başarıyla eklendi",
      products: createdProducts
    });
  } catch (error) {
    console.error("Error seeding Vithair products:", error);
    res.status(500).json({ error: "Vithair ürünleri eklenirken bir hata oluştu" });
  }
}