import { InsertProduct } from '../../shared/schema';

/**
 * Vithair sitesinden ürünleri çeken servis
 */
export async function scrapeVithairProducts(): Promise<Omit<InsertProduct, 'id'>[]> {
  try {
    console.log('Vithair ürünleri çekiliyor...');
    
    // Web scraping yapmadan önce, mevcut çalışan örnek veri seti kullanalım
    // Gerçek bir implementasyonda bu fonksiyon HTML'i parse ederek veri çekecekti
    // İleride gerçek veri kaynağını entegre etmek için bu bölümü geliştirebiliriz
    
    // Vithair ürünleri (sabit veri seti)
    const products: Omit<InsertProduct, 'id'>[] = [
      {
        slug: 'vithair-sac-serumu',
        nameTR: 'Vithair Saç Serumu',
        nameEN: 'Vithair Hair Serum',
        nameRU: 'Сыворотка для волос Vithair',
        nameKA: 'Vithair თმის შრატი',
        descriptionTR: 'Saç köklerini güçlendiren yoğun bakım serumu.',
        descriptionEN: 'Intensive care serum that strengthens hair roots.',
        descriptionRU: 'Интенсивная сыворотка, укрепляющая корни волос.',
        descriptionKA: 'ინტენსიური მოვლის შრატი, რომელიც აძლიერებს თმის ფესვებს.',
        imageUrl: 'https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-SAC-SERUMU-300x300.png',
        usageTR: 'Temiz saça birkaç damla uygulayın ve masaj yapın.',
        usageEN: 'Apply a few drops to clean hair and massage.',
        usageRU: 'Нанесите несколько капель на чистые волосы и помассируйте.',
        usageKA: 'წაუსვით რამდენიმე წვეთი სუფთა თმას და გაიმასაჟეთ.',
        ingredientsTR: 'Argan Yağı, E Vitamini, B5 Vitamini.',
        ingredientsEN: 'Argan Oil, Vitamin E, Vitamin B5.',
        ingredientsRU: 'Аргановое масло, Витамин Е, Витамин В5.',
        ingredientsKA: 'არგანის ზეთი, ვიტამინი E, ვიტამინი B5.',
        isActive: true,
        isNew: true,
        price: 0,
        order: 1
      },
      {
        slug: 'vithair-onarici-sampuan',
        nameTR: 'Vithair Onarıcı Şampuan',
        nameEN: 'Vithair Restorative Shampoo',
        nameRU: 'Восстанавливающий шампунь Vithair',
        nameKA: 'Vithair აღმდგენი შამპუნი',
        descriptionTR: 'Hasarlı saçları onaran ve güçlendiren gelişmiş formül.',
        descriptionEN: 'Advanced formula that repairs and strengthens damaged hair.',
        descriptionRU: 'Продвинутая формула, восстанавливающая и укрепляющая поврежденные волосы.',
        descriptionKA: 'წინწაწეული ფორმულა, რომელიც აღადგენს და აძლიერებს დაზიანებულ თმას.',
        imageUrl: 'https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-ONARICI-SAMPUAN-300x300.png',
        usageTR: 'Islak saça uygulayın, nazikçe masaj yapın ve durulayın.',
        usageEN: 'Apply to wet hair, gently massage, and rinse.',
        usageRU: 'Нанесите на влажные волосы, осторожно помассируйте и смойте.',
        usageKA: 'წაუსვით სველ თმას, ნაზად გაიმასაჟეთ და გაავლეთ.',
        ingredientsTR: 'Argan Yağı, Keratin, Kolajen, Biotin.',
        ingredientsEN: 'Argan Oil, Keratin, Collagen, Biotin.',
        ingredientsRU: 'Аргановое масло, Кератин, Коллаген, Биотин.',
        ingredientsKA: 'არგანის ზეთი, კერატინი, კოლაგენი, ბიოტინი.',
        isActive: true,
        isNew: true,
        price: 0,
        order: 2
      },
      {
        slug: 'vithair-sac-bakim-kiti',
        nameTR: 'Vithair Saç Bakım Kiti',
        nameEN: 'Vithair Hair Care Kit',
        nameRU: 'Набор по уходу за волосами Vithair',
        nameKA: 'Vithair თმის მოვლის ნაკრები',
        descriptionTR: 'Saç ekimi sonrası tam bakım için ideal ürün seti.',
        descriptionEN: 'Ideal product set for complete care after hair transplantation.',
        descriptionRU: 'Идеальный набор продуктов для полного ухода после трансплантации волос.',
        descriptionKA: 'იდეალური პროდუქტების ნაკრები სრული მოვლისათვის თმის გადანერგვის შემდეგ.',
        imageUrl: 'https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-SAC-BAKIM-KiTi-300x300.png',
        usageTR: 'Her bir ürünü kendi talimatlarına göre kullanın.',
        usageEN: 'Use each product according to its instructions.',
        usageRU: 'Используйте каждый продукт согласно его инструкциям.',
        usageKA: 'გამოიყენეთ თითოეული პროდუქტი მისი ინსტრუქციების შესაბამისად.',
        ingredientsTR: 'Çeşitli. Her ürünün kendi içerik listesine bakın.',
        ingredientsEN: 'Various. Refer to each product\'s own ingredient list.',
        ingredientsRU: 'Разные. Обратитесь к списку ингредиентов каждого продукта.',
        ingredientsKA: 'სხვადასხვა. იხილეთ თითოეული პროდუქტის ინგრედიენტების საკუთარი სია.',
        isActive: true,
        isNew: true,
        price: 0,
        order: 3
      },
      {
        slug: 'vithair-sac-vitamini',
        nameTR: 'Vithair Saç Vitamini',
        nameEN: 'Vithair Hair Vitamin',
        nameRU: 'Витамины для волос Vithair',
        nameKA: 'Vithair თმის ვიტამინი',
        descriptionTR: 'İçeriden saç sağlığını destekleyen özel vitamin formülü.',
        descriptionEN: 'Special vitamin formula that supports hair health from within.',
        descriptionRU: 'Специальная витаминная формула, поддерживающая здоровье волос изнутри.',
        descriptionKA: 'სპეციალური ვიტამინის ფორმულა, რომელიც ხელს უწყობს თმის ჯანმრთელობას შიგნიდან.',
        imageUrl: 'https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-SAC-ViTAMiNi-300x300.png',
        usageTR: 'Günde bir tablet, tercihen yemekle birlikte alın.',
        usageEN: 'Take one tablet daily, preferably with a meal.',
        usageRU: 'Принимайте по одной таблетке в день, предпочтительно с едой.',
        usageKA: 'მიიღეთ ერთი ტაბლეტი დღეში, სასურველია საკვებთან ერთად.',
        ingredientsTR: 'Biotin, Keratin, A Vitamini, E Vitamini, Çinko, Demir.',
        ingredientsEN: 'Biotin, Keratin, Vitamin A, Vitamin E, Zinc, Iron.',
        ingredientsRU: 'Биотин, Кератин, Витамин А, Витамин Е, Цинк, Железо.',
        ingredientsKA: 'ბიოტინი, კერატინი, ვიტამინი A, ვიტამინი E, თუთია, რკინა.',
        isActive: true,
        isNew: true,
        price: 0,
        order: 4
      },
      {
        slug: 'vithair-nem-kremi',
        nameTR: 'Vithair Nem Kremi',
        nameEN: 'Vithair Moisture Cream',
        nameRU: 'Увлажняющий крем Vithair',
        nameKA: 'Vithair ტენიანობის კრემი',
        descriptionTR: 'Saç ve saç derisini derinlemesine nemlendirmeye yardımcı olan krem.',
        descriptionEN: 'Cream that helps deeply moisturize hair and scalp.',
        descriptionRU: 'Крем, который помогает глубоко увлажнить волосы и кожу головы.',
        descriptionKA: 'კრემი, რომელიც ეხმარება ღრმად დატენიანებას თმისა და თავის კანის.',
        imageUrl: 'https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-NEM-KREMi-300x300.png',
        usageTR: 'Temiz, nemli saça az miktarda uygulayın ve karıştırmayın.',
        usageEN: 'Apply a small amount to clean, damp hair and do not rinse.',
        usageRU: 'Нанесите небольшое количество на чистые, влажные волосы и не смывайте.',
        usageKA: 'წაუსვით მცირე რაოდენობით სუფთა, ნესტიან თმას და არ გაავლოთ.',
        ingredientsTR: 'Hindistan Cevizi Yağı, Shea Yağı, Aloe Vera, Hyaluronik Asit.',
        ingredientsEN: 'Coconut Oil, Shea Butter, Aloe Vera, Hyaluronic Acid.',
        ingredientsRU: 'Кокосовое масло, Масло ши, Алоэ вера, Гиалуроновая кислота.',
        ingredientsKA: 'ქოქოსის ზეთი, შეას კარაქი, ალოე ვერა, ჰიალურონის მჟავა.',
        isActive: true,
        isNew: true,
        price: 0,
        order: 5
      }
    ];
    
    return products;
  } catch (error) {
    console.error('Error fetching Vithair products:', error);
    throw error;
  }
}