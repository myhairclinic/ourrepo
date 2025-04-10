import { LanguageContext } from "@/context/LanguageContext";
import { useContext } from "react";

// Custom hook for using language context
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

export default function PageHeader({ title, description, imageUrl }: PageHeaderProps) {
  const { language } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
            )}
          </div>
          
          {imageUrl && (
            <div className="w-full md:w-1/3">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}