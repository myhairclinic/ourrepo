import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Package } from "@shared/schema";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";
import { useTranslation } from "@/hooks/use-translation";
import PackageCard from "@/components/packages/PackageCard";
import CountryFilter from "@/components/packages/CountryFilter";
import { PlaneTakeoff, BedDouble, Utensils, MapPin } from "lucide-react";

const PackagesPage: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(null);

  // Get all packages
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  // Filter packages by country if selected
  const filteredPackages = React.useMemo(() => {
    if (!packages) return [];
    if (!selectedCountry) return packages;
    return packages.filter(pkg => pkg.countryOrigin === selectedCountry);
  }, [packages, selectedCountry]);

  // Country options for filter
  const countryOptions = React.useMemo(() => {
    if (!packages) return [];
    const countries = Array.from(new Set(packages.map(pkg => pkg.countryOrigin)));
    return countries.map(code => ({
      value: code,
      label: getCountryName(code, currentLanguage)
    }));
  }, [packages, currentLanguage]);

  // Get country name based on code
  function getCountryName(code: string, lang: string): string {
    const countryNames: Record<string, Record<string, string>> = {
      TR: {
        tr: "Türkiye",
        en: "Turkey",
        ru: "Турция",
        ka: "თურქეთი"
      },
      AZ: {
        tr: "Azerbaycan",
        en: "Azerbaijan",
        ru: "Азербайджан",
        ka: "აზერბაიჯანი"
      },
      RU: {
        tr: "Rusya",
        en: "Russia",
        ru: "Россия",
        ka: "რუსეთი"
      },
      UA: {
        tr: "Ukrayna",
        en: "Ukraine",
        ru: "Украина",
        ka: "უკრაინა"
      },
      IR: {
        tr: "İran",
        en: "Iran",
        ru: "Иран",
        ka: "ირანი"
      }
    };

    return countryNames[code]?.[lang.toLowerCase()] || code;
  }

  return (
    <>
      <Helmet>
        <title>
          {t({
            tr: "Seyahat & Konaklama Paketleri | MyHair Clinic",
            en: "Travel & Accommodation Packages | MyHair Clinic",
            ru: "Пакеты Путешествия и Проживания | MyHair Clinic",
            ka: "მოგზაურობა და საცხოვრებელი პაკეტები | MyHair Clinic"
          })}
        </title>
        <meta
          name="description"
          content={t({
            tr: "Türkiye, Azerbaycan, Rusya, Ukrayna ve İran'dan gelen misafirlerimize özel olarak tasarlanmış saç ekimi tedavi paketleri. Konaklama, ulaşım ve etkinlikler dahil.",
            en: "Hair transplantation treatment packages specially designed for our guests from Turkey, Azerbaijan, Russia, Ukraine and Iran. Includes accommodation, transportation and activities.",
            ru: "Пакеты лечения трансплантации волос, специально разработанные для наших гостей из Турции, Азербайджана, России, Украины и Ирана. Включает проживание, транспорт и мероприятия.",
            ka: "თმის გადანერგვის მკურნალობის პაკეტები სპეციალურად შექმნილია ჩვენი სტუმრებისთვის თურქეთიდან, აზერბაიჯანიდან, რუსეთიდან, უკრაინიდან და ირანიდან. მოიცავს საცხოვრებელს, ტრანსპორტირებას და აქტივობებს."
          })}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={t({
            tr: "Seyahat & Konaklama Paketleri",
            en: "Travel & Accommodation Packages",
            ru: "Пакеты Путешествия и Проживания",
            ka: "მოგზაურობა და საცხოვრებელი პაკეტები"
          })}
          description={t({
            tr: "Komşu ülkelerden gelen hastalarımız için özel olarak tasarlanmış tedavi, konaklama ve etkinlik paketleri",
            en: "Treatment, accommodation and activity packages specially designed for our patients from neighboring countries",
            ru: "Пакеты лечения, проживания и мероприятий, специально разработанные для наших пациентов из соседних стран",
            ka: "მკურნალობის, საცხოვრებელი და აქტივობის პაკეტები სპეციალურად შექმნილია ჩვენი პაციენტებისთვის მეზობელი ქვეყნებიდან"
          })}
        />

        <div className="bg-card rounded-lg shadow-sm p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {t({
                  tr: "Neden Paket Seçmelisiniz?",
                  en: "Why Choose a Package?",
                  ru: "Почему Стоит Выбрать Пакет?",
                  ka: "რატომ უნდა აირჩიოთ პაკეტი?"
                })}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                    <PlaneTakeoff className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    {t({
                      tr: "Sorunsuz seyahat deneyimi için tüm ulaşım ihtiyaçlarınız organize edilir",
                      en: "All your transportation needs are organized for a seamless travel experience",
                      ru: "Все ваши транспортные потребности организованы для беспрепятственного путешествия",
                      ka: "თქვენი ყველა სატრანსპორტო საჭიროება ორგანიზებულია უპრობლემო მოგზაურობის გამოცდილებისთვის"
                    })}
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                    <BedDouble className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    {t({
                      tr: "Özel seçilmiş konaklama seçenekleri ile kendinizi evinizdeymiş gibi hissedin",
                      en: "Feel at home with specially selected accommodation options",
                      ru: "Почувствуйте себя как дома с специально подобранными вариантами проживания",
                      ka: "იგრძენით თავი სახლში სპეციალურად შერჩეული საცხოვრებელი ვარიანტებით"
                    })}
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                    <Utensils className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    {t({
                      tr: "Tedaviniz dışında yerel kültürü deneyimlemeniz için özel etkinlikler",
                      en: "Special activities for you to experience the local culture beyond your treatment",
                      ru: "Специальные мероприятия, чтобы вы могли познакомиться с местной культурой помимо лечения",
                      ka: "სპეციალური აქტივობები ადგილობრივი კულტურის გასაცნობად თქვენი მკურნალობის გარდა"
                    })}
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    {t({
                      tr: "Ülkenize ve kültürünüze özel olarak tasarlanmış programlar",
                      en: "Programs specifically designed for your country and culture",
                      ru: "Программы, специально разработанные для вашей страны и культуры",
                      ka: "პროგრამები სპეციალურად შექმნილია თქვენი ქვეყნისა და კულტურისთვის"
                    })}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {t({
                  tr: "Paketlerimiz Ne İçerir?",
                  en: "What Our Packages Include",
                  ru: "Что Включают Наши Пакеты",
                  ka: "რას მოიცავს ჩვენი პაკეტები"
                })}
              </h2>
              <p className="mb-3">
                {t({
                  tr: "Her paket aşağıdaki hizmetleri içerir:",
                  en: "Each package includes the following services:",
                  ru: "Каждый пакет включает следующие услуги:",
                  ka: "თითოეული პაკეტი მოიცავს შემდეგ სერვისებს:"
                })}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  {t({
                    tr: "Seçtiğiniz saç ekimi veya diğer tedaviler",
                    en: "Your chosen hair transplantation or other treatments",
                    ru: "Выбранная вами трансплантация волос или другие процедуры",
                    ka: "თქვენი არჩეული თმის გადანერგვა ან სხვა მკურნალობები"
                  })}
                </li>
                <li>
                  {t({
                    tr: "Konaklama (oteliniz veya apartmanınız)",
                    en: "Accommodation (your hotel or apartment)",
                    ru: "Проживание (ваш отель или квартира)",
                    ka: "საცხოვრებელი (თქვენი სასტუმრო ან ბინა)"
                  })}
                </li>
                <li>
                  {t({
                    tr: "Havaalanı ve klinik transferleri",
                    en: "Airport and clinic transfers",
                    ru: "Трансферы из аэропорта и в клинику",
                    ka: "აეროპორტისა და კლინიკის ტრანსფერები"
                  })}
                </li>
                <li>
                  {t({
                    tr: "Kültürel deneyimler ve aktiviteler",
                    en: "Cultural experiences and activities",
                    ru: "Культурные впечатления и мероприятия",
                    ka: "კულტურული გამოცდილება და აქტივობები"
                  })}
                </li>
                <li>
                  {t({
                    tr: "Dilinizi konuşan kişisel rehber",
                    en: "Personal guide who speaks your language",
                    ru: "Персональный гид, говорящий на вашем языке",
                    ka: "პირადი გიდი, რომელიც საუბრობს თქვენს ენაზე"
                  })}
                </li>
                <li>
                  {t({
                    tr: "7/24 destek ve bakım hizmeti",
                    en: "24/7 support and care service",
                    ru: "Поддержка и уход 24/7",
                    ka: "24/7 მხარდაჭერა და მოვლის სერვისი"
                  })}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Country filter */}
        {countryOptions.length > 0 && (
          <div className="mb-8">
            <CountryFilter 
              options={countryOptions}
              selectedCountry={selectedCountry}
              onChange={setSelectedCountry}
            />
          </div>
        )}

        {isLoading ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              {t({
                tr: "Paketler yükleniyor...",
                en: "Loading packages...",
                ru: "Загрузка пакетов...",
                ka: "პაკეტების ჩატვირთვა..."
              })}
            </p>
          </div>
        ) : filteredPackages && filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl font-medium">
              {t({
                tr: "Bu kriterlere uygun paket bulunamadı",
                en: "No packages found matching these criteria",
                ru: "Не найдено пакетов, соответствующих этим критериям",
                ka: "ამ კრიტერიუმების შესაბამისი პაკეტები ვერ მოიძებნა"
              })}
            </p>
            {selectedCountry && (
              <button 
                className="mt-4 text-primary hover:underline"
                onClick={() => setSelectedCountry(null)}
              >
                {t({
                  tr: "Tüm paketleri göster",
                  en: "Show all packages",
                  ru: "Показать все пакеты",
                  ka: "ყველა პაკეტის ჩვენება"
                })}
              </button>
            )}
          </div>
        )}

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            {t({
              tr: "Özel İhtiyaçlarınız mı Var?",
              en: "Have Special Requirements?",
              ru: "Есть Особые Требования?",
              ka: "გაქვთ სპეციალური მოთხოვნები?"
            })}
          </h2>
          <p className="mb-4">
            {t({
              tr: "Listelenen paketlerimizin dışında özel ihtiyaçlarınız varsa, sizin için tamamen kişiselleştirilmiş bir seyahat ve tedavi planı oluşturabiliriz.",
              en: "If you have special requirements beyond our listed packages, we can create a completely customized travel and treatment plan for you.",
              ru: "Если у вас есть особые требования, выходящие за рамки наших перечисленных пакетов, мы можем создать полностью индивидуальный план путешествия и лечения для вас.",
              ka: "თუ გაქვთ სპეციალური მოთხოვნები ჩვენი ჩამოთვლილი პაკეტების გარდა, ჩვენ შეგვიძლია შევქმნათ სრულიად მორგებული მოგზაურობისა და მკურნალობის გეგმა თქვენთვის."
            })}
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition"
          >
            {t({
              tr: "Bizimle İletişime Geçin",
              en: "Contact Us",
              ru: "Свяжитесь с Нами",
              ka: "დაგვიკავშირდით"
            })}
          </Link>
        </div>
      </div>
    </>
  );
};

export default PackagesPage;