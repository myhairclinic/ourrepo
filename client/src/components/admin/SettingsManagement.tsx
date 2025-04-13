import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Globe,
  Mail,
  MessageSquare,
  Settings,
  Smartphone,
  MapPin,
  Phone,
  Shield,
  BellRing,
  Palette,
  Upload,
  Lock,
  FileText,
  Users,
  Contact,
  Info,
  Languages,
  Database,
  CloudCog,
  BellPlus,
  BookOpen,
  Calendar,
  Map,
  Link,
  BarChart,
  Send
} from "lucide-react";

// Şema tanımlamaları
const generalSettingsSchema = z.object({
  siteName: z.string().min(1, { message: "Site adı gereklidir" }),
  siteTagline: z.string().optional(),
  siteDescription: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  siteCurrency: z.string().optional(),
  timeZone: z.string().optional(),
  maintenanceMode: z.boolean().optional(),
  maintenanceMessage: z.string().optional(),
});

const contactSettingsSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  address: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  tiktokUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  contactFormRecipients: z.string().optional(),
});

const securitySettingsSchema = z.object({
  enableCaptcha: z.boolean().optional(),
  recaptchaSiteKey: z.string().optional(),
  recaptchaSecretKey: z.string().optional(),
  maxLoginAttempts: z.number().optional(),
  passwordExpiryDays: z.number().optional(),
  enforceStrongPasswords: z.boolean().optional(),
  enableTwoFactorAuth: z.boolean().optional(),
  sessionTimeoutMinutes: z.number().optional(),
});

const notificationSettingsSchema = z.object({
  adminEmailNotifications: z.boolean().optional(),
  newAppointmentNotification: z.boolean().optional(),
  newMessageNotification: z.boolean().optional(),
  reviewNotification: z.boolean().optional(),
  telegramNotifications: z.boolean().optional(),
  telegramAdminNotifications: z.boolean().optional(),
  appointmentReminderHours: z.number().optional(),
  emailNotificationTemplate: z.string().optional(),
});

const languageSettingsSchema = z.object({
  defaultLanguage: z.string(),
  enabledLanguages: z.array(z.string()).min(1, { message: "En az bir dil seçilmelidir" }),
  autoDetectLanguage: z.boolean().optional(),
  showLanguageSwitcher: z.boolean().optional(),
  translateUserContent: z.boolean().optional(),
});

const appointmentSettingsSchema = z.object({
  appointmentLeadTimeHours: z.number().optional(),
  appointmentCancellationTimeHours: z.number().optional(),
  workingHoursStart: z.string().optional(),
  workingHoursEnd: z.string().optional(),
  workingDays: z.array(z.string()).optional(),
  appointmentDuration: z.number().optional(),
  allowMultipleAppointments: z.boolean().optional(),
  requireApproval: z.boolean().optional(),
  enableCalendarView: z.boolean().optional(),
});

const seoSettingsSchema = z.object({
  enableSitemap: z.boolean().optional(),
  enableRobotsTxt: z.boolean().optional(),
  enableSchemaMarkup: z.boolean().optional(),
  enableOpenGraph: z.boolean().optional(),
  enableTwitterCards: z.boolean().optional(),
  enableCanonicalUrls: z.boolean().optional(),
  defaultOgImage: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  facebookPixelId: z.string().optional(),
});

const integrationsSettingsSchema = z.object({
  googleMapsApiKey: z.string().optional(),
  googleAnalyticsApiKey: z.string().optional(),
  mailchimpApiKey: z.string().optional(),
  mailchimpListId: z.string().optional(),
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  smtpHost: z.string().optional(),
  smtpPort: z.number().optional(),
  smtpUser: z.string().optional(),
  smtpPassword: z.string().optional(),
  smtpFromEmail: z.string().optional(),
  smtpFromName: z.string().optional(),
});

const contentSettingsSchema = z.object({
  homepageLayout: z.string().optional(),
  servicesPerPage: z.number().optional(),
  packagesPerPage: z.number().optional(),
  blogsPerPage: z.number().optional(),
  enableFeaturedContent: z.boolean().optional(),
  enableRelatedContent: z.boolean().optional(),
  enableComments: z.boolean().optional(),
  enableReviews: z.boolean().optional(),
  requireReviewApproval: z.boolean().optional(),
  defaultBlogImage: z.string().optional(),
  defaultServiceImage: z.string().optional(),
});

const mediaSettingsSchema = z.object({
  maxUploadSize: z.number().optional(),
  allowedFileTypes: z.array(z.string()).optional(),
  useWebP: z.boolean().optional(),
  optimizeImages: z.boolean().optional(),
  watermarkEnabled: z.boolean().optional(),
  watermarkImage: z.string().optional(),
  watermarkPosition: z.string().optional(),
  imageQuality: z.number().min(1).max(100).optional(),
  thumbnailSizes: z.string().optional(),
});

const backupSettingsSchema = z.object({
  enableAutomaticBackups: z.boolean().optional(),
  backupFrequency: z.string().optional(),
  backupStorage: z.string().optional(),
  maxBackupCount: z.number().optional(),
  includeMediaInBackup: z.boolean().optional(),
  backupNotifications: z.boolean().optional(),
});

