interface SectionTitleProps {
  title: string;
  description?: string;
  subtitle?: string;
  center?: boolean;
  centered?: boolean;
}

export default function SectionTitle({ 
  title, 
  description, 
  subtitle,
  center = true, 
  centered = false 
}: SectionTitleProps) {
  return (
    <div className={`${center || centered ? 'text-center' : ''} mb-8`}>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-3">{title}</h2>
      {subtitle && (
        <p className="text-primary/80 text-lg md:text-xl max-w-2xl mx-auto mb-2">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
