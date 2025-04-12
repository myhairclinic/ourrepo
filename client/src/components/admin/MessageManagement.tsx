import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  UserCircle,
  Send,
  Search,
  CheckCircle,
  Filter,
  RefreshCcw,
  Bell,
  ArrowLeft,
  ArrowRight,
  Archive,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  MessageSquareText,
  Phone,
  Mail,
  Flag,
  MoreVertical,
  ExternalLink,
  Smartphone,
  Globe
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Örnek veriler
const mockChatSessions = [
  {
    id: 1,
    visitorId: "v-12345",
    visitorName: "Mehmet Yılmaz",
    visitorEmail: "mehmet@example.com",
    status: "active", // active, closed, pending
    createdAt: new Date("2025-04-12T10:45:00"),
    lastMessageAt: new Date("2025-04-12T11:30:00"),
    isArchived: false,
    hasUnreadMessages: true,
    unreadCount: 2,
    lastMessage: "Saç ekimi için fiyat bilgisi alabilir miyim?",
    country: "TR",
    device: "mobile",
    referrer: "instagram.com",
    metadata: {
      browser: "Chrome",
      os: "Android",
      language: "TR",
      source: "website",
      page: "/services/hair-transplantation"
    }
  },
  {
    id: 2,
    visitorId: "v-23456",
    visitorName: "John Smith",
    visitorEmail: "john@example.com",
    status: "active",
    createdAt: new Date("2025-04-12T08:15:00"),
    lastMessageAt: new Date("2025-04-12T11:25:00"),
    isArchived: false,
    hasUnreadMessages: false,
    unreadCount: 0,
    lastMessage: "Thank you for your detailed information. I'll book my appointment tomorrow.",
    country: "US",
    device: "desktop",
    referrer: "google.com",
    metadata: {
      browser: "Firefox",
      os: "Windows",
      language: "EN",
      source: "website",
      page: "/hair-transplantation-packages"
    }
  },
  {
    id: 3,
    visitorId: "v-34567",
    visitorName: "Александр Петров",
    visitorEmail: "alex@example.com",
    status: "closed",
    createdAt: new Date("2025-04-11T14:20:00"),
    lastMessageAt: new Date("2025-04-11T15:45:00"),
    isArchived: true,
    hasUnreadMessages: false,
    unreadCount: 0,
    lastMessage: "Спасибо, я свяжусь с вами после получения визы.",
    country: "RU",
    device: "tablet",
    referrer: "yandex.ru",
    metadata: {
      browser: "Safari",
      os: "iOS",
      language: "RU",
      source: "website",
      page: "/ru/services"
    }
  },
  {
    id: 4,
    visitorId: "v-45678",
    visitorName: null,
    visitorEmail: null,
    status: "pending",
    createdAt: new Date("2025-04-12T11:30:00"),
    lastMessageAt: new Date("2025-04-12T11:30:00"),
    isArchived: false,
    hasUnreadMessages: true,
    unreadCount: 1,
    lastMessage: "გამარჯობა, შემიძლია მივიღო კონსულტაცია?",
    country: "GE",
    device: "mobile",
    referrer: "direct",
    metadata: {
      browser: "Chrome",
      os: "Android",
      language: "KA",
      source: "website",
      page: "/ka"
    }
  },
  {
    id: 5,
    visitorId: "v-56789",
    visitorName: "Ali Nawaz",
    visitorEmail: "ali@example.com",
    status: "active",
    createdAt: new Date("2025-04-11T09:10:00"),
    lastMessageAt: new Date("2025-04-12T10:05:00"),
    isArchived: false,
    hasUnreadMessages: true,
    unreadCount: 3,
    lastMessage: "Do you have any discounts for the full package?",
    country: "AZ",
    device: "desktop",
    referrer: "facebook.com",
    metadata: {
      browser: "Edge",
      os: "Windows",
      language: "EN",
      source: "ad-campaign",
      page: "/packages"
    }
  }
];

