import { Request, Response } from "express";
import { storage } from "../storage";
import { InsertProduct } from "@shared/schema";

const vithairProducts: InsertProduct[] = [
  {
    slug: "vie-hair-loss-shampoo",
    nameTR: "Vie Saç Dökülmesine Karşı Şampuan",
    nameEN: "Vie Anti Hair Loss Shampoo",
    nameRU: "Vie Шампунь против выпадения волос",
    nameKA: "Vie თმის ცვენის საწინააღმდეგო შამპუნი",
    descriptionTR: "Saç dökülmesine karşı etkili formül ile güçlü saçlar için Vie Saç Dökülmesine Karşı Şampuan.",
    descriptionEN: "Vie Anti Hair Loss Shampoo with effective formula for strong hair against hair loss.",
    descriptionRU: "Шампунь Vie против выпадения волос с эффективной формулой для крепких волос.",
    descriptionKA: "Vie თმის ცვენის საწინააღმდეგო შამპუნი ეფექტური ფორმულით ძლიერი თმისთვის.",
    usageTR: "Islak saçlarınıza uygulayarak köpürtün. 2-3 dakika bekletin ve ardından durulayın. En iyi sonuç için haftada 2-3 kez kullanın.",
    usageEN: "Apply to wet hair and lather. Leave for 2-3 minutes and then rinse. For best results, use 2-3 times a week.",
    usageRU: "Нанесите на влажные волосы и вспеньте. Оставьте на 2-3 минуты, затем смойте. Для достижения наилучших результатов используйте 2-3 раза в неделю.",
    usageKA: "წაისვით სველ თმაზე და აქაფეთ. დატოვეთ 2-3 წუთი და შემდეგ გაავლეთ. საუკეთესო შედეგისთვის, გამოიყენეთ კვირაში 2-3-ჯერ.",
    ingredientsTR: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Guar Hydroxypropyltrimonium Chloride, Panthenol, Biotin, Caffeine, Niacinamide, Menthol, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    ingredientsEN: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Guar Hydroxypropyltrimonium Chloride, Panthenol, Biotin, Caffeine, Niacinamide, Menthol, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    ingredientsRU: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Guar Hydroxypropyltrimonium Chloride, Panthenol, Biotin, Caffeine, Niacinamide, Menthol, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    ingredientsKA: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Guar Hydroxypropyltrimonium Chloride, Panthenol, Biotin, Caffeine, Niacinamide, Menthol, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    imageUrl: "/images/products/vie-hair-loss-shampoo.jpg",
    order: 1,
    isActive: true,
  },
  {
    slug: "vie-hair-volumizing-shampoo",
    nameTR: "Vie Saç Hacim Şampuanı",
    nameEN: "Vie Hair Volumizing Shampoo",
    nameRU: "Vie Шампунь для объема волос",
    nameKA: "Vie თმის მოცულობის შამპუნი",
    descriptionTR: "İnce telli saçlar için özel olarak geliştirilmiş, hacim veren formül ile daha dolgun görünen saçlar.",
    descriptionEN: "Specially developed for fine hair, with volume-giving formula for fuller-looking hair.",
    descriptionRU: "Специально разработан для тонких волос, с формулой, придающей объем для более пышных волос.",
    descriptionKA: "სპეციალურად შემუშავებულია თხელი თმისთვის, მოცულობის მიმცემი ფორმულით უფრო სავსე თმისთვის.",
    usageTR: "Islak saçlarınıza uygulayarak köpürtün. 2-3 dakika bekletin ve ardından durulayın. En iyi sonuç için haftada 2-3 kez kullanın.",
    usageEN: "Apply to wet hair and lather. Leave for 2-3 minutes and then rinse. For best results, use 2-3 times a week.",
    usageRU: "Нанесите на влажные волосы и вспеньте. Оставьте на 2-3 минуты, затем смойте. Для достижения наилучших результатов используйте 2-3 раза в неделю.",
    usageKA: "წაისვით სველ თმაზე და აქაფეთ. დატოვეთ 2-3 წუთი და შემდეგ გაავლეთ. საუკეთესო შედეგისთვის, გამოიყენეთ კვირაში 2-3-ჯერ.",
    ingredientsTR: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Hydrolyzed Wheat Protein, Panthenol, Biotin, Collagen, Keratin, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    ingredientsEN: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Hydrolyzed Wheat Protein, Panthenol, Biotin, Collagen, Keratin, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    ingredientsRU: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Hydrolyzed Wheat Protein, Panthenol, Biotin, Collagen, Keratin, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    ingredientsKA: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycol Distearate, Sodium Chloride, Glycerin, Parfum, Hydrolyzed Wheat Protein, Panthenol, Biotin, Collagen, Keratin, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    imageUrl: "/images/products/vie-hair-volumizing-shampoo.jpg",
    order: 2,
    isActive: true,
  },
  {
    slug: "vie-keratin-hair-mask",
    nameTR: "Vie Keratin Saç Maskesi",
    nameEN: "Vie Keratin Hair Mask",
    nameRU: "Vie Кератиновая маска для волос",
    nameKA: "Vie კერატინის თმის ნიღაბი",
    descriptionTR: "Yıpranmış saçları onaran, güçlendiren ve yumuşaklık kazandıran yoğun bakım maskesi.",
    descriptionEN: "Intensive care mask that repairs damaged hair, strengthens and adds softness.",
    descriptionRU: "Интенсивная ухаживающая маска, восстанавливающая поврежденные волосы, укрепляющая и придающая мягкость.",
    descriptionKA: "ინტენსიური მოვლის ნიღაბი, რომელიც აღადგენს დაზიანებულ თმას, აძლიერებს და ამატებს სირბილეს.",
    usageTR: "Nemli saçlarınıza masaj yaparak uygulayın. 5-10 dakika bekletin ve ardından iyice durulayın. En iyi sonuç için haftada 1-2 kez kullanın.",
    usageEN: "Apply to damp hair with massage. Leave for 5-10 minutes and then rinse thoroughly. For best results, use 1-2 times a week.",
    usageRU: "Нанесите на влажные волосы массажными движениями. Оставьте на 5-10 минут, затем тщательно смойте. Для достижения наилучших результатов используйте 1-2 раза в неделю.",
    usageKA: "წაისვით ნოტიო თმაზე მასაჟით. დატოვეთ 5-10 წუთი და შემდეგ საფუძვლიანად გაავლეთ. საუკეთესო შედეგისთვის, გამოიყენეთ კვირაში 1-2-ჯერ.",
    ingredientsTR: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsEN: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsRU: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsKA: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    imageUrl: "/images/products/vie-keratin-hair-mask.jpg",
    order: 3,
    isActive: true,
  },
  {
    slug: "vie-hair-growth-serum",
    nameTR: "Vie Saç Büyüme Serumu",
    nameEN: "Vie Hair Growth Serum",
    nameRU: "Vie Сыворотка для роста волос",
    nameKA: "Vie თმის ზრდის შრატი",
    descriptionTR: "Saç büyümesini uyaran, dökülmeyi azaltan ve saç köklerini güçlendiren konsantre serum.",
    descriptionEN: "Concentrated serum that stimulates hair growth, reduces hair loss and strengthens hair follicles.",
    descriptionRU: "Концентрированная сыворотка, стимулирующая рост волос, уменьшающая выпадение и укрепляющая волосяные фолликулы.",
    descriptionKA: "კონცენტრირებული შრატი, რომელიც ასტიმულირებს თმის ზრდას, ამცირებს თმის ცვენას და აძლიერებს თმის ფოლიკულებს.",
    usageTR: "Temiz, kuru veya nemli saç derisine damlalık ile uygulayın. Parmak uçlarınızla nazikçe masaj yapın. Durulamayın. Her gün kullanım için uygundur.",
    usageEN: "Apply with dropper to clean, dry or damp scalp. Gently massage with fingertips. Do not rinse. Suitable for daily use.",
    usageRU: "Нанесите с помощью пипетки на чистую, сухую или влажную кожу головы. Аккуратно помассируйте кончиками пальцев. Не смывайте. Подходит для ежедневного использования.",
    usageKA: "წაისვით პიპეტით სუფთა, მშრალ ან ნოტიო თავის კანზე. ნაზად მოიმასაჟეთ თითის წვერებით. არ გაავლოთ. შესაფერისია ყოველდღიური გამოყენებისთვის.",
    ingredientsTR: "Aqua, Alcohol Denat., Glycerin, Caffeine, Niacinamide, Biotin, Panthenol, Pisum Sativum Peptide, Arginine, Acetyl Tetrapeptide-3, Trifolium Pratense Flower Extract, Glycine Soja Germ Extract, Triticum Vulgare Germ Extract, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsEN: "Aqua, Alcohol Denat., Glycerin, Caffeine, Niacinamide, Biotin, Panthenol, Pisum Sativum Peptide, Arginine, Acetyl Tetrapeptide-3, Trifolium Pratense Flower Extract, Glycine Soja Germ Extract, Triticum Vulgare Germ Extract, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsRU: "Aqua, Alcohol Denat., Glycerin, Caffeine, Niacinamide, Biotin, Panthenol, Pisum Sativum Peptide, Arginine, Acetyl Tetrapeptide-3, Trifolium Pratense Flower Extract, Glycine Soja Germ Extract, Triticum Vulgare Germ Extract, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsKA: "Aqua, Alcohol Denat., Glycerin, Caffeine, Niacinamide, Biotin, Panthenol, Pisum Sativum Peptide, Arginine, Acetyl Tetrapeptide-3, Trifolium Pratense Flower Extract, Glycine Soja Germ Extract, Triticum Vulgare Germ Extract, Phenoxyethanol, Ethylhexylglycerin.",
    imageUrl: "/images/products/vie-hair-growth-serum.jpg",
    order: 4,
    isActive: true,
  },
  {
    slug: "vie-beard-growth-oil",
    nameTR: "Vie Sakal Büyüme Yağı",
    nameEN: "Vie Beard Growth Oil",
    nameRU: "Vie Масло для роста бороды",
    nameKA: "Vie წვერის ზრდის ზეთი",
    descriptionTR: "Sakal büyümesini teşvik eden, yumuşatan ve besleyen doğal bitkisel yağlar içeren bakım yağı.",
    descriptionEN: "Care oil containing natural vegetable oils that promote beard growth, soften and nourish.",
    descriptionRU: "Ухаживающее масло, содержащее натуральные растительные масла, способствующие росту бороды, смягчающие и питающие.",
    descriptionKA: "მოვლის ზეთი, რომელიც შეიცავს ბუნებრივ მცენარეულ ზეთებს, რომლებიც ხელს უწყობენ წვერის ზრდას, არბილებენ და კვებავენ.",
    usageTR: "3-5 damla yağı avucunuza alın, elleriniz arasında yayın ve sakalınıza masaj yaparak uygulayın. Sakal derisi ve tüylerine iyice nüfuz etmesi için masaj yapın. Her gün kullanım için uygundur.",
    usageEN: "Take 3-5 drops of oil into your palm, spread between your hands and apply to your beard with massage. Massage to allow thorough penetration into beard skin and hair. Suitable for daily use.",
    usageRU: "Возьмите 3-5 капель масла на ладонь, распределите между руками и нанесите на бороду массажными движениями. Массируйте для обеспечения тщательного проникновения в кожу под бородой и волосы. Подходит для ежедневного использования.",
    usageKA: "აიღეთ 3-5 წვეთი ზეთი ხელისგულზე, გაანაწილეთ ხელებს შორის და წაისვით წვერზე მასაჟით. მოიმასაჟეთ წვერის კანსა და თმაში საფუძვლიანი შეღწევისთვის. შესაფერისია ყოველდღიური გამოყენებისთვის.",
    ingredientsTR: "Argania Spinosa Kernel Oil, Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Prunus Amygdalus Dulcis Oil, Melaleuca Alternifolia Leaf Oil, Rosmarinus Officinalis Leaf Oil, Lavandula Angustifolia Oil, Tocopherol.",
    ingredientsEN: "Argania Spinosa Kernel Oil, Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Prunus Amygdalus Dulcis Oil, Melaleuca Alternifolia Leaf Oil, Rosmarinus Officinalis Leaf Oil, Lavandula Angustifolia Oil, Tocopherol.",
    ingredientsRU: "Argania Spinosa Kernel Oil, Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Prunus Amygdalus Dulcis Oil, Melaleuca Alternifolia Leaf Oil, Rosmarinus Officinalis Leaf Oil, Lavandula Angustifolia Oil, Tocopherol.",
    ingredientsKA: "Argania Spinosa Kernel Oil, Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Prunus Amygdalus Dulcis Oil, Melaleuca Alternifolia Leaf Oil, Rosmarinus Officinalis Leaf Oil, Lavandula Angustifolia Oil, Tocopherol.",
    imageUrl: "/images/products/vie-beard-growth-oil.jpg",
    order: 5,
    isActive: true,
  },
  {
    slug: "vie-scalp-therapy-lotion",
    nameTR: "Vie Saç Derisi Terapi Losyonu",
    nameEN: "Vie Scalp Therapy Lotion",
    nameRU: "Vie Лосьон-терапия для кожи головы",
    nameKA: "Vie თავის კანის თერაპიის ლოსიონი",
    descriptionTR: "Saç derisini rahatlatıcı, kaşıntı, kepek ve tahrişi azaltan özel formüllü losyon.",
    descriptionEN: "Specially formulated lotion that soothes the scalp, reduces itching, dandruff and irritation.",
    descriptionRU: "Специально разработанный лосьон, успокаивающий кожу головы, уменьшающий зуд, перхоть и раздражение.",
    descriptionKA: "სპეციალურად ფორმულირებული ლოსიონი, რომელიც ამშვიდებს თავის კანს, ამცირებს ქავილს, ქერტლს და გაღიზიანებას.",
    usageTR: "Şampuanlama sonrası temiz, nemli saç derisine uygulayın. Parmak uçlarınızla nazikçe masaj yapın. Durulamayın. Haftada 2-3 kez kullanın.",
    usageEN: "Apply to clean, damp scalp after shampooing. Gently massage with fingertips. Do not rinse. Use 2-3 times a week.",
    usageRU: "Нанесите на чистую, влажную кожу головы после мытья шампунем. Аккуратно помассируйте кончиками пальцев. Не смывайте. Используйте 2-3 раза в неделю.",
    usageKA: "წაისვით სუფთა, ნოტიო თავის კანზე შამპუნის შემდეგ. ნაზად მოიმასაჟეთ თითის წვერებით. არ გაავლოთ. გამოიყენეთ კვირაში 2-3-ჯერ.",
    ingredientsTR: "Aqua, Alcohol Denat., Glycerin, Menthol, Salicylic Acid, Tea Tree Oil, Aloe Barbadensis Leaf Juice, Panthenol, Niacinamide, Allantoin, Glycyrrhetinic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsEN: "Aqua, Alcohol Denat., Glycerin, Menthol, Salicylic Acid, Tea Tree Oil, Aloe Barbadensis Leaf Juice, Panthenol, Niacinamide, Allantoin, Glycyrrhetinic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsRU: "Aqua, Alcohol Denat., Glycerin, Menthol, Salicylic Acid, Tea Tree Oil, Aloe Barbadensis Leaf Juice, Panthenol, Niacinamide, Allantoin, Glycyrrhetinic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsKA: "Aqua, Alcohol Denat., Glycerin, Menthol, Salicylic Acid, Tea Tree Oil, Aloe Barbadensis Leaf Juice, Panthenol, Niacinamide, Allantoin, Glycyrrhetinic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    imageUrl: "/images/products/vie-scalp-therapy-lotion.jpg",
    order: 6,
    isActive: true,
  },
  {
    slug: "vie-argan-hair-oil",
    nameTR: "Vie Argan Saç Yağı",
    nameEN: "Vie Argan Hair Oil",
    nameRU: "Vie Аргановое масло для волос",
    nameKA: "Vie არგანის თმის ზეთი",
    descriptionTR: "Saçları besleyen, parlatan ve elektriklenmesini önleyen hafif dokulu argan yağı bazlı bakım yağı.",
    descriptionEN: "Light-textured argan oil-based care oil that nourishes hair, adds shine and prevents static.",
    descriptionRU: "Легкое аргановое масло для ухода, питающее волосы, придающее блеск и предотвращающее статическое электричество.",
    descriptionKA: "მსუბუქი ტექსტურის არგანის ზეთის საფუძველზე დამზადებული მოვლის ზეთი, რომელიც კვებავს თმას, ამატებს ბზინვარებას და თავიდან აცილებს სტატიკურობას.",
    usageTR: "1-2 pompa yağı avuçlarınıza alın, ellerinizin arasında yayın ve nemli veya kuru saçlarınıza uygulayın. Özellikle uçlara yoğunlaşın. İhtiyaca göre günlük kullanılabilir.",
    usageEN: "Take 1-2 pumps of oil into your palms, spread between your hands and apply to damp or dry hair. Focus especially on the ends. Can be used daily as needed.",
    usageRU: "Возьмите 1-2 нажатия масла на ладони, распределите между руками и нанесите на влажные или сухие волосы. Особое внимание уделите кончикам. Можно использовать ежедневно по мере необходимости.",
    usageKA: "აიღეთ 1-2 ტუმბო ზეთი ხელისგულებზე, გაანაწილეთ ხელებს შორის და წაისვით ნოტიო ან მშრალ თმაზე. განსაკუთრებით ყურადღება მიაქციეთ ბოლოებს. შეიძლება გამოყენებულ იქნას ყოველდღიურად საჭიროებისამებრ.",
    ingredientsTR: "Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Helianthus Annuus Seed Oil.",
    ingredientsEN: "Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Helianthus Annuus Seed Oil.",
    ingredientsRU: "Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Helianthus Annuus Seed Oil.",
    ingredientsKA: "Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Helianthus Annuus Seed Oil.",
    imageUrl: "/images/products/vie-argan-hair-oil.jpg",
    order: 7,
    isActive: true,
  },
  {
    slug: "vie-hair-repair-conditioner",
    nameTR: "Vie Saç Onarıcı Saç Kremi",
    nameEN: "Vie Hair Repair Conditioner",
    nameRU: "Vie Восстанавливающий кондиционер для волос",
    nameKA: "Vie თმის აღმდგენი კონდიციონერი",
    descriptionTR: "Yıpranmış saçlar için yoğun onarım formülü ile daha güçlü, yumuşak ve parlak saçlar.",
    descriptionEN: "Stronger, softer and shinier hair with intensive repair formula for damaged hair.",
    descriptionRU: "Более сильные, мягкие и блестящие волосы с формулой интенсивного восстановления для поврежденных волос.",
    descriptionKA: "უფრო ძლიერი, რბილი და მბზინავი თმა ინტენსიური აღდგენის ფორმულით დაზიანებული თმისთვის.",
    usageTR: "Şampuanlama sonrası nemli saçlarınıza uygulayın. 2-3 dakika bekletin ve ardından durulayın. En iyi sonuç için haftada 2-3 kez kullanın.",
    usageEN: "Apply to damp hair after shampooing. Leave for 2-3 minutes and then rinse. For best results, use 2-3 times a week.",
    usageRU: "Нанесите на влажные волосы после мытья шампунем. Оставьте на 2-3 минуты, затем смойте. Для достижения наилучших результатов используйте 2-3 раза в неделю.",
    usageKA: "წაისვით ნოტიო თმაზე შამპუნის შემდეგ. დატოვეთ 2-3 წუთი და შემდეგ გაავლეთ. საუკეთესო შედეგისთვის, გამოიყენეთ კვირაში 2-3-ჯერ.",
    ingredientsTR: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsEN: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsRU: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    ingredientsKA: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Hydrolyzed Keratin, Panthenol, Argania Spinosa Kernel Oil, Cocos Nucifera Oil, Parfum, Tocopheryl Acetate, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    imageUrl: "/images/products/vie-hair-repair-conditioner.jpg",
    order: 8,
    isActive: true,
  }
];

/**
 * Seeds the database with Vithair products
 */
export const seedVithairProducts = async (req: Request, res: Response) => {
  try {
    // Remove old products if exist
    const existingProducts = await storage.getProducts();
    for (const product of existingProducts) {
      await storage.deleteProduct(product.id);
    }
    
    // Create placeholder images in public folder
    const productImages = vithairProducts.map(product => product.imageUrl);
    
    // Add each product
    const addedProducts = [];
    for (const product of vithairProducts) {
      const newProduct = await storage.createProduct(product);
      addedProducts.push(newProduct);
    }
    
    return res.status(200).json({
      message: `Successfully seeded ${addedProducts.length} products.`,
      products: addedProducts
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    return res.status(500).json({
      message: "Failed to seed products",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};