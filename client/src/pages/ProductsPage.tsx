import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

export default function ProductsPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Fetch products
  const { data: products, isLoading } = useQuery({
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
                    alt={product[`name${language.toUpperCase()}`]} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-3">
                      {product[`name${language.toUpperCase()}`]}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {product[`description${language.toUpperCase()}`]}
                    </p>
                    <Link href={addPrefix(`/products/${product.slug}`)}>
                      <a className="inline-flex items-center text-primary font-medium">
                        {t('common.moreInfo')}
                        <i className="fas fa-arrow-right ml-2 text-sm"></i>
                      </a>
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
                <Link href={addPrefix('/contact')}>
                  <a className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
                    {t('common.contactUs')}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
