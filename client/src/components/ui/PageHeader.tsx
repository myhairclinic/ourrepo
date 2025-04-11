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
  return (
    <div
      className={cn(
        "bg-muted relative py-16 md:py-24",
        imageUrl ? "bg-cover bg-center bg-no-repeat" : "",
        className
      )}
      style={
        imageUrl
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${imageUrl})`,
            }
          : {}
      }
    >
      <Container>
        <div className={cn("max-w-3xl", imageUrl ? "text-white" : "")}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className={cn("text-lg md:text-xl", imageUrl ? "text-gray-200" : "text-muted-foreground")}>
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}