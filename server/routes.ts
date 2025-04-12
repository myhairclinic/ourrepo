import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertUserReviewSchema, 
  insertChatSessionSchema, 
  insertChatMessageSchema, 
  insertChatOperatorSchema,
  insertAftercareGuideSchema,
  insertPackageSchema,
  insertTelegramContactSchema,
  insertTelegramMessageSchema,
  insertTelegramPredefinedMessageSchema
} from "@shared/schema";
import { 
  getServices, 
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from "./controllers/contentController";
import { telegramBotService } from "./services/telegramBotService";
import { telegramController } from "./controllers/telegramController";
import { seedServices, seedPackages, seedNewCountryPackages } from "./controllers/seedController";
import { seedBlogPosts } from "./controllers/seedBlogController";
import { seedExtendedBlogPosts } from "./controllers/extendedBlogSeedController";
import { seedUniqueBlogPosts } from "./controllers/uniqueBlogSeedController";
import { seedBlogDirectly } from "./controllers/seedBlogsDirectController";
import * as adminControllers from "./controllers/adminControllers";
import {
  getBlogPosts,
  getPaginatedBlogPosts,
  getBlogPostBySlug as getLegacyBlogPostBySlug,
  createBlogPost as createLegacyBlogPost,
  updateBlogPost as updateLegacyBlogPost,
  deleteBlogPost as deleteLegacyBlogPost
} from "./controllers/blogController";

import { 
  getAllBlogPosts, 
  getBlogPostById, 
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  toggleFeatured,
  togglePublished,
  getBlogPostsCount 
} from "./controllers/blogControllers";
import {
  getGalleryItems,
  getGalleryItemsByType,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from "./controllers/galleryController";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment
} from "./controllers/appointmentController";
import { trackAppointment } from "./controllers/appointmentTrackerController";
import {
  getClinicInfo,
  updateClinicInfo,
  createMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchVithairProducts,
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFaqs,
  getFaqsByServiceId,
  createFaq,
  updateFaq,
  deleteFaq
} from "./controllers/adminController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Initialize Telegram bot
  await telegramBotService.initialize();
  console.log("Telegram bot initialization attempt completed");

  // Content routes
  app.get("/api/services", getServices);
  app.get("/api/services/:slug", getServiceBySlug);
  app.post("/api/services", createService);
  app.put("/api/services/:id", updateService);
  app.delete("/api/services/:id", deleteService);

  // Gallery routes
  app.get("/api/gallery", getGalleryItems);
  app.get("/api/gallery/type/:type", getGalleryItemsByType);
  app.post("/api/gallery", createGalleryItem);
  app.put("/api/gallery/:id", updateGalleryItem);
  app.delete("/api/gallery/:id", deleteGalleryItem);

  // Appointment routes
  app.post("/api/appointments", createAppointment);
  app.get("/api/appointments", getAppointments);
  app.get("/api/appointments/track", trackAppointment);
  app.put("/api/appointments/:id", updateAppointmentStatus);
  app.delete("/api/appointments/:id", deleteAppointment);

  // FAQ routes
  app.get("/api/faqs", getFaqs);
  app.get("/api/faqs/service/:serviceId", getFaqsByServiceId);
  app.post("/api/faqs", createFaq);
  app.put("/api/faqs/:id", updateFaq);
  app.delete("/api/faqs/:id", deleteFaq);

  // Product routes
  app.get("/api/products", getProducts);
  app.get("/api/products/:slug", getProductBySlug);
  app.post("/api/products", createProduct);
  app.put("/api/products/:id", updateProduct);
  app.delete("/api/products/:id", deleteProduct);
  
  // Vithair ürünlerini çekme endpoint'i
  app.post("/api/products/fetch-vithair", fetchVithairProducts);
  
  // Tüm ürünleri temizleme endpoint'i için /api/admin/clear-products kullanılmaktadır

  // Package routes
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });
  
  app.get("/api/packages/one-per-country", async (req, res) => {
    try {
      const packages = await storage.getOnePackagePerCountry();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching one package per country:", error);
      res.status(500).json({ message: "Failed to fetch packages by country" });
    }
  });
  
  app.get("/api/packages/featured", async (req, res) => {
    try {
      const packages = await storage.getFeaturedPackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching featured packages:", error);
      res.status(500).json({ message: "Failed to fetch featured packages" });
    }
  });
  
  app.get("/api/packages/country/:countryCode", async (req, res) => {
    try {
      const { countryCode } = req.params;
      const packages = await storage.getPackagesByCountry(countryCode);
      res.json(packages);
    } catch (error) {
      console.error("Error fetching packages by country:", error);
      res.status(500).json({ message: "Failed to fetch packages by country" });
    }
  });
  
  app.get("/api/packages/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const pkg = await storage.getPackageBySlug(slug);
      
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      
      res.json(pkg);
    } catch (error) {
      console.error("Error fetching package:", error);
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });
  
  app.get("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid package ID" });
      }
      
      const pkg = await storage.getPackageById(id);
      
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      
      res.json(pkg);
    } catch (error) {
      console.error("Error fetching package:", error);
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });
  
  app.post("/api/packages", async (req, res) => {
    try {
      const packageSchema = insertPackageSchema.parse(req.body);
      const newPackage = await storage.createPackage(packageSchema);
      res.status(201).json(newPackage);
    } catch (error) {
      console.error("Error creating package:", error);
      res.status(400).json({ message: "Failed to create package", error });
    }
  });
  
  app.put("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid package ID" });
      }
      
      const packageSchema = insertPackageSchema.partial().parse(req.body);
      const updatedPackage = await storage.updatePackage(id, packageSchema);
      
      if (!updatedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      
      res.json(updatedPackage);
    } catch (error) {
      console.error("Error updating package:", error);
      res.status(400).json({ message: "Failed to update package", error });
    }
  });
  
  app.delete("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid package ID" });
      }
      
      const success = await storage.deletePackage(id);
      
      if (!success) {
        return res.status(404).json({ message: "Package not found" });
      }
      
      res.json({ message: "Package deleted successfully" });
    } catch (error) {
      console.error("Error deleting package:", error);
      res.status(500).json({ message: "Failed to delete package" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", getTestimonials);
  app.post("/api/testimonials", createTestimonial);
  app.put("/api/testimonials/:id", updateTestimonial);
  app.delete("/api/testimonials/:id", deleteTestimonial);
  
  // User Review routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getUserReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  
  app.get("/api/reviews/approved", async (req, res) => {
    try {
      const reviews = await storage.getApprovedUserReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching approved reviews:", error);
      res.status(500).json({ error: "Failed to fetch approved reviews" });
    }
  });
  
  app.get("/api/services/:serviceId/reviews", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      if (isNaN(serviceId)) {
        return res.status(400).json({ error: "Invalid service ID" });
      }
      const reviews = await storage.getUserReviewsByServiceId(serviceId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching service reviews:", error);
      res.status(500).json({ error: "Failed to fetch service reviews" });
    }
  });
  
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertUserReviewSchema.parse(req.body);
      const newReview = await storage.createUserReview(reviewData);
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ error: "Invalid review data" });
    }
  });
  
  app.put("/api/reviews/:id/approve", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid review ID" });
      }
      const isApproved = req.body.isApproved === true;
      const updatedReview = await storage.updateUserReviewApproval(id, isApproved);
      if (!updatedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(updatedReview);
    } catch (error) {
      console.error("Error updating review approval:", error);
      res.status(500).json({ error: "Failed to update review approval" });
    }
  });
  
  app.delete("/api/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid review ID" });
      }
      await storage.deleteUserReview(id);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // Contact/Message routes
  app.post("/api/contact", createMessage);
  app.get("/api/messages", getMessages);
  app.put("/api/messages/:id/read", markMessageAsRead);
  app.delete("/api/messages/:id", deleteMessage);

  // Clinic info routes
  app.get("/api/clinic-info", getClinicInfo);
  app.put("/api/clinic-info", updateClinicInfo);

  // Aftercare guides routes
  app.get("/api/aftercare-guides", async (req, res) => {
    try {
      const guides = await storage.getAftercareGuides();
      res.json(guides);
    } catch (error) {
      console.error("Error fetching aftercare guides:", error);
      res.status(500).json({ error: "Failed to fetch aftercare guides" });
    }
  });

  app.get("/api/aftercare-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid guide ID" });
      }
      const guide = await storage.getAftercareGuideById(id);
      if (!guide) {
        return res.status(404).json({ error: "Aftercare guide not found" });
      }
      res.json(guide);
    } catch (error) {
      console.error("Error fetching aftercare guide:", error);
      res.status(500).json({ error: "Failed to fetch aftercare guide" });
    }
  });

  app.get("/api/services/:serviceId/aftercare-guides", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      if (isNaN(serviceId)) {
        return res.status(400).json({ error: "Invalid service ID" });
      }
      const guides = await storage.getAftercareGuidesByServiceId(serviceId);
      res.json(guides);
    } catch (error) {
      console.error("Error fetching service aftercare guides:", error);
      res.status(500).json({ error: "Failed to fetch service aftercare guides" });
    }
  });

  app.post("/api/aftercare-guides", async (req, res) => {
    try {
      const guideData = insertAftercareGuideSchema.parse(req.body);
      const newGuide = await storage.createAftercareGuide(guideData);
      res.status(201).json(newGuide);
    } catch (error) {
      console.error("Error creating aftercare guide:", error);
      res.status(400).json({ error: "Invalid aftercare guide data" });
    }
  });

  app.put("/api/aftercare-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid guide ID" });
      }
      const guideData = insertAftercareGuideSchema.partial().parse(req.body);
      const updatedGuide = await storage.updateAftercareGuide(id, guideData);
      if (!updatedGuide) {
        return res.status(404).json({ error: "Aftercare guide not found" });
      }
      res.json(updatedGuide);
    } catch (error) {
      console.error("Error updating aftercare guide:", error);
      res.status(400).json({ error: "Invalid aftercare guide data" });
    }
  });

  app.delete("/api/aftercare-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid guide ID" });
      }
      await storage.deleteAftercareGuide(id);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting aftercare guide:", error);
      res.status(500).json({ error: "Failed to delete aftercare guide" });
    }
  });

  // Blog routes
  app.get("/api/blog", getAllBlogPosts);
  app.get("/api/blog/count", getBlogPostsCount);
  app.get("/api/blog/paginated", getPaginatedBlogPosts);
  app.get("/api/blog/:slug", getBlogPostBySlug);
  app.post("/api/blog", createBlogPost);
  app.put("/api/blog/:id", updateBlogPost);
  app.delete("/api/blog/:id", deleteBlogPost);
  
  // Blog admin features
  app.patch("/api/blog/:id/feature", toggleFeatured);
  app.patch("/api/blog/:id/publish", togglePublished);

  // Telegram Bot API Routes
  app.get("/api/telegram/contacts", async (req, res) => {
    try {
      const contacts = await telegramBotService.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching telegram contacts:", error);
      res.status(500).json({ error: "Failed to fetch telegram contacts" });
    }
  });
  
  app.get("/api/telegram/messages/:chatId", async (req, res) => {
    try {
      const messages = await telegramBotService.getMessages(req.params.chatId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching telegram messages:", error);
      res.status(500).json({ error: "Failed to fetch telegram messages" });
    }
  });
  
  app.post("/api/telegram/send", async (req, res) => {
    try {
      const { chatId, text } = req.body;
      if (!chatId || !text) {
        return res.status(400).json({ error: "Chat ID and text are required" });
      }
      const result = await telegramBotService.sendMessage(chatId, text);
      res.json(result);
    } catch (error) {
      console.error("Error sending telegram message:", error);
      res.status(500).json({ error: "Failed to send telegram message" });
    }
  });
  
  app.get("/api/telegram/predefined-messages", async (req, res) => {
    try {
      const messages = await telegramBotService.getPredefinedMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching predefined messages:", error);
      res.status(500).json({ error: "Failed to fetch predefined messages" });
    }
  });
  
  app.post("/api/telegram/predefined-messages", async (req, res) => {
    try {
      const result = await telegramBotService.savePredefinedMessage(req.body);
      res.json(result);
    } catch (error) {
      console.error("Error saving predefined message:", error);
      res.status(500).json({ error: "Failed to save predefined message" });
    }
  });
  
  app.delete("/api/telegram/predefined-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid message ID" });
      }
      const result = await telegramBotService.deletePredefinedMessage(id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting predefined message:", error);
      res.status(500).json({ error: "Failed to delete predefined message" });
    }
  });
  
  app.put("/api/telegram/contacts/:chatId/block", async (req, res) => {
    try {
      const { isBlocked } = req.body;
      if (typeof isBlocked !== 'boolean') {
        return res.status(400).json({ error: "isBlocked must be a boolean" });
      }
      const result = await telegramBotService.toggleContactBlock(req.params.chatId, isBlocked);
      res.json(result);
    } catch (error) {
      console.error("Error updating contact block status:", error);
      res.status(500).json({ error: "Failed to update contact block status" });
    }
  });
  
  app.put("/api/telegram/contacts/:chatId/notes", async (req, res) => {
    try {
      const { notes } = req.body;
      if (typeof notes !== 'string') {
        return res.status(400).json({ error: "Notes must be a string" });
      }
      const result = await telegramBotService.updateContactNotes(req.params.chatId, notes);
      res.json(result);
    } catch (error) {
      console.error("Error updating contact notes:", error);
      res.status(500).json({ error: "Failed to update contact notes" });
    }
  });
  
  app.put("/api/telegram/contacts/:chatId/tags", async (req, res) => {
    try {
      const { tags } = req.body;
      if (!Array.isArray(tags)) {
        return res.status(400).json({ error: "Tags must be an array" });
      }
      const result = await telegramBotService.updateContactTags(req.params.chatId, tags);
      res.json(result);
    } catch (error) {
      console.error("Error updating contact tags:", error);
      res.status(500).json({ error: "Failed to update contact tags" });
    }
  });
  
  app.get("/api/telegram/settings", async (req, res) => {
    try {
      const settings = await telegramBotService.getBotSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching bot settings:", error);
      res.status(500).json({ error: "Failed to fetch bot settings" });
    }
  });
  
  app.put("/api/telegram/settings", async (req, res) => {
    try {
      const result = await telegramBotService.updateBotSettings(req.body);
      res.json(result);
    } catch (error) {
      console.error("Error updating bot settings:", error);
      res.status(500).json({ error: "Failed to update bot settings" });
    }
  });
  
  app.post("/api/telegram/toggle", async (req, res) => {
    try {
      const { isActive } = req.body;
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ error: "isActive must be a boolean" });
      }
      await telegramBotService.toggleBotStatus(isActive);
      res.json({ success: true, isActive });
    } catch (error) {
      console.error("Error toggling bot status:", error);
      res.status(500).json({ error: "Failed to toggle bot status" });
    }
  });
  
  // Test bildirim gönderme
  app.post("/api/telegram/test-notification", async (req, res) => {
    try {
      const { type, chatId } = req.body;
      
      if (!chatId || chatId.trim() === '') {
        return res.status(400).json({ 
          success: false, 
          message: "ChatId veya kullanıcı adı belirtilmemiş" 
        });
      }
      
      console.log(`Test bildirim isteği alındı: type=${type}, chatId=${chatId}`);
      
      // Öncelikle Telegram bot servisinin başlatılıp başlatılmadığını kontrol et
      if (!telegramBotService.isInitialized) {
        console.warn('Telegram bot başlatılmamış, otomatik başlatılıyor...');
        await telegramBotService.initialize();
        
        if (!telegramBotService.isInitialized) {
          return res.status(500).json({
            success: false,
            message: "Telegram bot başlatılamadı. TELEGRAM_BOT_TOKEN kontrol edilmeli."
          });
        }
      }
      
      const now = new Date();
      const formattedDate = now.toLocaleString("tr-TR", { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      const formattedTime = oneHourLater.toLocaleTimeString("tr-TR", {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      let message = "Bu bir test bildirim mesajıdır.";
      let messageTitle = '';
      
      // Bildirimin türüne göre farklı mesaj içeriği oluştur
      if (type === "new_appointment") {
        messageTitle = '🔔 Yeni Randevu Bildirimi';
        message = `*${messageTitle} (TEST)*\n\n` +
          "👤 *Hasta Bilgileri*\n" +
          "İsim: Test Müşteri\n" +
          "Telefon: +90 555 123 4567\n" +
          "E-posta: test@example.com\n\n" +
          "💇 *Randevu Detayları*\n" +
          "Hizmet: Saç Ekimi\n" +
          "Tarih: " + formattedDate + "\n\n" +
          "📋 Ek Bilgiler: Saç analizi için gelecek\n\n" +
          "_Bu bir test mesajıdır, gerçek bir randevu değildir._";
      } else if (type === "appointment_reminder") {
        messageTitle = '⏰ Randevu Hatırlatması';
        message = `*${messageTitle} (TEST)*\n\n` +
          "Aşağıdaki randevunuz 1 saat içinde başlayacak!\n\n" +
          "👤 *Hasta Bilgileri*\n" +
          "İsim: Test Müşteri\n" +
          "Telefon: +90 555 123 4567\n\n" +
          "💇 *Randevu Detayları*\n" +
          "Hizmet: Saç Ekimi\n" +
          "Saat: " + formattedTime + "\n\n" +
          "_Bu bir test mesajıdır, gerçek bir randevu değildir._";
      }
      
      console.log(`Test bildirim mesajı oluşturuldu: "${messageTitle}"`);
      
      // @ işareti içeriyorsa kullanıcı adı olarak kabul et
      let result = false;
      
      try {
        if (chatId.includes('@') || isNaN(Number(chatId))) {
          // Kullanıcı adı formatı
          let username = chatId;
          if (chatId.startsWith('@')) {
            username = chatId.substring(1);
          }
          
          console.log(`Test bildirimi kullanıcı adına gönderiliyor: ${username}`);
          result = await telegramBotService.sendMessageToOperator(username, message);
        } else {
          // Chat ID formatı
          const chatIdNumber = Number(chatId);
          console.log(`Test bildirimi chat ID'ye gönderiliyor: ${chatIdNumber}`);
          result = await telegramBotService.sendMessageByChatId(chatIdNumber, message);
        }
      } catch (sendError: any) {
        console.error(`Mesaj gönderme hatası: ${sendError.message || 'Bilinmeyen hata'}`);
        return res.status(500).json({
          success: false,
          message: `Mesaj gönderilirken hata oluştu: ${sendError.message}`,
          errorDetail: sendError
        });
      }
      
      if (result) {
        console.log(`Test bildirimi başarıyla gönderildi: ${type}`);
        res.json({ 
          success: true, 
          message: "Test bildirimi başarıyla gönderildi",
          type: type
        });
      } else {
        console.warn(`Test bildirimi gönderilemedi: ${type} - Chat ID: ${chatId}`);
        res.status(500).json({ 
          success: false, 
          message: "Bildirim gönderilemedi. Kullanıcının botu başlatması gerekiyor (/start komutu). Kullanıcı @MyHairClinicBot ile bir kez etkileşimde bulunmalı." 
        });
      }
    } catch (error: any) {
      console.error("Test bildirimi gönderme hatası:", error);
      res.status(500).json({ 
        success: false, 
        message: `Test bildirimi gönderilirken hata oluştu: ${error?.message || "Bilinmeyen hata"}` 
      });
    }
  });

  // Seed data routes (public during development)
  app.post("/api/seed/services", seedServices);
  app.post("/api/seed/packages", seedPackages);
  app.post("/api/seed/blog", seedBlogPosts);
  app.post("/api/seed/extended-blog", seedExtendedBlogPosts);
  app.post("/api/seed/unique-blog", seedUniqueBlogPosts);
  app.post("/api/seed/blog-direct", seedBlogDirectly);
  
  // Admin Dashboard API Routes
  app.get("/api/services/count", adminControllers.getServicesCount);
  app.get("/api/packages/count", adminControllers.getPackagesCount);
  app.get("/api/products/count", adminControllers.getProductsCount);
  app.get("/api/appointments/count", adminControllers.getAppointmentsCount);
  app.get("/api/messages/count", adminControllers.getMessagesCount);
  app.get("/api/reviews/count", adminControllers.getReviewsCount);
  app.get("/api/faqs/count", adminControllers.getFaqsCount);
  app.get("/api/aftercare-guides/count", adminControllers.getAftercareGuidesCount);
  app.get("/api/admin/analytics", adminControllers.getAnalyticsData);
  app.get("/api/admin/activity", adminControllers.getRecentActivity);
  app.post("/api/admin/clear-products", async (req, res) => {
    try {
      // Admin yetki kontrolü
      if (req.isAuthenticated && typeof req.isAuthenticated === 'function' && 
          !req.isAuthenticated() || (req.user?.role !== 'admin')) {
        return res.status(401).json({ success: false, message: "Bu işlem için admin yetkisi gereklidir." });
      }

      // Tüm ürünleri temizle
      await storage.clearProducts();
      
      return res.status(200).json({ 
        success: true, 
        message: "Tüm ürünler başarıyla silindi" 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      console.error("Ürünleri temizleme hatası:", errorMessage);
      return res.status(500).json({ 
        success: false, 
        message: "Ürünleri temizlerken bir hata oluştu",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  app.post("/api/admin/sync-vithair-products", async (req, res) => {
    try {
      // Admin yetki kontrolü
      if (req.isAuthenticated && typeof req.isAuthenticated === 'function' && 
          !req.isAuthenticated() || (req.user?.role !== 'admin')) {
        return res.status(401).json({ success: false, message: "Bu işlem için admin yetkisi gereklidir." });
      }

      const { syncVithairProducts } = await import("./services/vithair-scraper");
      const success = await syncVithairProducts();
      
      if (success) {
        // Başarılı ise, mevcut ürün sayısını al
        const products = await storage.getProducts();
        return res.status(200).json({ 
          success: true, 
          message: "Vithair ürünleri başarıyla senkronize edildi", 
          count: products.length 
        });
      } else {
        return res.status(500).json({ 
          success: false, 
          message: "Vithair ürünleri senkronize edilirken bir hata oluştu" 
        });
      }
    } catch (error) {
      console.error("Vithair ürünleri senkronizasyon hatası:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Vithair ürünleri senkronize edilirken bir hata oluştu",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  app.get("/api/seed-packages", (req, res) => res.redirect("/"));
  app.post("/api/seed-packages", seedPackages);
  // Route for adding only new country packages (Azerbaijan and Kazakhstan)
  app.post("/api/seed/new-country-packages", seedNewCountryPackages);
  
  // Seed Vithair products
  app.post("/api/seed/vithair-products", async (req, res) => {
    try {
      // Define Vithair products based on vithair.com.tr website
      const vithairProducts = [
        {
          nameTR: "Vithair PHD Şampuan",
          nameEN: "Vithair PHD Shampoo",
          nameRU: "Vithair PHD Шампунь",
          nameKA: "Vithair PHD შამპუნი",
          slug: "vithair-phd-shampoo",
          descriptionTR: "Saç dökülmesini önleyen ve saç büyümesini hızlandıran özel formüllü şampuan.",
          descriptionEN: "Specially formulated shampoo that prevents hair loss and accelerates hair growth.",
          descriptionRU: "Специально разработанный шампунь, предотвращающий выпадение волос и ускоряющий их рост.",
          descriptionKA: "სპეციალურად შემუშავებული შამპუნი, რომელიც ხელს უშლის თმის ცვენას და აჩქარებს თმის ზრდას.",
          imageUrl: "https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-PHD-SAMPUAN-300x300.png",
          isActive: true,
          isNew: true,
          price: 0
        },
        {
          nameTR: "Vithair Onarıcı Şampuan",
          nameEN: "Vithair Repair Shampoo",
          nameRU: "Vithair Восстанавливающий Шампунь",
          nameKA: "Vithair აღმდგენი შამპუნი",
          slug: "vithair-repair-shampoo",
          descriptionTR: "Hasar görmüş saçları onaran ve güçlendiren gelişmiş formül.",
          descriptionEN: "Advanced formula that repairs and strengthens damaged hair.",
          descriptionRU: "Продвинутая формула, восстанавливающая и укрепляющая поврежденные волосы.",
          descriptionKA: "წინწაწეული ფორმულა, რომელიც აღადგენს და აძლიერებს დაზიანებულ თმას.",
          imageUrl: "https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-ONARICI-SAMPUAN-300x300.png",
          isActive: true,
          isNew: false,
          price: 0
        },
        {
          nameTR: "Vithair Saç Bakım Kiti",
          nameEN: "Vithair Hair Care Kit",
          nameRU: "Набор по уходу за волосами Vithair",
          nameKA: "Vithair თმის მოვლის ნაკრები",
          slug: "vithair-hair-care-kit",
          descriptionTR: "Saç ekimi sonrası tam bakım için ideal ürün seti.",
          descriptionEN: "Ideal product set for complete care after hair transplantation.",
          descriptionRU: "Идеальный набор продуктов для полного ухода после трансплантации волос.",
          descriptionKA: "იდეალური პროდუქტების ნაკრები სრული მოვლისათვის თმის გადანერგვის შემდეგ.",
          imageUrl: "https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-SAC-BAKIM-KiTi-300x300.png",
          isActive: true,
          isNew: true,
          price: 0
        },
        {
          nameTR: "Vithair Saç Serumu",
          nameEN: "Vithair Hair Serum",
          nameRU: "Сыворотка для волос Vithair",
          nameKA: "Vithair თმის შრატი",
          slug: "vithair-hair-serum",
          descriptionTR: "Saç foliküllerini besleyen ve güçlendiren yoğun bakım serumu.",
          descriptionEN: "Intensive care serum that nourishes and strengthens hair follicles.",
          descriptionRU: "Сыворотка интенсивного ухода, питающая и укрепляющая волосяные фолликулы.",
          descriptionKA: "ინტენსიური მოვლის შრატი, რომელიც კვებავს და აძლიერებს თმის ფოლიკულებს.",
          imageUrl: "https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-SAC-SERUMU-300x300.png",
          isActive: true,
          isNew: false,
          price: 0
        },
        {
          nameTR: "Vithair Saç Vitamini",
          nameEN: "Vithair Hair Vitamin",
          nameRU: "Витамины для волос Vithair",
          nameKA: "Vithair თმის ვიტამინი",
          slug: "vithair-hair-vitamin",
          descriptionTR: "İçeriden saç sağlığını destekleyen özel vitamin formülü.",
          descriptionEN: "Special vitamin formula that supports hair health from within.",
          descriptionRU: "Специальная витаминная формула, поддерживающая здоровье волос изнутри.",
          descriptionKA: "სპეციალური ვიტამინის ფორმულა, რომელიც ხელს უწყობს თმის ჯანმრთელობას შიგნიდან.",
          imageUrl: "https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-SAC-ViTAMiNi-300x300.png",
          isActive: true,
          isNew: true,
          price: 0
        },
        {
          nameTR: "Vithair Nem Kremi",
          nameEN: "Vithair Moisture Cream",
          nameRU: "Увлажняющий крем Vithair",
          nameKA: "Vithair ტენიანობის კრემი",
          slug: "vithair-moisture-cream",
          descriptionTR: "Saç ve saç derisini derinlemesine nemlendirmeye yardımcı olan krem.",
          descriptionEN: "Cream that helps deeply moisturize hair and scalp.",
          descriptionRU: "Крем, который помогает глубоко увлажнить волосы и кожу головы.",
          descriptionKA: "კრემი, რომელიც ეხმარება ღრმად დატენიანებას თმისა და თავის კანის.",
          imageUrl: "https://www.vithair.com.tr/wp-content/uploads/2021/09/ViTHAIR-NEM-KREMi-300x300.png",
          isActive: true,
          isNew: false,
          price: 0
        }
      ];

      // Clear existing products if necessary and insert new ones
      await storage.clearProducts();
      
      // Insert each product
      for (const product of vithairProducts) {
        try {
          await storage.createProduct({
            ...product,
            // Add required fields for InsertProduct
            usageTR: "Kullanım talimatları için ürün etiketini inceleyin.",
            usageEN: "See product label for usage instructions.",
            usageRU: "Смотрите этикетку продукта для получения инструкций по использованию.",
            usageKA: "გამოყენების ინსტრუქციებისთვის იხილეთ პროდუქტის ეტიკეტი.",
            ingredientsTR: "İçerik bilgisi için ürün etiketini inceleyin.",
            ingredientsEN: "See product label for ingredient information.",
            ingredientsRU: "Смотрите этикетку продукта для получения информации о составе.",
            ingredientsKA: "ინგრედიენტების შესახებ ინფორმაციისთვის იხილეთ პროდუქტის ეტიკეტი.",
            order: 1
          });
        } catch (productError) {
          console.error(`Error creating product ${product.nameTR}:`, productError);
        }
      }
      
      res.status(200).json({ 
        success: true, 
        message: "Vithair products seeded successfully",
        count: vithairProducts.length
      });
    } catch (error) {
      console.error("Error seeding Vithair products:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to seed Vithair products", 
        error: errorMessage 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