// Ana bileşen
const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Ayarları getirme sorgusu
  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/settings"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/settings");
        if (!res.ok) throw new Error("Ayarlar alınamadı");
        return await res.json();
      } catch (error) {
        console.error("Ayarlar getirilirken hata oluştu:", error);
        // Varsayılan boş ayarlar objesi döndür
        return {
          general: {},
          contact: {},
          security: {},
          notifications: {},
          languages: {
            defaultLanguage: "tr",
            enabledLanguages: ["tr", "en", "ru", "ka"],
            autoDetectLanguage: true,
            showLanguageSwitcher: true,
            translateUserContent: false,
          },
          appointments: {},
          seo: {},
          integrations: {},
          content: {},
          media: {},
          backup: {},
        };
      }
    },
  });

  // Form tanımlamaları
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: settings?.general?.siteName || "MyHair Clinic",
      siteTagline: settings?.general?.siteTagline || "",
      siteDescription: settings?.general?.siteDescription || "",
      logo: settings?.general?.logo || "/images/logo.png",
      favicon: settings?.general?.favicon || "/favicon.ico",
      metaTitle: settings?.general?.metaTitle || "",
      metaDescription: settings?.general?.metaDescription || "",
      siteCurrency: settings?.general?.siteCurrency || "USD",
      timeZone: settings?.general?.timeZone || "UTC",
      maintenanceMode: settings?.general?.maintenanceMode || false,
      maintenanceMessage: settings?.general?.maintenanceMessage || "",
    },
  });

  const contactForm = useForm<z.infer<typeof contactSettingsSchema>>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: {
      email: settings?.contact?.email || "myhairtbilisi@gmail.com",
      phone: settings?.contact?.phone || "+995555003044",
      whatsappNumber: settings?.contact?.whatsappNumber || "",
      address: settings?.contact?.address || "Tsotne Dadiani 59 Tbilisi",
      googleMapsUrl: settings?.contact?.googleMapsUrl || "",
      facebookUrl: settings?.contact?.facebookUrl || "",
      instagramUrl: settings?.contact?.instagramUrl || "",
      tiktokUrl: settings?.contact?.tiktokUrl || "",
      youtubeUrl: settings?.contact?.youtubeUrl || "",
      contactFormRecipients: settings?.contact?.contactFormRecipients || "",
    },
  });

  const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      enableCaptcha: settings?.security?.enableCaptcha || false,
      recaptchaSiteKey: settings?.security?.recaptchaSiteKey || "",
      recaptchaSecretKey: settings?.security?.recaptchaSecretKey || "",
      maxLoginAttempts: settings?.security?.maxLoginAttempts || 5,
      passwordExpiryDays: settings?.security?.passwordExpiryDays || 90,
      enforceStrongPasswords: settings?.security?.enforceStrongPasswords || true,
      enableTwoFactorAuth: settings?.security?.enableTwoFactorAuth || false,
      sessionTimeoutMinutes: settings?.security?.sessionTimeoutMinutes || 60,
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      adminEmailNotifications: settings?.notifications?.adminEmailNotifications || true,
      newAppointmentNotification: settings?.notifications?.newAppointmentNotification || true,
      newMessageNotification: settings?.notifications?.newMessageNotification || true,
      reviewNotification: settings?.notifications?.reviewNotification || true,
      telegramNotifications: settings?.notifications?.telegramNotifications || true,
      telegramAdminNotifications: settings?.notifications?.telegramAdminNotifications || true,
      appointmentReminderHours: settings?.notifications?.appointmentReminderHours || 24,
      emailNotificationTemplate: settings?.notifications?.emailNotificationTemplate || "",
    },
  });

  const languageForm = useForm<z.infer<typeof languageSettingsSchema>>({
    resolver: zodResolver(languageSettingsSchema),
    defaultValues: {
      defaultLanguage: settings?.languages?.defaultLanguage || "tr",
      enabledLanguages: settings?.languages?.enabledLanguages || ["tr", "en", "ru", "ka"],
      autoDetectLanguage: settings?.languages?.autoDetectLanguage || true,
      showLanguageSwitcher: settings?.languages?.showLanguageSwitcher || true,
      translateUserContent: settings?.languages?.translateUserContent || false,
    },
  });

  const appointmentForm = useForm<z.infer<typeof appointmentSettingsSchema>>({
    resolver: zodResolver(appointmentSettingsSchema),
    defaultValues: {
      appointmentLeadTimeHours: settings?.appointments?.appointmentLeadTimeHours || 24,
      appointmentCancellationTimeHours: settings?.appointments?.appointmentCancellationTimeHours || 12,
      workingHoursStart: settings?.appointments?.workingHoursStart || "09:00",
      workingHoursEnd: settings?.appointments?.workingHoursEnd || "18:00",
      workingDays: settings?.appointments?.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri"],
      appointmentDuration: settings?.appointments?.appointmentDuration || 60,
      allowMultipleAppointments: settings?.appointments?.allowMultipleAppointments || false,
      requireApproval: settings?.appointments?.requireApproval || true,
      enableCalendarView: settings?.appointments?.enableCalendarView || true,
    },
  });

  const seoForm = useForm<z.infer<typeof seoSettingsSchema>>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      enableSitemap: settings?.seo?.enableSitemap || true,
      enableRobotsTxt: settings?.seo?.enableRobotsTxt || true,
      enableSchemaMarkup: settings?.seo?.enableSchemaMarkup || true,
      enableOpenGraph: settings?.seo?.enableOpenGraph || true,
      enableTwitterCards: settings?.seo?.enableTwitterCards || true,
      enableCanonicalUrls: settings?.seo?.enableCanonicalUrls || true,
      defaultOgImage: settings?.seo?.defaultOgImage || "",
      googleAnalyticsId: settings?.seo?.googleAnalyticsId || "",
      googleTagManagerId: settings?.seo?.googleTagManagerId || "",
      facebookPixelId: settings?.seo?.facebookPixelId || "",
    },
  });

  const integrationsForm = useForm<z.infer<typeof integrationsSettingsSchema>>({
    resolver: zodResolver(integrationsSettingsSchema),
    defaultValues: {
      googleMapsApiKey: settings?.integrations?.googleMapsApiKey || "",
      googleAnalyticsApiKey: settings?.integrations?.googleAnalyticsApiKey || "",
      mailchimpApiKey: settings?.integrations?.mailchimpApiKey || "",
      mailchimpListId: settings?.integrations?.mailchimpListId || "",
      telegramBotToken: settings?.integrations?.telegramBotToken || "",
      telegramChatId: settings?.integrations?.telegramChatId || "",
      smtpHost: settings?.integrations?.smtpHost || "",
      smtpPort: settings?.integrations?.smtpPort || 587,
      smtpUser: settings?.integrations?.smtpUser || "",
      smtpPassword: settings?.integrations?.smtpPassword || "",
      smtpFromEmail: settings?.integrations?.smtpFromEmail || "",
      smtpFromName: settings?.integrations?.smtpFromName || "",
    },
  });

  const contentForm = useForm<z.infer<typeof contentSettingsSchema>>({
    resolver: zodResolver(contentSettingsSchema),
    defaultValues: {
      homepageLayout: settings?.content?.homepageLayout || "default",
      servicesPerPage: settings?.content?.servicesPerPage || 12,
      packagesPerPage: settings?.content?.packagesPerPage || 9,
      blogsPerPage: settings?.content?.blogsPerPage || 10,
      enableFeaturedContent: settings?.content?.enableFeaturedContent || true,
      enableRelatedContent: settings?.content?.enableRelatedContent || true,
      enableComments: settings?.content?.enableComments || false,
      enableReviews: settings?.content?.enableReviews || true,
      requireReviewApproval: settings?.content?.requireReviewApproval || true,
      defaultBlogImage: settings?.content?.defaultBlogImage || "",
      defaultServiceImage: settings?.content?.defaultServiceImage || "",
    },
  });

  const mediaForm = useForm<z.infer<typeof mediaSettingsSchema>>({
    resolver: zodResolver(mediaSettingsSchema),
    defaultValues: {
      maxUploadSize: settings?.media?.maxUploadSize || 5,
      allowedFileTypes: settings?.media?.allowedFileTypes || ["jpg", "jpeg", "png", "gif", "webp", "pdf"],
      useWebP: settings?.media?.useWebP || true,
      optimizeImages: settings?.media?.optimizeImages || true,
      watermarkEnabled: settings?.media?.watermarkEnabled || false,
      watermarkImage: settings?.media?.watermarkImage || "",
      watermarkPosition: settings?.media?.watermarkPosition || "bottom-right",
      imageQuality: settings?.media?.imageQuality || 80,
      thumbnailSizes: settings?.media?.thumbnailSizes || "300x300,600x600,1200x1200",
    },
  });

  const backupForm = useForm<z.infer<typeof backupSettingsSchema>>({
    resolver: zodResolver(backupSettingsSchema),
    defaultValues: {
      enableAutomaticBackups: settings?.backup?.enableAutomaticBackups || true,
      backupFrequency: settings?.backup?.backupFrequency || "daily",
      backupStorage: settings?.backup?.backupStorage || "local",
      maxBackupCount: settings?.backup?.maxBackupCount || 7,
      includeMediaInBackup: settings?.backup?.includeMediaInBackup || true,
      backupNotifications: settings?.backup?.backupNotifications || true,
    },
  });

  // Ayarları kaydetme mutation'u
  const saveSettingsMutation = useMutation({
    mutationFn: async ({ section, data }: { section: string; data: any }) => {
      const res = await apiRequest("PUT", `/api/settings/${section}`, data);
      if (!res.ok) throw new Error(`${section} ayarları kaydedilemedi`);
      return await res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Ayarlar kaydedildi",
        description: `${variables.section} ayarları başarıyla güncellendi.`,
      });
    },
    onError: (error, variables) => {
      console.error(`${variables.section} ayarları kaydedilirken hata oluştu:`, error);
      toast({
        title: "Ayarlar kaydedilemedi",
        description: `${variables.section} ayarları güncellenirken bir hata oluştu.`,
        variant: "destructive",
      });
    },
  });

  // Form gönderme işleyicileri
  const onSubmitGeneral = (data: z.infer<typeof generalSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "general", data });
  };

  const onSubmitContact = (data: z.infer<typeof contactSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "contact", data });
  };

  const onSubmitSecurity = (data: z.infer<typeof securitySettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "security", data });
  };

  const onSubmitNotifications = (data: z.infer<typeof notificationSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "notifications", data });
  };

  const onSubmitLanguages = (data: z.infer<typeof languageSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "languages", data });
  };

  const onSubmitAppointments = (data: z.infer<typeof appointmentSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "appointments", data });
  };

  const onSubmitSeo = (data: z.infer<typeof seoSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "seo", data });
  };

  const onSubmitIntegrations = (data: z.infer<typeof integrationsSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "integrations", data });
  };

  const onSubmitContent = (data: z.infer<typeof contentSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "content", data });
  };

  const onSubmitMedia = (data: z.infer<typeof mediaSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "media", data });
  };

  const onSubmitBackup = (data: z.infer<typeof backupSettingsSchema>) => {
    saveSettingsMutation.mutate({ section: "backup", data });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Site Ayarları</h1>
        <Button 
          variant="outline" 
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
            toast({
              title: "Ayarlar yenilendi",
              description: "Ayarlar sunucudan tekrar yüklendi.",
            });
          }}
        >
          Yenile
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto p-1">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Genel</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-1">
            <Contact className="h-4 w-4" />
            <span className="hidden sm:inline">İletişim</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Güvenlik</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Bildirimler</span>
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center gap-1">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Dil</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Randevular</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-1">
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">Entegrasyonlar</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">İçerik</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Medya</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-1">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Yedekleme</span>
          </TabsTrigger>
        </TabsList>

        {/* Genel Ayarlar */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Genel Site Ayarları
              </CardTitle>
              <CardDescription>
                Sitenin temel bilgilerini ve genel görünüm ayarlarını düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Adı</FormLabel>
                          <FormControl>
                            <Input placeholder="MyHair Clinic" {...field} />
                          </FormControl>
                          <FormDescription>
                            Sitenin başlık çubuğunda ve meta etiketlerinde görünecek ad.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="siteTagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Sloganı</FormLabel>
                          <FormControl>
                            <Input placeholder="Saç Ekiminde Uzman Klinik" {...field} />
                          </FormControl>
                          <FormDescription>
                            Kısa bir slogan veya açıklayıcı cümle.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Açıklaması</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tiflis'te uluslararası standartlarda saç ekimi hizmetleri..." 
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Sitenin genel açıklaması, maksimum 160 karakter olmalıdır.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="/images/logo.png" {...field} />
                          </FormControl>
                          <FormDescription>
                            Site logosunun dosya yolu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="favicon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon URL</FormLabel>
                          <FormControl>
                            <Input placeholder="/favicon.ico" {...field} />
                          </FormControl>
                          <FormDescription>
                            Tarayıcı sekmesinde görünecek icon dosya yolu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="siteCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Para Birimi</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Para birimi seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD (Amerikan Doları)</SelectItem>
                              <SelectItem value="EUR">EUR (Euro)</SelectItem>
                              <SelectItem value="GEL">GEL (Gürcistan Larisi)</SelectItem>
                              <SelectItem value="TRY">TRY (Türk Lirası)</SelectItem>
                              <SelectItem value="RUB">RUB (Rus Rublesi)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Sitede fiyatlandırma için kullanılacak para birimi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="timeZone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zaman Dilimi</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Zaman dilimi seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC">UTC (Koordineli Evrensel Saat)</SelectItem>
                              <SelectItem value="Europe/Istanbul">Europe/Istanbul (GMT+3)</SelectItem>
                              <SelectItem value="Europe/Moscow">Europe/Moscow (GMT+3)</SelectItem>
                              <SelectItem value="Asia/Tbilisi">Asia/Tbilisi (GMT+4)</SelectItem>
                              <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Site genelinde kullanılacak zaman dilimi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />
                  
                  {/* Bakım Modu Ayarları */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Bakım Modu</h3>
                    
                    <FormField
                      control={generalForm.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Bakım Modu</FormLabel>
                            <FormDescription>
                              Bakım modunu etkinleştirdiğinizde, ziyaretçiler site yerine bakım mesajı görecektir.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="maintenanceMessage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bakım Mesajı</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Sitemiz şu anda bakımdadır. Kısa süre içinde tekrar hizmet vermeye başlayacağız." 
                              {...field} 
                              rows={3}
                            />
                          </FormControl>
                          <FormDescription>
                            Bakım modunda ziyaretçilere gösterilecek mesaj.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* İletişim Ayarları */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Contact className="h-5 w-5" />
                İletişim Bilgileri
              </CardTitle>
              <CardDescription>
                Klinik iletişim bilgileri ve sosyal medya hesaplarını yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta Adresi</FormLabel>
                          <FormControl>
                            <Input placeholder="info@myhairclinic.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            İletişim formundan gelen mesajların gönderileceği adres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon Numarası</FormLabel>
                          <FormControl>
                            <Input placeholder="+995 555 003044" {...field} />
                          </FormControl>
                          <FormDescription>
                            Müşteri iletişim telefonu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="whatsappNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Numarası</FormLabel>
                          <FormControl>
                            <Input placeholder="+995 555 003044" {...field} />
                          </FormControl>
                          <FormDescription>
                            WhatsApp mesajlaşması için kullanılacak numara.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adres</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tsotne Dadiani 59, Tbilisi, Georgia" 
                              {...field} 
                              rows={3}
                            />
                          </FormControl>
                          <FormDescription>
                            Klinik fiziksel adresi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="googleMapsUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Maps URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://maps.google.com/?q=..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Google Maps'te klinik konumunun URL'i.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="contactFormRecipients"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İletişim Formu Alıcıları</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="info@myhairclinic.com, manager@myhairclinic.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            İletişim formundan gelen mesajları alacak e-posta adresleri (virgülle ayırın).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Sosyal Medya */}
                  <h3 className="text-lg font-medium">Sosyal Medya</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactForm.control}
                      name="facebookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://facebook.com/myhairclinic" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Facebook sayfanızın tam URL'i.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="instagramUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://instagram.com/myhairclinic" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Instagram profilinizin tam URL'i.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="tiktokUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TikTok URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://tiktok.com/@myhairtbilisi" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            TikTok profilinizin tam URL'i.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="youtubeUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://youtube.com/c/myhairclinic" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            YouTube kanalınızın tam URL'i.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Güvenlik Ayarları */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Güvenlik Ayarları
              </CardTitle>
              <CardDescription>
                Site güvenliğini ve giriş kontrollerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSubmitSecurity)} className="space-y-4">
                  {/* Captcha Ayarları */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">CAPTCHA Koruması</h3>
                    
                    <FormField
                      control={securityForm.control}
                      name="enableCaptcha"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">CAPTCHA Koruması Aktif</FormLabel>
                            <FormDescription>
                              Formlarda CAPTCHA korumasını etkinleştirin (spam koruması).
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={securityForm.control}
                        name="recaptchaSiteKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>reCAPTCHA Site Anahtarı</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Google reCAPTCHA site anahtarı.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={securityForm.control}
                        name="recaptchaSecretKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>reCAPTCHA Gizli Anahtarı</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                              Google reCAPTCHA gizli anahtarı.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Şifre ve Oturum Ayarları */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Şifre ve Oturum Ayarları</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={securityForm.control}
                        name="maxLoginAttempts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maksimum Giriş Denemesi</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="10" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              />
                            </FormControl>
                            <FormDescription>
                              Hesabın kilitlenmeden önce izin verilen başarısız giriş denemesi sayısı.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={securityForm.control}
                        name="passwordExpiryDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Şifre Son Kullanma Süresi (Gün)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="365" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              />
                            </FormControl>
                            <FormDescription>
                              Kullanıcı şifrelerinin kaç günde bir değiştirilmesi gerektiği (0 = süresi yok).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={securityForm.control}
                        name="sessionTimeoutMinutes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Oturum Zaman Aşımı (Dakika)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="5" 
                                max="1440" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              />
                            </FormControl>
                            <FormDescription>
                              Kullanıcıların hareketsizlik sonrası otomatik olarak çıkış yapılması için geçecek süre.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={securityForm.control}
                      name="enforceStrongPasswords"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Güçlü Şifre Zorunluluğu</FormLabel>
                            <FormDescription>
                              Kullanıcıları en az 8 karakter, büyük/küçük harf, sayı ve özel karakter içeren şifreler kullanmaya zorlayın.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="enableTwoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">İki Faktörlü Kimlik Doğrulama</FormLabel>
                            <FormDescription>
                              Yönetici hesapları için iki faktörlü kimlik doğrulamayı etkinleştirin (SMS/e-posta).
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bildirim Ayarları */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-5 w-5" />
                Bildirim Ayarları
              </CardTitle>
              <CardDescription>
                E-posta ve Telegram bildirim seçeneklerini düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onSubmitNotifications)} className="space-y-4">
                  {/* E-posta Bildirimleri */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">E-posta Bildirimleri</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="adminEmailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yönetici E-posta Bildirimleri</FormLabel>
                            <FormDescription>
                              Önemli site olayları için yöneticilere e-posta bildirimleri gönderin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="newAppointmentNotification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yeni Randevu Bildirimleri</FormLabel>
                            <FormDescription>
                              Yeni randevu oluşturulduğunda bildirim gönderin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="newMessageNotification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yeni Mesaj Bildirimleri</FormLabel>
                            <FormDescription>
                              İletişim formundan yeni mesaj geldiğinde bildirim gönderin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="reviewNotification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yeni Yorum Bildirimleri</FormLabel>
                            <FormDescription>
                              Yeni kullanıcı yorumları geldiğinde bildirim gönderin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Telegram Bildirimleri */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Telegram Bildirimleri</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="telegramNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Telegram Bildirimleri</FormLabel>
                            <FormDescription>
                              Önemli site olayları için Telegram bildirimleri gönderin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="telegramAdminNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yönetici Telegram Bildirimleri</FormLabel>
                            <FormDescription>
                              Yalnızca yöneticilere yönelik kritik bildirimler için Telegram mesajları gönderin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Hatırlatıcı Ayarları */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hatırlatıcı Ayarları</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="appointmentReminderHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Randevu Hatırlatma Süresi (Saat)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="72" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Randevudan kaç saat önce hatırlatma bildirimi gönderilecek.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="emailNotificationTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta Bildirim Şablonu</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={5}
                              placeholder="<h2>Sayın {name},</h2><p>Randevunuz {date} tarihinde {time} saatinde planlanmıştır.</p>"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Randevu hatırlatmaları için HTML e-posta şablonu. {'{name}'}, {'{date}'}, {'{time}'} değişkenleri kullanılabilir.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dil Ayarları */}
        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Dil ve Çeviri Ayarları
              </CardTitle>
              <CardDescription>
                Sitenin dil seçeneklerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...languageForm}>
                <form onSubmit={languageForm.handleSubmit(onSubmitLanguages)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={languageForm.control}
                      name="defaultLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Varsayılan Dil</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Dil seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tr">Türkçe</SelectItem>
                              <SelectItem value="en">İngilizce</SelectItem>
                              <SelectItem value="ru">Rusça</SelectItem>
                              <SelectItem value="ka">Gürcüce</SelectItem>
                              <SelectItem value="az">Azerice</SelectItem>
                              <SelectItem value="kz">Kazakça</SelectItem>
                              <SelectItem value="ir">Farsça</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Ziyaretçinin dil tercihi yoksa kullanılacak varsayılan dil.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={languageForm.control}
                      name="enabledLanguages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aktif Diller</FormLabel>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {['tr', 'en', 'ru', 'ka', 'az', 'kz', 'ir'].map((lang) => {
                                const isSelected = field.value && field.value.includes(lang);
                                return (
                                  <div 
                                    key={lang}
                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                                      isSelected 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => {
                                      if (isSelected && field.value) {
                                        if (field.value.length > 1) { // En az bir dil seçili olmalı
                                          field.onChange(field.value.filter(value => value !== lang));
                                        }
                                      } else if (field.value) {
                                        field.onChange([...field.value, lang]);
                                      } else {
                                        field.onChange([lang]);
                                      }
                                    }}
                                  >
                                    {lang === 'tr' && 'Türkçe'}
                                    {lang === 'en' && 'İngilizce'}
                                    {lang === 'ru' && 'Rusça'}
                                    {lang === 'ka' && 'Gürcüce'}
                                    {lang === 'az' && 'Azerice'}
                                    {lang === 'kz' && 'Kazakça'}
                                    {lang === 'ir' && 'Farsça'}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <FormDescription>
                            Site üzerinde erişilebilir olacak dilleri seçin.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 mt-6">
                    <FormField
                      control={languageForm.control}
                      name="autoDetectLanguage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Otomatik Dil Algılama</FormLabel>
                            <FormDescription>
                              Ziyaretçinin tarayıcı diline göre otomatik dil seçimi yapın.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={languageForm.control}
                      name="showLanguageSwitcher"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Dil Değiştirici Göster</FormLabel>
                            <FormDescription>
                              Sitede dil değiştirme menüsünü gösterin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={languageForm.control}
                      name="translateUserContent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Kullanıcı İçeriği Otomatik Çeviri</FormLabel>
                            <FormDescription>
                              Yorumlar gibi kullanıcı içeriklerini seçilen dile otomatik çevirin (ek API entegrasyonu gerektirir).
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Randevu Ayarları */}
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Randevu Sistemi Ayarları
              </CardTitle>
              <CardDescription>
                Randevu sistemi ve zamanlamayla ilgili ayarları düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appointmentForm}>
                <form onSubmit={appointmentForm.handleSubmit(onSubmitAppointments)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={appointmentForm.control}
                      name="appointmentLeadTimeHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Randevu Öncesi Süre (Saat)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              max="168" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Randevu alınabilmesi için gereken minimum süre (saat cinsinden).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="appointmentCancellationTimeHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Randevu İptal Süresi (Saat)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              max="72" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Randevunun iptal edilebileceği son süre (saat cinsinden).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="workingHoursStart"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Çalışma Saati Başlangıcı</FormLabel>
                          <FormControl>
                            <Input 
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Klinik çalışma saatlerinin başlangıcı.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="workingHoursEnd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Çalışma Saati Bitişi</FormLabel>
                          <FormControl>
                            <Input 
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Klinik çalışma saatlerinin sonu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="appointmentDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Standart Randevu Süresi (Dakika)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="15" 
                              max="240" 
                              step="15"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Varsayılan randevu süresi.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="workingDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Çalışma Günleri</FormLabel>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {[
                                { value: 'Mon', label: 'Pazartesi' },
                                { value: 'Tue', label: 'Salı' },
                                { value: 'Wed', label: 'Çarşamba' },
                                { value: 'Thu', label: 'Perşembe' },
                                { value: 'Fri', label: 'Cuma' },
                                { value: 'Sat', label: 'Cumartesi' },
                                { value: 'Sun', label: 'Pazar' },
                              ].map((day) => {
                                const isSelected = field.value?.includes(day.value);
                                return (
                                  <div 
                                    key={day.value}
                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                                      isSelected 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => {
                                      if (isSelected && field.value) {
                                        if (field.value.length > 1) {
                                          field.onChange(field.value.filter(value => value !== day.value));
                                        }
                                      } else if (field.value) {
                                        field.onChange([...field.value, day.value]);
                                      } else {
                                        field.onChange([day.value]);
                                      }
                                    }}
                                  >
                                    {day.label}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <FormDescription>
                            Klinik çalışma günlerini seçin.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 mt-6">
                    <FormField
                      control={appointmentForm.control}
                      name="allowMultipleAppointments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Çoklu Randevu</FormLabel>
                            <FormDescription>
                              Aynı zaman diliminde birden fazla randevu alınmasına izin verin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="requireApproval"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Onay Gerektir</FormLabel>
                            <FormDescription>
                              Randevular manuel onay gerektirsin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appointmentForm.control}
                      name="enableCalendarView"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Takvim Görünümü</FormLabel>
                            <FormDescription>
                              Yönetici panelinde takvim görünümünü etkinleştirin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Ayarları */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO ve Meta Ayarları
              </CardTitle>
              <CardDescription>
                Arama motoru optimizasyonu ve site indeksleme ayarlarını düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...seoForm}>
                <form onSubmit={seoForm.handleSubmit(onSubmitSeo)} className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={seoForm.control}
                      name="enableSitemap"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Sitemap Oluştur</FormLabel>
                            <FormDescription>
                              Arama motorları için XML sitemap oluşturun.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="enableRobotsTxt"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Robots.txt Oluştur</FormLabel>
                            <FormDescription>
                              Arama motorları için robots.txt dosyası oluşturun.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="enableSchemaMarkup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Schema Markup</FormLabel>
                            <FormDescription>
                              Zengin sonuçlar için structured data markup ekleyin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="enableOpenGraph"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Open Graph Meta Etiketleri</FormLabel>
                            <FormDescription>
                              Sosyal medya platformları için Open Graph meta etiketleri ekleyin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="enableTwitterCards"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Twitter Cards</FormLabel>
                            <FormDescription>
                              Twitter paylaşımları için Twitter Card meta etiketleri ekleyin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="enableCanonicalUrls"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Canonical URL'ler</FormLabel>
                            <FormDescription>
                              Tekrarlanan içerik sorunlarını önlemek için canonical URL'ler ekleyin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={seoForm.control}
                      name="defaultOgImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Varsayılan Sosyal Medya Görseli</FormLabel>
                          <FormControl>
                            <Input placeholder="/images/social-share.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Özel görsel tanımlanmamış sayfalarda kullanılacak paylaşım görseli URL'i.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="googleAnalyticsId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Analytics ID</FormLabel>
                          <FormControl>
                            <Input placeholder="G-XXXXXXXXXX" {...field} />
                          </FormControl>
                          <FormDescription>
                            Google Analytics izleme kodu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="googleTagManagerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Tag Manager ID</FormLabel>
                          <FormControl>
                            <Input placeholder="GTM-XXXXXXX" {...field} />
                          </FormControl>
                          <FormDescription>
                            Google Tag Manager container ID.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seoForm.control}
                      name="facebookPixelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook Pixel ID</FormLabel>
                          <FormControl>
                            <Input placeholder="XXXXXXXXXXXXXXXXXX" {...field} />
                          </FormControl>
                          <FormDescription>
                            Facebook reklam izleme kodu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entegrasyon Ayarları */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                API ve Entegrasyon Ayarları
              </CardTitle>
              <CardDescription>
                Harici API ve servis entegrasyonlarını yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...integrationsForm}>
                <form onSubmit={integrationsForm.handleSubmit(onSubmitIntegrations)} className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="maps">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Map className="h-5 w-5" />
                          <span>Harita Entegrasyonu</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={integrationsForm.control}
                            name="googleMapsApiKey"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Google Maps API Anahtarı</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Harita entegrasyonu için Google Maps API anahtarı.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="analytics">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <BarChart className="h-5 w-5" />
                          <span>Analytics Entegrasyonu</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={integrationsForm.control}
                            name="googleAnalyticsApiKey"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Google Analytics API Anahtarı</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Dashboard'da analytics verileri görüntülemek için API anahtarı.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="marketing">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5" />
                          <span>E-posta Pazarlama</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={integrationsForm.control}
                            name="mailchimpApiKey"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mailchimp API Anahtarı</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Mailchimp e-posta pazarlama entegrasyonu için API anahtarı.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={integrationsForm.control}
                            name="mailchimpListId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mailchimp Liste ID</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                  Abonelerin ekleneceği Mailchimp liste ID'si.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="telegram">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          <span>Telegram Entegrasyonu</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={integrationsForm.control}
                            name="telegramBotToken"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telegram Bot Token</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Telegram bot entegrasyonu için bot token.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={integrationsForm.control}
                            name="telegramChatId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telegram Chat ID</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                  Bildirimlerin gönderileceği Telegram chat ID'si.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="smtp">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5" />
                          <span>SMTP E-posta Ayarları</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={integrationsForm.control}
                              name="smtpHost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Host</FormLabel>
                                  <FormControl>
                                    <Input placeholder="smtp.example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={integrationsForm.control}
                              name="smtpPort"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Port</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="587" 
                                      {...field}
                                      onChange={(e) => field.onChange(parseInt(e.target.value))} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={integrationsForm.control}
                              name="smtpUser"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Kullanıcı Adı</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={integrationsForm.control}
                              name="smtpPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Şifre</FormLabel>
                                  <FormControl>
                                    <Input type="password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={integrationsForm.control}
                              name="smtpFromEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gönderen E-posta</FormLabel>
                                  <FormControl>
                                    <Input placeholder="info@myhairclinic.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={integrationsForm.control}
                              name="smtpFromName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gönderen Adı</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MyHair Clinic" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex justify-end mt-6">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* İçerik Ayarları */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                İçerik ve Gösterim Ayarları
              </CardTitle>
              <CardDescription>
                Web sitesi içerik gösterim ve düzenleme ayarlarını yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contentForm}>
                <form onSubmit={contentForm.handleSubmit(onSubmitContent)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contentForm.control}
                      name="homepageLayout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ana Sayfa Düzeni</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Düzen seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Varsayılan</SelectItem>
                              <SelectItem value="hero-services">Hero + Hizmetler</SelectItem>
                              <SelectItem value="media-centered">Medya Odaklı</SelectItem>
                              <SelectItem value="video-hero">Video Hero</SelectItem>
                              <SelectItem value="testimonials-focus">Müşteri Yorumları Odaklı</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Ana sayfanın genel düzeni ve içerik organizasyonu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="servicesPerPage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sayfa Başına Hizmet Sayısı</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="3" 
                              max="24" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Hizmetler sayfasında gösterilecek hizmet sayısı.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="packagesPerPage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sayfa Başına Paket Sayısı</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="3" 
                              max="24" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Paketler sayfasında gösterilecek paket sayısı.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="blogsPerPage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sayfa Başına Blog Yazısı Sayısı</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="3" 
                              max="24" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Blog sayfasında gösterilecek yazı sayısı.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="defaultBlogImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Varsayılan Blog Görseli</FormLabel>
                          <FormControl>
                            <Input placeholder="/images/blog-default.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Görseli olmayan blog yazıları için kullanılacak varsayılan görsel.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="defaultServiceImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Varsayılan Hizmet Görseli</FormLabel>
                          <FormControl>
                            <Input placeholder="/images/service-default.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Görseli olmayan hizmetler için kullanılacak varsayılan görsel.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 mt-6">
                    <FormField
                      control={contentForm.control}
                      name="enableFeaturedContent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Öne Çıkan İçerikler</FormLabel>
                            <FormDescription>
                              Ana sayfada öne çıkan içerikleri gösterin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="enableRelatedContent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">İlgili İçerikler</FormLabel>
                            <FormDescription>
                              İçerik sayfalarında ilgili içerikleri gösterin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="enableComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yorumlar</FormLabel>
                            <FormDescription>
                              Blog yazılarında kullanıcı yorumlarını etkinleştirin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="enableReviews"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Değerlendirmeler</FormLabel>
                            <FormDescription>
                              Hizmetler için kullanıcı değerlendirmelerini etkinleştirin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contentForm.control}
                      name="requireReviewApproval"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Değerlendirme Onayı Gerektir</FormLabel>
                            <FormDescription>
                              Kullanıcı değerlendirmeleri yayınlanmadan önce onay gereksin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medya Ayarları */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Medya ve Yükleme Ayarları
              </CardTitle>
              <CardDescription>
                Medya dosyaları, görseller ve yükleme ile ilgili ayarları düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...mediaForm}>
                <form onSubmit={mediaForm.handleSubmit(onSubmitMedia)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={mediaForm.control}
                      name="maxUploadSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maksimum Yükleme Boyutu (MB)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="50" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Yüklenebilecek maksimum dosya boyutu (MB cinsinden).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mediaForm.control}
                      name="imageQuality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Görsel Kalitesi (1-100)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="100" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Yüklenen görsellerin kalitesi (1-100 arası).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mediaForm.control}
                      name="allowedFileTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İzin Verilen Dosya Türleri</FormLabel>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'mp4', 'webm'].map((type) => {
                                const isSelected = field.value?.includes(type);
                                return (
                                  <div 
                                    key={type}
                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                                      isSelected 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => {
                                      if (isSelected) {
                                        field.onChange(field.value.filter(value => value !== type));
                                      } else {
                                        field.onChange([...field.value, type]);
                                      }
                                    }}
                                  >
                                    {type}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <FormDescription>
                            Yüklenmesine izin verilen dosya türleri.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mediaForm.control}
                      name="thumbnailSizes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Küçük Resim Boyutları</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="300x300,600x600,1200x1200"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Görseller için otomatik oluşturulacak küçük resim boyutları (virgülle ayrılmış).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 mt-6">
                    <FormField
                      control={mediaForm.control}
                      name="useWebP"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">WebP Kullan</FormLabel>
                            <FormDescription>
                              Yüklenen görselleri WebP formatına dönüştürün (daha küçük dosya boyutu).
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mediaForm.control}
                      name="optimizeImages"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Görselleri Optimize Et</FormLabel>
                            <FormDescription>
                              Yüklenen görselleri otomatik olarak optimize edin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mediaForm.control}
                      name="watermarkEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Filigran Ekle</FormLabel>
                            <FormDescription>
                              Yüklenen görsellere otomatik olarak filigran ekleyin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {mediaForm.watch("watermarkEnabled") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <FormField
                        control={mediaForm.control}
                        name="watermarkImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Filigran Görseli</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="/images/watermark.png"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Filigran olarak kullanılacak görselin yolu.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={mediaForm.control}
                        name="watermarkPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Filigran Pozisyonu</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Pozisyon seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="center">Orta</SelectItem>
                                <SelectItem value="top-left">Sol Üst</SelectItem>
                                <SelectItem value="top-right">Sağ Üst</SelectItem>
                                <SelectItem value="bottom-left">Sol Alt</SelectItem>
                                <SelectItem value="bottom-right">Sağ Alt</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Filigranın görselde konumlandırılacağı yer.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Yedekleme Ayarları */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Yedekleme ve Veri Yönetimi
              </CardTitle>
              <CardDescription>
                Veritabanı yedekleme ve veri yönetimi ayarlarını düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...backupForm}>
                <form onSubmit={backupForm.handleSubmit(onSubmitBackup)} className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={backupForm.control}
                      name="enableAutomaticBackups"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Otomatik Yedekleme</FormLabel>
                            <FormDescription>
                              Veritabanının otomatik olarak düzenli yedeklenmesini etkinleştirin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={backupForm.control}
                        name="backupFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yedekleme Sıklığı</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sıklık seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hourly">Saatlik</SelectItem>
                                <SelectItem value="daily">Günlük</SelectItem>
                                <SelectItem value="weekly">Haftalık</SelectItem>
                                <SelectItem value="monthly">Aylık</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Otomatik yedeklemelerin hangi sıklıkta yapılacağı.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={backupForm.control}
                        name="backupStorage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yedekleme Depolama</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Depolama seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="local">Yerel Depolama</SelectItem>
                                <SelectItem value="cloud">Bulut Depolama</SelectItem>
                                <SelectItem value="both">Her İkisi</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Yedeklemelerin nerede saklanacağı.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={backupForm.control}
                        name="maxBackupCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maksimum Yedekleme Sayısı</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="30" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              />
                            </FormControl>
                            <FormDescription>
                              Saklanacak maksimum yedekleme sayısı.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={backupForm.control}
                      name="includeMediaInBackup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Medya İçeren Yedekleme</FormLabel>
                            <FormDescription>
                              Yedeklemelere medya dosyalarını da dahil edin.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={backupForm.control}
                      name="backupNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yedekleme Bildirimleri</FormLabel>
                            <FormDescription>
                              Yedekleme işlemleri hakkında e-posta bildirimleri alın.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium">Manuel Veri Yönetimi</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => {
                          toast({
                            title: "Manuel Yedekleme Başlatıldı",
                            description: "Veritabanı yedekleme işlemi başlatıldı. Bu işlem birkaç dakika sürebilir.",
                          });
                        }}
                      >
                        <Database className="h-4 w-4" />
                        Manuel Yedekleme Oluştur
                      </Button>

                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => {
                          toast({
                            title: "Yedeklemeler Listeleniyor",
                            description: "Mevcut yedeklemeler listeleniyor. Bu işlem birkaç saniye sürebilir.",
                          });
                        }}
                      >
                        <CloudCog className="h-4 w-4" />
                        Yedeklemeleri Listele
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saveSettingsMutation.isPending}>
                      {saveSettingsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;