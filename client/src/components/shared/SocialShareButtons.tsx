import React from 'react';
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  Share2Icon, 
  CopyIcon, 
  CheckIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { Language } from '@shared/types';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCopyLink?: boolean;
  variant?: 'primary' | 'muted';
  orientation?: 'horizontal' | 'vertical';
}

export function SocialShareButtons({
  url = window.location.href,
  title = document.title,
  description = '',
  hashtags = [],
  size = 'md',
  className = '',
  showCopyLink = true,
  variant = 'primary',
  orientation = 'horizontal',
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const translations = {
    copied: {
      TR: 'Bağlantı kopyalandı!',
      EN: 'Link copied!',
      RU: 'Ссылка скопирована!',
      KA: 'ბმული დაკოპირებულია!'
    },
    copyLink: {
      TR: 'Bağlantıyı kopyala',
      EN: 'Copy link',
      RU: 'Копировать ссылку',
      KA: 'ბმულის კოპირება'
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

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = hashtags.join(',');

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    
    toast({
      title: getMessage('copied'),
      duration: 3000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const getFacebookShareUrl = () => 
    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  
  const getTwitterShareUrl = () => 
    `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${encodedHashtags ? `&hashtags=${encodedHashtags}` : ''}`;
  
  const getLinkedInShareUrl = () => 
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const getWhatsAppShareUrl = () => 
    `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
  
  const getTelegramShareUrl = () => 
    `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;

  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8';
      case 'md': return 'h-10 w-10';
      case 'lg': return 'h-12 w-12';
      default: return 'h-10 w-10';
    }
  };

  const getButtonVariant = () => {
    return variant === 'primary' ? 'default' : 'outline';
  };

  const containerClass = `flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} gap-2 ${className}`;

  return (
    <div className={containerClass}>
      <Button 
        variant={getButtonVariant()}
        size="icon"
        className={getButtonSize()}
        onClick={() => window.open(getFacebookShareUrl(), '_blank')}
        aria-label="Share on Facebook"
      >
        <FacebookIcon className="h-5 w-5" />
      </Button>
      
      <Button 
        variant={getButtonVariant()}
        size="icon"
        className={getButtonSize()}
        onClick={() => window.open(getTwitterShareUrl(), '_blank')}
        aria-label="Share on Twitter"
      >
        <TwitterIcon className="h-5 w-5" />
      </Button>
      
      <Button 
        variant={getButtonVariant()}
        size="icon" 
        className={getButtonSize()}
        onClick={() => window.open(getLinkedInShareUrl(), '_blank')}
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon className="h-5 w-5" />
      </Button>
      
      <Button 
        variant={getButtonVariant()}
        size="icon"
        className={getButtonSize()}
        onClick={() => window.open(getWhatsAppShareUrl(), '_blank')}
        aria-label="Share on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5l-.7 3.5 3.5-.7c1.5.9 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
          <path d="M17 15.2c-.3.7-1.7 1.4-2.3 1.4-.8 0-1.6-.2-2.4-.5-1.3-.5-2.4-1.3-3.3-2.3-1-1-1.9-2.1-2.3-3.3-.5-1.4-.2-2.4.5-3.2.3-.3.7-.5 1.1-.5h.5c.4 0 .8.3 1 .7l.5 1.1c.1.2.1.4 0 .7l-.4.7c-.1.2-.1.4 0 .6.2.6.8 1.2 1.4 1.7.7.6 1.5 1.1 2.4 1.3.2.1.4 0 .6-.1l.7-.4c.2-.1.5-.1.7 0l1.1.5c.4.2.6.6.7 1V15.2z"/>
        </svg>
      </Button>
      
      <Button 
        variant={getButtonVariant()}
        size="icon"
        className={getButtonSize()}
        onClick={() => window.open(getTelegramShareUrl(), '_blank')}
        aria-label="Share on Telegram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21.7 5.3L2.3 11.9c-1.3.4-1.3 1.9 0 2.3l4.3 1.4L18.2 8c.4-.2.8.2.5.5l-7.3 8.8-.3 3c.3.6 1.1.6 1.4.2l2.2-2.1 4.4 3.3c.8.5 1.9 0 2.1-1l2.8-13.6c.3-1.3-.9-2.4-2.3-1.8z"/>
        </svg>
      </Button>
      
      {showCopyLink && (
        <Button 
          variant={getButtonVariant()}
          size="icon"
          className={getButtonSize()}
          onClick={handleCopyToClipboard}
          aria-label={getMessage('copyLink')}
        >
          {copied ? 
            <CheckIcon className="h-5 w-5" /> : 
            <CopyIcon className="h-5 w-5" />
          }
        </Button>
      )}
    </div>
  );
}

export default SocialShareButtons;