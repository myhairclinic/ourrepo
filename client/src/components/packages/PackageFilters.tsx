import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@shared/types';
import { getTranslation } from '@/lib/translations';
import { getPackageTranslation } from '@/lib/packageTranslations';
import { MapPin, Check, Globe, Calendar, Star, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export interface PackageFiltersProps {
  countries: string[];
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  durationRange: [number, number];
  selectedDuration: [number, number];
  onDurationChange: (range: [number, number]) => void;
  features: string[];
  selectedFeatures: string[];
  onFeatureChange: (feature: string) => void;
  isFeaturedOnly: boolean;
  onFeaturedChange: (value: boolean) => void;
}

const PackageFilters: React.FC<PackageFiltersProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
  durationRange,
  selectedDuration,
  onDurationChange,
  features,
  selectedFeatures,
  onFeatureChange,
  isFeaturedOnly,
  onFeaturedChange,
}) => {
  const { language } = useLanguage();
  
  // Get country flag emoji based on country code
  const getCountryFlag = (code: string): string => {
    if (code === 'ALL') return '🌎';
    
    const flagMap: Record<string, string> = {
      'TR': '🇹🇷', // Türkiye
      'RU': '🇷🇺', // Rusya
      'UA': '🇺🇦', // Ukrayna
      'AZ': '🇦🇿', // Azerbaycan
      'IR': '🇮🇷', // İran
      'EU': '🇪🇺', // Avrupa Birliği
      'SA': '🇸🇦', // Suudi Arabistan
      'AE': '🇦🇪', // Birleşik Arap Emirlikleri
      'IQ': '🇮🇶', // Irak
      'AM': '🇦🇲', // Ermenistan
      'KZ': '🇰🇿', // Kazakistan
      'BY': '🇧🇾', // Belarus
      'MD': '🇲🇩', // Moldova
      'GR': '🇬🇷', // Yunanistan
      'BG': '🇧🇬', // Bulgaristan
      'RO': '🇷🇴', // Romanya
    };
    
    return flagMap[code] || '🏳️';
  };

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="font-medium">
          {getPackageTranslation("packages.filters", language)}
        </h3>
      </div>

      <Accordion type="multiple" defaultValue={["country", "duration", "features"]}>
        <AccordionItem value="country">
          <AccordionTrigger className="py-3 text-sm">
            {getPackageTranslation("packages.filterByCountry", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCountry === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCountryChange(null)}
                className={cn(
                  "rounded-full border border-border",
                  selectedCountry === null ? "bg-primary text-primary-foreground" : "bg-card hover:bg-primary/10"
                )}
              >
                <Globe className="h-3.5 w-3.5 mr-1.5" />
                {getPackageTranslation("countries.all", language)}
              </Button>
              
              {countries.map(country => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onCountryChange(country)}
                  className={cn(
                    "rounded-full border border-border gap-1.5 relative pr-8 transition-all duration-300",
                    selectedCountry === country 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-card hover:bg-primary/10"
                  )}
                >
                  <span className="mr-1">{getCountryFlag(country)}</span>
                  {getPackageTranslation(`countries.${country.toLowerCase()}`, language) || country}
                  {selectedCountry === country && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 rounded-full w-4 h-4 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger className="py-3 text-sm">
            {getPackageTranslation("packages.filterByDuration", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {selectedDuration[0]} {getPackageTranslation("packages.days", language)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedDuration[1]} {getPackageTranslation("packages.days", language)}
                </span>
              </div>
              
              <Slider
                defaultValue={selectedDuration}
                min={durationRange[0]}
                max={durationRange[1]}
                step={1}
                onValueChange={(values) => onDurationChange([values[0], values[1]] as [number, number])}
                className="my-4"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{getPackageTranslation("packages.shortStay", language)}</span>
                <span>{getPackageTranslation("packages.longStay", language)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="py-3 text-sm">
            {getPackageTranslation("packages.filterByFeatures", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={isFeaturedOnly}
                  onCheckedChange={(checked) => onFeaturedChange(checked as boolean)}
                />
                <Label htmlFor="featured" className="text-sm cursor-pointer flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  {getPackageTranslation("packages.featuredOnly", language)}
                </Label>
              </div>
              
              <div className="pt-2 space-y-2">
                {features.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`feature-${feature}`} 
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={() => onFeatureChange(feature)}
                    />
                    <Label 
                      htmlFor={`feature-${feature}`} 
                      className="text-sm cursor-pointer"
                    >
                      {getPackageTranslation(`packages.features.${feature.toLowerCase()}`, language) || feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Reset filters button */}
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => {
          onCountryChange(null);
          onDurationChange(durationRange);
          onFeaturedChange(false);
          selectedFeatures.forEach(feature => onFeatureChange(feature));
        }}
        className="w-full mt-4 text-sm"
      >
        {getPackageTranslation("packages.resetFilters", language)}
      </Button>
    </div>
  );
};

export default PackageFilters;