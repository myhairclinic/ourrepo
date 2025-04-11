import { useTranslation } from "@/hooks/use-translation";
import { FeaturedPostCard } from "./FeaturedPostCard";
import { Skeleton } from "@/components/ui/skeleton";

// Blog Post tipi
interface BlogPost {
  id: number;
  slug: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  contentTR: string;
  contentEN: string;
  contentRU: string;
  contentKA: string;
  summaryTR: string;
  summaryEN: string;
  summaryRU: string;
  summaryKA: string;
  imageUrl: string;
  author: string;
  authorTitle: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

interface FeaturedPostsSectionProps {
  featuredPosts: BlogPost[];
  formatDate: (date: string) => string;
  getCategoryName: (category: string) => string;
  isLoading: boolean;
}

export function FeaturedPostsSection({
  featuredPosts,
  formatDate,
  getCategoryName,
  isLoading
}: FeaturedPostsSectionProps) {
  const { t } = useTranslation();
  
  // Blog gönderisi yüklenirken görünecek iskelet yükleyici
  const renderSkeletons = () => (
    <div className="space-y-3">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-[450px] w-full rounded-xl" />
    </div>
  );
  
  // Öne çıkan yazı yoksa hiçbir şey gösterme
  if (featuredPosts.length === 0 && !isLoading) return null;
  
  return (
    <section className="mb-14 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-full">
          {t('blog.featuredPosts')}
        </h2>
        <div className="h-px flex-1 bg-border mx-6 opacity-50 hidden sm:block"></div>
      </div>
      
      {isLoading ? (
        renderSkeletons()
      ) : (
        <div className="space-y-8">
          {featuredPosts.map((post) => (
            <FeaturedPostCard
              key={post.id}
              post={post}
              formatDate={formatDate}
              getCategoryName={getCategoryName}
            />
          ))}
        </div>
      )}
    </section>
  );
}