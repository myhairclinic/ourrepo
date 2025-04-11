import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@shared/types';
import { getTranslation } from '@/lib/translations';
import { MapPin, Check, Globe, Calendar, Star, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import CountryFilter from './CountryFilter';

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

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="font-medium">
          {getTranslation("packages.filters", language)}
        </h3>
      </div>

      <Accordion type="multiple" defaultValue={["country", "duration", "features"]}>
        <AccordionItem value="country">
          <AccordionTrigger className="py-3 text-sm">
            {getTranslation("packages.filterByCountry", language)}
          </AccordionTrigger>
          <AccordionContent>
            <CountryFilter 
              countries={countries} 
              selectedCountry={selectedCountry} 
              onCountryChange={onCountryChange} 
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger className="py-3 text-sm">
            {getTranslation("packages.filterByDuration", language)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {selectedDuration[0]} {getTranslation("packages.days", language)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedDuration[1]} {getTranslation("packages.days", language)}
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
                <span>{getTranslation("packages.shortStay", language)}</span>
                <span>{getTranslation("packages.longStay", language)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="py-3 text-sm">
            {getTranslation("packages.filterByFeatures", language)}
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
                  {getTranslation("packages.featuredOnly", language)}
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
                      {getTranslation(`packages.features.${feature.toLowerCase()}`, language) || feature}
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
        {getTranslation("packages.resetFilters", language)}
      </Button>
    </div>
  );
};

export default PackageFilters;