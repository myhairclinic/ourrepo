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

// Appointment form schema
const appointmentFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  serviceId: z.coerce.number().positive("Please select a service"),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the data processing",
  }),
});

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export default function AppointmentPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const { toast } = useToast();
  
  // Fetch services for the dropdown
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredDate: "",
      consent: false,
    }
  });
  
  const appointmentMutation = useMutation({
    mutationFn: async (data: Omit<AppointmentFormData, 'consent'>) => {
      try {
        console.log("Sending appointment data:", data);
        const res = await apiRequest("POST", "/api/appointments", data);
        const result = await res.json();
        console.log("Appointment response:", result);
        return result;
      } catch (err) {
        console.error("Appointment submission error:", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log("Appointment created successfully:", data);
      toast({
        title: t('appointment.success'),
        description: t('appointment.successMessage'),
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      console.error("Appointment mutation error:", error);
      toast({
        title: t('appointment.error'),
        description: error.message || t('appointment.errorMessage'),
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: AppointmentFormData) => {
    const { consent, ...appointmentData } = data;
    appointmentMutation.mutate(appointmentData);
  };
  
  return (
    <>
      <Helmet>
        <title>{t('appointment.title') + META.TITLE_SUFFIX}</title>
        <meta name="description" content={t('appointment.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/appointment")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/appointment"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/appointment"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/appointment"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/appointment"} />
      </Helmet>
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('appointment.title')}
            description={t('appointment.description')}
          />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-primary">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Hair transplant consultation" 
                  className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
              </div>
              <div className="md:col-span-3 p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-4">
                  {t('appointment.formTitle')}
                </h2>
                <p className="text-neutral-600 mb-6">
                  {t('appointment.formDescription')}
                </p>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="name">
                        {t('common.name')} {t('common.surname')}*
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder={t('home.appointment.namePlaceholder')}
                        {...register("name")}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="phone">
                        {t('common.phoneNumber')}*
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder={t('home.appointment.phonePlaceholder')}
                        {...register("phone")}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="email">
                      {t('common.email')}*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder={t('home.appointment.emailPlaceholder')}
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="serviceId">
                      {t('common.selectService')}*
                    </label>
                    <select 
                      id="serviceId" 
                      className={`w-full rounded-md border ${errors.serviceId ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                      {...register("serviceId")}
                    >
                      <option value="">{t('home.appointment.servicePlaceholder')}</option>
                      {services && services.map((service: any) => (
                        <option key={service.id} value={service.id}>
                          {service[`title${language.toUpperCase()}`]}
                        </option>
                      ))}
                      {!services && (
                        <>
                          <option value="1">Saç Ekimi</option>
                          <option value="2">Kaş Ekimi</option>
                          <option value="3">Sakal/Bıyık Ekimi</option>
                          <option value="4">PRP Tedavisi</option>
                          <option value="5">Saç Mezoterapisi</option>
                        </>
                      )}
                    </select>
                    {errors.serviceId && <p className="text-red-500 text-xs mt-1">{errors.serviceId.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="preferredDate">
                      {t('appointment.preferredDate')}
                    </label>
                    <input 
                      type="date" 
                      id="preferredDate" 
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      {...register("preferredDate")}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="message">
                      {t('common.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t('home.appointment.messagePlaceholder')}
                      {...register("message")}
                    />
                  </div>
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className={`mt-1 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary ${errors.consent ? 'border-red-500' : ''}`}
                      {...register("consent")}
                    />
                    <label className="ml-2 block text-sm text-neutral-600" htmlFor="consent">
                      {t('common.consentText')}*
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200 w-full"
                    disabled={appointmentMutation.isPending}
                  >
                    {appointmentMutation.isPending ? t('appointment.sending') : t('common.bookAppointment')}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Information Sections */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-100 rounded-lg p-6 shadow-md">
              <h3 className="font-heading text-xl font-semibold mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary mr-2"></i>
                {t('appointment.localPatients')}
              </h3>
              <div className="prose prose-sm">
                <p>{t('appointment.localInfo1')}</p>
                <p>{t('appointment.localInfo2')}</p>
                <ul>
                  <li>{t('appointment.localPoint1')}</li>
                  <li>{t('appointment.localPoint2')}</li>
                  <li>{t('appointment.localPoint3')}</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg p-6 shadow-md">
              <h3 className="font-heading text-xl font-semibold mb-4 flex items-center">
                <i className="fas fa-globe text-primary mr-2"></i>
                {t('appointment.internationalPatients')}
              </h3>
              <div className="prose prose-sm">
                <p>{t('appointment.internationalInfo1')}</p>
                <p>{t('appointment.internationalInfo2')}</p>
                <ul>
                  <li>{t('appointment.internationalPoint1')}</li>
                  <li>{t('appointment.internationalPoint2')}</li>
                  <li>{t('appointment.internationalPoint3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
