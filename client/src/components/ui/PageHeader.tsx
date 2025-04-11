import Container from "./container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  imageUrl,
  className,
}: PageHeaderProps) {
  // Check if it's the packages page to apply special styling
  const isPackagesPage = title.includes("MyHair Clinic Özel Tedavi ve Seyahat Paketleri") || 
                        title.includes("MyHair Clinic Premium Treatment and Travel Packages") || 
                        title.includes("Премиум Пакеты Лечения и Путешествий в MyHair Clinic") || 
                        title.includes("MyHair Clinic-ის პრემიუმ მკურნალობისა და მოგზაურობის პაკეტები");
  
  return (
    <div
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        isPackagesPage ? "bg-gradient-to-r from-blue-500/90 via-primary/90 to-purple-500/90" : "bg-muted",
        imageUrl ? "bg-cover bg-center bg-no-repeat" : "",
        className
      )}
      style={
        imageUrl && !isPackagesPage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${imageUrl})`,
            }
          : isPackagesPage && imageUrl ? {
              backgroundImage: `linear-gradient(rgba(0, 20, 80, 0.7), rgba(20, 0, 80, 0.7)), url(${imageUrl})`,
            } : {}
      }
    >
      {/* Decorative elements for packages page */}
      {isPackagesPage && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full -ml-48 -mb-48 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-dots.svg')] bg-center"></div>
        </>
      )}
      
      <Container className="relative z-10">
        <div className={cn(
          "max-w-3xl",
          isPackagesPage ? "text-white text-center mx-auto" : imageUrl ? "text-white" : ""
        )}>
          {isPackagesPage ? (
            <>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 drop-shadow-md">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">{title}</span>
              </h1>
              {description && (
                <p className="text-lg md:text-xl text-blue-50 drop-shadow-md max-w-2xl mx-auto">
                  {description}
                </p>
              )}
              <div className="mt-8 inline-block">
                <div className="h-1 w-32 bg-white/30 rounded-full mx-auto"></div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {title}
              </h1>
              {description && (
                <p className={cn("text-lg md:text-xl", imageUrl ? "text-gray-200" : "text-muted-foreground")}>
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}