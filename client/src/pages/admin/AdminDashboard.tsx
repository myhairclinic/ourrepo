import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Settings, Users, Package, MessageCircle, Calendar, FileText, Image, Star, HelpCircle, BookOpen, Package2, BarChart, ArrowLeft, LogOut, ShoppingBag, Heart, Globe, Search, ChevronDown, Bell, User, Menu, X, PlusCircle, Trash2, Edit, Download, Upload, Eye, HardDrive, List, LayoutGrid, LayoutList, Shield, Send, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, Pencil, Activity, Layers, Plus, Edit2, Mail, Phone, Check, AlertCircle, Info, UserPlus, Sliders } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  VisitorsChart, 
  AppointmentsChart, 
  CountryDistributionChart, 
  ServiceDistributionChart 
} from "@/components/admin/DashboardCharts";
import AdminRoleManagement from "@/components/admin/AdminRoleManagement";
import GalleryManagement from "@/components/admin/GalleryManagement";
import ReviewsManagement from "@/components/admin/ReviewsManagement";
import FaqManagement from "@/components/admin/FaqManagement";
import AftercareManagement from "@/components/admin/AftercareManagement";
import SeoManagement from "@/components/admin/SeoManagement";
import MessageManagement from "@/components/admin/MessageManagement";
import TelegramBotManagement from "@/components/admin/TelegramBotManagement";
import PatientManagement from "@/components/admin/PatientManagement";
import ProductManagement from "@/components/admin/ProductManagement";
import BlogManagement from "@/components/admin/BlogManagement";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Formun doğrulama şeması
const appointmentFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: "İsim en az 3 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  phone: z.string().min(6, { message: "Geçerli bir telefon numarası giriniz." }),
  serviceId: z.string({ required_error: "Lütfen bir hizmet seçiniz." }),
  preferredDate: z.string().optional(),
  appointmentTime: z.string().optional(),
  notificationSent: z.boolean().optional(),
  notificationScheduled: z.boolean().optional(),
  message: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).default("pending"),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const AdminDashboard = () => {
  const { user, logout, isLoading } = useAdmin();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isTimeSelectionDialogOpen, setIsTimeSelectionDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState("");
  const [stats, setStats] = useState({
    appointments: 0,
    products: 0,
    services: 0,
    users: 0
  });
  
  // Randevu form tanımlaması
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredDate: "",
      status: "pending",
      appointmentTime: "",
      notificationSent: false,
      notificationScheduled: false,
    }
  });
  
  // Randevu oluşturma/güncelleme mutation'u
  const createAppointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      // Eğer id varsa güncelleme, yoksa oluşturma işlemi
      const isUpdate = !!data.id;
      
      const url = isUpdate ? `/api/appointments/${data.id}` : "/api/appointments";
      const method = isUpdate ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error(isUpdate 
          ? "Randevu güncellenirken bir hata meydana geldi" 
          : "Randevu oluşturulurken bir hata meydana geldi"
        );
      }
      
      return res.json();
    },
    onSuccess: (_, variables) => {
      // Modal'ı kapat
      setIsAppointmentDialogOpen(false);
      
      // Form'u sıfırla
      form.reset();
      
      // Randevular listesini yenile
      refetchAppointments();
      
      // Başarı mesajı göster
      toast({
        title: "Başarılı",
        description: variables.id 
          ? "Randevu başarıyla güncellendi" 
          : "Randevu başarıyla oluşturuldu",
        variant: "default",
      });
    },
    onError: (error, variables) => {
      console.error(variables.id ? "Randevu güncelleme hatası:" : "Randevu oluşturma hatası:", error);
      
      // Hata mesajı göster
      toast({
        title: "Hata",
        description: variables.id 
          ? "Randevu güncellenirken bir hata meydana geldi. Lütfen tekrar deneyin." 
          : "Randevu oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  });
  
  // Randevu oluşturma formu gönderildiğinde çalışacak fonksiyon
  const onSubmit = (data: AppointmentFormValues) => {
    createAppointmentMutation.mutate(data);
  };
  
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
  
  // Appointment state management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { data: appointments, isLoading: isAppointmentsLoading, refetch: refetchAppointments } = useQuery({
    queryKey: ["/api/appointments"],
    queryFn: async () => {
      const res = await fetch("/api/appointments");
      if (!res.ok) return [];
      return res.json();
    }
  });
  
  // Randevu durum güncelleme fonksiyonu
  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!res.ok) {
        throw new Error(`Randevu durumu güncellenirken bir hata oluştu: ${res.statusText}`);
      }
      
      // Randevular listesini yenile
      refetchAppointments();
      
      // Başarı mesajı göster
      toast({
        title: "Başarılı",
        description: `Randevu durumu "${status === 'confirmed' ? 'onaylandı' : status === 'cancelled' ? 'iptal edildi' : status}" olarak güncellendi.`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Randevu durumu güncelleme hatası:', error);
      
      // Hata mesajı göster
      toast({
        title: "Hata",
        description: `Randevu durumu güncellenirken bir hata oluştu. Lütfen tekrar deneyin.`,
        variant: "destructive",
      });
    }
  };
  
  // Saat seçimiyle birlikte randevu onaylama fonksiyonu
  const confirmAppointmentWithTime = async (id: number, appointmentTime: string) => {
    try {
      // Randevu saatini ve durumunu güncelleyen API isteği
      const res = await fetch(`/api/appointments/${id}/confirm`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          appointmentTime,
          status: "confirmed",
          notificationScheduled: true,
        }),
      });
      
      if (!res.ok) {
        throw new Error(`Randevu onaylanırken bir hata oluştu: ${res.statusText}`);
      }
      
      // Telegram bildirimi gönder
      await sendTelegramNotification(id);
      
      // Modalı kapat ve state'i temizle
      setIsTimeSelectionDialogOpen(false);
      setSelectedAppointment(null);
      setSelectedAppointmentTime("");
      
      // Randevular listesini yenile
      refetchAppointments();
      
      // Başarı mesajı göster
      toast({
        title: "Randevu Onaylandı",
        description: `Randevu saat ${appointmentTime} olarak onaylandı ve bildirim gönderildi. Randevudan 1 saat önce otomatik hatırlatma yapılacak.`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Randevu onaylama hatası:', error);
      
      // Hata mesajı göster
      toast({
        title: "Hata",
        description: `Randevu onaylanırken bir hata oluştu. Lütfen tekrar deneyin.`,
        variant: "destructive",
      });
    }
  };
  
  // Telegram bildirimi gönderme fonksiyonu
  const sendTelegramNotification = async (appointmentId: number) => {
    try {
      const res = await fetch(`/api/telegram/send-notification/${appointmentId}`, {
        method: 'POST'
      });
      
      if (!res.ok) {
        throw new Error(`Bildirim gönderilirken bir hata oluştu: ${res.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error('Telegram bildirimi gönderme hatası:', error);
      throw error;
    }
  };
  
  // Filtered appointments
  const filteredAppointments = appointments ? appointments.filter((appointment: any) => {
    const matchesSearch = !searchTerm || 
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.phone && appointment.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    const matchesService = !serviceFilter || appointment.serviceId.toString() === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  }) : [];
  
  // Pagination logic
  const totalPages = Math.ceil((filteredAppointments?.length || 0) / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    { id: "patients", label: "Hastalar", icon: <UserPlus className="w-5 h-5" /> },
    { id: "services", label: "Hizmetler", icon: <Settings className="w-5 h-5" /> },
    { id: "packages", label: "Paketler", icon: <Package className="w-5 h-5" /> },
    { id: "products", label: "Ürünler", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "blog", label: "Blog", icon: <FileText className="w-5 h-5" /> },
    { id: "gallery", label: "Galeri", icon: <Image className="w-5 h-5" /> },
    { id: "reviews", label: "Yorumlar", icon: <Star className="w-5 h-5" /> },
    { id: "faqs", label: "SSS", icon: <HelpCircle className="w-5 h-5" /> },
    { id: "aftercare", label: "Bakım Rehberleri", icon: <BookOpen className="w-5 h-5" /> },
    { id: "messages", label: "Mesajlar", icon: <MessageCircle className="w-5 h-5" /> },
    { id: "telegram", label: "Telegram Bot", icon: <Send className="w-5 h-5" /> },
    { id: "settings", label: "Ayarlar", icon: <Sliders className="w-5 h-5" /> },
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
              {sidebarItems.map((item: any) => (
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
            {sidebarItems.map((item: any) => (
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
        <header className="hidden lg:flex bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex-1 flex items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Ara..." 
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="ml-4 flex items-center text-sm text-gray-600">
              <span className="hidden xl:block">
                <span className="font-medium">Hoş geldiniz,</span> bugün {new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'})}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm focus:outline-none hover:text-primary transition-colors">
                  <span className="hidden md:block mr-1 font-medium">Dil</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">Türkçe</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Русский</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">ქართული</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none relative p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">3</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Bildirimler</span>
                  <span className="text-xs text-primary cursor-pointer hover:underline">Tümünü Okundu İşaretle</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                  <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50">
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-start w-full">
                        <span className="font-medium text-sm">Yeni randevu talebi</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Yeni</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">Anıl Sezkin - Sakal Ekimi</span>
                      <span className="text-xs text-gray-500 mt-0.5">5 dakika önce</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50">
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-start w-full">
                        <span className="font-medium text-sm">Yeni mesaj</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Yeni</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">Bir ziyaretçi bilgi talep ediyor</span>
                      <span className="text-xs text-gray-500 mt-0.5">2 saat önce</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50">
                    <div className="flex flex-col w-full">
                      <span className="font-medium text-sm">Randevu hatırlatıcı</span>
                      <span className="text-xs text-gray-500 mt-1">Yarın 3 randevunuz bulunmaktadır</span>
                      <span className="text-xs text-gray-500 mt-0.5">1 gün önce</span>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary cursor-pointer font-medium">
                  Tüm bildirimleri görüntüle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.role || "Yönetici"}</div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col items-center justify-center pt-4 pb-2">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-center">{user.username}</span>
                  <span className="text-xs text-gray-500">{user.role || "Yönetici"}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Ayarlar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <select 
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="month"
                  >
                    <option value="today">Bugün</option>
                    <option value="week">Bu Hafta</option>
                    <option value="month">Bu Ay</option>
                    <option value="year">Bu Yıl</option>
                  </select>
                  <button className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg p-1.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.023 11.5C16.5158 11.5 16.9883 11.3836 17.399 11.1652C17.8097 10.9467 18.143 10.6349 18.3602 10.2568C18.5775 9.87859 18.6702 9.44967 18.6283 9.02358C18.5864 8.59749 18.4115 8.19428 18.1246 7.8636C17.8377 7.53291 17.4505 7.27558 17.0122 7.12413C16.5739 6.97268 16.1025 6.9331 15.6451 7.01107C15.1876 7.08905 14.7625 7.28118 14.4186 7.56975C14.0747 7.85832 13.8267 8.23078 13.7002 8.645" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.5 15.5C19.8094 16.049 19.9602 16.6675 19.9371 17.2923C19.914 17.9172 19.7183 18.5225 19.3703 19.0465C19.0224 19.5705 18.5356 19.9934 17.9584 20.2668C17.3813 20.5402 16.7374 20.6527 16.0917 20.5922C15.446 20.5317 14.8310 20.3007 14.3079 19.9241C13.7848 19.5475 13.3744 19.0401 13.1188 18.456C12.8632 17.8719 12.7719 17.2319 12.8546 16.6021C12.9373 15.9723 13.1915 15.3753 13.5879 14.879" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7.5C11.5875 7.1906 11.0942 6.99729 10.5794 6.94621C10.0645 6.89513 9.54392 6.98772 9.08033 7.21383C8.61673 7.43994 8.22867 7.78853 7.95738 8.22119C7.68609 8.65385 7.54033 9.15399 7.53635 9.66556C7.53237 10.1771 7.67031 10.6794 7.93376 11.1161C8.1972 11.5528 8.57898 11.9076 9.03839 12.1413" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5 16.5C7.94106 16.8094 7.49223 17.2929 7.2167 17.877C6.94117 18.4611 6.85035 19.1162 6.9578 19.7516C7.06525 20.387 7.36338 20.9733 7.81143 21.4276C8.25948 21.8818 8.83345 22.1824 9.46111 22.2898C10.0888 22.3972 10.736 22.3054 11.313 22.0276C11.8899 21.7498 12.3674 21.2987 12.675 20.736" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.5 9.5C9.5 11.5 11.5 11.5 11.5 11.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.5 14.5C14.5 12.5 12.5 12.5 12.5 12.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.5 14.5C9.5 12.5 11.5 12.5 11.5 12.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.5 9.5C14.5 11.5 12.5 11.5 12.5 11.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="flex items-center gap-1 text-sm font-medium text-primary px-3 py-1.5 border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Rapor Oluştur
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100%] transform transition-transform duration-500 group-hover:scale-125 origin-top-right"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg shadow-sm bg-gradient-to-r from-blue-500 to-blue-600">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-semibold text-gray-500 mb-1">Toplam Randevu</h2>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-gray-900">{stats.appointments}</p>
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full flex items-center">
                          <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          10%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Son 30 gün</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100%] transform transition-transform duration-500 group-hover:scale-125 origin-top-right"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg shadow-sm bg-gradient-to-r from-red-500 to-red-600">
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-semibold text-gray-500 mb-1">Toplam Paket</h2>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-gray-900">{packages?.length || 0}</p>
                        <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded-full flex items-center">
                          <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          2%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Son 30 gün</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-bl-full transform transition-transform duration-300 group-hover:scale-125"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg shadow-sm">
                      <Settings className="w-7 h-7 text-green-500" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-semibold text-gray-500 mb-1">Toplam Hizmet</h2>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-gray-900">{stats.services}</p>
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full flex items-center">
                          <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          5%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Son 30 gün</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full transform transition-transform duration-300 group-hover:scale-125"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg shadow-sm">
                      <ShoppingBag className="w-7 h-7 text-purple-500" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-semibold text-gray-500 mb-1">Toplam Ürün</h2>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded-full flex items-center">
                          <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          0%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Son 30 gün</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* İstatistik grafikleri */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                <VisitorsChart data={[]} />
                <AppointmentsChart data={[]} />
                <CountryDistributionChart data={[]} />
                <ServiceDistributionChart data={[]} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg mr-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-800 text-lg">Son Randevular</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Son 5 randevu</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveSection("appointments")}
                      className="text-primary text-sm font-medium hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-lg flex items-center"
                    >
                      Tümünü Görüntüle
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                          <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                          <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                          <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments && appointments.length > 0 ? (
                          appointments.slice(0, 5).map((appointment: any, index: number) => (
                            <tr key={appointment.id || index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
                                    {appointment.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                                    <div className="text-xs text-gray-500">{appointment.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {services?.find((s: any) => s.id === appointment.serviceId)?.titleTR || `Hizmet #${appointment.serviceId}`}
                                </div>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Date(appointment.createdAt).toLocaleDateString()}</div>
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
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
                            <td colSpan={4} className="px-4 py-3.5 text-center text-sm text-gray-500">
                              Henüz randevu bulunmamaktadır.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg mr-3">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800 text-lg">Son Aktiviteler</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Son 7 gün</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Yeni randevu oluşturuldu</p>
                          <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-medium">Yeni</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Bugün, 09:45</p>
                        <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">Anıl Sezkin tarafından Sakal Ekimi hizmeti için randevu oluşturuldu.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Yeni blog yazısı eklendi</p>
                        <p className="text-xs text-gray-500 mt-1">Dün, 14:30</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-purple-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Yeni ürün eklendi</p>
                        <p className="text-xs text-gray-500 mt-1">2 gün önce, 11:20</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Yeni yorum onaylandı</p>
                        <p className="text-xs text-gray-500 mt-1">3 gün önce, 16:45</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-red-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Yeni mesaj alındı</p>
                        <p className="text-xs text-gray-500 mt-1">4 gün önce, 09:15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "appointments" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Randevu Yönetimi</h1>
                <div className="flex items-center space-x-3">
                  <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Son 24 saat: 3 yeni
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                    Bu hafta: 12 randevu
                  </span>
                  <Button 
                    onClick={() => setIsAppointmentDialogOpen(true)}
                    className="flex items-center space-x-1 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Randevu</span>
                  </Button>
                </div>
              </div>
              
              {/* Randevu Oluşturma Modal'ı */}
              <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{form.getValues("id") ? "Randevu Düzenle" : "Yeni Randevu Oluştur"}</DialogTitle>
                    <DialogDescription>
                      {form.getValues("id") 
                        ? "Randevu bilgilerini düzenlemek için aşağıdaki formu kullanın."
                        : "Yeni bir randevu oluşturmak için aşağıdaki formu doldurun."
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>İsim Soyisim</FormLabel>
                            <FormControl>
                              <Input placeholder="Hasta adı soyadı" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-posta</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="E-posta adresi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="Telefon numarası" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="serviceId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hizmet</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Hizmet seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services?.map((service: any) => (
                                  <SelectItem key={service.id} value={service.id.toString()}>
                                    {service.titleTR}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tercih Edilen Tarih</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mesaj</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Ek notlar..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durum</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Durum seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pending">Beklemede</SelectItem>
                                <SelectItem value="confirmed">Onaylandı</SelectItem>
                                <SelectItem value="cancelled">İptal Edildi</SelectItem>
                                <SelectItem value="completed">Tamamlandı</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter className="mt-6 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          type="button" 
                          onClick={() => setIsAppointmentDialogOpen(false)}
                        >
                          İptal
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={createAppointmentMutation.isPending}
                        >
                          {createAppointmentMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {form.getValues("id") ? "Güncelleniyor..." : "Oluşturuluyor..."}
                            </>
                          ) : (
                            form.getValues("id") ? "Randevu Güncelle" : "Randevu Oluştur"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              
              {/* Randevu saat seçim modalı */}
              <Dialog open={isTimeSelectionDialogOpen} onOpenChange={setIsTimeSelectionDialogOpen}>
                <DialogContent className="sm:max-w-[450px]">
                  <DialogHeader>
                    <DialogTitle>Randevu Saati Seçimi</DialogTitle>
                    <DialogDescription>
                      {selectedAppointment ? `${selectedAppointment.name} için randevu saati seçin` : "Randevu saati seçin"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2 text-gray-700">Tarih</h3>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">
                          {selectedAppointment?.preferredDate 
                            ? new Date(selectedAppointment.preferredDate).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                weekday: 'long'
                              })
                            : "Tarih seçilmedi"
                          }
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-3 text-gray-700">Saati Seçin</h3>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
                        "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"].map((time) => (
                        <button 
                          key={time}
                          onClick={() => setSelectedAppointmentTime(time)}
                          className={`py-2 px-1 text-center rounded-md text-sm border transition-colors ${
                            selectedAppointmentTime === time 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex flex-col space-y-3">
                      <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Önemli: Telegram Bildirimleri Hakkında</p>
                          <p className="mt-1">Telegram bildirimleri alabilmek için, operatörlerin Telegram'da <strong>@MyHairClinicBot</strong> botunu bulup <strong>/start</strong> komutu göndermeleri gerekiyor. Aksi halde bildirimler iletilemez.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-amber-600">
                        <AlertCircle className="h-4 w-4" />
                        <p>Randevu onaylandıktan sonra hasta ve personelinize Telegram üzerinden bildirim gönderilecektir.</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Info className="h-4 w-4" />
                        <p>Randevudan 1 saat önce hatırlatma otomatik olarak gönderilecektir.</p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsTimeSelectionDialogOpen(false);
                        setSelectedAppointment(null);
                        setSelectedAppointmentTime("");
                      }}
                    >
                      İptal
                    </Button>
                    <Button 
                      onClick={() => {
                        if (selectedAppointment && selectedAppointmentTime) {
                          // Randevuyu onayla ve saat bilgisini güncelle
                          confirmAppointmentWithTime(selectedAppointment.id, selectedAppointmentTime);
                        } else {
                          toast({
                            title: "Hata",
                            description: "Lütfen bir saat seçin",
                            variant: "destructive",
                          });
                        }
                      }}
                      disabled={!selectedAppointmentTime}
                    >
                      Randevuyu Onayla
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-[100%] transform transition-transform duration-500 group-hover:scale-125 origin-top-right"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg shadow-sm bg-gradient-to-r from-blue-500 to-blue-600">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-medium text-gray-500">Bekleyen Randevular</h2>
                      <p className="text-2xl font-bold text-gray-900">{appointments?.filter((a: any) => a.status === "pending").length || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-[100%] transform transition-transform duration-500 group-hover:scale-125 origin-top-right"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg shadow-sm bg-gradient-to-r from-green-500 to-green-600">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-medium text-gray-500">Onaylanmış Randevular</h2>
                      <p className="text-2xl font-bold text-gray-900">{appointments?.filter((a: any) => a.status === "confirmed").length || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-[100%] transform transition-transform duration-500 group-hover:scale-125 origin-top-right"></div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg shadow-sm bg-gradient-to-r from-red-500 to-red-600">
                      <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 z-10">
                      <h2 className="text-sm font-medium text-gray-500">İptal Edilen Randevular</h2>
                      <p className="text-2xl font-bold text-gray-900">{appointments?.filter((a: any) => a.status === "cancelled").length || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Randevu ara..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm"
                      />
                    </div>
                    
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm bg-white"
                    >
                      <option value="">Tüm Durumlar</option>
                      <option value="pending">Bekleyen</option>
                      <option value="confirmed">Onaylanmış</option>
                      <option value="cancelled">İptal Edilmiş</option>
                    </select>
                    
                    <select 
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                      className="p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm bg-white"
                    >
                      <option value="">Tüm Hizmetler</option>
                      {services?.map((service: any) => (
                        <option key={service.id} value={service.id.toString()}>{service.titleTR}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={() => setIsAppointmentDialogOpen(true)}
                    className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Randevu
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedAppointments && paginatedAppointments.length > 0 ? (
                        paginatedAppointments.map((appointment: any, index: number) => (
                          <tr key={appointment.id || index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-600 font-medium">{appointment.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                                  <div className="text-xs text-gray-500">{new Date(appointment.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="text-sm text-gray-900 flex items-center">
                                  <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                  {appointment.email}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                  <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                                  {appointment.phone || "Belirtilmemiş"}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {services?.find((s: any) => s.id === appointment.serviceId)?.titleTR || `Hizmet #${appointment.serviceId}`}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{appointment.preferredDate || "Belirtilmemiş"}</div>
                              {appointment.preferredDate && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {(() => {
                                    const daysLeft = Math.floor((new Date(appointment.preferredDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                    return daysLeft > 0 ? `${daysLeft} gün sonra` : daysLeft === 0 ? "Bugün" : "Geçmiş";
                                  })()}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center w-fit ${
                                appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
                                appointment.status === "cancelled" ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  appointment.status === "pending" ? "bg-yellow-500" : 
                                  appointment.status === "confirmed" ? "bg-green-500" :
                                  appointment.status === "cancelled" ? "bg-red-500" :
                                  "bg-gray-500"
                                }`}></span>
                                {appointment.status === "pending" ? "Bekliyor" : 
                                appointment.status === "confirmed" ? "Onaylandı" : 
                                appointment.status === "cancelled" ? "İptal Edildi" : 
                                appointment.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => {
                                    // Form'u randevu verileriyle doldurup modal'ı aç
                                    form.reset({
                                      id: appointment.id,
                                      name: appointment.name,
                                      email: appointment.email,
                                      phone: appointment.phone,
                                      serviceId: String(appointment.serviceId),
                                      preferredDate: appointment.preferredDate || "",
                                      message: appointment.message || "",
                                      status: appointment.status
                                    });
                                    setIsAppointmentDialogOpen(true);
                                  }}
                                  className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 tooltip" 
                                  title="Düzenle"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    // Randevu onaylamak için saat seçim modalını açıyoruz
                                    setSelectedAppointment(appointment);
                                    setIsTimeSelectionDialogOpen(true);
                                  }}
                                  disabled={appointment.status === "confirmed"}
                                  className={`p-1.5 ${appointment.status === "confirmed" ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer"} rounded-lg transition-colors duration-200 tooltip`} 
                                  title={appointment.status === "confirmed" ? "Zaten Onaylandı" : "Onayla"}
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    const confirmAction = window.confirm(`${appointment.name} adlı kişinin randevusunu iptal etmek istediğinizden emin misiniz?`);
                                    if (confirmAction) {
                                      updateAppointmentStatus(appointment.id, "cancelled");
                                    }
                                  }}
                                  disabled={appointment.status === "cancelled"}
                                  className={`p-1.5 ${appointment.status === "cancelled" ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"} rounded-lg transition-colors duration-200 tooltip`} 
                                  title={appointment.status === "cancelled" ? "Zaten İptal Edildi" : "İptal Et"}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={async () => {
                                    try {
                                      // Telegram bildirimi gönderme API çağrısı
                                      const res = await fetch(`/api/telegram/send-notification/${appointment.id}`, {
                                        method: 'POST'
                                      });
                                      
                                      if (!res.ok) {
                                        throw new Error(`Bildirim gönderilirken bir hata oluştu: ${res.statusText}`);
                                      }
                                      
                                      toast({
                                        title: "Bildirim Gönderildi",
                                        description: `${appointment.name} için Telegram bildirimi başarıyla gönderildi.`,
                                        variant: "default",
                                      });
                                    } catch (error) {
                                      console.error('Telegram bildirimi gönderme hatası:', error);
                                      
                                      toast({
                                        title: "Hata",
                                        description: `Telegram bildirimi gönderilirken bir hata oluştu. Lütfen tekrar deneyin.`,
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                  className="p-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200 tooltip cursor-pointer" 
                                  title="Bildirim Gönder"
                                >
                                  <Bell className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-5 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center py-6">
                              <Calendar className="w-12 h-12 text-gray-300 mb-2" />
                              <p className="text-base font-medium">Henüz randevu bulunmamaktadır.</p>
                              <p className="text-sm mt-1">Yeni bir randevu eklemek için "Yeni Randevu" butonuna tıklayın.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-600">
                    Toplam <span className="font-medium">{filteredAppointments?.length || 0}</span> randevu {(filteredAppointments?.length || 0) !== (appointments?.length || 0) && `(Toplam ${appointments?.length || 0} randevudan filtrelenmiş)`}
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="flex justify-center">
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        
                        {[...Array(totalPages)].map((_: any, i: number) => (
                          <button 
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border ${currentPage === i + 1 ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'} text-sm font-medium`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "services" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 mr-3 bg-blue-100 rounded-lg">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h1>
                    <p className="text-gray-500 mt-1 text-sm">
                      Tüm hizmetleri görüntüleyin, düzenleyin ve yenilerini ekleyin
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm hover:shadow">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Yeni Hizmet Ekle
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-md text-white flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium mb-1">Toplam Hizmet</p>
                    <h3 className="text-3xl font-bold">{services?.length || 0}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-md text-white flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium mb-1">Aktif Hizmetler</p>
                    <h3 className="text-3xl font-bold">{services?.filter((s: any) => s.isActive).length || 0}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl shadow-md text-white flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-medium mb-1">Son Güncelleme</p>
                    <h3 className="text-lg font-bold">{services?.length ? new Date(Math.max(...services.map((s: any) => new Date(s.updatedAt).getTime()))).toLocaleDateString() : "-"}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-5 border-b border-gray-100 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Hizmet ara..." 
                        className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                      />
                    </div>
                    <div className="flex items-center flex-wrap gap-3">
                      <div>
                        <select className="py-2.5 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-700">
                          <option value="all">Tüm Hizmetler</option>
                          <option value="active">Aktif</option>
                          <option value="inactive">Pasif</option>
                        </select>
                      </div>
                      <div>
                        <select className="py-2.5 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-700">
                          <option value="recent">En Yeni</option>
                          <option value="oldest">En Eski</option>
                          <option value="a-z">A-Z</option>
                          <option value="z-a">Z-A</option>
                        </select>
                      </div>
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                        <button className="p-2.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-200">
                          <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          <LayoutList className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                          <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {services && services.length > 0 ? (
                          services.map((service: any, index: number) => (
                            <tr key={service.id || index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                    <img 
                                      src={service.imageUrl} 
                                      alt={service.titleTR} 
                                      className="h-12 w-12 object-cover" 
                                      onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/60?text=No+Image';
                                      }}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-semibold text-gray-900">{service.titleTR}</div>
                                    <div className="text-xs font-medium text-indigo-600">#{service.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="text-sm text-gray-900 max-w-xs truncate">{service.descriptionTR}</div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-md w-fit">{service.slug}</div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Date(service.createdAt).toLocaleDateString()}</div>
                                <div className="text-xs text-gray-500">{new Date(service.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className={`flex items-center ${
                                  service.isActive ? "text-green-700" : "text-red-700"
                                }`}>
                                  <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
                                    service.isActive ? "bg-green-500 animate-pulse" : "bg-red-500"
                                  }`}></div>
                                  <span className="text-sm font-medium">
                                    {service.isActive ? "Aktif" : "Pasif"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <button className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors group">
                                    <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  </button>
                                  <button className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors group">
                                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  </button>
                                  <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors group">
                                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-5 py-8 text-center">
                              <div className="flex flex-col items-center">
                                <Package className="w-12 h-12 text-gray-300 mb-2" />
                                <h3 className="text-gray-500 text-lg font-medium mb-1">Henüz hizmet bulunmamaktadır</h3>
                                <p className="text-gray-400 text-sm max-w-sm">Klinik hizmetlerinizi eklemek için yukarıdaki "Yeni Hizmet Ekle" butonunu kullanabilirsiniz.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      Toplam <span className="font-semibold text-gray-800">{services?.length || 0}</span> hizmet
                    </div>
                    
                    <div className="inline-flex items-center gap-1 rounded-md">
                      <button className="px-3 py-1.5 border border-gray-200 rounded-l-lg text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1.5 bg-primary text-white border border-primary rounded-none text-sm font-medium">
                        1
                      </button>
                      <button className="px-3 py-1.5 border border-gray-200 rounded-r-lg text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
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
                      packages.map((packageItem: any, index: number) => (
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
                                {packageItem.countryOrigin || "Genel"}
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <BlogManagement />
            </div>
          )}
          
          {activeSection === "users" && (
            <div>
              <AdminRoleManagement activeTab="users" />
            </div>
          )}
          
          {activeSection === "gallery" && (
            <div>
              <GalleryManagement />
            </div>
          )}
          
          {activeSection === "reviews" && (
            <div>
              <ReviewsManagement />
            </div>
          )}
          
          {activeSection === "faqs" && (
            <div>
              <FaqManagement />
            </div>
          )}
          
          {activeSection === "aftercare" && (
            <div>
              <AftercareManagement />
            </div>
          )}
          
          {activeSection === "seo" && (
            <div>
              <SeoManagement />
            </div>
          )}
          
          {activeSection === "messages" && (
            <div>
              <MessageManagement />
            </div>
          )}
          
          {activeSection === "telegram" && (
            <div>
              <TelegramBotManagement />
            </div>
          )}
          
          {activeSection === "patients" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Hasta Yönetimi</h1>
              </div>
              <PatientManagement />
            </div>
          )}
          
          {activeSection === "products" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ProductManagement />
            </div>
          )}
          
          {activeSection !== "dashboard" && activeSection !== "appointments" && activeSection !== "services" && activeSection !== "packages" && activeSection !== "blog" && activeSection !== "users" && activeSection !== "gallery" && activeSection !== "reviews" && activeSection !== "faqs" && activeSection !== "aftercare" && activeSection !== "seo" && activeSection !== "messages" && activeSection !== "telegram" && activeSection !== "patients" && activeSection !== "products" && (
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