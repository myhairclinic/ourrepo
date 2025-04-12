import React, { useState, useEffect } from "react";
import {
  Send,
  Search,
  CheckCircle,
  UserCircle,
  MessageCircle,
  Bell,
  Phone,
  Mail,
  Users,
  Settings,
  Power,
  ArrowUp,
  ArrowDown,
  RefreshCcw,
  Save,
  Plus,
  Download,
  Calendar,
  Clock,
  BarChart2,
  Filter,
  Monitor,
  Smartphone,
  Tablet,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  HelpCircle,
  PauseCircle,
  PlayCircle,
  SlidersHorizontal,
  FileText,
  Tag,
  Languages,
  Flag,
  User,
  MoreVertical,
  Ban,
  XCircle
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Örnek veriler
const mockTelegramContacts = [
  {
    id: 1,
    chatId: "12345678",
    username: "mehmet_yilmaz",
    firstName: "Mehmet",
    lastName: "Yılmaz",
    language: "tr",
    startDate: new Date("2025-04-01T10:23:15"),
    lastMessageDate: new Date("2025-04-12T11:45:32"),
    messagesCount: 23,
    isBlocked: false,
    tags: ["saç-ekimi", "aktif-müşteri"],
    notes: "3000 greft FUE paket için bilgi aldı. 15 Mayıs'ta gelecek.",
    stage: "consultation", // inquiry, consultation, appointment, post-treatment, follow-up
    appointmentDate: new Date("2025-05-15"),
    phone: "+905331234567",
    email: "mehmet@example.com",
    location: "İstanbul, Türkiye"
  },
  {
    id: 2,
    chatId: "23456789",
    username: "ivan_petrov",
    firstName: "Ivan",
    lastName: "Petrov",
    language: "ru",
    startDate: new Date("2025-03-15T14:12:05"),
    lastMessageDate: new Date("2025-04-12T09:23:18"),
    messagesCount: 42,
    isBlocked: false,
    tags: ["sakal-ekimi", "paket-4"],
    notes: "Sakal ekimi + 5 gün konaklama paketi. Tercüman talebi var.",
    stage: "appointment",
    appointmentDate: new Date("2025-04-20"),
    phone: "+79123456789",
    email: "ivan@example.com",
    location: "Moskova, Rusya"
  },
  {
    id: 3,
    chatId: "34567890",
    username: "giorgi_kartvelishvili",
    firstName: "Giorgi",
    lastName: "Kartvelishvili",
    language: "ka",
    startDate: new Date("2025-03-28T16:45:22"),
    lastMessageDate: new Date("2025-04-11T21:18:04"),
    messagesCount: 15,
    isBlocked: false,
    tags: ["lokal-müşteri", "prp"],
    notes: "PRP tedavisi için aylık randevulu müşteri.",
    stage: "follow-up",
    appointmentDate: new Date("2025-04-15"),
    phone: "+995555123456",
    email: "giorgi@example.com",
    location: "Tbilisi, Gürcistan"
  },
  {
    id: 4,
    chatId: "45678901",
    username: "ali_ahmedzade",
    firstName: "Ali",
    lastName: "Ahmedzade",
    language: "az",
    startDate: new Date("2025-04-05T09:17:33"),
    lastMessageDate: new Date("2025-04-12T10:07:55"),
    messagesCount: 19,
    isBlocked: false,
    tags: ["saç-ekimi", "özel-paket"],
    notes: "VIP paket ile ilgileniyor. Otel rezervasyonu yapıldı.",
    stage: "consultation",
    appointmentDate: null,
    phone: "+994501234567",
    email: "ali@example.com",
    location: "Bakü, Azerbaycan"
  },
  {
    id: 5,
    chatId: "56789012",
    username: "john_smith",
    firstName: "John",
    lastName: "Smith",
    language: "en",
    startDate: new Date("2025-02-20T11:34:12"),
    lastMessageDate: new Date("2025-04-10T15:42:09"),
    messagesCount: 31,
    isBlocked: false,
    tags: ["saç-ekimi", "mezoterapı"],
    notes: "Saç ekimi sonrası 3. ay kontrolü.",
    stage: "post-treatment",
    appointmentDate: null,
    phone: "+14255550199",
    email: "john@example.com",
    location: "Londra, İngiltere"
  }
];

// Örnek mesajlar
const mockTelegramMessages = [
  {
    id: 1,
    chatId: "12345678",
    text: "Merhaba, saç ekimi hakkında bilgi almak istiyorum.",
    date: new Date("2025-04-12T09:15:32"),
    isIncoming: true,
    isRead: true
  },
  {
    id: 2,
    chatId: "12345678",
    text: "Merhaba! MyHair Clinic'e hoş geldiniz. Size saç ekimi hakkında nasıl yardımcı olabiliriz?",
    date: new Date("2025-04-12T09:17:45"),
    isIncoming: false,
    isRead: true
  },
  {
    id: 3,
    chatId: "12345678",
    text: "FUE ve DHI teknikleri arasındaki farklar nelerdir?",
    date: new Date("2025-04-12T09:23:18"),
    isIncoming: true,
    isRead: true
  },
  {
    id: 4,
    chatId: "12345678",
    text: "FUE tekniğinde saç kökleri tek tek alınarak nakil yapılır. DHI tekniğinde ise özel bir kalem yardımıyla kökler doğrudan yerleştirilir. DHI tekniği daha hızlı iyileşme süreci sunar ancak maliyeti daha yüksektir.",
    date: new Date("2025-04-12T09:27:52"),
    isIncoming: false,
    isRead: true
  },
  {
    id: 5,
    chatId: "12345678",
    text: "Fiyatlar hakkında bilgi alabilir miyim?",
    date: new Date("2025-04-12T11:05:22"),
    isIncoming: true,
    isRead: true
  },
  {
    id: 6,
    chatId: "12345678",
    text: "Fiyatlarımız greft sayısına ve seçtiğiniz tekniğe göre değişmektedir. 2500-3000 greft aralığında bir işlem için fiyat aralığı 1500€-2500€ arasındadır. Size özel teklif için bir konsültasyon randevusu alabilirsiniz.",
    date: new Date("2025-04-12T11:15:33"),
    isIncoming: false,
    isRead: true
  },
  {
    id: 7,
    chatId: "12345678",
    text: "Konaklama da dahil mi bu fiyata?",
    date: new Date("2025-04-12T11:40:12"),
    isIncoming: true,
    isRead: true
  },
  {
    id: 8,
    chatId: "12345678",
    text: "Konaklama dahil paketlerimiz de mevcut. 3 gece 4 yıldızlı otel konaklaması, havalimanı transferleri ve şehir turu dahil paket fiyatımız 2000€'dan başlamaktadır.",
    date: new Date("2025-04-12T11:42:48"),
    isIncoming: false,
    isRead: true
  },
  {
    id: 9,
    chatId: "12345678",
    text: "Mayıs ayı için uygun bir tarih var mı?",
    date: new Date("2025-04-12T11:45:32"),
    isIncoming: true,
    isRead: false
  }
];

// Örnek hazır yanıtlar
const mockPredefinedMessages = [
  {
    id: 1,
    title: "Karşılama",
    text: "Merhaba! MyHair Clinic'e hoş geldiniz. Size nasıl yardımcı olabiliriz?",
    language: "tr",
    tags: ["genel", "karşılama"]
  },
  {
    id: 2,
    title: "Приветствие",
    text: "Здравствуйте! Добро пожаловать в MyHair Clinic. Как мы можем вам помочь?",
    language: "ru",
    tags: ["общий", "приветствие"]
  },
  {
    id: 3,
    title: "Welcome",
    text: "Hello! Welcome to MyHair Clinic. How can we assist you today?",
    language: "en",
    tags: ["general", "greeting"]
  },
  {
    id: 4,
    title: "მისალმება",
    text: "გამარჯობა! კეთილი იყოს თქვენი მობრძანება MyHair Clinic-ში. როგორ შეგვიძლია დაგეხმაროთ?",
    language: "ka",
    tags: ["ზოგადი", "მისალმება"]
  },
  {
    id: 5,
    title: "FUE Açıklama",
    text: "FUE tekniğinde (Follicular Unit Extraction), saç kökleri tek tek özel mikro motorlar yardımıyla alınarak nakil yapılır. Bu teknik skar bırakmaz ve doğal görünümlü sonuçlar verir.",
    language: "tr",
    tags: ["teknik", "açıklama"]
  },
  {
    id: 6,
    title: "DHI Açıklama",
    text: "DHI tekniğinde (Direct Hair Implantation), saç kökleri özel bir Choi kalemi ile doğrudan alıcı bölgeye yerleştirilir. Bu teknik kanal açılmadan yapıldığı için daha hızlı iyileşme sunar.",
    language: "tr",
    tags: ["teknik", "açıklama"]
  },
  {
    id: 7,
    title: "Fiyat Bilgisi",
    text: "Saç ekimi fiyatlarımız işlem yapılacak bölgenin genişliği, ekilecek greft sayısı ve seçilen tekniğe göre değişmektedir. Size özel fiyat teklifi için ücretsiz konsültasyon randevusu alabilirsiniz.",
    language: "tr",
    tags: ["fiyat", "genel"]
  },
  {
    id: 8,
    title: "Randevu Oluşturma",
    text: "Randevu oluşturmak için lütfen bize uygun olduğunuz tarihleri, tam adınızı ve telefon numaranızı iletir misiniz? En kısa sürede size geri dönüş yapacağız.",
    language: "tr",
    tags: ["randevu", "işlem"]
  },
  {
    id: 9,
    title: "İletişim Bilgileri",
    text: "Kliniğimiz Tsotne Dadiani 59, Tbilisi, Gürcistan adresinde bulunmaktadır. Bize +995555003044 numaralı telefondan veya myhairtbilisi@gmail.com adresinden ulaşabilirsiniz.",
    language: "tr",
    tags: ["iletişim", "bilgi"]
  },
  {
    id: 10,
    title: "Paket Bilgisi",
    text: "Saç ekimi paketlerimiz işlem, konaklama, transfer ve şehir turu seçenekleri içermektedir. Tüm paketlerimizde işlem öncesi konsültasyon, işlem sonrası bakım setleri ve takip hizmetleri dahildir.",
    language: "tr",
    tags: ["paket", "bilgi"]
  }
];

// Örnek bot ayarları
const mockBotSettings = {
  isActive: true,
  autoResponder: true,
  welcomeMessage: "Merhaba, MyHair Clinic botuna hoş geldiniz! Size nasıl yardımcı olabiliriz?",
  offlineMessage: "Şu anda çevrimdışıyız. Mesajınızı bırakın, en kısa sürede size dönüş yapacağız.",
  workingHours: {
    monday: { start: "09:00", end: "18:00", isActive: true },
    tuesday: { start: "09:00", end: "18:00", isActive: true },
    wednesday: { start: "09:00", end: "18:00", isActive: true },
    thursday: { start: "09:00", end: "18:00", isActive: true },
    friday: { start: "09:00", end: "18:00", isActive: true },
    saturday: { start: "10:00", end: "15:00", isActive: true },
    sunday: { start: "10:00", end: "15:00", isActive: false }
  },
  languages: [
    { code: "tr", isActive: true },
    { code: "en", isActive: true },
    { code: "ru", isActive: true },
    { code: "ka", isActive: true },
    { code: "az", isActive: true }
  ],
  operators: [
    { id: 1, name: "Admin", isActive: true, telegramUsername: "@admin" },
    { id: 2, name: "Operatör 1", isActive: true, telegramUsername: "@operator1" },
    { id: 3, name: "Operatör 2", isActive: false, telegramUsername: "@operator2" }
  ],
  notifications: {
    newMessage: true,
    newContact: true,
    appointmentReminder: true,
    dailySummary: true
  }
};

// Örnek bot istatistikleri
const mockBotStats = {
  totalContacts: 438,
  activeContacts: 215,
  totalMessages: 12654,
  messagesLastWeek: 543,
  newContactsLastWeek: 32,
  messagesByLanguage: [
    { language: "tr", count: 5426, percentage: 42.9 },
    { language: "ru", count: 3954, percentage: 31.2 },
    { language: "en", count: 1843, percentage: 14.6 },
    { language: "ka", count: 982, percentage: 7.8 },
    { language: "az", count: 449, percentage: 3.5 }
  ],
  messagesByStage: [
    { stage: "inquiry", count: 214, percentage: 38.7 },
    { stage: "consultation", count: 156, percentage: 28.2 },
    { stage: "appointment", count: 98, percentage: 17.7 },
    { stage: "post-treatment", count: 45, percentage: 8.1 },
    { stage: "follow-up", count: 40, percentage: 7.3 }
  ],
  responseTime: {
    average: "5m 23s",
    percentile90: "15m 12s"
  }
};

interface TelegramBotManagementProps {
  // Props gerekirse eklenebilir
}

const TelegramBotManagement: React.FC<TelegramBotManagementProps> = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState(mockTelegramContacts);
  const [messages, setMessages] = useState(mockTelegramMessages);
  const [predefinedMessages, setPredefinedMessages] = useState(mockPredefinedMessages);
  const [botSettings, setBotSettings] = useState(mockBotSettings);
  const [botStats, setBotStats] = useState(mockBotStats);
  
  const [activeTab, setActiveTab] = useState("conversations");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [messageFilter, setMessageFilter] = useState<string>("all");
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddPredefinedOpen, setIsAddPredefinedOpen] = useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false);
  const [editingPredefined, setEditingPredefined] = useState<any | null>(null);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  
  // Bot durumunu kontrol et
  const [isBotRunning, setIsBotRunning] = useState(botSettings.isActive);
  
  // Filtreleme
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchQuery === "" || 
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesLanguage = languageFilter === "all" || contact.language === languageFilter;
    const matchesStage = stageFilter === "all" || contact.stage === stageFilter;
    
    return matchesSearch && matchesLanguage && matchesStage;
  });
  
  // Mesajları filtreleme
  const filteredMessages = messages.filter(message => {
    if (selectedChatId && message.chatId !== selectedChatId) return false;
    
    if (messageFilter === "incoming") return message.isIncoming;
    if (messageFilter === "outgoing") return !message.isIncoming;
    
    return true;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Seçilen kişi
  const selectedContact = contacts.find(contact => contact.chatId === selectedChatId);
  
  // Bot'u başlat/durdur
  const toggleBotStatus = () => {
    const newStatus = !isBotRunning;
    setIsBotRunning(newStatus);
    
    // Ayarları güncelle
    setBotSettings({
      ...botSettings,
      isActive: newStatus
    });
    
    toast({
      title: newStatus ? "Bot etkinleştirildi" : "Bot devre dışı bırakıldı",
      description: newStatus ? "Telegram bot aktif olarak çalışıyor." : "Telegram bot durduruldu.",
      variant: newStatus ? "default" : "destructive",
    });
  };
  
  // Mesaj gönderme
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChatId) return;
    
    const newMsg = {
      id: messages.length + 1,
      chatId: selectedChatId,
      text: newMessage,
      date: new Date(),
      isIncoming: false,
      isRead: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Kişinin son mesaj tarihini güncelle
    setContacts(contacts.map(contact => 
      contact.chatId === selectedChatId ? 
        { ...contact, lastMessageDate: new Date(), messagesCount: contact.messagesCount + 1 } : 
        contact
    ));
    
    toast({
      title: "Mesaj gönderildi",
      description: "Mesajınız başarıyla gönderildi.",
    });
  };
  
  // Hazır mesaj ekle
  const addPredefinedMessage = (message: any) => {
    if (editingPredefined) {
      // Mevcut mesajı güncelle
      setPredefinedMessages(predefinedMessages.map(msg => 
        msg.id === editingPredefined.id ? message : msg
      ));
      setEditingPredefined(null);
    } else {
      // Yeni mesaj ekle
      setPredefinedMessages([...predefinedMessages, {
        ...message,
        id: predefinedMessages.length + 1
      }]);
    }
    
    setIsAddPredefinedOpen(false);
    
    toast({
      title: editingPredefined ? "Mesaj güncellendi" : "Mesaj eklendi",
      description: editingPredefined ? "Hazır mesaj başarıyla güncellendi." : "Yeni hazır mesaj eklendi.",
    });
  };
  
  // Hazır mesaj düzenle
  const editPredefinedMessage = (message: any) => {
    setEditingPredefined(message);
    setIsAddPredefinedOpen(true);
  };
  
  // Hazır mesaj sil
  const deletePredefinedMessage = (id: number) => {
    setPredefinedMessages(predefinedMessages.filter(msg => msg.id !== id));
    
    toast({
      title: "Mesaj silindi",
      description: "Hazır mesaj başarıyla silindi.",
    });
  };
  
  // Hazır mesajı uygula
  const applyPredefinedMessage = (text: string) => {
    setNewMessage(text);
  };
  
  // Bot ayarlarını kaydet
  const saveBotSettings = (settings: any) => {
    setBotSettings(settings);
    setIsSettingsOpen(false);
    
    toast({
      title: "Ayarlar kaydedildi",
      description: "Bot ayarları başarıyla güncellendi.",
    });
  };
  
  // Bot'u sıfırla
  const resetBot = () => {
    setIsConfirmResetOpen(false);
    
    toast({
      title: "Bot sıfırlandı",
      description: "Telegram bot yeniden başlatıldı.",
    });
  };
  
  // Kişi notunu güncelle
  const updateContactNote = (chatId: string, note: string) => {
    setContacts(contacts.map(contact => 
      contact.chatId === chatId ? { ...contact, notes: note } : contact
    ));
    
    setIsEditNoteOpen(false);
    
    toast({
      title: "Not güncellendi",
      description: "Kişi notu başarıyla güncellendi.",
    });
  };
  
  // Kişiyi engelle/engeli kaldır
  const toggleBlockContact = (chatId: string) => {
    setContacts(contacts.map(contact => 
      contact.chatId === chatId ? { ...contact, isBlocked: !contact.isBlocked } : contact
    ));
    
    const contact = contacts.find(c => c.chatId === chatId);
    const newBlockStatus = !contact?.isBlocked;
    
    toast({
      title: newBlockStatus ? "Kişi engellendi" : "Engel kaldırıldı",
      description: newBlockStatus ? 
        "Kişi artık bot mesajları alamayacak." : 
        "Kişi artık bot mesajları alabilecek.",
      variant: newBlockStatus ? "destructive" : "default",
    });
  };
  
  // Tarih formatla
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Bugün ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Dün ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  // Dil adını getir
  const getLanguageName = (code: string) => {
    switch(code) {
      case "tr": return "Türkçe";
      case "en": return "İngilizce";
      case "ru": return "Rusça";
      case "ka": return "Gürcüce";
      case "az": return "Azerice";
      default: return code;
    }
  };
  
  // Aşama adını getir
  const getStageName = (stage: string) => {
    switch(stage) {
      case "inquiry": return "Bilgi Talebi";
      case "consultation": return "Konsültasyon";
      case "appointment": return "Randevu";
      case "post-treatment": return "Tedavi Sonrası";
      case "follow-up": return "Takip";
      default: return stage;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Telegram Bot Yönetimi</h2>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${
            isBotRunning ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${isBotRunning ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isBotRunning ? 'Bot Aktif' : 'Bot Devre Dışı'}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                İşlemler
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Bot Ayarları
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleBotStatus}>
                {isBotRunning ? (
                  <>
                    <PauseCircle className="w-4 h-4 mr-2" />
                    Bot'u Durdur
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Bot'u Başlat
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert("Bot durumunuza erişmek için webkancınızı (webhook) kontrol edin.")}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Webhook Durumu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Bu özellik bağlantı gerektirir ve şu anda simüle edilemez.")}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Webhook Yenile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsConfirmResetOpen(true)} className="text-red-600">
                <Power className="w-4 h-4 mr-2" />
                Bot'u Sıfırla
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="conversations">Konuşmalar</TabsTrigger>
          <TabsTrigger value="predefined-messages">Hazır Yanıtlar</TabsTrigger>
          <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          <TabsTrigger value="statistics">İstatistikler</TabsTrigger>
        </TabsList>
        
        {/* Konuşmalar Sekmesi */}
        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-280px)]">
            {/* Kişiler Listesi */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-200">
                <div className="flex flex-col space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="İsim veya kullanıcı adı ara..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={languageFilter} onValueChange={setLanguageFilter}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue placeholder="Dil Filtresi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Diller</SelectItem>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">İngilizce</SelectItem>
                        <SelectItem value="ru">Rusça</SelectItem>
                        <SelectItem value="ka">Gürcüce</SelectItem>
                        <SelectItem value="az">Azerice</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={stageFilter} onValueChange={setStageFilter}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue placeholder="Aşama Filtresi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Aşamalar</SelectItem>
                        <SelectItem value="inquiry">Bilgi Talebi</SelectItem>
                        <SelectItem value="consultation">Konsültasyon</SelectItem>
                        <SelectItem value="appointment">Randevu</SelectItem>
                        <SelectItem value="post-treatment">Tedavi Sonrası</SelectItem>
                        <SelectItem value="follow-up">Takip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {filteredContacts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className={`p-3 hover:bg-gray-50 cursor-pointer ${
                          selectedChatId === contact.chatId ? 'bg-blue-50' : ''
                        } ${contact.isBlocked ? 'opacity-60' : ''}`}
                        onClick={() => setSelectedChatId(contact.chatId)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="relative flex-shrink-0">
                              <UserCircle className={`w-10 h-10 ${
                                contact.language === "tr" ? "text-blue-500" :
                                contact.language === "ru" ? "text-red-500" :
                                contact.language === "en" ? "text-green-500" :
                                contact.language === "ka" ? "text-purple-500" :
                                "text-gray-500"
                              }`} />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white">
                                <Flag className={`w-4 h-4 ${
                                  contact.stage === "appointment" ? "text-blue-500" :
                                  contact.stage === "consultation" ? "text-green-500" :
                                  contact.stage === "inquiry" ? "text-yellow-500" :
                                  contact.stage === "post-treatment" ? "text-purple-500" :
                                  "text-gray-400"
                                }`} />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {contact.firstName} {contact.lastName}
                                </h3>
                                <span className="text-xs text-gray-500">
                                  {new Date(contact.lastMessageDate).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <span className="truncate">@{contact.username}</span>
                                <span className="mx-1">•</span>
                                <span>{getLanguageName(contact.language)}</span>
                              </div>
                              
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {getStageName(contact.stage)}
                                </Badge>
                                {contact.isBlocked && (
                                  <Badge variant="destructive" className="text-xs ml-1 px-1 py-0">
                                    Engelli
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                            {contact.messagesCount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <UserCircle className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-gray-500">Gösterilecek kişi bulunamadı.</p>
                    <p className="text-sm text-gray-400 mt-1">Filtreleri değiştirmeyi deneyin.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mesajlaşma Alanı */}
            <div className="md:col-span-2 flex flex-col bg-white rounded-lg shadow-sm border border-gray-100">
              {selectedChatId && selectedContact ? (
                <>
                  {/* Mesajlaşma Başlığı */}
                  <div className="flex items-center justify-between p-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <UserCircle className={`w-8 h-8 ${
                        selectedContact.language === "tr" ? "text-blue-500" :
                        selectedContact.language === "ru" ? "text-red-500" :
                        selectedContact.language === "en" ? "text-green-500" :
                        selectedContact.language === "ka" ? "text-purple-500" :
                        "text-gray-500"
                      } mr-2`} />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {selectedContact.firstName} {selectedContact.lastName}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>@{selectedContact.username}</span>
                          <span className="mx-1">•</span>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {getStageName(selectedContact.stage)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Select value={messageFilter} onValueChange={setMessageFilter}>
                        <SelectTrigger className="h-8 text-xs border-none">
                          <SelectValue placeholder="Mesaj Filtresi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tüm Mesajlar</SelectItem>
                          <SelectItem value="incoming">Gelen Mesajlar</SelectItem>
                          <SelectItem value="outgoing">Giden Mesajlar</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setIsContactDetailOpen(true)}>
                            <User className="w-4 h-4 mr-2" />
                            Kişi Detayları
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setIsEditNoteOpen(true)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Not Ekle/Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setIsAddTagOpen(true)}>
                            <Tag className="w-4 h-4 mr-2" />
                            Etiket Ekle
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleBlockContact(selectedContact.chatId)}>
                            {selectedContact.isBlocked ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Engeli Kaldır
                              </>
                            ) : (
                              <>
                                <Ban className="w-4 h-4 mr-2" />
                                Engelle
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Mesajlar */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((message, index) => {
                        const showDate = index === 0 || (
                          new Date(filteredMessages[index - 1].date).toDateString() !== 
                          new Date(message.date).toDateString()
                        );
                        
                        return (
                          <React.Fragment key={message.id}>
                            {showDate && (
                              <div className="flex justify-center my-2">
                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                  {new Date(message.date).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            
                            <div className={`flex ${message.isIncoming ? 'justify-start' : 'justify-end'}`}>
                              <div className={`max-w-[75%] rounded-lg p-3 ${
                                message.isIncoming ? 'bg-white border border-gray-200 text-gray-800' : 'bg-primary text-white'
                              }`}>
                                <div className="text-sm">{message.text}</div>
                                <div className={`text-xs mt-1 text-right flex items-center justify-end gap-1 ${
                                  message.isIncoming ? 'text-gray-500' : 'text-blue-100'
                                }`}>
                                  {message.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  {!message.isIncoming && (
                                    message.isRead ? 
                                      <CheckCircle className="w-3 h-3" /> : 
                                      <Clock className="w-3 h-3" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <MessageCircle className="w-12 h-12 text-gray-300 mb-2" />
                        <p className="text-gray-500">Bu konuşmada mesaj bulunamadı.</p>
                        <p className="text-sm text-gray-400 mt-1">Yeni bir mesaj göndererek konuşmayı başlatın.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Mesaj Gönderme Alanı */}
                  <div className="p-3 border-t border-gray-200">
                    <div className="flex items-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <Plus className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-60">
                          <DropdownMenuLabel>Hazır Yanıtlar</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {predefinedMessages
                            .filter(msg => msg.language === selectedContact.language)
                            .slice(0, 5)
                            .map(msg => (
                              <DropdownMenuItem key={msg.id} onClick={() => applyPredefinedMessage(msg.text)}>
                                <div className="truncate">
                                  <span className="font-medium">{msg.title}</span>
                                  <p className="text-xs text-gray-500 truncate">{msg.text.substring(0, 35)}...</p>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setActiveTab("predefined-messages")}>
                            <FileText className="w-4 h-4 mr-2" />
                            Tüm Hazır Yanıtları Görüntüle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Mesajınızı yazın..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="w-full p-2 resize-none border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                        />
                      </div>
                      
                      <Button 
                        size="icon" 
                        onClick={sendMessage} 
                        disabled={!newMessage.trim()}
                        className="h-10 w-10"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">Konuşma Seçilmedi</h3>
                  <p className="text-gray-500 text-center mt-2 max-w-md">
                    Görüntülemek için sol taraftan bir kişi seçin veya yeni bir konuşma başlatın.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Hazır Yanıtlar Sekmesi */}
        <TabsContent value="predefined-messages" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Hazır yanıtlarda ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                />
              </div>
              
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Dil Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Diller</SelectItem>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">İngilizce</SelectItem>
                  <SelectItem value="ru">Rusça</SelectItem>
                  <SelectItem value="ka">Gürcüce</SelectItem>
                  <SelectItem value="az">Azerice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={() => setIsAddPredefinedOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Hazır Yanıt Ekle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {predefinedMessages
              .filter(msg => {
                const matchesSearch = searchQuery === "" || 
                  msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  msg.text.toLowerCase().includes(searchQuery.toLowerCase());
                  
                const matchesLanguage = languageFilter === "all" || msg.language === languageFilter;
                
                return matchesSearch && matchesLanguage;
              })
              .map(message => (
                <Card key={message.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{message.title}</CardTitle>
                        <CardDescription>
                          {getLanguageName(message.language)}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => editPredefinedMessage(message)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            navigator.clipboard.writeText(message.text);
                            toast({ title: "Kopyalandı", description: "Mesaj panoya kopyalandı." });
                          }}>
                            <Copy className="w-4 h-4 mr-2" />
                            Kopyala
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deletePredefinedMessage(message.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 line-clamp-4">{message.text}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex flex-wrap gap-1">
                      {message.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setNewMessage(message.text)}>
                      <Send className="w-3 h-3 mr-1" />
                      Kullan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
          
          {predefinedMessages.filter(msg => {
            const matchesSearch = searchQuery === "" || 
              msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              msg.text.toLowerCase().includes(searchQuery.toLowerCase());
              
            const matchesLanguage = languageFilter === "all" || msg.language === languageFilter;
            
            return matchesSearch && matchesLanguage;
          }).length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-700">Hazır Yanıt Bulunamadı</h3>
              <p className="text-gray-500 mt-2">
                Arama kriterlerinize uygun hazır yanıt bulunamadı. Filtreleri değiştirebilir veya yeni bir yanıt ekleyebilirsiniz.
              </p>
              <Button 
                onClick={() => setIsAddPredefinedOpen(true)}
                className="mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Hazır Yanıt Ekle
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Ayarlar Sekmesi */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Genel Bot Ayarları</CardTitle>
                <CardDescription>
                  Bot'un temel çalışma ayarlarını yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bot Durumu</Label>
                    <p className="text-sm text-gray-500">Bot'un aktif olarak çalışıp çalışmadığını belirler</p>
                  </div>
                  <Switch
                    checked={botSettings.isActive}
                    onCheckedChange={(checked) => {
                      setBotSettings({ ...botSettings, isActive: checked });
                      setIsBotRunning(checked);
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Otomatik Yanıtlayıcı</Label>
                    <p className="text-sm text-gray-500">Temel sorular için otomatik yanıt verme</p>
                  </div>
                  <Switch
                    checked={botSettings.autoResponder}
                    onCheckedChange={(checked) => {
                      setBotSettings({ ...botSettings, autoResponder: checked });
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Karşılama Mesajı</Label>
                  <Textarea
                    value={botSettings.welcomeMessage}
                    onChange={(e) => setBotSettings({ ...botSettings, welcomeMessage: e.target.value })}
                    placeholder="Kullanıcılar bot ile konuşmaya başladığında gönderilecek mesaj"
                    className="resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Bot'a yeni başlayan kullanıcılara gönderilecek karşılama mesajı
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Çevrimdışı Mesajı</Label>
                  <Textarea
                    value={botSettings.offlineMessage}
                    onChange={(e) => setBotSettings({ ...botSettings, offlineMessage: e.target.value })}
                    placeholder="Çalışma saatleri dışında gönderilecek mesaj"
                    className="resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Çalışma saatleri dışında gelen mesajlara otomatik olarak gönderilecek yanıt
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Çalışma Saatleri</CardTitle>
                <CardDescription>
                  Bot'un aktif olarak yanıt vereceği saatleri ayarlayın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(botSettings.workingHours).map(([day, hours]) => {
                  const dayNames: { [key: string]: string } = {
                    monday: "Pazartesi",
                    tuesday: "Salı",
                    wednesday: "Çarşamba",
                    thursday: "Perşembe",
                    friday: "Cuma",
                    saturday: "Cumartesi",
                    sunday: "Pazar"
                  };
                  
                  return (
                    <div key={day} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`day-${day}`}
                          checked={hours.isActive}
                          onCheckedChange={(checked) => {
                            setBotSettings({
                              ...botSettings,
                              workingHours: {
                                ...botSettings.workingHours,
                                [day]: { ...hours, isActive: checked }
                              }
                            });
                          }}
                        />
                        <Label htmlFor={`day-${day}`} className="w-24">{dayNames[day]}</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={hours.start}
                          onChange={(e) => {
                            setBotSettings({
                              ...botSettings,
                              workingHours: {
                                ...botSettings.workingHours,
                                [day]: { ...hours, start: e.target.value }
                              }
                            });
                          }}
                          className="w-24"
                          disabled={!hours.isActive}
                        />
                        <span className="text-gray-500">-</span>
                        <Input
                          type="time"
                          value={hours.end}
                          onChange={(e) => {
                            setBotSettings({
                              ...botSettings,
                              workingHours: {
                                ...botSettings.workingHours,
                                [day]: { ...hours, end: e.target.value }
                              }
                            });
                          }}
                          className="w-24"
                          disabled={!hours.isActive}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dil Ayarları</CardTitle>
                <CardDescription>
                  Bot'un desteklediği dilleri yapılandırın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {botSettings.languages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">{getLanguageName(lang.code)}</span>
                      <Badge variant="outline">{lang.code.toUpperCase()}</Badge>
                    </div>
                    
                    <Switch
                      checked={lang.isActive}
                      onCheckedChange={(checked) => {
                        const newLanguages = [...botSettings.languages];
                        newLanguages[index] = { ...lang, isActive: checked };
                        setBotSettings({ ...botSettings, languages: newLanguages });
                      }}
                    />
                  </div>
                ))}
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full" onClick={() => alert("Dil ekleme özelliği geliştirme aşamasındadır.")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Dil Ekle
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bildirim Ayarları</CardTitle>
                <CardDescription>
                  Bot etkinlikleri için bildirim tercihlerinizi belirleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newMessage"
                    checked={botSettings.notifications.newMessage}
                    onCheckedChange={(checked) => {
                      setBotSettings({
                        ...botSettings,
                        notifications: {
                          ...botSettings.notifications,
                          newMessage: checked as boolean
                        }
                      });
                    }}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="newMessage">Yeni Mesaj Bildirimleri</Label>
                    <p className="text-sm text-gray-500">
                      Yeni bir mesaj geldiğinde bildirim al
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newContact"
                    checked={botSettings.notifications.newContact}
                    onCheckedChange={(checked) => {
                      setBotSettings({
                        ...botSettings,
                        notifications: {
                          ...botSettings.notifications,
                          newContact: checked as boolean
                        }
                      });
                    }}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="newContact">Yeni Kişi Bildirimleri</Label>
                    <p className="text-sm text-gray-500">
                      Yeni bir kişi bot ile etkileşime geçtiğinde bildirim al
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="appointmentReminder"
                    checked={botSettings.notifications.appointmentReminder}
                    onCheckedChange={(checked) => {
                      setBotSettings({
                        ...botSettings,
                        notifications: {
                          ...botSettings.notifications,
                          appointmentReminder: checked as boolean
                        }
                      });
                    }}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="appointmentReminder">Randevu Hatırlatıcıları</Label>
                    <p className="text-sm text-gray-500">
                      Yaklaşan randevular için hatırlatıcı bildirimleri al
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="dailySummary"
                    checked={botSettings.notifications.dailySummary}
                    onCheckedChange={(checked) => {
                      setBotSettings({
                        ...botSettings,
                        notifications: {
                          ...botSettings.notifications,
                          dailySummary: checked as boolean
                        }
                      });
                    }}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="dailySummary">Günlük Özet</Label>
                    <p className="text-sm text-gray-500">
                      Her gün sonunda bot aktivitelerinin özetini al
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => {
              // Varsayılan ayarlara geri dön
              setBotSettings(mockBotSettings);
              toast({
                title: "Ayarlar sıfırlandı",
                description: "Bot ayarları varsayılan değerlere sıfırlandı.",
              });
            }}>
              Varsayılana Sıfırla
            </Button>
            <Button onClick={() => {
              toast({
                title: "Ayarlar kaydedildi",
                description: "Bot ayarları başarıyla güncellendi.",
              });
            }}>
              Ayarları Kaydet
            </Button>
          </div>
        </TabsContent>
        
        {/* İstatistikler Sekmesi */}
        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gray-500">Toplam Kişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">{botStats.totalContacts}</div>
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span>{botStats.newContactsLastWeek} yeni (son 7 gün)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gray-500">Aktif Kişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">{botStats.activeContacts}</div>
                  <UserCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Son 30 gün içinde aktif
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gray-500">Toplam Mesaj</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">{botStats.totalMessages}</div>
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div className="mt-2 text-sm text-blue-600 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{botStats.messagesLastWeek} mesaj (son 7 gün)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-gray-500">Ortalama Yanıt Süresi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">{botStats.responseTime.average}</div>
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  %90: {botStats.responseTime.percentile90}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dil Dağılımı</CardTitle>
                <CardDescription>
                  Bot kullanıcılarının dil tercihleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {botStats.messagesByLanguage.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-2 ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-red-500' :
                            index === 2 ? 'bg-green-500' :
                            index === 3 ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}></span>
                          <span>{getLanguageName(item.language)}</span>
                        </div>
                        <span className="font-medium">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-red-500' :
                            index === 2 ? 'bg-green-500' :
                            index === 3 ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Aşamalara Göre Dağılım</CardTitle>
                <CardDescription>
                  Kişilerin bulunduğu işlem aşamaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {botStats.messagesByStage.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-2 ${
                            item.stage === "inquiry" ? 'bg-yellow-500' :
                            item.stage === "consultation" ? 'bg-green-500' :
                            item.stage === "appointment" ? 'bg-blue-500' :
                            item.stage === "post-treatment" ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}></span>
                          <span>{getStageName(item.stage)}</span>
                        </div>
                        <span className="font-medium">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.stage === "inquiry" ? 'bg-yellow-500' :
                            item.stage === "consultation" ? 'bg-green-500' :
                            item.stage === "appointment" ? 'bg-blue-500' :
                            item.stage === "post-treatment" ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Rapor İndir
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => alert("Bu özellik bağlantı gerektirir ve şu anda simüle edilemez.")}>
                  PDF Raporu
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Bu özellik bağlantı gerektirir ve şu anda simüle edilemez.")}>
                  Excel Raporu
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Bu özellik bağlantı gerektirir ve şu anda simüle edilemez.")}>
                  JSON Verisi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Hazır Yanıt Ekleme/Düzenleme Modalı */}
      <Dialog open={isAddPredefinedOpen} onOpenChange={setIsAddPredefinedOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingPredefined ? "Hazır Yanıt Düzenle" : "Yeni Hazır Yanıt Ekle"}
            </DialogTitle>
            <DialogDescription>
              Bot'un kullanacağı hazır yanıt mesajlarını oluşturun
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                defaultValue={editingPredefined?.title || ""}
                placeholder="Yanıt için kısa bir başlık"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="text">Mesaj İçeriği</Label>
              <Textarea
                id="text"
                defaultValue={editingPredefined?.text || ""}
                placeholder="Hazır yanıt mesajının içeriği"
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Dil</Label>
                <Select defaultValue={editingPredefined?.language || "tr"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">İngilizce</SelectItem>
                    <SelectItem value="ru">Rusça</SelectItem>
                    <SelectItem value="ka">Gürcüce</SelectItem>
                    <SelectItem value="az">Azerice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Etiketler</Label>
                <Input
                  id="tags"
                  defaultValue={editingPredefined?.tags.join(", ") || ""}
                  placeholder="Virgülle ayrılmış etiketler"
                />
                <p className="text-xs text-gray-500">
                  Etiketleri virgülle ayırarak girin (örn: fiyat, genel, randevu)
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddPredefinedOpen(false);
              setEditingPredefined(null);
            }}>
              İptal
            </Button>
            <Button type="submit" onClick={() => {
              const title = (document.getElementById("title") as HTMLInputElement).value;
              const text = (document.getElementById("text") as HTMLTextAreaElement).value;
              const language = (document.querySelector("[data-radix-select-value]") as HTMLElement).getAttribute("data-value") || "tr";
              const tagsInput = (document.getElementById("tags") as HTMLInputElement).value;
              
              const tags = tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag);
              
              if (!title || !text) {
                toast({
                  title: "Eksik bilgi",
                  description: "Lütfen başlık ve mesaj içeriğini doldurun.",
                  variant: "destructive",
                });
                return;
              }
              
              addPredefinedMessage({
                id: editingPredefined?.id || predefinedMessages.length + 1,
                title,
                text,
                language,
                tags: tags.length > 0 ? tags : ["genel"]
              });
            }}>
              {editingPredefined ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Etiket Ekleme Modalı */}
      <Dialog open={isAddTagOpen} onOpenChange={setIsAddTagOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Etiket Ekle</DialogTitle>
            <DialogDescription>
              Kişiye etiket ekleyerek kategorize edin
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <Label>Mevcut Etiketler</Label>
              <div className="flex flex-wrap gap-2">
                {selectedContact?.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-1">
                    {tag}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1 hover:bg-gray-200"
                      onClick={() => {
                        if (selectedContact) {
                          const newTags = selectedContact.tags.filter((_, i) => i !== index);
                          setContacts(contacts.map(contact => 
                            contact.id === selectedContact.id ? { ...contact, tags: newTags } : contact
                          ));
                        }
                      }}
                    >
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newTag">Yeni Etiket</Label>
              <div className="flex gap-2">
                <Input id="newTag" placeholder="Yeni etiket adı" />
                <Button onClick={() => {
                  const tagInput = document.getElementById("newTag") as HTMLInputElement;
                  const newTag = tagInput.value.trim();
                  
                  if (newTag && selectedContact) {
                    if (!selectedContact.tags.includes(newTag)) {
                      const newTags = [...selectedContact.tags, newTag];
                      setContacts(contacts.map(contact => 
                        contact.id === selectedContact.id ? { ...contact, tags: newTags } : contact
                      ));
                      tagInput.value = "";
                    } else {
                      toast({
                        title: "Etiket zaten mevcut",
                        description: "Bu etiket zaten eklenmiş.",
                        variant: "destructive",
                      });
                    }
                  }
                }}>
                  Ekle
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Önerilen Etiketler</Label>
              <div className="flex flex-wrap gap-2">
                {["saç-ekimi", "kaş-ekimi", "sakal-ekimi", "prp", "mezoterapı", "aktif-müşteri", "potansiyel-müşteri", "takip"].map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      if (selectedContact && !selectedContact.tags.includes(tag)) {
                        const newTags = [...selectedContact.tags, tag];
                        setContacts(contacts.map(contact => 
                          contact.id === selectedContact.id ? { ...contact, tags: newTags } : contact
                        ));
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsAddTagOpen(false)}>
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Not Ekleme/Düzenleme Modalı */}
      <Dialog open={isEditNoteOpen} onOpenChange={setIsEditNoteOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kişi Notu</DialogTitle>
            <DialogDescription>
              Kişi ile ilgili özel notlarınızı ekleyin veya düzenleyin
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contactNote">Not</Label>
              <Textarea
                id="contactNote"
                defaultValue={selectedContact?.notes || ""}
                placeholder="Kişi ile ilgili özel notlarınızı buraya ekleyin"
                rows={5}
              />
              <p className="text-xs text-gray-500">
                Bu not sadece admin panelinde görünür ve kişiye gönderilmez
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditNoteOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => {
              const note = (document.getElementById("contactNote") as HTMLTextAreaElement).value;
              if (selectedContact) {
                updateContactNote(selectedContact.chatId, note);
              }
            }}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Kişi Detayları Modalı */}
      <Dialog open={isContactDetailOpen} onOpenChange={setIsContactDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Kişi Detayları</DialogTitle>
            <DialogDescription>
              Kişi bilgileri ve iletişim geçmişi
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Kişisel Bilgiler</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">İsim</span>
                      <span className="text-sm text-gray-900">{selectedContact.firstName} {selectedContact.lastName}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Kullanıcı Adı</span>
                      <span className="text-sm text-gray-900">@{selectedContact.username}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Telegram Chat ID</span>
                      <span className="text-sm text-gray-900">{selectedContact.chatId}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">İlk Etkileşim</span>
                      <span className="text-sm text-gray-900">{formatDate(selectedContact.startDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">İletişim Bilgileri</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">E-posta</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{selectedContact.email}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                          navigator.clipboard.writeText(selectedContact.email);
                          toast({ title: "Kopyalandı", description: "E-posta adresi panoya kopyalandı." });
                        }}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Telefon</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{selectedContact.phone}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                          navigator.clipboard.writeText(selectedContact.phone);
                          toast({ title: "Kopyalandı", description: "Telefon numarası panoya kopyalandı." });
                        }}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Konum</span>
                      <span className="text-sm text-gray-900">{selectedContact.location}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Dil</span>
                      <span className="text-sm text-gray-900">{getLanguageName(selectedContact.language)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Konuşma Bilgileri</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs font-medium text-gray-500 block">Aşama</span>
                    <span className="text-sm font-medium text-gray-900">
                      {getStageName(selectedContact.stage)}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs font-medium text-gray-500 block">Toplam Mesaj</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedContact.messagesCount}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs font-medium text-gray-500 block">Son Mesaj</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(selectedContact.lastMessageDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedContact.appointmentDate && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Randevu Bilgisi</h3>
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-blue-800">
                          {new Date(selectedContact.appointmentDate).toLocaleDateString()} - {new Date(selectedContact.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-xs text-blue-600">
                          {Math.ceil((new Date(selectedContact.appointmentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} gün kaldı
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Notlar</h3>
                <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-800">
                    {selectedContact.notes || "Bu kişi için not eklenmemiş."}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => {
                      setIsContactDetailOpen(false);
                      setIsEditNoteOpen(true);
                    }}>
                      <Edit className="w-3 h-3 mr-1" />
                      Düzenle
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    setIsContactDetailOpen(false);
                    setIsAddTagOpen(true);
                  }}>
                    <Plus className="w-3 h-3 mr-1" />
                    Etiket Ekle
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsContactDetailOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bot Ayarları Modalı */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Bot Ayarları</DialogTitle>
            <DialogDescription>
              Telegram bot'unuzun çalışma ayarlarını yapılandırın
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="general">Genel</TabsTrigger>
                <TabsTrigger value="operators">Operatörler</TabsTrigger>
                <TabsTrigger value="commands">Komutlar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="botActive">Bot Durumu</Label>
                      <Switch
                        id="botActive"
                        checked={botSettings.isActive}
                        onCheckedChange={(checked) => {
                          setBotSettings({ ...botSettings, isActive: checked });
                          setIsBotRunning(checked);
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Bot'un aktif olarak çalışıp çalışmadığını belirler
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="webhookUrl"
                        value="https://my-bot-webhook.onrender.com/api/webhook"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline" onClick={() => {
                        navigator.clipboard.writeText("https://my-bot-webhook.onrender.com/api/webhook");
                        toast({ title: "Kopyalandı", description: "Webhook URL'i panoya kopyalandı." });
                      }}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Telegram bot API'sine kaydedilen webhook URL'i
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="autoResponder">Otomatik Yanıtlayıcı</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Basit sorulara otomatik yanıt verme</span>
                      <Switch
                        id="autoResponder"
                        checked={botSettings.autoResponder}
                        onCheckedChange={(checked) => {
                          setBotSettings({ ...botSettings, autoResponder: checked });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="operators" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="border rounded-lg divide-y">
                    {botSettings.operators.map((operator, index) => (
                      <div key={index} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <UserCircle className="w-8 h-8 text-gray-400" />
                          <div>
                            <div className="font-medium">{operator.name}</div>
                            <div className="text-sm text-gray-500">{operator.telegramUsername}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">Aktif</span>
                            <Switch
                              checked={operator.isActive}
                              onCheckedChange={(checked) => {
                                const newOperators = [...botSettings.operators];
                                newOperators[index] = { ...operator, isActive: checked };
                                setBotSettings({ ...botSettings, operators: newOperators });
                              }}
                            />
                          </div>
                          <Button variant="ghost" size="icon" disabled={operator.name === "Admin"}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => alert("Operatör ekleme özelliği geliştirme aşamasındadır.")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Operatör Ekle
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="commands" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 font-medium text-sm">
                      Bot Komutları
                    </div>
                    <div className="divide-y">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-sm">/start</div>
                          <div className="text-sm text-gray-500 mt-1">Bot'u başlatır ve karşılama mesajını gönderir</div>
                        </div>
                        <div>
                          <Badge variant="outline">Varsayılan</Badge>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-sm">/help</div>
                          <div className="text-sm text-gray-500 mt-1">Kullanılabilir komutları ve yardım bilgilerini gösterir</div>
                        </div>
                        <div>
                          <Badge variant="outline">Varsayılan</Badge>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-sm">/services</div>
                          <div className="text-sm text-gray-500 mt-1">Mevcut hizmetleri listeler</div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Düzenle
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-sm">/prices</div>
                          <div className="text-sm text-gray-500 mt-1">Fiyat bilgilerini gösterir</div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Düzenle
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-sm">/appointment</div>
                          <div className="text-sm text-gray-500 mt-1">Randevu talebi oluşturur</div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Düzenle
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-mono text-sm">/contact</div>
                          <div className="text-sm text-gray-500 mt-1">İletişim bilgilerini gösterir</div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Düzenle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => alert("Komut ekleme özelliği geliştirme aşamasındadır.")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Komut Ekle
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => saveBotSettings(botSettings)}>
              Ayarları Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bot Sıfırlama Onay Modalı */}
      <AlertDialog open={isConfirmResetOpen} onOpenChange={setIsConfirmResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bot'u Sıfırla</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem bot'un bağlantısını keserek yeniden başlatacaktır. Bot geçici olarak yanıt vermeyecektir. Devam etmek istediğinizden emin misiniz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={resetBot} className="bg-red-600 hover:bg-red-700">
              Evet, Bot'u Sıfırla
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TelegramBotManagement;