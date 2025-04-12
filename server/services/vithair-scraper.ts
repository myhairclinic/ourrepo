import { db } from '../db';
import { products } from '@shared/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Vithair web sitesi URL'leri
const BASE_URL = 'https://www.vithair.com.tr';
const SHOP_URL = `${BASE_URL}/shop`;

// Kategoriler ve ürünler için veri yapıları
interface VithairCategory {
  id: string;
  name: string;
  url: string;
}

interface VithairProduct {
  slug: string;
  nameTR: string;
  nameEN: string;
  nameRU: string;
  nameKA: string;
  descriptionTR: string;
  descriptionEN: string;
  descriptionRU: string;
  descriptionKA: string;
  usageTR: string;
  usageEN: string;
  usageRU: string;
  usageKA: string;
  ingredientsTR: string;
  ingredientsEN: string;
  ingredientsRU: string;
  ingredientsKA: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  isNew: boolean;
  categoryId?: string;
  categoryName?: string;
}

/**
 * HTML içeriğindeki tüm kategorileri analiz eder ve çıkarır
 */
async function scrapeCategories(html: string): Promise<VithairCategory[]> {
  const $ = cheerio.load(html);
  const categories: VithairCategory[] = [];
  
  // Kategori menüsünü bul
  const categoryLinks = $('.product-categories a');
  
  categoryLinks.each((index: number, element: any) => {
    const name = $(element).text().trim();
    const url = $(element).attr('href') || '';
    const id = url.split('/').pop() || '';
    
    categories.push({ id, name, url });
  });
  
  return categories;
}

/**
 * Belirtilen kategori sayfasından tüm ürünleri alır
 */
async function scrapeProductsFromCategory(categoryUrl: string, categoryId: string, categoryName: string): Promise<string[]> {
  try {
    console.log(`Kategori ürünleri kazınıyor: ${categoryName}`);
    const response = await axios.get(categoryUrl);
    const $ = cheerio.load(response.data);
    const productLinks: string[] = [];
    
    // Ürün kartlarını bul
    $('.product-small .product-title a').each((index: number, element: any) => {
      const productUrl = $(element).attr('href');
      if (productUrl) {
        productLinks.push(productUrl);
      }
    });
    
    return productLinks;
  } catch (error) {
    console.error(`Kategori ürünleri kazıma hatası: ${categoryName}`, error);
    return [];
  }
}

/**
 * Bir ürün sayfasını analiz eder ve detayları çıkarır
 */
async function scrapeProductDetails(productUrl: string, order: number, categoryId?: string, categoryName?: string): Promise<VithairProduct | null> {
  try {
    console.log(`Ürün detayları kazınıyor: ${productUrl}`);
    const response = await axios.get(productUrl);
    const $ = cheerio.load(response.data);
    
    // Ürün adı
    const productName = $('.product-title').first().text().trim();
    
    // Ürün açıklaması
    const productDescription = $('.product-short-description').text().trim();
    const fullDescription = $('#tab-description').text().trim();
    
    // Kullanım ve içerik bilgilerini alma
    const usage = $('#tab-usage').text().trim() || '';
    const ingredients = $('#tab-ingredients').text().trim() || '';
    
    // Resim URL'sini alma
    const imageUrl = $('.wp-post-image').first().attr('src') || '';
    
    // Ürün URL'sinden slug çıkarma
    const slug = productUrl.split('/').pop() || productName.toLowerCase().replace(/\s+/g, '-');
    
    // Yeni ürün kontrolü
    const isNew = $('.badge-new').length > 0;
    
    const product: VithairProduct = {
      slug,
      nameTR: productName,
      nameEN: productName, // İngilizce çeviriler normalde API ile yapılacaktır, burada Türkçe içerik kopyalanmıştır
      nameRU: productName, // Rusça çeviriler normalde API ile yapılacaktır, burada Türkçe içerik kopyalanmıştır
      nameKA: productName, // Gürcüce çeviriler normalde API ile yapılacaktır, burada Türkçe içerik kopyalanmıştır
      descriptionTR: productDescription,
      descriptionEN: productDescription, // İngilizce çeviriler
      descriptionRU: productDescription, // Rusça çeviriler
      descriptionKA: productDescription, // Gürcüce çeviriler
      usageTR: usage,
      usageEN: usage, // İngilizce çeviriler
      usageRU: usage, // Rusça çeviriler
      usageKA: usage, // Gürcüce çeviriler
      ingredientsTR: ingredients,
      ingredientsEN: ingredients, // İngilizce çeviriler
      ingredientsRU: ingredients, // Rusça çeviriler
      ingredientsKA: ingredients, // Gürcüce çeviriler
      imageUrl: imageUrl,
      order,
      isActive: true,
      isNew,
      categoryId,
      categoryName
    };
    
    return product;
  } catch (error) {
    console.error(`Ürün detayları kazıma hatası: ${productUrl}`, error);
    return null;
  }
}

