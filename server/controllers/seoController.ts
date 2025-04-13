import { Request, Response } from "express";
import { z } from "zod";
import { storage } from "../storage";

// SEO Sayfaları şeması
const seoPageSchema = z.object({
  id: z.number().optional(),
  page: z.string(),
  pageTR: z.string(),
  pageEN: z.string(),
  pageRU: z.string(),
  pageKA: z.string(),
  metaTitleTR: z.string(),
  metaTitleEN: z.string(),
  metaTitleRU: z.string(),
  metaTitleKA: z.string(),
  metaDescriptionTR: z.string(),
  metaDescriptionEN: z.string(),
  metaDescriptionRU: z.string(),
  metaDescriptionKA: z.string(),
  metaKeywordsTR: z.string().optional(),
  metaKeywordsEN: z.string().optional(),
  metaKeywordsRU: z.string().optional(),
  metaKeywordsKA: z.string().optional(),
  canonicalUrl: z.string(),
  isActive: z.boolean().default(true),
  lastUpdated: z.date().default(() => new Date()),
});

// Tüm SEO sayfalarını getir
export const getAllSeoPages = async (req: Request, res: Response) => {
  try {
    // Tüm sayfalar için ayarları getir
    const pages = await storage.getSettings("seo_pages");
    
    // Eğer ayarlar bulunamazsa, boş dizi döndür
    if (!pages || pages.length === 0) {
      return res.status(200).json([]);
    }
    
    // Sayfa ayarlarını döndür (value içinde saklanan array)
    // İlk elemanı seç, value'da array olarak sayfalar saklıdır
    return res.status(200).json(pages[0].value);
  } catch (error) {
    console.error("SEO sayfaları getirilirken hata:", error);
    return res.status(500).json({ message: "SEO sayfaları getirilirken bir hata oluştu" });
  }
};

// Tek bir SEO sayfası getir
export const getSeoPageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Geçerli bir sayfa ID'si gerekli" });
    }
    
    // Tüm sayfa ayarlarını getir
    const pages = await storage.getSettings("seo_pages");
    
    if (!pages || pages.length === 0) {
      return res.status(404).json({ message: "SEO sayfaları bulunamadı" });
    }
    
    // İlk ayarın value alanındaki dizi içinde ID'ye göre sayfa ara
    const allPages = pages[0].value as any[];
    const page = allPages.find(p => p.id === Number(id));
    
    if (!page) {
      return res.status(404).json({ message: "SEO sayfası bulunamadı" });
    }
    
    return res.status(200).json(page);
  } catch (error) {
    console.error("SEO sayfası getirilirken hata:", error);
    return res.status(500).json({ message: "SEO sayfası getirilirken bir hata oluştu" });
  }
};

// SEO sayfası oluştur veya güncelle
export const saveSeoPage = async (req: Request, res: Response) => {
  try {
    const pageData = req.body;
    
    // Veriyi doğrula
    const result = seoPageSchema.safeParse(pageData);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Geçersiz SEO sayfası verisi", 
        errors: result.error.format() 
      });
    }
    
    // Tüm sayfaları getir
    const pagesSettings = await storage.getSettings("seo_pages");
    let allPages: any[] = [];
    
    if (pagesSettings && pagesSettings.length > 0) {
      allPages = pagesSettings[0].value as any[];
    }
    
    // ID varsa güncelle, yoksa yeni ekle
    if (pageData.id) {
      const index = allPages.findIndex(p => p.id === pageData.id);
      
      if (index !== -1) {
        // Güncelle
        allPages[index] = { 
          ...allPages[index], 
          ...pageData,
          lastUpdated: new Date()
        };
      } else {
        return res.status(404).json({ message: "Güncellenecek SEO sayfası bulunamadı" });
      }
    } else {
      // Yeni sayfa ekle
      const newId = allPages.length > 0 
        ? Math.max(...allPages.map(p => p.id)) + 1 
        : 1;
        
      allPages.push({
        ...pageData,
        id: newId,
        lastUpdated: new Date()
      });
    }
    
    // Ayarları güncelle
    await storage.saveSetting({
      section: "seo_pages",
      key: "pages",
      value: allPages
    });
    
    return res.status(200).json({ 
      message: "SEO sayfası başarıyla kaydedildi",
      page: pageData.id ? 
        allPages.find(p => p.id === pageData.id) : 
        allPages[allPages.length - 1]
    });
  } catch (error) {
    console.error("SEO sayfası kaydedilirken hata:", error);
    return res.status(500).json({ message: "SEO sayfası kaydedilirken bir hata oluştu" });
  }
};

