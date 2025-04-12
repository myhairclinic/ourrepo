import { Helmet } from "react-helmet";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { API_ROUTES, META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";
import { Language } from "@shared/types";
import { Product } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Sparkles, Shield, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  
  // Type safe language handling
  const lang = language as Language;
  
  // Vithair ürünlerini API'den çek
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [API_ROUTES.PRODUCTS],
  });
  
  return (
    <>
      <Helmet>
        <title>{t('products.title') + " - " + META.SITE_NAME}</title>
        <meta name="description" content={t('products.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/products")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/products"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/products"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/products"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/products"} />
      </Helmet>
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('products.title')}
            description={t('products.description')}
            center
          />
          
          {/* Vithair Products Grid */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary">
                <span className="border-b-4 border-primary pb-2">
                  {t('products.careProducts')}
                </span>
              </h2>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center p-8 bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-500">{t('errors.failedToLoadProducts')}</p>
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-primary/5">
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={product.imageUrl} 
                        alt={language === 'tr' ? product.nameTR : 
                             language === 'en' ? product.nameEN : 
                             language === 'ru' ? product.nameRU : 
                             product.nameKA} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90">
                          {t('products.new')}
                        </Badge>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-end">
                        <Badge variant="outline" className="bg-white/90 text-primary border-primary/20 backdrop-blur-sm">
                          <Star size={12} className="mr-1" /> Vithair Professional
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="p-5 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold text-primary">
                          {language === 'tr' ? product.nameTR : 
                           language === 'en' ? product.nameEN : 
                           language === 'ru' ? product.nameRU : 
                           product.nameKA}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-2 text-sm">
                        {language === 'tr' ? product.descriptionTR : 
                         language === 'en' ? product.descriptionEN : 
                         language === 'ru' ? product.descriptionRU : 
                         product.descriptionKA}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-5 pt-3">
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase font-medium text-muted-foreground">
                            {t('products.keyFeatures')}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Shield size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{t('products.serviceFeature1')}</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{t('products.serviceFeature2')}</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{t('products.serviceFeature3')}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-5 pt-2 flex justify-end items-center">
                      <Link href={addPrefix(`/products/${product.slug}`)}>
                        <Button className="gap-1">
                          {t('common.moreInfo')}
                          <ArrowRight size={14} />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-500">{t('products.noProductsAvailable')}</p>
              </div>
            )}
          </div>
          
          {/* Products Info Section */}
          <section className="mt-20 max-w-4xl mx-auto">
            <div className="bg-primary/5 rounded-lg p-8 border border-primary/10">
              <h2 className="font-heading text-2xl font-bold text-primary mb-4 text-center">
                {t('products.infoTitle')}
              </h2>
              <div className="prose prose-lg mx-auto">
                <p>{t('products.infoText1')}</p>
                <p>{t('products.infoText2')}</p>
                <ul>
                  <li>{t('products.infoPoint1')}</li>
                  <li>{t('products.infoPoint2')}</li>
                  <li>{t('products.infoPoint3')}</li>
                </ul>
              </div>
              <div className="mt-6 text-center">
                <Link 
                  href={addPrefix('/contact')}
                  className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200"
                >
                  {t('common.contactUs')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