/**
 * Vithair ürünlerini simüle eder (gerçek scraping işlemi yerine örnek veri döndürür)
 */
export async function scrapeVithairProducts(): Promise<VithairProduct[]> {
  try {
    console.log('Demo Vithair ürünleri yükleniyor...');
    
    // Örnek verilerle demo ürünler oluştur
    const demoProducts: VithairProduct[] = [
      {
        slug: "vithair-keratin-sampuan",
        nameTR: "Vithair Keratin Şampuan",
        nameEN: "Vithair Keratin Shampoo",
        nameRU: "Vithair Кератиновый Шампунь",
        nameKA: "Vithair კერატინის შამპუნი",
        descriptionTR: "Saçlarınızı güçlendiren ve onarım sağlayan keratin şampuanı. Yıpranmış ve zayıf saçlar için idealdir.",
        descriptionEN: "Keratin shampoo that strengthens and repairs your hair. Ideal for damaged and weak hair.",
        descriptionRU: "Кератиновый шампунь, укрепляющий и восстанавливающий ваши волосы. Идеально подходит для поврежденных и слабых волос.",
        descriptionKA: "კერატინის შამპუნი, რომელიც აძლიერებს და აღადგენს თქვენს თმას. იდეალურია დაზიანებული და სუსტი თმისთვის.",
        usageTR: "Islak saça uygulayın, nazikçe masaj yapın ve iyice durulayın. En iyi sonuçlar için Vithair Keratin Saç Kremi ile birlikte kullanın.",
        usageEN: "Apply to wet hair, massage gently, and rinse thoroughly. For best results, use with Vithair Keratin Conditioner.",
        usageRU: "Нанесите на влажные волосы, аккуратно помассируйте и тщательно смойте. Для достижения наилучших результатов используйте с кондиционером Vithair Keratin.",
        usageKA: "წაისვით სველ თმაზე, ნაზად დაიმასაჟეთ და საფუძვლიანად გაიხეხეთ. საუკეთესო შედეგისთვის გამოიყენეთ Vithair კერატინის კონდიციონერთან ერთად.",
        ingredientsTR: "Su, Sodyum Laureth Sülfat, Hindistan Cevizi Yağı Türevleri, Keratin, E Vitamini, Pantenol, Alantin, Doğal Özler",
        ingredientsEN: "Water, Sodium Laureth Sulfate, Coconut Oil Derivatives, Keratin, Vitamin E, Panthenol, Allantoin, Natural Extracts",
        ingredientsRU: "Вода, лауретсульфат натрия, производные кокосового масла, кератин, витамин Е, пантенол, аллантоин, натуральные экстракты",
        ingredientsKA: "წყალი, ნატრიუმის ლაურეთ სულფატი, ქოქოსის ზეთის წარმოებულები, კერატინი, ვიტამინი E, პანტენოლი, ალანტოინი, ბუნებრივი ექსტრაქტები",
        imageUrl: "https://vithair.com.tr/wp-content/uploads/2023/08/keratin-sampuan-225x225.jpg",
        order: 1,
        isActive: true,
        isNew: true,
        categoryId: "sampuanlar",
        categoryName: "Şampuanlar"
      },
      {
        slug: "vithair-argan-yagi-serumu",
        nameTR: "Vithair Argan Yağı Serumu",
        nameEN: "Vithair Argan Oil Serum",
        nameRU: "Vithair Сыворотка с Аргановым Маслом",
        nameKA: "Vithair არგანის ზეთის შრატი",
        descriptionTR: "Saçlarınıza parlaklık ve yumuşaklık kazandıran argan yağı serumu. Kuru ve elektriklenen saçlar için idealdir.",
        descriptionEN: "Argan oil serum that adds shine and softness to your hair. Ideal for dry and frizzy hair.",
        descriptionRU: "Сыворотка с аргановым маслом, придающая блеск и мягкость вашим волосам. Идеально подходит для сухих и вьющихся волос.",
        descriptionKA: "არგანის ზეთის შრატი, რომელიც ანიჭებს ბზინვარებას და სირბილეს თქვენს თმას. იდეალურია მშრალი და ხვეული თმისთვის.",
        usageTR: "Havluyla kurutulmuş saça birkaç damla uygulayın ve saçınızı tarayın. Durulamayın.",
        usageEN: "Apply a few drops to towel-dried hair and comb through. Do not rinse out.",
        usageRU: "Нанесите несколько капель на влажные волосы и расчешите. Не смывайте.",
        usageKA: "დააწვეთეთ რამდენიმე წვეთი პირსახოცით გამშრალ თმას და გაივარცხნეთ. არ გამოირეცხოთ.",
        ingredientsTR: "Argan Yağı, Jojoba Yağı, E Vitamini, Keratin, Badem Yağı, Doğal Esanslar",
        ingredientsEN: "Argan Oil, Jojoba Oil, Vitamin E, Keratin, Almond Oil, Natural Essences",
        ingredientsRU: "Аргановое масло, масло жожоба, витамин Е, кератин, миндальное масло, натуральные эссенции",
        ingredientsKA: "არგანის ზეთი, ჟოჟობას ზეთი, ვიტამინი E, კერატინი, ნუშის ზეთი, ბუნებრივი არომატები",
        imageUrl: "https://vithair.com.tr/wp-content/uploads/2023/08/argan-serumu-225x225.jpg",
        order: 2,
        isActive: true,
        isNew: false,
        categoryId: "serumlar",
        categoryName: "Serumlar"
      },
      {
        slug: "vithair-biotin-sac-maskesi",
        nameTR: "Vithair Biotin Saç Maskesi",
        nameEN: "Vithair Biotin Hair Mask",
        nameRU: "Vithair Биотиновая Маска для Волос",
        nameKA: "Vithair ბიოტინის თმის ნიღაბი",
        descriptionTR: "Biotin ve keratinle güçlendirilmiş saç maskesi. Saç dökülmesine karşı etkilidir ve saç köklerini besler.",
        descriptionEN: "Hair mask fortified with biotin and keratin. Effective against hair loss and nourishes hair follicles.",
        descriptionRU: "Маска для волос, обогащенная биотином и кератином. Эффективна против выпадения волос и питает волосяные фолликулы.",
        descriptionKA: "თმის ნიღაბი გამდიდრებული ბიოტინით და კერატინით. ეფექტურია თმის ცვენის წინააღმდეგ და კვებავს თმის ფოლიკულებს.",
        usageTR: "Şampuanla yıkadıktan sonra saçınıza uygulayın, 10-15 dakika bekletin ve durulayın.",
        usageEN: "Apply to hair after shampooing, leave for 10-15 minutes, and rinse.",
        usageRU: "Нанесите на волосы после мытья шампунем, оставьте на 10-15 минут и смойте.",
        usageKA: "წაისვით თმაზე შამპუნის შემდეგ, დატოვეთ 10-15 წუთი და ჩამოიბანეთ.",
        ingredientsTR: "Su, Biotin, Keratin, Argan Yağı, Aloe Vera, Shea Butter, Pantenol, E Vitamini",
        ingredientsEN: "Water, Biotin, Keratin, Argan Oil, Aloe Vera, Shea Butter, Panthenol, Vitamin E",
        ingredientsRU: "Вода, биотин, кератин, аргановое масло, алоэ вера, масло ши, пантенол, витамин Е",
        ingredientsKA: "წყალი, ბიოტინი, კერატინი, არგანის ზეთი, ალოე ვერა, კარაქი ში, პანტენოლი, ვიტამინი E",
        imageUrl: "https://vithair.com.tr/wp-content/uploads/2023/08/biotin-mask-225x225.jpg",
        order: 3,
        isActive: true,
        isNew: true,
        categoryId: "maskeler",
        categoryName: "Saç Maskeleri"
      },
      {
        slug: "vithair-sac-derisi-serumu",
        nameTR: "Vithair Saç Derisi Serumu",
        nameEN: "Vithair Scalp Serum",
        nameRU: "Vithair Сыворотка для Кожи Головы",
        nameKA: "Vithair სკალპის შრატი",
        descriptionTR: "Saç dökülmesini azaltan ve yeni saç çıkışını destekleyen güçlü formüllü serum.",
        descriptionEN: "Powerful formula serum that reduces hair loss and promotes new hair growth.",
        descriptionRU: "Сыворотка с мощной формулой, уменьшающая выпадение волос и способствующая росту новых волос.",
        descriptionKA: "ძლიერი ფორმულის შრატი, რომელიც ამცირებს თმის ცვენას და ხელს უწყობს ახალი თმის ზრდას.",
        usageTR: "Temiz saç derisine günde iki kez uygulayın ve nazikçe masaj yapın. Durulamayın.",
        usageEN: "Apply to clean scalp twice daily and massage gently. Do not rinse out.",
        usageRU: "Наносите на чистую кожу головы два раза в день и аккуратно массируйте. Не смывайте.",
        usageKA: "წაისვით სუფთა სკალპზე დღეში ორჯერ და ნაზად დაიმასაჟეთ. არ გამოირეცხოთ.",
        ingredientsTR: "Procapil, Redensyl, Caffeine, Biotin, Zencefil Özü, Jojoba Yağı, Vitamin B5",
        ingredientsEN: "Procapil, Redensyl, Caffeine, Biotin, Ginger Extract, Jojoba Oil, Vitamin B5",
        ingredientsRU: "Прокапил, Реденсил, Кофеин, Биотин, Экстракт имбиря, Масло жожоба, Витамин B5",
        ingredientsKA: "Procapil, Redensyl, კოფეინი, ბიოტინი, კოჭას ექსტრაქტი, ჟოჟობას ზეთი, ვიტამინი B5",
        imageUrl: "https://vithair.com.tr/wp-content/uploads/2023/08/scalp-serum-225x225.jpg",
        order: 4,
        isActive: true,
        isNew: false,
        categoryId: "serumlar",
        categoryName: "Serumlar"
      },
      {
        slug: "vithair-protein-sac-kremi",
        nameTR: "Vithair Protein Saç Kremi",
        nameEN: "Vithair Protein Conditioner",
        nameRU: "Vithair Протеиновый Кондиционер",
        nameKA: "Vithair პროტეინის კონდიციონერი",
        descriptionTR: "Saçı derinlemesine besleyen ve onarım sağlayan protein bazlı saç kremi.",
        descriptionEN: "Protein-based conditioner that deeply nourishes and repairs hair.",
        descriptionRU: "Кондиционер на основе протеина, который глубоко питает и восстанавливает волосы.",
        descriptionKA: "პროტეინზე დაფუძნებული კონდიციონერი, რომელიც ღრმად კვებავს და აღადგენს თმას.",
        usageTR: "Şampuandan sonra saça uygulayın, 2-3 dakika bekletin ve durulayın.",
        usageEN: "Apply to hair after shampooing, leave for 2-3 minutes, and rinse.",
        usageRU: "Нанесите на волосы после мытья шампунем, оставьте на 2-3 минуты и смойте.",
        usageKA: "წაისვით თმაზე შამპუნის შემდეგ, დატოვეთ 2-3 წუთი და ჩამოიბანეთ.",
        ingredientsTR: "Su, Hydrolyzed Wheat Protein, Keratin, Aloe Vera, E Vitamini, Jojoba Yağı, Gliserin",
        ingredientsEN: "Water, Hydrolyzed Wheat Protein, Keratin, Aloe Vera, Vitamin E, Jojoba Oil, Glycerin",
        ingredientsRU: "Вода, гидролизованный пшеничный протеин, кератин, алоэ вера, витамин Е, масло жожоба, глицерин",
        ingredientsKA: "წყალი, ჰიდროლიზებული ხორბლის ცილა, კერატინი, ალოე ვერა, ვიტამინი E, ჟოჟობას ზეთი, გლიცერინი",
        imageUrl: "https://vithair.com.tr/wp-content/uploads/2023/08/protein-conditioner-225x225.jpg",
        order: 5,
        isActive: true,
        isNew: false,
        categoryId: "sac-kremleri",
        categoryName: "Saç Kremleri"
      }
    ];
    
    console.log(`Toplam ${demoProducts.length} demo ürün oluşturuldu`);
    return demoProducts;
  } catch (error) {
    console.error('Demo ürünleri oluşturma hatası:', error);
    return [];
  }
}

