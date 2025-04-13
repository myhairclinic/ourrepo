import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Globe,
  Search,
  FileText,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Save,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Copy,
  Link,
  ExternalLink,
  AlertTriangle,
  Info,
  Loader2
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Örnek SEO verileri
const mockPageSeoSettings = [
  {
    id: 1,
    page: "home",
    pageTR: "Ana Sayfa",
    pageEN: "Home",
    pageRU: "Главная",
    pageKA: "მთავარი",
    metaTitleTR: "MyHair Clinic - Tbilisi'de Saç Ekimi ve Saç Tedavisi",
    metaTitleEN: "MyHair Clinic - Hair Transplantation and Treatment in Tbilisi",
    metaTitleRU: "MyHair Clinic - Трансплантация волос и лечение в Тбилиси",
    metaTitleKA: "MyHair Clinic - თმის გადანერგვა და მკურნალობა თბილისში",
    metaDescriptionTR: "Tbilisi'de bulunan MyHair Clinic, en son teknoloji ve uzman ekibiyle kaliteli saç ekimi ve saç tedavisi hizmetleri sunmaktadır.",
    metaDescriptionEN: "MyHair Clinic in Tbilisi offers high-quality hair transplantation and hair treatment services with the latest technology and expert team.",
    metaDescriptionRU: "MyHair Clinic в Тбилиси предлагает высококачественные услуги по трансплантации волос и лечению волос с использованием новейших технологий и команды экспертов.",
    metaDescriptionKA: "MyHair Clinic თბილისში გთავაზობთ მაღალი ხარისხის თმის გადანერგვისა და თმის მკურნალობის სერვისებს უახლესი ტექნოლოგიებით და ექსპერტთა გუნდით.",
    metaKeywordsTR: "saç ekimi, tbilisi saç ekimi, fue, dhi, saç tedavisi, saç mezoterapisi, prp",
    metaKeywordsEN: "hair transplant, tbilisi hair transplant, fue, dhi, hair treatment, hair mesotherapy, prp",
    metaKeywordsRU: "трансплантация волос, пересадка волос тбилиси, fue, dhi, лечение волос, мезотерапия волос, prp",
    metaKeywordsKA: "თმის გადანერგვა, თბილისის თმის გადანერგვა, fue, dhi, თმის მკურნალობა, თმის მეზოთერაპია, prp",
    canonicalUrl: "/",
    isActive: true,
    lastUpdated: new Date("2025-03-15")
  },
  {
    id: 2,
    page: "services",
    pageTR: "Hizmetler",
    pageEN: "Services",
    pageRU: "Услуги",
    pageKA: "სერვისები",
    metaTitleTR: "MyHair Clinic Saç Ekimi ve Tedavi Hizmetleri | Tbilisi",
    metaTitleEN: "MyHair Clinic Hair Transplantation and Treatment Services | Tbilisi",
    metaTitleRU: "Услуги по трансплантации и лечению волос в MyHair Clinic | Тбилиси",
    metaTitleKA: "MyHair Clinic-ის თმის გადანერგვისა და მკურნალობის სერვისები | თბილისი",
    metaDescriptionTR: "MyHair Clinic, FUE ve DHI teknikleriyle saç ekimi, kaş ekimi, sakal ekimi, PRP tedavisi ve saç mezoterapisi hizmetleri sunmaktadır.",
    metaDescriptionEN: "MyHair Clinic offers hair transplantation with FUE and DHI techniques, eyebrow transplantation, beard transplantation, PRP treatment, and hair mesotherapy services.",
    metaDescriptionRU: "MyHair Clinic предлагает трансплантацию волос по технологиям FUE и DHI, трансплантацию бровей, трансплантацию бороды, PRP-терапию и услуги мезотерапии волос.",
    metaDescriptionKA: "MyHair Clinic გთავაზობთ თმის გადანერგვას FUE და DHI ტექნიკებით, წარბების გადანერგვას, წვერის გადანერგვას, PRP მკურნალობას და თმის მეზოთერაპიის სერვისებს.",
    metaKeywordsTR: "saç ekimi, kaş ekimi, sakal ekimi, prp tedavisi, saç mezoterapisi, fue, dhi",
    metaKeywordsEN: "hair transplant, eyebrow transplant, beard transplant, prp treatment, hair mesotherapy, fue, dhi",
    metaKeywordsRU: "трансплантация волос, пересадка бровей, пересадка бороды, prp терапия, мезотерапия волос, fue, dhi",
    metaKeywordsKA: "თმის გადანერგვა, წარბების გადანერგვა, წვერის გადანერგვა, prp მკურნალობა, თმის მეზოთერაპია, fue, dhi",
    canonicalUrl: "/services",
    isActive: true,
    lastUpdated: new Date("2025-03-14")
  },
  {
    id: 3,
    page: "packages",
    pageTR: "Paketler",
    pageEN: "Packages",
    pageRU: "Пакеты",
    pageKA: "პაკეტები",
    metaTitleTR: "Saç Ekimi Paketleri | MyHair Clinic Tbilisi",
    metaTitleEN: "Hair Transplantation Packages | MyHair Clinic Tbilisi",
    metaTitleRU: "Пакеты трансплантации волос | MyHair Clinic Тбилиси",
    metaTitleKA: "თმის გადანერგვის პაკეტები | MyHair Clinic თბილისი",
    metaDescriptionTR: "MyHair Clinic'in özel saç ekimi paketleri konaklama, transfer ve şehir turu gibi ek hizmetleri içermektedir. Farklı bütçelere uygun paketler sunuyoruz.",
    metaDescriptionEN: "MyHair Clinic's special hair transplantation packages include additional services such as accommodation, transfers, and city tours. We offer packages suitable for different budgets.",
    metaDescriptionRU: "Специальные пакеты трансплантации волос MyHair Clinic включают дополнительные услуги, такие как проживание, трансферы и экскурсии по городу. Мы предлагаем пакеты, подходящие для разных бюджетов.",
    metaDescriptionKA: "MyHair Clinic-ის სპეციალური თმის გადანერგვის პაკეტები მოიცავს დამატებით სერვისებს, როგორიცაა საცხოვრებელი, ტრანსფერები და ქალაქის ტურები. ჩვენ გთავაზობთ სხვადასხვა ბიუჯეტისთვის შესაფერის პაკეტებს.",
    metaKeywordsTR: "saç ekimi paketi, saç ekimi konaklama, tbilisi saç ekimi paket, saç ekimi tatil paketi",
    metaKeywordsEN: "hair transplant package, hair transplant accommodation, tbilisi hair transplant package, hair transplant holiday package",
    metaKeywordsRU: "пакет трансплантации волос, проживание с трансплантацией волос, пакет трансплантации волос тбилиси, пакет отдыха с трансплантацией волос",
    metaKeywordsKA: "თმის გადანერგვის პაკეტი, თმის გადანერგვის საცხოვრებელი, თბილისის თმის გადანერგვის პაკეტი, თმის გადანერგვის დასვენების პაკეტი",
    canonicalUrl: "/packages",
    isActive: true,
    lastUpdated: new Date("2025-03-13")
  },
  {
    id: 4,
    page: "blog",
    pageTR: "Blog",
    pageEN: "Blog",
    pageRU: "Блог",
    pageKA: "ბლოგი",
    metaTitleTR: "Saç Ekimi ve Saç Sağlığı Blog | MyHair Clinic",
    metaTitleEN: "Hair Transplantation and Hair Health Blog | MyHair Clinic",
    metaTitleRU: "Блог о трансплантации волос и здоровье волос | MyHair Clinic",
    metaTitleKA: "თმის გადანერგვისა და თმის ჯანმრთელობის ბლოგი | MyHair Clinic",
    metaDescriptionTR: "Saç ekimi, saç bakımı, saç dökülmesi ve saç sağlığı hakkında en güncel bilgiler ve uzman tavsiyeleri için MyHair Clinic'in blogunu keşfedin.",
    metaDescriptionEN: "Explore MyHair Clinic's blog for the most up-to-date information and expert advice on hair transplantation, hair care, hair loss, and hair health.",
    metaDescriptionRU: "Изучите блог MyHair Clinic, чтобы получить самую актуальную информацию и советы экспертов по трансплантации волос, уходу за волосами, выпадению волос и здоровью волос.",
    metaDescriptionKA: "გაეცანით MyHair Clinic-ის ბლოგს, რათა მიიღოთ უახლესი ინფორმაცია და ექსპერტთა რჩევები თმის გადანერგვის, თმის მოვლის, თმის ცვენის და თმის ჯანმრთელობის შესახებ.",
    metaKeywordsTR: "saç ekimi blog, saç bakımı, saç dökülmesi, saç sağlığı, myhair clinic blog",
    metaKeywordsEN: "hair transplant blog, hair care, hair loss, hair health, myhair clinic blog",
    metaKeywordsRU: "блог о трансплантации волос, уход за волосами, выпадение волос, здоровье волос, блог myhair clinic",
    metaKeywordsKA: "თმის გადანერგვის ბლოგი, თმის მოვლა, თმის ცვენა, თმის ჯანმრთელობა, myhair clinic ბლოგი",
    canonicalUrl: "/blog",
    isActive: true,
    lastUpdated: new Date("2025-03-12")
  },
  {
    id: 5,
    page: "contact",
    pageTR: "İletişim",
    pageEN: "Contact",
    pageRU: "Контакты",
    pageKA: "კონტაქტი",
    metaTitleTR: "MyHair Clinic ile İletişime Geçin | Tbilisi Saç Ekimi",
    metaTitleEN: "Contact MyHair Clinic | Hair Transplantation in Tbilisi",
    metaTitleRU: "Свяжитесь с MyHair Clinic | Трансплантация волос в Тбилиси",
    metaTitleKA: "დაუკავშირდით MyHair Clinic-ს | თმის გადანერგვა თბილისში",
    metaDescriptionTR: "MyHair Clinic ile iletişime geçin ve ücretsiz konsültasyon randevusu alın. Adresimiz: Tsotne Dadiani 59, Tbilisi, Gürcistan.",
    metaDescriptionEN: "Contact MyHair Clinic and schedule a free consultation. Our address: Tsotne Dadiani 59, Tbilisi, Georgia.",
    metaDescriptionRU: "Свяжитесь с MyHair Clinic и запишитесь на бесплатную консультацию. Наш адрес: Цотне Дадиани 59, Тбилиси, Грузия.",
    metaDescriptionKA: "დაუკავშირდით MyHair Clinic-ს და დაჯავშნეთ უფასო კონსულტაცია. ჩვენი მისამართი: წოტნე დადიანი 59, თბილისი, საქართველო.",
    metaKeywordsTR: "myhair clinic iletişim, tbilisi saç ekimi iletişim, saç ekimi klinik iletişim",
    metaKeywordsEN: "myhair clinic contact, tbilisi hair transplant contact, hair transplant clinic contact",
    metaKeywordsRU: "контакты myhair clinic, контакты трансплантации волос тбилиси, контакты клиники трансплантации волос",
    metaKeywordsKA: "myhair clinic კონტაქტი, თბილისის თმის გადანერგვის კონტაქტი, თმის გადანერგვის კლინიკის კონტაქტი",
    canonicalUrl: "/contact",
    isActive: true,
    lastUpdated: new Date("2025-03-11")
  }
];

