import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { useMutation } from "@tanstack/react-query";
import { insertAppointmentSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Extend the schema for client-side validation
const appointmentFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  serviceId: z.coerce.number().positive("Please select a service"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the data processing",
  }),
});

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export default function AppointmentCTA() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      consent: false,
    }
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: Omit<AppointmentFormData, 'consent'>) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: t('appointmentSuccess'),
        description: t('appointmentSuccessMessage'),
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: t('appointmentError'),
        description: error.message || t('appointmentErrorMessage'),
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: AppointmentFormData) => {
    setIsSubmitting(true);
    const { consent, ...appointmentData } = data;
    appointmentMutation.mutate(appointmentData);
  };
  
  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4">
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
                {t('home.appointment.title')}
              </h2>
              <p className="text-neutral-600 mb-6">
                {t('home.appointment.description')}
              </p>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="name">
                      {t('common.name')} {t('common.surname')}
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
                      {t('common.phoneNumber')}
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
                    {t('common.email')}
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
                    {t('common.selectService')}
                  </label>
                  <select 
                    id="serviceId" 
                    className={`w-full rounded-md border ${errors.serviceId ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    {...register("serviceId")}
                  >
                    <option value="">{t('home.appointment.servicePlaceholder')}</option>
                    {services && services.map((service: any) => (
                      <option key={service.id} value={service.id}>
                        {service.titleTR}
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
                    {t('common.consentText')}
                  </label>
                </div>
                {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('loading') : t('common.bookAppointment')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
