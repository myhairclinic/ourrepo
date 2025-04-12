import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from '../db';
import { products } from '@shared/schema';
import { eq } from 'drizzle-orm';

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
  
  categoryLinks.each((index, element) => {
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
    $('.product-small .product-title a').each((index, element) => {
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
 * Vithair web sitesinden tüm ürünleri ve kategorileri alır
 */
export async function scrapeVithairProducts(): Promise<VithairProduct[]> {
  try {
    console.log('Vithair ürünleri kazıma işlemi başlatılıyor...');
    
    // Ana sayfayı çek ve kategorileri al
    const mainPageResponse = await axios.get(SHOP_URL);
    const categories = await scrapeCategories(mainPageResponse.data);
    console.log(`${categories.length} kategori bulundu`);
    
    const allProducts: VithairProduct[] = [];
    
    // Her kategori için ürünleri al
    for (const category of categories) {
      const productUrls = await scrapeProductsFromCategory(category.url, category.id, category.name);
      console.log(`"${category.name}" kategorisinde ${productUrls.length} ürün bulundu`);
      
      // Her ürünün detaylarını al
      for (let i = 0; i < productUrls.length; i++) {
        const url = productUrls[i];
        const product = await scrapeProductDetails(url, i, category.id, category.name);
        if (product) {
          allProducts.push(product);
        }
      }
    }
    
    console.log(`Toplam ${allProducts.length} ürün başarıyla kazındı`);
    return allProducts;
  } catch (error) {
    console.error('Vithair ürünlerini kazıma hatası:', error);
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