import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    const countryNames: Record<Language, Record<string, string>> = {
      [Language.Turkish]: {
        'TR': 'Türkiye',
        'RU': 'Rusya',
        'UA': 'Ukrayna',
        'AZ': 'Azerbaycan',
        'IR': 'İran',
        'EU': 'Avrupa',
        'SA': 'Suudi Arabistan',
        'AE': 'Birleşik Arap Emirlikleri',
        'IQ': 'Irak',
        'ALL': 'Tüm Ülkeler'
      },
      [Language.English]: {
        'TR': 'Turkey',
        'RU': 'Russia',
        'UA': 'Ukraine',
        'AZ': 'Azerbaijan',
        'IR': 'Iran',
        'EU': 'Europe',
        'SA': 'Saudi Arabia',
        'AE': 'United Arab Emirates',
        'IQ': 'Iraq',
        'ALL': 'All Countries'
      },
      [Language.Russian]: {
        'TR': 'Турция',
        'RU': 'Россия',
        'UA': 'Украина',
        'AZ': 'Азербайджан',
        'IR': 'Иран',
        'EU': 'Европа',
        'SA': 'Саудовская Аравия',
        'AE': 'Объединенные Арабские Эмираты',
        'IQ': 'Ирак',
        'ALL': 'Все страны'
      },
      [Language.Georgian]: {
        'TR': 'თურქეთი',
        'RU': 'რუსეთი',
        'UA': 'უკრაინა',
        'AZ': 'აზერბაიჯანი',
        'IR': 'ირანი',
        'EU': 'ევროპა',
        'SA': 'საუდის არაბეთი',
        'AE': 'არაბთა გაერთიანებული საემიროები',
        'IQ': 'ერაყი',
        'ALL': 'ყველა ქვეყანა'
      }
    };

    return countryNames[language]?.[code] || code;
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