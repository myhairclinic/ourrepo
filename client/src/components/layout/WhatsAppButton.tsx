import { CONTACT } from "@/lib/constants";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@shared/types";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
  text?: string;
  fixed?: boolean;
}

export default function WhatsAppButton({ text, fixed = true }: WhatsAppButtonProps) {
  const { language } = useLanguage();
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
  
  // Button with gradient background
  const baseClasses = "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg";
  const fixedClasses = fixed ? "fixed bottom-6 right-6 z-50" : "";
  
  // Tooltip and button animation settings (using CSS instead of framer-motion)
  
  if (text) {
    return (
      <div className="relative inline-block">
        <a
          href={`https://wa.me/${CONTACT.WHATSAPP.replace(/[^0-9]/g, "")}?text=Merhaba%2C%20web%20sitesinden%20geliyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${fixedClasses} flex items-center gap-2 px-5 py-3 rounded-lg font-medium`}
          aria-label={t("common.contactViaWhatsApp")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.5)"
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
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
              href={`https://wa.me/${CONTACT.WHATSAPP.replace(/[^0-9]/g, "")}?text=Merhaba%2C%20web%20sitesinden%20geliyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${baseClasses} p-4 rounded-full flex items-center justify-center`}
              aria-label={t("common.contactViaWhatsApp")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.5)",
                animation: "pulse 2s infinite"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
            </a>
            
            {/* Tooltip that appears on hover */}
            {isHovered && (
              <div 
                className="absolute bottom-full right-0 mb-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 px-3 text-sm font-medium whitespace-nowrap"
                style={{
                  transform: 'translateY(-5px)',
                  opacity: 1,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {t("common.contactViaWhatsApp")}
                <div className="absolute right-5 bottom-0 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Pulse animation is defined in index.css */}
    </>
  );
}