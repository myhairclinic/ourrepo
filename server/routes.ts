import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  getServices, 
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from "./controllers/contentController";
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from "./controllers/blogController";
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

  // Content routes
  app.get("/api/services", getServices);
  app.get("/api/services/:slug", getServiceBySlug);
  app.post("/api/services", createService);
  app.put("/api/services/:id", updateService);
  app.delete("/api/services/:id", deleteService);

  // Blog routes
  app.get("/api/blog", getBlogPosts);
  app.get("/api/blog/:slug", getBlogPostBySlug);
  app.post("/api/blog", createBlogPost);
  app.put("/api/blog/:id", updateBlogPost);
  app.delete("/api/blog/:id", deleteBlogPost);

  // Gallery routes
  app.get("/api/gallery", getGalleryItems);
  app.get("/api/gallery/type/:type", getGalleryItemsByType);
  app.post("/api/gallery", createGalleryItem);
  app.put("/api/gallery/:id", updateGalleryItem);
  app.delete("/api/gallery/:id", deleteGalleryItem);

  // Appointment routes
  app.post("/api/appointments", createAppointment);
  app.get("/api/appointments", getAppointments);
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

  // Package routes
  app.get("/api/packages", getPackages);
  app.get("/api/packages/:id", getPackageById);
  app.post("/api/packages", createPackage);
  app.put("/api/packages/:id", updatePackage);
  app.delete("/api/packages/:id", deletePackage);

  // Testimonial routes
  app.get("/api/testimonials", getTestimonials);
  app.post("/api/testimonials", createTestimonial);
  app.put("/api/testimonials/:id", updateTestimonial);
  app.delete("/api/testimonials/:id", deleteTestimonial);

  // Contact/Message routes
  app.post("/api/contact", createMessage);
  app.get("/api/messages", getMessages);
  app.put("/api/messages/:id/read", markMessageAsRead);
  app.delete("/api/messages/:id", deleteMessage);

  // Clinic info routes
  app.get("/api/clinic-info", getClinicInfo);
  app.put("/api/clinic-info", updateClinicInfo);

  const httpServer = createServer(app);

  return httpServer;
}