// Örnek genel SEO ayarları
const mockGeneralSeoSettings = {
  siteName: "MyHair Clinic",
  defaultLanguage: "tr",
  supportedLanguages: ["tr", "en", "ru", "ka"],
  robotsTxt: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://myhairclinic.com/sitemap.xml`,
  googleAnalyticsId: "G-XYZ123456",
  googleTagManagerId: "",
  facebookPixelId: "123456789012345",
  openGraphImage: "/images/seo/og-image.jpg",
  twitterCardType: "summary_large_image",
  twitterUsername: "@myhairclinic",
  structuredData: {
    organizationType: "MedicalBusiness",
    organizationName: "MyHair Clinic",
    logo: "https://myhairclinic.com/images/logo.png",
    address: {
      street: "Tsotne Dadiani 59",
      city: "Tbilisi",
      country: "Georgia",
      zipCode: ""
    },
    contactPoint: {
      telephone: "+995555003044",
      email: "myhairtbilisi@gmail.com"
    },
    sameAs: [
      "https://www.facebook.com/myhairclinic",
      "https://www.instagram.com/myhairclinic",
      "https://www.tiktok.com/@myhairtbilisi"
    ]
  }
};

// Örnek SEO analiz verileri
const mockSeoAnalysisData = {
  pageSpeed: {
    mobile: 82,
    desktop: 94
  },
  issuesCount: {
    critical: 2,
    warning: 5,
    info: 8
  },
  topIssues: [
    {
      type: "critical",
      title: "Eksik alt etiketleri",
      description: "8 görsel, alt etiketi olmadan kullanılıyor",
      affectedPages: ["/", "/services", "/packages"]
    },
    {
      type: "critical",
      title: "Crawl engelleri",
      description: "2 sayfada robots.txt engeli var",
      affectedPages: ["/admin/dashboard", "/api/services"]
    },
    {
      type: "warning",
      title: "Düşük kelime sayısı",
      description: "3 sayfa, önerilen minimum kelime sayısının altında",
      affectedPages: ["/contact", "/testimonials", "/faq"]
    },
    {
      type: "warning",
      title: "Eksik başlık etiketleri",
      description: "2 sayfa H1 etiketi içermiyor",
      affectedPages: ["/privacy-policy", "/terms-of-service"]
    },
    {
      type: "info",
      title: "İç bağlantılar",
      description: "Ana sayfada daha fazla iç bağlantı kullanılabilir",
      affectedPages: ["/"]
    }
  ],
  keywordRankings: [
    {
      keyword: "saç ekimi tbilisi",
      position: 3,
      change: 2,
      searchVolume: 1200
    },
    {
      keyword: "hair transplant tbilisi",
      position: 2,
      change: 1,
      searchVolume: 2400
    },
    {
      keyword: "пересадка волос тбилиси",
      position: 1,
      change: 0,
      searchVolume: 1800
    },
    {
      keyword: "თმის გადანერგვა თბილისში",
      position: 1,
      change: 0,
      searchVolume: 800
    }
  ],
  backlinks: {
    total: 156,
    domains: 43,
    newLastMonth: 12
  }
};

