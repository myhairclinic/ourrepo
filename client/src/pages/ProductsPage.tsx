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
import { ArrowRight, CheckCircle, Star, Sparkles, Shield } from "lucide-react";

export default function ProductsPage() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  
  // Type safe language handling
  const lang = language as Language;
  
  // Vitharin ürünleri (saç bakım ürünleri)
  const vitharinProducts = [
    {
      id: 1,
      slug: "vitharin-shampoo",
      nameTR: "Vitharin Şampuan",
      nameEN: "Vitharin Shampoo",
      nameRU: "Шампунь Vitharin",
      nameKA: "Vitharin შამპუნი",
      descriptionTR: "Saç köklerini besleyen ve güçlendiren özel formüllü şampuan.",
      descriptionEN: "Special formula shampoo that nourishes and strengthens hair roots.",
      descriptionRU: "Шампунь со специальной формулой, питающий и укрепляющий корни волос.",
      descriptionKA: "სპეციალური ფორმულის შამპუნი, რომელიც კვებავს და აძლიერებს თმის ფესვებს.",
      imageUrl: "/images/products/vitharin-shampoo.jpg",
      isNew: true,
      price: 29.99
    },
    {
      id: 2,
      slug: "vitharin-conditioner",
      nameTR: "Vitharin Saç Kremi",
      nameEN: "Vitharin Conditioner",
      nameRU: "Кондиционер Vitharin",
      nameKA: "Vitharin კონდიციონერი",
      descriptionTR: "Saçları yumuşatan ve parlatan saç kremi.",
      descriptionEN: "Conditioner that softens hair and adds shine.",
      descriptionRU: "Кондиционер, смягчающий волосы и придающий им блеск.",
      descriptionKA: "კონდიციონერი, რომელიც არბილებს თმას და ამატებს ბზინვარებას.",
      imageUrl: "/images/products/vitharin-conditioner.jpg",
      isNew: false,
      price: 24.99
    },
    {
      id: 3,
      slug: "vitharin-serum",
      nameTR: "Vitharin Saç Serumu",
      nameEN: "Vitharin Hair Serum",
      nameRU: "Сыворотка для волос Vitharin",
      nameKA: "Vitharin თმის შრატი",
      descriptionTR: "Saç dökülmesini önleyen ve saç büyümesini destekleyen konsantre serum.",
      descriptionEN: "Concentrated serum that prevents hair loss and promotes hair growth.",
      descriptionRU: "Концентрированная сыворотка, предотвращающая выпадение волос и способствующая их росту.",
      descriptionKA: "კონცენტრირებული შრატი, რომელიც ხელს უშლის თმის ცვენას და ხელს უწყობს თმის ზრდას.",
      imageUrl: "/images/products/vitharin-serum.jpg",
      isNew: true,
      price: 39.99
    },
    {
      id: 4,
      slug: "vitharin-hair-mask",
      nameTR: "Vitharin Saç Maskesi",
      nameEN: "Vitharin Hair Mask",
      nameRU: "Маска для волос Vitharin",
      nameKA: "Vitharin თმის ნიღაბი",
      descriptionTR: "Yıpranmış saçlar için yoğun bakım maskesi.",
      descriptionEN: "Intensive care mask for damaged hair.",
      descriptionRU: "Маска интенсивного ухода для поврежденных волос.",
      descriptionKA: "ინტენსიური მოვლის ნიღაბი დაზიანებული თმისთვის.",
      imageUrl: "/images/products/vitharin-mask.jpg",
      isNew: false,
      price: 34.99
    },
    {
      id: 5,
      slug: "vitharin-hair-oil",
      nameTR: "Vitharin Saç Yağı",
      nameEN: "Vitharin Hair Oil",
      nameRU: "Масло для волос Vitharin",
      nameKA: "Vitharin თმის ზეთი",
      descriptionTR: "Doğal yağlarla zenginleştirilmiş nemlendirici saç yağı.",
      descriptionEN: "Moisturizing hair oil enriched with natural oils.",
      descriptionRU: "Увлажняющее масло для волос, обогащенное натуральными маслами.",
      descriptionKA: "დამატენიანებელი თმის ზეთი, გამდიდრებული ბუნებრივი ზეთებით.",
      imageUrl: "/images/products/vitharin-oil.jpg",
      isNew: false,
      price: 27.99
    },
    {
      id: 6,
      slug: "vitharin-hair-spray",
      nameTR: "Vitharin Saç Spreyi",
      nameEN: "Vitharin Hair Spray",
      nameRU: "Спрей для волос Vitharin",
      nameKA: "Vitharin თმის სპრეი",
      descriptionTR: "Saç stilini koruyan ve parlaklık veren saç spreyi.",
      descriptionEN: "Hair spray that protects style and adds shine.",
      descriptionRU: "Спрей для волос, защищающий стиль и придающий блеск.",
      descriptionKA: "თმის სპრეი, რომელიც იცავს სტილს და ამატებს ბზინვარებას.",
      imageUrl: "/images/products/vitharin-spray.jpg",
      isNew: false,
      price: 19.99
    }
  ];
  
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
          
          {/* Vitharin Products Grid */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary">
                <span className="border-b-4 border-primary pb-2">
                  {t('products.careProducts')}
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {vitharinProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
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
                  </div>
                  
                  <CardHeader className="p-5 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">
                        {language === 'tr' ? product.nameTR : 
                         language === 'en' ? product.nameEN : 
                         language === 'ru' ? product.nameRU : 
                         product.nameKA}
                      </CardTitle>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        <Star size={12} className="mr-1" /> Vitharin
                      </Badge>
                    </div>
                    <CardDescription className="mt-2 text-sm line-clamp-2">
                      {language === 'tr' ? product.descriptionTR : 
                       language === 'en' ? product.descriptionEN : 
                       language === 'ru' ? product.descriptionRU : 
                       product.descriptionKA}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-5 pt-3">
                    <div className="space-y-3 mt-2">
                      <div className="flex items-start">
                        <Shield size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{t('products.serviceFeature1')}</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{t('products.serviceFeature2')}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-5 pt-2 flex justify-between items-center">
                    <p className="font-bold text-lg text-primary">${product.price}</p>
                    <Link href={addPrefix(`/products/${product.slug}`)} className="">
                      <Button variant="outline" size="sm" className="gap-2">
                        {t('common.moreInfo')}
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
