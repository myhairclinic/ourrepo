import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

interface AppointmentButtonProps {
  text?: string;
  fixed?: boolean;
}

export default function AppointmentButton({ text, fixed = true }: AppointmentButtonProps) {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Hide/show button based on scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolling up or at top/bottom of page
      if (currentScrollY <= 100 || 
          currentScrollY < lastScrollY || 
          window.innerHeight + currentScrollY >= document.body.offsetHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  // Button with gradient background - using blue gradient as requested
  const baseClasses = "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg";
  const fixedClasses = fixed ? "fixed bottom-6 left-6 z-50" : "";
  
  // Return inline button if text is provided
  if (text) {
    return (
      <div className="relative inline-block">
        <a
          href={addPrefix("/appointment")}
          className={`${baseClasses} ${fixedClasses} flex items-center gap-2 px-5 py-3 rounded-lg font-medium`}
          aria-label={t("common.makeAppointment")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            
          }}
        >
          <Calendar size={22} />
          <span className="font-medium">{text}</span>
        </a>
      </div>
    );
  }
  
  // Floating button with animation
  return (
    <>
      {isVisible && (
        <div 
          className={`${fixedClasses} transition-all duration-500 ease-in-out transform`}
          style={{ 
            transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="relative">
            <a
              href={addPrefix("/appointment")}
              className={`${baseClasses} p-4 rounded-full flex items-center justify-center w-16 h-16`}
              aria-label={t("common.makeAppointment")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                animation: "pulse 2s infinite",
                boxShadow: "0 0 15px 5px rgba(59, 130, 246, 0.5)"
              }}
            >
              <Calendar size={30} className="stroke-[1.5]" />
            </a>
            
            {/* Tooltip that appears on hover */}
            {isHovered && (
              <div 
                className="absolute bottom-full left-0 mb-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 px-3 text-sm font-medium whitespace-nowrap"
                style={{
                  transform: 'translateY(-5px)',
                  opacity: 1,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {t("common.makeAppointment")}
                <div className="absolute left-5 bottom-0 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}