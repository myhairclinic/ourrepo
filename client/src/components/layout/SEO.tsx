import { Helmet } from "react-helmet";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { Language } from "@shared/types";
import { 
  generateOrganizationSchema, 
  generateBaseKeywords,
  generateArticleSchema,
  generateServiceSchema,
  generateFAQSchema
} from "@/lib/seo";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  noIndex?: boolean;
  schema?: Record<string, any>;
  canonicalPath?: string;
  pageType?: "website" | "article" | "service" | "product";
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  additionalMetaTags?: Record<string, string>;
  faqs?: Array<{question: string; answer: string}>;
}

export default function SEO({
  title,
  description,
  keywords,
  imageUrl = "/images/logo.png",
  noIndex = false,
  schema,
  canonicalPath,
  pageType = "website",
  publishDate,
  modifiedDate,
  author,
  additionalMetaTags,
  faqs
}: SEOProps) {
  const { language } = useLanguage();
  const [location] = useLocation();
  
  // Base URL ve canonical URL oluşturma
  const baseUrl = "https://myhairclinic.com"; // Üretim ortamında gerçek domain
  const canonicalUrl = canonicalPath 
    ? `${baseUrl}${canonicalPath}` 
    : `${baseUrl}${location}`;
  
  // Görsel URL'sini tam URL'e çevirme
  const fullImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `${baseUrl}${imageUrl}`;
  
  // Anahtar kelimeler
  const keywordsContent = keywords || generateBaseKeywords(language);
  
  // Diller için alternatif URL'ler
  const currentPath = canonicalPath || location;
  const pathWithoutLang = currentPath.replace(/^\/(tr|en|ru|ka)/, '');
  
  const hreflangUrls = {
    tr: `${baseUrl}/tr${pathWithoutLang}`,
    en: `${baseUrl}/en${pathWithoutLang}`,
    ru: `${baseUrl}/ru${pathWithoutLang}`,
    ka: `${baseUrl}/ka${pathWithoutLang}`
  };
  
  // Şemayı belirleme
  let jsonLdSchema = schema;
  if (!jsonLdSchema) {
    if (pageType === "article" && publishDate) {
      jsonLdSchema = generateArticleSchema(
        title,
        description,
        canonicalUrl,
        fullImageUrl,
        publishDate,
        modifiedDate,
        author
      );
    } else if (pageType === "service") {
      jsonLdSchema = generateServiceSchema(
        title,
        description,
        canonicalUrl,
        fullImageUrl
      );
    } else if (faqs && faqs.length > 0) {
      jsonLdSchema = generateFAQSchema(faqs);
    } else {
      jsonLdSchema = generateOrganizationSchema();
    }
  }

  return (
    <Helmet>
      <title>{title} | MyHair Clinic</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsContent} />
      
      {/* Canonical ve Hreflang etiketleri */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="tr" href={hreflangUrls.tr} />
      <link rel="alternate" hrefLang="en" href={hreflangUrls.en} />
      <link rel="alternate" hrefLang="ru" href={hreflangUrls.ru} />
      <link rel="alternate" hrefLang="ka" href={hreflangUrls.ka} />
      <link rel="alternate" hrefLang="x-default" href={hreflangUrls.en} />
      
      {/* Open Graph Meta Etiketleri */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="MyHair Clinic" />
      <meta property="og:locale" content={language.toLowerCase()} />
      
      {/* Twitter Kartı Etiketleri */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Arama Motoru Direktifleri */}
      <meta 
        name="robots" 
        content={noIndex 
          ? "noindex, nofollow" 
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        } 
      />
      
      {/* Ek meta etiketleri */}
      {additionalMetaTags && Object.entries(additionalMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Yapılandırılmış Veri (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSchema)}
      </script>
    </Helmet>
  );
}