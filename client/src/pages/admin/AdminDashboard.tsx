import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { Loader2, Settings, Users, Package, MessageCircle, Calendar, FileText, Image, Star, HelpCircle, BookOpen, Package2, BarChart, ArrowLeft, LogOut, ShoppingBag, Heart, Globe, Search, ChevronDown, Bell, User, Menu, X, PlusCircle, Trash2, Edit, Download, Upload, Eye, HardDrive, List, LayoutGrid, LayoutList, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { 
  VisitorsChart, 
  AppointmentsChart, 
  CountryDistributionChart, 
  ServiceDistributionChart 
} from "@/components/admin/DashboardCharts";
import AdminRoleManagement from "@/components/admin/AdminRoleManagement";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const { user, logout, isLoading } = useAdmin();
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    appointments: 0,
    products: 0,
    services: 0,
    users: 0
  });
  
  // Temel istatistikleri al
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) return [];
      return res.json();
    }
  });
  
  const { data: products } = useQuery({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) return [];
      return res.json();
    }
  });
  
  const { data: packages } = useQuery({
    queryKey: ["/api/packages"],
    queryFn: async () => {
      const res = await fetch("/api/packages");
      if (!res.ok) return [];
      return res.json();
    }
  });
  
  const { data: appointments } = useQuery({
    queryKey: ["/api/appointments"],
    queryFn: async () => {
      const res = await fetch("/api/appointments");
      if (!res.ok) return [];
      return res.json();
    }
  });

  useEffect(() => {
    if (services) {
      setStats(prev => ({ ...prev, services: services.length }));
    }
    if (products) {
      setStats(prev => ({ ...prev, products: products.length }));
    }
    if (appointments) {
      setStats(prev => ({ ...prev, appointments: appointments.length }));
    }
  }, [services, products, appointments]);
  
  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart className="w-5 h-5" /> },
    { id: "appointments", label: "Randevular", icon: <Calendar className="w-5 h-5" /> },
    { id: "services", label: "Hizmetler", icon: <Settings className="w-5 h-5" /> },
    { id: "packages", label: "Paketler", icon: <Package className="w-5 h-5" /> },
    { id: "products", label: "Ürünler", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "blog", label: "Blog", icon: <FileText className="w-5 h-5" /> },
    { id: "gallery", label: "Galeri", icon: <Image className="w-5 h-5" /> },
    { id: "reviews", label: "Yorumlar", icon: <Star className="w-5 h-5" /> },
    { id: "faqs", label: "SSS", icon: <HelpCircle className="w-5 h-5" /> },
    { id: "aftercare", label: "Bakım Rehberleri", icon: <BookOpen className="w-5 h-5" /> },
    { id: "messages", label: "Mesajlar", icon: <MessageCircle className="w-5 h-5" /> },
    { id: "users", label: "Kullanıcılar", icon: <Users className="w-5 h-5" /> },
    { id: "seo", label: "SEO Ayarları", icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobil Menü Toggle */}
      <div className="lg:hidden fixed z-20 top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <img src="/images/logo.png" alt="MyHair Clinic" className="h-8 ml-2" />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Yeni bir bildirim bulunmamaktadır.</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobil Sidebar */}
      <div className={`lg:hidden fixed z-10 inset-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out`}>
        <div className="bg-white w-64 min-h-screen pt-16 shadow-lg">
          <div className="px-4 py-6">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center p-3 text-base font-medium rounded-lg ${
                      activeSection === item.id 
                        ? "bg-primary text-white" 
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </button>
                </li>
              ))}
              
              <li>
                <button
                  onClick={() => {
                    setLocation("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-base font-medium rounded-lg text-gray-800 hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="ml-3">Site'ye Dön</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center p-3 text-base font-medium rounded-lg text-gray-800 hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="ml-3">Çıkış Yap</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0 bg-black" onClick={() => setIsMobileMenuOpen(false)}></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center p-6">
          <img src="/images/logo.png" alt="MyHair Clinic" className="h-12" />
        </div>
        
        <div className="px-4 py-6 flex-grow overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-3 text-base font-medium rounded-lg ${
                    activeSection === item.id 
                      ? "bg-primary text-white" 
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t">
          <button 
            onClick={() => setLocation("/")}
            className="w-full flex items-center p-3 text-base font-medium rounded-lg text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-3">Site'ye Dön</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-3 mt-2 text-base font-medium rounded-lg text-gray-800 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white shadow-sm p-4">
          <div className="flex-1 flex items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm focus:outline-none">
                  <span className="hidden md:block mr-1 font-medium">Dil</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Türkçe</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Русский</DropdownMenuItem>
                <DropdownMenuItem>ქართული</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm focus:outline-none">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hesap</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Ayarlar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 bg-gray-50 p-4 md:p-6">
          {activeSection === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                      <Calendar className="w-7 h-7 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-semibold text-gray-500">Toplam Randevu</h2>
                      <p className="text-2xl font-bold text-gray-900">{stats.appointments}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                      <Package className="w-7 h-7 text-red-500" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-semibold text-gray-500">Toplam Paket</h2>
                      <p className="text-2xl font-bold text-gray-900">{packages?.length || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                      <Settings className="w-7 h-7 text-green-500" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-semibold text-gray-500">Toplam Hizmet</h2>
                      <p className="text-2xl font-bold text-gray-900">{stats.services}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                      <ShoppingBag className="w-7 h-7 text-purple-500" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-semibold text-gray-500">Toplam Ürün</h2>
                      <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* İstatistik grafikleri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <VisitorsChart data={[]} />
                <AppointmentsChart data={[]} />
                <CountryDistributionChart data={[]} />
                <ServiceDistributionChart data={[]} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Son Randevular</h2>
                    <button 
                      onClick={() => setActiveSection("appointments")}
                      className="text-primary text-sm font-medium hover:underline flex items-center"
                    >
                      Tümünü Görüntüle
                      <ChevronDown className="ml-1 w-4 h-4 rotate-270" />
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments && appointments.length > 0 ? (
                          appointments.slice(0, 5).map((appointment, index) => (
                            <tr key={appointment.id || index}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                                <div className="text-xs text-gray-500">{appointment.email}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {services?.find(s => s.id === appointment.serviceId)?.titleTR || `Hizmet #${appointment.serviceId}`}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Date(appointment.createdAt).toLocaleDateString()}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                  appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
                                  appointment.status === "cancelled" ? "bg-red-100 text-red-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {appointment.status === "pending" ? "Bekliyor" : 
                                   appointment.status === "confirmed" ? "Onaylandı" : 
                                   appointment.status === "cancelled" ? "İptal Edildi" : 
                                   appointment.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-4 py-3 text-center text-sm text-gray-500">
                              Henüz randevu bulunmamaktadır.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">Yeni randevu oluşturuldu</p>
                        <p className="text-xs text-gray-500">Bugün, 09:45</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">Yeni blog yazısı eklendi</p>
                        <p className="text-xs text-gray-500">Dün, 14:30</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full">
                        <ShoppingBag className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">Yeni ürün eklendi</p>
                        <p className="text-xs text-gray-500">2 gün önce, 11:20</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">Yeni yorum onaylandı</p>
                        <p className="text-xs text-gray-500">3 gün önce, 16:45</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                        <MessageCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">Yeni mesaj alındı</p>
                        <p className="text-xs text-gray-500">4 gün önce, 09:15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "appointments" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Randevu Yönetimi</h1>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Randevu ara..." 
                      className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <select className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                      <option value="">Tüm Durumlar</option>
                      <option value="pending">Bekleyen</option>
                      <option value="confirmed">Onaylanmış</option>
                      <option value="cancelled">İptal Edilmiş</option>
                    </select>
                    
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Yeni Randevu
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments && appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                          <tr key={appointment.id || index}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{appointment.email}</div>
                              <div className="text-xs text-gray-500">{appointment.phone}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">Hizmet #{appointment.serviceId}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{new Date(appointment.createdAt).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-500">{appointment.preferredDate || "Belirtilmemiş"}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
                                appointment.status === "cancelled" ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {appointment.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-500 hover:text-blue-700">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                </button>
                                <button className="p-1 text-green-500 hover:text-green-700">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                <button className="p-1 text-red-500 hover:text-red-700">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-3 text-center text-sm text-gray-500">
                            Henüz randevu bulunmamaktadır.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Toplam {appointments?.length || 0} randevu
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Önceki</button>
                    <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">1</button>
                    <button className="px-3 py-1 border rounded-md text-sm">Sonraki</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "services" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h1>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Hizmet Ekle
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Hizmet ara..." 
                      className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                      <option value="all">Tüm Hizmetler</option>
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                    <div className="flex border rounded-lg overflow-hidden">
                      <button className="p-2 bg-white text-gray-700 hover:bg-gray-50">
                        <LayoutGrid className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-primary text-white">
                        <LayoutList className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {services && services.length > 0 ? (
                          services.map((service, index) => (
                            <tr key={service.id || index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                    <img src={service.imageUrl} alt={service.titleTR} className="h-10 w-10 object-cover" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{service.titleTR}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-xs">
                                      {service.descriptionTR.substring(0, 60)}...
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{service.slug}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Date(service.createdAt).toLocaleDateString()}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  service.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}>
                                  {service.isActive ? "Aktif" : "Pasif"}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <button className="p-1 text-blue-500 hover:text-blue-700" title="Düzenle">
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button className="p-1 text-gray-500 hover:text-gray-700" title="Görüntüle">
                                    <Eye className="w-5 h-5" />
                                  </button>
                                  <button className="p-1 text-red-500 hover:text-red-700" title="Sil">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                              Henüz hizmet bulunmamaktadır.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Toplam {services?.length || 0} hizmet
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Önceki</button>
                    <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">1</button>
                    <button className="px-3 py-1 border rounded-md text-sm">Sonraki</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "packages" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Paket Yönetimi</h1>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Paket Ekle
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Paket ara..." 
                      className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                      <option value="all">Tüm Paketler</option>
                      <option value="TR">Türkiye</option>
                      <option value="RU">Rusya</option>
                      <option value="AZ">Azerbaycan</option>
                      <option value="KZ">Kazakistan</option>
                      <option value="IR">İran</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages && packages.length > 0 ? (
                      packages.map((packageItem, index) => (
                        <div key={packageItem.id || index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative h-48 bg-gray-200">
                            {packageItem.imageUrl && (
                              <img 
                                src={packageItem.imageUrl} 
                                alt={packageItem.titleTR} 
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute top-2 right-2 flex gap-1">
                              <button className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100" title="Düzenle">
                                <Edit className="w-4 h-4 text-blue-500" />
                              </button>
                              <button className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100" title="Sil">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                                {packageItem.countryCode || "Genel"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-semibold text-lg truncate">{packageItem.titleTR}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{packageItem.descriptionTR}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                packageItem.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {packageItem.isActive ? "Aktif" : "Pasif"}
                              </span>
                              
                              <button className="text-primary hover:text-blue-700 text-sm font-medium">
                                Detaylar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        Henüz paket bulunmamaktadır.
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Toplam {packages?.length || 0} paket
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Önceki</button>
                    <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">1</button>
                    <button className="px-3 py-1 border rounded-md text-sm">Sonraki</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "blog" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Blog Yazısı
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Blog yazısı ara..." 
                      className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                      <option value="all">Tüm Kategoriler</option>
                      <option value="hair-transplant">Saç Ekimi</option>
                      <option value="beard-transplant">Sakal Ekimi</option>
                      <option value="aftercare">Bakım Tavsiyeleri</option>
                      <option value="testimonials">Hasta Yorumları</option>
                    </select>
                    <select className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                      <option value="all">Tüm Diller</option>
                      <option value="TR">Türkçe</option>
                      <option value="EN">İngilizce</option>
                      <option value="RU">Rusça</option>
                      <option value="KA">Gürcüce</option>
                    </select>
                    <select className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                      <option value="newest">En Yeni</option>
                      <option value="oldest">En Eski</option>
                      <option value="popular">En Popüler</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Yazısı</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Özet</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Blog post rows */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                <img src="/images/blog/blog-post-1.jpg" alt="Blog Title" className="h-10 w-10 object-cover" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Başarılı Saç Ekimi için İpuçları</div>
                                <div className="text-xs text-gray-500">blog-post-tips</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Saç Ekimi
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 truncate max-w-xs">
                              Saç ekimi öncesi ve sonrası dikkat edilmesi gerekenler...
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">10.04.2025</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Yayında
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-500 hover:text-blue-700" title="Düzenle">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="p-1 text-gray-500 hover:text-gray-700" title="Görüntüle">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="p-1 text-red-500 hover:text-red-700" title="Sil">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                                <img src="/images/blog/blog-post-2.jpg" alt="Blog Title" className="h-10 w-10 object-cover" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">DHI vs FUE: Hangisi Daha İyi?</div>
                                <div className="text-xs text-gray-500">dhi-vs-fue</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Saç Ekimi
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 truncate max-w-xs">
                              İki popüler saç ekimi tekniği arasındaki farklar...
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">05.04.2025</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Yayında
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-500 hover:text-blue-700" title="Düzenle">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="p-1 text-gray-500 hover:text-gray-700" title="Görüntüle">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="p-1 text-red-500 hover:text-red-700" title="Sil">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Toplam 2 blog yazısı
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Önceki</button>
                    <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">1</button>
                    <button className="px-3 py-1 border rounded-md text-sm">Sonraki</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "users" && (
            <div>
              <AdminRoleManagement activeTab="users" />
            </div>
          )}
          
          {activeSection !== "dashboard" && activeSection !== "appointments" && activeSection !== "services" && activeSection !== "packages" && activeSection !== "blog" && activeSection !== "users" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{sidebarItems.find(item => item.id === activeSection)?.label || "İçerik"} Yönetimi</h1>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Bu modül geliştirme aşamasında</h3>
                  <p className="mt-2 text-gray-500">
                    {sidebarItems.find(item => item.id === activeSection)?.label || "Bu bölüm"} yönetimi yakında kullanıma sunulacaktır.
                  </p>
                  <button
                    className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Bildirim Gönder
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;