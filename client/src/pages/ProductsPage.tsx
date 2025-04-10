import { Helmet } from "react-helmet";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";
import { Language } from "@shared/types";
import { Product } from "@shared/schema";

export default function ProductsPage() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  return (
    <>
      <Helmet>
        <title>{t('products.title') + META.TITLE_SUFFIX}</title>
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
          />
          
          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products && products.map((product: any) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product[`name${language}`]} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3">
                      {product[`name${language}`]}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {product[`description${language}`]}
                    </p>
                    <Link href={addPrefix(`/products/${product.slug}`)} className="inline-flex items-center text-primary font-medium">
                      {t('common.moreInfo')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && (!products || products.length === 0) && (
            <div className="text-center py-12">
              <p className="text-neutral-500">{t('products.noProducts')}</p>
            </div>
          )}
          
          {/* Products Info Section */}
          <section className="mt-16 max-w-4xl mx-auto">
            <div className="bg-primary/5 rounded-lg p-8">
              <h2 className="font-heading text-2xl font-bold text-secondary mb-4 text-center">
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
