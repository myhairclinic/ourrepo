import React from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/hooks/use-language';
import { useTranslation } from '@/lib/translations';
import { SocialFeedWidget } from '@/components/shared/SocialFeedWidget';
import { SocialFollowButtons } from '@/components/shared/SocialFollowButtons';
import { META } from '@/lib/constants';
import { Language } from '@shared/types';

export default function SocialMediaPage() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);

  const pageTitle = {
    TR: 'Sosyal Medya',
    EN: 'Social Media',
    RU: 'Социальные сети',
    KA: 'სოციალური მედია'
  };

  const pageDescription = {
    TR: 'MyHair Clinic\'in sosyal medya hesaplarını takip edin ve güncel gelişmelerden haberdar olun.',
    EN: 'Follow MyHair Clinic\'s social media accounts and stay updated with the latest developments.',
    RU: 'Подписывайтесь на аккаунты MyHair Clinic в социальных сетях и будьте в курсе последних событий.',
    KA: 'გამოიწერეთ MyHair Clinic- ის სოციალური მედიის ანგარიშები და მიიღეთ ინფორმაცია უახლესი მოვლენების შესახებ.'
  };

  const followUsText = {
    TR: 'Bizi Takip Edin',
    EN: 'Follow Us',
    RU: 'Подписывайтесь на нас',
    KA: 'გამოგვყევით'
  };

  const socialFeedTitle = {
    TR: 'Son Paylaşımlarımız',
    EN: 'Our Latest Posts',
    RU: 'Наши последние публикации',
    KA: 'ჩვენი ბოლო პოსტები'
  };

  const getLocalizedTitle = () => {
    switch (language) {
      case Language.Turkish: return pageTitle.TR;
      case Language.English: return pageTitle.EN;
      case Language.Russian: return pageTitle.RU;
      case Language.Georgian: return pageTitle.KA;
      default: return pageTitle.EN;
    }
  };

  const getLocalizedDescription = () => {
    switch (language) {
      case Language.Turkish: return pageDescription.TR;
      case Language.English: return pageDescription.EN;
      case Language.Russian: return pageDescription.RU;
      case Language.Georgian: return pageDescription.KA;
      default: return pageDescription.EN;
    }
  };

  const getLocalizedText = (textObj: Record<string, string>) => {
    switch (language) {
      case Language.Turkish: return textObj.TR;
      case Language.English: return textObj.EN;
      case Language.Russian: return textObj.RU;
      case Language.Georgian: return textObj.KA;
      default: return textObj.EN;
    }
  };

  const fullPageTitle = `${getLocalizedTitle()} ${META.TITLE_SUFFIX}`;

  return (
    <>
      <Helmet>
        <title>{fullPageTitle}</title>
        <meta name="description" content={getLocalizedDescription()} />
      </Helmet>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{getLocalizedTitle()}</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {getLocalizedDescription()}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">{getLocalizedText(followUsText)}</h2>
                <SocialFollowButtons 
                  orientation="vertical" 
                  showText={true} 
                  variant="default" 
                  size="lg" 
                  className="mb-8"
                />

                <div className="bg-muted p-4 rounded-lg mt-8">
                  <h3 className="font-semibold mb-2">{t('common.contact_us')}</h3>
                  <div className="space-y-2 text-sm">
                    <p>{t('common.email')}: info@myhairclinic.com</p>
                    <p>{t('common.phone')}: +995 591 797 664</p>
                    <p>{t('common.whatsapp')}: +995 591 797 664</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">{getLocalizedText(socialFeedTitle)}</h2>
              <SocialFeedWidget 
                height={800} 
                showTabs={true} 
                showTitle={false} 
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}