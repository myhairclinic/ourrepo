import { Language } from "@shared/types";

// SEO yardımcı fonksiyonları

// Sayfa başlığını dil bazlı olarak oluşturma
export function generatePageTitle(title: string, siteName: string = "MyHair Clinic"): string {
  return `${title} | ${siteName}`;
}

// Schema.org için JSON-LD
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "MyHair Clinic",
    "alternateName": "MyHair Tbilisi",
    "url": "https://myhairclinic.com",
    "logo": "https://myhairclinic.com/images/logo.png",
    "description": "Tbilisi'de lider saç ekimi ve estetik merkezi. En son teknolojiler ve uzman kadromuzla hizmetinizdeyiz.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tsotne Dadiani 59",
      "addressLocality": "Tbilisi",
      "addressCountry": "Georgia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.715137",
      "longitude": "44.827095"
    },
    "telephone": "+995555003044",
    "email": "myhairtbilisi@gmail.com",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/myhairtbilisi",
      "https://www.facebook.com/myhairtbilisi",
      "https://tiktok.com/@myhairtbilisi"
    ]
  };
}

// Blog yazıları için Article şeması
export function generateArticleSchema(
  title: string, 
  description: string,
  url: string,
  imageUrl: string,
  publishDate: string,
  modifiedDate?: string,
  authorName: string = "MyHair Clinic"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "MyHair Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://myhairclinic.com/images/logo.png"
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

// Hizmet sayfaları için MedicalProcedure şeması
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  imageUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": name,
    "description": description,
    "url": url,
    "image": imageUrl,
    "procedureType": "Hair Transplantation",
    "howPerformed": "Using FUE and DHI techniques for natural-looking results",
    "followup": "Free follow-up and consultancy service for 1 year after the procedure",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "MyHair Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tsotne Dadiani 59",
        "addressLocality": "Tbilisi",
        "addressCountry": "Georgia"
      }
    }
  };
}

// SSS'ler için FAQPage şeması
export function generateFAQSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Ortak anahtar kelimeler
export function generateBaseKeywords(language: Language) {
  const keywordsByLanguage = {
    [Language.Turkish]: "saç ekimi, saç ekimi klinik, saç ekimi Tiflis, FUE saç ekimi, DHI saç ekimi, sakal ekimi, kaş ekimi, PRP tedavisi, saç mezoterapisi, saç dökülmesi tedavisi",
    [Language.English]: "hair transplant, hair transplant clinic, hair transplant Tbilisi, FUE hair transplant, DHI hair transplant, beard transplant, eyebrow transplant, PRP treatment, hair mesotherapy, hair loss treatment",
    [Language.Russian]: "трансплантация волос, клиника трансплантации волос, трансплантация волос Тбилиси, FUE трансплантация волос, DHI трансплантация волос, трансплантация бороды, трансплантация бровей, PRP терапия, мезотерапия волос, лечение выпадения волос",
    [Language.Georgian]: "თმის გადანერგვა, თმის გადანერგვის კლინიკა, თმის გადანერგვა თბილისში, FUE თმის გადანერგვა, DHI თმის გადანერგვა, წვერის გადანერგვა, წარბების გადანერგვა, PRP მკურნალობა, თმის მეზოთერაპია, თმის ცვენის მკურნალობა"
  };
  
  return keywordsByLanguage[language] || keywordsByLanguage[Language.English];
}

// SEO meta etiket bilgilerini dinamik olarak oluşturma
export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  imageUrl?: string;
  pageType?: "website" | "article" | "product" | "service";
  keywords?: string;
  schema?: any;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  noIndex?: boolean;
}

