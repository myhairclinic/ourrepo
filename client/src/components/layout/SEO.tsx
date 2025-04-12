import { Helmet } from "react-helmet";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  noIndex?: boolean;
  schema?: Record<string, any>;
  canonicalPath?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  imageUrl = "/images/logo.png",
  noIndex = false,
  schema,
  canonicalPath,
}: SEOProps) {
  const { language } = useLanguage();
  const [pathname] = useLocation();
  
  // Base URL - üretim ortamına göre güncellenebilir
  const baseUrl = "https://myhairclinic.com";
  
  // Tam URL oluşturma
  const fullUrl = canonicalPath 
    ? `${baseUrl}${canonicalPath}` 
    : `${baseUrl}${pathname}`;
  
  // Tam görsel URL'i
  const fullImageUrl = imageUrl.startsWith("http") 
    ? imageUrl 
    : `${baseUrl}${imageUrl}`;
    
  // Alternatif diller için hreflang URL'leri
  const hreflangUrls = {
    tr: `${baseUrl}/tr${canonicalPath?.replace(/^\/(tr|en|ru|ka)/, '') || pathname.replace(/^\/(tr|en|ru|ka)/, '')}`,
    en: `${baseUrl}/en${canonicalPath?.replace(/^\/(tr|en|ru|ka)/, '') || pathname.replace(/^\/(tr|en|ru|ka)/, '')}`,
    ru: `${baseUrl}/ru${canonicalPath?.replace(/^\/(tr|en|ru|ka)/, '') || pathname.replace(/^\/(tr|en|ru|ka)/, '')}`,
    ka: `${baseUrl}/ka${canonicalPath?.replace(/^\/(tr|en|ru|ka)/, '') || pathname.replace(/^\/(tr|en|ru|ka)/, '')}`,
  };
  
  // JSON-LD Şema oluşturma
  const generateSchemaMarkup = () => {
    if (schema) {
      return JSON.stringify(schema);
    }
    
    // Varsayılan olarak Organization şeması
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "MyHair Clinic",
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.png`,
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tsotne Dadiani 59",
        "addressLocality": "Tbilisi",
        "addressCountry": "Georgia"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+995555003044",
        "email": "myhairtbilisi@gmail.com",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.instagram.com/myhairtbilisi",
        "https://www.facebook.com/myhairtbilisi"
      ]
    };
    
    return JSON.stringify(defaultSchema);
  };
  
  return (
    <Helmet>
      {/* Temel Meta Etiketleri */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Alternatif Diller (hreflang) */}
      <link rel="alternate" hreflang="tr" href={hreflangUrls.tr} />
      <link rel="alternate" hreflang="en" href={hreflangUrls.en} />
      <link rel="alternate" hreflang="ru" href={hreflangUrls.ru} />
      <link rel="alternate" hreflang="ka" href={hreflangUrls.ka} />
      <link rel="alternate" hreflang="x-default" href={hreflangUrls.en} />
      
      {/* Sosyal Medya Meta Etiketleri - Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MyHair Clinic" />
      <meta property="og:locale" content={language.toLowerCase()} />
      
      {/* Twitter Kartı */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Mobil Cihazlar İçin */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Arama Motorları İçin Ek Direktifler */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Yapılandırılmış Veri (JSON-LD) */}
      <script type="application/ld+json">{generateSchemaMarkup()}</script>
    </Helmet>
  );
}