import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Package } from "@shared/schema";
import { Link } from "wouter";
import { MapPin, Calendar, Users, Briefcase, ArrowRight } from "lucide-react";

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { language, addPrefix } = useLanguage();
  
  // Get the title and description based on language
  const title = pkg[`title${language}` as keyof Package] as string;
  const description = pkg[`description${language}` as keyof Package] as string;
  const country = pkg.countryOrigin;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {pkg.isFeatured && (
          <Badge className="absolute top-2 right-2 bg-primary text-white">
            {language === 'TR' ? 'Öne Çıkan' :
             language === 'EN' ? 'Featured' :
             language === 'RU' ? 'Рекомендуемый' : 'გამორჩეული'}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {country}
          </Badge>
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {pkg.durationDays} {
              language === 'TR' ? 'gün' :
              language === 'EN' ? 'days' :
              language === 'RU' ? 'дней' : 'დღე'
            }
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="grow pb-2">
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {language === 'TR' ? 'Konaklama dahil' :
               language === 'EN' ? 'Accommodation included' :
               language === 'RU' ? 'Включено проживание' : 'საცხოვრებელი შედის'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>
              {language === 'TR' ? 'Transfer dahil' :
               language === 'EN' ? 'Transfer included' :
               language === 'RU' ? 'Включен трансфер' : 'ტრანსფერი შედის'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <Button asChild className="w-full gap-2 mt-4">
          <Link href={addPrefix(`/packages/${pkg.slug}`)}>
            {language === 'TR' ? 'Detayları Gör' :
             language === 'EN' ? 'View Details' :
             language === 'RU' ? 'Посмотреть детали' : 'დეტალების ნახვა'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;