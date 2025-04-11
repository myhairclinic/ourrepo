interface SectionTitleProps {
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({ title, description, center = true }: SectionTitleProps) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-8`}>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-3">{title}</h2>
      {description && (
        <p className="text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