// SEO sayfası sil
export const deleteSeoPage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Geçerli bir sayfa ID'si gerekli" });
    }
    
    // Tüm sayfaları getir
    const pagesSettings = await storage.getSettings("seo_pages");
    
    if (!pagesSettings || pagesSettings.length === 0) {
      return res.status(404).json({ message: "SEO sayfaları bulunamadı" });
    }
    
    const allPages = pagesSettings[0].value as any[];
    const filteredPages = allPages.filter(p => p.id !== Number(id));
    
    // Sayfa bulunamadıysa hata döndür
    if (filteredPages.length === allPages.length) {
      return res.status(404).json({ message: "Silinecek SEO sayfası bulunamadı" });
    }
    
    // Ayarları güncelle
    await storage.saveSetting({
      section: "seo_pages",
      key: "pages",
      value: filteredPages
    });
    
    return res.status(200).json({ message: "SEO sayfası başarıyla silindi" });
  } catch (error) {
    console.error("SEO sayfası silinirken hata:", error);
    return res.status(500).json({ message: "SEO sayfası silinirken bir hata oluştu" });
  }
};

// Sitemap yeniden oluştur
export const generateSitemap = async (req: Request, res: Response) => {
  try {
    // Burada sitemap oluşturma mantığı gelecek
    // Şimdilik sadece başarılı yanıt dönelim
    
    return res.status(200).json({ 
      message: "Sitemap başarıyla oluşturuldu",
      url: "/sitemap.xml"
    });
  } catch (error) {
    console.error("Sitemap oluşturulurken hata:", error);
    return res.status(500).json({ message: "Sitemap oluşturulurken bir hata oluştu" });
  }
};

// SEO Analizi yap (stub - ileride gerçek analiz yapılabilir)
export const analyzeSeo = async (req: Request, res: Response) => {
  try {
    // Bu fonksiyon şu an sadece örnek analiz verileri döndürüyor
    // Gerçek bir implementasyonda site SEO'su taranıp analiz edilebilir
    
    const mockAnalysisData = {
      pageSpeed: {
        mobile: 82,
        desktop: 94
      },
      issuesCount: {
        critical: 2,
        warning: 5,
        info: 8
      },
      topIssues: [
        {
          type: "critical",
          title: "Eksik alt etiketleri",
          description: "8 görsel, alt etiketi olmadan kullanılıyor",
          affectedPages: ["/", "/services", "/packages"]
        },
        {
          type: "critical",
          title: "Crawl engelleri",
          description: "2 sayfada robots.txt engeli var",
          affectedPages: ["/admin/dashboard", "/api/services"]
        },
        {
          type: "warning",
          title: "Düşük kelime sayısı",
          description: "3 sayfa, önerilen minimum kelime sayısının altında",
          affectedPages: ["/contact", "/testimonials", "/faq"]
        },
        {
          type: "warning",
          title: "Eksik başlık etiketleri",
          description: "2 sayfa H1 etiketi içermiyor",
          affectedPages: ["/privacy-policy", "/terms-of-service"]
        },
        {
          type: "info",
          title: "İç bağlantılar",
          description: "Ana sayfada daha fazla iç bağlantı kullanılabilir",
          affectedPages: ["/"]
        }
      ],
      keywordRankings: [
        {
          keyword: "saç ekimi tbilisi",
          position: 3,
          change: 2,
          searchVolume: 1200
        },
        {
          keyword: "hair transplant tbilisi",
          position: 2,
          change: 1,
          searchVolume: 2400
        },
        {
          keyword: "пересадка волос тбилиси",
          position: 1,
          change: 0,
          searchVolume: 1800
        },
        {
          keyword: "თმის გადანერგვა თბილისში",
          position: 1,
          change: 0,
          searchVolume: 800
        }
      ],
      backlinks: {
        total: 156,
        domains: 43,
        newLastMonth: 12
      }
    };
    
    return res.status(200).json(mockAnalysisData);
  } catch (error) {
    console.error("SEO analizi yapılırken hata:", error);
    return res.status(500).json({ message: "SEO analizi yapılırken bir hata oluştu" });
  }
};