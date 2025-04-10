import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users (Admin users)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleTR: text("title_tr").notNull(),
  titleEN: text("title_en").notNull(),
  titleRU: text("title_ru").notNull(),
  titleKA: text("title_ka").notNull(),
  descriptionTR: text("description_tr").notNull(),
  descriptionEN: text("description_en").notNull(),
  descriptionRU: text("description_ru").notNull(),
  descriptionKA: text("description_ka").notNull(),
  imageUrl: text("image_url").notNull().default('/images/services/default.jpg'),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleTR: text("title_tr").notNull(),
  titleEN: text("title_en").notNull(),
  titleRU: text("title_ru").notNull(),
  titleKA: text("title_ka").notNull(),
  summaryTR: text("summary_tr").notNull(),
  summaryEN: text("summary_en").notNull(),
  summaryRU: text("summary_ru").notNull(),
  summaryKA: text("summary_ka").notNull(),
  contentTR: text("content_tr").notNull(),
  contentEN: text("content_en").notNull(),
  contentRU: text("content_ru").notNull(),
  contentKA: text("content_ka").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  metaTitleTR: text("meta_title_tr"),
  metaTitleEN: text("meta_title_en"),
  metaTitleRU: text("meta_title_ru"),
  metaTitleKA: text("meta_title_ka"),
  metaDescriptionTR: text("meta_description_tr"),
  metaDescriptionEN: text("meta_description_en"),
  metaDescriptionRU: text("meta_description_ru"),
  metaDescriptionKA: text("meta_description_ka"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Gallery items
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // before-after, clinic, video
  serviceId: integer("service_id"),
  beforeImageUrl: text("before_image_url"),
  afterImageUrl: text("after_image_url"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  descriptionTR: text("description_tr"),
  descriptionEN: text("description_en"),
  descriptionRU: text("description_ru"),
  descriptionKA: text("description_ka"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
  createdAt: true,
});

// FAQs
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id"),
  questionTR: text("question_tr").notNull(),
  questionEN: text("question_en").notNull(),
  questionRU: text("question_ru").notNull(),
  questionKA: text("question_ka").notNull(),
  answerTR: text("answer_tr").notNull(),
  answerEN: text("answer_en").notNull(),
  answerRU: text("answer_ru").notNull(),
  answerKA: text("answer_ka").notNull(),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameTR: text("name_tr").notNull(),
  nameEN: text("name_en").notNull(),
  nameRU: text("name_ru").notNull(),
  nameKA: text("name_ka").notNull(),
  descriptionTR: text("description_tr").notNull(),
  descriptionEN: text("description_en").notNull(),
  descriptionRU: text("description_ru").notNull(),
  descriptionKA: text("description_ka").notNull(),
  usageTR: text("usage_tr").notNull(),
  usageEN: text("usage_en").notNull(),
  usageRU: text("usage_ru").notNull(),
  usageKA: text("usage_ka").notNull(),
  ingredientsTR: text("ingredients_tr").notNull(),
  ingredientsEN: text("ingredients_en").notNull(),
  ingredientsRU: text("ingredients_ru").notNull(),
  ingredientsKA: text("ingredients_ka").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Packages
export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  titleTR: text("title_tr").notNull(),
  titleEN: text("title_en").notNull(),
  titleRU: text("title_ru").notNull(),
  titleKA: text("title_ka").notNull(),
  descriptionTR: text("description_tr").notNull(),
  descriptionEN: text("description_en").notNull(),
  descriptionRU: text("description_ru").notNull(),
  descriptionKA: text("description_ka").notNull(),
  contentTR: text("content_tr").notNull(),
  contentEN: text("content_en").notNull(),
  contentRU: text("content_ru").notNull(),
  contentKA: text("content_ka").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Appointments
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceId: integer("service_id").notNull(),
  message: text("message"),
  preferredDate: text("preferred_date"),
  status: text("status").notNull().default("new"), // new, confirmed, completed, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  nameTR: text("name_tr").notNull(),
  nameEN: text("name_en").notNull(),
  nameRU: text("name_ru").notNull(),
  nameKA: text("name_ka").notNull(),
  locationTR: text("location_tr").notNull(),
  locationEN: text("location_en").notNull(),
  locationRU: text("location_ru").notNull(),
  locationKA: text("location_ka").notNull(),
  commentTR: text("comment_tr").notNull(),
  commentEN: text("comment_en").notNull(),
  commentRU: text("comment_ru").notNull(),
  commentKA: text("comment_ka").notNull(),
  rating: integer("rating").notNull().default(5),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

// Messages/Contact form submissions
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

// Clinic info
export const clinicInfo = pgTable("clinic_info", {
  id: serial("id").primaryKey(),
  aboutTR: text("about_tr").notNull(),
  aboutEN: text("about_en").notNull(),
  aboutRU: text("about_ru").notNull(),
  aboutKA: text("about_ka").notNull(),
  addressTR: text("address_tr").notNull(),
  addressEN: text("address_en").notNull(),
  addressRU: text("address_ru").notNull(),
  addressKA: text("address_ka").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp").notNull(),
  instagram: text("instagram"),
  facebook: text("facebook"),
  youtube: text("youtube"),
  workingHoursTR: text("working_hours_tr").notNull(),
  workingHoursEN: text("working_hours_en").notNull(),
  workingHoursRU: text("working_hours_ru").notNull(),
  workingHoursKA: text("working_hours_ka").notNull(),
  googleMapsUrl: text("google_maps_url").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const updateClinicInfoSchema = createInsertSchema(clinicInfo).omit({
  id: true,
  updatedAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFaqSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type ClinicInfo = typeof clinicInfo.$inferSelect;
export type UpdateClinicInfo = z.infer<typeof updateClinicInfoSchema>;
