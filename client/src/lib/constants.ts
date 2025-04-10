// Web sitesinde kullanılan tüm sabit değerler burada tanımlanır

// Public routes
export const PUBLIC_PATHS = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE_DETAIL: "/services/:slug",
  GALLERY: "/gallery",
  PACKAGES: "/packages",
  PRODUCTS: "/products",
  BLOG: "/blog",
  BLOG_POST: "/blog/:slug",
  ABOUT: "/about",
  CONTACT: "/contact",
  APPOINTMENT: "/appointment",
  PRIVACY: "/privacy",
  TERMS: "/terms",
};

// Admin routes
export const ADMIN_PATHS = {
  LOGIN: "/admin/login",
  DASHBOARD: "/admin/dashboard",
  SERVICES: "/admin/services",
  BLOG: "/admin/blog",
  GALLERY: "/admin/gallery",
  APPOINTMENTS: "/admin/appointments",
  PRODUCTS: "/admin/products",
  PACKAGES: "/admin/packages",
  MESSAGES: "/admin/messages",
  SETTINGS: "/admin/settings",
  TESTIMONIALS: "/admin/testimonials",
};

// Galeri türleri
export const GALLERY_TYPES = {
  BEFORE_AFTER: "before-after",
  CLINIC: "clinic",
  VIDEO: "video",
};

// İletişim bilgileri
export const CONTACT = {
  ADDRESS: "123 Tbilisi Avenue, Tbilisi, Georgia",
  PHONE: "+995 555 123 456",
  EMAIL: "info@myhair-clinic.com",
  WHATSAPP: "+995 555 123 456",
  WORKING_HOURS: "Monday - Saturday: 09:00 - 18:00",
};

// Sosyal medya bağlantıları
export const SOCIAL = {
  FACEBOOK: "https://facebook.com/myhair-clinic",
  INSTAGRAM: "https://instagram.com/myhair-clinic",
  YOUTUBE: "https://youtube.com/myhair-clinic",
  TIKTOK: "https://tiktok.com/@myhair-clinic",
};

// SEO meta bilgileri
export const META = {
  TITLE: {
    tr: "MyHair Clinic | Saç Ekimi ve Estetik Merkezi",
    en: "MyHair Clinic | Hair Transplant and Aesthetic Center",
    ru: "MyHair Clinic | Центр трансплантации волос и эстетики",
    ka: "MyHair Clinic | თმის გადანერგვის და ესთეტიკის ცენტრი",
  },
  DESCRIPTION: {
    tr: "Tiflis'in lider saç ekimi ve estetik merkezi. FUE ve DHI tekniklerini kullanarak en iyi sonuçları elde ediyoruz. Doğal görünüm garantisi.",
    en: "Leading hair transplant and aesthetic center in Tbilisi. We use FUE and DHI techniques to achieve the best results. Natural appearance guaranteed.",
    ru: "Ведущий центр трансплантации волос и эстетики в Тбилиси. Мы используем методы FUE и DHI для достижения наилучших результатов. Гарантия естественного вида.",
    ka: "წამყვანი თმის გადანერგვისა და ესთეტიკის ცენტრი თბილისში. ჩვენ ვიყენებთ FUE და DHI ტექნიკას საუკეთესო შედეგების მისაღწევად. ბუნებრივი გარეგნობის გარანტია.",
  },
};