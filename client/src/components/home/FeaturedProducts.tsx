import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Language } from "@shared/types";
import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Loader2 } from "lucide-react";
import { Link } from "wouter";
import SectionTitle from "@/components/shared/SectionTitle";

export default function FeaturedProducts() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  
  // API'den ürünleri çek
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [API_ROUTES.PRODUCTS],
  });
  
  // Sadece öne çıkan ürünleri göster (ilk 3 ürün)
  const featuredProducts = products?.slice(0, 3);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('products.featuredTitle')}
          description={t('products.featuredDescription')}
          center
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-gray-500 mt-8">
            {t('errors.failedToLoadProducts')}
          </div>
        ) : featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary/10">
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={product.imageUrl} 
                    alt={language === 'tr' ? product.nameTR : 
                         language === 'en' ? product.nameEN : 
                         language === 'ru' ? product.nameRU : 
                         product.nameKA} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary">
                      {t('products.new')}
                    </Badge>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-end">
                    <Badge variant="outline" className="bg-white/90 text-primary backdrop-blur-sm">
                      <Star size={12} className="mr-1" /> Vithair
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg font-bold text-primary truncate">
                    {language === 'tr' ? product.nameTR : 
                     language === 'en' ? product.nameEN : 
                     language === 'ru' ? product.nameRU : 
                     product.nameKA}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {language === 'tr' ? product.descriptionTR : 
                     language === 'en' ? product.descriptionEN : 
                     language === 'ru' ? product.descriptionRU : 
                     product.descriptionKA}
                  </p>
                </CardContent>
                
                <CardFooter className="p-4 pt-2 flex justify-end">
                  <Link href={addPrefix(`/products/${product.slug}`)}>
                    <Button variant="outline" size="sm" className="gap-1 group">
                      {t('common.viewDetails')}
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            {t('products.noProductsAvailable')}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link href={addPrefix('/products')}>
            <Button className="gap-2">
              {t('common.viewAllProducts')}
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}