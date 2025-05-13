import { Request, Response } from "express";
import { storage } from "../storage";

// Seed Vithair hair products
export async function seedVithairProducts(req: Request, res: Response) {
  try {
    // Define Vithair products with improved descriptions and matching existing image URLs
    const products = [
      {
        nameTR: "Saç Dökülmesine Karşı Şampuan",
        nameEN: "Anti Hair Loss Shampoo",
        nameRU: "Шампунь против выпадения волос",
        nameKA: "თმის ცვენის საწინააღმდეგო შამპუნი",
        slug: "anti-hair-loss-shampoo",
        descriptionTR: "Saç dökülmesini önleyen, saç köklerini güçlendiren ve saç büyümesini hızlandıran özel formüllü şampuan. İçeriğindeki biotin ve keratin ile saçların sağlıklı görünmesini sağlar.",
        descriptionEN: "Specially formulated shampoo that prevents hair loss, strengthens hair roots and accelerates hair growth. Its biotin and keratin content helps hair look healthy.",
        descriptionRU: "Специально разработанный шампунь, предотвращающий выпадение волос, укрепляющий корни волос и ускоряющий их рост. Биотин и кератин в составе помогают волосам выглядеть здоровыми.",
        descriptionKA: "სპეციალურად შემუშავებული შამპუნი, რომელიც ხელს უშლის თმის ცვენას, აძლიერებს თმის ფესვებს და აჩქარებს თმის ზრდას. ბიოტინის და კერატინის შემცველობა ეხმარება თმას ჯანსაღად გამოიყურებოდეს.",
        usageTR: "Islak saça uygulayın, nazikçe masaj yapın ve durulayın. En iyi sonuçlar için haftada en az 3 kez kullanın.",
        usageEN: "Apply to wet hair, gently massage, and rinse. Use at least 3 times per week for best results.",
        usageRU: "Нанесите на влажные волосы, аккуратно помассируйте и смойте. Используйте не менее 3 раз в неделю для достижения наилучших результатов.",
        usageKA: "წაუსვით სველ თმას, ფრთხილად დაიმასაჟეთ და გაავლეთ. გამოიყენეთ კვირაში მინიმუმ 3-ჯერ საუკეთესო შედეგებისთვის.",
        ingredientsTR: "Su, Sodyum Laureth Sülfat, Kakao Yağı, Argan Yağı, Bitkisel Proteinler, Biotin, Keratin",
        ingredientsEN: "Water, Sodium Laureth Sulfate, Cocoa Butter, Argan Oil, Vegetable Proteins, Biotin, Keratin",
        ingredientsRU: "Вода, Лаурет Сульфат Натрия, Масло Какао, Аргановое Масло, Растительные Белки, Биотин, Кератин",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეტ სულფატი, კაკაოს კარაქი, არგანის ზეთი, მცენარეული ცილები, ბიოტინი, კერატინი",
        imageUrl: "/images/products/vie-anti-hair-loss-shampoo.svg",
        order: 1,
        isActive: true,
        isNew: true,
        price: 29.99,
        currency: "EUR",
        category: "shampoo"
      },
      {
        nameTR: "Saç Büyüme Serumu",
        nameEN: "Hair Growth Serum",
        nameRU: "Сыворотка для роста волос",
        nameKA: "თმის ზრდის შრატი",
        slug: "hair-growth-serum",
        descriptionTR: "Saç ekimi sonrası iyileşme sürecini hızlandıran ve yeni saç köklerinin sağlıklı büyümesini destekleyen özel formüllü serum. İçeriğindeki doğal bileşenler saç derisini besler.",
        descriptionEN: "Special formula serum that accelerates the healing process after hair transplantation and supports healthy growth of new hair follicles. Natural ingredients nourish the scalp.",
        descriptionRU: "Сыворотка специальной формулы, ускоряющая процесс заживления после трансплантации волос и поддерживающая здоровый рост новых волосяных фолликулов. Натуральные ингредиенты питают кожу головы.",
        descriptionKA: "სპეციალური ფორმულის შრატი, რომელიც აჩქარებს შეხორცების პროცესს თმის გადანერგვის შემდეგ და ხელს უწყობს ახალი თმის ფოლიკულების ჯანსაღ ზრდას. ბუნებრივი ინგრედიენტები კვებავს თავის კანს.",
        usageTR: "Temiz ve kuru saç derisine uygulayın, hafifçe masaj yaparak yediriniz. Günde 1-2 kez kullanın.",
        usageEN: "Apply to clean, dry scalp and massage gently. Use 1-2 times daily.",
        usageRU: "Нанесите на чистую, сухую кожу головы и аккуратно помассируйте. Используйте 1-2 раза в день.",
        usageKA: "წაუსვით სუფთა, მშრალ თავის კანს და ნაზად დაიმასაჟეთ. გამოიყენეთ დღეში 1-2-ჯერ.",
        ingredientsTR: "Saf Su, Panthenol, Biotin, Niacinamide, Kafein, Saw Palmetto Özütü, Ginseng Kökü",
        ingredientsEN: "Purified Water, Panthenol, Biotin, Niacinamide, Caffeine, Saw Palmetto Extract, Ginseng Root",
        ingredientsRU: "Очищенная Вода, Пантенол, Биотин, Ниацинамид, Кофеин, Экстракт Пальметто, Корень Женьшеня",
        ingredientsKA: "გასუფთავებული წყალი, პანთენოლი, ბიოტინი, ნიაცინამიდი, კოფეინი, პალმეტოს ექსტრაქტი, ჟენშენის ფესვი",
        imageUrl: "/images/products/vie-hair-growth-serum.svg",
        order: 2,
        isActive: true,
        isNew: true,
        price: 39.99,
        currency: "EUR",
        category: "serum"
      },
      {
        nameTR: "Argan Saç Yağı",
        nameEN: "Argan Hair Oil",
        nameRU: "Аргановое масло для волос",
        nameKA: "არგანის თმის ზეთი",
        slug: "argan-hair-oil",
        descriptionTR: "Saç sağlığını içten destekleyen, kuru ve yıpranmış saçları onaran zengin argan yağı formülü. E vitamini ve doğal antioksidanlarla saçları besler, parlaklık kazandırır.",
        descriptionEN: "Rich argan oil formula that supports hair health from within and repairs dry and damaged hair. Nourishes hair with vitamin E and natural antioxidants, adds shine.",
        descriptionRU: "Богатая формула арганового масла, поддерживающая здоровье волос изнутри и восстанавливающая сухие и поврежденные волосы. Питает волосы витамином Е и природными антиоксидантами, придает блеск.",
        descriptionKA: "არგანის ზეთის მდიდარი ფორმულა, რომელიც ხელს უწყობს თმის ჯანმრთელობას შიგნიდან და აღადგენს მშრალ და დაზიანებულ თმას. კვებავს თმას ვიტამინით E და ბუნებრივი ანტიოქსიდანტებით, ანიჭებს ბზინვარებას.",
        usageTR: "Birkaç damla yağı avucunuzda ısıtın ve nemli veya kuru saçlara uygulayın. Gerektiğinde tekrarlayın.",
        usageEN: "Warm a few drops of oil in your palm and apply to damp or dry hair. Repeat as needed.",
        usageRU: "Согрейте несколько капель масла в ладони и нанесите на влажные или сухие волосы. Повторяйте по мере необходимости.",
        usageKA: "გაათბეთ რამდენიმე წვეთი ზეთი ხელისგულზე და წაუსვით ნესტიან ან მშრალ თმას. გაიმეორეთ საჭიროებისამებრ.",
        ingredientsTR: "Argan Yağı, Jojoba Yağı, E Vitamini, Hindistan Cevizi Yağı, Tatlı Badem Yağı",
        ingredientsEN: "Argan Oil, Jojoba Oil, Vitamin E, Coconut Oil, Sweet Almond Oil",
        ingredientsRU: "Аргановое Масло, Масло Жожоба, Витамин Е, Кокосовое Масло, Масло Сладкого Миндаля",
        ingredientsKA: "არგანის ზეთი, ჟოჟობას ზეთი, ვიტამინი E, ქოქოსის ზეთი, ტკბილი ნუშის ზეთი",
        imageUrl: "/images/products/vie-argan-hair-oil.svg",
        order: 3,
        isActive: true,
        isNew: false,
        price: 24.99,
        currency: "EUR",
        category: "oil"
      },
      {
        nameTR: "Sakal Büyüme Yağı",
        nameEN: "Beard Growth Oil",
        nameRU: "Масло для роста бороды",
        nameKA: "წვერის ზრდის ზეთი",
        slug: "beard-growth-oil",
        descriptionTR: "Sakal büyümesini teşvik eden, sakal derisini nemlendiren ve kaşıntıyı azaltan besleyici yağ karışımı. Sakalınızı daha gür ve sağlıklı gösterir.",
        descriptionEN: "Nourishing oil blend that promotes beard growth, moisturizes beard skin, and reduces itching. Makes your beard appear fuller and healthier.",
        descriptionRU: "Питательная смесь масел, стимулирующая рост бороды, увлажняющая кожу под бородой и уменьшающая зуд. Делает вашу бороду более густой и здоровой.",
        descriptionKA: "მკვებავი ზეთების ნარევი, რომელიც ხელს უწყობს წვერის ზრდას, ატენიანებს წვერის კანს და ამცირებს ქავილს. ხდის თქვენს წვერს უფრო სავსეს და ჯანმრთელს.",
        usageTR: "Birkaç damla yağı avucunuza alın, elleriniz arasında yayın ve sakalınıza masaj yaparak uygulayın. Günde 1-2 kez kullanın.",
        usageEN: "Take a few drops of oil in your palm, spread between hands and apply to beard with massage. Use 1-2 times daily.",
        usageRU: "Возьмите несколько капель масла на ладонь, распределите между руками и нанесите на бороду, массируя. Используйте 1-2 раза в день.",
        usageKA: "აიღეთ რამდენიმე წვეთი ზეთი ხელისგულზე, გაშალეთ ხელებს შორის და წაუსვით წვერს მასაჟით. გამოიყენეთ დღეში 1-2-ჯერ.",
        ingredientsTR: "Argan Yağı, Jojoba Yağı, Biberiye Yağı, Kekik Yağı, E Vitamini, Üzüm Çekirdeği Yağı",
        ingredientsEN: "Argan Oil, Jojoba Oil, Rosemary Oil, Thyme Oil, Vitamin E, Grapeseed Oil",
        ingredientsRU: "Аргановое Масло, Масло Жожоба, Масло Розмарина, Масло Тимьяна, Витамин Е, Масло Виноградных Косточек",
        ingredientsKA: "არგანის ზეთი, ჟოჟობას ზეთი, როზმარინის ზეთი, ურცის ზეთი, ვიტამინი E, ყურძნის წიპწის ზეთი",
        imageUrl: "/images/products/vie-beard-growth-oil.svg",
        order: 4,
        isActive: true,
        isNew: false,
        price: 24.99,
        currency: "EUR",
        category: "oil"
      },
      {
        nameTR: "Keratin Saç Maskesi",
        nameEN: "Keratin Hair Mask",
        nameRU: "Кератиновая маска для волос",
        nameKA: "კერატინის თმის ნიღაბი",
        slug: "keratin-hair-mask",
        descriptionTR: "Saç dökülmesine karşı etkili, saçları güçlendiren ve yenileyen keratin içerikli bakım maskesi. Düzenli kullanımda saçları yıpranmaya karşı korur.",
        descriptionEN: "Effective hair care mask with keratin content that fights hair loss, strengthens and renews hair. Protects hair against damage with regular use.",
        descriptionRU: "Эффективная маска для волос с содержанием кератина, которая борется с выпадением волос, укрепляет и обновляет волосы. Защищает волосы от повреждений при регулярном использовании.",
        descriptionKA: "ეფექტური თმის მოვლის ნიღაბი კერატინის შემცველობით, რომელიც ებრძვის თმის ცვენას, აძლიერებს და განაახლებს თმას. იცავს თმას დაზიანებისგან რეგულარული გამოყენებით.",
        usageTR: "Yıkama sonrası nemli saça uygulayın, 2-3 dakika bekletin ve durulayın. Haftada en az iki kez kullanın.",
        usageEN: "Apply to damp hair after washing, leave for 2-3 minutes, and rinse. Use at least twice a week.",
        usageRU: "Нанесите на влажные волосы после мытья, оставьте на 2-3 минуты и смойте. Используйте не менее двух раз в неделю.",
        usageKA: "წაუსვით დაბანის შემდეგ, დატოვეთ 2-3 წუთი და გაავლეთ. გამოიყენეთ კვირაში მინიმუმ ორჯერ.",
        ingredientsTR: "Su, Hindistan Cevizi Yağı, Keratin, Şea Yağı, Pantenol, E Vitamini, Jojoba Yağı",
        ingredientsEN: "Water, Coconut Oil, Keratin, Shea Butter, Panthenol, Vitamin E, Jojoba Oil",
        ingredientsRU: "Вода, Кокосовое Масло, Кератин, Масло Ши, Пантенол, Витамин Е, Масло Жожоба",
        ingredientsKA: "წყალი, ქოქოსის ზეთი, კერატინი, ში კარაქი, პანთენოლი, ვიტამინი E, ჟოჟობას ზეთი",
        imageUrl: "/images/products/vie-keratin-hair-mask.svg",
        order: 5,
        isActive: true,
        isNew: false,
        price: 34.99,
        currency: "EUR",
        category: "mask"
      },
      {
        nameTR: "Vie Saç Hacim Şampuanı",
        nameEN: "Vie Volumizing Shampoo",
        nameRU: "Vie Шампунь для объема волос",
        nameKA: "Vie მოცულობის შამპუნი",
        slug: "volumizing-shampoo",
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
        ingredientsRU: "Вода, Лаурет Сульфат Натрия, Масло Какао, Аргановое Масло, Растительные Белки, Биотин, Кератин",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეტ სულფატი, ქოქოსის ზეთი, პანთენოლი, კერატინი, ვიტამინი E",
        imageUrl: "/images/products/vie-volumizing-shampoo.svg",
        order: 6,
        isActive: true,
        isNew: false,
        price: 27.99,
        currency: "EUR",
        category: "shampoo"
      },
      {
        nameTR: "Vie Saç Onarıcı Saç Kremi",
        nameEN: "Vie Hair Repair Conditioner",
        nameRU: "Vie Восстанавливающий кондиционер для волос",
        nameKA: "Vie თმის აღმდგენი კონდიციონერი",
        slug: "hair-repair-conditioner",
        descriptionTR: "Yıpranmış ve hasar görmüş saçlar için ideal olan bu saç kremi, saçları derinlemesine besler, yumuşatır ve yönetimi kolaylaştırır.",
        descriptionEN: "Ideal for worn and damaged hair, this conditioner deeply nourishes hair, softens it, and makes it easier to manage.",
        descriptionRU: "Идеально подходящий для поврежденных волос, этот кондиционер глубоко питает волосы, смягчает их и облегчает укладку.",
        descriptionKA: "იდეალური გაცვეთილი და დაზიანებული თმისთვის, ეს კონდიციონერი ღრმად კვებავს თმას, არბილებს მას და ამარტივებს მის მართვას.",
        usageTR: "Şampuandan sonra uygulayın, 2-3 dakika bekletin ve durulayın. Haftada en az 2 kez kullanın.",
        usageEN: "Apply after shampooing, leave for 2-3 minutes, and rinse. Use at least twice a week.",
        usageRU: "Нанесите после мытья шампунем, оставьте на 2-3 минуты и смойте. Используйте не менее двух раз в неделю.",
        usageKA: "წაუსვით შამპუნის შემდეგ, დატოვეთ 2-3 წუთი და გაავლეთ. გამოიყენეთ კვირაში მინიმუმ ორჯერ.",
        ingredientsTR: "Su, Hindistan Cevizi Yağı, Biotin, Keratin, Panthenol, E Vitamini, Argan Yağı",
        ingredientsEN: "Water, Coconut Oil, Biotin, Keratin, Panthenol, Vitamin E, Argan Oil",
        ingredientsRU: "Вода, Кокосовое Масло, Биотин, Кератин, Пантенол, Витамин Е, Аргановое Масло",
        ingredientsKA: "წყალი, ქოქოსის ზეთი, ბიოტინი, კერატინი, პანთენოლი, ვიტამინი E, არგანის ზეთი",
        imageUrl: "/images/products/vie-hair-repair-conditioner.svg",
        order: 7,
        isActive: true,
        isNew: false,
        price: 28.99,
        currency: "EUR",
        category: "conditioner"
      },
      {
        nameTR: "Vie Saç Derisi Terapi Losyonu",
        nameEN: "Vie Scalp Therapy Lotion",
        nameRU: "Vie Лосьон для терапии кожи головы",
        nameKA: "Vie თავის კანის თერაპიის ლოსიონი",
        slug: "scalp-therapy-lotion",
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
        order: 8,
        isActive: true,
        isNew: true,
        price: 32.99,
        currency: "EUR",
        category: "lotion"
      }
    ];

    console.log(`Attempting to seed ${products.length} Vithair products...`);

    // Loop through each product and create in database
    for (const product of products) {
      try {
        const sql = `
          INSERT INTO products (
            slug, name_tr, name_en, name_ru, name_ka,
            description_tr, description_en, description_ru, description_ka,
            price, currency, category, image_url, is_active, is_new, "order"
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9,
            $10, $11, $12, $13, $14, $15, $16
          ) RETURNING *
        `;
        
        const params = [
          product.slug,
          product.nameTR,
          product.nameEN,
          product.nameRU,
          product.nameKA,
          product.descriptionTR,
          product.descriptionEN,
          product.descriptionRU,
          product.descriptionKA,
          product.price,
          product.currency,
          product.category,
          product.imageUrl,
          product.isActive,
          product.isNew,
          product.order
        ];
        
        // Use the query method from storage
        const result = await storage.query(sql, params);
        if (result && result.rows && result.rows.length > 0) {
          console.log(`Created product: ${result.rows[0].id} - ${product.slug}`);
        }
      } catch (error) {
        console.error(`Failed to create product ${product.slug}:`, error);
      }
    }

    console.log("Vithair products seeded successfully");
    return res.status(200).json({ success: true, message: "Vithair products seeded successfully" });
  } catch (error) {
    console.error("Error seeding Vithair products:", error);
    return res.status(500).json({ success: false, message: "Error seeding Vithair products" });
  }
}