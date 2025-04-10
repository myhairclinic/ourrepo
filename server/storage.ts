import { 
  users, User, InsertUser, 
  services, Service, InsertService,
  blogPosts, BlogPost, InsertBlogPost,
  galleryItems, GalleryItem, InsertGalleryItem,
  faqs, FAQ, InsertFAQ,
  products, Product, InsertProduct,
  packages, Package, InsertPackage,
  appointments, Appointment, InsertAppointment,
  testimonials, Testimonial, InsertTestimonial,
  messages, Message, InsertMessage,
  clinicInfo, ClinicInfo, UpdateClinicInfo
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service operations
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Gallery operations
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemById(id: number): Promise<GalleryItem | undefined>;
  getGalleryItemsByType(type: string): Promise<GalleryItem[]>;
  getGalleryItemsByServiceId(serviceId: number): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;

  // FAQ operations
  getFaqs(): Promise<FAQ[]>;
  getFaqById(id: number): Promise<FAQ | undefined>;
  getFaqsByServiceId(serviceId: number): Promise<FAQ[]>;
  createFaq(faq: InsertFAQ): Promise<FAQ>;
  updateFaq(id: number, faq: Partial<InsertFAQ>): Promise<FAQ | undefined>;
  deleteFaq(id: number): Promise<boolean>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Package operations
  getPackages(): Promise<Package[]>;
  getPackageById(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined>;
  deletePackage(id: number): Promise<boolean>;

  // Appointment operations
  getAppointments(): Promise<Appointment[]>;
  getAppointmentById(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: number): Promise<boolean>;

  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;

  // Message operations
  getMessages(): Promise<Message[]>;
  getMessageById(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessageReadStatus(id: number, isRead: boolean): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;

  // Clinic Info operations
  getClinicInfo(): Promise<ClinicInfo | undefined>;
  updateClinicInfo(info: UpdateClinicInfo): Promise<ClinicInfo | undefined>;

  // Session store
  sessionStore: any;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private blogPosts: Map<number, BlogPost>;
  private galleryItems: Map<number, GalleryItem>;
  private faqs: Map<number, FAQ>;
  private products: Map<number, Product>;
  private packages: Map<number, Package>;
  private appointments: Map<number, Appointment>;
  private testimonials: Map<number, Testimonial>;
  private messages: Map<number, Message>;
  private clinicInfo: ClinicInfo | undefined;
  
  private currentUserId: number;
  private currentServiceId: number;
  private currentBlogPostId: number;
  private currentGalleryItemId: number;
  private currentFaqId: number;
  private currentProductId: number;
  private currentPackageId: number;
  private currentAppointmentId: number;
  private currentTestimonialId: number;
  private currentMessageId: number;
  
  sessionStore: any;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.blogPosts = new Map();
    this.galleryItems = new Map();
    this.faqs = new Map();
    this.products = new Map();
    this.packages = new Map();
    this.appointments = new Map();
    this.testimonials = new Map();
    this.messages = new Map();

    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentBlogPostId = 1;
    this.currentGalleryItemId = 1;
    this.currentFaqId = 1;
    this.currentProductId = 1;
    this.currentPackageId = 1;
    this.currentAppointmentId = 1;
    this.currentTestimonialId = 1;
    this.currentMessageId = 1;

    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });

    // Initialize with some data
    this.initializeData();
  }

  // Initialize with some sample data
  private initializeData() {
    // Create admin user
    this.createUser({
      username: "admin",
      password: "admin123", // This would be hashed in the auth controller
      role: "admin"
    });

    // Create sample clinic info
    this.clinicInfo = {
      id: 1,
      aboutTR: "MyHair Clinic, Tiflis'in merkezinde saç ekimi ve estetik çözümler sunan profesyonel bir kliniktir.",
      aboutEN: "MyHair Clinic is a professional clinic offering hair transplantation and aesthetic solutions in the center of Tbilisi.",
      aboutRU: "MyHair Clinic - это профессиональная клиника, предлагающая трансплантацию волос и эстетические решения в центре Тбилиси.",
      aboutKA: "MyHair Clinic არის პროფესიონალური კლინიკა, რომელიც გთავაზობთ თმის გადანერგვას და ესთეტიკურ გადაწყვეტილებებს თბილისის ცენტრში.",
      addressTR: "MyHair Clinic, 123 Rustaveli Avenue, Tbilisi, Georgia",
      addressEN: "MyHair Clinic, 123 Rustaveli Avenue, Tbilisi, Georgia",
      addressRU: "MyHair Clinic, 123 Rustaveli Avenue, Tbilisi, Georgia",
      addressKA: "MyHair Clinic, 123 რუსთაველის გამზირი, თბილისი, საქართველო",
      email: "info@myhairclinic.com",
      phone: "+995 123 456 789",
      whatsapp: "+995 123 456 789",
      instagram: "myhairclinic",
      facebook: "myhairclinic",
      youtube: "myhairclinic",
      workingHoursTR: "Pazartesi - Cuma: 09:00 - 18:00, Cumartesi: 09:00 - 14:00, Pazar: Kapalı",
      workingHoursEN: "Monday - Friday: 09:00 - 18:00, Saturday: 09:00 - 14:00, Sunday: Closed",
      workingHoursRU: "Понедельник - Пятница: 09:00 - 18:00, Суббота: 09:00 - 14:00, Воскресенье: Закрыто",
      workingHoursKA: "ორშაბათი - პარასკევი: 09:00 - 18:00, შაბათი: 09:00 - 14:00, კვირა: დახურულია",
      googleMapsUrl: "https://maps.google.com/maps?q=tbilisi&t=&z=13&ie=UTF8&iwloc=&output=embed",
      updatedAt: new Date()
    };
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => a.order - b.order);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(
      (service) => service.slug === slug,
    );
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = {
      ...service,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;

    const updatedService: Service = {
      ...existingService,
      ...service,
      updatedAt: new Date()
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const newPost: BlogPost = {
      ...post,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...post,
      updatedAt: new Date()
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Gallery operations
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).sort((a, b) => a.order - b.order);
  }

  async getGalleryItemById(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async getGalleryItemsByType(type: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values())
      .filter(item => item.type === type)
      .sort((a, b) => a.order - b.order);
  }

  async getGalleryItemsByServiceId(serviceId: number): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values())
      .filter(item => item.serviceId === serviceId)
      .sort((a, b) => a.order - b.order);
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.currentGalleryItemId++;
    const newItem: GalleryItem = {
      ...item,
      id,
      createdAt: new Date()
    };
    this.galleryItems.set(id, newItem);
    return newItem;
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const existingItem = this.galleryItems.get(id);
    if (!existingItem) return undefined;

    const updatedItem: GalleryItem = {
      ...existingItem,
      ...item
    };
    this.galleryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    return this.galleryItems.delete(id);
  }

  // FAQ operations
  async getFaqs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values()).sort((a, b) => a.order - b.order);
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    return this.faqs.get(id);
  }

  async getFaqsByServiceId(serviceId: number): Promise<FAQ[]> {
    return Array.from(this.faqs.values())
      .filter(faq => faq.serviceId === serviceId)
      .sort((a, b) => a.order - b.order);
  }

  async createFaq(faq: InsertFAQ): Promise<FAQ> {
    const id = this.currentFaqId++;
    const newFaq: FAQ = {
      ...faq,
      id,
      createdAt: new Date()
    };
    this.faqs.set(id, newFaq);
    return newFaq;
  }

  async updateFaq(id: number, faq: Partial<InsertFAQ>): Promise<FAQ | undefined> {
    const existingFaq = this.faqs.get(id);
    if (!existingFaq) return undefined;

    const updatedFaq: FAQ = {
      ...existingFaq,
      ...faq
    };
    this.faqs.set(id, updatedFaq);
    return updatedFaq;
  }

  async deleteFaq(id: number): Promise<boolean> {
    return this.faqs.delete(id);
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => a.order - b.order);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = {
      ...product,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    const updatedProduct: Product = {
      ...existingProduct,
      ...product,
      updatedAt: new Date()
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Package operations
  async getPackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).sort((a, b) => a.order - b.order);
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const id = this.currentPackageId++;
    const newPackage: Package = {
      ...pkg,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.packages.set(id, newPackage);
    return newPackage;
  }

  async updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined> {
    const existingPackage = this.packages.get(id);
    if (!existingPackage) return undefined;

    const updatedPackage: Package = {
      ...existingPackage,
      ...pkg,
      updatedAt: new Date()
    };
    this.packages.set(id, updatedPackage);
    return updatedPackage;
  }

  async deletePackage(id: number): Promise<boolean> {
    return this.packages.delete(id);
  }

  // Appointment operations
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const newAppointment: Appointment = {
      ...appointment,
      id,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment | undefined> {
    const existingAppointment = this.appointments.get(id);
    if (!existingAppointment) return undefined;

    const updatedAppointment: Appointment = {
      ...existingAppointment,
      ...appointment,
      updatedAt: new Date()
    };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    return this.appointments.delete(id);
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => a.order - b.order);
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
      createdAt: new Date()
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existingTestimonial = this.testimonials.get(id);
    if (!existingTestimonial) return undefined;

    const updatedTestimonial: Testimonial = {
      ...existingTestimonial,
      ...testimonial
    };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Message operations
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getMessageById(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage: Message = {
      ...message,
      id,
      isRead: false,
      createdAt: new Date()
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async updateMessageReadStatus(id: number, isRead: boolean): Promise<Message | undefined> {
    const existingMessage = this.messages.get(id);
    if (!existingMessage) return undefined;

    const updatedMessage: Message = {
      ...existingMessage,
      isRead
    };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }

  // Clinic Info operations
  async getClinicInfo(): Promise<ClinicInfo | undefined> {
    return this.clinicInfo;
  }

  async updateClinicInfo(info: UpdateClinicInfo): Promise<ClinicInfo | undefined> {
    if (!this.clinicInfo) return undefined;

    this.clinicInfo = {
      ...this.clinicInfo,
      ...info,
      updatedAt: new Date()
    };

    return this.clinicInfo;
  }
}

// Database Storage class for PostgreSQL
export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      createdAt: new Date()
    }).returning();
    return user;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.order);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values({
      ...service,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updatedService] = await db.update(services)
      .set({
        ...service,
        updatedAt: new Date()
      })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.count > 0;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.createdAt, "desc");
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values({
      ...post,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db.update(blogPosts)
      .set({
        ...post,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.count > 0;
  }

  // Gallery operations
  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).orderBy(galleryItems.order);
  }

  async getGalleryItemById(id: number): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item;
  }

  async getGalleryItemsByType(type: string): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems)
      .where(eq(galleryItems.type, type))
      .orderBy(galleryItems.order);
  }

  async getGalleryItemsByServiceId(serviceId: number): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems)
      .where(eq(galleryItems.serviceId, serviceId))
      .orderBy(galleryItems.order);
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const [newItem] = await db.insert(galleryItems).values({
      ...item,
      createdAt: new Date()
    }).returning();
    return newItem;
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [updatedItem] = await db.update(galleryItems)
      .set({
        ...item
      })
      .where(eq(galleryItems.id, id))
      .returning();
    return updatedItem;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    const result = await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return result.count > 0;
  }

  // FAQ operations
  async getFaqs(): Promise<FAQ[]> {
    return await db.select().from(faqs).orderBy(faqs.order);
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq;
  }

  async getFaqsByServiceId(serviceId: number): Promise<FAQ[]> {
    return await db.select().from(faqs)
      .where(eq(faqs.serviceId, serviceId))
      .orderBy(faqs.order);
  }

  async createFaq(faq: InsertFAQ): Promise<FAQ> {
    const [newFaq] = await db.insert(faqs).values({
      ...faq,
      createdAt: new Date()
    }).returning();
    return newFaq;
  }

  async updateFaq(id: number, faq: Partial<InsertFAQ>): Promise<FAQ | undefined> {
    const [updatedFaq] = await db.update(faqs)
      .set({
        ...faq
      })
      .where(eq(faqs.id, id))
      .returning();
    return updatedFaq;
  }

  async deleteFaq(id: number): Promise<boolean> {
    const result = await db.delete(faqs).where(eq(faqs.id, id));
    return result.count > 0;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(products.order);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db.update(products)
      .set({
        ...product,
        updatedAt: new Date()
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.count > 0;
  }

  // Package operations
  async getPackages(): Promise<Package[]> {
    return await db.select().from(packages).orderBy(packages.order);
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const [newPackage] = await db.insert(packages).values({
      ...pkg,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return newPackage;
  }

  async updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined> {
    const [updatedPackage] = await db.update(packages)
      .set({
        ...pkg,
        updatedAt: new Date()
      })
      .where(eq(packages.id, id))
      .returning();
    return updatedPackage;
  }

  async deletePackage(id: number): Promise<boolean> {
    const result = await db.delete(packages).where(eq(packages.id, id));
    return result.count > 0;
  }

  // Appointment operations
  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values({
      ...appointment,
      createdAt: new Date()
    }).returning();
    return newAppointment;
  }

  async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db.update(appointments)
      .set({
        ...appointment
      })
      .where(eq(appointments.id, id))
      .returning();
    return updatedAppointment;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const result = await db.delete(appointments).where(eq(appointments.id, id));
    return result.count > 0;
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values({
      ...testimonial,
      createdAt: new Date()
    }).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updatedTestimonial] = await db.update(testimonials)
      .set({
        ...testimonial
      })
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.count > 0;
  }

  // Message operations
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.createdAt, "desc");
  }

  async getMessageById(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values({
      ...message,
      createdAt: new Date()
    }).returning();
    return newMessage;
  }

  async updateMessageReadStatus(id: number, isRead: boolean): Promise<Message | undefined> {
    const [updatedMessage] = await db.update(messages)
      .set({
        isRead
      })
      .where(eq(messages.id, id))
      .returning();
    return updatedMessage;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, id));
    return result.count > 0;
  }

  // Clinic Info operations
  async getClinicInfo(): Promise<ClinicInfo | undefined> {
    const [info] = await db.select().from(clinicInfo).limit(1);
    return info;
  }

  async updateClinicInfo(info: UpdateClinicInfo): Promise<ClinicInfo | undefined> {
    // Check if clinic info exists
    const existingInfo = await this.getClinicInfo();
    
    if (existingInfo) {
      // Update existing clinic info
      const [updatedInfo] = await db.update(clinicInfo)
        .set({
          ...info,
          updatedAt: new Date()
        })
        .where(eq(clinicInfo.id, existingInfo.id))
        .returning();
      return updatedInfo;
    } else {
      // Create new clinic info
      const [newInfo] = await db.insert(clinicInfo)
        .values({
          ...info,
          updatedAt: new Date()
        })
        .returning();
      return newInfo;
    }
  }
}

// Use database storage
export const storage = new DatabaseStorage();
