import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  User, 
  AtSign, 
  Send 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CONTACT, SOCIAL } from "@/lib/constants";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const { toast } = useToast();
  
  // Fetch clinic info
  const { data: clinicInfo } = useQuery({
    queryKey: ["/api/clinic-info"],
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });
  
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: t('contact.success'),
        description: t('contact.successMessage'),
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error'),
        description: error.message || t('contact.errorMessage'),
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };
  
  // Fallback değerler için güvenlik kontrolü
  const getTranslation = (key: string, fallback: string) => {
    try {
      return t(key) || fallback;
    } catch (e) {
      return fallback;
    }
  };

  return (
    <>
      <Helmet>
        <title>{getTranslation('contact.title', 'İletişim')} | {META.SITE_NAME}</title>
        <meta name="description" content={getTranslation('contact.description', 'MyHair Clinic ile iletişime geçin')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/contact")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/contact"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/contact"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/contact"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/contact"} />
      </Helmet>
      
      <main className="py-0">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden">
          {/* Abstract Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contactPattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)">
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                  <circle cx="0" cy="50" r="2" fill="currentColor" />
                  <circle cx="100" cy="50" r="2" fill="currentColor" />
                  <circle cx="50" cy="0" r="2" fill="currentColor" />
                  <circle cx="50" cy="100" r="2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contactPattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="rounded-full border-white border-opacity-50 text-white px-4 py-1 text-sm mb-4 backdrop-blur-sm bg-white/10">
                {t('contact.contactUs')}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-md">
                {t('contact.headerTitle')}
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
                {t('contact.headerSubtitle')}
              </p>
              
              {/* Quick Contact Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a 
                  href={`tel:${CONTACT.PHONE.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.PHONE}
                </a>
                <a 
                  href={`mailto:${CONTACT.EMAIL}`}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT.EMAIL}
                </a>
                <a 
                  href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent("Merhaba, MyHair Clinic hakkında bilgi almak istiyorum.")}`}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          {/* Wave Shape Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full fill-background">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10 -mt-5">
          {/* Contact Information and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="lg:order-1">
              <div className="bg-background rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {/* Address */}
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{t('contact.address')}</h3>
                        <p className="text-muted-foreground">{CONTACT.ADDRESS[language.toUpperCase() as keyof typeof CONTACT.ADDRESS]}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Details */}
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{t('contact.phone')}</h3>
                        <p className="text-muted-foreground mb-1">{CONTACT.PHONE}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{t('contact.email')}</h3>
                        <p className="text-muted-foreground">{CONTACT.EMAIL}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Working Hours */}
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{t('contact.workingHours')}</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>{t('contact.mondayFriday')}</span>
                            <span className="font-medium">09:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('contact.saturday')}</span>
                            <span className="font-medium">10:00 - 16:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('contact.sunday')}</span>
                            <span className="font-medium">{t('contact.closed')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900">
                  <h3 className="font-semibold text-lg mb-4">{t('contact.followUs')}</h3>
                  <div className="flex gap-3">
                    <a 
                      href={SOCIAL.FACEBOOK}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    <a 
                      href={SOCIAL.INSTAGRAM}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white hover:opacity-90 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href={SOCIAL.TIKTOK}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-90 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    {/* WhatsApp button removed to avoid duplication as it exists below */}
                    <a 
                      href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent("Merhaba, MyHair Clinic hakkında bilgi almak istiyorum.")}`}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-2 lg:order-2">
              <Card className="overflow-hidden border-none shadow-xl h-full">
                <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                <CardContent className="p-0 h-[550px]">
                  <iframe
                    src="https://maps.google.com/maps?q=Tsotne+Dadiani+59+Tbilisi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0" 
                    title="Google Maps Location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="MyHair Clinic Location Map"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form Section with Design Elements */}
          <div className="relative max-w-4xl mx-auto mb-16">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70 z-0"></div>
            
            <Card className="overflow-hidden border-none shadow-2xl relative z-10">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
              <CardHeader className="p-8 pb-4 text-center">
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {t('contact.formTitle')}
                </CardTitle>
                <CardDescription className="text-center mt-3 text-base max-w-2xl mx-auto">
                  {t('contact.formDescription')} <span className="text-primary font-medium">{t('contact.responseTime')}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2 text-base">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        {t('contact.nameLabel')}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        className={`py-6 px-4 text-base ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                        {...register("name")}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-base">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <AtSign className="h-4 w-4 text-primary" />
                        </div>
                        {t('contact.emailLabel')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        className={`py-6 px-4 text-base ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                        {...register("email")}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-base">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      {t('contact.phoneLabel')}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('contact.phonePlaceholder')}
                      className="py-6 px-4 text-base border-gray-200 dark:border-gray-700"
                      {...register("phone")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2 text-base">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      {t('contact.messageLabel')}
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder={t('contact.messagePlaceholder')}
                      className={`px-4 py-3 text-base resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                      {...register("message")}
                    />
                    {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base font-medium"
                    disabled={contactMutation.isPending}
                    size="lg"
                  >
                    {contactMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {t('contact.submitButton')}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{t('contact.frequentlyAsked')}</h2>
              <p className="text-muted-foreground mt-3">{t('contact.faqDescription')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{t('contact.faq1Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('contact.faq1Content')}</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{t('contact.faq2Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('contact.faq2Content')}</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{t('contact.faq3Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('contact.faq3Content')}</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{t('contact.faq4Title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('contact.faq4Content')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
