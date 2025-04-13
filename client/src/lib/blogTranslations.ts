// Dil enum yapısı
export enum Language {
  Turkish = "tr",
  English = "en",
  Russian = "ru",
  Georgian = "ka",
  Azerbaijani = "az",
  Kazakh = "kz",
  Persian = "ir"
}

type LanguageMap = Record<Language, string>;

/**
 * Blog sayfası için özel çeviri sistemi
 * 
 * @param key - Çeviri anahtarı
 * @param language - Dil
 * @param replacements - Değiştirilecek değerler
 * @returns String olarak çevrilmiş metin
 */
export function getBlogTranslation(
  key: string,
  language: Language,
  replacements?: Record<string, string | number>
): string {
  // Ana anahtarı seçilen dile göre çeviriyoruz
  const result = blogTranslations[key]?.[language] || key;
  
  // Eğer replacements varsa, {placeholder} formatındaki tüm yer tutucuları değiştiriyoruz
  if (replacements) {
    return applyReplacements(result, replacements);
  }
  
  return result;
}

/**
 * Metin içindeki yer tutucuları değiştirir
 */
function applyReplacements(text: string, replacements?: Record<string, string | number>): string {
  if (!replacements) return text;
  
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  
  return result;
}

// Blog çevirileri
export const blogTranslations: Record<string, LanguageMap> = {
  // Sayfa başlıkları
  "blog.title": {
    [Language.Turkish]: "Blog - MyHair Clinic",
    [Language.English]: "Blog - MyHair Clinic",
    [Language.Russian]: "Блог - MyHair Clinic",
    [Language.Georgian]: "ბლოგი - MyHair Clinic",
    [Language.Azerbaijani]: "Bloq - MyHair Clinic",
    [Language.Kazakh]: "Блог - MyHair Clinic",
    [Language.Persian]: "بلاگ - MyHair Clinic"
  },
  "blog.description": {
    [Language.Turkish]: "Saç ekimi, bakımı ve tedavisi hakkında en son güncellemeler, ipuçları ve makaleler",
    [Language.English]: "Latest updates, tips and articles about hair transplantation, care and treatment",
    [Language.Russian]: "Последние обновления, советы и статьи о трансплантации волос, уходе и лечении",
    [Language.Georgian]: "უახლესი განახლებები, რჩევები და სტატიები თმის გადანერგვის, მოვლისა და მკურნალობის შესახებ",
    [Language.Azerbaijani]: "Saç əkimi, qulluğu və müalicəsi haqqında ən son yeniləmələr, məsləhətlər və məqalələr",
    [Language.Kazakh]: "Шаш трансплантациясы, күтімі және емделуі туралы соңғы жаңартулар, кеңестер мен мақалалар",
    [Language.Persian]: "آخرین به‌روزرسانی‌ها، نکات و مقالات در مورد کاشت مو، مراقبت و درمان"
  },
  "blog.searchPosts": {
    [Language.Turkish]: "Blog Yazılarını Ara",
    [Language.English]: "Search Blog Posts",
    [Language.Russian]: "Поиск Записей Блога",
    [Language.Georgian]: "ბლოგის პოსტების ძიება",
    [Language.Azerbaijani]: "Bloq Yazılarını Axtar",
    [Language.Kazakh]: "Блог жазбаларын іздеу",
    [Language.Persian]: "جستجوی مطالب بلاگ"
  },
  "blog.categoriesTitle": {
    [Language.Turkish]: "Kategoriler",
    [Language.English]: "Categories",
    [Language.Russian]: "Категории",
    [Language.Georgian]: "კატეგორიები",
    [Language.Azerbaijani]: "Kateqoriyalar",
    [Language.Kazakh]: "Санаттар",
    [Language.Persian]: "دسته‌بندی‌ها"
  },
  "blog.allCategories": {
    [Language.Turkish]: "Tüm Kategoriler",
    [Language.English]: "All Categories",
    [Language.Russian]: "Все Категории",
    [Language.Georgian]: "ყველა კატეგორია",
    [Language.Azerbaijani]: "Bütün Kateqoriyalar",
    [Language.Kazakh]: "Барлық санаттар",
    [Language.Persian]: "همه دسته‌بندی‌ها"
  },
  "blog.newest": {
    [Language.Turkish]: "En Yeni",
    [Language.English]: "Newest",
    [Language.Russian]: "Новейшие",
    [Language.Georgian]: "უახლესი",
    [Language.Azerbaijani]: "Ən Yeni",
    [Language.Kazakh]: "Ең жаңа",
    [Language.Persian]: "جدیدترین"
  },
  "blog.oldest": {
    [Language.Turkish]: "En Eski",
    [Language.English]: "Oldest",
    [Language.Russian]: "Старейшие",
    [Language.Georgian]: "უძველესი",
    [Language.Azerbaijani]: "Ən Köhnə",
    [Language.Kazakh]: "Ең ескі",
    [Language.Persian]: "قدیمی‌ترین"
  },
  "blog.mostPopular": {
    [Language.Turkish]: "En Popüler",
    [Language.English]: "Most Popular",
    [Language.Russian]: "Самые Популярные",
    [Language.Georgian]: "ყველაზე პოპულარული",
    [Language.Azerbaijani]: "Ən Populyar",
    [Language.Kazakh]: "Ең танымал",
    [Language.Persian]: "محبوب‌ترین"
  },
  "blog.featuredPosts": {
    [Language.Turkish]: "Öne Çıkan Yazılar",
    [Language.English]: "Featured Posts",
    [Language.Russian]: "Избранные Статьи",
    [Language.Georgian]: "გამორჩეული პოსტები",
    [Language.Azerbaijani]: "Seçilmiş Yazılar",
    [Language.Kazakh]: "Таңдаулы Посттар",
    [Language.Persian]: "نوشته‌های برگزیده"
  },
  "blog.search": {
    [Language.Turkish]: "Ara",
    [Language.English]: "Search",
    [Language.Russian]: "Поиск",
    [Language.Georgian]: "ძიება",
    [Language.Azerbaijani]: "Axtar",
    [Language.Kazakh]: "Іздеу",
    [Language.Persian]: "جستجو"
  },
  "blog.searchPlaceholder": {
    [Language.Turkish]: "Blog yazılarında ara...",
    [Language.English]: "Search blog posts...",
    [Language.Russian]: "Искать в блоге...",
    [Language.Georgian]: "ბლოგის პოსტების ძიება...",
    [Language.Azerbaijani]: "Bloq yazılarında axtar...",
    [Language.Kazakh]: "Блог жазбаларын іздеу...",
    [Language.Persian]: "جستجو در پست‌های وبلاگ..."
  },
  "blog.popularTags": {
    [Language.Turkish]: "Popüler Etiketler",
    [Language.English]: "Popular Tags",
    [Language.Russian]: "Популярные Теги",
    [Language.Georgian]: "პოპულარული ტეგები",
    [Language.Azerbaijani]: "Populyar Teqlər",
    [Language.Kazakh]: "Танымал Тегтер",
    [Language.Persian]: "برچسب‌های محبوب"
  },
  "blog.featuredAuthors": {
    [Language.Turkish]: "Öne Çıkan Yazarlar",
    [Language.English]: "Featured Authors",
    [Language.Russian]: "Избранные Авторы",
    [Language.Georgian]: "გამორჩეული ავტორები",
    [Language.Azerbaijani]: "Seçilmiş Müəlliflər",
    [Language.Kazakh]: "Таңдаулы Авторлар",
    [Language.Persian]: "نویسندگان برجسته"
  },
  "blog.newsletter": {
    [Language.Turkish]: "Bültenimize Abone Olun",
    [Language.English]: "Subscribe to Our Newsletter",
    [Language.Russian]: "Подпишитесь на Нашу Рассылку",
    [Language.Georgian]: "გამოიწერეთ ჩვენი საინფორმაციო ბიულეტენი"
  },
  "blog.newsletterDescription": {
    [Language.Turkish]: "En son blog yazılarımız ve saç ekimi hakkındaki güncellemeler direkt e-posta adresinize gelsin.",
    [Language.English]: "Get our latest blog posts and updates about hair transplantation directly to your email.",
    [Language.Russian]: "Получайте наши последние сообщения в блоге и обновления о трансплантации волос прямо на вашу электронную почту.",
    [Language.Georgian]: "მიიღეთ ჩვენი უახლესი ბლოგის პოსტები და განახლებები თმის გადანერგვის შესახებ პირდაპირ თქვენს ელფოსტაზე."
  },
  "blog.subscribe": {
    [Language.Turkish]: "Abone Ol",
    [Language.English]: "Subscribe",
    [Language.Russian]: "Подписаться",
    [Language.Georgian]: "გამოწერა"
  },
  "blog.minutes": {
    [Language.Turkish]: "dk okuma",
    [Language.English]: "min read",
    [Language.Russian]: "мин чтения",
    [Language.Georgian]: "წთ წაკითხვა"
  },
  "blog.views": {
    [Language.Turkish]: "görüntülenme",
    [Language.English]: "views",
    [Language.Russian]: "просмотров",
    [Language.Georgian]: "ნახვა"
  },
  "common.readMore": {
    [Language.Turkish]: "Devamını Oku",
    [Language.English]: "Read More",
    [Language.Russian]: "Читать Далее",
    [Language.Georgian]: "მეტის წაკითხვა"
  },
  "common.emailPlaceholder": {
    [Language.Turkish]: "E-posta adresiniz",
    [Language.English]: "Your email address",
    [Language.Russian]: "Ваш адрес электронной почты",
    [Language.Georgian]: "თქვენი ელფოსტის მისამართი"
  },
  "blog.author": {
    [Language.Turkish]: "Yazar",
    [Language.English]: "Author",
    [Language.Russian]: "Автор",
    [Language.Georgian]: "ავტორი"
  },
  "blog.category": {
    [Language.Turkish]: "Kategori",
    [Language.English]: "Category",
    [Language.Russian]: "Категория",
    [Language.Georgian]: "კატეგორია"
  },
  "blog.publishedDate": {
    [Language.Turkish]: "Yayınlanma Tarihi",
    [Language.English]: "Published Date",
    [Language.Russian]: "Дата Публикации",
    [Language.Georgian]: "გამოქვეყნების თარიღი"
  },
  "blog.tags": {
    [Language.Turkish]: "Etiketler",
    [Language.English]: "Tags",
    [Language.Russian]: "Теги",
    [Language.Georgian]: "ტეგები"
  },
  "blog.sharePost": {
    [Language.Turkish]: "Bu Yazıyı Paylaş",
    [Language.English]: "Share This Post",
    [Language.Russian]: "Поделиться Этой Статьей",
    [Language.Georgian]: "გააზიარეთ ეს პოსტი"
  },
  "blog.relatedPosts": {
    [Language.Turkish]: "İlgili Yazılar",
    [Language.English]: "Related Posts",
    [Language.Russian]: "Похожие Статьи",
    [Language.Georgian]: "დაკავშირებული პოსტები"
  },
  "blog.comments": {
    [Language.Turkish]: "Yorumlar",
    [Language.English]: "Comments",
    [Language.Russian]: "Комментарии",
    [Language.Georgian]: "კომენტარები"
  },
  "blog.leaveComment": {
    [Language.Turkish]: "Yorum Yap",
    [Language.English]: "Leave a Comment",
    [Language.Russian]: "Оставить Комментарий",
    [Language.Georgian]: "დატოვეთ კომენტარი"
  },
  "blog.yourName": {
    [Language.Turkish]: "Adınız",
    [Language.English]: "Your Name",
    [Language.Russian]: "Ваше Имя",
    [Language.Georgian]: "თქვენი სახელი"
  },
  "blog.yourEmail": {
    [Language.Turkish]: "E-posta Adresiniz",
    [Language.English]: "Your Email",
    [Language.Russian]: "Ваш Email",
    [Language.Georgian]: "თქვენი ელფოსტა"
  },
  "blog.yourComment": {
    [Language.Turkish]: "Yorumunuz",
    [Language.English]: "Your Comment",
    [Language.Russian]: "Ваш Комментарий",
    [Language.Georgian]: "თქვენი კომენტარი"
  },
  "blog.submit": {
    [Language.Turkish]: "Gönder",
    [Language.English]: "Submit",
    [Language.Russian]: "Отправить",
    [Language.Georgian]: "გაგზავნა"
  },
  "blog.previous": {
    [Language.Turkish]: "Önceki",
    [Language.English]: "Previous",
    [Language.Russian]: "Предыдущий",
    [Language.Georgian]: "წინა"
  },
  "blog.next": {
    [Language.Turkish]: "Sonraki",
    [Language.English]: "Next",
    [Language.Russian]: "Следующий",
    [Language.Georgian]: "შემდეგი"
  },
  "blog.filter": {
    [Language.Turkish]: "Filtrele",
    [Language.English]: "Filter",
    [Language.Russian]: "Фильтр",
    [Language.Georgian]: "ფილტრი"
  },
  "blog.clear": {
    [Language.Turkish]: "Temizle",
    [Language.English]: "Clear",
    [Language.Russian]: "Очистить",
    [Language.Georgian]: "გასუფთავება"
  },
  "blog.loadMore": {
    [Language.Turkish]: "Daha Fazla Yükle",
    [Language.English]: "Load More",
    [Language.Russian]: "Загрузить Еще",
    [Language.Georgian]: "მეტის ჩატვირთვა"
  },
  "blog.noResults": {
    [Language.Turkish]: "Sonuç bulunamadı",
    [Language.English]: "No results found",
    [Language.Russian]: "Результатов не найдено",
    [Language.Georgian]: "შედეგები არ მოიძებნა"
  }
};