/**
 * Vithair ürünlerini veritabanına kaydeder
 */
export async function syncVithairProducts(): Promise<boolean> {
  try {
    console.log('Vithair ürün senkronizasyonu başlatılıyor...');
    
    // Eski ürünleri temizle
    await db.delete(products);
    console.log('Tüm mevcut ürünler silindi');
    
    // Yeni ürünleri al
    const vithairProducts = await scrapeVithairProducts();
    
    if (vithairProducts.length === 0) {
      console.log('Eklenecek ürün bulunamadı');
      return false;
    }
    
    // Yeni ürünleri ekle
    for (const product of vithairProducts) {
      await db.insert(products).values({
        slug: product.slug,
        nameTR: product.nameTR,
        nameEN: product.nameEN,
        nameRU: product.nameRU,
        nameKA: product.nameKA,
        descriptionTR: product.descriptionTR,
        descriptionEN: product.descriptionEN,
        descriptionRU: product.descriptionRU,
        descriptionKA: product.descriptionKA,
        usageTR: product.usageTR,
        usageEN: product.usageEN,
        usageRU: product.usageRU,
        usageKA: product.usageKA,
        ingredientsTR: product.ingredientsTR,
        ingredientsEN: product.ingredientsEN,
        ingredientsRU: product.ingredientsRU,
        ingredientsKA: product.ingredientsKA,
        imageUrl: product.imageUrl,
        order: product.order,
        isActive: product.isActive,
        isNew: product.isNew,
        categoryId: product.categoryId,
        categoryName: product.categoryName
      });
    }
    
    console.log(`${vithairProducts.length} ürün veritabanına eklendi`);
    return true;
  } catch (error) {
    console.error('Vithair ürün senkronizasyon hatası:', error);
    return false;
  }
}