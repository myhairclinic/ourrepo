import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

export default function BlogPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch blog posts
  const { data: allBlogPosts, isLoading } = useQuery({
    queryKey: ["/api/blog"],
  });
  
  // Filter blog posts by category if selected
  const filteredPosts = selectedCategory 
    ? allBlogPosts?.filter((post: any) => post.category === selectedCategory)
    : allBlogPosts;
  
  // Get unique categories
  const categories = allBlogPosts 
    ? [...new Set(allBlogPosts.map((post: any) => post.category))]
    : [];
  
  // Format date based on language
  const formatDate = (date: string) => {
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
      case 'eyebrow-transplant':
        return language === 'tr' ? 'Kaş Ekimi' :
               language === 'ru' ? 'Пересадка бровей' :
               language === 'ka' ? 'წარბების გადანერგვა' :
               'Eyebrow Transplant';
      case 'beard-transplant':
        return language === 'tr' ? 'Sakal Ekimi' :
               language === 'ru' ? 'Пересадка бороды' :
               language === 'ka' ? 'წვერის გადანერგვა' :
               'Beard Transplant';
      case 'prp':
        return 'PRP';
      case 'travel':
        return language === 'tr' ? 'Seyahat' :
               language === 'ru' ? 'Путешествие' :
               language === 'ka' ? 'მოგზაურობა' :
               'Travel';
      case 'clinic':
        return language === 'tr' ? 'Klinik' :
               language === 'ru' ? 'Клиника' :
               language === 'ka' ? 'კლინიკა' :
               'Clinic';
      default:
        return category;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{t('blog.title') + META.TITLE_SUFFIX}</title>
        <meta name="description" content={t('blog.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/blog")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/blog"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/blog"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/blog"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/blog"} />
      </Helmet>
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('blog.title')}
            description={t('blog.description')}
          />
          
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-12 flex justify-center flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-md border ${selectedCategory === null ? 'bg-primary text-white border-primary' : 'border-neutral-200 hover:bg-neutral-100'}`}
                onClick={() => setSelectedCategory(null)}
              >
                {t('blog.allCategories')}
              </button>
              {categories.map((category: string) => (
                <button 
                  key={category}
                  className={`px-4 py-2 rounded-md border ${selectedCategory === category ? 'bg-primary text-white border-primary' : 'border-neutral-200 hover:bg-neutral-100'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryName(category)}
                </button>
              ))}
            </div>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {/* Blog Posts Grid */}
          {!isLoading && filteredPosts && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={post.imageUrl} 
                    alt={post[`title${language.toUpperCase()}`]} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-xs text-neutral-500 mb-3">
                      <span className="mr-3">
                        <i className="far fa-calendar mr-1"></i> {formatDate(post.createdAt)}
                      </span>
                      <span>
                        <i className="far fa-folder mr-1"></i> {getCategoryName(post.category)}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3">
                      <Link href={addPrefix(`/blog/${post.slug}`)}>
                        <a className="hover:text-primary">
                          {post[`title${language.toUpperCase()}`]}
                        </a>
                      </Link>
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {post[`summary${language.toUpperCase()}`]}
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
          )}
          
          {/* Empty State */}
          {!isLoading && (!filteredPosts || filteredPosts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-neutral-500">{t('blog.noPosts')}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
