import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@shared/types';
import { getTranslation } from '@/lib/translations';

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

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCountry === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCountryChange(null)}
        className="rounded-full"
      >
        {getCountryName('ALL')}
      </Button>
      
      {countries.map(country => (
        <Button
          key={country}
          variant={selectedCountry === country ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCountryChange(country)}
          className={cn(
            "rounded-full",
            selectedCountry === country && "bg-primary text-primary-foreground"
          )}
        >
          {getCountryName(country)}
        </Button>
      ))}
    </div>
  );
};

export default CountryFilter;