// Örnek mesajlar
const mockMessages = [
  {
    id: 1,
    sessionId: 1,
    content: "Merhaba, saç ekimi ile ilgili bilgi almak istiyorum.",
    timestamp: new Date("2025-04-12T10:45:00"),
    senderType: "visitor", // visitor, operator, system
    senderId: "v-12345",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 2,
    sessionId: 1,
    content: "Merhaba, MyHair Clinic'e hoş geldiniz. Size nasıl yardımcı olabilirim?",
    timestamp: new Date("2025-04-12T10:47:00"),
    senderType: "operator",
    senderId: "admin",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 3,
    sessionId: 1,
    content: "Saç ekimi için fiyat bilgisi alabilir miyim?",
    timestamp: new Date("2025-04-12T10:50:00"),
    senderType: "visitor",
    senderId: "v-12345",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 4,
    sessionId: 1,
    content: "Hangi yöntemle saç ekimi düşünüyorsunuz? FUE ve DHI yöntemlerimiz mevcut.",
    timestamp: new Date("2025-04-12T10:53:00"),
    senderType: "operator",
    senderId: "admin",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 5,
    sessionId: 1,
    content: "FUE yöntemi hakkında bilgi alabilir miyim?",
    timestamp: new Date("2025-04-12T11:25:00"),
    senderType: "visitor",
    senderId: "v-12345",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 6,
    sessionId: 1,
    content: "FUE yöntemi, saç köklerinin tek tek alınıp nakledildiği bir yöntemdir. DHI'dan farkı, kanalların önceden açılmasıdır.",
    timestamp: new Date("2025-04-12T11:27:00"),
    senderType: "operator",
    senderId: "admin",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 7,
    sessionId: 1,
    content: "Fiyatlandırma greft sayısına bağlı olarak değişmektedir. Ortalama 3000 greft için 1500€ başlangıç fiyatımız bulunmaktadır.",
    timestamp: new Date("2025-04-12T11:28:00"),
    senderType: "operator",
    senderId: "admin",
    isRead: true,
    attachmentUrl: null
  },
  {
    id: 8,
    sessionId: 1,
    content: "Saç ekimi paketlerimize konaklama da dahil mi?",
    timestamp: new Date("2025-04-12T11:29:00"),
    senderType: "visitor",
    senderId: "v-12345",
    isRead: false,
    attachmentUrl: null
  },
  {
    id: 9,
    sessionId: 1,
    content: "Tbilisi'deki kliniğinizin tam adresi nedir?",
    timestamp: new Date("2025-04-12T11:30:00"),
    senderType: "visitor",
    senderId: "v-12345",
    isRead: false,
    attachmentUrl: null
  }
];

// Canned responses - Hazır yanıtlar
const cannedResponses = [
  {
    id: 1,
    title: "Karşılama",
    content: "Merhaba, MyHair Clinic'e hoş geldiniz! Size nasıl yardımcı olabilirim?",
    shortcut: "/welcome"
  },
  {
    id: 2,
    title: "FUE Açıklama",
    content: "FUE (Follicular Unit Extraction) yönteminde saç kökleri tek tek alınıp nakledilir. Skar bırakmadan doğal görünümlü sonuçlar elde edilir.",
    shortcut: "/fue"
  },
  {
    id: 3,
    title: "DHI Açıklama",
    content: "DHI (Direct Hair Implantation) yönteminde özel kalem-benzeri implanter ile saç kökleri doğrudan alıcı bölgeye nakledilir. Kanal açma işlemi yapılmaz.",
    shortcut: "/dhi"
  },
  {
    id: 4,
    title: "Fiyat Bilgisi",
    content: "Saç ekimi fiyatlarımız ekilecek greft sayısına göre değişmektedir. Uygun fiyat için ücretsiz konsültasyon randevusu alabilirsiniz.",
    shortcut: "/price"
  },
  {
    id: 5,
    title: "İletişim Bilgileri",
    content: "Bize şu numaradan ulaşabilirsiniz: +995555003044 veya myhairtbilisi@gmail.com mail adresinden yazabilirsiniz. Adresimiz: Tsotne Dadiani 59, Tbilisi, Gürcistan.",
    shortcut: "/contact"
  },
  {
    id: 6,
    title: "Randevu Oluşturma",
    content: "Ücretsiz konsültasyon randevusu oluşturmak için adınızı, soyadınızı ve telefon numaranızı paylaşabilir misiniz?",
    shortcut: "/appointment"
  }
];