// Dil seçenekleri
const languages = [
  { id: "TR", name: "Türkçe" },
  { id: "EN", name: "İngilizce" },
  { id: "RU", name: "Rusça" },
  { id: "KA", name: "Gürcüce" }
];

interface SeoManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const SeoManagement: React.FC<SeoManagementProps> = () => {
  const [pageSeoSettings, setPageSeoSettings] = useState<any[]>([]);
  const [generalSeoSettings, setGeneralSeoSettings] = useState(mockGeneralSeoSettings);
  const [seoAnalysisData, setSeoAnalysisData] = useState(mockSeoAnalysisData);
  
  // SEO sayfalarını getir
  const { isLoading: isPagesLoading, data: seoPages } = useQuery({
    queryKey: ['/api/seo/pages'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/seo/pages');
        if (!response.ok) {
          throw new Error('SEO sayfaları alınamadı');
        }
        return await response.json();
      } catch (error) {
        console.error('SEO sayfaları yüklenirken hata:', error);
        return [];
      }
    }
  });
  
  // SEO Analiz verilerini getir
  const { isLoading: isAnalysisLoading, data: analysisData } = useQuery({
    queryKey: ['/api/seo/analyze'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/seo/analyze');
        if (!response.ok) {
          throw new Error('SEO analiz verileri alınamadı');
        }
        return await response.json();
      } catch (error) {
        console.error('SEO analiz verileri yüklenirken hata:', error);
        return null;
      }
    },
    enabled: activeTab === 'analysis' // Sadece analysis tabı açıkken çalıştır
  });
  
  const [activeTab, setActiveTab] = useState("pages");
  const [activeLanguage, setActiveLanguage] = useState<string>("TR");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // SEO Ayarlarını getir
  const { isLoading: isGeneralSettingsLoading, data: generalSettings } = useQuery({
    queryKey: ['/api/settings/general'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/settings/section/general');
        if (!response.ok) {
          throw new Error('Genel SEO ayarları alınamadı');
        }
        return await response.json();
      } catch (error) {
        console.error('Genel ayarlar yüklenirken hata:', error);
        return [];
      }
    }
  });
  
  // SEO ayarlarını kaydet
  const saveSettingsMutation = useMutation({
    mutationFn: async (settings: any[]) => {
      const response = await apiRequest('POST', '/api/settings/batch', settings);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ayarlar kaydedilemedi');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'SEO ayarları başarıyla kaydedildi',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/settings/general'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Hata',
        description: `SEO ayarları kaydedilemedi: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  // SEO sayfası kaydetme
  const savePageMutation = useMutation({
    mutationFn: async (pageData: any) => {
      const response = await apiRequest('POST', '/api/seo/pages', pageData);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'SEO sayfası kaydedilemedi');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'SEO sayfası başarıyla kaydedildi',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
      setIsDetailModalOpen(false);
      setIsAddPageModalOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Hata',
        description: `SEO sayfası kaydedilemedi: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  // SEO sayfası silme
  const deletePageMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/seo/pages/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'SEO sayfası silinemedi');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'SEO sayfası başarıyla silindi',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/seo/pages'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Hata',
        description: `SEO sayfası silinemedi: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  // Sitemap oluşturma
  const generateSitemapMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/seo/generate-sitemap');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Sitemap oluşturulamadı');
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Başarılı',
        description: 'Sitemap başarıyla oluşturuldu',
        variant: 'default',
      });
      // İsteğe bağlı olarak burada sitemap dosyasını açabilirsiniz
      window.open('/sitemap.xml', '_blank');
    },
    onError: (error: Error) => {
      toast({
        title: 'Hata',
        description: `Sitemap oluşturulamadı: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  // Ayarları formatlayarak hazırla
  const prepareSettingsForSave = () => {
    const settings = [
      { section: 'general', key: 'siteName', value: generalSeoSettings.siteName },
      { section: 'general', key: 'defaultLanguage', value: generalSeoSettings.defaultLanguage },
      { section: 'general', key: 'supportedLanguages', value: generalSeoSettings.supportedLanguages },
      { section: 'general', key: 'robotsTxt', value: generalSeoSettings.robotsTxt },
      { section: 'general', key: 'googleAnalyticsId', value: generalSeoSettings.googleAnalyticsId },
      { section: 'general', key: 'googleTagManagerId', value: generalSeoSettings.googleTagManagerId },
      { section: 'general', key: 'facebookPixelId', value: generalSeoSettings.facebookPixelId },
      { section: 'general', key: 'openGraphImage', value: generalSeoSettings.openGraphImage },
      { section: 'general', key: 'twitterCardType', value: generalSeoSettings.twitterCardType },
      { section: 'general', key: 'twitterUsername', value: generalSeoSettings.twitterUsername },
      { section: 'general', key: 'structuredData', value: generalSeoSettings.structuredData },
    ];
    
    return settings;
  };
  
  // Genel SEO ayarlarını kaydet
  const handleSaveGeneralSettings = () => {
    const settings = prepareSettingsForSave();
    saveSettingsMutation.mutate(settings);
  };
  
  // Genel ayarlar yüklendiğinde state'i güncelle
  useEffect(() => {
    if (generalSettings && generalSettings.length > 0) {
      // Ayarları düzenli bir obje haline getir
      const settingsObj: any = {};
      generalSettings.forEach((setting: any) => {
        settingsObj[setting.key] = setting.value;
      });
      
      // State'i güncelle (mevcut default değerlerle birleştir)
      setGeneralSeoSettings(prev => ({
        ...prev,
        ...settingsObj
      }));
    }
  }, [generalSettings]);
  
  // API'den SEO sayfa verilerini state'e aktar
  useEffect(() => {
    if (seoPages) {
      setPageSeoSettings(seoPages);
    }
  }, [seoPages]);
  
  // API'den SEO analiz verilerini state'e aktar
  useEffect(() => {
    if (analysisData) {
      setSeoAnalysisData(analysisData);
    }
  }, [analysisData]);
  
  // Filtreleme - boş değerlere karşı koruma eklenmiş
  const filteredPages = pageSeoSettings.filter(page => {
    return (
      page && (
        (page[`page${activeLanguage}` as keyof typeof page] || "").toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        (page[`metaTitle${activeLanguage}` as keyof typeof page] || "").toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        (page[`metaDescription${activeLanguage}` as keyof typeof page] || "").toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });
  
  // Detay modalını aç
  const openDetailModal = (page: any) => {
    setSelectedPage(page);
    setIsDetailModalOpen(true);
  };
  
  // Yeni sayfa ekleme modalını aç
  const openAddPageModal = () => {
    setSelectedPage(null);
    setIsAddPageModalOpen(true);
  };
  
  // Sayfa SEO ayarlarını güncelle
  const updatePageSeoSettings = (page: any) => {
    setPageSeoSettings(pageSeoSettings.map(p => 
      p.id === page.id ? page : p
    ));
    setIsDetailModalOpen(false);
  };
  
  // SEO önizlemesi için yardımcı fonksiyon
  const SeoPreview = ({ title, description, url }: { title: string, description: string, url: string }) => {
    return (
      <div className="my-4 border border-gray-200 rounded-lg p-4 max-w-lg">
        <div className="text-lg text-blue-600 overflow-hidden text-ellipsis font-medium">{title}</div>
        <div className="text-green-800 text-sm mb-1">{url}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    );
  };
  
  // Meta etiketleri önizlemesi için yardımcı fonksiyon
  const MetaTagsPreview = ({ title, description, keywords }: { title: string, description: string, keywords: string }) => {
    return (
      <div className="my-4 font-mono bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
        <div className="text-gray-800">
          <span className="text-blue-600">&lt;title&gt;</span>{title}<span className="text-blue-600">&lt;/title&gt;</span>
        </div>
        <div className="text-gray-800">
          <span className="text-blue-600">&lt;meta</span> name=<span className="text-green-600">"description"</span> content=<span className="text-green-600">"{description}"</span><span className="text-blue-600">&gt;</span>
        </div>
        <div className="text-gray-800">
          <span className="text-blue-600">&lt;meta</span> name=<span className="text-green-600">"keywords"</span> content=<span className="text-green-600">"{keywords}"</span><span className="text-blue-600">&gt;</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">SEO Yönetimi</h2>
        
        <div className="flex items-center space-x-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center text-gray-700"
          >
            <FileText className="w-4 h-4 mr-1.5" />
            Sitemap Görüntüle
          </a>
          
          <button
            onClick={() => generateSitemapMutation.mutate()}
            disabled={generateSitemapMutation.isPending}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium flex items-center"
          >
            {generateSitemapMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-1.5" />
            )}
            {generateSitemapMutation.isPending ? "Oluşturuluyor..." : "Sitemap Oluştur"}
          </button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="pages" className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Sayfa Meta Etiketleri
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Genel SEO Ayarları
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center">
            <Search className="w-4 h-4 mr-2" />
            SEO Analizi
          </TabsTrigger>
        </TabsList>
        
        {/* Sayfa Meta Etiketleri İçeriği */}
        <TabsContent value="pages" className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Sayfa ara..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
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
                
                <button
                  onClick={openAddPageModal}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Yeni Sayfa Ekle
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sayfa
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meta Başlık
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meta Açıklama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Son Güncelleme
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPages.length > 0 ? (
                    filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-gray-500">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {page[`page${activeLanguage}` as keyof typeof page]}
                              </div>
                              <div className="text-xs text-gray-500">
                                {page.page}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 line-clamp-1 max-w-xs">
                            {page[`metaTitle${activeLanguage}` as keyof typeof page]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 line-clamp-1 max-w-xs">
                            {page[`metaDescription${activeLanguage}` as keyof typeof page]}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-600">
                            {page.canonicalUrl}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(page.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openDetailModal(page)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Düzenle"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={page.canonicalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900"
                                    title="Sayfayı Görüntüle"
                                  >
                                    <ExternalLink className="h-5 w-5" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Sayfayı Görüntüle</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        Gösterilecek sayfa bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {/* Genel SEO Ayarları İçeriği */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temel Site Ayarları</CardTitle>
                <CardDescription>
                  Sitenizin temel SEO ayarlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    value={generalSeoSettings.siteName}
                    onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, siteName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">
                    Varsayılan Dil
                  </label>
                  <select
                    id="defaultLanguage"
                    value={generalSeoSettings.defaultLanguage}
                    onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, defaultLanguage: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">İngilizce</option>
                    <option value="ru">Rusça</option>
                    <option value="ka">Gürcüce</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="openGraphImage" className="block text-sm font-medium text-gray-700">
                    Varsayılan Sosyal Medya Görüntüsü (Open Graph)
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="text"
                      id="openGraphImage"
                      value={generalSeoSettings.openGraphImage}
                      onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, openGraphImage: e.target.value})}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                    />
                    <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50">
                      Gözat
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Önerilen boyut: 1200 x 630 piksel</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Analitik ve İzleme</CardTitle>
                <CardDescription>
                  Web sitenizin performansını izlemek için analitik araçları yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-gray-700">
                    Google Analytics ID (GA4)
                  </label>
                  <input
                    type="text"
                    id="googleAnalyticsId"
                    value={generalSeoSettings.googleAnalyticsId}
                    onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, googleAnalyticsId: e.target.value})}
                    placeholder="G-XXXXXXXXXX"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="googleTagManagerId" className="block text-sm font-medium text-gray-700">
                    Google Tag Manager ID
                  </label>
                  <input
                    type="text"
                    id="googleTagManagerId"
                    value={generalSeoSettings.googleTagManagerId}
                    onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, googleTagManagerId: e.target.value})}
                    placeholder="GTM-XXXXXXX"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="facebookPixelId" className="block text-sm font-medium text-gray-700">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    id="facebookPixelId"
                    value={generalSeoSettings.facebookPixelId}
                    onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, facebookPixelId: e.target.value})}
                    placeholder="XXXXXXXXXXXXXXX"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Robots.txt</CardTitle>
                <CardDescription>
                  Arama motoru robotları için yönergeler belirtin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={8}
                  value={generalSeoSettings.robotsTxt}
                  onChange={(e) => setGeneralSeoSettings({...generalSeoSettings, robotsTxt: e.target.value})}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border font-mono"
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Yapısal Veri (Schema.org)</CardTitle>
                <CardDescription>
                  Zengin sonuçlar için arama motorlarına yapısal veri sağlayın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700">
                      Organizasyon Türü
                    </label>
                    <select
                      id="organizationType"
                      value={generalSeoSettings.structuredData.organizationType}
                      onChange={(e) => setGeneralSeoSettings({
                        ...generalSeoSettings,
                        structuredData: {
                          ...generalSeoSettings.structuredData,
                          organizationType: e.target.value
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                    >
                      <option value="MedicalBusiness">Sağlık Kliniği</option>
                      <option value="HealthAndBeautyBusiness">Sağlık ve Güzellik İşletmesi</option>
                      <option value="MedicalClinic">Tıbbi Klinik</option>
                      <option value="MedicalOrganization">Tıbbi Organizasyon</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                      Organizasyon Adı
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      value={generalSeoSettings.structuredData.organizationName}
                      onChange={(e) => setGeneralSeoSettings({
                        ...generalSeoSettings,
                        structuredData: {
                          ...generalSeoSettings.structuredData,
                          organizationName: e.target.value
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    id="logo"
                    value={generalSeoSettings.structuredData.logo}
                    onChange={(e) => setGeneralSeoSettings({
                      ...generalSeoSettings,
                      structuredData: {
                        ...generalSeoSettings.structuredData,
                        logo: e.target.value
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Adres</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Sokak"
                        value={generalSeoSettings.structuredData.address.street}
                        onChange={(e) => setGeneralSeoSettings({
                          ...generalSeoSettings,
                          structuredData: {
                            ...generalSeoSettings.structuredData,
                            address: {
                              ...generalSeoSettings.structuredData.address,
                              street: e.target.value
                            }
                          }
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                      />
                      <input
                        type="text"
                        placeholder="Şehir"
                        value={generalSeoSettings.structuredData.address.city}
                        onChange={(e) => setGeneralSeoSettings({
                          ...generalSeoSettings,
                          structuredData: {
                            ...generalSeoSettings.structuredData,
                            address: {
                              ...generalSeoSettings.structuredData.address,
                              city: e.target.value
                            }
                          }
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                      />
                      <input
                        type="text"
                        placeholder="Ülke"
                        value={generalSeoSettings.structuredData.address.country}
                        onChange={(e) => setGeneralSeoSettings({
                          ...generalSeoSettings,
                          structuredData: {
                            ...generalSeoSettings.structuredData,
                            address: {
                              ...generalSeoSettings.structuredData.address,
                              country: e.target.value
                            }
                          }
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">İletişim Bilgileri</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Telefon"
                        value={generalSeoSettings.structuredData.contactPoint.telephone}
                        onChange={(e) => setGeneralSeoSettings({
                          ...generalSeoSettings,
                          structuredData: {
                            ...generalSeoSettings.structuredData,
                            contactPoint: {
                              ...generalSeoSettings.structuredData.contactPoint,
                              telephone: e.target.value
                            }
                          }
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                      />
                      <input
                        type="text"
                        placeholder="E-posta"
                        value={generalSeoSettings.structuredData.contactPoint.email}
                        onChange={(e) => setGeneralSeoSettings({
                          ...generalSeoSettings,
                          structuredData: {
                            ...generalSeoSettings.structuredData,
                            contactPoint: {
                              ...generalSeoSettings.structuredData.contactPoint,
                              email: e.target.value
                            }
                          }
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sosyal Medya Profilleri</h4>
                  <div className="space-y-2">
                    {generalSeoSettings.structuredData.sameAs.map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => {
                            const newSameAs = [...generalSeoSettings.structuredData.sameAs];
                            newSameAs[index] = e.target.value;
                            setGeneralSeoSettings({
                              ...generalSeoSettings,
                              structuredData: {
                                ...generalSeoSettings.structuredData,
                                sameAs: newSameAs
                              }
                            });
                          }}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSameAs = generalSeoSettings.structuredData.sameAs.filter((_, i) => i !== index);
                            setGeneralSeoSettings({
                              ...generalSeoSettings,
                              structuredData: {
                                ...generalSeoSettings.structuredData,
                                sameAs: newSameAs
                              }
                            });
                          }}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setGeneralSeoSettings({
                          ...generalSeoSettings,
                          structuredData: {
                            ...generalSeoSettings.structuredData,
                            sameAs: [...generalSeoSettings.structuredData.sameAs, ""]
                          }
                        });
                      }}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Sosyal Medya Profili Ekle
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveGeneralSettings}
                  disabled={saveSettingsMutation.isPending}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveSettingsMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : "Ayarları Kaydet"}
                </button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* SEO Analizi İçeriği */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Sayfa Performans Analizi</CardTitle>
                <CardDescription>
                  Sitenizin tüm sayfaları için SEO performans skorları
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : seoAnalysisData && seoAnalysisData.pages && seoAnalysisData.pages.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium text-sm text-gray-500">Sayfa</th>
                          <th className="text-center py-3 font-medium text-sm text-gray-500">SEO Skoru</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-500">Durum</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seoAnalysisData.pages.map((page: any, index: number) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="py-3 text-sm">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-1.5 text-gray-500" />
                                <span className="font-medium">{page.url}</span>
                              </div>
                            </td>
                            <td className="py-3 text-sm text-center">
                              <div className="flex items-center justify-center">
                                <div className="w-12 h-12 relative rounded-full flex items-center justify-center">
                                  {/* Score circle background */}
                                  <svg viewBox="0 0 36 36" className="w-12 h-12 absolute">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke="#eee"
                                      strokeWidth="3"
                                      strokeDasharray="100, 100"
                                    />
                                  </svg>
                                  {/* Score circle fill */}
                                  <svg viewBox="0 0 36 36" className="w-12 h-12 absolute rotate-90">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke={page.score >= 80 ? "#22c55e" : page.score >= 50 ? "#eab308" : "#ef4444"}
                                      strokeWidth="3"
                                      strokeDasharray={`${page.score}, 100`}
                                    />
                                  </svg>
                                  <span className="text-sm font-semibold">{page.score}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 text-sm">
                              {page.score >= 80 ? (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="mr-1 h-3 w-3" />
                                  İyi
                                </div>
                              ) : page.score >= 50 ? (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  Geliştirilmeli
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <X className="mr-1 h-3 w-3" />
                                  Kritik
                                </div>
                              )}
                            </td>
                            <td className="py-3 text-sm">
                              <Button
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const matchingPage = pageSeoSettings.find((p) => p.canonicalUrl === page.url || p.page === page.url);
                                  if (matchingPage) {
                                    openDetailModal(matchingPage);
                                  } else {
                                    toast({
                                      title: "Sayfa bulunamadı",
                                      description: "Bu sayfa için SEO ayarları henüz tanımlanmamış.",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                                className="h-8"
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Düzenle
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileWarning className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>SEO analiz verileri bulunamadı.</p>
                    <p className="mt-2 text-sm">
                      Analiz yapmak için önce sitemap oluşturun ve/veya sayfaları ekleyin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Genel SEO Metrikleri</CardTitle>
                <CardDescription>
                  Site geneli SEO performans değerlendirmesi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : seoAnalysisData ? (
                  <div className="space-y-6">
                    <div>
                      <div className="mb-1.5 flex justify-between">
                        <h4 className="text-sm font-medium">Ortalama SEO Skoru</h4>
                        <span className="text-sm font-medium">{seoAnalysisData.averageScore || 0}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            (seoAnalysisData.averageScore || 0) >= 80 
                              ? "bg-green-500" 
                              : (seoAnalysisData.averageScore || 0) >= 50 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          }`}
                          style={{ width: `${seoAnalysisData.averageScore || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {seoAnalysisData.indexablePages || 0}
                        </div>
                        <div className="text-sm text-gray-500">İndekslenebilir Sayfa</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {seoAnalysisData.totalPages || 0}
                        </div>
                        <div className="text-sm text-gray-500">Toplam Sayfa</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Kritik SEO Sorunları</h4>
                      {seoAnalysisData.criticalIssues && seoAnalysisData.criticalIssues.length > 0 ? (
                        <ul className="space-y-2">
                          {seoAnalysisData.criticalIssues.map((issue: string, index: number) => (
                            <li key={index} className="flex items-start text-sm">
                              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                                <X className="h-3 w-3 text-red-600" />
                              </div>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-500 py-2">
                          Kritik SEO sorunu bulunamadı.
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => seoAnalysisMutation.mutate()}
                        disabled={seoAnalysisMutation.isPending}
                      >
                        {seoAnalysisMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analiz Ediliyor...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Analizi Yenile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ActivitySquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Analiz verileri bulunamadı.</p>
                    <p className="mt-2 text-sm">
                      SEO analizi yapmak için aşağıdaki butona tıklayın.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => seoAnalysisMutation.mutate()}
                      disabled={seoAnalysisMutation.isPending}
                    >
                      {seoAnalysisMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analiz Ediliyor...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          SEO Analizi Yap
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>SEO İyileştirme Önerileri</CardTitle>
                <CardDescription>
                  Sitenizin arama motoru optimizasyonunu artırmak için tavsiyeler
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : seoAnalysisData && seoAnalysisData.suggestions && seoAnalysisData.suggestions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seoAnalysisData.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className={`
                            flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3
                            ${suggestion.severity === 'high' 
                              ? 'bg-red-100 text-red-600' 
                              : suggestion.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {suggestion.severity === 'high' ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : suggestion.severity === 'medium' ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Info className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">{suggestion.title}</h4>
                            <p className="text-xs text-gray-500">{suggestion.description}</p>
                            {suggestion.actions && (
                              <div className="mt-2 text-xs font-medium text-blue-600">
                                Önerilen aksiyon: {suggestion.actions}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>İyileştirme önerileri bulunamadı.</p>
                    <p className="mt-2 text-sm">
                      SEO analizi yaparak iyileştirme önerilerini görüntüleyin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
                          ? "text-green-600" 
                          : seoAnalysisData.pageSpeed.mobile >= 70 
                          ? "text-yellow-600" 
                          : "text-red-600"
                      }`}>
                        {seoAnalysisData.pageSpeed.mobile}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          seoAnalysisData.pageSpeed.mobile >= 90 
                            ? "bg-green-500" 
                            : seoAnalysisData.pageSpeed.mobile >= 70 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                        }`} 
                        style={{ width: `${seoAnalysisData.pageSpeed.mobile}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Masaüstü</span>
                      <span className={`text-sm font-medium ${
                        seoAnalysisData.pageSpeed.desktop >= 90 
                          ? "text-green-600" 
                          : seoAnalysisData.pageSpeed.desktop >= 70 
                          ? "text-yellow-600" 
                          : "text-red-600"
                      }`}>
                        {seoAnalysisData.pageSpeed.desktop}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          seoAnalysisData.pageSpeed.desktop >= 90 
                            ? "bg-green-500" 
                            : seoAnalysisData.pageSpeed.desktop >= 70 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                        }`} 
                        style={{ width: `${seoAnalysisData.pageSpeed.desktop}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Son kontrolden bu yana: <span className="font-medium">2 gün önce</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SEO Sorunları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-red-600">Kritik</span>
                      <span className="text-xs font-medium text-red-600">{seoAnalysisData.issuesCount.critical}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(seoAnalysisData.issuesCount.critical / (seoAnalysisData.issuesCount.critical + seoAnalysisData.issuesCount.warning + seoAnalysisData.issuesCount.info)) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-yellow-600">Uyarı</span>
                      <span className="text-xs font-medium text-yellow-600">{seoAnalysisData.issuesCount.warning}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(seoAnalysisData.issuesCount.warning / (seoAnalysisData.issuesCount.critical + seoAnalysisData.issuesCount.warning + seoAnalysisData.issuesCount.info)) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">Bilgi</span>
                      <span className="text-xs font-medium text-blue-600">{seoAnalysisData.issuesCount.info}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(seoAnalysisData.issuesCount.info / (seoAnalysisData.issuesCount.critical + seoAnalysisData.issuesCount.warning + seoAnalysisData.issuesCount.info)) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Toplam: <span className="font-medium">{seoAnalysisData.issuesCount.critical + seoAnalysisData.issuesCount.warning + seoAnalysisData.issuesCount.info} sorun</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Backlink Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Toplam Backlink</span>
                    <span className="text-sm font-bold">{seoAnalysisData.backlinks.total}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Referans Veren Domainler</span>
                    <span className="text-sm font-bold">{seoAnalysisData.backlinks.domains}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Geçen Ay Eklenen</span>
                    <span className="text-sm font-medium text-green-600">+{seoAnalysisData.backlinks.newLastMonth}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Son güncelleme: <span className="font-medium">3 gün önce</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Öne Çıkan Sorunlar</CardTitle>
                <CardDescription>
                  Bu sorunları çözerek SEO performansınızı artırabilirsiniz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {seoAnalysisData.topIssues.map((issue, index) => (
                    <AccordionItem key={index} value={`issue-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-start">
                          {issue.type === "critical" ? (
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                          ) : issue.type === "warning" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          ) : (
                            <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          )}
                          <div className="text-left">
                            <div className="font-medium">{issue.title}</div>
                            <div className="text-sm text-gray-500">{issue.description}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 space-y-2">
                          <h4 className="text-sm font-medium">Etkilenen Sayfalar:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {issue.affectedPages.map((page, idx) => (
                              <li key={idx} className="flex items-center">
                                <Link className="w-4 h-4 mr-1 text-gray-400" />
                                <span>{page}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Anahtar Kelime Sıralamaları</CardTitle>
                <CardDescription>
                  Hedefinizin arama motorlarındaki mevcut pozisyonları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoAnalysisData.keywordRankings.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                      <div>
                        <div className="font-medium">{keyword.keyword}</div>
                        <div className="text-sm text-gray-500">
                          Aylık Arama: {keyword.searchVolume}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-end">
                          <span className="text-lg font-bold">#{keyword.position}</span>
                          <div className="ml-2">
                            {keyword.change > 0 ? (
                              <div className="flex items-center text-green-600">
                                <ArrowRight className="w-4 h-4 rotate-[-45deg]" />
                                <span className="text-xs">+{keyword.change}</span>
                              </div>
                            ) : keyword.change < 0 ? (
                              <div className="flex items-center text-red-600">
                                <ArrowRight className="w-4 h-4 rotate-[45deg]" />
                                <span className="text-xs">{keyword.change}</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-gray-400">
                                <span className="text-xs">0</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Sayfa SEO Detay Modalı */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sayfa SEO Ayarları Düzenle</DialogTitle>
            <DialogDescription>
              {selectedPage && `${selectedPage[`page${activeLanguage}` as keyof typeof selectedPage]} sayfası için SEO ayarlarını düzenleyin.`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPage && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2 mb-4">
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
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="pageTitle" className="block text-sm font-medium text-gray-700">
                    Sayfa Adı ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <input
                    type="text"
                    id="pageTitle"
                    defaultValue={selectedPage[`page${activeLanguage}` as keyof typeof selectedPage] as string}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                    Meta Başlık ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="metaTitle"
                      defaultValue={selectedPage[`metaTitle${activeLanguage}` as keyof typeof selectedPage] as string}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                      {selectedPage[`metaTitle${activeLanguage}` as keyof typeof selectedPage].toString().length}/60
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    İdeal meta başlık uzunluğu: 50-60 karakter
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                    Meta Açıklama ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <div className="mt-1 relative">
                    <textarea
                      id="metaDescription"
                      rows={3}
                      defaultValue={selectedPage[`metaDescription${activeLanguage}` as keyof typeof selectedPage] as string}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                    ></textarea>
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                      {selectedPage[`metaDescription${activeLanguage}` as keyof typeof selectedPage].toString().length}/160
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    İdeal meta açıklama uzunluğu: 150-160 karakter
                  </p>
                </div>
                
                <div>
                  <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
                    Meta Anahtar Kelimeler ({languages.find(l => l.id === activeLanguage)?.name})
                  </label>
                  <input
                    type="text"
                    id="metaKeywords"
                    defaultValue={selectedPage[`metaKeywords${activeLanguage}` as keyof typeof selectedPage] as string}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Virgülle ayrılmış anahtar kelimeler
                  </p>
                </div>
                
                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">
                    Canonical URL
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      https://myhairclinic.com
                    </span>
                    <input
                      type="text"
                      id="canonicalUrl"
                      defaultValue={selectedPage.canonicalUrl}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="isActive"
                    type="checkbox"
                    defaultChecked={selectedPage.isActive}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Bu sayfa için SEO meta etiketlerini etkinleştir
                  </label>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-6">
                <h3 className="text-lg font-medium text-gray-900">SEO Önizleme</h3>
                <p className="text-sm text-gray-500">Google arama sonuçlarında görünüm</p>
                
                <SeoPreview 
                  title={selectedPage[`metaTitle${activeLanguage}` as keyof typeof selectedPage] as string}
                  description={selectedPage[`metaDescription${activeLanguage}` as keyof typeof selectedPage] as string}
                  url={`https://myhairclinic.com${selectedPage.canonicalUrl}`}
                />
                
                <h3 className="text-lg font-medium text-gray-900 mt-6">Meta Etiketleri Önizleme</h3>
                <p className="text-sm text-gray-500">Sayfa başlığında yer alacak HTML meta etiketleri</p>
                
                <MetaTagsPreview 
                  title={selectedPage[`metaTitle${activeLanguage}` as keyof typeof selectedPage] as string}
                  description={selectedPage[`metaDescription${activeLanguage}` as keyof typeof selectedPage] as string}
                  keywords={selectedPage[`metaKeywords${activeLanguage}` as keyof typeof selectedPage] as string}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={() => updatePageSeoSettings({
                    ...selectedPage,
                    lastUpdated: new Date()
                  })}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Yeni Sayfa Ekle Modalı */}
      <Dialog open={isAddPageModalOpen} onOpenChange={setIsAddPageModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Yeni Sayfa SEO Ayarları Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir sayfa için SEO meta etiketlerini yapılandırın.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2 mb-4">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newPageSlug" className="block text-sm font-medium text-gray-700">
                  Sayfa Slug
                </label>
                <input
                  type="text"
                  id="newPageSlug"
                  placeholder="about-us"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Sayfanın URL'deki tekil tanımlayıcısı (örn: about-us)
                </p>
              </div>
              
              <div>
                <label htmlFor="newCanonicalUrl" className="block text-sm font-medium text-gray-700">
                  Canonical URL
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://myhairclinic.com/
                  </span>
                  <input
                    type="text"
                    id="newCanonicalUrl"
                    placeholder="about-us"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="newPageName" className="block text-sm font-medium text-gray-700">
                Sayfa Adı ({languages.find(l => l.id === activeLanguage)?.name})
              </label>
              <input
                type="text"
                id="newPageName"
                placeholder={`Sayfa adı (${languages.find(l => l.id === activeLanguage)?.name})`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
              />
            </div>
            
            <div>
              <label htmlFor="newMetaTitle" className="block text-sm font-medium text-gray-700">
                Meta Başlık ({languages.find(l => l.id === activeLanguage)?.name})
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="newMetaTitle"
                  placeholder={`Meta başlık (${languages.find(l => l.id === activeLanguage)?.name})`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border pr-16"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                  0/60
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                İdeal meta başlık uzunluğu: 50-60 karakter
              </p>
            </div>
            
            <div>
              <label htmlFor="newMetaDescription" className="block text-sm font-medium text-gray-700">
                Meta Açıklama ({languages.find(l => l.id === activeLanguage)?.name})
              </label>
              <div className="mt-1 relative">
                <textarea
                  id="newMetaDescription"
                  rows={3}
                  placeholder={`Meta açıklama (${languages.find(l => l.id === activeLanguage)?.name})`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                ></textarea>
                <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                  0/160
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                İdeal meta açıklama uzunluğu: 150-160 karakter
              </p>
            </div>
            
            <div>
              <label htmlFor="newMetaKeywords" className="block text-sm font-medium text-gray-700">
                Meta Anahtar Kelimeler ({languages.find(l => l.id === activeLanguage)?.name})
              </label>
              <input
                type="text"
                id="newMetaKeywords"
                placeholder={`Anahtar kelimeler, virgülle ayrılmış (${languages.find(l => l.id === activeLanguage)?.name})`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
              />
              <p className="mt-1 text-xs text-gray-500">
                Virgülle ayrılmış anahtar kelimeler
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                id="newIsActive"
                type="checkbox"
                defaultChecked={true}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="newIsActive" className="ml-2 block text-sm text-gray-900">
                Bu sayfa için SEO meta etiketlerini etkinleştir
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
              <button
                onClick={() => setIsAddPageModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  // Burada gerçek olarak ekleme yapılabilir
                  setIsAddPageModalOpen(false);
                  alert("Yeni sayfa SEO ayarları eklendi!");
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
              >
                Ekle
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// SEO skoru hesaplama fonksiyonu
function getSeoScore(page: any): number {
  if (!page) return 0;
  
  let score = 0;
  const maxScore = 100;
  
  // Meta başlıkları kontrol et
  if (page.metaTitleTR && page.metaTitleTR.length > 10) score += 10;
  if (page.metaTitleEN && page.metaTitleEN.length > 10) score += 10;
  if (page.metaTitleRU && page.metaTitleRU.length > 10) score += 5;
  if (page.metaTitleKA && page.metaTitleKA.length > 10) score += 5;
  
  // Meta açıklamaları kontrol et
  if (page.metaDescriptionTR && page.metaDescriptionTR.length > 50) score += 10;
  if (page.metaDescriptionEN && page.metaDescriptionEN.length > 50) score += 10;
  if (page.metaDescriptionRU && page.metaDescriptionRU.length > 50) score += 5;
  if (page.metaDescriptionKA && page.metaDescriptionKA.length > 50) score += 5;
  
  // Meta anahtar kelimeleri kontrol et
  if (page.metaKeywordsTR && page.metaKeywordsTR.length > 10) score += 5;
  if (page.metaKeywordsEN && page.metaKeywordsEN.length > 10) score += 5;
  if (page.metaKeywordsRU && page.metaKeywordsRU.length > 10) score += 2.5;
  if (page.metaKeywordsKA && page.metaKeywordsKA.length > 10) score += 2.5;
  
  // Canonical URL kontrol et
  if (page.canonicalUrl && page.canonicalUrl.length > 5) score += 10;
  
  // Indexleme ve link takibi kontrolü
  if (page.indexPage) score += 7.5;
  if (page.followLinks) score += 7.5;
  
  return score;
}

// SEO önerileri oluşturma fonksiyonu
function getSeoSuggestions(page: any): string[] {
  if (!page) return [];
  
  const suggestions: string[] = [];
  
  // Meta başlıkları kontrol et
  if (!page.metaTitleTR || page.metaTitleTR.length < 10)
    suggestions.push("Türkçe meta başlığı ekleyin veya uzatın (en az 10 karakter).");
  if (!page.metaTitleEN || page.metaTitleEN.length < 10)
    suggestions.push("İngilizce meta başlığı ekleyin veya uzatın (en az 10 karakter).");
  
  // Meta açıklamaları kontrol et
  if (!page.metaDescriptionTR || page.metaDescriptionTR.length < 50)
    suggestions.push("Türkçe meta açıklamasını ekleyin veya uzatın (en az 50 karakter).");
  if (!page.metaDescriptionEN || page.metaDescriptionEN.length < 50)
    suggestions.push("İngilizce meta açıklamasını ekleyin veya uzatın (en az 50 karakter).");
  
  // Canonical URL kontrol et
  if (!page.canonicalUrl || page.canonicalUrl.length < 5)
    suggestions.push("Canonical URL ekleyin.");
  
  // Indexleme ve link takibi kontrolü
  if (!page.indexPage)
    suggestions.push("Sayfa indexlemeyi aktifleştirin (arama motorları için görünürlük).");
  if (!page.followLinks)
    suggestions.push("Link takibini aktifleştirin (arama motorları için).");
  
  return suggestions;
}

export default SeoManagement;