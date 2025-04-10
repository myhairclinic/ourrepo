import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { META } from "@/lib/constants";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Language } from "@shared/types";
import { Product } from "@shared/schema";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// Ürün detay sayfası
export default function ProductPage() {
  const { productSlug, lang } = useParams();
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  
  // Dil değişikliğinde URL'yi güncelle
  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);
  
  // Ürün verilerini getir
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productSlug}`],
    enabled: !!productSlug,
  });
  
  // Sayfa başlığını oluştur
  // Dil koduna göre alanları oluşturma (Türkçe için TR, İngilizce için EN, vb.)
  const langCode = language.toUpperCase();
  const nameKey = `name${langCode}` as keyof Product;
  const descriptionKey = `description${langCode}` as keyof Product;
  const usageKey = `usage${langCode}` as keyof Product;
  const ingredientsKey = `ingredients${langCode}` as keyof Product;
  
  // Sayfa başlığını oluştur
  const pageTitle = product 
    ? `${product[nameKey]} ${META.TITLE_SUFFIX}` 
    : `${t("products.title")} ${META.TITLE_SUFFIX}`;

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={t("products.description")} />
        </Helmet>
        
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error.somethingWentWrong")}</AlertTitle>
          <AlertDescription>{t("errors.loading_product")}</AlertDescription>
        </Alert>
        
        <Button variant="outline" asChild>
          <Link href={addPrefix("/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("products.backToProducts")}
          </Link>
        </Button>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        
        <div className="flex mb-6">
          <Button variant="outline" asChild className="mr-4">
            <Link href={addPrefix("/products")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("products.backToProducts")}
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="w-full h-80 rounded-lg" />
          </div>
          <div>
            <Skeleton className="w-3/4 h-10 mb-4" />
            <Skeleton className="w-1/4 h-6 mb-6" />
            <Skeleton className="w-full h-32 mb-6" />
            <div className="flex flex-wrap gap-4 mb-6">
              <Skeleton className="w-32 h-10" />
              <Skeleton className="w-32 h-10" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={t("products.description")} />
        </Helmet>
        
        <Alert className="mb-6">
          <AlertTitle>{t("error.somethingWentWrong")}</AlertTitle>
          <AlertDescription>{t("products.noProducts")}</AlertDescription>
        </Alert>
        
        <Button variant="outline" asChild>
          <Link href={addPrefix("/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("products.backToProducts")}
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={String(product[descriptionKey])} />
      </Helmet>
      
      <div className="flex mb-6">
        <Button variant="outline" asChild className="mr-4">
          <Link href={addPrefix("/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("products.backToProducts")}
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün Resmi */}
        <div>
          <img 
            src={product.imageUrl} 
            alt={String(product[nameKey])} 
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        
        {/* Ürün Bilgileri */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{String(product[nameKey])}</h1>
          <p className="text-lg font-semibold text-primary mb-6">
            {`${t("products.productCode")}: ${product.slug}`}
          </p>
          
          <p className="text-gray-700 mb-6">{String(product[descriptionKey])}</p>
          
          <Tabs defaultValue="ingredients" className="mb-8">
            <TabsList>
              <TabsTrigger value="ingredients">{t("products.ingredients")}</TabsTrigger>
              <TabsTrigger value="usage">{t("products.usage")}</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="mt-4">
              <div className="text-gray-700">{String(product[ingredientsKey])}</div>
            </TabsContent>
            <TabsContent value="usage" className="mt-4">
              <div className="text-gray-700">{String(product[usageKey])}</div>
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button asChild>
              <a href="#inquiry-section">
                {t("common.moreInfo")}
              </a>
            </Button>
            <WhatsAppButton text={t("common.buyNow")} fixed={false} />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span>{t("products.infoPoint1")}</span>
            </div>
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span>{t("products.infoPoint2")}</span>
            </div>
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span>{t("products.infoPoint3")}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bilgi Alma Bölümü */}
      <div id="inquiry-section" className="mt-16 p-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{t("products.inquireProduct")}</h2>
        <p className="text-gray-700 mb-6">{t("products.inquireText")}</p>
        
        <div className="flex flex-wrap gap-4">
          <WhatsAppButton text={t("common.contactViaWhatsApp")} fixed={false} />
          <Button variant="outline">
            {t("common.askViaSms")}
          </Button>
        </div>
      </div>
    </div>
  );
}