import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { SOCIAL } from '@/lib/constants';
import { Language } from '@shared/types';

interface SocialFeedWidgetProps {
  className?: string;
  height?: number;
  showTabs?: boolean;
  defaultTab?: 'instagram' | 'facebook';
  showTitle?: boolean;
}

export function SocialFeedWidget({
  className = '',
  height = 500,
  showTabs = true,
  defaultTab = 'instagram',
  showTitle = true,
}: SocialFeedWidgetProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const instagramContainerRef = useRef<HTMLDivElement>(null);
  const facebookContainerRef = useRef<HTMLDivElement>(null);
  
  const translations = {
    title: {
      TR: 'Sosyal Medya',
      EN: 'Social Media',
      RU: 'Социальные сети',
      KA: 'სოციალური მედია'
    },
    instagram: {
      TR: 'Instagram',
      EN: 'Instagram',
      RU: 'Инстаграм',
      KA: 'ინსტაგრამი'
    },
    facebook: {
      TR: 'Facebook',
      EN: 'Facebook',
      RU: 'Фейсбук',
      KA: 'ფეისბუქი'
    },
    loading: {
      TR: 'Yükleniyor...',
      EN: 'Loading...',
      RU: 'Загрузка...',
      KA: 'იტვირთება...'
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

  // Get Instagram username from URL
  const getInstagramUsername = () => {
    const instagramUrl = SOCIAL.INSTAGRAM;
    const match = instagramUrl.match(/instagram\.com\/([^/?]+)/);
    return match ? match[1] : 'myhairclinic';
  };

  // Get Facebook page name from URL
  const getFacebookPageName = () => {
    const facebookUrl = SOCIAL.FACEBOOK;
    const match = facebookUrl.match(/facebook\.com\/([^/?]+)/);
    return match ? match[1] : 'myhairclinic';
  };

  // Load Instagram widget
  useEffect(() => {
    const loadInstagramWidget = () => {
      if (activeTab === 'instagram' && instagramContainerRef.current) {
        const username = getInstagramUsername();
        
        // Clear previous content
        instagramContainerRef.current.innerHTML = '';
        
        // Create container for Instagram feed
        const container = document.createElement('div');
        container.className = 'instagram-media';
        container.setAttribute('data-instgrm-captioned', '');
        container.setAttribute('data-instgrm-permalink', `https://www.instagram.com/${username}/`);
        container.setAttribute('data-instgrm-version', '14');
        
        instagramContainerRef.current.appendChild(container);
        
        // Load Instagram embed script
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          setIsLoading(false);
        } else {
          const script = document.createElement('script');
          script.src = '//www.instagram.com/embed.js';
          script.async = true;
          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
              setIsLoading(false);
            }
          };
          document.body.appendChild(script);
        }
      }
    };

    loadInstagramWidget();
  }, [activeTab]);

  // Load Facebook widget
  useEffect(() => {
    const loadFacebookWidget = () => {
      if (activeTab === 'facebook' && facebookContainerRef.current) {
        const pageName = getFacebookPageName();
        
        // Clear previous content
        facebookContainerRef.current.innerHTML = '';
        
        // Create Facebook embed
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${pageName}&tabs=timeline&width=340&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
        iframe.width = '100%';
        iframe.height = `${height}px`;
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.allow = 'encrypted-media';
        iframe.scrolling = 'no';
        iframe.frameBorder = '0';
        iframe.setAttribute('allowFullScreen', 'true');
        
        facebookContainerRef.current.appendChild(iframe);
        setIsLoading(false);
      }
    };

    loadFacebookWidget();
  }, [activeTab, height]);

  return (
    <div className={className}>
      {showTitle && (
        <h3 className="text-2xl font-bold mb-4">{getMessage('title')}</h3>
      )}

      {showTabs ? (
        <Tabs 
          defaultValue={defaultTab} 
          onValueChange={(value) => {
            setActiveTab(value);
            setIsLoading(true);
          }}
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="instagram" className="flex-1">{getMessage('instagram')}</TabsTrigger>
            <TabsTrigger value="facebook" className="flex-1">{getMessage('facebook')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instagram">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                {isLoading && activeTab === 'instagram' && (
                  <div className="flex justify-center items-center" style={{ height: `${height}px` }}>
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">{getMessage('loading')}</span>
                  </div>
                )}
                <div 
                  ref={instagramContainerRef} 
                  className="instagram-feed-container"
                  style={{ height: `${height}px`, overflow: 'auto' }}
                ></div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="facebook">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                {isLoading && activeTab === 'facebook' && (
                  <div className="flex justify-center items-center" style={{ height: `${height}px` }}>
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">{getMessage('loading')}</span>
                  </div>
                )}
                <div 
                  ref={facebookContainerRef} 
                  className="facebook-feed-container"
                  style={{ height: `${height}px`, overflow: 'hidden' }}
                ></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-hidden">
            {isLoading && (
              <div className="flex justify-center items-center" style={{ height: `${height}px` }}>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">{getMessage('loading')}</span>
              </div>
            )}
            {activeTab === 'instagram' && (
              <div 
                ref={instagramContainerRef} 
                className="instagram-feed-container"
                style={{ height: `${height}px`, overflow: 'auto' }}
              ></div>
            )}
            {activeTab === 'facebook' && (
              <div 
                ref={facebookContainerRef} 
                className="facebook-feed-container"
                style={{ height: `${height}px`, overflow: 'hidden' }}
              ></div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Add window type declaration for Instagram embed API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default SocialFeedWidget;