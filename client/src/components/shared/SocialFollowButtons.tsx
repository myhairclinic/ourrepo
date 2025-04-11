import React from 'react';
import { SOCIAL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Language } from '@shared/types';

interface SocialFollowButtonsProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'lg' | 'default' | 'icon';
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  orientation?: 'horizontal' | 'vertical';
  platforms?: ('facebook' | 'instagram' | 'tiktok' | 'whatsapp')[];
}

export function SocialFollowButtons({
  className = '',
  showText = true,
  size = 'default',
  variant = 'outline',
  orientation = 'horizontal',
  platforms = ['facebook', 'instagram', 'tiktok', 'whatsapp'],
}: SocialFollowButtonsProps) {
  const { language } = useLanguage();

  const translations = {
    follow: {
      TR: 'Takip Et',
      EN: 'Follow Us',
      RU: 'Подписаться',
      KA: 'გამოგვყევით'
    },
    followFacebook: {
      TR: 'Facebook\'ta Takip Et',
      EN: 'Follow on Facebook',
      RU: 'Подписаться на Facebook',
      KA: 'გამოგვყევით Facebook-ზე'
    },
    followInstagram: {
      TR: 'Instagram\'da Takip Et',
      EN: 'Follow on Instagram',
      RU: 'Подписаться на Instagram',
      KA: 'გამოგვყევით Instagram-ზე'
    },
    followYoutube: {
      TR: 'YouTube\'da Abone Ol',
      EN: 'Subscribe on YouTube',
      RU: 'Подписаться на YouTube',
      KA: 'გამოიწერეთ YouTube-ზე'
    },
    followTelegram: {
      TR: 'Telegram\'da Takip Et',
      EN: 'Follow on Telegram',
      RU: 'Подписаться на Telegram',
      KA: 'გამოგვყევით Telegram-ზე'
    },
    followTiktok: {
      TR: 'TikTok\'ta Takip Et',
      EN: 'Follow on TikTok',
      RU: 'Подписаться на TikTok',
      KA: 'გამოგვყევით TikTok-ზე'
    }
  };

  const getMessage = (key: keyof typeof translations) => {
    switch (language) {
      case Language.Turkish: return translations[key].TR;
      case Language.English: return translations[key].EN;
      case Language.Russian: return translations[key].RU;
      case Language.Georgian: return translations[key].KA;
      default: return translations[key].EN;
    }
  };

  // Icons for social media platforms
  const FacebookIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="h-5 w-5 fill-current"
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="h-5 w-5 fill-current"
    >
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.352.3-.882.344-1.857.047-1.054.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.047-1.37-.059-4.04-.059zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    </svg>
  );

  const YoutubeIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="h-5 w-5 fill-current"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );

  const TelegramIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="h-5 w-5 fill-current"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.21-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-1.93 1.23-5.46 3.63-.51.35-.99.53-1.41.52-.47-.01-1.36-.26-2.02-.48-.82-.27-1.47-.42-1.42-.89.03-.24.29-.48.79-.73 3.17-1.38 5.29-2.28 6.36-2.72 3.03-1.24 3.66-1.45 4.08-1.46.09 0 .29.02.42.19.11.13.1.31.08.43z" />
    </svg>
  );

  const TiktokIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="h-5 w-5 fill-current"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );

  // WhatsApp icon component
  const WhatsAppIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="h-5 w-5 fill-current"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  // Helper function to get social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <FacebookIcon />;
      case 'instagram': return <InstagramIcon />;
      case 'tiktok': return <TiktokIcon />;
      case 'whatsapp': return <WhatsAppIcon />;
      default: return null;
    }
  };

  // Helper function to get social media URL
  const getSocialUrl = (platform: string) => {
    switch (platform) {
      case 'facebook': return SOCIAL.FACEBOOK;
      case 'instagram': return SOCIAL.INSTAGRAM;
      case 'tiktok': return SOCIAL.TIKTOK;
      case 'whatsapp': return SOCIAL.WHATSAPP;
      default: return '#';
    }
  };

  // Helper function to get button label
  const getButtonLabel = (platform: string) => {
    switch (platform) {
      case 'facebook': return getMessage('followFacebook');
      case 'instagram': return getMessage('followInstagram');
      case 'tiktok': return getMessage('followTiktok');
      case 'whatsapp': 
        return language === Language.Turkish ? 'WhatsApp\'tan Ulaşın' : 
               language === Language.English ? 'Contact on WhatsApp' :
               language === Language.Russian ? 'Связаться в WhatsApp' :
               'დაგვიკავშირდით WhatsApp-ზე';
      default: return getMessage('follow');
    }
  };

  return (
    <div className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} gap-2 ${className}`}>
      {platforms.map((platform) => (
        <Button
          key={platform}
          variant={variant}
          size={size}
          asChild
          className="flex items-center gap-2"
        >
          <a href={getSocialUrl(platform)} target="_blank" rel="noopener noreferrer">
            {getSocialIcon(platform)}
            {showText && <span>{getButtonLabel(platform)}</span>}
          </a>
        </Button>
      ))}
    </div>
  );
}

export default SocialFollowButtons;