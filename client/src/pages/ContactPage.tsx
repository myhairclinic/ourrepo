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
  
  return (
    <>
      <Helmet>
        <title>{t('contact.title') + META.TITLE_SUFFIX}</title>
        <meta name="description" content={t('contact.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/contact")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/contact"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/contact"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/contact"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/contact"} />
      </Helmet>
      
      <main className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <div className="mb-6">
              <Badge variant="outline" className="rounded-full text-primary border-primary px-4 py-1 text-sm mb-3">
                {t('contact.getInTouch')}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {t('contact.title')}
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                {t('contact.description')}
              </p>
            </div>
          </div>

          {/* Contact Details and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 overflow-hidden">
            {/* Contact Info Cards */}
            <div className="lg:order-1 space-y-6">
              {clinicInfo && (
                <>
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                    <CardContent className="p-6 pt-6">
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{t('home.location.address')}</h3>
                          <p className="text-sm text-muted-foreground">{clinicInfo[`address${language.toUpperCase()}`]}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                    <CardContent className="p-6 pt-6">
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{t('home.location.phone')}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{clinicInfo.phone}</p>
                          <p className="text-sm text-muted-foreground">+90 (532) 123 45 67 (Türkiye)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                    <CardContent className="p-6 pt-6">
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{t('home.location.email')}</h3>
                          <p className="text-sm text-muted-foreground">{clinicInfo.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                    <CardContent className="p-6 pt-6">
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-primary/10 p-3 text-primary">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{t('home.location.workingHours')}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{t('home.location.weekdays')}</p>
                          <p className="text-sm text-muted-foreground mb-1">{t('home.location.saturday')}</p>
                          <p className="text-sm text-muted-foreground">{t('home.location.sunday')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6">
                    <a 
                      href={clinicInfo ? `https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}` : "https://wa.me/995123456789"}
                      className="flex items-center justify-center bg-[#25D366] text-white font-medium px-6 py-3 rounded-md hover:bg-[#25D366]/90 transition-colors duration-200 w-full shadow-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="mr-2">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Map */}
            <div className="lg:col-span-2 lg:order-2">
              <Card className="overflow-hidden border-none shadow-lg h-full">
                <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
                <CardContent className="p-0 h-[500px]">
                  {clinicInfo && clinicInfo.googleMapsUrl ? (
                    <iframe 
                      src={clinicInfo.googleMapsUrl}
                      className="w-full h-full border-0" 
                      title="Google Maps Location"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      aria-label="MyHair Clinic Location Map"
                    ></iframe>
                  ) : (
                    <iframe
                      src="https://maps.google.com/maps?q=tbilisi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0" 
                      title="Google Maps Location"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      aria-label="MyHair Clinic Location Map"
                    ></iframe>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="overflow-hidden border-none shadow-xl">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-2xl font-bold text-center">
                  {t('contact.formTitle')}
                </CardTitle>
                <CardDescription className="text-center mt-2">
                  {t('contact.formDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t('common.name')} {t('common.surname')}*
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        className={errors.name ? 'border-red-500' : ''}
                        {...register("name")}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <AtSign className="h-4 w-4" />
                        {t('common.email')}*
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        className={errors.email ? 'border-red-500' : ''}
                        {...register("email")}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t('common.phoneNumber')}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('contact.phonePlaceholder')}
                      {...register("phone")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {t('common.message')}*
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder={t('contact.messagePlaceholder')}
                      className={errors.message ? 'border-red-500' : ''}
                      {...register("message")}
                    />
                    {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {t('common.submitForm')}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
