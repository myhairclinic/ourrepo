import { Language } from "@shared/types";

// Blog sayfası için dil haritası
type LanguageMap = {
  [Language.Turkish]: string;
  [Language.English]: string;
  [Language.Russian]: string;
  [Language.Georgian]: string;
};

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
    [Language.Turkish]: "Saç Ekimi Blogu | Uzman Makaleler ve Başarı Hikayeleri",
    [Language.English]: "Hair Transplant Blog | Expert Articles and Success Stories",
    [Language.Russian]: "Блог о трансплантации волос | Экспертные статьи и истории успеха",
    [Language.Georgian]: "თმის გადანერგვის ბლოგი | ექსპერტთა სტატიები და წარმატების ისტორიები"
  },
  "blog.description": {
    [Language.Turkish]: "Saç ekimi, saç dökülmesi tedavileri ve saç bakımı hakkında uzman makaleler ve gerçek başarı hikayeleri. Saç sağlığınız için en güncel bilgiler ve klinik deneyimlerimiz burada.",
    [Language.English]: "Expert articles and real success stories about hair transplantation, hair loss treatments, and hair care. Find the most up-to-date information and clinical experiences here for your hair health.",
    [Language.Russian]: "Экспертные статьи и реальные истории успеха о трансплантации волос, лечении выпадения волос и уходе за волосами. Найдите здесь самую актуальную информацию и клинический опыт для здоровья ваших волос.",
    [Language.Georgian]: "ექსპერტთა სტატიები და რეალური წარმატების ისტორიები თმის გადანერგვის, თმის ცვენის მკურნალობისა და თმის მოვლის შესახებ. აქ შეგიძლიათ იპოვოთ უახლესი ინფორმაცია და კლინიკური გამოცდილება თქვენი თმის ჯანმრთელობისთვის."
  },
  "blog.searchPosts": {
    [Language.Turkish]: "Blog Yazılarını Ara",
    [Language.English]: "Search Blog Posts",
    [Language.Russian]: "Поиск Записей Блога",
    [Language.Georgian]: "ბლოგის პოსტების ძიება"
  },
  "blog.categoriesTitle": {
    [Language.Turkish]: "Kategoriler",
    [Language.English]: "Categories",
    [Language.Russian]: "Категории",
    [Language.Georgian]: "კატეგორიები"
  },
  "blog.allCategories": {
    [Language.Turkish]: "Tüm Kategoriler",
    [Language.English]: "All Categories",
    [Language.Russian]: "Все Категории",
    [Language.Georgian]: "ყველა კატეგორია"
  },
  "blog.newest": {
    [Language.Turkish]: "En Yeni",
    [Language.English]: "Newest",
    [Language.Russian]: "Новейшие",
    [Language.Georgian]: "უახლესი"
  },
  "blog.oldest": {
    [Language.Turkish]: "En Eski",
    [Language.English]: "Oldest",
    [Language.Russian]: "Старейшие",
    [Language.Georgian]: "უძველესი"
  },
  "blog.mostPopular": {
    [Language.Turkish]: "En Popüler",
    [Language.English]: "Most Popular",
    [Language.Russian]: "Самые Популярные",
    [Language.Georgian]: "ყველაზე პოპულარული"
  },
  "blog.featuredPosts": {
    [Language.Turkish]: "Öne Çıkan Yazılar",
    [Language.English]: "Featured Posts",
    [Language.Russian]: "Избранные Статьи",
    [Language.Georgian]: "გამორჩეული პოსტები"
  },
  "blog.search": {
    [Language.Turkish]: "Ara",
    [Language.English]: "Search",
    [Language.Russian]: "Поиск",
    [Language.Georgian]: "ძიება"
  },
  "blog.searchPlaceholder": {
    [Language.Turkish]: "Blog yazılarında ara...",
    [Language.English]: "Search blog posts...",
    [Language.Russian]: "Искать в блоге...",
    [Language.Georgian]: "ბლოგის პოსტების ძიება..."
  },
  "blog.popularTags": {
    [Language.Turkish]: "Popüler Etiketler",
    [Language.English]: "Popular Tags",
    [Language.Russian]: "Популярные Теги",
    [Language.Georgian]: "პოპულარული ტეგები"
  },
  "blog.featuredAuthors": {
    [Language.Turkish]: "Öne Çıkan Yazarlar",
    [Language.English]: "Featured Authors",
    [Language.Russian]: "Избранные Авторы",
    [Language.Georgian]: "გამორჩეული ავტორები"
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
  },
  "blog.pageTitle": {
    [Language.Turkish]: "Blog ve Makaleler",
    [Language.English]: "Blog & Articles",
    [Language.Russian]: "Блог и Статьи",
    [Language.Georgian]: "ბლოგი და სტატიები"
  },
  "blog.pageSubtitle": {
    [Language.Turkish]: "Saç ekimi, saç bakımı ve tedavileri hakkında en güncel bilgiler",
    [Language.English]: "The latest information about hair transplantation, hair care and treatments",
    [Language.Russian]: "Актуальная информация о трансплантации волос, уходе за волосами и лечении",
    [Language.Georgian]: "უახლესი ინფორმაცია თმის გადანერგვის, თმის მოვლისა და მკურნალობის შესახებ"
  },
  "blog.noPosts": {
    [Language.Turkish]: "Henüz Blog Yazısı Bulunmuyor",
    [Language.English]: "No Blog Posts Yet",
    [Language.Russian]: "Записей блога пока нет",
    [Language.Georgian]: "ბლოგის პოსტები ჯერ არ არის"
  },
  "blog.noPostsDescription": {
    [Language.Turkish]: "Yakında saç ekimi ve bakımı hakkında değerli içerikler eklenecektir.",
    [Language.English]: "Valuable content about hair transplantation and care will be added soon.",
    [Language.Russian]: "Скоро будут добавлены ценные материалы о трансплантации и уходе за волосами.",
    [Language.Georgian]: "მალე დაემატება ღირებული მასალები თმის გადანერგვისა და მოვლის შესახებ."
  }
};