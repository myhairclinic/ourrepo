import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { useTitle } from "@/hooks/use-title";
import { Link } from "wouter";
import { Package } from "@shared/schema";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PackagesPage() {
  const { t, language } = useTranslation();
  const { setTitle } = useTitle();
  
  useEffect(() => {
    setTitle(t("packages.title"));
  }, [setTitle, t]);
  
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
    staleTime: 60000,
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!packages || packages.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">{t("packages.title")}</h1>
        <p className="text-lg text-gray-600">{t("packages.empty")}</p>
      </div>
    );
  }
  
  // Sort packages by order field
  const sortedPackages = [...packages].sort((a, b) => a.order - b.order);
  
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">{t("packages.title")}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("packages.subtitle")}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPackages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">{t("packages.callToAction")}</p>
          <Link href={`/${language}/appointment`}>
            <Button size="lg" className="px-8">
              {t("packages.bookNow")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

type PackageCardProps = {
  packageData: Package;
};

function PackageCard({ packageData }: PackageCardProps) {
  const { language } = useTranslation();
  
  // Get content based on current language
  const title = packageData[`title${language.toUpperCase()}` as keyof Package] as string;
  const description = packageData[`description${language.toUpperCase()}` as keyof Package] as string;
  const content = packageData[`content${language.toUpperCase()}` as keyof Package] as string;
  
  // Split content by newlines and convert to array of features
  const features = content.split('\n').filter(line => line.trim() !== '');
  
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden border-2 hover:border-primary">
      {packageData.imageUrl && (
        <div className="w-full h-52 overflow-hidden">
          <img 
            src={packageData.imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            €{packageData.price}
          </Badge>
        </div>
        <CardDescription className="text-sm mt-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-2 border-t">
        <Link href={`/${language}/appointment`}>
          <Button variant="outline" className="w-full">
            {language === 'tr' ? 'Randevu Al' : 
             language === 'en' ? 'Book Now' : 
             language === 'ru' ? 'Записаться' : 'დაჯავშნა'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}