import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle";

// Fallback blog data (real data would come from API)
const fallbackBlogPosts = [
  {
    id: 1,
    slug: "hair-transplant-methods-comparison",
    titleTR: "FUE, DHI ve Sapphire Teknikleri Arasındaki Farklar",
    titleEN: "Differences Between FUE, DHI and Sapphire Techniques",
    titleRU: "Различия между методами FUE, DHI и Sapphire",
    titleKA: "განსხვავებები FUE, DHI და Sapphire ტექნიკებს შორის",
    summaryTR: "Saç ekimi teknikleri arasındaki farkları, avantajları ve dezavantajları detaylı olarak inceliyoruz.",
    summaryEN: "We examine in detail the differences, advantages, and disadvantages between hair transplantation techniques.",
    summaryRU: "Мы подробно рассматриваем различия, преимущества и недостатки между методами трансплантации волос.",
    summaryKA: "ჩვენ დეტალურად განვიხილავთ განსხვავებებს, უპირატესობებს და ნაკლოვანებებს თმის გადანერგვის ტექნიკებს შორის.",
    imageUrl: "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "hair-transplant",
    createdAt: new Date("2023-10-15")
  },
  {
    id: 2,
    slug: "prp-treatment-what-you-need-to-know",
    titleTR: "PRP Tedavisi: Saç Dökülmesine Karşı Doğal Çözüm",
    titleEN: "PRP Treatment: Natural Solution Against Hair Loss",
    titleRU: "PRP-терапия: Натуральное решение против выпадения волос",
    titleKA: "PRP მკურნალობა: ბუნებრივი გადაწყვეტა თმის ცვენის წინააღმდეგ",
    summaryTR: "PRP tedavisinin nasıl çalıştığı, uygulama süreci ve saç dökülmesini tedavi etmedeki etkinliği hakkında.",
    summaryEN: "About how PRP treatment works, the application process, and its effectiveness in treating hair loss.",
    summaryRU: "О том, как работает PRP-терапия, процесс применения и ее эффективность в лечении выпадения волос.",
    summaryKA: "იმის შესახებ, თუ როგორ მუშაობს PRP მკურნალობა, გამოყენების პროცესი და მისი ეფექტურობა თმის ცვენის მკურნალობაში.",
    imageUrl: "https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "prp",
    createdAt: new Date("2023-10-02")
  },
  {
    id: 3,
    slug: "tbilisi-travel-guide",
    titleTR: "Saç Ekimi için Tiflis'e Gelirken: Kapsamlı Seyahat Rehberi",
    titleEN: "Coming to Tbilisi for Hair Transplantation: Comprehensive Travel Guide",
    titleRU: "Приезжая в Тбилиси на пересадку волос: Подробное руководство по путешествию",
    titleKA: "თბილისში თმის გადანერგვისთვის ჩამოსვლა: სრული სამოგზაურო გზამკვლევი",
    summaryTR: "Tiflis hakkında bilmeniz gerekenler, ziyaret edilecek yerler ve saç ekimi döneminde konaklama önerileri.",
    summaryEN: "What you need to know about Tbilisi, places to visit, and accommodation recommendations during your hair transplantation period.",
    summaryRU: "Что вам нужно знать о Тбилиси, местах для посещения и рекомендациях по проживанию во время пересадки волос.",
    summaryKA: "რა უნდა იცოდეთ თბილისის შესახებ, მოსანახულებელი ადგილები და საცხოვრებელი რეკომენდაციები თმის გადანერგვის პერიოდში.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "travel",
    createdAt: new Date("2023-09-25")
  }
];

export default function BlogPreview() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Fetch blog posts from API
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ["/api/blog"],
  });
  
  // Use API data if available, otherwise use fallback
  const posts = blogPosts || fallbackBlogPosts;
  
  // Get title based on language
  const getTitle = (post: any) => {
    return post[`title${language.toUpperCase()}`];
  };
  
  // Get summary based on language
  const getSummary = (post: any) => {
    return post[`summary${language.toUpperCase()}`];
  };
  
  // Format date based on language
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(
      language === 'tr' ? 'tr-TR' :
      language === 'ru' ? 'ru-RU' :
      language === 'ka' ? 'ka-KA' :
      'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };
  
  // Get category name based on language
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hair-transplant':
        return language === 'tr' ? 'Saç Ekimi' :
               language === 'ru' ? 'Пересадка волос' :
               language === 'ka' ? 'თმის გადანერგვა' :
               'Hair Transplant';
      case 'prp':
        return 'PRP';
      case 'travel':
        return language === 'tr' ? 'Seyahat' :
               language === 'ru' ? 'Путешествие' :
               language === 'ka' ? 'მოგზაურობა' :
               'Travel';
      default:
        return category;
    }
  };
  
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.blog.title')}
          description={t('home.blog.description')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={post.imageUrl} 
                alt={getTitle(post)} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-xs text-neutral-500 mb-3">
                  <span className="mr-3">
                    <i className="far fa-calendar mr-1"></i> {formatDate(new Date(post.createdAt))}
                  </span>
                  <span>
                    <i className="far fa-folder mr-1"></i> {getCategoryName(post.category)}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  <Link href={addPrefix(`/blog/${post.slug}`)}>
                    <a className="hover:text-primary">
                      {getTitle(post)}
                    </a>
                  </Link>
                </h3>
                <p className="text-neutral-600 mb-4">
                  {getSummary(post)}
                </p>
                <Link href={addPrefix(`/blog/${post.slug}`)}>
                  <a className="inline-flex items-center text-primary font-medium">
                    {t('common.readMore')}
                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href={addPrefix('/blog')}>
            <a className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
              {t('common.viewMore')}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
