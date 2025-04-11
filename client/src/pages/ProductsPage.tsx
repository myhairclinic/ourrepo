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
import { ArrowRight, CheckCircle, Clock, Sparkles, Star, Thermometer } from "lucide-react";

export default function ProductsPage() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: [API_ROUTES.PRODUCTS],
  });

  // Fetch services as products
  const { data: services = [], isLoading: isLoadingServices } = useQuery({
    queryKey: [API_ROUTES.SERVICES],
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
          
          {/* Featured Services as Products */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary">
                <span className="border-b-4 border-primary pb-2">
                  {t('products.featuredServices')}
                </span>
              </h2>
              <Link href={addPrefix('/services')}>
                <Button variant="outline" className="gap-2">
                  {t('common.viewAll')}
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            {isLoadingServices ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any) => (
                  <Card key={service.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={service.imageUrl} 
                        alt={service[`title${language}`]} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold line-clamp-2">
                          {service[`title${language}`]}
                        </h3>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.id === 1 && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            <Clock size={14} className="mr-1" />
                            6-8 {t('common.hours')}
                          </Badge>
                        )}
                        {service.id === 2 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                            <Clock size={14} className="mr-1" />
                            2-3 {t('common.hours')}
                          </Badge>
                        )}
                        {service.id === 3 && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            <Clock size={14} className="mr-1" />
                            3-5 {t('common.hours')}
                          </Badge>
                        )}
                        {service.id === 4 && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                            <Clock size={14} className="mr-1" />
                            30-45 {t('common.minutes')}
                          </Badge>
                        )}
                        {service.id === 5 && (
                          <Badge variant="secondary" className="bg-rose-100 text-rose-800 hover:bg-rose-200">
                            <Clock size={14} className="mr-1" />
                            30-45 {t('common.minutes')}
                          </Badge>
                        )}
                        
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                          <Star size={14} className="mr-1" />
                          {t('products.premium')}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {service[`description${language}`]}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" />
                          <span>{t('products.serviceFeature1')}</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" />
                          <span>{t('products.serviceFeature2')}</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" />
                          <span>{t('products.serviceFeature3')}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 px-6 pb-6">
                      <Link href={addPrefix(`/services/${service.slug}`)} className="w-full">
                        <Button className="w-full gap-2">
                          {t('products.viewDetails')}
                          <ArrowRight size={16} />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Products Grid */}
          {products && products.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-primary">
                  <span className="border-b-4 border-primary pb-2">
                    {t('products.careProducts')}
                  </span>
                </h2>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product: any) => (
                    <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <div className="relative overflow-hidden h-48">
                        <img 
                          src={product.imageUrl} 
                          alt={product[`name${language}`]} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 right-2">
                            {t('products.new')}
                          </Badge>
                        )}
                      </div>
                      
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg line-clamp-1">
                          {product[`name${language}`]}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {product[`description${language}`]}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardFooter className="p-4 pt-0">
                        <Link href={addPrefix(`/products/${product.slug}`)} className="w-full">
                          <Button variant="outline" className="w-full gap-2">
                            {t('common.moreInfo')}
                            <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !isLoadingServices && (!services || services.length === 0) && (!products || products.length === 0) && (
            <div className="text-center py-12">
              <p className="text-neutral-500">{t('products.noProducts')}</p>
            </div>
          )}
          
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
