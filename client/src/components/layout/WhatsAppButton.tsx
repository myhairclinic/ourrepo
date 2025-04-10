import { useQuery } from "@tanstack/react-query";

export default function WhatsAppButton() {
  // Fetch clinic info to get WhatsApp number
  const { data: clinicInfo } = useQuery({
    queryKey: ["/api/clinic-info"],
  });
  
  const whatsappNumber = clinicInfo?.whatsapp || "+995123456789";
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  
  return (
    <a 
      href={`https://wa.me/${cleanNumber}`} 
      className="fixed bottom-6 right-6 bg-[#25D366] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 hover:bg-[#25D366]/90 transition duration-200"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp text-2xl"></i>
    </a>
  );
}
