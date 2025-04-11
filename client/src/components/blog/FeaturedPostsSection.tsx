import { FeaturedPostCard } from "./FeaturedPostCard";
import { useTranslation } from "@/hooks/use-translation";

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
  isLoading?: boolean;
}

export function FeaturedPostsSection({
  featuredPosts,
  getCategoryName,
  formatDate,
  isLoading = false
}: FeaturedPostsSectionProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">{t('blog.featuredPosts')}</h2>
        <div className="h-[320px] rounded-lg bg-muted animate-pulse" />
      </div>
    );
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-6">{t('blog.featuredPosts')}</h2>
      {featuredPosts.length > 0 && (
        <FeaturedPostCard 
          post={featuredPosts[0]}
          getCategoryName={getCategoryName}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}