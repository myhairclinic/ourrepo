import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@shared/types';
import { getTranslation } from '@/lib/translations';
import { MapPin, Check, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CountryFilterProps {
  countries: string[];
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
}) => {
  const { language } = useLanguage();

  // Get country name based on country code and current language
  const getCountryName = (code: string) => {
    // Handle special case for "ALL"
    if (code === 'ALL') {
      return getTranslation("countries.all", language);
    }
    
    // Get translation for country code
    return getTranslation(`countries.${code.toLowerCase()}`, language) || code;
  };
  
  // Get country flag emoji based on country code
  const getCountryFlag = (code: string): string => {
    if (code === 'ALL') return '🌎';
    
    const flagMap: Record<string, string> = {
      'TR': '🇹🇷',
      'RU': '🇷🇺',
      'UA': '🇺🇦',
      'AZ': '🇦🇿',
      'IR': '🇮🇷',
      'EU': '🇪🇺',
      'SA': '🇸🇦',
      'AE': '🇦🇪',
      'IQ': '🇮🇶',
    };
    
    return flagMap[code] || '🏳️';
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm">
          {getTranslation("packages.originCountry", language)}:
        </span>
      </div>
      
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
          {getCountryName('ALL')}
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
            {getCountryName(country)}
            {selectedCountry === country && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 rounded-full w-4 h-4 flex items-center justify-center">
                <Check className="h-2.5 w-2.5" />
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CountryFilter;