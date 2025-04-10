import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package } from "@shared/schema";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { META } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export default function PackagesPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activePackage, setActivePackage] = useState<Package | null>(null);

  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  useEffect(() => {
    // Sayfa yüklendiğinde ilk paketi seç
    if (packages?.length && !activePackage) {
      setActivePackage(packages[0]);
    }
  }, [packages, activePackage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{t("error.generic")}</h1>
        <p>{t("error.try_again")}</p>
      </div>
    );
  }

  if (!packages?.length) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("packages.no_packages")}</h1>
      </div>
    );
  }

  // Dile göre başlık ve içerik alanlarını belirle
  const getTitle = (pkg: Package) => {
    switch (language) {
      case "tr": return pkg.titleTR;
      case "en": return pkg.titleEN;
      case "ru": return pkg.titleRU;
      case "ka": return pkg.titleKA;
      default: return pkg.titleEN;
    }
  };

  const getDescription = (pkg: Package) => {
    switch (language) {
      case "tr": return pkg.descriptionTR;
      case "en": return pkg.descriptionEN;
      case "ru": return pkg.descriptionRU;
      case "ka": return pkg.descriptionKA;
      default: return pkg.descriptionEN;
    }
  };

  const getContent = (pkg: Package) => {
    switch (language) {
      case "tr": return pkg.contentTR;
      case "en": return pkg.contentEN;
      case "ru": return pkg.contentRU;
      case "ka": return pkg.contentKA;
      default: return pkg.contentEN;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("packages.title")} {META.TITLE_SUFFIX}</title>
        <meta name="description" content={t("packages.meta_description")} />
      </Helmet>

      <div className="bg-neutral-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("packages.title")}</h1>
            <p className="max-w-3xl mx-auto text-gray-600">{t("packages.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Paketler Yan Menü */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{t("packages.all_packages")}</h3>
                <div className="space-y-2">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setActivePackage(pkg)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        activePackage?.id === pkg.id
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      {getTitle(pkg)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Paket Detayı */}
            {activePackage && (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div 
                    className="w-full h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${activePackage.imageUrl})` }}
                  />
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{getTitle(activePackage)}</h2>
                    <p className="text-gray-700 mb-6">{getDescription(activePackage)}</p>
                    
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: getContent(activePackage) }} />
                    </div>
                    
                    <div className="mt-8">
                      <a 
                        href="/appointment" 
                        className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                      >
                        {t("packages.book_now")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}