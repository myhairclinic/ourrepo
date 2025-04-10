import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { META } from "@/lib/constants";
import { Product } from "@shared/schema";
import { Language } from "@shared/types";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);

  // Fetch product data
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productSlug],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productSlug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json();
    },
  });

  const getLocalizedValue = (field: string) => {
    if (!product) return "";
    return product[`${field}${language.toUpperCase()}` as keyof Product] as string;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-700 mb-4">{t("error.somethingWentWrong")}</h1>
        <p className="mb-8 text-neutral-600">{t("errors.loading_product")}</p>
        <Link href={addPrefix("/products")} className="inline-flex items-center text-primary hover:text-primary/90 font-medium">
          {t("products.backToProducts")}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getLocalizedValue("name") + META.TITLE_SUFFIX}</title>
        <meta name="description" content={getLocalizedValue("description")} />
        <link rel="canonical" href={window.location.origin + addPrefix(`/products/${productSlug}`)} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + `/tr/products/${productSlug}`} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + `/en/products/${productSlug}`} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + `/ru/products/${productSlug}`} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + `/ka/products/${productSlug}`} />
      </Helmet>

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href={addPrefix("/")} className="text-gray-500 hover:text-primary">
                    {t("common.home")}
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <Link href={addPrefix("/products")} className="ml-1 text-gray-500 hover:text-primary md:ml-2">
                      {t("common.products")}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-gray-500 md:ml-2 font-medium">{getLocalizedValue("name")}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={getLocalizedValue("name")}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>

            {/* Product Information */}
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-4">
                {getLocalizedValue("name")}
              </h1>
              <div className="prose prose-lg max-w-none mb-6">
                <p>{getLocalizedValue("description")}</p>
              </div>

              {/* Usage Instructions */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-neutral-800 mb-3">{t("products.usage")}</h2>
                <div className="prose prose-lg max-w-none">
                  <p>{getLocalizedValue("usage")}</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-3">{t("products.ingredients")}</h2>
                <div className="prose prose-lg max-w-none">
                  <p>{getLocalizedValue("ingredients")}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{t("products.inquireProduct")}</h3>
                <p className="mb-4">{t("products.inquireText")}</p>
                <div className="flex flex-wrap gap-4">
                  <WhatsAppButton text={t("common.contactViaWhatsApp")} />
                  <Link
                    href={addPrefix("/appointment")}
                    className="inline-flex items-center bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition duration-200"
                  >
                    {t("services.bookAppointment")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Products button */}
          <div className="mt-8 text-center">
            <Link
              href={addPrefix("/products")}
              className="inline-flex items-center text-primary hover:text-primary/90 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t("products.backToProducts")}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;