export const ADMIN_PATHS = {
  LOGIN: "/admin/login",
  DASHBOARD: "/admin/dashboard",
  SERVICES: "/admin/services",
  BLOG: "/admin/blog",
  GALLERY: "/admin/gallery",
  APPOINTMENTS: "/admin/appointments",
  PRODUCTS: "/admin/products",
  PACKAGES: "/admin/packages",
  SETTINGS: "/admin/settings",
};

export const PUBLIC_PATHS = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE_DETAILS: (slug: string) => `/services/${slug}`,
  GALLERY: "/gallery",
  PACKAGES: "/packages",
  PRODUCTS: "/products",
  BLOG: "/blog",
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  ABOUT: "/about",
  CONTACT: "/contact",
  APPOINTMENT: "/appointment",
};

export const WHATSAPP_NUMBER = "+995512345678"; // Örnek numara, gerçek numarayla değiştirilmeli
export const CLINIC_EMAIL = "info@myhair-clinic.com";
export const CLINIC_PHONE = "+995512345678"; // Örnek numara, gerçek numarayla değiştirilmeli
export const CLINIC_ADDRESS = "Tbilisi, Georgia";

export const SOCIAL_MEDIA = {
  INSTAGRAM: "https://instagram.com/myhair_clinic",
  FACEBOOK: "https://facebook.com/myhair_clinic",
  YOUTUBE: "https://youtube.com/myhair_clinic",
  TIKTOK: "https://tiktok.com/@myhair_clinic",
};

export const META_DEFAULTS = {
  TITLE: "MyHair Clinic - Hair Transplant and Aesthetic Treatments in Tbilisi",
  DESCRIPTION: "Professional hair transplant and aesthetic treatments at MyHair Clinic in Tbilisi, Georgia. Internationally recognized, multilingual staff, and affordable packages.",
  KEYWORDS: "hair transplant, hair clinic, hair loss treatment, hair restoration, Tbilisi, Georgia, aesthetic treatments",
};

// For page-specific meta tags
export const META = {
  HOME: {
    TITLE: "MyHair Clinic - Professional Hair Transplant in Tbilisi, Georgia",
    DESCRIPTION: "MyHair Clinic offers high-quality hair transplants and aesthetic treatments in Tbilisi, Georgia with experienced doctors and affordable packages.",
  },
  SERVICES: {
    TITLE: "Hair Transplant Services - MyHair Clinic Tbilisi",
    DESCRIPTION: "Discover our comprehensive hair transplant services including FUE, DHI, beard transplant, and eyebrow transplant at MyHair Clinic Tbilisi.",
  },
  GALLERY: {
    TITLE: "Before & After Gallery - MyHair Clinic Tbilisi",
    DESCRIPTION: "View our before and after gallery showcasing successful hair transplant results at MyHair Clinic Tbilisi, Georgia.",
  },
  PACKAGES: {
    TITLE: "International Hair Transplant Packages - MyHair Clinic",
    DESCRIPTION: "All-inclusive hair transplant packages with accommodation, transfers, and treatments at MyHair Clinic Tbilisi.",
  },
  PRODUCTS: {
    TITLE: "Hair Care Products - MyHair Clinic Tbilisi",
    DESCRIPTION: "Professional hair care products recommended by MyHair Clinic experts for optimal results after hair transplant procedures.",
  },
  BLOG: {
    TITLE: "Hair Transplant Blog - News & Tips | MyHair Clinic",
    DESCRIPTION: "Latest news, tips, and information about hair loss treatments, hair transplant procedures, and post-operative care by MyHair Clinic experts.",
  },
  ABOUT: {
    TITLE: "About MyHair Clinic - Our Doctors & Facility in Tbilisi",
    DESCRIPTION: "Learn about MyHair Clinic in Tbilisi, our experienced doctors, state-of-the-art facilities, and commitment to excellence in hair transplantation.",
  },
  CONTACT: {
    TITLE: "Contact MyHair Clinic Tbilisi - Get Free Consultation",
    DESCRIPTION: "Contact MyHair Clinic in Tbilisi, Georgia for a free consultation. Book your appointment online or reach us via phone, WhatsApp, or email.",
  },
  APPOINTMENT: {
    TITLE: "Book Your Hair Transplant Consultation - MyHair Clinic",
    DESCRIPTION: "Schedule your free consultation for hair transplant treatment at MyHair Clinic Tbilisi. Easy online booking available.",
  },
};

// For gallery page filters
export const GALLERY_TYPES = [
  { id: "before-after", label: "Before & After" },
  { id: "clinic", label: "Our Clinic" },
  { id: "video", label: "Videos" },
];