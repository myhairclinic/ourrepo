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
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{t('blog.featuredPosts')}</h2>
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