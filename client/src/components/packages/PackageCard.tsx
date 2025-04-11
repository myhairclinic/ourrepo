import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Package } from "@shared/schema";
import { Language } from "@shared/types";
import { Link } from "wouter";
import { MapPin, Calendar, Users, Briefcase, ArrowRight, Star, Sparkles, Check } from "lucide-react";
import { getTranslation } from "@/lib/translations";
import { Separator } from "@/components/ui/separator";

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { language, addPrefix } = useLanguage();
  
  // Get the title and description based on language
  const title = pkg[`title${language}` as keyof Package] as string;
  const description = pkg[`description${language}` as keyof Package] as string;
  const country = pkg.countryOrigin;
  
  // Get translated country name
  const countryName = getTranslation(`countries.${country.toLowerCase()}`, language) || country;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-300 border-muted">
      <div className="relative overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Label ribbon */}
        <div className="absolute top-4 left-0 bg-primary shadow-md py-1 pl-3 pr-4 text-primary-foreground text-xs font-medium flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {countryName}
          <div className="absolute -right-2 top-0 h-full w-2 bg-primary-foreground/10"></div>
        </div>
        
        {pkg.isFeatured && (
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500 to-amber-600 text-white text-xs py-1 px-3 shadow-md">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {getTranslation("packages.exclusive", language)}
            </div>
          </div>
        )}
        
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {pkg.durationDays} {getTranslation("packages.days", language)}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">{title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{description}</CardDescription>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium">4.9</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="grow pb-2">
        <Separator className="my-3" />
        
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">
              {getTranslation("packages.luxuryAccommodation", language)}
            </span>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">
              {getTranslation("packages.privateTransportation", language)}
            </span>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">
              {getTranslation("packages.tourismActivities", language)}
            </span>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">
              {getTranslation("packages.translationServices", language)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <Button asChild className="w-full gap-2 mt-2 shadow-sm group">
          <Link href={addPrefix(`/packages/${pkg.slug}`)}>
            {getTranslation("packages.viewDetails", language)}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;