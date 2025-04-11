import { useTranslation } from "@/hooks/use-translation";
import { FeaturedPostCard } from "./FeaturedPostCard";
import { Skeleton } from "@/components/ui/skeleton";

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
  getCategoryName: (category: string) => string;
  formatDate: (date: string) => string;
  isLoading: boolean;
}

export function FeaturedPostsSection({
  featuredPosts,
  getCategoryName,
  formatDate,
  isLoading
}: FeaturedPostsSectionProps) {
  const { t } = useTranslation();
  
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{t('blog.featuredPosts')}</h2>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      ) : featuredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {featuredPosts.map(post => (
            <FeaturedPostCard
              key={post.id}
              post={post}
              formatDate={formatDate}
              getCategoryName={getCategoryName}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}