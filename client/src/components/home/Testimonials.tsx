import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle";

// Fallback testimonial data (real data would come from API)
const fallbackTestimonials = [
  {
    id: 1,
    nameTR: "Mehmet Y.",
    nameEN: "Mehmet Y.",
    nameRU: "Мехмет Й.",
    nameKA: "მეჰმეთ ი.",
    locationTR: "İstanbul, Türkiye",
    locationEN: "Istanbul, Turkey",
    locationRU: "Стамбул, Турция",
    locationKA: "სტამბული, თურქეთი",
    commentTR: "Türkiye'den geldim ve MyHair Clinic'te saç ekimi yaptırdım. Havaalanından karşılanmadan, otel konaklamaya ve klinik sürecine kadar her şey mükemmeldi. Sonuçlar beklediğimden de iyi. Kesinlikle tavsiye ederim.",
    commentEN: "I came from Turkey and had a hair transplant at MyHair Clinic. Everything from the airport pickup to the hotel accommodation and the clinic process was perfect. The results are even better than I expected. I definitely recommend it.",
    commentRU: "Я приехал из Турции и сделал пересадку волос в MyHair Clinic. Все было идеально, начиная от встречи в аэропорту и заканчивая размещением в отеле и процессом в клинике. Результаты даже лучше, чем я ожидал. Я определенно рекомендую.",
    commentKA: "თურქეთიდან ჩამოვედი და თმის გადანერგვა გავიკეთე MyHair Clinic-ში. ყველაფერი, აეროპორტიდან დაწყებული, სასტუმროში განთავსებით და კლინიკის პროცესით დამთავრებული, იყო სრულყოფილი. შედეგები იმაზე უკეთესია, ვიდრე მოველოდი. ნამდვილად ვურჩევ.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    nameTR: "Ahmed K.",
    nameEN: "Ahmed K.",
    nameRU: "Ахмед К.",
    nameKA: "აჰმედ კ.",
    locationTR: "Dubai, BAE",
    locationEN: "Dubai, UAE",
    locationRU: "Дубай, ОАЭ",
    locationKA: "დუბაი, არაბთა გაერთიანებული საამიროები",
    commentTR: "Dubai'den saç ekimi için geldim. Klinik çok profesyoneldi ve doktorlar son derece bilgiliydi. 12 ay sonraki sonuçlar harika. Teşekkürler MyHair Clinic ekibi!",
    commentEN: "I came from Dubai for my hair transplant. The clinic was very professional, and the doctors were extremely knowledgeable. The results after 12 months are amazing. Thank you MyHair Clinic team!",
    commentRU: "Я приехал из Дубая на пересадку волос. Клиника была очень профессиональной, а врачи обладали исключительными знаниями. Результаты через 12 месяцев потрясающие. Спасибо команде MyHair Clinic!",
    commentKA: "დუბაიდან ჩამოვედი თმის გადანერგვისთვის. კლინიკა იყო ძალიან პროფესიონალური, ექიმები კი - უაღრესად გამოცდილი. 12 თვის შემდეგ შედეგები საოცარია. მადლობა MyHair Clinic-ის გუნდს!",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    nameTR: "Алексей В.",
    nameEN: "Alexey V.",
    nameRU: "Алексей В.",
    nameKA: "ალექსეი ვ.",
    locationTR: "Moskova, Rusya",
    locationEN: "Moscow, Russia",
    locationRU: "Москва, Россия",
    locationKA: "მოსკოვი, რუსეთი",
    commentTR: "Moskova'dan geldim ve MyHair Clinic'te saç ekimi yaptırmaya karar verdim. Tüm süreç konforlu ve ağrısız geçti. Personel Rusça konuşuyor, bu çok kullanışlı. Sonuçlar mükemmel!",
    commentEN: "I came from Moscow and decided to have a hair transplant at MyHair Clinic. The whole process was comfortable and painless. The staff speaks Russian, which is very convenient. The results are excellent!",
    commentRU: "Я из Москвы и решил сделать пересадку волос в клинике MyHair. Весь процесс был комфортным и безболезненным. Персонал говорит по-русски, что очень удобно. Результаты отличные!",
    commentKA: "მოსკოვიდან ჩამოვედი და გადავწყვიტე თმის გადანერგვა გამეკეთებინა MyHair Clinic-ში. მთელი პროცესი იყო კომფორტული და უმტკივნეულო. პერსონალი რუსულად საუბრობს, რაც ძალიან მოსახერხებელია. შედეგები შესანიშნავია!",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  }
];

export default function Testimonials() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Fetch testimonials from API
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["/api/testimonials"],
  });
  
  // Use API data if available, otherwise use fallback
  const testimonialsData = testimonials || fallbackTestimonials;
  
  // Get name based on language
  const getName = (testimonial: any) => {
    return testimonial[`name${language.toUpperCase()}`];
  };
  
  // Get location based on language
  const getLocation = (testimonial: any) => {
    return testimonial[`location${language.toUpperCase()}`];
  };
  
  // Get comment based on language
  const getComment = (testimonial: any) => {
    return testimonial[`comment${language.toUpperCase()}`];
  };
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.testimonials.title')}
          description={t('home.testimonials.description')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-primary">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="ml-2 text-sm text-neutral-500">{testimonial.rating.toFixed(1)}</span>
              </div>
              <blockquote className="text-neutral-600 italic mb-6">
                "{getComment(testimonial)}"
              </blockquote>
              <div className="flex items-center">
                <img 
                  src={testimonial.imageUrl} 
                  alt={getName(testimonial)} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="font-medium">{getName(testimonial)}</h4>
                  <p className="text-sm text-neutral-500">{getLocation(testimonial)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-white rounded-lg overflow-hidden shadow-md">
          <div className="grid md:grid-cols-2">
            <div className="bg-neutral-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
                  <i className="fas fa-play text-xl"></i>
                </button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                alt="Video testimonial thumbnail" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="font-heading text-2xl font-bold mb-4">
                {language === 'tr' ? 'Hasta Hikayemiz: James\'in Dönüşümü' :
                 language === 'ru' ? 'История нашего пациента: Трансформация Джеймса' :
                 language === 'ka' ? 'ჩვენი პაციენტის ისტორია: ჯეიმსის ტრანსფორმაცია' :
                 'Our Patient Story: James\'s Transformation'}
              </h3>
              <p className="text-neutral-600 mb-6">
                {language === 'tr' ? 'James\'in saç ekimi deneyimini ve 1 yıl sonraki sonuçlarını izleyin. İngiltere\'den gelen James, MyHair Clinic\'te FUE yöntemiyle saç ekimi yaptırdı.' :
                 language === 'ru' ? 'Посмотрите опыт пересадки волос Джеймса и результаты через 1 год. Джеймс из Англии сделал пересадку волос методом FUE в клинике MyHair.' :
                 language === 'ka' ? 'ნახეთ ჯეიმსის თმის გადანერგვის გამოცდილება და 1 წლის შედეგები. ჯეიმსმა ინგლისიდან გაიკეთა FUE თმის გადანერგვა MyHair Clinic-ში.' :
                 'Watch James\'s hair transplant experience and his results after 1 year. James from England had FUE hair transplantation at MyHair Clinic.'}
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                  alt="James Wilson" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="font-medium">James Wilson</h4>
                  <p className="text-sm text-neutral-500">London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
