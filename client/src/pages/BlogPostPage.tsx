import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SocialShareButtons from "@/components/shared/SocialShareButtons";
import SocialFollowButtons from "@/components/shared/SocialFollowButtons";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Fetch blog post details
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog/${slug}`],
  });
  
  // Fetch related posts
  const { data: allPosts } = useQuery({
    queryKey: ["/api/blog"],
  });
  
  // Redirect to 404 if post not found
  useEffect(() => {
    if (!isLoading && !post && !error) {
      setLocation("/404");
    }
  }, [isLoading, post, error, setLocation]);
  
  // Get related posts (same category)
  const relatedPosts = post && allPosts 
    ? allPosts.filter((p: any) => p.category === post.category && p.id !== post.id).slice(0, 3)
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
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null; // Will redirect to 404
  }
  
  const title = post[`title${language.toUpperCase()}`];
  const content = post[`content${language.toUpperCase()}`];
  const metaTitle = post[`metaTitle${language.toUpperCase()}`] || title;
  const metaDescription = post[`metaDescription${language.toUpperCase()}`] || post[`summary${language.toUpperCase()}`];
  
  return (
    <>
      <Helmet>
        <title>{metaTitle + META.TITLE_SUFFIX}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={window.location.origin + addPrefix(`/blog/${slug}`)} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + `/tr/blog/${slug}`} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + `/en/blog/${slug}`} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + `/ru/blog/${slug}`} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + `/ka/blog/${slug}`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={post.imageUrl} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${metaTitle}",
              "image": "${post.imageUrl}",
              "datePublished": "${post.createdAt}",
              "dateModified": "${post.updatedAt}",
              "author": {
                "@type": "Organization",
                "name": "MyHair Clinic"
              },
              "publisher": {
                "@type": "Organization",
                "name": "MyHair Clinic",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${window.location.origin}/logo.png"
                }
              },
              "description": "${metaDescription}"
            }
          `}
        </script>
      </Helmet>
      
      <main className="py-16">
        <article className="container mx-auto px-4">
          {/* Header */}
          <header className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4 flex items-center">
                <Link href={addPrefix('/blog')}>
                  <a className="text-primary hover:underline">
                    <i className="fas fa-arrow-left mr-2"></i>
                    {t('blog.backToBlog')}
                  </a>
                </Link>
                <span className="mx-2">|</span>
                <span className="text-neutral-500">
                  <i className="far fa-folder mr-1"></i> 
                  <Link href={addPrefix(`/blog?category=${post.category}`)}>
                    <a className="hover:text-primary">{getCategoryName(post.category)}</a>
                  </Link>
                </span>
              </div>
              
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-secondary">{title}</h1>
              
              <div className="flex items-center text-neutral-500 text-sm mb-6">
                <span>
                  <i className="far fa-calendar mr-1"></i> {formatDate(post.createdAt)}
                </span>
              </div>
              
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={post.imageUrl} 
                  alt={title} 
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            </div>
          </header>
          
          {/* Content */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
          
          {/* Social Share & Follow */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="border-t border-b border-neutral-200 py-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="font-medium mb-2">{t('blog.share')}:</p>
                  <SocialShareButtons 
                    title={title}
                    description={metaDescription}
                    hashtags={["MyHairClinic", "HairTransplant", "Tbilisi"]}
                    showCopyLink={true}
                    size="md"
                  />
                </div>
                <div>
                  <p className="font-medium mb-2">{t('common.follow_us')}:</p>
                  <SocialFollowButtons 
                    showText={false} 
                    size="default"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-secondary mb-8">{t('blog.relatedPosts')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: any) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost[`title${language.toUpperCase()}`]} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        <Link href={addPrefix(`/blog/${relatedPost.slug}`)}>
                          <a className="hover:text-primary">
                            {relatedPost[`title${language.toUpperCase()}`]}
                          </a>
                        </Link>
                      </h3>
                      <div className="flex items-center text-xs text-neutral-500 mb-3">
                        <span className="mr-3">
                          <i className="far fa-calendar mr-1"></i> {formatDate(relatedPost.createdAt)}
                        </span>
                      </div>
                      <Link href={addPrefix(`/blog/${relatedPost.slug}`)}>
                        <a className="inline-flex items-center text-primary font-medium text-sm">
                          {t('common.readMore')}
                          <i className="fas fa-arrow-right ml-1 text-xs"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-4">{t('blog.ctaTitle')}</h2>
            <p className="text-neutral-600 mb-6">{t('blog.ctaDescription')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={addPrefix('/appointment')}>
                <a className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
                  {t('common.bookAppointment')}
                </a>
              </Link>
              <Link href={addPrefix('/contact')}>
                <a className="bg-white hover:bg-neutral-100 text-secondary font-medium px-6 py-3 rounded-md transition duration-200 border border-neutral-200">
                  {t('common.contactUs')}
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
