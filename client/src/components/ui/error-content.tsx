import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

interface ErrorContentProps {
  message: string;
}

export default function ErrorContent({ message }: ErrorContentProps) {
  const { language, addPrefix } = useLanguage();
  const [, setLocation] = useLocation();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    setLocation(addPrefix("/"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] max-w-3xl mx-auto px-4 py-12 text-center">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold tracking-tight mb-2">
        {getTranslation("common.error", language)}
      </h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleGoBack}>
          {getTranslation("common.goBack", language)}
        </Button>
        <Button onClick={handleGoHome}>
          {getTranslation("common.goHome", language)}
        </Button>
      </div>
    </div>
  );
}