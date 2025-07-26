import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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

// Telegram configuration
const TELEGRAM_BOT_TOKEN = "8346738369:AAFSMTw4aYBWe1I5vYonc0uAICsBKSMfGMY";
const TELEGRAM_CHAT_ID = "8471574157";

export default function AppointmentPage() {
  const { toast } = useToast();
  
  const { data: services = [] } = useQuery<any[]>({
    queryKey: ["/api/services"],
  });
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<AppointmentFormData>({
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
      // Format message for Telegram
      const formattedMessage = `
📅 *New Appointment Request* 📅
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🎉 *Service:* ${data.serviceId}
📆 *Preferred Date:* ${data.preferredDate || 'Not specified'}
💬 *Message:* ${data.message || 'None'}
      `;

      try {
        // Send to Telegram
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: formattedMessage,
              parse_mode: "Markdown"
            })
          }
        );

        if (!response.ok) {
          throw new Error("Telegram API error: " + response.statusText);
        }

        return response.json();
      } catch (err) {
        console.error("Appointment submission error:", err);
        throw new Error("Failed to send appointment");
      }
    },
    onSuccess: () => {
      toast({
        title: 'Appointment Received!',
        description: 'We will contact you shortly to confirm your appointment.',
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      console.error("Appointment error:", error);
      toast({
        title: 'Submission Failed',
        description: error.message || 'Please try again later.',
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
        <title>Book Appointment | MyHair Clinic</title>
        <meta name="description" content="Book a free hair analysis and hair transplant appointment at MyHair Clinic. Our expert team offers personalized solutions with the latest technology." />
      </Helmet>
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Book an Appointment"
            description="Schedule a consultation with our expert team for hair transplant and treatments. Take the first step towards personalized solutions."
          />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="hidden md:block md:col-span-2 bg-primary">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Hair transplant consultation" 
                  className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
              </div>
              <div className="md:col-span-3 p-4 md:p-6 lg:p-8">
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-2 md:mb-4">
                  Online Appointment Form
                </h2>
                <p className="text-neutral-600 text-sm md:text-base mb-4 md:mb-6">
                  Fill out the form below to book a free consultation appointment for hair transplant. Our specialists will contact you shortly.
                </p>
                <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-neutral-600 mb-1" htmlFor="name">
                        Full Name*
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-neutral-300'} px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="John Doe"
                        {...register("name")}
                      />
                      {errors.name && <p className="text-red-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-neutral-600 mb-1" htmlFor="phone">
                        Phone Number*
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-neutral-300'} px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="+995 123 456 7890"
                        {...register("phone")}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-neutral-600 mb-1" htmlFor="email">
                      Email Address*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-300'} px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="john@example.com"
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-neutral-600 mb-1" htmlFor="serviceId">
                      Select Service*
                    </label>
                    <select 
                      id="serviceId" 
                      className={`w-full rounded-md border ${errors.serviceId ? 'border-red-500' : 'border-neutral-300'} px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary`}
                      {...register("serviceId")}
                    >
                      <option value="">Please select a service</option>
                      {services && services.map((service) => (  
                        <option key={service.id} value={service.id}>
                          {service.titleEN}
                        </option> 
                      ))}
                    </select>
                    {errors.serviceId && <p className="text-red-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{errors.serviceId.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-neutral-600 mb-1" htmlFor="preferredDate">
                      Preferred Date
                    </label>
                    <input 
                      type="date" 
                      id="preferredDate" 
                      className="w-full rounded-md border border-neutral-300 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                      {...register("preferredDate")}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-neutral-600 mb-1" htmlFor="message">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full rounded-md border border-neutral-300 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Any special requests or information"
                      {...register("message")}
                    />
                  </div>
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className={`mt-0.5 md:mt-1 h-3.5 w-3.5 md:h-4 md:w-4 rounded border-neutral-300 text-primary focus:ring-primary ${errors.consent ? 'border-red-500' : ''}`}
                      {...register("consent")}
                    />
                    <label className="ml-2 block text-xs md:text-sm text-neutral-600" htmlFor="consent">
                      I agree to the processing of my personal data*
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-[10px] md:text-xs">{errors.consent.message}</p>}
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white font-medium text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-md transition duration-200 w-full"
                    disabled={appointmentMutation.isPending}
                  >
                    {appointmentMutation.isPending ? "Sending..." : "Book Appointment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Information Sections */}
          <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-neutral-100 rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 md:mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary mr-2"></i>
                Information for Local Patients
              </h3>
              <div className="prose prose-xs md:prose-sm max-w-none">
                <p className="text-sm md:text-base">MyHair Clinic offers professional hair transplant solutions at competitive prices in Georgia.</p>
                <p className="text-sm md:text-base">Special advantages and payment options are available for local patients.</p>
                <ul className="text-xs md:text-sm space-y-1">
                  <li>Free consultation appointments available</li>
                  <li>Post-treatment follow-up appointments included</li>
                  <li>Flexible payment plans for local patients</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg p-4 md:p-6 shadow-md">
              <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 md:mb-4 flex items-center">
                <i className="fas fa-globe text-primary mr-2"></i>
                Information for International Patients
              </h3>
              <div className="prose prose-xs md:prose-sm max-w-none">
                <p className="text-sm md:text-base">We offer special packages for patients traveling from abroad.</p>
                <p className="text-sm md:text-base">Packages include accommodation, airport transfers, and interpreter services.</p>
                <ul className="text-xs md:text-sm space-y-1">
                  <li>Country-specific travel and treatment packages</li>
                  <li>Visa process support and guidance</li>
                  <li>24/7 assistance during your stay in Tbilisi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
