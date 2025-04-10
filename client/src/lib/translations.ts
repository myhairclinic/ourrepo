import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Our translations object with simple key structure
// Translations object (exported for direct usage in components)
export const translations: Record<string, LanguageMap> = {
  // Common
  "common.home": {
    [Language.Turkish]: "Ana Sayfa",
    [Language.English]: "Home",
    [Language.Russian]: "Главная",
    [Language.Georgian]: "მთავარი"
  },
  "common.services": {
    [Language.Turkish]: "Hizmetler",
    [Language.English]: "Services",
    [Language.Russian]: "Услуги",
    [Language.Georgian]: "მომსახურება"
  },
  "common.packages": {
    [Language.Turkish]: "Paketler",
    [Language.English]: "Packages",
    [Language.Russian]: "Пакеты",
    [Language.Georgian]: "პაკეტები"
  },
  "common.products": {
    [Language.Turkish]: "Ürünler",
    [Language.English]: "Products",
    [Language.Russian]: "Продукты",
    [Language.Georgian]: "პროდუქტები"
  },
  "common.blog": {
    [Language.Turkish]: "Blog",
    [Language.English]: "Blog",
    [Language.Russian]: "Блог",
    [Language.Georgian]: "ბლოგი"
  },
  "common.gallery": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "common.about": {
    [Language.Turkish]: "Hakkımızda",
    [Language.English]: "About",
    [Language.Russian]: "О нас",
    [Language.Georgian]: "ჩვენს შესახებ"
  },
  "common.contact": {
    [Language.Turkish]: "İletişim",
    [Language.English]: "Contact",
    [Language.Russian]: "Контакты",
    [Language.Georgian]: "კონტაქტი"
  },
  "common.contactViaWhatsApp": {
    [Language.Turkish]: "WhatsApp ile İletişime Geç",
    [Language.English]: "Contact via WhatsApp",
    [Language.Russian]: "Связаться через WhatsApp",
    [Language.Georgian]: "დაგვიკავშირდით WhatsApp-ით"
  },
  "common.askViaSms": {
    [Language.Turkish]: "SMS ile Sor",
    [Language.English]: "Ask via SMS",
    [Language.Russian]: "Спросить через SMS",
    [Language.Georgian]: "კითხვა SMS-ით"
  },
  "common.buyNow": {
    [Language.Turkish]: "Satın Al",
    [Language.English]: "Buy Now",
    [Language.Russian]: "Купить сейчас",
    [Language.Georgian]: "ყიდვა ახლავე"
  },
  "common.appointment": {
    [Language.Turkish]: "Randevu",
    [Language.English]: "Appointment",
    [Language.Russian]: "Запись",
    [Language.Georgian]: "ჯავშანი"
  },
  "common.track.appointment": {
    [Language.Turkish]: "Randevu Sorgulama",
    [Language.English]: "Track Appointment",
    [Language.Russian]: "Отслеживание записи",
    [Language.Georgian]: "ჯავშნის მიდევნება"
  },
  "common.price": {
    [Language.Turkish]: "Fiyat",
    [Language.English]: "Price",
    [Language.Russian]: "Цена",
    [Language.Georgian]: "ფასი"
  },
  "common.features": {
    [Language.Turkish]: "Özellikler",
    [Language.English]: "Features",
    [Language.Russian]: "Особенности",
    [Language.Georgian]: "ფუნქციები"
  },
  "common.learnMore": {
    [Language.Turkish]: "Daha Fazla Bilgi",
    [Language.English]: "Learn More",
    [Language.Russian]: "Узнать больше",
    [Language.Georgian]: "მეტის გაგება"
  },
  
  // Packages Page
  "packages.title": {
    [Language.Turkish]: "Tedavi ve Konaklama Paketleri",
    [Language.English]: "Treatment and Accommodation Packages",
    [Language.Russian]: "Пакеты лечения и проживания",
    [Language.Georgian]: "მკურნალობისა და საცხოვრებელი პაკეტები"
  },
  "packages.subtitle": {
    [Language.Turkish]: "Size özel hazırlanmış en uygun paketlerimizi keşfedin",
    [Language.English]: "Discover our best packages tailored for you",
    [Language.Russian]: "Откройте для себя наши лучшие пакеты, созданные специально для вас",
    [Language.Georgian]: "აღმოაჩინეთ ჩვენი საუკეთესო პაკეტები, რომლებიც შექმნილია თქვენთვის"
  },
  "packages.from": {
    [Language.Turkish]: "Başlangıç",
    [Language.English]: "From",
    [Language.Russian]: "От",
    [Language.Georgian]: "დან"
  },
  "packages.details": {
    [Language.Turkish]: "Paket Detayları",
    [Language.English]: "Package Details",
    [Language.Russian]: "Детали пакета",
    [Language.Georgian]: "პაკეტის დეტალები"
  },
  "packages.included": {
    [Language.Turkish]: "Pakete Dahil",
    [Language.English]: "Included in Package",
    [Language.Russian]: "Включено в пакет",
    [Language.Georgian]: "შედის პაკეტში"
  },
  "packages.bookNow": {
    [Language.Turkish]: "Hemen Randevu Al",
    [Language.English]: "Book Now",
    [Language.Russian]: "Забронировать сейчас",
    [Language.Georgian]: "დაჯავშნე ახლავე"
  },
  "packages.inquire": {
    [Language.Turkish]: "Bilgi Al",
    [Language.English]: "Get Information",
    [Language.Russian]: "Получить информацию",
    [Language.Georgian]: "მიიღეთ ინფორმაცია"
  },
  "packages.noPackages": {
    [Language.Turkish]: "Şu anda mevcut paket bulunmamaktadır.",
    [Language.English]: "There are no packages available at the moment.",
    [Language.Russian]: "В настоящее время нет доступных пакетов.",
    [Language.Georgian]: "ამჟამად პაკეტები არ არის ხელმისაწვდომი."
  },
  
  // Services Page
  "services.subtitle": {
    [Language.Turkish]: "Saç ekimi ve estetik hizmetlerimiz",
    [Language.English]: "Our hair transplantation and aesthetic services",
    [Language.Russian]: "Наши услуги по трансплантации волос и эстетике",
    [Language.Georgian]: "ჩვენი თმის გადანერგვისა და ესთეტიკური სერვისები"
  },
  "services.bookAppointment": {
    [Language.Turkish]: "Randevu Al",
    [Language.English]: "Book Appointment",
    [Language.Russian]: "Записаться на прием",
    [Language.Georgian]: "დაჯავშნეთ შეხვედრა"
  },
  "services.allServices": {
    [Language.Turkish]: "Tüm Hizmetler",
    [Language.English]: "All Services",
    [Language.Russian]: "Все услуги",
    [Language.Georgian]: "ყველა სერვისი"
  },
  
  // HomePage çevirileri 
  "home.title": {
    [Language.Turkish]: "MyHair Clinic | Saç Ekimi ve Estetik Merkezi",
    [Language.English]: "MyHair Clinic | Hair Transplant and Aesthetic Center",
    [Language.Russian]: "MyHair Clinic | Центр трансплантации волос и эстетики",
    [Language.Georgian]: "MyHair Clinic | თმის გადანერგვის და ესთეტიკის ცენტრი"
  },
  "home.description": {
    [Language.Turkish]: "Tiflis'in lider saç ekimi ve estetik merkezi. FUE ve DHI tekniklerini kullanarak en iyi sonuçları elde ediyoruz. Doğal görünüm garantisi.",
    [Language.English]: "Leading hair transplant and aesthetic center in Tbilisi. We use FUE and DHI techniques to achieve the best results. Natural appearance guaranteed.",
    [Language.Russian]: "Ведущий центр трансплантации волос и эстетики в Тбилиси. Мы используем методы FUE и DHI для достижения наилучших результатов. Гарантия естественного вида.",
    [Language.Georgian]: "წამყვანი თმის გადანერგვისა და ესთეტიკის ცენტრი თბილისში. ჩვენ ვიყენებთ FUE და DHI ტექნიკას საუკეთესო შედეგების მისაღწევად. ბუნებრივი გარეგნობის გარანტია."
  },
  
  // Yer tutucu değişken örnekleri
  "home.procedure_cost": {
    [Language.Turkish]: "{procedure} işlemimizin fiyatı sadece $1500'dan başlıyor",
    [Language.English]: "Our {procedure} procedure starts at only $1500",
    [Language.Russian]: "Наша процедура {procedure} начинается всего от $1500",
    [Language.Georgian]: "ჩვენი {procedure} პროცედურა იწყება მხოლოდ $1500-დან"
  },
  "home.welcome_user": {
    [Language.Turkish]: "Hoş geldiniz {name}, size nasıl yardımcı olabiliriz?",
    [Language.English]: "Welcome {name}, how can we help you?",
    [Language.Russian]: "Добро пожаловать, {name}, чем мы можем вам помочь?",
    [Language.Georgian]: "მოგესალმებით {name}, როგორ შეგვიძლია დაგეხმაროთ?"
  },
  "home.results_time": {
    [Language.Turkish]: "Tam sonuçlar {months} ay içinde görülecektir",
    [Language.English]: "Full results will be visible within {months} months",
    [Language.Russian]: "Полные результаты будут видны через {months} месяцев",
    [Language.Georgian]: "სრული შედეგები გამოჩნდება {months} თვის განმავლობაში"
  },
  
  // Products Page
  "products.title": {
    [Language.Turkish]: "Saç Bakım Ürünlerimiz",
    [Language.English]: "Our Hair Care Products",
    [Language.Russian]: "Наши продукты для ухода за волосами",
    [Language.Georgian]: "ჩვენი თმის მოვლის პროდუქტები"
  },
  "products.description": {
    [Language.Turkish]: "Saç ekimi sonrası en iyi sonuçları elde etmek için özel olarak formüle edilmiş ürünler",
    [Language.English]: "Specially formulated products to achieve the best results after hair transplantation",
    [Language.Russian]: "Специально разработанные продукты для достижения наилучших результатов после трансплантации волос",
    [Language.Georgian]: "სპეციალურად ფორმულირებული პროდუქტები თმის გადანერგვის შემდეგ საუკეთესო შედეგების მისაღწევად"
  },
  "products.infoTitle": {
    [Language.Turkish]: "Saç Bakımı Hakkında Bilmeniz Gerekenler",
    [Language.English]: "What You Need to Know About Hair Care",
    [Language.Russian]: "Что вам нужно знать об уходе за волосами",
    [Language.Georgian]: "რა უნდა იცოდეთ თმის მოვლის შესახებ"
  },
  "products.infoText1": {
    [Language.Turkish]: "Saç ekimi sonrası bakım, işlemin başarısı için kritik öneme sahiptir. Doğru ürünleri kullanmak, yeni saç köklerinizin sağlıklı bir şekilde büyümesini destekler.",
    [Language.English]: "Post-transplant hair care is critical to the success of the procedure. Using the right products supports the healthy growth of your new hair follicles.",
    [Language.Russian]: "Уход за волосами после трансплантации имеет решающее значение для успеха процедуры. Использование правильных продуктов способствует здоровому росту ваших новых волосяных фолликулов.",
    [Language.Georgian]: "თმის გადანერგვის შემდგომი მოვლა მნიშვნელოვანია პროცედურის წარმატებისათვის. სწორი პროდუქტების გამოყენება ხელს უწყობს თქვენი ახალი თმის ფოლიკულების ჯანსაღ ზრდას."
  },
  "products.infoText2": {
    [Language.Turkish]: "MyHair Clinic olarak, saç ekimi uzmanlarımız tarafından özel olarak seçilen ve onaylanan ürünleri sunuyoruz. Bu ürünler, saç ekimi sonrası iyileşme sürecini hızlandırmak ve en iyi sonuçları elde etmek için özel olarak formüle edilmiştir.",
    [Language.English]: "At MyHair Clinic, we offer products specially selected and approved by our hair transplant specialists. These products are specially formulated to accelerate the healing process after hair transplantation and achieve the best results.",
    [Language.Russian]: "В клинике MyHair мы предлагаем продукты, специально отобранные и одобренные нашими специалистами по трансплантации волос. Эти продукты специально разработаны для ускорения процесса заживления после трансплантации волос и достижения наилучших результатов.",
    [Language.Georgian]: "MyHair კლინიკაში ჩვენ გთავაზობთ პროდუქტებს, რომლებიც სპეციალურად შერჩეულია და დამტკიცებულია ჩვენი თმის გადანერგვის სპეციალისტების მიერ. ეს პროდუქტები სპეციალურად არის შექმნილი თმის გადანერგვის შემდეგ გამოჯანმრთელების პროცესის დასაჩქარებლად და საუკეთესო შედეგების მისაღწევად."
  },
  "products.infoPoint1": {
    [Language.Turkish]: "Tüm ürünlerimiz dermatolojik olarak test edilmiş ve onaylanmıştır",
    [Language.English]: "All our products are dermatologically tested and approved",
    [Language.Russian]: "Все наши продукты дерматологически протестированы и одобрены",
    [Language.Georgian]: "ჩვენი ყველა პროდუქტი დერმატოლოგიურად ტესტირებული და დამტკიცებულია"
  },
  "products.infoPoint2": {
    [Language.Turkish]: "Saç ekimi sonrası kullanım için özel olarak formüle edilmiştir",
    [Language.English]: "Specially formulated for use after hair transplantation",
    [Language.Russian]: "Специально разработан для использования после трансплантации волос",
    [Language.Georgian]: "სპეციალურად ფორმულირებულია თმის გადანერგვის შემდეგ გამოსაყენებლად"
  },
  "products.infoPoint3": {
    [Language.Turkish]: "Paraben, silikon ve zararlı kimyasallar içermez",
    [Language.English]: "Does not contain parabens, silicones, and harmful chemicals",
    [Language.Russian]: "Не содержит парабенов, силиконов и вредных химических веществ",
    [Language.Georgian]: "არ შეიცავს პარაბენებს, სილიკონებს და მავნე ქიმიურ ნივთიერებებს"
  },
  "products.noProducts": {
    [Language.Turkish]: "Şu anda mevcut ürün bulunmamaktadır.",
    [Language.English]: "There are no products available at the moment.",
    [Language.Russian]: "В настоящее время нет доступных продуктов.",
    [Language.Georgian]: "ამჟამად პროდუქტები არ არის ხელმისაწვდომი."
  },
  "products.usage": {
    [Language.Turkish]: "Kullanım Talimatları",
    [Language.English]: "Usage Instructions",
    [Language.Russian]: "Инструкции по использованию",
    [Language.Georgian]: "გამოყენების ინსტრუქციები"
  },
  "products.ingredients": {
    [Language.Turkish]: "İçindekiler",
    [Language.English]: "Ingredients",
    [Language.Russian]: "Ингредиенты",
    [Language.Georgian]: "ინგრედიენტები"
  },
  "products.inquireProduct": {
    [Language.Turkish]: "Ürün Hakkında Bilgi Alın",
    [Language.English]: "Get Information About This Product",
    [Language.Russian]: "Получите информацию об этом продукте",
    [Language.Georgian]: "მიიღეთ ინფორმაცია ამ პროდუქტის შესახებ"
  },
  "products.inquireText": {
    [Language.Turkish]: "Bu ürün hakkında daha fazla bilgi edinmek veya sipariş vermek için bizimle iletişime geçin.",
    [Language.English]: "Contact us to learn more about this product or to place an order.",
    [Language.Russian]: "Свяжитесь с нами, чтобы узнать больше об этом продукте или разместить заказ.",
    [Language.Georgian]: "დაგვიკავშირდით ამ პროდუქტის შესახებ მეტი ინფორმაციის მისაღებად ან შეკვეთის განსათავსებლად."
  },
  "products.backToProducts": {
    [Language.Turkish]: "Ürünlere Geri Dön",
    [Language.English]: "Back to Products",
    [Language.Russian]: "Вернуться к продуктам",
    [Language.Georgian]: "პროდუქტებზე დაბრუნება"
  },
  "errors.loading_product": {
    [Language.Turkish]: "Ürün yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while loading the product. Please try again later.",
    [Language.Russian]: "Произошла ошибка при загрузке продукта. Пожалуйста, повторите попытку позже.",
    [Language.Georgian]: "პროდუქტის ჩატვირთვისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
  "common.moreInfo": {
    [Language.Turkish]: "Daha Fazla Bilgi",
    [Language.English]: "More Information",
    [Language.Russian]: "Больше Информации",
    [Language.Georgian]: "მეტი ინფორმაცია"
  },
  "common.contactUs": {
    [Language.Turkish]: "Bizimle İletişime Geçin",
    [Language.English]: "Contact Us",
    [Language.Russian]: "Свяжитесь с нами",
    [Language.Georgian]: "დაგვიკავშირდით"
  },
  
  // Error messages
  "errors.loading_services": {
    [Language.Turkish]: "Hizmetler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while loading services. Please try again later.",
    [Language.Russian]: "Произошла ошибка при загрузке услуг. Пожалуйста, повторите попытку позже.",
    [Language.Georgian]: "სერვისების ჩატვირთვისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
  "error.pageNotFound": {
    [Language.Turkish]: "Sayfa Bulunamadı",
    [Language.English]: "Page Not Found",
    [Language.Russian]: "Страница не найдена",
    [Language.Georgian]: "გვერდი ვერ მოიძებნა"
  },
  "error.somethingWentWrong": {
    [Language.Turkish]: "Bir şeyler ters gitti",
    [Language.English]: "Something went wrong",
    [Language.Russian]: "Что-то пошло не так",
    [Language.Georgian]: "რაღაც ცუდი მოხდა"
  },
  "error.goBackHome": {
    [Language.Turkish]: "Ana Sayfaya Dön",
    [Language.English]: "Go Back Home",
    [Language.Russian]: "Вернуться на главную",
    [Language.Georgian]: "მთავარზე დაბრუნება"
  }
};

/**
 * Gets a translation for a specific key and language
 * @param key The translation key
 * @param language The target language
 * @param replacements Optional replacements for placeholders
 * @returns The translated string or a fallback
 */
export function getTranslation(
  key: string, 
  language: Language,
  replacements?: Record<string, string | number>
): string {
  try {
    // Check if the key exists in our translations
    if (translations[key]) {
      // Get the translated text
      let translatedText = translations[key][language] || translations[key][Language.English] || key;
      
      // Apply replacements if any
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
          translatedText = translatedText.replace(
            new RegExp(`{${placeholder}}`, 'g'), 
            String(value)
          );
        });
      }
      
      return translatedText;
    }
    
    // If key doesn't exist, return the key itself
    console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
    return key;
  } catch (error) {
    console.error(`Error getting translation for key: "${key}"`, error);
    return key;
  }
}

/**
 * useTranslation hook - React hook for component translations
 */
export function useTranslation(language: Language) {
  return {
    t: (key: string, replacements?: Record<string, string | number>) => 
      getTranslation(key, language, replacements),
    
    // Format a value to the current language format (e.g. currency)
    formatCurrency: (value: number) => {
      const formatter = new Intl.NumberFormat(language === Language.Turkish ? 'tr-TR' : 
                                            language === Language.English ? 'en-US' : 
                                            language === Language.Russian ? 'ru-RU' : 'ka-GE', 
      {
        style: 'currency',
        currency: 'USD'
      });
      
      return formatter.format(value);
    },
    
    // Format a date to the current language format
    formatDate: (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      return dateObj.toLocaleDateString(
        language === Language.Turkish ? 'tr-TR' : 
        language === Language.English ? 'en-US' : 
        language === Language.Russian ? 'ru-RU' : 'ka-GE'
      );
    }
  };
}