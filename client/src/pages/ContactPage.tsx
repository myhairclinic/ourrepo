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
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('contact.title')}
            description={t('contact.description')}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-md h-[400px]">
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
            </div>
            
            <div className="bg-neutral-100 rounded-lg p-6 shadow-md">
              <h3 className="font-heading text-xl font-semibold mb-6">{t('home.location.contactInfo')}</h3>
              
              <div className="space-y-6">
                {clinicInfo && (
                  <>
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4 text-primary">
                        <i className="fas fa-map-marker-alt text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{t('home.location.address')}</h4>
                        <p className="text-neutral-600">{clinicInfo[`address${language.toUpperCase()}`]}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4 text-primary">
                        <i className="fas fa-phone-alt text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{t('home.location.phone')}</h4>
                        <p className="text-neutral-600">{clinicInfo.phone}</p>
                        <p className="text-neutral-600">+90 (532) 123 45 67 (Türkiye)</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4 text-primary">
                        <i className="fas fa-envelope text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{t('home.location.email')}</h4>
                        <p className="text-neutral-600">{clinicInfo.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4 text-primary">
                        <i className="fas fa-clock text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{t('home.location.workingHours')}</h4>
                        <p className="text-neutral-600">{t('home.location.weekdays')}</p>
                        <p className="text-neutral-600">{t('home.location.saturday')}</p>
                        <p className="text-neutral-600">{t('home.location.sunday')}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-8">
                <a 
                  href={clinicInfo ? `https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}` : "https://wa.me/995123456789"}
                  className="flex items-center justify-center bg-[#25D366] text-white font-medium px-6 py-3 rounded-md hover:bg-[#25D366]/90 transition duration-200 w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp mr-2 text-xl"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="font-heading text-2xl font-semibold mb-6 text-center">{t('contact.formTitle')}</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="name">
                      {t('common.name')} {t('common.surname')}*
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder={t('contact.namePlaceholder')}
                      {...register("name")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="email">
                      {t('common.email')}*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder={t('contact.emailPlaceholder')}
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="phone">
                    {t('common.phoneNumber')}
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('contact.phonePlaceholder')}
                    {...register("phone")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="message">
                    {t('common.message')}*
                  </label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className={`w-full rounded-md border ${errors.message ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder={t('contact.messagePlaceholder')}
                    {...register("message")}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? t('contact.sending') : t('common.submitForm')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
