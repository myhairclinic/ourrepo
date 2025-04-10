import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
  centered?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  bgImage,
  centered = true,
  actions,
  className,
}) => {
  const headerStyle = bgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }
    : {};

  return (
    <div
      className={cn(
        "py-12 mb-8",
        bgImage && "text-white",
        className
      )}
      style={headerStyle}
    >
      <Container>
        <div
          className={cn(
            "flex flex-col gap-4",
            centered && "items-center text-center",
            actions && "items-center md:flex-row md:justify-between"
          )}
        >
          <div className={cn(centered && "text-center", "max-w-2xl")}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex gap-2 mt-4 md:mt-0">{actions}</div>}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;