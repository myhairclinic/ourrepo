import { Request, Response } from "express";
import { storage } from "../storage";
import { z } from "zod";

// Doğrudan şema tiplerini dahil etmek yerine local tipleri tanımlıyoruz
// Bu, @shared/schema modülünden gelen bağımlılığı kaldırmak için yapılmıştır

// Clinic Info şeması
const updateClinicInfoSchema = z.object({
  aboutTR: z.string(),
  aboutEN: z.string(),
  aboutRU: z.string(),
  aboutKA: z.string(),
  addressTR: z.string(),
  addressEN: z.string(),
  addressRU: z.string(),
  addressKA: z.string(),
  email: z.string().email(),
  phone: z.string(),
  whatsapp: z.string(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  workingHoursTR: z.string(),
  workingHoursEN: z.string(),
  workingHoursRU: z.string(),
  workingHoursKA: z.string(),
  googleMapsUrl: z.string(),
});

// Product şeması
const insertProductSchema = z.object({
  slug: z.string(),
  nameTR: z.string(),
  nameEN: z.string(),
  nameRU: z.string(),
  nameKA: z.string(),
  descriptionTR: z.string(),
  descriptionEN: z.string(),
  descriptionRU: z.string(),
  descriptionKA: z.string(),
  usageTR: z.string(),
  usageEN: z.string(),
  usageRU: z.string(),
  usageKA: z.string(),
  ingredientsTR: z.string(),
  ingredientsEN: z.string(),
  ingredientsRU: z.string(),
  ingredientsKA: z.string(),
  imageUrl: z.string(),
  price: z.number().default(0),
  isNew: z.boolean().default(false),
  categoryId: z.string().optional(),
  categoryName: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

// Package şeması
const insertPackageSchema = z.object({
  slug: z.string(),
  titleTR: z.string(),
  titleEN: z.string(),
  titleRU: z.string(),
  titleKA: z.string(),
  descriptionTR: z.string(),
  descriptionEN: z.string(),
  descriptionRU: z.string(),
  descriptionKA: z.string(),
  contentTR: z.string(),
  contentEN: z.string(),
  contentRU: z.string(),
  contentKA: z.string(),
  countryOrigin: z.string(),
  accommodationTR: z.string(),
  accommodationEN: z.string(),
  accommodationRU: z.string(),
  accommodationKA: z.string(),
  transportationTR: z.string(),
  transportationEN: z.string(),
  transportationRU: z.string(),
  transportationKA: z.string(),
  activitiesTR: z.string(),
  activitiesEN: z.string(),
  activitiesRU: z.string(),
  activitiesKA: z.string(),
  durationDays: z.number().default(3),
  includesServiceIds: z.string().optional(),
  highlights: z.string().optional(),
  imageUrl: z.string(),
  galleryImages: z.string().optional(),
  price: z.number().default(0),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  packageType: z.enum(["standard", "premium", "luxury", "budget"]).default("standard"),
  isAllInclusive: z.boolean().default(false),
});

// Testimonial şeması
const insertTestimonialSchema = z.object({
  nameTR: z.string(),
  nameEN: z.string(),
  nameRU: z.string(),
  nameKA: z.string(),
  locationTR: z.string(),
  locationEN: z.string(),
  locationRU: z.string(),
  locationKA: z.string(),
  commentTR: z.string(),
  commentEN: z.string(),
  commentRU: z.string(),
  commentKA: z.string(),
  rating: z.number().default(5),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

// FAQ şeması
const insertFaqSchema = z.object({
  serviceId: z.number().optional(),
  questionTR: z.string(),
  questionEN: z.string(),
  questionRU: z.string(),
  questionKA: z.string(),
  answerTR: z.string(),
  answerEN: z.string(),
  answerRU: z.string(),
  answerKA: z.string(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

// Message şeması
const insertMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

// Clinic Info Controller
export const getClinicInfo = async (req: Request, res: Response) => {
  try {
    const clinicInfo = await storage.getClinicInfo();
    if (!clinicInfo) {
      return res.status(404).json({ message: "Clinic information not found" });
    }
    res.json(clinicInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clinic information" });
  }
};

export const updateClinicInfo = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validData = updateClinicInfoSchema.parse(req.body);
    
    // Update clinic info
    const updatedInfo = await storage.updateClinicInfo(validData);
    if (!updatedInfo) {
      return res.status(404).json({ message: "Clinic information not found" });
    }
    
    res.json(updatedInfo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update clinic information" });
  }
};

// Product Controller
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error("Error fetching products:", errorMessage);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Vithair ürünlerini çek ve veritabanına ekle
export const fetchVithairProducts = async (req: Request, res: Response) => {
  try {
    // Vithair scraper servisi ile ürünleri çek
    const { scrapeVithairProducts } = await import("../services/vithair-scraper");
    const vithairProducts = await scrapeVithairProducts();
    
    // Mevcut ürünleri temizle
    await storage.clearProducts();
    
    // Yeni ürünleri ekle
    const addedProducts = [];
    for (const product of vithairProducts) {
      try {
        const addedProduct = await storage.createProduct({
          ...product,
          price: 0, // Fiyat gösterilmeyecek
          isActive: true
        });
        addedProducts.push(addedProduct);
      } catch (error) {
        console.error(`Error adding product ${product.nameTR}:`, error);
      }
    }
    
    res.status(200).json({
      success: true,
      message: `${addedProducts.length} Vithair ürünü başarıyla eklendi`,
      products: addedProducts
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error("Error fetching products from Vithair:", errorMessage);
    res.status(500).json({ 
      success: false,
      message: "Vithair ürünleri çekilirken hata oluştu",
      error: errorMessage
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validData = insertProductSchema.parse(req.body);
    
    // Create product
    const product = await storage.createProduct(validData);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validate request
    const validData = insertProductSchema.partial().parse(req.body);
    
    // Update product
    const product = await storage.updateProduct(id, validData);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteProduct(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Package Controller
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await storage.getPackages();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const packageData = await storage.getPackageById(id);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch package" });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validData = insertPackageSchema.parse(req.body);
    
    // Create package
    const packageData = await storage.createPackage(validData);
    res.status(201).json(packageData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create package" });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validate request
    const validData = insertPackageSchema.partial().parse(req.body);
    
    // Update package
    const packageData = await storage.updatePackage(id, validData);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    
    res.json(packageData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update package" });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deletePackage(id);
    if (!result) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete package" });
  }
};

// Testimonial Controller
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validData = insertTestimonialSchema.parse(req.body);
    
    // Create testimonial
    const testimonial = await storage.createTestimonial(validData);
    res.status(201).json(testimonial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create testimonial" });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validate request
    const validData = insertTestimonialSchema.partial().parse(req.body);
    
    // Update testimonial
    const testimonial = await storage.updateTestimonial(id, validData);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    
    res.json(testimonial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update testimonial" });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteTestimonial(id);
    if (!result) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
};

// FAQ Controller
export const getFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
};

export const getFaqsByServiceId = async (req: Request, res: Response) => {
  try {
    const serviceId = parseInt(req.params.serviceId);
    const faqs = await storage.getFaqsByServiceId(serviceId);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
};

export const createFaq = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validData = insertFaqSchema.parse(req.body);
    
    // Create FAQ
    const faq = await storage.createFaq(validData);
    res.status(201).json(faq);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create FAQ" });
  }
};

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validate request
    const validData = insertFaqSchema.partial().parse(req.body);
    
    // Update FAQ
    const faq = await storage.updateFaq(id, validData);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    
    res.json(faq);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update FAQ" });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteFaq(id);
    if (!result) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete FAQ" });
  }
};

// Message Controller
export const createMessage = async (req: Request, res: Response) => {
  try {
    // Validate request
    const validData = insertMessageSchema.parse(req.body);
    
    // Create message
    const message = await storage.createMessage(validData);
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create message" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await storage.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const message = await storage.updateMessageReadStatus(id, true);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to mark message as read" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteMessage(id);
    if (!result) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message" });
  }
};