// İstatistikler
const chatStats = {
  totalSessions: 127,
  activeSessions: 14,
  unreadMessages: 8,
  averageResponseTime: "3m 24s",
  conversationsByCountry: [
    { country: "TR", count: 45 },
    { country: "RU", count: 32 },
    { country: "KA", count: 20 },
    { country: "AZ", count: 15 },
    { country: "US", count: 8 },
    { country: "Other", count: 7 }
  ],
  conversationsByLanguage: [
    { language: "Türkçe", count: 42 },
    { language: "Rusça", count: 35 },
    { language: "İngilizce", count: 30 },
    { language: "Gürcüce", count: 20 }
  ],
  conversationsBySource: [
    { source: "Website", count: 80 },
    { source: "Social Media", count: 30 },
    { source: "Ad Campaign", count: 12 },
    { source: "Direct", count: 5 }
  ]
};

interface MessageManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const MessageManagement: React.FC<MessageManagementProps> = () => {
  const [chatSessions, setChatSessions] = useState(mockChatSessions);
  const [messages, setMessages] = useState(mockMessages);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showCannedResponses, setShowCannedResponses] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtreleme
  const filteredSessions = chatSessions.filter(session => {
    let matchesTab = false;
    
    if (activeTab === "active") matchesTab = session.status === "active" && !session.isArchived;
    else if (activeTab === "pending") matchesTab = session.status === "pending" && !session.isArchived;
    else if (activeTab === "closed") matchesTab = session.status === "closed" && !session.isArchived;
    else if (activeTab === "archived") matchesTab = session.isArchived;
    else matchesTab = true;
    
    const matchesSearch = 
      (session.visitorName && session.visitorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (session.visitorEmail && session.visitorEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (session.lastMessage && session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (session.country && session.country.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && (searchQuery === "" || matchesSearch);
  });

  // Sayfalama
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sayfa değiştirme
  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Oturum seçimi
  const selectSession = (sessionId: number) => {
    setCurrentSessionId(sessionId);
    
    // Mesajları okundu olarak işaretle
    setMessages(messages.map(msg => 
      msg.sessionId === sessionId ? { ...msg, isRead: true } : msg
    ));
    
    // Oturum unread durumunu güncelle
    setChatSessions(chatSessions.map(session => 
      session.id === sessionId ? { ...session, hasUnreadMessages: false, unreadCount: 0 } : session
    ));
  };

  // Yeni mesaj gönderme
  const sendMessage = () => {
    if (!newMessage.trim() || !currentSessionId) return;
    
    const newMsg = {
      id: messages.length + 1,
      sessionId: currentSessionId,
      content: newMessage,
      timestamp: new Date(),
      senderType: "operator" as const,
      senderId: "admin",
      isRead: true,
      attachmentUrl: null
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Oturum son mesaj tarihini güncelle
    setChatSessions(chatSessions.map(session => 
      session.id === currentSessionId ? 
        { ...session, lastMessageAt: new Date(), lastMessage: newMessage } : 
        session
    ));
  };

  // Mesajları filtrele
  const sessionMessages = messages.filter(msg => 
    msg.sessionId === currentSessionId
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Aktif oturum
  const activeSession = chatSessions.find(s => s.id === currentSessionId);

  // Tarih formatla
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Canned response uygula
  const applyCannedResponse = (response: string) => {
    setNewMessage(response);
    setShowCannedResponses(false);
  };

  // Oturumu arşivle
  const archiveSession = (sessionId: number) => {
    setChatSessions(chatSessions.map(session => 
      session.id === sessionId ? { ...session, isArchived: true } : session
    ));
    setIsArchiveModalOpen(false);
    
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
  };

  // Oturumu sil
  const deleteSession = (sessionId: number) => {
    setChatSessions(chatSessions.filter(session => session.id !== sessionId));
    setMessages(messages.filter(msg => msg.sessionId !== sessionId));
    setIsDeleteModalOpen(false);
    
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mesaj Yönetimi</h2>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${chatStats.unreadMessages > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {chatStats.unreadMessages} Okunmamış
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            {chatStats.activeSessions} Aktif Oturum
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
        {/* Sol Sütun - Oturum Listesi */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden lg:col-span-1">
          <div className="p-3 border-b border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="active" className="relative">
                  Aktif
                  {chatSessions.filter(s => s.status === "active" && !s.isArchived && s.hasUnreadMessages).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {chatSessions.filter(s => s.status === "active" && !s.isArchived && s.hasUnreadMessages).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="pending" className="relative">
                  Bekleyen
                  {chatSessions.filter(s => s.status === "pending" && !s.isArchived).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {chatSessions.filter(s => s.status === "pending" && !s.isArchived).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="closed">Kapalı</TabsTrigger>
                <TabsTrigger value="archived">Arşiv</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="İsim, e-posta veya mesaj ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-300px)]">
            {paginatedSessions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {paginatedSessions.map((session) => (
                  <div 
                    key={session.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${
                      currentSessionId === session.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => selectSession(session.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <UserCircle className={`w-10 h-10 ${
                            session.country === "TR" ? "text-blue-500" :
                            session.country === "RU" ? "text-red-500" :
                            session.country === "GE" ? "text-green-500" :
                            "text-gray-500"
                          }`} />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white">
                            <Flag className={`w-4 h-4 ${
                              session.status === "active" ? "text-green-500" :
                              session.status === "pending" ? "text-orange-500" :
                              "text-gray-400"
                            }`} />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {session.visitorName || "Anonim Ziyaretçi"}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(session.lastMessageAt)}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500 truncate">
                              {session.lastMessage || "Yeni konuşma başlatıldı"}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-1 space-x-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {session.country || "??"}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded flex items-center">
                              {session.device === "mobile" ? (
                                <Smartphone className="w-3 h-3 mr-0.5" />
                              ) : (
                                <Globe className="w-3 h-3 mr-0.5" />
                              )}
                              {session.metadata.language}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {session.hasUnreadMessages && (
                        <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {session.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-500">Gösterilecek konuşma bulunamadı.</p>
                <p className="text-sm text-gray-400 mt-1">Filtreleri temizlemeyi deneyin.</p>
              </div>
            )}
          </div>
          
          {filteredSessions.length > itemsPerPage && (
            <div className="p-3 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <span className="text-sm text-gray-600">
                Sayfa {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        {/* Sağ Sütun - Konuşma ve Detaylar */}
        <div className="lg:col-span-2 grid grid-rows-[auto_1fr] h-full gap-4">
          {/* Konuşma Alanı */}
          {currentSessionId ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
              {/* Konuşma Başlığı */}
              <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="flex items-center">
                  <UserCircle className="w-8 h-8 text-gray-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {activeSession?.visitorName || "Anonim Ziyaretçi"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeSession?.visitorEmail || "E-posta yok"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsDetailsModalOpen(true)}
                    className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
                    title="Ziyaretçi Detayları"
                  >
                    <UserCircle className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => setIsArchiveModalOpen(true)}
                    className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
                    title="Arşivle"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsTransferModalOpen(true)}>
                        Başka Operatöre Devret
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Konuşmayı E-posta ile Gönder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
                        Konuşmayı Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Mesajlar */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {sessionMessages.map((message, index) => {
                  const showDate = index === 0 || (
                    new Date(sessionMessages[index - 1].timestamp).toDateString() !== 
                    new Date(message.timestamp).toDateString()
                  );
                  
                  return (
                    <React.Fragment key={message.id}>
                      {showDate && (
                        <div className="flex justify-center my-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${message.senderType === 'visitor' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderType === 'visitor' ? 'bg-gray-100 text-gray-800' : 'bg-primary text-white'
                        }`}>
                          <div className="text-sm">{message.content}</div>
                          <div className={`text-xs mt-1 text-right ${
                            message.senderType === 'visitor' ? 'text-gray-500' : 'text-blue-100'
                          }`}>
                            {formatTime(message.timestamp)}
                            {message.senderType === 'operator' && (
                              message.isRead ? 
                                <CheckCircle2 className="inline-block w-3 h-3 ml-1" /> : 
                                <Clock className="inline-block w-3 h-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              
              {/* Mesaj Gönderme Alanı */}
              <div className="p-3 border-t border-gray-200">
                <div className="relative">
                  <textarea
                    placeholder="Mesajınızı yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="w-full p-3 pr-24 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  ></textarea>
                  
                  <div className="absolute bottom-3 right-3 flex">
                    <button
                      onClick={() => setShowCannedResponses(!showCannedResponses)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-1"
                      title="Hazır Yanıtlar"
                    >
                      <MessageSquareText className="w-5 h-5" />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className={`p-2 rounded-full ${
                        !newMessage.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'
                      }`}
                      title="Gönder"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Hazır Yanıtlar Dropdown */}
                  {showCannedResponses && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      <div className="p-2">
                        <h4 className="text-xs font-semibold text-gray-500 mb-1">Hazır Yanıtlar</h4>
                        <div className="space-y-1">
                          {cannedResponses.map((response) => (
                            <div
                              key={response.id}
                              className="p-2 hover:bg-gray-50 rounded cursor-pointer text-sm"
                              onClick={() => applyCannedResponse(response.content)}
                            >
                              <div className="font-medium">{response.title}</div>
                              <div className="text-xs text-gray-500 truncate">{response.content}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 h-full">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">Mesaj Seçilmedi</h3>
              <p className="text-gray-500 text-center mt-2">
                Görüntülemek için sol taraftan bir konuşma seçin veya yeni bir konuşma başlatın.
              </p>
            </div>
          )}
          
          {/* İstatistikler Alanı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Konuşma İstatistikleri</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Toplam</p>
                    <p className="text-2xl font-semibold">{chatStats.totalSessions}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Ort. Yanıt Süresi</p>
                    <p className="text-2xl font-semibold">{chatStats.averageResponseTime}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-xs text-gray-500">Ülkelere Göre</p>
                    <div className="grid grid-cols-3 gap-1">
                      {chatStats.conversationsByCountry.slice(0, 3).map((item, index) => (
                        <div key={index} className="text-center">
                          <span className="text-xs font-semibold">{item.country}</span>
                          <div className="bg-blue-100 h-4 rounded-sm mt-1 relative overflow-hidden">
                            <div
                              className="bg-blue-500 h-full"
                              style={{ width: `${(item.count / Math.max(...chatStats.conversationsByCountry.map(c => c.count))) * 100}%` }}
                            ></div>
                            <span className="absolute inset-0 text-[10px] text-blue-900 flex items-center justify-center">
                              {item.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dil Dağılımı</CardTitle>
                <CardDescription>Konuşma istatistikleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chatStats.conversationsByLanguage.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.language}</span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                      <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-red-500' :
                            index === 2 ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${(item.count / chatStats.totalSessions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Transfer Modal */}
      <Dialog open={isTransferModalOpen} onOpenChange={setIsTransferModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konuşmayı Devret</DialogTitle>
            <DialogDescription>
              Bu konuşmayı başka bir operatöre devretmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Konuşma devredildiğinde, diğer operatör tarafından ele alınacaktır. Bu işlem geri alınamaz.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Operatör Seçin
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                <option>Ahmet Yılmaz</option>
                <option>Mehmet Demir</option>
                <option>Ayşe Kaya</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Devir Notu (İsteğe bağlı)
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm"
                rows={3}
                placeholder="Diğer operatöre konuşmayla ilgili eklemek istediğiniz bir not..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsTransferModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              İptal
            </button>
            <button
              onClick={() => {
                setIsTransferModalOpen(false);
                // Devretme işlemi
              }}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none"
            >
              Konuşmayı Devret
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Arşivleme Modal */}
      <Dialog open={isArchiveModalOpen} onOpenChange={setIsArchiveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konuşmayı Arşivle</DialogTitle>
            <DialogDescription>
              Bu konuşmayı arşivlemek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Arşivlenen konuşmalar aktif listeden kaldırılır ancak arşiv sekmesinden erişilebilir durumda olur.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsArchiveModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              İptal
            </button>
            <button
              onClick={() => archiveSession(currentSessionId!)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none"
            >
              Arşivle
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Silme Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konuşmayı Sil</DialogTitle>
            <DialogDescription>
              Bu konuşmayı silmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Bu işlem geri alınamaz. Konuşma ve tüm mesajlar kalıcı olarak silinecektir.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              İptal
            </button>
            <button
              onClick={() => deleteSession(currentSessionId!)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Sil
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Ziyaretçi Detayları Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ziyaretçi Detayları</DialogTitle>
            <DialogDescription>
              Konuşma ve ziyaretçi bilgileri
            </DialogDescription>
          </DialogHeader>
          
          {activeSession && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Ziyaretçi Bilgileri</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">İsim</span>
                      <span className="text-sm text-gray-900">{activeSession.visitorName || "Bilinmiyor"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">E-posta</span>
                      <span className="text-sm text-gray-900">{activeSession.visitorEmail || "Bilinmiyor"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Ülke</span>
                      <span className="text-sm text-gray-900">{activeSession.country || "Bilinmiyor"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Dil</span>
                      <span className="text-sm text-gray-900">{activeSession.metadata.language || "Bilinmiyor"}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Teknik Bilgiler</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Tarayıcı</span>
                      <span className="text-sm text-gray-900">{activeSession.metadata.browser || "Bilinmiyor"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">İşletim Sistemi</span>
                      <span className="text-sm text-gray-900">{activeSession.metadata.os || "Bilinmiyor"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Cihaz</span>
                      <span className="text-sm text-gray-900">{activeSession.device || "Bilinmiyor"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">Referans</span>
                      <span className="text-sm text-gray-900">{activeSession.referrer || "Direkt"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Konuşma Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs font-medium text-gray-500 block">Başlangıç</span>
                    <span className="text-sm font-medium text-gray-900">
                      {activeSession.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs font-medium text-gray-500 block">Son Aktivite</span>
                    <span className="text-sm font-medium text-gray-900">
                      {activeSession.lastMessageAt.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs font-medium text-gray-500 block">Durum</span>
                    <span className={`text-sm font-medium ${
                      activeSession.status === "active" ? "text-green-600" :
                      activeSession.status === "pending" ? "text-orange-600" :
                      "text-gray-600"
                    }`}>
                      {activeSession.status === "active" ? "Aktif" :
                       activeSession.status === "pending" ? "Beklemede" :
                       "Kapalı"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Hızlı Eylemler</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">Ara</span>
                  </button>
                  <button className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">E-posta Gönder</span>
                  </button>
                  <button className="flex items-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="text-sm">CRM'de Aç</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Kapat
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageManagement;