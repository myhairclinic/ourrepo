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
    <div className="bg-card border rounded-lg p-2.5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1">
          <Filter className="h-3.5 w-3.5 text-primary" />
          <h3 className="font-medium text-sm">
            {getPackageTranslation("packages.filters", language)}
          </h3>
        </div>
        
        {/* Reset filters button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            onCountryChange(null);
            onDurationChange(durationRange);
            onFeaturedChange(false);
            selectedFeatures.forEach(feature => onFeatureChange(feature));
          }}
          className="h-6 px-2 text-xs"
        >
          {getPackageTranslation("packages.resetFilters", language)}
        </Button>
      </div>

      {/* Country filter - More compact flag-only buttons */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            {getPackageTranslation("packages.filterByCountry", language)}:
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          <Button
            variant={selectedCountry === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCountryChange(null)}
            className={cn(
              "rounded-full border border-border h-7 w-7 p-0 flex items-center justify-center",
              selectedCountry === null ? "bg-primary text-primary-foreground" : "bg-card hover:bg-primary/10"
            )}
            title={getPackageTranslation("countries.all", language)}
          >
            <Globe className="h-3.5 w-3.5" />
          </Button>
          
          {countries.map(country => (
            <Button
              key={country}
              variant={selectedCountry === country ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCountryChange(country)}
              className={cn(
                "rounded-full border border-border h-7 w-7 p-0 flex items-center justify-center",
                selectedCountry === country 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card hover:bg-primary/10"
              )}
              title={getPackageTranslation(`countries.${country.toLowerCase()}`, language) || country}
            >
              <span className="text-lg">{getCountryFlag(country)}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Duration slider compact */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">
            {getPackageTranslation("packages.filterByDuration", language)}:
          </p>
          <div className="px-1">
            <Slider
              defaultValue={selectedDuration}
              min={durationRange[0]}
              max={durationRange[1]}
              step={1}
              onValueChange={(values) => onDurationChange([values[0], values[1]] as [number, number])}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{selectedDuration[0]} {getPackageTranslation("packages.days", language)}</span>
              <span>{selectedDuration[1]} {getPackageTranslation("packages.days", language)}</span>
            </div>
          </div>
        </div>

        {/* Features compact */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">
            {getPackageTranslation("packages.filterByFeatures", language)}:
          </p>
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <Checkbox 
                id="featured" 
                checked={isFeaturedOnly}
                onCheckedChange={(checked) => onFeaturedChange(checked as boolean)}
                className="h-3.5 w-3.5"
              />
              <Label htmlFor="featured" className="text-xs cursor-pointer flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500" />
                {getPackageTranslation("packages.featuredOnly", language)}
              </Label>
            </div>
            
            <div className="space-y-1 max-h-[60px] overflow-y-auto pr-1">
              {features.map(feature => (
                <div key={feature} className="flex items-center space-x-1.5">
                  <Checkbox 
                    id={`feature-${feature}`} 
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => onFeatureChange(feature)}
                    className="h-3.5 w-3.5"
                  />
                  <Label 
                    htmlFor={`feature-${feature}`} 
                    className="text-xs cursor-pointer truncate"
                  >
                    {getPackageTranslation(`packages.features.${feature.toLowerCase()}`, language) || feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageFilters;