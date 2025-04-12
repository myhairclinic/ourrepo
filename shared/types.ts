// Language codes
export enum Language {
  Turkish = "tr",
  English = "en",
  Russian = "ru",
  Georgian = "ka",
  Azerbaijani = "az",
  Persian = "ir",
  Kazakh = "kz",
  Ukrainian = "ua"
}

// Service types
export interface ServiceSummary {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Gallery item types
export enum GalleryType {
  BeforeAfter = "before-after",
  Clinic = "clinic",
  Video = "video"
}

// Blog post categories
export enum BlogCategory {
  HairTransplant = "hair-transplant",
  EyebrowTransplant = "eyebrow-transplant",
  BeardTransplant = "beard-transplant",
  PRP = "prp",
  Travel = "travel",
  Clinic = "clinic"
}

// Appointment status types
export enum AppointmentStatus {
  New = "new",
  Confirmed = "confirmed",
  Completed = "completed",
  Cancelled = "cancelled"
}

// Admin role types
export enum UserRole {
  Admin = "admin",
  Editor = "editor"
}

// Meta data for pages
export interface MetaData {
  title: string;
  description: string;
}

// Language-specific content
export interface MultiLangContent {
  tr: string;
  en: string;
  ru: string;
  ka: string;
  az: string;
  ir: string;
  kz: string;
  ua: string;
}

export interface MultiLangText {
  tr: string;
  en: string;
  ru: string;
  ka: string;
  az: string;
  ir: string;
  kz: string;
  ua: string;
}

// Hero slider item
export interface HeroSlide {
  id: number;
  imageUrl: string;
  title: MultiLangText;
  subtitle: MultiLangText;
  ctaText: MultiLangText;
  ctaLink: string;
}

// Testimonial item
export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  imageUrl?: string;
  videoUrl?: string;
}

// Before/After item
export interface BeforeAfterItem {
  id: number;
  serviceSlug?: string;
  serviceName?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  description?: string;
  timeFrame?: string;
}

// Blog post summary
export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  date: string;
}

// Blog post (full)
export interface Blog {
  id: number;
  slug: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  contentTR: string;
  contentEN: string;
  contentRU: string;
  contentKA: string;
  categoryTR: string;
  categoryEN: string;
  categoryRU: string;
  categoryKA: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  isPublished: boolean;
}

// Navigation item
export interface NavItem {
  label: string;
  href: string;
  isDropdown?: boolean;
  dropdownItems?: {
    label: string;
    href: string;
  }[];
}
