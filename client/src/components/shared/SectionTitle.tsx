interface SectionTitleProps {
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({ title, description, center = true }: SectionTitleProps) {
  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      <h2 className="font-heading text-3xl font-bold text-secondary mb-4">{title}</h2>
      {description && (
        <p className="text-neutral-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