// Meta etiketlerini document.head'e ekleme
export function injectMetaTags(tags: Record<string, string>): void {
  Object.entries(tags).forEach(([name, content]) => {
    // Önceki meta etiketini kaldır (varsa)
    const existingTag = document.querySelector(`meta[name="${name}"]`) || 
                         document.querySelector(`meta[property="${name}"]`);
    if (existingTag) {
      existingTag.remove();
    }
    
    // Yeni meta etiketi oluştur
    const meta = document.createElement('meta');
    if (name.startsWith('og:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  });
}

// Canonical URL ekleme
export function setCanonicalUrl(url: string): void {
  // Önceki canonical linki kaldır (varsa)
  const existingLink = document.querySelector('link[rel="canonical"]');
  if (existingLink) {
    existingLink.remove();
  }
  
  // Yeni canonical link oluştur
  const link = document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', url);
  document.head.appendChild(link);
}

// Hreflang linkleri ekleme
export function setHreflangLinks(baseUrl: string, path: string): void {
  // Önceki hreflang linklerini kaldır
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  
  // Dil-özel URL'leri oluştur
  const languages = ['tr', 'en', 'ru', 'ka'];
  const basePathWithoutLang = path.replace(/^\/(tr|en|ru|ka)/, '');
  
  // Her dil için link ekleme
  languages.forEach(lang => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    link.setAttribute('href', `${baseUrl}/${lang}${basePathWithoutLang}`);
    document.head.appendChild(link);
  });
  
  // x-default hreflang (varsayılan olarak EN)
  const defaultLink = document.createElement('link');
  defaultLink.setAttribute('rel', 'alternate');
  defaultLink.setAttribute('hreflang', 'x-default');
  defaultLink.setAttribute('href', `${baseUrl}/en${basePathWithoutLang}`);
  document.head.appendChild(defaultLink);
}

// JSON-LD şema ekleme
export function addJsonLdSchema(schema: any): void {
  // Önceki şemayı kaldır (varsa)
  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  // Yeni şema ekleme
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Sayfa başlığını güncelleme
export function updatePageTitle(title: string): void {
  document.title = title;
}

// Tüm SEO etiketlerini tek bir fonksiyonla güncelleme
export function updateAllSEOTags(config: SEOProps, language: Language, currentPath: string): void {
  const baseUrl = "https://myhairclinic.com"; // Üretim ortamında gerçek URL
  const canonicalUrl = config.canonical || `${baseUrl}${currentPath}`;
  const fullImageUrl = config.imageUrl?.startsWith('http') 
    ? config.imageUrl 
    : `${baseUrl}${config.imageUrl || '/images/logo.png'}`;
  
  // Sayfa başlığı
  updatePageTitle(generatePageTitle(config.title));
  
  // Canonical ve Hreflang
  setCanonicalUrl(canonicalUrl);
  setHreflangLinks(baseUrl, currentPath);
  
  // Temel meta etiketleri
  const metaTags: Record<string, string> = {
    'description': config.description,
    'keywords': config.keywords || generateBaseKeywords(language),
    'robots': config.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    
    // Open Graph etiketleri
    'og:title': config.title,
    'og:description': config.description,
    'og:url': canonicalUrl,
    'og:type': config.pageType || 'website',
    'og:image': fullImageUrl,
    'og:site_name': 'MyHair Clinic',
    'og:locale': language.toLowerCase(),
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': fullImageUrl
  };
  
  // Meta etiketlerini enjekte et
  injectMetaTags(metaTags);
  
  // Şemayı belirleme ve ekleme
  let schema = config.schema;
  if (!schema) {
    if (config.pageType === 'article' && config.publishDate) {
      schema = generateArticleSchema(
        config.title,
        config.description,
        canonicalUrl,
        fullImageUrl,
        config.publishDate,
        config.modifiedDate,
        config.author
      );
    } else if (config.pageType === 'service') {
      schema = generateServiceSchema(
        config.title,
        config.description,
        canonicalUrl,
        fullImageUrl
      );
    } else {
      schema = generateOrganizationSchema();
    }
  }
  
  // Schema.org JSON-LD ekle
  addJsonLdSchema(schema);
}