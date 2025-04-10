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
  userReviews, UserReview, InsertUserReview,
  messages, Message, InsertMessage,
  clinicInfo, ClinicInfo, UpdateClinicInfo,
  aftercareGuides, AftercareGuide, InsertAftercareGuide,
  chatSessions, ChatSession, InsertChatSession,
  chatMessages, ChatMessage, InsertChatMessage,
  chatOperators, ChatOperator, InsertChatOperator
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { db, pool } from "./db";
import { eq, desc, asc } from "drizzle-orm";
import connectPg from "connect-pg-simple";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
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

  // User Review operations
  getUserReviews(): Promise<UserReview[]>;
  getUserReviewById(id: number): Promise<UserReview | undefined>;
  getUserReviewsByServiceId(serviceId: number): Promise<UserReview[]>;
  getApprovedUserReviews(): Promise<UserReview[]>;
  createUserReview(review: InsertUserReview): Promise<UserReview>;
  updateUserReviewApproval(id: number, isApproved: boolean): Promise<UserReview | undefined>;
  deleteUserReview(id: number): Promise<boolean>;

  // Message operations
  getMessages(): Promise<Message[]>;
  getMessageById(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessageReadStatus(id: number, isRead: boolean): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;

  // Clinic Info operations
  getClinicInfo(): Promise<ClinicInfo | undefined>;
  updateClinicInfo(info: UpdateClinicInfo): Promise<ClinicInfo | undefined>;
  
  // Aftercare Guide operations
  getAftercareGuides(): Promise<AftercareGuide[]>;
  getAftercareGuideById(id: number): Promise<AftercareGuide | undefined>;
  getAftercareGuidesByServiceId(serviceId: number): Promise<AftercareGuide[]>;
  createAftercareGuide(guide: InsertAftercareGuide): Promise<AftercareGuide>;
  updateAftercareGuide(id: number, guide: Partial<InsertAftercareGuide>): Promise<AftercareGuide | undefined>;
  deleteAftercareGuide(id: number): Promise<boolean>;

  // Chat Session operations
  getChatSessions(): Promise<ChatSession[]>;
  getChatSessionById(id: number): Promise<ChatSession | undefined>;
  getChatSessionByVisitorId(visitorId: string): Promise<ChatSession | undefined>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(id: number, sessionData: Partial<ChatSession>): Promise<ChatSession | undefined>;
  deleteChatSession(id: number): Promise<boolean>;

  // Chat Message operations
  getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]>;
  getChatMessageById(id: number): Promise<ChatMessage | undefined>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  markChatMessageAsRead(id: number): Promise<ChatMessage | undefined>;
  deleteChatMessage(id: number): Promise<boolean>;

  // Chat Operator operations
  getChatOperators(): Promise<ChatOperator[]>;
  getChatOperatorByUserId(userId: number): Promise<ChatOperator | undefined>;
  getAvailableChatOperators(): Promise<ChatOperator[]>;
  createChatOperator(operator: InsertChatOperator): Promise<ChatOperator>;
  updateChatOperatorAvailability(userId: number, isAvailable: boolean): Promise<ChatOperator | undefined>;
  deleteChatOperator(userId: number): Promise<boolean>;

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
  private userReviews: Map<number, UserReview>;
  private messages: Map<number, Message>;
  private clinicInfo: ClinicInfo | undefined;
  private aftercareGuides: Map<number, AftercareGuide>;
  private chatSessions: Map<number, ChatSession>;
  private chatMessages: Map<number, ChatMessage>;
  private chatOperators: Map<number, ChatOperator>;
  
  private currentUserId: number;
  private currentServiceId: number;
  private currentBlogPostId: number;
  private currentGalleryItemId: number;
  private currentFaqId: number;
  private currentProductId: number;
  private currentPackageId: number;
  private currentAppointmentId: number;
  private currentTestimonialId: number;
  private currentUserReviewId: number;
  private currentMessageId: number;
  private currentAftercareGuideId: number;
  private currentChatSessionId: number;
  private currentChatMessageId: number;
  private currentChatOperatorId: number;
  
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
    this.userReviews = new Map();
    this.messages = new Map();
    this.aftercareGuides = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.chatOperators = new Map();

    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentBlogPostId = 1;
    this.currentGalleryItemId = 1;
    this.currentFaqId = 1;
    this.currentProductId = 1;
    this.currentPackageId = 1;
    this.currentAppointmentId = 1;
    this.currentTestimonialId = 1;
    this.currentUserReviewId = 1;
    this.currentMessageId = 1;
    this.currentAftercareGuideId = 1;
    this.currentChatSessionId = 1;
    this.currentChatMessageId = 1;
    this.currentChatOperatorId = 1;

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
  
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
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

    // Ensure we maintain the duration property if it's not provided in the update
    const serviceWithDuration = {
      ...service,
      duration: service.duration || existingService.duration
    };

    const updatedService: Service = {
      ...existingService,
      ...serviceWithDuration,
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

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    return Array.from(this.packages.values()).find(p => p.slug === slug);
  }

  async getPackagesByCountry(countryCode: string): Promise<Package[]> {
    return Array.from(this.packages.values())
      .filter(p => p.countryOrigin === countryCode)
      .sort((a, b) => a.order - b.order);
  }

  async getFeaturedPackages(): Promise<Package[]> {
    return Array.from(this.packages.values())
      .filter(p => p.isActive && p.isFeatured)
      .sort((a, b) => a.order - b.order);
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
  
  // User Review operations
  async getUserReviews(): Promise<UserReview[]> {
    return Array.from(this.userReviews.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getUserReviewById(id: number): Promise<UserReview | undefined> {
    return this.userReviews.get(id);
  }

  async getUserReviewsByServiceId(serviceId: number): Promise<UserReview[]> {
    return Array.from(this.userReviews.values())
      .filter(review => review.serviceId === serviceId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getApprovedUserReviews(): Promise<UserReview[]> {
    return Array.from(this.userReviews.values())
      .filter(review => review.isApproved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createUserReview(review: InsertUserReview): Promise<UserReview> {
    const id = this.currentUserReviewId++;
    const newReview: UserReview = {
      ...review,
      id,
      isApproved: false,
      createdAt: new Date()
    };
    this.userReviews.set(id, newReview);
    return newReview;
  }

  async updateUserReviewApproval(id: number, isApproved: boolean): Promise<UserReview | undefined> {
    const existingReview = this.userReviews.get(id);
    if (!existingReview) return undefined;

    const updatedReview: UserReview = {
      ...existingReview,
      isApproved
    };
    this.userReviews.set(id, updatedReview);
    return updatedReview;
  }

  async deleteUserReview(id: number): Promise<boolean> {
    return this.userReviews.delete(id);
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
  
  // Aftercare Guide operations
  async getAftercareGuides(): Promise<AftercareGuide[]> {
    return Array.from(this.aftercareGuides.values()).sort((a, b) => a.order - b.order);
  }

  async getAftercareGuideById(id: number): Promise<AftercareGuide | undefined> {
    return this.aftercareGuides.get(id);
  }

  async getAftercareGuidesByServiceId(serviceId: number): Promise<AftercareGuide[]> {
    return Array.from(this.aftercareGuides.values())
      .filter(guide => guide.serviceId === serviceId)
      .sort((a, b) => a.order - b.order);
  }

  async createAftercareGuide(guide: InsertAftercareGuide): Promise<AftercareGuide> {
    const id = this.currentAftercareGuideId++;
    const newGuide: AftercareGuide = {
      ...guide,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.aftercareGuides.set(id, newGuide);
    return newGuide;
  }

  async updateAftercareGuide(id: number, guide: Partial<InsertAftercareGuide>): Promise<AftercareGuide | undefined> {
    const existingGuide = this.aftercareGuides.get(id);
    if (!existingGuide) return undefined;

    const updatedGuide: AftercareGuide = {
      ...existingGuide,
      ...guide,
      updatedAt: new Date()
    };
    this.aftercareGuides.set(id, updatedGuide);
    return updatedGuide;
  }

  async deleteAftercareGuide(id: number): Promise<boolean> {
    return this.aftercareGuides.delete(id);
  }

  // Chat Session operations
  async getChatSessions(): Promise<ChatSession[]> {
    return Array.from(this.chatSessions.values())
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
  }

  async getChatSessionById(id: number): Promise<ChatSession | undefined> {
    return this.chatSessions.get(id);
  }

  async getChatSessionByVisitorId(visitorId: string): Promise<ChatSession | undefined> {
    return Array.from(this.chatSessions.values())
      .find(session => session.visitorId === visitorId && session.status === 'active');
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const id = this.currentChatSessionId++;
    const newSession: ChatSession = {
      ...session,
      id,
      status: 'active',
      lastMessageAt: new Date(),
      createdAt: new Date(),
      isArchived: false,
      hasUnreadMessages: false
    };
    this.chatSessions.set(id, newSession);
    return newSession;
  }

  async updateChatSession(id: number, sessionData: Partial<ChatSession>): Promise<ChatSession | undefined> {
    const existingSession = this.chatSessions.get(id);
    if (!existingSession) return undefined;

    const updatedSession: ChatSession = {
      ...existingSession,
      ...sessionData,
    };
    this.chatSessions.set(id, updatedSession);
    return updatedSession;
  }

  async deleteChatSession(id: number): Promise<boolean> {
    return this.chatSessions.delete(id);
  }

  // Chat Message operations
  async getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async getChatMessageById(id: number): Promise<ChatMessage | undefined> {
    return this.chatMessages.get(id);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const newMessage: ChatMessage = {
      ...message,
      id,
      timestamp: new Date(),
      isRead: message.senderType !== 'visitor' // mark operator and system messages as read by default
    };
    this.chatMessages.set(id, newMessage);

    // Update the session's lastMessageAt
    const session = this.chatSessions.get(message.sessionId);
    if (session) {
      this.updateChatSession(session.id, { 
        lastMessageAt: new Date(),
        hasUnreadMessages: message.senderType === 'visitor' // mark session as having unread messages if from visitor
      });
    }

    return newMessage;
  }

  async markChatMessageAsRead(id: number): Promise<ChatMessage | undefined> {
    const existingMessage = this.chatMessages.get(id);
    if (!existingMessage) return undefined;

    const updatedMessage: ChatMessage = {
      ...existingMessage,
      isRead: true
    };
    this.chatMessages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteChatMessage(id: number): Promise<boolean> {
    return this.chatMessages.delete(id);
  }

  // Chat Operator operations
  async getChatOperators(): Promise<ChatOperator[]> {
    return Array.from(this.chatOperators.values());
  }

  async getChatOperatorByUserId(userId: number): Promise<ChatOperator | undefined> {
    return Array.from(this.chatOperators.values())
      .find(operator => operator.userId === userId);
  }

  async getAvailableChatOperators(): Promise<ChatOperator[]> {
    return Array.from(this.chatOperators.values())
      .filter(operator => operator.isAvailable);
  }

  async createChatOperator(operator: InsertChatOperator): Promise<ChatOperator> {
    const id = this.currentChatOperatorId++;
    const newOperator: ChatOperator = {
      ...operator,
      id,
      lastActiveAt: new Date()
    };
    this.chatOperators.set(id, newOperator);
    return newOperator;
  }

  async updateChatOperatorAvailability(userId: number, isAvailable: boolean): Promise<ChatOperator | undefined> {
    const existingOperator = Array.from(this.chatOperators.values())
      .find(operator => operator.userId === userId);
    
    if (!existingOperator) return undefined;

    const updatedOperator: ChatOperator = {
      ...existingOperator,
      isAvailable,
      lastActiveAt: new Date()
    };
    this.chatOperators.set(existingOperator.id, updatedOperator);
    return updatedOperator;
  }

  async deleteChatOperator(userId: number): Promise<boolean> {
    const operator = Array.from(this.chatOperators.values())
      .find(op => op.userId === userId);
    
    if (!operator) return false;
    return this.chatOperators.delete(operator.id);
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
  
  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Ensure role is never undefined
    const userWithDefaults = {
      ...insertUser,
      role: insertUser.role || "admin"
    };
    
    const [user] = await db.insert(users).values({
      ...userWithDefaults,
      createdAt: new Date()
    }).returning();
    return user;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    try {
      return await db.select({
        id: services.id,
        slug: services.slug,
        titleTR: services.titleTR,
        titleEN: services.titleEN,
        titleRU: services.titleRU,
        titleKA: services.titleKA,
        descriptionTR: services.descriptionTR,
        descriptionEN: services.descriptionEN,
        descriptionRU: services.descriptionRU,
        descriptionKA: services.descriptionKA,
        imageUrl: services.imageUrl,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt
      }).from(services);
    } catch (error) {
      console.error("Error in getServices:", error);
      return [];
    }
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    try {
      const [service] = await db.select({
        id: services.id,
        slug: services.slug,
        titleTR: services.titleTR,
        titleEN: services.titleEN,
        titleRU: services.titleRU,
        titleKA: services.titleKA,
        descriptionTR: services.descriptionTR,
        descriptionEN: services.descriptionEN,
        descriptionRU: services.descriptionRU,
        descriptionKA: services.descriptionKA,
        imageUrl: services.imageUrl,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt
      }).from(services).where(eq(services.id, id));
      return service;
    } catch (error) {
      console.error("Error in getServiceById:", error);
      return undefined;
    }
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    try {
      const [service] = await db.select({
        id: services.id,
        slug: services.slug,
        titleTR: services.titleTR,
        titleEN: services.titleEN,
        titleRU: services.titleRU,
        titleKA: services.titleKA,
        descriptionTR: services.descriptionTR,
        descriptionEN: services.descriptionEN,
        descriptionRU: services.descriptionRU,
        descriptionKA: services.descriptionKA,
        detailedContentTR: services.detailedContentTR,
        detailedContentEN: services.detailedContentEN,
        detailedContentRU: services.detailedContentRU,
        detailedContentKA: services.detailedContentKA,
        procedureStepsTR: services.procedureStepsTR,
        procedureStepsEN: services.procedureStepsEN,
        procedureStepsRU: services.procedureStepsRU,
        procedureStepsKA: services.procedureStepsKA,
        candidateInfoTR: services.candidateInfoTR,
        candidateInfoEN: services.candidateInfoEN,
        candidateInfoRU: services.candidateInfoRU,
        candidateInfoKA: services.candidateInfoKA,
        postCareTR: services.postCareTR,
        postCareEN: services.postCareEN,
        postCareRU: services.postCareRU,
        postCareKA: services.postCareKA,
        imageUrl: services.imageUrl,
        extraImageUrls: services.extraImageUrls,
        videoUrl: services.videoUrl,
        duration: services.duration,
        price: services.price,
        metaTitleTR: services.metaTitleTR,
        metaTitleEN: services.metaTitleEN,
        metaTitleRU: services.metaTitleRU,
        metaTitleKA: services.metaTitleKA,
        metaDescriptionTR: services.metaDescriptionTR,
        metaDescriptionEN: services.metaDescriptionEN, 
        metaDescriptionRU: services.metaDescriptionRU,
        metaDescriptionKA: services.metaDescriptionKA,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt
      }).from(services).where(eq(services.slug, slug));
      return service;
    } catch (error) {
      console.error("Error in getServiceBySlug:", error);
      return undefined;
    }
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
    await db.delete(services).where(eq(services.id, id));
    return true;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.id));
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
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
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
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return true;
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
    await db.delete(faqs).where(eq(faqs.id, id));
    return true;
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
    await db.delete(products).where(eq(products.id, id));
    return true;
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
    await db.delete(packages).where(eq(packages.id, id));
    return true;
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
    await db.delete(appointments).where(eq(appointments.id, id));
    return true;
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
    await db.delete(testimonials).where(eq(testimonials.id, id));
    return true;
  }

  // User Review operations
  async getUserReviews(): Promise<UserReview[]> {
    return await db.select().from(userReviews).orderBy(desc(userReviews.createdAt));
  }

  async getUserReviewById(id: number): Promise<UserReview | undefined> {
    const [review] = await db.select().from(userReviews).where(eq(userReviews.id, id));
    return review;
  }

  async getUserReviewsByServiceId(serviceId: number): Promise<UserReview[]> {
    return await db.select().from(userReviews)
      .where(eq(userReviews.serviceId, serviceId))
      .orderBy(desc(userReviews.createdAt));
  }

  async getApprovedUserReviews(): Promise<UserReview[]> {
    return await db.select().from(userReviews)
      .where(eq(userReviews.isApproved, true))
      .orderBy(desc(userReviews.createdAt));
  }

  async createUserReview(review: InsertUserReview): Promise<UserReview> {
    const [newReview] = await db.insert(userReviews).values({
      ...review,
      isApproved: false,
      createdAt: new Date()
    }).returning();
    return newReview;
  }

  async updateUserReviewApproval(id: number, isApproved: boolean): Promise<UserReview | undefined> {
    const [updatedReview] = await db.update(userReviews)
      .set({
        isApproved
      })
      .where(eq(userReviews.id, id))
      .returning();
    return updatedReview;
  }

  async deleteUserReview(id: number): Promise<boolean> {
    await db.delete(userReviews).where(eq(userReviews.id, id));
    return true;
  }

  // Message operations
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
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
    await db.delete(messages).where(eq(messages.id, id));
    return true;
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
  
  // Chat Session operations
  async getChatSessions(): Promise<ChatSession[]> {
    return await db.select().from(chatSessions).orderBy(desc(chatSessions.lastMessageAt));
  }

  async getChatSessionById(id: number): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session;
  }

  async getChatSessionByVisitorId(visitorId: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions)
      .where(eq(chatSessions.visitorId, visitorId))
      .where(eq(chatSessions.status, 'active'));
    return session;
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const [newSession] = await db.insert(chatSessions).values({
      ...session,
      status: 'active',
      lastMessageAt: new Date(),
      createdAt: new Date(),
      isArchived: false,
      hasUnreadMessages: false
    }).returning();
    return newSession;
  }

  async updateChatSession(id: number, sessionData: Partial<ChatSession>): Promise<ChatSession | undefined> {
    const [updatedSession] = await db.update(chatSessions)
      .set(sessionData)
      .where(eq(chatSessions.id, id))
      .returning();
    return updatedSession;
  }

  async deleteChatSession(id: number): Promise<boolean> {
    await db.delete(chatSessions).where(eq(chatSessions.id, id));
    return true;
  }

  // Chat Message operations
  async getChatMessagesBySessionId(sessionId: number): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.timestamp));
  }

  async getChatMessageById(id: number): Promise<ChatMessage | undefined> {
    const [message] = await db.select().from(chatMessages).where(eq(chatMessages.id, id));
    return message;
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values({
      ...message,
      timestamp: new Date(),
      isRead: message.senderType !== 'visitor' // mark operator and system messages as read by default
    }).returning();

    // Update the session's lastMessageAt
    await db.update(chatSessions)
      .set({ 
        lastMessageAt: new Date(),
        hasUnreadMessages: message.senderType === 'visitor' // mark session as having unread messages if from visitor
      })
      .where(eq(chatSessions.id, message.sessionId));

    return newMessage;
  }

  async markChatMessageAsRead(id: number): Promise<ChatMessage | undefined> {
    const [updatedMessage] = await db.update(chatMessages)
      .set({ isRead: true })
      .where(eq(chatMessages.id, id))
      .returning();
    return updatedMessage;
  }

  async deleteChatMessage(id: number): Promise<boolean> {
    await db.delete(chatMessages).where(eq(chatMessages.id, id));
    return true;
  }

  // Chat Operator operations
  async getChatOperators(): Promise<ChatOperator[]> {
    return await db.select().from(chatOperators);
  }

  async getChatOperatorByUserId(userId: number): Promise<ChatOperator | undefined> {
    const [operator] = await db.select().from(chatOperators).where(eq(chatOperators.userId, userId));
    return operator;
  }

  async getAvailableChatOperators(): Promise<ChatOperator[]> {
    return await db.select().from(chatOperators).where(eq(chatOperators.isAvailable, true));
  }

  async createChatOperator(operator: InsertChatOperator): Promise<ChatOperator> {
    const [newOperator] = await db.insert(chatOperators).values({
      ...operator,
      lastActiveAt: new Date()
    }).returning();
    return newOperator;
  }

  async updateChatOperatorAvailability(userId: number, isAvailable: boolean): Promise<ChatOperator | undefined> {
    const [updatedOperator] = await db.update(chatOperators)
      .set({ 
        isAvailable,
        lastActiveAt: new Date()
      })
      .where(eq(chatOperators.userId, userId))
      .returning();
    return updatedOperator;
  }

  async deleteChatOperator(userId: number): Promise<boolean> {
    await db.delete(chatOperators).where(eq(chatOperators.userId, userId));
    return true;
  }

  // Aftercare Guide operations
  async getAftercareGuides(): Promise<AftercareGuide[]> {
    return await db.select().from(aftercareGuides).orderBy(aftercareGuides.order);
  }

  async getAftercareGuideById(id: number): Promise<AftercareGuide | undefined> {
    const [guide] = await db.select().from(aftercareGuides).where(eq(aftercareGuides.id, id));
    return guide;
  }

  async getAftercareGuidesByServiceId(serviceId: number): Promise<AftercareGuide[]> {
    return await db.select().from(aftercareGuides)
      .where(eq(aftercareGuides.serviceId, serviceId))
      .orderBy(aftercareGuides.order);
  }

  async createAftercareGuide(guide: InsertAftercareGuide): Promise<AftercareGuide> {
    const [newGuide] = await db.insert(aftercareGuides).values({
      ...guide,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return newGuide;
  }

  async updateAftercareGuide(id: number, guide: Partial<InsertAftercareGuide>): Promise<AftercareGuide | undefined> {
    const [updatedGuide] = await db.update(aftercareGuides)
      .set({
        ...guide,
        updatedAt: new Date()
      })
      .where(eq(aftercareGuides.id, id))
      .returning();
    return updatedGuide;
  }

  async deleteAftercareGuide(id: number): Promise<boolean> {
    await db.delete(aftercareGuides).where(eq(aftercareGuides.id, id));
    return true;
  }
}

// Use database storage
export const storage = new DatabaseStorage();
