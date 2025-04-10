import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

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
  return (
    <div
      className={cn(
        'relative py-12 md:py-20 mb-10 bg-muted/40',
        bgImage ? 'bg-cover bg-center' : '',
        className
      )}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      {bgImage && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      )}
      <Container className="relative z-10">
        <div
          className={cn(
            'flex flex-col gap-4',
            centered && 'text-center items-center'
          )}
        >
          <h1 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold',
            bgImage ? 'text-white' : 'text-foreground'
          )}>
            {title}
          </h1>
          {description && (
            <p className={cn(
              'text-lg md:text-xl max-w-3xl',
              bgImage ? 'text-white/90' : 'text-muted-foreground'
            )}>
              {description}
            </p>
          )}
          {actions && (
            <div className="flex flex-wrap gap-4 mt-4">
              {actions}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;