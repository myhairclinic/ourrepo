import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

// Appointment tracker form schema
const trackerFormSchema = z.object({
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
});

type TrackerFormData = z.infer<typeof trackerFormSchema>;

type Appointment = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  preferredDate: string | null;
  status: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  service: {
    titleTR: string;
    titleEN: string;
    titleRU: string;
    titleKA: string;
  };
};

export default function AppointmentTracker() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<TrackerFormData>({
    resolver: zodResolver(trackerFormSchema),
    defaultValues: {
      email: "",
      phone: "",
    }
  });

  const onSubmit = async (data: TrackerFormData) => {
    setIsSubmitting(true);
    setAppointments(null);
    
    try {
      const res = await apiRequest("GET", `/api/appointments/track?email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}`);
      
      if (res.ok) {
        const appointmentsData = await res.json();
        setAppointments(appointmentsData);
        setIsSubmitted(true);
      } else {
        toast({
          title: t('appointment.trackError'),
          description: t('appointment.noAppointmentsFound'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('appointment.trackError'),
        description: t('common.errorOccurred'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to translate status
  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return t('appointment.statusNew');
      case "confirmed":
        return t('appointment.statusConfirmed');
      case "completed":
        return t('appointment.statusCompleted');
      case "cancelled":
        return t('appointment.statusCancelled');
      default:
        return status;
    }
  };

  // Helper to get status class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('appointment.trackTitle')} - MyHair Clinic</title>
        <meta name="description" content={t('appointment.trackDescription')} />
        <link rel="canonical" href={window.location.origin + "/" + language + "/appointment-tracker"} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/appointment-tracker"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/appointment-tracker"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/appointment-tracker"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/appointment-tracker"} />
      </Helmet>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('appointment.trackTitle')}
            description={t('appointment.trackDescription')}
          />

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="email">
                    {t('common.email')}*
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder={t('appointment.emailPlaceholder')}
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="phone">
                    {t('common.phoneNumber')}*
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder={t('appointment.phonePlaceholder')}
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('appointment.searching') : t('appointment.trackButton')}
                </button>
              </form>
            </div>

            {isSubmitted && (
              <div className="border-t border-neutral-200 p-8">
                <h3 className="text-xl font-semibold mb-4">{t('appointment.yourAppointments')}</h3>
                
                {!appointments || appointments.length === 0 ? (
                  <div className="text-center py-6 bg-neutral-50 rounded-lg">
                    <p className="text-neutral-600">{t('appointment.noAppointmentsFound')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4 bg-neutral-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {language === 'tr' ? appointment.service.titleTR : 
                               language === 'en' ? appointment.service.titleEN : 
                               language === 'ru' ? appointment.service.titleRU : 
                               appointment.service.titleKA}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {format(new Date(appointment.createdAt), "dd/MM/yyyy")}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-neutral-500">{t('common.name')}:</span> {appointment.name}
                          </div>
                          {appointment.preferredDate && (
                            <div>
                              <span className="text-neutral-500">{t('appointment.preferredDate')}:</span> {format(new Date(appointment.preferredDate), "dd/MM/yyyy")}
                            </div>
                          )}
                          {appointment.status === "confirmed" && (
                            <div className="md:col-span-2 mt-2 bg-green-50 border border-green-200 p-2 rounded">
                              <p className="text-green-800">
                                <strong>{t('appointment.confirmedInfo')}:</strong> {t('appointment.confirmedMessage')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}