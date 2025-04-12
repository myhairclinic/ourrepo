import React, { useState } from "react";
import {
  HelpCircle,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Globe,
  Search
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Örnek SSS verileri
const mockFaqs = [
  {
    id: 1,
    questionTR: "Saç ekimi işleminden ne kadar süre sonra spor yapabilirim?",
    questionEN: "How long after the hair transplant procedure can I exercise?",
    questionRU: "Через сколько времени после процедуры пересадки волос можно заниматься спортом?",
    questionKA: "რამდენი ხნის შემდეგ შემიძლია ვარჯიში თმის გადანერგვის პროცედურის შემდეგ?",
    answerTR: "Saç ekimi sonrası ilk 10 gün hafif yürüyüş dışında spor yapmanız önerilmez. 2 hafta sonra orta şiddette aktiviteler, 1 ay sonra ise tüm spor aktivitelerine dönebilirsiniz.",
    answerEN: "After hair transplantation, it is not recommended to exercise except for light walking for the first 10 days. After 2 weeks, you can resume moderate activities, and after 1 month, you can return to all sports activities.",
    answerRU: "После пересадки волос не рекомендуется заниматься спортом, кроме легкой ходьбы, в течение первых 10 дней. Через 2 недели вы можете вернуться к умеренным нагрузкам, а через 1 месяц – ко всем спортивным активностям.",
    answerKA: "თმის გადანერგვის შემდეგ, პირველი 10 დღის განმავლობაში არ არის რეკომენდებული ვარჯიში, გარდა მსუბუქი სიარულისა. 2 კვირის შემდეგ შეგიძლიათ განაახლოთ ზომიერი აქტივობები, ხოლო 1 თვის შემდეგ დაუბრუნდეთ ყველა სპორტულ აქტივობას.",
    order: 1,
    isActive: true,
    serviceId: 1,
    createdAt: new Date("2025-03-10")
  },
  {
    id: 2,
    questionTR: "Saç ekimi işlemi ne kadar sürer?",
    questionEN: "How long does the hair transplant procedure take?",
    questionRU: "Сколько времени занимает процедура пересадки волос?",
    questionKA: "რამდენ ხანს გრძელდება თმის გადანერგვის პროცედურა?",
    answerTR: "Saç ekimi işlemi, nakledilecek greft sayısına bağlı olarak genellikle 4-8 saat arasında sürer. İşlem öncesi hazırlık ve sonrası bilgilendirme ile birlikte toplam süre bir gün olabilir.",
    answerEN: "The hair transplant procedure usually takes between 4-8 hours, depending on the number of grafts to be transplanted. With pre-procedure preparation and post-procedure information, the total duration can be one day.",
    answerRU: "Процедура пересадки волос обычно занимает от 4 до 8 часов, в зависимости от количества пересаживаемых графтов. С учетом предпроцедурной подготовки и послепроцедурной информации общая продолжительность может составить один день.",
    answerKA: "თმის გადანერგვის პროცედურა ჩვეულებრივ გრძელდება 4-8 საათს, გადასანერგი გრაფტების რაოდენობის მიხედვით. პროცედურამდე მომზადებით და პროცედურის შემდგომი ინფორმაციით, საერთო ხანგრძლივობა შეიძლება იყოს ერთი დღე.",
    order: 2,
    isActive: true,
    serviceId: 1,
    createdAt: new Date("2025-03-09")
  },
  {
    id: 3,
    questionTR: "Saç ekimi sonrası nasıl yıkamalıyım?",
    questionEN: "How should I wash after hair transplantation?",
    questionRU: "Как следует мыть голову после пересадки волос?",
    questionKA: "როგორ უნდა დავიბანო თმის გადანერგვის შემდეგ?",
    answerTR: "Saç ekimi sonrası ilk yıkama genellikle 2-3 gün sonra klinik personeli tarafından yapılır. Sonrasında size özel şampuan ve nazik yıkama teknikleri ile devam etmelisiniz. Direkt su püskürtmeden ve ovuşturmadan kaçınmalısınız.",
    answerEN: "The first wash after hair transplantation is usually done by clinic staff 2-3 days later. Afterwards, you should continue with special shampoo and gentle washing techniques. Avoid direct water spraying and rubbing.",
    answerRU: "Первое мытье после пересадки волос обычно проводится персоналом клиники через 2-3 дня. После этого вы должны продолжать использовать специальный шампунь и щадящие техники мытья. Избегайте прямого распыления воды и трения.",
    answerKA: "თმის გადანერგვის შემდეგ პირველი რეცხვა ჩვეულებრივ ტარდება კლინიკის პერსონალის მიერ 2-3 დღის შემდეგ. შემდეგ უნდა გააგრძელოთ სპეციალური შამპუნით და ნაზი რეცხვის ტექნიკით. მოერიდეთ პირდაპირ წყლის შესხურებას და ხახუნს.",
    order: 3,
    isActive: true,
    serviceId: 1,
    createdAt: new Date("2025-03-08")
  },
  {
    id: 4,
    questionTR: "Kaş ekimi ne kadar kalıcıdır?",
    questionEN: "How permanent is eyebrow transplantation?",
    questionRU: "Насколько долговечна пересадка бровей?",
    questionKA: "რამდენად მუდმივია წარბების გადანერგვა?",
    answerTR: "Kaş ekimi kalıcı bir işlemdir. Nakledilen saç kökleri, tıpkı doğal kaşlar gibi yerleştiği bölgede ömür boyu kalır. İlk 2-3 hafta içinde geçici bir dökülme olabilir ancak bu normaldir ve yeni kaşlar daha güçlü bir şekilde tekrar çıkacaktır.",
    answerEN: "Eyebrow transplantation is a permanent procedure. The transplanted hair follicles remain in the area where they are placed for a lifetime, just like natural eyebrows. There may be temporary shedding within the first 2-3 weeks, but this is normal and the new eyebrows will regrow stronger.",
    answerRU: "Пересадка бровей – это постоянная процедура. Пересаженные волосяные фолликулы остаются на всю жизнь в области, где они размещены, как и естественные брови. В течение первых 2-3 недель может наблюдаться временное выпадение, но это нормально, и новые брови отрастут сильнее.",
    answerKA: "წარბების გადანერგვა არის მუდმივი პროცედურა. გადანერგილი თმის ფოლიკულები რჩებიან იმ ადგილზე, სადაც ისინი განთავსებულია, მთელი ცხოვრების განმავლობაში, როგორც ბუნებრივი წარბები. პირველი 2-3 კვირის განმავლობაში შეიძლება იყოს დროებითი ცვენა, მაგრამ ეს ნორმალურია და ახალი წარბები უფრო ძლიერად ამოვა.",
    order: 4,
    isActive: true,
    serviceId: 2,
    createdAt: new Date("2025-03-07")
  },
  {
    id: 5,
    questionTR: "PRP tedavisi ne kadar sürede etkisini gösterir?",
    questionEN: "How long does it take for PRP treatment to show its effect?",
    questionRU: "Сколько времени требуется для проявления эффекта от PRP-терапии?",
    questionKA: "რა დროის განმავლობაში იჩენს PRP მკურნალობა თავის ეფექტს?",
    answerTR: "PRP tedavisinin etkileri genellikle 2-3 seans sonra görülmeye başlar. Tam sonuçlar ise 4-6 seans sonrasında ortaya çıkar. Seanların 4-6 hafta arayla yapılması önerilir ve saç kalitesindeki iyileşme tedavi sürecinde kademeli olarak artacaktır.",
    answerEN: "The effects of PRP treatment usually begin to be seen after 2-3 sessions. Full results emerge after 4-6 sessions. It is recommended that sessions be done 4-6 weeks apart, and the improvement in hair quality will gradually increase during the treatment process.",
    answerRU: "Эффекты PRP-терапии обычно начинают проявляться после 2-3 сеансов. Полные результаты появляются после 4-6 сеансов. Рекомендуется проводить сеансы с интервалом в 4-6 недель, и улучшение качества волос будет постепенно увеличиваться в процессе лечения.",
    answerKA: "PRP მკურნალობის ეფექტები ჩვეულებრივ იწყება 2-3 სეანსის შემდეგ. სრული შედეგები ჩნდება 4-6 სეანსის შემდეგ. რეკომენდებულია სეანსების ჩატარება 4-6 კვირის ინტერვალით და თმის ხარისხის გაუმჯობესება თანდათანობით გაიზრდება მკურნალობის პროცესში.",
    order: 5,
    isActive: false,
    serviceId: 4,
    createdAt: new Date("2025-03-06")
  }
];

// Servis verileri
const services = [
  { id: "all", name: "Tümü" },
  { id: 1, name: "Saç Ekimi" },
  { id: 2, name: "Kaş Ekimi" },
  { id: 3, name: "Sakal Ekimi" },
  { id: 4, name: "PRP Tedavisi" },
  { id: 5, name: "Saç Mezoterapisi" }
];

// Dil seçenekleri
const languages = [
  { id: "TR", name: "Türkçe" },
  { id: "EN", name: "İngilizce" },
  { id: "RU", name: "Rusça" },
  { id: "KA", name: "Gürcüce" }
];

interface FaqManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const FaqManagement: React.FC<FaqManagementProps> = () => {
  const [faqs, setFaqs] = useState(mockFaqs);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [filteredService, setFilteredService] = useState<string | number>("all");
  const [activeLanguage, setActiveLanguage] = useState<string>("TR");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // SSS'yi genişlet/daralt
  const toggleExpand = (id: number) => {
    setExpandedFaqs(prev => 
      prev.includes(id) ? 
        prev.filter(faqId => faqId !== id) : 
        [...prev, id]
    );
  };
  
  // Filtreleme
  const filteredFaqs = faqs.filter(faq => {
    const matchesService = filteredService === "all" || faq.serviceId === Number(filteredService);
    const searchInCurrentLanguage = (
      faq[`question${activeLanguage}` as keyof typeof faq].toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq[`answer${activeLanguage}` as keyof typeof faq].toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesService && (searchQuery === "" || searchInCurrentLanguage);
  });
  
  // SSS sırasını değiştir
  const changeOrder = (id: number, direction: 'up' | 'down') => {
    const newFaqs = [...faqs];
    const index = newFaqs.findIndex(faq => faq.id === id);
    
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === newFaqs.length - 1)) {
      return;
    }
    
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Sıra numaralarını değiştir
    const tempOrder = newFaqs[index].order;
    newFaqs[index].order = newFaqs[swapIndex].order;
    newFaqs[swapIndex].order = tempOrder;
    
    // Diziyi sıraya göre yeniden düzenle
    newFaqs.sort((a, b) => a.order - b.order);
    
    setFaqs(newFaqs);
  };
  
  // SSS aktiflik durumunu değiştir
  const toggleActive = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? {...faq, isActive: !faq.isActive} : faq
    ));
  };
  
  // SSS sil
  const deleteFaq = (id: number) => {
    if (window.confirm("Bu SSS'yi silmek istediğinizden emin misiniz?")) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };
  
  // Detay modalını aç
  const openDetailModal = (faq: any) => {
    setSelectedFaq(faq);
    setIsDetailModalOpen(true);
  };
  
  // Yeni SSS modalını aç
  const openAddModal = () => {
    setSelectedFaq(null);
    setIsAddModalOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Sık Sorulan Sorular Yönetimi</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Yeni SSS Ekle
        </button>
      </div>
      
      {/* Filtreler ve Dil Seçimi */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Hizmet:</span>
              <select
                value={filteredService}
                onChange={(e) => setFilteredService(e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="SSS ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            
            <button
              onClick={() => {
                setFilteredService("all");
                setSearchQuery("");
              }}
              className="text-sm text-primary hover:text-blue-700 flex items-center"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filtreleri Temizle
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Globe className="w-4 h-4" />
              Dil:
            </span>
            <div className="flex border rounded-lg overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLanguage(lang.id)}
                  className={`px-3 py-1 text-sm ${
                    activeLanguage === lang.id
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* SSS Listesi */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {filteredFaqs.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="hover:bg-gray-50">
                <div className="p-4 flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex flex-col items-center space-y-1">
                      <button
                        onClick={() => changeOrder(faq.id, 'up')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Yukarı Taşı"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded">
                        {faq.order}
                      </span>
                      <button
                        onClick={() => changeOrder(faq.id, 'down')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Aşağı Taşı"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <div
                        className="flex items-start justify-between cursor-pointer"
                        onClick={() => toggleExpand(faq.id)}
                      >
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-gray-900 font-medium">
                              {faq[`question${activeLanguage}` as keyof typeof faq]}
                            </h3>
                            {expandedFaqs.includes(faq.id) && (
                              <p className="mt-2 text-gray-600">
                                {faq[`answer${activeLanguage}` as keyof typeof faq]}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          {expandedFaqs.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                      
                      {expandedFaqs.includes(faq.id) && (
                        <div className="mt-3 flex items-center text-xs text-gray-500 space-x-3">
                          <div className="flex items-center">
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {services.find(s => s.id === faq.serviceId)?.name || "Genel"}
                            </span>
                          </div>
                          <div>
                            {new Date(faq.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleActive(faq.id)}
                      className={`p-1 ${
                        faq.isActive
                          ? "text-green-500 hover:text-green-700"
                          : "text-orange-500 hover:text-orange-700"
                      }`}
                      title={faq.isActive ? "Pasifleştir" : "Aktifleştir"}
                    >
                      {faq.isActive ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => openDetailModal(faq)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                      title="Düzenle"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteFaq(faq.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <HelpCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>Gösterilecek soru bulunamadı.</p>
            <p className="text-sm mt-1">Filtreleri temizlemeyi veya başka bir arama yapmayı deneyin.</p>
          </div>
        )}
      </div>
      
      {/* Detay Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>SSS Düzenle</DialogTitle>
            <DialogDescription>
              Sık Sorulan Soru detaylarını düzenleyin.
            </DialogDescription>
          </DialogHeader>
          
          {selectedFaq && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sıra:</span>
                  <input 
                    type="number" 
                    defaultValue={selectedFaq.order}
                    min="1"
                    className="w-16 p-1 border rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Durum:</span>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      defaultChecked={selectedFaq.isActive}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                      Aktif
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Hizmet
                  </label>
                  <select
                    defaultValue={selectedFaq.serviceId}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Genel</option>
                    {services.slice(1).map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setActiveLanguage(lang.id)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        activeLanguage === lang.id
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Soru ({languages.find(l => l.id === activeLanguage)?.name})
                    </label>
                    <textarea
                      rows={2}
                      defaultValue={selectedFaq[`question${activeLanguage}` as keyof typeof selectedFaq] as string}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder={`${languages.find(l => l.id === activeLanguage)?.name} dilinde soru...`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cevap ({languages.find(l => l.id === activeLanguage)?.name})
                    </label>
                    <textarea
                      rows={5}
                      defaultValue={selectedFaq[`answer${activeLanguage}` as keyof typeof selectedFaq] as string}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder={`${languages.find(l => l.id === activeLanguage)?.name} dilinde cevap...`}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // Burada gerçek olarak güncelleme yapılabilir
                    setIsDetailModalOpen(false);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Yeni SSS Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Yeni SSS Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir sık sorulan soru ekleyin. Tüm dil seçeneklerini doldurmayı unutmayın.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sıra:</span>
                <input 
                  type="number" 
                  defaultValue={faqs.length + 1}
                  min="1"
                  className="w-16 p-1 border rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Durum:</span>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newIsActive"
                    defaultChecked={true}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="newIsActive" className="text-sm text-gray-700">
                    Aktif
                  </label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hizmet
                </label>
                <select
                  defaultValue=""
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Genel</option>
                  {services.slice(1).map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeLanguage === lang.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Soru ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <textarea
                    rows={2}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`${languages.find(l => l.id === activeLanguage)?.name} dilinde soru...`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cevap ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <textarea
                    rows={5}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`${languages.find(l => l.id === activeLanguage)?.name} dilinde cevap...`}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  // Burada gerçek olarak ekleme yapılabilir
                  setIsAddModalOpen(false);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FaqManagement;