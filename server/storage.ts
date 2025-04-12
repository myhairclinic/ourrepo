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
  chatOperators, ChatOperator, InsertChatOperator,
  patients, Patient, InsertPatient,
  patientDocuments, PatientDocument, InsertPatientDocument,
  treatmentRecords, TreatmentRecord, InsertTreatmentRecord
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { db, pool } from "./db";
import { eq, desc, asc, sql } from "drizzle-orm";
import connectPg from "connect-pg-simple";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

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
  getPaginatedBlogPosts(params: {
    page: number;
    limit: number;
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
  }): Promise<{
    posts: BlogPost[];
    totalPosts: number;
    totalPages: number;
  }>;
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
  clearProducts(): Promise<boolean>;

  // Package operations
  getPackages(): Promise<Package[]>;
  getPackageById(id: number): Promise<Package | undefined>;
  getPackageBySlug(slug: string): Promise<Package | undefined>;
  getOnePackagePerCountry(): Promise<Package[]>;
  getFeaturedPackages(): Promise<Package[]>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined>;
  deletePackage(id: number): Promise<boolean>;

  // Appointment operations
  getAppointments(): Promise<Appointment[]>;
  getAppointmentById(id: number): Promise<Appointment | undefined>;
  getAppointmentsByStatus(status: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined>;
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
  getUserReviewsByServiceId(serviceId: number | null): Promise<UserReview[]>;
  createUserReview(review: InsertUserReview): Promise<UserReview>;
  updateUserReview(id: number, review: Partial<InsertUserReview>): Promise<UserReview | undefined>;
  approveUserReview(id: number): Promise<UserReview | undefined>;
  deleteUserReview(id: number): Promise<boolean>;

  // Message operations
  getMessages(): Promise<Message[]>;
  getMessageById(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;

  // Clinic Info operations
  getClinicInfo(): Promise<ClinicInfo | undefined>;
  updateClinicInfo(info: UpdateClinicInfo): Promise<ClinicInfo | undefined>;

  // Aftercare Guide operations
  getAftercareGuides(): Promise<AftercareGuide[]>;
  getAftercareGuideById(id: number): Promise<AftercareGuide | undefined>;
  createAftercareGuide(guide: InsertAftercareGuide): Promise<AftercareGuide>;
  updateAftercareGuide(id: number, guide: Partial<InsertAftercareGuide>): Promise<AftercareGuide | undefined>;
  deleteAftercareGuide(id: number): Promise<boolean>;

  // Chat Session operations
  getChatSessions(): Promise<ChatSession[]>;
  getChatSessionById(id: number): Promise<ChatSession | undefined>;
  getChatSessionByVisitorId(visitorId: string): Promise<ChatSession | undefined>;
  getActiveChatSessions(): Promise<ChatSession[]>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(id: number, session: Partial<InsertChatSession>): Promise<ChatSession | undefined>;
  archiveChatSession(id: number): Promise<ChatSession | undefined>;
  markChatSessionAsRead(id: number): Promise<ChatSession | undefined>;
  deleteChatSession(id: number): Promise<boolean>;

  // Chat Message operations
  getChatMessages(sessionId: number): Promise<ChatMessage[]>;
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

  // Patient operations
  getPatients(): Promise<Patient[]>;
  getPatientById(id: number): Promise<Patient | undefined>;
  createPatient(data: InsertPatient): Promise<Patient>;
  updatePatient(id: number, data: Partial<InsertPatient>): Promise<Patient | undefined>;
  deletePatient(id: number): Promise<Patient | undefined>;

  // Patient Document operations
  getPatientDocuments(patientId: number): Promise<PatientDocument[]>;
  getDocumentById(id: number): Promise<PatientDocument | undefined>;
  createPatientDocument(data: InsertPatientDocument): Promise<PatientDocument>;
  updatePatientDocument(id: number, data: Partial<InsertPatientDocument>): Promise<PatientDocument | undefined>;
  deletePatientDocument(id: number): Promise<PatientDocument | undefined>;

  // Treatment Record operations
  getTreatmentRecords(patientId: number): Promise<TreatmentRecord[]>;
  getTreatmentRecordById(id: number): Promise<TreatmentRecord | undefined>;
  createTreatmentRecord(data: InsertTreatmentRecord): Promise<TreatmentRecord>;
  updateTreatmentRecord(id: number, data: Partial<InsertTreatmentRecord>): Promise<TreatmentRecord | undefined>;
  deleteTreatmentRecord(id: number): Promise<TreatmentRecord | undefined>;

  // Session store
  sessionStore: any;
}

export class MemStorage implements IStorage {
  async clearProducts(): Promise<boolean> {
    this.products.clear();
    return true;
  }
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
  private patients: Map<number, Patient>;
  private patientDocuments: Map<number, PatientDocument>;
  private treatmentRecords: Map<number, TreatmentRecord>;
  
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
  private currentPatientId: number;
  private currentPatientDocumentId: number;
  private currentTreatmentRecordId: number;
  
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
    this.patients = new Map();
    this.patientDocuments = new Map();
    this.treatmentRecords = new Map();

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
    this.currentPatientId = 1;
    this.currentPatientDocumentId = 1;
    this.currentTreatmentRecordId = 1;

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
      role: insertUser.role || 'admin', // Ensure role is never undefined
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
  
  async getPaginatedBlogPosts(params: {
    page: number;
    limit: number;
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
  }): Promise<{
    posts: BlogPost[];
    totalPosts: number;
    totalPages: number;
  }> {
    const { page, limit, category, tag, search, sort } = params;
    
    // Temel verileri filtrele
    let filtered = Array.from(this.blogPosts.values());
    
    // Kategori filtresi
    if (category) {
      filtered = filtered.filter(post => post.category === category);
    }
    
    // Etiket filtresi
    if (tag) {
      filtered = filtered.filter(post => {
        const tagArray = typeof post.tags === 'string' 
          ? post.tags.split(',').map(t => t.trim()) 
          : post.tags;
        return Array.isArray(tagArray) && tagArray.some(t => t.toLowerCase() === tag.toLowerCase());
      });
    }
    
    // Arama filtresi
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(post => {
        const title = (post.titleTR + ' ' + post.titleEN + ' ' + post.titleRU + ' ' + post.titleKA).toLowerCase();
        const summary = (post.summaryTR + ' ' + post.summaryEN + ' ' + post.summaryRU + ' ' + post.summaryKA).toLowerCase();
        const content = (post.contentTR + ' ' + post.contentEN + ' ' + post.contentRU + ' ' + post.contentKA).toLowerCase();
        
        return title.includes(searchLower) || 
               summary.includes(searchLower) || 
               content.includes(searchLower) ||
               post.author.toLowerCase().includes(searchLower);
      });
    }
    
    // Sıralama
    if (sort === 'oldest') {
      filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (sort === 'popular') {
      filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else {
      // Default: en yeni (newest)
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    // Toplam sayfa sayısını hesapla
    const totalPosts = filtered.length;
    const totalPages = Math.ceil(totalPosts / limit);
    
    // Sayfalama
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filtered.slice(startIndex, startIndex + limit);
    
    return {
      posts: paginatedPosts,
      totalPosts,
      totalPages
    };
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
    return Array.from(this.packages.values());
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    return Array.from(this.packages.values()).find(
      (pkg) => pkg.slug === slug,
    );
  }

  async getOnePackagePerCountry(): Promise<Package[]> {
    // Tüm paketleri al ve ülkeye göre grupla
    const packages = Array.from(this.packages.values());
    const countryMap = new Map<string, Package>();
    
    // Her ülke için sadece bir paket ekle (son eklenen paket kalır)
    for (const pkg of packages) {
      if (pkg.country) {
        countryMap.set(pkg.country, pkg);
      }
    }
    
    // Map'ten değerleri al ve dizi olarak döndür
    return Array.from(countryMap.values());
  }
  
  async getFeaturedPackages(): Promise<Package[]> {
    // Öne çıkan paketleri filtreleyerek döndür
    return Array.from(this.packages.values()).filter(pkg => pkg.isFeatured);
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
    return Array.from(this.appointments.values()).sort((a, b) => b.appointmentDate.getTime() - a.appointmentDate.getTime());
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByStatus(status: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values())
      .filter(appointment => appointment.status === status)
      .sort((a, b) => b.appointmentDate.getTime() - a.appointmentDate.getTime());
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const newAppointment: Appointment = {
      ...appointment,
      id,
      createdAt: new Date()
    };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  async updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const existingAppointment = this.appointments.get(id);
    if (!existingAppointment) return undefined;

    const updatedAppointment: Appointment = {
      ...existingAppointment,
      ...appointment
    };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }
  
  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const existingAppointment = this.appointments.get(id);
    if (!existingAppointment) return undefined;
    
    const updatedAppointment: Appointment = {
      ...existingAppointment,
      status,
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

  async getUserReviewsByServiceId(serviceId: number | null): Promise<UserReview[]> {
    return Array.from(this.userReviews.values())
      .filter(review => review.serviceId === serviceId && review.isApproved)
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

  async updateUserReview(id: number, review: Partial<InsertUserReview>): Promise<UserReview | undefined> {
    const existingReview = this.userReviews.get(id);
    if (!existingReview) return undefined;

    const updatedReview: UserReview = {
      ...existingReview,
      ...review
    };
    this.userReviews.set(id, updatedReview);
    return updatedReview;
  }

  async approveUserReview(id: number): Promise<UserReview | undefined> {
    const existingReview = this.userReviews.get(id);
    if (!existingReview) return undefined;

    const updatedReview: UserReview = {
      ...existingReview,
      isApproved: true
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

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;

    const updatedMessage: Message = {
      ...message,
      isRead: true
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
    return Array.from(this.aftercareGuides.values());
  }

  async getAftercareGuideById(id: number): Promise<AftercareGuide | undefined> {
    return this.aftercareGuides.get(id);
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
      .find(session => session.visitorId === visitorId && !session.isArchived);
  }

  async getActiveChatSessions(): Promise<ChatSession[]> {
    return Array.from(this.chatSessions.values())
      .filter(session => !session.isArchived)
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const id = this.currentChatSessionId++;
    const newSession: ChatSession = {
      ...session,
      id,
      createdAt: new Date(),
      isArchived: false,
      hasUnreadMessages: false,
      lastMessageAt: new Date()
    };
    this.chatSessions.set(id, newSession);
    return newSession;
  }

  async updateChatSession(id: number, session: Partial<InsertChatSession>): Promise<ChatSession | undefined> {
    const existingSession = this.chatSessions.get(id);
    if (!existingSession) return undefined;

    const updatedSession: ChatSession = {
      ...existingSession,
      ...session
    };
    this.chatSessions.set(id, updatedSession);
    return updatedSession;
  }

  async archiveChatSession(id: number): Promise<ChatSession | undefined> {
    const session = this.chatSessions.get(id);
    if (!session) return undefined;

    const updatedSession: ChatSession = {
      ...session,
      isArchived: true
    };
    this.chatSessions.set(id, updatedSession);
    return updatedSession;
  }

  async markChatSessionAsRead(id: number): Promise<ChatSession | undefined> {
    const session = this.chatSessions.get(id);
    if (!session) return undefined;

    const updatedSession: ChatSession = {
      ...session,
      hasUnreadMessages: false
    };
    this.chatSessions.set(id, updatedSession);
    return updatedSession;
  }

  async deleteChatSession(id: number): Promise<boolean> {
    return this.chatSessions.delete(id);
  }

  // Chat Message operations
  async getChatMessages(sessionId: number): Promise<ChatMessage[]> {
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
      timestamp: new Date()
    };
    this.chatMessages.set(id, newMessage);

    // Update session to reflect new message
    const session = this.chatSessions.get(message.sessionId);
    if (session) {
      const updatedSession: ChatSession = {
        ...session,
        lastMessageAt: new Date(),
        hasUnreadMessages: message.senderType === 'visitor' // Mark as unread only if from visitor
      };
      this.chatSessions.set(session.id, updatedSession);
    }

    return newMessage;
  }

  async markChatMessageAsRead(id: number): Promise<ChatMessage | undefined> {
    const message = this.chatMessages.get(id);
    if (!message) return undefined;

    const updatedMessage: ChatMessage = {
      ...message,
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
    const operator = Array.from(this.chatOperators.values())
      .find(op => op.userId === userId);
    
    if (!operator) return undefined;

    const updatedOperator: ChatOperator = {
      ...operator,
      isAvailable,
      lastActiveAt: new Date()
    };
    this.chatOperators.set(operator.id, updatedOperator);
    return updatedOperator;
  }

  async deleteChatOperator(userId: number): Promise<boolean> {
    const operator = Array.from(this.chatOperators.values())
      .find(op => op.userId === userId);
    
    if (!operator) return false;
    return this.chatOperators.delete(operator.id);
  }

  // Patient operations
  async getPatients(): Promise<Patient[]> {
    return Array.from(this.patients.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPatientById(id: number): Promise<Patient | undefined> {
    return this.patients.get(id);
  }
  
  async getPatientByPhone(phone: string): Promise<Patient | undefined> {
    return Array.from(this.patients.values()).find(patient => patient.phone === phone);
  }

  async createPatient(data: InsertPatient): Promise<Patient> {
    const id = this.currentPatientId++;
    const patient: Patient = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.patients.set(id, patient);
    return patient;
  }

  async updatePatient(id: number, data: Partial<InsertPatient>): Promise<Patient | undefined> {
    const existingPatient = this.patients.get(id);
    if (!existingPatient) return undefined;

    const updatedPatient: Patient = {
      ...existingPatient,
      ...data,
      updatedAt: new Date()
    };
    this.patients.set(id, updatedPatient);
    return updatedPatient;
  }

  async deletePatient(id: number): Promise<Patient | undefined> {
    const patient = this.patients.get(id);
    if (!patient) return undefined;

    // İlgili hasta dokümanlarını ve tedavi kayıtlarını da silmek için
    Array.from(this.patientDocuments.values())
      .filter(doc => doc.patientId === id)
      .forEach(doc => this.patientDocuments.delete(doc.id));
    
    Array.from(this.treatmentRecords.values())
      .filter(record => record.patientId === id)
      .forEach(record => this.treatmentRecords.delete(record.id));
    
    this.patients.delete(id);
    return patient;
  }

  // Patient Document operations
  async getPatientDocuments(patientId: number): Promise<PatientDocument[]> {
    return Array.from(this.patientDocuments.values())
      .filter(doc => doc.patientId === patientId)
      .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
  }

  async getDocumentById(id: number): Promise<PatientDocument | undefined> {
    return this.patientDocuments.get(id);
  }

  async createPatientDocument(data: InsertPatientDocument): Promise<PatientDocument> {
    const id = this.currentPatientDocumentId++;
    const document: PatientDocument = {
      ...data,
      id,
      uploadDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.patientDocuments.set(id, document);
    return document;
  }

  async updatePatientDocument(id: number, data: Partial<InsertPatientDocument>): Promise<PatientDocument | undefined> {
    const existingDocument = this.patientDocuments.get(id);
    if (!existingDocument) return undefined;

    const updatedDocument: PatientDocument = {
      ...existingDocument,
      ...data,
      updatedAt: new Date()
    };
    this.patientDocuments.set(id, updatedDocument);
    return updatedDocument;
  }

  async deletePatientDocument(id: number): Promise<PatientDocument | undefined> {
    const document = this.patientDocuments.get(id);
    if (!document) return undefined;
    
    this.patientDocuments.delete(id);
    return document;
  }

  // Treatment Record operations
  async getTreatmentRecords(patientId: number): Promise<TreatmentRecord[]> {
    return Array.from(this.treatmentRecords.values())
      .filter(record => record.patientId === patientId)
      .sort((a, b) => b.treatmentDate.getTime() - a.treatmentDate.getTime());
  }

  async getTreatmentRecordById(id: number): Promise<TreatmentRecord | undefined> {
    return this.treatmentRecords.get(id);
  }

  async createTreatmentRecord(data: InsertTreatmentRecord): Promise<TreatmentRecord> {
    const id = this.currentTreatmentRecordId++;
    const record: TreatmentRecord = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.treatmentRecords.set(id, record);
    return record;
  }

  async updateTreatmentRecord(id: number, data: Partial<InsertTreatmentRecord>): Promise<TreatmentRecord | undefined> {
    const existingRecord = this.treatmentRecords.get(id);
    if (!existingRecord) return undefined;

    const updatedRecord: TreatmentRecord = {
      ...existingRecord,
      ...data,
      updatedAt: new Date()
    };
    this.treatmentRecords.set(id, updatedRecord);
    return updatedRecord;
  }

  async deleteTreatmentRecord(id: number): Promise<TreatmentRecord | undefined> {
    const record = this.treatmentRecords.get(id);
    if (!record) return undefined;
    
    this.treatmentRecords.delete(id);
    return record;
  }
}

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

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
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
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updatedService] = await db.update(services)
      .set({ ...service, updatedAt: new Date() })
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
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPaginatedBlogPosts(params: {
    page: number;
    limit: number;
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
  }): Promise<{
    posts: BlogPost[];
    totalPosts: number;
    totalPages: number;
  }> {
    const { page, limit, category, tag, search, sort } = params;
    
    let query = db.select().from(blogPosts);

    if (category) {
      query = query.where(eq(blogPosts.category, category));
    }

    // Handle tag/search filtering after we get the posts because it's complex
    let posts = await query;
    
    // Tag filtering (in-memory because we need to parse JSON)
    if (tag) {
      posts = posts.filter(post => {
        let tags: string[] = [];
        if (post.tags && typeof post.tags === 'string') {
          tags = post.tags.split(',').map(t => t.trim());
        } else if (Array.isArray(post.tags)) {
          tags = post.tags;
        }
        return tags.some(t => t.toLowerCase() === tag.toLowerCase());
      });
    }
    
    // Search filtering (in-memory for multi-field search)
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post => {
        return (
          post.titleTR.toLowerCase().includes(searchLower) ||
          post.titleEN.toLowerCase().includes(searchLower) ||
          post.titleRU.toLowerCase().includes(searchLower) ||
          post.titleKA.toLowerCase().includes(searchLower) ||
          post.summaryTR.toLowerCase().includes(searchLower) ||
          post.summaryEN.toLowerCase().includes(searchLower) ||
          post.summaryRU.toLowerCase().includes(searchLower) ||
          post.summaryKA.toLowerCase().includes(searchLower) ||
          post.contentTR.toLowerCase().includes(searchLower) ||
          post.contentEN.toLowerCase().includes(searchLower) ||
          post.contentRU.toLowerCase().includes(searchLower) ||
          post.contentKA.toLowerCase().includes(searchLower) ||
          post.author.toLowerCase().includes(searchLower)
        );
      });
    }
    
    // Sort posts
    if (sort === 'oldest') {
      posts = posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (sort === 'popular') {
      posts = posts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else {
      // Default: newest
      posts = posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    // Get totals
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    
    // Paginate
    const startIndex = (page - 1) * limit;
    const paginatedPosts = posts.slice(startIndex, startIndex + limit);
    
    return {
      posts: paginatedPosts,
      totalPosts,
      totalPages
    };
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
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db.update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
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
    return await db.select().from(galleryItems);
  }

  async getGalleryItemById(id: number): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item;
  }

  async getGalleryItemsByType(type: string): Promise<GalleryItem[]> {
    return await db.select()
      .from(galleryItems)
      .where(eq(galleryItems.type, type));
  }

  async getGalleryItemsByServiceId(serviceId: number): Promise<GalleryItem[]> {
    return await db.select()
      .from(galleryItems)
      .where(eq(galleryItems.serviceId, serviceId));
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const [newItem] = await db.insert(galleryItems).values(item).returning();
    return newItem;
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [updatedItem] = await db.update(galleryItems)
      .set(item)
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
    return await db.select().from(faqs);
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq;
  }

  async getFaqsByServiceId(serviceId: number): Promise<FAQ[]> {
    return await db.select()
      .from(faqs)
      .where(eq(faqs.serviceId, serviceId));
  }

  async createFaq(faq: InsertFAQ): Promise<FAQ> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }

  async updateFaq(id: number, faq: Partial<InsertFAQ>): Promise<FAQ | undefined> {
    const [updatedFaq] = await db.update(faqs)
      .set(faq)
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
    return await db.select().from(products);
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
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db.update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    await db.delete(products).where(eq(products.id, id));
    return true;
  }

  async clearProducts(): Promise<boolean> {
    await db.delete(products);
    return true;
  }

  // Package operations
  async getPackages(): Promise<Package[]> {
    return await db.select().from(packages);
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }
  
  async getOnePackagePerCountry(): Promise<Package[]> {
    // Her ülke için bir paket alıyoruz
    // Önce tüm benzersiz ülkeleri bulalım
    const countries = await db.selectDistinct({ countryOrigin: packages.countryOrigin })
      .from(packages)
      .where(eq(packages.isActive, true));
    
    // Her ülke için en son güncellenen paketi alalım
    const result: Package[] = [];
    
    for (const { countryOrigin } of countries) {
      if (!countryOrigin) continue; // null ise atla
      
      // Bu ülke için en son güncellenen paketi alalım
      const [pkg] = await db.select()
        .from(packages)
        .where(eq(packages.countryOrigin, countryOrigin))
        .where(eq(packages.isActive, true))
        .orderBy(desc(packages.updatedAt))
        .limit(1);
        
      if (pkg) {
        // Country alanını da countryOrigin ile aynı değere ayarlayalım
        // Frontend'in doğru ülke kodunu alabilmesi için
        const updatedPkg = {
          ...pkg,
          country: pkg.countryOrigin
        };
        result.push(updatedPkg);
      }
    }
    
    console.log(`One package per country found: ${result.length}`);
    if (result.length > 0) {
      result.forEach(pkg => {
        console.log(`Package for ${pkg.countryOrigin} (${pkg.country}): ${pkg.titleTR}`);
      });
    }
    
    return result;
  }
  
  async getFeaturedPackages(): Promise<Package[]> {
    const result = await db.select()
      .from(packages)
      .where(eq(packages.isFeatured, true))
      .where(eq(packages.isActive, true))
      .orderBy(desc(packages.updatedAt));
    
    console.log(`Featured packages found: ${result.length}`);
    return result;
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.slug, slug));
    return pkg;
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const [newPackage] = await db.insert(packages).values(pkg).returning();
    return newPackage;
  }

  async updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined> {
    const [updatedPackage] = await db.update(packages)
      .set({ ...pkg, updatedAt: new Date() })
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
    return await db.select().from(appointments).orderBy(desc(appointments.createdAt));
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }

  async getAppointmentsByStatus(status: string): Promise<Appointment[]> {
    return await db.select()
      .from(appointments)
      .where(eq(appointments.status, status))
      .orderBy(desc(appointments.createdAt));
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }

  async updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db.update(appointments)
      .set(appointment)
      .where(eq(appointments.id, id))
      .returning();
    return updatedAppointment;
  }
  
  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db.update(appointments)
      .set({ 
        status, 
        updatedAt: new Date() 
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
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updatedTestimonial] = await db.update(testimonials)
      .set(testimonial)
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
    return await db.select().from(userReviews);
  }

  async getUserReviewById(id: number): Promise<UserReview | undefined> {
    const [review] = await db.select().from(userReviews).where(eq(userReviews.id, id));
    return review;
  }

  async getUserReviewsByServiceId(serviceId: number | null): Promise<UserReview[]> {
    return await db.select()
      .from(userReviews)
      .where(eq(userReviews.serviceId, serviceId))
      .where(eq(userReviews.isApproved, true))
      .orderBy(desc(userReviews.createdAt));
  }

  async createUserReview(review: InsertUserReview): Promise<UserReview> {
    const [newReview] = await db.insert(userReviews).values({
      ...review,
      isApproved: false
    }).returning();
    return newReview;
  }

  async updateUserReview(id: number, review: Partial<InsertUserReview>): Promise<UserReview | undefined> {
    const [updatedReview] = await db.update(userReviews)
      .set(review)
      .where(eq(userReviews.id, id))
      .returning();
    return updatedReview;
  }

  async approveUserReview(id: number): Promise<UserReview | undefined> {
    const [updatedReview] = await db.update(userReviews)
      .set({ isApproved: true })
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
    return await db.select().from(messages);
  }

  async getMessageById(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values({
      ...message,
      isRead: false
    }).returning();
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [updatedMessage] = await db.update(messages)
      .set({ isRead: true })
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
    const [info] = await db.select().from(clinicInfo);
    return info;
  }

  async updateClinicInfo(info: UpdateClinicInfo): Promise<ClinicInfo | undefined> {
    // Check if clinic info exists
    const existing = await this.getClinicInfo();
    
    if (existing) {
      // Update
      const [updatedInfo] = await db.update(clinicInfo)
        .set({ ...info, updatedAt: new Date() })
        .where(eq(clinicInfo.id, existing.id))
        .returning();
      return updatedInfo;
    } else {
      // Create
      const [newInfo] = await db.insert(clinicInfo).values({
        ...info,
        updatedAt: new Date()
      }).returning();
      return newInfo;
    }
  }

  // Aftercare Guide operations
  async getAftercareGuides(): Promise<AftercareGuide[]> {
    return await db.select().from(aftercareGuides);
  }

  async getAftercareGuideById(id: number): Promise<AftercareGuide | undefined> {
    const [guide] = await db.select().from(aftercareGuides).where(eq(aftercareGuides.id, id));
    return guide;
  }

  async createAftercareGuide(guide: InsertAftercareGuide): Promise<AftercareGuide> {
    const [newGuide] = await db.insert(aftercareGuides).values(guide).returning();
    return newGuide;
  }

  async updateAftercareGuide(id: number, guide: Partial<InsertAftercareGuide>): Promise<AftercareGuide | undefined> {
    const [updatedGuide] = await db.update(aftercareGuides)
      .set({ ...guide, updatedAt: new Date() })
      .where(eq(aftercareGuides.id, id))
      .returning();
    return updatedGuide;
  }

  async deleteAftercareGuide(id: number): Promise<boolean> {
    await db.delete(aftercareGuides).where(eq(aftercareGuides.id, id));
    return true;
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
    const [session] = await db.select()
      .from(chatSessions)
      .where(eq(chatSessions.visitorId, visitorId))
      .where(eq(chatSessions.isArchived, false));
    return session;
  }

  async getActiveChatSessions(): Promise<ChatSession[]> {
    return await db.select()
      .from(chatSessions)
      .where(eq(chatSessions.isArchived, false))
      .orderBy(desc(chatSessions.lastMessageAt));
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const [newSession] = await db.insert(chatSessions).values({
      ...session,
      hasUnreadMessages: false,
      isArchived: false,
      lastMessageAt: new Date()
    }).returning();
    return newSession;
  }

  async updateChatSession(id: number, session: Partial<InsertChatSession>): Promise<ChatSession | undefined> {
    const [updatedSession] = await db.update(chatSessions)
      .set(session)
      .where(eq(chatSessions.id, id))
      .returning();
    return updatedSession;
  }

  async archiveChatSession(id: number): Promise<ChatSession | undefined> {
    const [updatedSession] = await db.update(chatSessions)
      .set({ isArchived: true })
      .where(eq(chatSessions.id, id))
      .returning();
    return updatedSession;
  }

  async markChatSessionAsRead(id: number): Promise<ChatSession | undefined> {
    const [updatedSession] = await db.update(chatSessions)
      .set({ hasUnreadMessages: false })
      .where(eq(chatSessions.id, id))
      .returning();
    return updatedSession;
  }

  async deleteChatSession(id: number): Promise<boolean> {
    // First delete all messages in this session
    await db.delete(chatMessages).where(eq(chatMessages.sessionId, id));
    
    // Then delete the session
    await db.delete(chatSessions).where(eq(chatSessions.id, id));
    return true;
  }

  // Chat Message operations
  async getChatMessages(sessionId: number): Promise<ChatMessage[]> {
    return await db.select()
      .from(chatMessages)
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
      timestamp: new Date()
    }).returning();

    // Update the session's lastMessageAt and unread status
    if (message.sessionId) {
      await db.update(chatSessions)
        .set({
          lastMessageAt: new Date(),
          hasUnreadMessages: message.senderType === 'visitor' // Only mark as unread if from visitor
        })
        .where(eq(chatSessions.id, message.sessionId));
    }

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
    const [operator] = await db.select()
      .from(chatOperators)
      .where(eq(chatOperators.userId, userId));
    return operator;
  }

  async getAvailableChatOperators(): Promise<ChatOperator[]> {
    return await db.select()
      .from(chatOperators)
      .where(eq(chatOperators.isAvailable, true));
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

  // Patient operations
  async getPatients(): Promise<Patient[]> {
    return await db.select().from(patients).orderBy(desc(patients.createdAt));
  }

  async getPatientById(id: number): Promise<Patient | undefined> {
    const [patient] = await db.select().from(patients).where(eq(patients.id, id));
    return patient;
  }
  
  async getPatientByPhone(phone: string): Promise<Patient | undefined> {
    const [patient] = await db.select().from(patients).where(eq(patients.phone, phone));
    return patient;
  }

  async createPatient(data: InsertPatient): Promise<Patient> {
    const [patient] = await db.insert(patients).values(data).returning();
    return patient;
  }

  async updatePatient(id: number, data: Partial<InsertPatient>): Promise<Patient | undefined> {
    const [patient] = await db.update(patients)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(patients.id, id))
      .returning();
    return patient;
  }

  async deletePatient(id: number): Promise<Patient | undefined> {
    // İlgili hasta dokümanlarını ve tedavi kayıtlarını da silmek için
    await db.delete(patientDocuments).where(eq(patientDocuments.patientId, id));
    await db.delete(treatmentRecords).where(eq(treatmentRecords.patientId, id));
    
    // Hastayı sil
    const [patient] = await db.delete(patients)
      .where(eq(patients.id, id))
      .returning();
    return patient;
  }

  // Patient Document operations
  async getPatientDocuments(patientId: number): Promise<PatientDocument[]> {
    const documents = await db.select().from(patientDocuments)
      .where(eq(patientDocuments.patientId, patientId))
      .orderBy(desc(patientDocuments.uploadDate));
    return documents;
  }

  async getDocumentById(id: number): Promise<PatientDocument | undefined> {
    const [document] = await db.select().from(patientDocuments)
      .where(eq(patientDocuments.id, id));
    return document;
  }

  async createPatientDocument(data: InsertPatientDocument): Promise<PatientDocument> {
    const [document] = await db.insert(patientDocuments).values(data).returning();
    return document;
  }

  async updatePatientDocument(id: number, data: Partial<InsertPatientDocument>): Promise<PatientDocument | undefined> {
    const [document] = await db.update(patientDocuments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(patientDocuments.id, id))
      .returning();
    return document;
  }

  async deletePatientDocument(id: number): Promise<PatientDocument | undefined> {
    const [document] = await db.delete(patientDocuments)
      .where(eq(patientDocuments.id, id))
      .returning();
    return document;
  }

  // Treatment Record operations
  async getTreatmentRecords(patientId: number): Promise<TreatmentRecord[]> {
    const records = await db.select().from(treatmentRecords)
      .where(eq(treatmentRecords.patientId, patientId))
      .orderBy(desc(treatmentRecords.treatmentDate));
    return records;
  }

  async getTreatmentRecordById(id: number): Promise<TreatmentRecord | undefined> {
    const [record] = await db.select().from(treatmentRecords)
      .where(eq(treatmentRecords.id, id));
    return record;
  }

  async createTreatmentRecord(data: InsertTreatmentRecord): Promise<TreatmentRecord> {
    const [record] = await db.insert(treatmentRecords).values(data).returning();
    return record;
  }

  async updateTreatmentRecord(id: number, data: Partial<InsertTreatmentRecord>): Promise<TreatmentRecord | undefined> {
    const [record] = await db.update(treatmentRecords)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(treatmentRecords.id, id))
      .returning();
    return record;
  }

  async deleteTreatmentRecord(id: number): Promise<TreatmentRecord | undefined> {
    const [record] = await db.delete(treatmentRecords)
      .where(eq(treatmentRecords.id, id))
      .returning();
    return record;
  }
}

// Use database storage
export const storage = new DatabaseStorage();