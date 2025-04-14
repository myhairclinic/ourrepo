import { Language } from "@shared/types";

// Admin panel için çeviri kayıtları
type LanguageMap = {
  [Language.Turkish]: string;
  [Language.English]: string;
  [Language.Russian]: string;
  [Language.Georgian]: string;
};

// Admin panel çevirileri (doğrudan bileşenlerde kullanım için dışa aktarıldı)
export const adminTranslations: Record<string, LanguageMap> = {
  // Genel ayarlar sekmesi
  "admin.settings.tabs.general": {
    [Language.Turkish]: "Genel",
    [Language.English]: "General",
    [Language.Russian]: "Общие",
    [Language.Georgian]: "ზოგადი"
  },
  "admin.settings.tabs.contact": {
    [Language.Turkish]: "İletişim",
    [Language.English]: "Contact",
    [Language.Russian]: "Контакты",
    [Language.Georgian]: "კონტაქტი"
  },
  "admin.settings.tabs.security": {
    [Language.Turkish]: "Güvenlik",
    [Language.English]: "Security",
    [Language.Russian]: "Безопасность",
    [Language.Georgian]: "უსაფრთხოება"
  },
  "admin.settings.tabs.seo": {
    [Language.Turkish]: "SEO",
    [Language.English]: "SEO",
    [Language.Russian]: "SEO",
    [Language.Georgian]: "SEO"
  },
  "admin.settings.tabs.language": {
    [Language.Turkish]: "Dil",
    [Language.English]: "Language",
    [Language.Russian]: "Язык",
    [Language.Georgian]: "ენა"
  },
  "admin.settings.tabs.telegram": {
    [Language.Turkish]: "Telegram",
    [Language.English]: "Telegram",
    [Language.Russian]: "Телеграм",
    [Language.Georgian]: "ტელეგრამი"
  },
  
  // Genel Ayarlar
  "admin.settings.general.title": {
    [Language.Turkish]: "Genel Site Ayarları",
    [Language.English]: "General Site Settings",
    [Language.Russian]: "Общие Настройки Сайта",
    [Language.Georgian]: "ვებსაიტის ზოგადი პარამეტრები"
  },
  "admin.settings.general.description": {
    [Language.Turkish]: "Sitenin temel bilgilerini ve genel görünüm ayarlarını düzenleyin.",
    [Language.English]: "Edit the basic information and general appearance settings of the site.",
    [Language.Russian]: "Редактируйте основную информацию и общие настройки внешнего вида сайта.",
    [Language.Georgian]: "შეცვალეთ საიტის ძირითადი ინფორმაცია და ზოგადი გარეგნობის პარამეტრები."
  },
  "admin.settings.general.siteName": {
    [Language.Turkish]: "Site Adı",
    [Language.English]: "Site Name",
    [Language.Russian]: "Название Сайта",
    [Language.Georgian]: "საიტის სახელი"
  },
  "admin.settings.general.siteName.description": {
    [Language.Turkish]: "Sitenin başlık çubuğunda ve meta etiketlerinde görünecek ad.",
    [Language.English]: "The name that will appear in the title bar and meta tags of the site.",
    [Language.Russian]: "Название, которое будет отображаться в заголовке и мета-тегах сайта.",
    [Language.Georgian]: "სახელი, რომელიც გამოჩნდება საიტის სათაურის ზოლში და მეტა ტეგებში."
  },
  
  // Form işlemleri
  "admin.settings.saveSuccess.title": {
    [Language.Turkish]: "Ayarlar kaydedildi",
    [Language.English]: "Settings saved",
    [Language.Russian]: "Настройки сохранены",
    [Language.Georgian]: "პარამეტრები შენახულია"
  },
  "admin.settings.saveSuccess.description": {
    [Language.Turkish]: "{{section}} ayarları başarıyla güncellendi.",
    [Language.English]: "{{section}} settings have been successfully updated.",
    [Language.Russian]: "Настройки {{section}} успешно обновлены.",
    [Language.Georgian]: "{{section}} პარამეტრები წარმატებით განახლდა."
  },
  "admin.settings.saveError.title": {
    [Language.Turkish]: "Ayarlar kaydedilemedi",
    [Language.English]: "Settings could not be saved",
    [Language.Russian]: "Настройки не могут быть сохранены",
    [Language.Georgian]: "პარამეტრების შენახვა ვერ მოხერხდა"
  },
  "admin.settings.saveError.description": {
    [Language.Turkish]: "{{section}} ayarları güncellenirken bir hata oluştu.",
    [Language.English]: "An error occurred while updating {{section}} settings.",
    [Language.Russian]: "Произошла ошибка при обновлении настроек {{section}}.",
    [Language.Georgian]: "{{section}} პარამეტრების განახლებისას მოხდა შეცდომა."
  },
  
  // Dil Ayarları
  "admin.settings.language.title": {
    [Language.Turkish]: "Dil ve Çeviri Ayarları",
    [Language.English]: "Language and Translation Settings",
    [Language.Russian]: "Настройки Языка и Перевода",
    [Language.Georgian]: "ენისა და თარგმანის პარამეტრები"
  },
  "admin.settings.language.description": {
    [Language.Turkish]: "Site dillerini ve çeviri özelliklerini yönetin.",
    [Language.English]: "Manage site languages and translation features.",
    [Language.Russian]: "Управляйте языками сайта и функциями перевода.",
    [Language.Georgian]: "მართეთ საიტის ენები და თარგმანის ფუნქციები."
  },
  "admin.settings.language.defaultLanguage": {
    [Language.Turkish]: "Varsayılan Dil",
    [Language.English]: "Default Language",
    [Language.Russian]: "Язык по умолчанию",
    [Language.Georgian]: "ნაგულისხმევი ენა"
  },
  "admin.settings.language.defaultLanguage.description": {
    [Language.Turkish]: "Kullanıcı tercihi belirtilmediğinde kullanılacak varsayılan site dili.",
    [Language.English]: "The default site language to be used when no user preference is specified.",
    [Language.Russian]: "Язык сайта по умолчанию, который будет использоваться, если не указаны предпочтения пользователя.",
    [Language.Georgian]: "საიტის ნაგულისხმევი ენა, რომელიც გამოყენებული იქნება, როდესაც მომხმარებლის პრეფერენცია არ არის მითითებული."
  },
  "admin.settings.language.translateUserContent": {
    [Language.Turkish]: "Kullanıcı İçeriği Otomatik Çeviri",
    [Language.English]: "Automatic Translation of User Content",
    [Language.Russian]: "Автоматический Перевод Пользовательского Контента",
    [Language.Georgian]: "მომხმარებლის შინაარსის ავტომატური თარგმანი"
  },
  "admin.settings.language.translateUserContent.description": {
    [Language.Turkish]: "Yorumlar gibi kullanıcı içeriklerini seçilen dile otomatik çevirin (ek API entegrasyonu gerektirir).",
    [Language.English]: "Automatically translate user content such as reviews to the selected language (requires additional API integration).",
    [Language.Russian]: "Автоматически переводите пользовательский контент, такой как отзывы, на выбранный язык (требуется дополнительная интеграция API).",
    [Language.Georgian]: "ავტომატურად თარგმნეთ მომხმარებლის შინაარსი, მაგალითად მიმოხილვები, არჩეულ ენაზე (საჭიროებს დამატებით API ინტეგრაციას)."
  },
  
  // Telegram Ayarları
  "admin.settings.telegram.title": {
    [Language.Turkish]: "Telegram Bot Ayarları",
    [Language.English]: "Telegram Bot Settings",
    [Language.Russian]: "Настройки Telegram Бота",
    [Language.Georgian]: "Telegram ბოტის პარამეტრები"
  },
  "admin.settings.telegram.description": {
    [Language.Turkish]: "Telegram bot entegrasyonu ve bildirim ayarlarını yapılandırın.",
    [Language.English]: "Configure Telegram bot integration and notification settings.",
    [Language.Russian]: "Настройте интеграцию Telegram бота и параметры уведомлений.",
    [Language.Georgian]: "დააკონფიგურირეთ Telegram ბოტის ინტეგრაცია და შეტყობინების პარამეტრები."
  },
  "admin.settings.telegram.enableBot": {
    [Language.Turkish]: "Telegram Botu Etkinleştir",
    [Language.English]: "Enable Telegram Bot",
    [Language.Russian]: "Включить Telegram Бота",
    [Language.Georgian]: "Telegram ბოტის ჩართვა"
  },
  "admin.settings.telegram.enableBot.description": {
    [Language.Turkish]: "Randevu bildirimleri ve diğer otomatik mesajlar için Telegram bot entegrasyonunu etkinleştirin.",
    [Language.English]: "Enable Telegram bot integration for appointment notifications and other automated messages.",
    [Language.Russian]: "Включите интеграцию с Telegram ботом для уведомлений о записи на прием и других автоматических сообщений.",
    [Language.Georgian]: "ჩართეთ Telegram ბოტის ინტეგრაცია დანიშვნის შეტყობინებებისა და სხვა ავტომატიზებული შეტყობინებებისთვის."
  }
};

// Admin panel çevirisi almak için fonksiyon
export function getAdminTranslation(
  key: string,
  language: Language,
  replacements?: Record<string, string | number>
): string {
  // Çeviriyi getir
  const translationObj = adminTranslations[key];
  
  if (!translationObj) {
    console.warn(`Admin translation missing for key: "${key}" in language: "${language}"`);
    return key; // Anahtar bulunamadıysa kendisini döndür
  }
  
  let value = translationObj[language];
  
  // Değişkenleri uygula
  if (replacements) {
    for (const [key, replacement] of Object.entries(replacements)) {
      value = value.replace(new RegExp(`{{${key}}}`, 'g'), String(replacement));
    }
  }
  
  return value;
}

// useAdminTranslation kancası
export function useAdminTranslation(language: Language) {
  return {
    t: (key: string, replacements?: Record<string, string | number>) => {
      return getAdminTranslation(key, language, replacements);
    }
  };
}