import React, { useState } from "react";
import {
  BookOpen,
  FileDown,
  Trash2,
  Edit,
  Globe,
  Search,
  PlusCircle,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Filter,
  Image,
  FileText
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Örnek bakım rehberleri
const mockAftercareGuides = [
  {
    id: 1,
    titleTR: "Saç Ekimi Sonrası İlk Hafta Bakım Kılavuzu",
    titleEN: "First Week Care Guide After Hair Transplantation",
    titleRU: "Руководство по уходу в первую неделю после пересадки волос",
    titleKA: "მოვლის სახელმძღვანელო თმის გადანერგვის შემდეგ პირველი კვირის განმავლობაში",
    contentTR: "<p>Saç ekimi sonrası ilk hafta, iyileşme sürecinin en kritik dönemidir. Bu süreçte dikkat etmeniz gereken önemli hususlar:</p><ul><li>İlk 3 gün başınızı yastıktan en az 45 derece yüksekte tutun</li><li>İlk yıkamaya kadar başınızı ıslatmayın</li><li>Doktorunuzun verdiği ilaçları düzenli kullanın</li><li>Ağır fiziksel aktivitelerden uzak durun</li><li>Sigara ve alkol tüketiminden kaçının</li></ul>",
    contentEN: "<p>The first week after hair transplantation is the most critical period of the healing process. Important points you should pay attention to during this process:</p><ul><li>Keep your head at least 45 degrees higher than the pillow for the first 3 days</li><li>Do not wet your head until the first wash</li><li>Use the medications given by your doctor regularly</li><li>Avoid heavy physical activities</li><li>Avoid smoking and alcohol consumption</li></ul>",
    contentRU: "<p>Первая неделя после пересадки волос – самый критический период процесса заживления. Важные моменты, на которые следует обратить внимание в этот период:</p><ul><li>Держите голову как минимум на 45 градусов выше подушки в течение первых 3 дней</li><li>Не мочите голову до первого мытья</li><li>Регулярно принимайте лекарства, назначенные врачом</li><li>Избегайте тяжелых физических нагрузок</li><li>Избегайте курения и употребления алкоголя</li></ul>",
    contentKA: "<p>პირველი კვირა თმის გადანერგვის შემდეგ არის შეხორცების პროცესის ყველაზე კრიტიკული პერიოდი. მნიშვნელოვანი საკითხები, რომლებზეც უნდა მიაქციოთ ყურადღება ამ პროცესში:</p><ul><li>პირველი 3 დღის განმავლობაში თავი ბალიშზე მინიმუმ 45 გრადუსით მაღლა დაიჭირეთ</li><li>არ დაასველოთ თავი პირველ დაბანამდე</li><li>რეგულარულად მიიღეთ ექიმის მიერ გაცემული მედიკამენტები</li><li>მოერიდეთ მძიმე ფიზიკურ აქტივობებს</li><li>მოერიდეთ თამბაქოს და ალკოჰოლის მოხმარებას</li></ul>",
    imageUrl: "/images/aftercare/first-week-care.jpg",
    pdfUrlTR: "/documents/sac-ekimi-ilk-hafta-bakim-rehberi.pdf",
    pdfUrlEN: "/documents/hair-transplant-first-week-care-guide.pdf",
    pdfUrlRU: "/documents/руководство-по-уходу-первая-неделя.pdf",
    pdfUrlKA: "/documents/თმის-გადანერგვის-პირველი-კვირის-მოვლის-სახელმძღვანელო.pdf",
    order: 1,
    isActive: true,
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-15")
  },
  {
    id: 2,
    titleTR: "Saç Ekimi Sonrası 2-4 Hafta Bakım Rehberi",
    titleEN: "2-4 Weeks Care Guide After Hair Transplantation",
    titleRU: "Руководство по уходу через 2-4 недели после пересадки волос",
    titleKA: "მოვლის სახელმძღვანელო თმის გადანერგვის შემდეგ 2-4 კვირის განმავლობაში",
    contentTR: "<p>Saç ekimi sonrası 2-4 hafta arasındaki süreçte dikkat etmeniz gereken hususlar:</p><ul><li>Artık normal şampuan kullanabilirsiniz ancak nazik hareketlerle yıkayın</li><li>İşlem yapılan bölgeye doğrudan su püskürtmekten kaçının</li><li>Kafa derinizi ovuşturmayın, nazikçe masaj yapın</li><li>Hafif sporlar yapabilirsiniz ancak aşırı terleme ve hareketlerden kaçının</li><li>Güneşten koruyun, şapka kullanın</li></ul>",
    contentEN: "<p>Points you should pay attention to in the period between 2-4 weeks after hair transplantation:</p><ul><li>You can now use normal shampoo but wash with gentle movements</li><li>Avoid spraying water directly onto the treated area</li><li>Don't rub your scalp, massage gently</li><li>You can do light sports but avoid excessive sweating and movements</li><li>Protect from the sun, use a hat</li></ul>",
    contentRU: "<p>Моменты, на которые следует обратить внимание в период от 2 до 4 недель после пересадки волос:</p><ul><li>Теперь вы можете использовать обычный шампунь, но мойте голову мягкими движениями</li><li>Избегайте прямого распыления воды на обработанную область</li><li>Не трите кожу головы, массируйте осторожно</li><li>Вы можете заниматься легкими видами спорта, но избегайте чрезмерного потоотделения и резких движений</li><li>Защищайте от солнца, используйте шляпу</li></ul>",
    contentKA: "<p>საკითხები, რომლებზეც უნდა მიაქციოთ ყურადღება თმის გადანერგვის შემდეგ 2-4 კვირის პერიოდში:</p><ul><li>ახლა შეგიძლიათ გამოიყენოთ ჩვეულებრივი შამპუნი, მაგრამ დაიბანეთ ნაზი მოძრაობებით</li><li>მოერიდეთ წყლის პირდაპირ შესხურებას დამუშავებულ ადგილზე</li><li>ნუ გაიხეხავთ თავის კანს, ნაზად გაიკეთეთ მასაჟი</li><li>შეგიძლიათ მსუბუქი სპორტი, მაგრამ მოერიდეთ ზედმეტ ოფლიანობას და მოძრაობებს</li><li>დაიცავით მზისგან, გამოიყენეთ ქუდი</li></ul>",
    imageUrl: "/images/aftercare/2-4-weeks-care.jpg",
    pdfUrlTR: "/documents/sac-ekimi-2-4-hafta-bakim-rehberi.pdf",
    pdfUrlEN: "/documents/hair-transplant-2-4-weeks-care-guide.pdf",
    pdfUrlRU: "/documents/руководство-по-уходу-2-4-недели.pdf",
    pdfUrlKA: "/documents/თმის-გადანერგვის-2-4-კვირის-მოვლის-სახელმძღვანელო.pdf",
    order: 2,
    isActive: true,
    createdAt: new Date("2025-03-14"),
    updatedAt: new Date("2025-03-14")
  },
  {
    id: 3,
    titleTR: "Saç Ekimi Sonrası 1-3 Ay Bakım Rehberi",
    titleEN: "1-3 Months Care Guide After Hair Transplantation",
    titleRU: "Руководство по уходу через 1-3 месяца после пересадки волос",
    titleKA: "მოვლის სახელმძღვანელო თმის გადანერგვის შემდეგ 1-3 თვის განმავლობაში",
    contentTR: "<p>Saç ekimi sonrası 1-3 ay arasındaki süreçte dikkat etmeniz gereken hususlar:</p><ul><li>Bu dönemde şok dökülme yaşayabilirsiniz, endişelenmeyin</li><li>Doktorunuzun önerdiği vitaminleri almaya devam edin</li><li>Hafif spor aktivitelerine başlayabilirsiniz</li><li>Hala saç boyatmaktan kaçının</li><li>Düzenli PRP tedavisi düşünebilirsiniz</li></ul>",
    contentEN: "<p>Points you should pay attention to in the period between 1-3 months after hair transplantation:</p><ul><li>You may experience shock loss during this period, do not worry</li><li>Continue taking the vitamins recommended by your doctor</li><li>You can start light sports activities</li><li>Still avoid dyeing your hair</li><li>You can consider regular PRP treatment</li></ul>",
    contentRU: "<p>Моменты, на которые следует обратить внимание в период от 1 до 3 месяцев после пересадки волос:</p><ul><li>В этот период вы можете испытать шоковое выпадение волос, не беспокойтесь</li><li>Продолжайте принимать витамины, рекомендованные врачом</li><li>Вы можете начать легкие спортивные занятия</li><li>По-прежнему избегайте окрашивания волос</li><li>Вы можете рассмотреть возможность регулярного PRP-лечения</li></ul>",
    contentKA: "<p>საკითხები, რომლებზეც უნდა მიაქციოთ ყურადღება თმის გადანერგვის შემდეგ 1-3 თვის პერიოდში:</p><ul><li>ამ პერიოდში შეიძლება განიცადოთ შოკური დაკარგვა, ნუ ინერვიულებთ</li><li>განაგრძეთ ექიმის მიერ რეკომენდებული ვიტამინების მიღება</li><li>შეგიძლიათ დაიწყოთ მსუბუქი სპორტული აქტივობები</li><li>ჯერ კიდევ მოერიდეთ თმის შეღებვას</li><li>შეგიძლიათ განიხილოთ რეგულარული PRP მკურნალობა</li></ul>",
    imageUrl: "/images/aftercare/1-3-months-care.jpg",
    pdfUrlTR: "/documents/sac-ekimi-1-3-ay-bakim-rehberi.pdf",
    pdfUrlEN: "/documents/hair-transplant-1-3-months-care-guide.pdf",
    pdfUrlRU: "/documents/руководство-по-уходу-1-3-месяца.pdf",
    pdfUrlKA: "/documents/თმის-გადანერგვის-1-3-თვის-მოვლის-სახელმძღვანელო.pdf",
    order: 3,
    isActive: true,
    createdAt: new Date("2025-03-13"),
    updatedAt: new Date("2025-03-13")
  },
  {
    id: 4,
    titleTR: "Kaş Ekimi Sonrası Bakım Rehberi",
    titleEN: "Aftercare Guide for Eyebrow Transplantation",
    titleRU: "Руководство по уходу после пересадки бровей",
    titleKA: "მოვლის სახელმძღვანელო წარბების გადანერგვის შემდეგ",
    contentTR: "<p>Kaş ekimi sonrası dikkat etmeniz gereken hususlar:</p><ul><li>İlk 10 gün ekim yapılan bölgeyi ıslatmayın</li><li>Doktorunuzun verdiği özel kremi düzenli uygulayın</li><li>3 hafta boyunca kaşlarınıza dokunmayın ve şekil vermeye çalışmayın</li><li>Kaş bölgesini güneşten koruyun</li><li>İlk 6 ay makyaj ürünlerinden uzak durun</li></ul>",
    contentEN: "<p>Points you should pay attention to after eyebrow transplantation:</p><ul><li>Do not wet the transplanted area for the first 10 days</li><li>Apply the special cream given by your doctor regularly</li><li>Do not touch your eyebrows and try to shape them for 3 weeks</li><li>Protect the eyebrow area from the sun</li><li>Stay away from makeup products for the first 6 months</li></ul>",
    contentRU: "<p>Моменты, на которые следует обратить внимание после пересадки бровей:</p><ul><li>Не смачивайте пересаженную область в течение первых 10 дней</li><li>Регулярно наносите специальный крем, выданный врачом</li><li>Не трогайте брови и не пытайтесь их оформить в течение 3 недель</li><li>Защищайте область бровей от солнца</li><li>В течение первых 6 месяцев держитесь подальше от косметических средств</li></ul>",
    contentKA: "<p>საკითხები, რომლებზეც უნდა მიაქციოთ ყურადღება წარბების გადანერგვის შემდეგ:</p><ul><li>არ დაასველოთ გადანერგილი ადგილი პირველი 10 დღის განმავლობაში</li><li>რეგულარულად გამოიყენეთ ექიმის მიერ მოცემული სპეციალური კრემი</li><li>არ შეეხოთ წარბებს და არ სცადოთ მათი ფორმირება 3 კვირის განმავლობაში</li><li>დაიცავით წარბების ზონა მზისგან</li><li>მოერიდეთ კოსმეტიკურ საშუალებებს პირველი 6 თვის განმავლობაში</li></ul>",
    imageUrl: "/images/aftercare/eyebrow-care.jpg",
    pdfUrlTR: "/documents/kas-ekimi-bakim-rehberi.pdf",
    pdfUrlEN: "/documents/eyebrow-transplant-care-guide.pdf",
    pdfUrlRU: "/documents/руководство-по-уходу-после-пересадки-бровей.pdf",
    pdfUrlKA: "/documents/წარბების-გადანერგვის-მოვლის-სახელმძღვანელო.pdf",
    order: 4,
    isActive: true,
    createdAt: new Date("2025-03-12"),
    updatedAt: new Date("2025-03-12")
  },
  {
    id: 5,
    titleTR: "PRP Tedavisi Sonrası Bakım Rehberi",
    titleEN: "Aftercare Guide for PRP Treatment",
    titleRU: "Руководство по уходу после PRP-терапии",
    titleKA: "მოვლის სახელმძღვანელო PRP მკურნალობის შემდეგ",
    contentTR: "<p>PRP tedavisi sonrası dikkat etmeniz gereken hususlar:</p><ul><li>İşlem sonrası 24 saat boyunca saçınızı yıkamayın</li><li>3 gün boyunca sauna, hamam gibi ıslak ve sıcak ortamlardan uzak durun</li><li>48 saat spor aktivitelerinden kaçının</li><li>Alkol tüketiminden 24 saat kaçının</li><li>İşlemden sonraki 2 hafta boyunca saç boyası kullanmayın</li></ul>",
    contentEN: "<p>Points you should pay attention to after PRP treatment:</p><ul><li>Do not wash your hair for 24 hours after the procedure</li><li>Stay away from wet and hot environments such as sauna, Turkish bath for 3 days</li><li>Avoid sports activities for 48 hours</li><li>Avoid alcohol consumption for 24 hours</li><li>Do not use hair dye for 2 weeks after the procedure</li></ul>",
    contentRU: "<p>Моменты, на которые следует обратить внимание после PRP-терапии:</p><ul><li>Не мойте волосы в течение 24 часов после процедуры</li><li>В течение 3 дней держитесь подальше от влажных и горячих сред, таких как сауна, хаммам</li><li>Избегайте спортивных занятий в течение 48 часов</li><li>Избегайте употребления алкоголя в течение 24 часов</li><li>Не используйте краску для волос в течение 2 недель после процедуры</li></ul>",
    contentKA: "<p>საკითხები, რომლებზეც უნდა მიაქციოთ ყურადღება PRP მკურნალობის შემდეგ:</p><ul><li>არ დაიბანოთ თმა პროცედურის შემდეგ 24 საათის განმავლობაში</li><li>მოერიდეთ სველ და ცხელ გარემოს, როგორიცაა საუნა, აბანო 3 დღის განმავლობაში</li><li>მოერიდეთ სპორტულ აქტივობებს 48 საათის განმავლობაში</li><li>მოერიდეთ ალკოჰოლის მოხმარებას 24 საათის განმავლობაში</li><li>არ გამოიყენოთ თმის საღებავი პროცედურის შემდეგ 2 კვირის განმავლობაში</li></ul>",
    imageUrl: "/images/aftercare/prp-care.jpg",
    pdfUrlTR: "/documents/prp-tedavisi-bakim-rehberi.pdf",
    pdfUrlEN: "/documents/prp-treatment-care-guide.pdf",
    pdfUrlRU: "/documents/руководство-по-уходу-после-prp-терапии.pdf",
    pdfUrlKA: "/documents/prp-მკურნალობის-მოვლის-სახელმძღვანელო.pdf",
    order: 5,
    isActive: false,
    createdAt: new Date("2025-03-11"),
    updatedAt: new Date("2025-03-11")
  }
];

// Dil seçenekleri
const languages = [
  { id: "TR", name: "Türkçe" },
  { id: "EN", name: "İngilizce" },
  { id: "RU", name: "Rusça" },
  { id: "KA", name: "Gürcüce" }
];

interface AftercareManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const AftercareManagement: React.FC<AftercareManagementProps> = () => {
  const [guides, setGuides] = useState(mockAftercareGuides);
  const [activeLanguage, setActiveLanguage] = useState<string>("TR");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filtrele
  const filteredGuides = guides.filter(guide => {
    return guide[`title${activeLanguage}` as keyof typeof guide].toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Rehber sıralamasını değiştir
  const changeOrder = (id: number, direction: 'up' | 'down') => {
    const newGuides = [...guides];
    const index = newGuides.findIndex(guide => guide.id === id);
    
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === newGuides.length - 1)) {
      return;
    }
    
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Sıra numaralarını değiştir
    const tempOrder = newGuides[index].order;
    newGuides[index].order = newGuides[swapIndex].order;
    newGuides[swapIndex].order = tempOrder;
    
    // Diziyi sıraya göre yeniden düzenle
    newGuides.sort((a, b) => a.order - b.order);
    
    setGuides(newGuides);
  };
  
  // Rehberin aktiflik durumunu değiştir
  const toggleActive = (id: number) => {
    setGuides(guides.map(guide => 
      guide.id === id ? {...guide, isActive: !guide.isActive} : guide
    ));
  };
  
  // Rehberi sil
  const deleteGuide = (id: number) => {
    if (window.confirm("Bu bakım rehberini silmek istediğinizden emin misiniz?")) {
      setGuides(guides.filter(guide => guide.id !== id));
    }
  };
  
  // Detay modalını aç
  const openDetailModal = (guide: any) => {
    setSelectedGuide(guide);
    setIsDetailModalOpen(true);
  };
  
  // Yeni rehber ekleme modalını aç
  const openAddModal = () => {
    setSelectedGuide(null);
    setIsAddModalOpen(true);
  };
  
  // PDF indirme, sadece örnek amaçlı
  const downloadPdf = (url: string, fileName: string) => {
    // Gerçek uygulamada doğru bir indirme mantığı kullanılmalıdır
    alert(`PDF indirme: ${url} - Dosya adı: ${fileName}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Bakım Rehberleri Yönetimi</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Yeni Rehber Ekle
        </button>
      </div>
      
      {/* Filtreler ve Dil Seçimi */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Rehber ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm text-primary hover:text-blue-700 flex items-center"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filtreyi Temizle
            </button>
          </div>
          
          <div className="flex items-center gap-4">
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
            
            <div className="flex border rounded-lg overflow-hidden">
              <button
                className={`p-2 ${
                  viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                className={`p-2 ${
                  viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("list")}
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rehber Listesi - Grid Görünümü */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={guide.imageUrl}
                    alt={guide[`title${activeLanguage}` as keyof typeof guide] as string}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => openDetailModal(guide)}
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="Düzenle"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => toggleActive(guide.id)}
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title={guide.isActive ? "Pasifleştir" : "Aktifleştir"}
                    >
                      {guide.isActive ? (
                        <XCircle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteGuide(guide.id)}
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                      Sıra: {guide.order}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        guide.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {guide.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">
                    {guide[`title${activeLanguage}` as keyof typeof guide]}
                  </h3>
                  <div
                    className="mt-2 text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: guide[`content${activeLanguage}` as keyof typeof guide] as string
                    }}
                  />
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {new Date(guide.updatedAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => {
                        const pdfUrl = guide[`pdfUrl${activeLanguage}` as keyof typeof guide];
                        if (pdfUrl) {
                          downloadPdf(
                            pdfUrl as string,
                            `${guide[`title${activeLanguage}` as keyof typeof guide]}.pdf`
                          );
                        }
                      }}
                      className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <FileDown className="w-4 h-4 mr-1" />
                      PDF İndir
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-40 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">Gösterilecek rehber bulunamadı.</p>
            </div>
          )}
        </div>
      ) : (
        // Liste Görünümü
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredGuides.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredGuides.map((guide) => (
                <div key={guide.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center space-y-1">
                        <button
                          onClick={() => changeOrder(guide.id, 'up')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Yukarı Taşı"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded">
                          {guide.order}
                        </span>
                        <button
                          onClick={() => changeOrder(guide.id, 'down')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Aşağı Taşı"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-lg">
                            {guide[`title${activeLanguage}` as keyof typeof guide]}
                          </h3>
                          <span
                            className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              guide.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {guide.isActive ? "Aktif" : "Pasif"}
                          </span>
                        </div>
                        <div
                          className="mt-2 text-sm text-gray-600 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: guide[`content${activeLanguage}` as keyof typeof guide] as string
                          }}
                        />
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span className="mr-3">Son güncelleme: {new Date(guide.updatedAt).toLocaleDateString()}</span>
                          <button
                            onClick={() => {
                              const pdfUrl = guide[`pdfUrl${activeLanguage}` as keyof typeof guide];
                              if (pdfUrl) {
                                downloadPdf(
                                  pdfUrl as string,
                                  `${guide[`title${activeLanguage}` as keyof typeof guide]}.pdf`
                                );
                              }
                            }}
                            className="text-primary hover:text-blue-700 font-medium flex items-center"
                          >
                            <FileDown className="w-3 h-3 mr-1" />
                            PDF
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <button
                        onClick={() => toggleActive(guide.id)}
                        className={`p-1 ${
                          guide.isActive
                            ? "text-green-500 hover:text-green-700"
                            : "text-orange-500 hover:text-orange-700"
                        }`}
                        title={guide.isActive ? "Pasifleştir" : "Aktifleştir"}
                      >
                        {guide.isActive ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => openDetailModal(guide)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="Düzenle"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteGuide(guide.id)}
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
              <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p>Gösterilecek rehber bulunamadı.</p>
              <p className="text-sm mt-1">Filtreleri temizlemeyi veya başka bir arama yapmayı deneyin.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Düzenleme Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Bakım Rehberi Düzenle</DialogTitle>
            <DialogDescription>
              Bakım rehberi detaylarını düzenleyin.
            </DialogDescription>
          </DialogHeader>
          
          {selectedGuide && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sıra:</span>
                  <input 
                    type="number" 
                    defaultValue={selectedGuide.order}
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
                      defaultChecked={selectedGuide.isActive}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                      Aktif
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Görsel
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="h-32 w-32 border border-gray-300 rounded-md overflow-hidden">
                      <img 
                        src={selectedGuide.imageUrl} 
                        alt="Görsel Önizleme" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="ml-4 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      Değiştir
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PDF Dosyaları
                  </label>
                  <div className="mt-1 space-y-2">
                    {languages.map((lang) => {
                      const pdfKey = `pdfUrl${lang.id}` as keyof typeof selectedGuide;
                      const pdfUrl = selectedGuide[pdfKey] as string;
                      
                      return (
                        <div key={lang.id} className="flex items-center justify-between">
                          <span className="text-sm">{lang.name} PDF:</span>
                          {pdfUrl ? (
                            <div className="flex items-center">
                              <button
                                onClick={() => downloadPdf(pdfUrl, `${selectedGuide[`title${lang.id}` as keyof typeof selectedGuide]}.pdf`)}
                                className="px-2 py-1 text-xs text-primary flex items-center"
                              >
                                <FileDown className="w-3 h-3 mr-1" />
                                İndir
                              </button>
                              <button className="px-2 py-1 text-xs text-gray-600 flex items-center ml-2">
                                Değiştir
                              </button>
                            </div>
                          ) : (
                            <button className="px-2 py-1 text-xs text-gray-600">
                              Dosya Ekle
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
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
                      Başlık ({languages.find(l => l.id === activeLanguage)?.name})
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedGuide[`title${activeLanguage}` as keyof typeof selectedGuide] as string}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      İçerik ({languages.find(l => l.id === activeLanguage)?.name})
                    </label>
                    <textarea
                      rows={10}
                      defaultValue={selectedGuide[`content${activeLanguage}` as keyof typeof selectedGuide] as string}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      HTML etiketleri kullanabilirsiniz. Örneğin: &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;b&gt;, &lt;i&gt;.
                    </p>
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
      
      {/* Yeni Rehber Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Yeni Bakım Rehberi Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir bakım rehberi ekleyin. Tüm dil seçeneklerini doldurmayı unutmayın.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sıra:</span>
                <input 
                  type="number" 
                  defaultValue={guides.length + 1}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Görsel
                </label>
                <div className="mt-1 flex items-center">
                  <div className="h-32 w-32 border border-gray-300 rounded-md flex items-center justify-center">
                    <PlusCircle className="h-8 w-8 text-gray-300" />
                  </div>
                  <button className="ml-4 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    Görsel Seç
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PDF Dosyaları
                </label>
                <div className="mt-1 space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="text-sm">{lang.name} PDF:</span>
                      <button className="px-2 py-1 text-xs text-gray-600">
                        Dosya Ekle
                      </button>
                    </div>
                  ))}
                </div>
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
                    Başlık ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`${languages.find(l => l.id === activeLanguage)?.name} başlık`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    İçerik ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <textarea
                    rows={10}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`${languages.find(l => l.id === activeLanguage)?.name} içerik`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    HTML etiketleri kullanabilirsiniz. Örneğin: &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;b&gt;, &lt;i&gt;.
                  </p>
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

export default AftercareManagement;